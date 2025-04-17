
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut as firebaseSignOut } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQOTBkN_fciQ08C0Wkp7d-x7i3Jc0FfOc",
  authDomain: "lms-573.firebaseapp.com",
  projectId: "lms-573",
  storageBucket: "lms-573.firebasestorage.app",
  messagingSenderId: "22605140324",
  appId: "1:22605140324:web:0c7054ae8d0fa3f0f26a71",
  measurementId: "G-WG7WJ3CR4T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Authentication helper functions
export const signUp = async (email: string, password: string) => {
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signIn = async (email: string, password: string) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOut = async () => {
  return await firebaseSignOut(auth);
};

export default app;
