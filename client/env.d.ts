/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GA_MEASUREMENT_ID: string;
  readonly VITE_MAILGUN_API_KEY: string;
  readonly VITE_MAILGUN_DOMAIN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}