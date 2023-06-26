import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";

export const firebaseApp = initializeApp();
export const db = getFirestore(firebaseApp);
export const storage = getStorage(firebaseApp);
