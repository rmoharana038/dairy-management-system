import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyCCisE-PQ93kSxFj526dlmtBBnk7r4spSU",
  authDomain: `${import.meta.env.VITE_FIREBASE_PROJECT_ID || "milk-bottle-tracker"}.firebaseapp.com`,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "milk-bottle-tracker",
  storageBucket: `${import.meta.env.VITE_FIREBASE_PROJECT_ID || "milk-bottle-tracker"}.appspot.com`,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "265806131846",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:265806131846:web:e8712e547324c04cd09707"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
