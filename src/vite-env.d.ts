/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_API_MOCK: string
  // add more env variables as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
