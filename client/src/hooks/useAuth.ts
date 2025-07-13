import { useState, useEffect } from "react";
import { onAuthStateChanged, signOut as firebaseSignOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { createUserProfile, getUserProfile } from "@/lib/firestore";
import type { AuthUser } from "@/types";
import type { UserProfile } from "@shared/schema";

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const authUser: AuthUser = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
        };
        setUser(authUser);

        try {
          // Check if user profile exists in Firestore
          let profile = await getUserProfile(firebaseUser.uid);
          
          if (!profile) {
            // Create new user profile
            await createUserProfile(
              firebaseUser.uid,
              firebaseUser.email || "",
              firebaseUser.displayName || undefined
            );
            profile = await getUserProfile(firebaseUser.uid);
          }
          
          setUserProfile(profile);
        } catch (error) {
          console.error("Error managing user profile:", error);
        }
      } else {
        setUser(null);
        setUserProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
      throw error;
    }
  };

  return {
    user,
    userProfile,
    loading,
    signOut,
  };
}
