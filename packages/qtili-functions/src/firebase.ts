import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

export const firebaseApp = initializeApp();
export const db = getFirestore(firebaseApp);
