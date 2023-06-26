import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";

const firebaseConfig = JSON.parse(import.meta.env.VITE_FIREBASE_CONFIG_JSON);

export const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);
