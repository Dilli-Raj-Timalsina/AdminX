import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Request, type Response, type Router } from "express";
import { z } from "zod";

import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { ServiceResponse } from "@/common/models/serviceResponse";
import { handleServiceResponse } from "@/common/utils/httpHandlers";

export const getEndPointsRegistry = new OpenAPIRegistry();
export const getEndPointsRouter: Router = express.Router();

getEndPointsRegistry.registerPath({
  method: "get",
  path: "/get-endpoints",
  tags: ["Get Endpoints"],
  responses: createApiResponse(z.null(), "Success"),
});

getEndPointsRouter.get("/", (_req: Request, res: Response) => {
  const serviceResponse = ServiceResponse.success("This route will generate crud endpoints and initializes db table for given entity defination !", null);
  return handleServiceResponse(serviceResponse, res);
});
