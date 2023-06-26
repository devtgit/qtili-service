import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import {
  FirebaseDataProvider,
  FirebaseAuthProvider,
  RAFirebaseOptions,
} from "react-admin-firebase";

const firebaseConfig = JSON.parse(import.meta.env.VITE_FIREBASE_CONFIG_JSON);

export const firebaseApp = firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore(firebaseApp);
if (import.meta.env.VITE_FIRESTORE_EMULATOR_HOST) {
  const [host, port] = import.meta.env.VITE_FIRESTORE_EMULATOR_HOST.split(":");
  db.useEmulator(host, Number(port));
}

export const auth = firebase.auth();
if (import.meta.env.VITE_AUTH_EMULATOR_HOST) {
  auth.useEmulator(import.meta.env.VITE_AUTH_EMULATOR_HOST);
}

const options: RAFirebaseOptions = {
  app: firebaseApp,
  persistence: "local",
};
export const dataProvider = FirebaseDataProvider(firebaseConfig, options);
export const authProvider = FirebaseAuthProvider(firebaseConfig, options);
