declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: "development" | "production";
    FUNCTIONS_EMULATOR: string;
  }
}
