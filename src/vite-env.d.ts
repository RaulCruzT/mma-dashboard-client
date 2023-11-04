/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_GOOGLE_OAUTH_CLIENT_ID: string;
    readonly VITE_SERVER: string;
    readonly VITE_SERVER_USER_CREATE_USER: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
