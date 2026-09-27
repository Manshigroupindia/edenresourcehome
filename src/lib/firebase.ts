import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyAItWe2mZHC524S__aCRfDFP3wz613RGIw",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "eden-4ffbd.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "eden-4ffbd",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "eden-4ffbd.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "364343669699",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:364343669699:web:9b42a1d6bb419d1f820376",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-JPJ5ZRXD9M"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
