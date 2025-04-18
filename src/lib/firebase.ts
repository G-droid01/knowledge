
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut as firebaseSignOut } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyANJTBJky8hXrwLQtCWcosCJgOMLLgaFCM",
  authDomain: "e-learning-78f6d.firebaseapp.com",
  projectId: "e-learning-78f6d",
  storageBucket: "e-learning-78f6d.firebasestorage.app",
  messagingSenderId: "86240420099",
  appId: "1:86240420099:web:1c5106d53b66a222e68936"
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
