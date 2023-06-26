import { initializeApp } from "firebase/app";
import {
  getFirestore,
  connectFirestoreEmulator,
} from "firebase/firestore/lite";
import { getStorage, connectStorageEmulator } from "firebase/storage";

const firebaseConfig = JSON.parse(import.meta.env.VITE_FIREBASE_CONFIG_JSON);

export const firebaseApp = initializeApp(firebaseConfig);

export const db = getFirestore(firebaseApp);
if (import.meta.env.VITE_FIRESTORE_EMULATOR_HOST) {
  const [host, port] = import.meta.env.VITE_FIRESTORE_EMULATOR_HOST.split(":");
  connectFirestoreEmulator(db, host, Number(port));
}

export const storage = getStorage(firebaseApp);
if (import.meta.env.VITE_STORAGE_EMULATOR_HOST) {
  const [host, port] = import.meta.env.VITE_STORAGE_EMULATOR_HOST.split(":");
  connectStorageEmulator(storage, host, Number(port));
}
