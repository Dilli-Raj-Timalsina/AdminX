import dotenv from "dotenv";
import { cleanEnv, host, num, port, str, testOnly } from "envalid";

dotenv.config();

export const env = cleanEnv(process.env, {
  NODE_ENV: str({
    devDefault: testOnly("test"),
    choices: ["development", "production", "test"],
  }),
  HOST: host({ devDefault: testOnly("localhost") }),
  PORT: port({ devDefault: testOnly(3000) }),
  CORS_ORIGIN: str({ devDefault: testOnly("*") }), // Allow CORS for all origins
  COMMON_RATE_LIMIT_MAX_REQUESTS: num({ devDefault: testOnly(1000) }),
  COMMON_RATE_LIMIT_WINDOW_MS: num({ devDefault: testOnly(1000) }),

  DB_TYPE: str({ devDefault: testOnly("postgres") }),
  DB_HOST: str({ devDefault: testOnly("localhost") }),
  DB_PORT: num({ devDefault: testOnly(5432) }),
  DB_USERNAME: str({ devDefault: testOnly("postgres") }),
  DB_PASSWORD: str({ devDefault: testOnly("randompassword") }),
  DB_NAME: str({ devDefault: testOnly("crud-test-db") }),
});
