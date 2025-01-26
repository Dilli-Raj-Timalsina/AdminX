import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import type { ZodError, ZodSchema } from "zod";

import { ServiceResponse } from "@/common/models/service-response";

export const handleServiceResponse = (
  serviceResponse: ServiceResponse<any>,
  response: Response
) => {
  return response.status(serviceResponse.statusCode).send(serviceResponse);
};

export const validateRequest =
  (
    bodySchema: ZodSchema | null,
    querySchema: ZodSchema | null,
    paramsSchema: ZodSchema | null
  ) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      bodySchema && bodySchema.parse({ ...req.body });
      querySchema && querySchema.parse({ ...req.query });
      paramsSchema && paramsSchema.parse({ ...req.params });
      next();
    } catch (err) {
      const errorMessage = `Invalid input: ${(err as ZodError).errors
        .map((e) => e.message)
        .join(", ")}`;
      const statusCode = StatusCodes.BAD_REQUEST;
      const serviceResponse = ServiceResponse.failure(
        errorMessage,
        null,
        statusCode
      );
      return handleServiceResponse(serviceResponse, res);
    }
  };
