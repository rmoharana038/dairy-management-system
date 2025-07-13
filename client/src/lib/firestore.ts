import { 
  doc, 
  getDoc, 
  setDoc, 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  onSnapshot,
  serverTimestamp,
  Timestamp 
} from "firebase/firestore";
import { db } from "./firebase";
import type { UserProfile, Entry, InsertEntry } from "@shared/schema";

// User Profile Operations
export const createUserProfile = async (uid: string, email: string, displayName?: string) => {
  const userProfile: Omit<UserProfile, 'createdAt' | 'updatedAt'> = {
    uid,
    email,
    displayName: displayName || null,
    photoURL: null,
  };

  try {
    await setDoc(doc(db, "users", uid), {
      ...userProfile,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return userProfile;
  } catch (error) {
    console.error("Error creating user profile:", error);
    throw error;
  }
};

export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
  try {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        uid: data.uid,
        email: data.email,
        displayName: data.displayName,
        photoURL: data.photoURL,
        createdAt: data.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
        updatedAt: data.updatedAt?.toDate?.()?.toISOString() || new Date().toISOString(),
      };
    }
    return null;
  } catch (error) {
    console.error("Error getting user profile:", error);
    throw error;
  }
};

export const updateUserProfile = async (uid: string, updates: Partial<UserProfile>) => {
  try {
    const docRef = doc(db, "users", uid);
    await updateDoc(docRef, {
      ...updates,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw error;
  }
};

// Entry Operations
export const createEntry = async (uid: string, entry: InsertEntry) => {
  try {
    const docRef = await addDoc(collection(db, "users", uid, "entries"), {
      ...entry,
      userId: uid,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error creating entry:", error);
    throw error;
  }
};

export const updateEntry = async (uid: string, entryId: string, updates: Partial<Entry>) => {
  try {
    const docRef = doc(db, "users", uid, "entries", entryId);
    await updateDoc(docRef, {
      ...updates,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error updating entry:", error);
    throw error;
  }
};

export const deleteEntry = async (uid: string, entryId: string) => {
  try {
    const docRef = doc(db, "users", uid, "entries", entryId);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting entry:", error);
    throw error;
  }
};

// Real-time listener for entries
export const listenToEntries = (uid: string, callback: (entries: Entry[]) => void) => {
  const q = query(
    collection(db, "users", uid, "entries"),
    orderBy("timestamp", "desc")
  );

  return onSnapshot(q, (snapshot) => {
    const entries: Entry[] = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      entries.push({
        id: doc.id,
        userId: data.userId,
        bottles: data.bottles,
        amount: data.amount,
        timestamp: data.timestamp,
        status: data.status,
        createdAt: data.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
        updatedAt: data.updatedAt?.toDate?.()?.toISOString() || new Date().toISOString(),
      });
    });
    callback(entries);
  });
};