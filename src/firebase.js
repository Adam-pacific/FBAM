import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { getFirestore, collection, addDoc, getDocs, orderBy, query } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// Your web app's Firebase configuration
// Pulling from Vite environment variables for security and deployment
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBgTL8h2ASI-Z_PZIxUyZ-2C02N18U1Hww",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "fbam-c3c25.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "fbam-c3c25",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "fbam-c3c25.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "188685488730",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:188685488730:web:5b5dad0067193205cdfe63"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage, signInWithEmailAndPassword, signOut, collection, addDoc, getDocs, orderBy, query, ref, uploadBytes, getDownloadURL };
