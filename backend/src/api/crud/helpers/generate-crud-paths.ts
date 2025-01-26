import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";
import {
  CrudSchema,
  DeleteCrudSchema,
  GetAllCrudSchema,
  GetCrudSchema,
  PatchCrudSchema,
  PostCrudSchema,
} from "../crud-model";
import { IEntity } from "@/types/entity";
import { createApiResponse } from "@/api-docs/open-api-response-builders";

const CrudRegistry = new OpenAPIRegistry();

const generateCrudPaths = (entity: IEntity) => {
  const { dbConfig, display } = entity;
  const path = `/${dbConfig.tableName}`;

  CrudRegistry.registerPath({
    method: "get",
    path: path,
    tags: [display.pluralName],
    request: { params: GetAllCrudSchema.shape.query },
    responses: createApiResponse(z.array(CrudSchema), "Success"),
  });

  // GET /crud/{id}
  CrudRegistry.registerPath({
    method: "get",
    path: `${path}/{id}`,
    tags: [display.pluralName],
    request: { params: GetCrudSchema.shape.params },
    responses: createApiResponse(CrudSchema, "Success"),
  });

  // POST /crud
  CrudRegistry.registerPath({
    method: "post",
    path: path,
    tags: [display.pluralName],
    request: PostCrudSchema,
    responses: createApiResponse(z.null(), "Success"),
  });

  // PATCH /crud/{id}
  CrudRegistry.registerPath({
    method: "patch",
    path: `${path}/{id}`,
    tags: [display.pluralName],
    request: PatchCrudSchema,
    responses: createApiResponse(CrudSchema, "Success"),
  });

  // DELETE /crud/{id}
  CrudRegistry.registerPath({
    method: "delete",
    path: `${path}/{id}`,
    tags: [display.pluralName],
    request: { params: DeleteCrudSchema.shape.params },
    responses: createApiResponse(z.null(), "Success"),
  });
};

export { CrudRegistry, generateCrudPaths };
