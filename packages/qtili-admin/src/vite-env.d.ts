/// <reference types="vite/client" />

interface ImportMetaEnv {
  // secrets
  VITE_FIREBASE_CONFIG_JSON: string;

  // local
  VITE_FUNCTIONS_ENDPOINT?: string;
  VITE_FIRESTORE_EMULATOR_HOST?: string;
  VITE_AUTH_EMULATOR_HOST?: string;
  VITE_DATABASE_EMULATOR_HOST?: string;
  VITE_STORAGE_EMULATOR_HOST?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
