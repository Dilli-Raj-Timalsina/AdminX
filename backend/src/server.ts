import cors from "cors";
import express, { Router, type Express } from "express";
import helmet from "helmet";
import { pino } from "pino";
import errorHandler from "@/common/middleware/error-handler";
import rateLimiter from "@/common/middleware/rate-limiter";
import { env } from "@/common/utils/envConfig";
import { entityList } from "@/common/constants/entity-list";
import generateCrudRoutes from "./api/crud/helpers/generate-crud-routes";
import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { healthCheckRouter } from "./api/health-check/health-check-router";
import { openAPIRouter } from "./api-docs/open-api-router";

const openApiRegistry: Array<OpenAPIRegistry> = [];
const logger = pino({ name: "server start" });
const app: Express = express();

// set the application to trust the reverse proxy
app.set("trust proxy", true);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
app.use(helmet());
app.use(rateLimiter);

entityList.forEach((entity) => {
  const crudRouter = Router();
  // register crud routes
  generateCrudRoutes(crudRouter);
  app.use(`/${entity.dbConfig.tableName}`, crudRouter);
});

// Routes
app.use("/health-check", healthCheckRouter);

// Swagger UI
app.use(openAPIRouter);

// Error handlers
app.use(errorHandler());

export { app, logger, openApiRegistry };
