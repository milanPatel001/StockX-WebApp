import { getFirestore } from "firebase/firestore";
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: "stockx-655e8.firebaseapp.com",
  projectId: "stockx-655e8",
  storageBucket: "stockx-655e8.appspot.com",
  messagingSenderId: "757378973387",
  appId: "1:757378973387:web:694e784ce3529b6407a54e",
};

const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export { db, auth, provider };
