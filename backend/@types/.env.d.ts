declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: string;
    PORT: string;
    HOST: string;
    CORS_ORIGIN: string;
    COMMON_RATE_LIMIT_WINDOW_MS: string;
    COMMON_RATE_LIMIT_MAX_REQUESTS: string;
    DB_TYPE: string;
    DB_HOST: string;
    DB_PORT: number;
    DB_USERNAME: string;
    DB_PASSWORD: string;
    DB_NAME: string;
  }
}
