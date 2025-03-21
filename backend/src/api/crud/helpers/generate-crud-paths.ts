import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";
import { generateCrudModels } from "../crud-model";
import { IEntity } from "@/types/entity";
import { createApiResponse } from "@/api-docs/open-api-response-builders";

const CrudRegistry = new OpenAPIRegistry();

const generateCrudPaths = (entity: IEntity) => {
  const { dbConfig, display } = entity;
  const path = `/api/${dbConfig.tableName}`;
  
  // Generate schemas specific to this entity
  const {
    EntitySchema,
    GetEntitySchema,
    GetAllEntitySchema,
    PostEntitySchema,
    PatchEntitySchema,
    DeleteEntitySchema
  } = generateCrudModels(entity);

  // GET /{entity}
  CrudRegistry.registerPath({
    method: "get",
    path: path,
    tags: [display.pluralName],
    request: { query: GetAllEntitySchema.shape.query },
    responses: createApiResponse(z.array(EntitySchema), `List of ${display.pluralName}`),
  });

  // GET /{entity}/{id}
  CrudRegistry.registerPath({
    method: "get",
    path: `${path}/{id}`,
    tags: [display.pluralName],
    request: { params: GetEntitySchema.shape.params },
    responses: createApiResponse(EntitySchema, display.singularName),
  });

  // POST /{entity}
  CrudRegistry.registerPath({
    method: "post",
    path: path,
    tags: [display.pluralName],
    request: PostEntitySchema,
    responses: createApiResponse(EntitySchema, `Created ${display.singularName}`),
  });

  // PATCH /{entity}/{id}
  CrudRegistry.registerPath({
    method: "patch",
    path: `${path}/{id}`,
    tags: [display.pluralName],
    request: PatchEntitySchema,
    responses: createApiResponse(EntitySchema, `Updated ${display.singularName}`),
  });

  // DELETE /{entity}/{id}
  CrudRegistry.registerPath({
    method: "delete",
    path: `${path}/{id}`,
    tags: [display.pluralName],
    request: { params: DeleteEntitySchema.shape.params },
    responses: createApiResponse(z.null(), `Deleted ${display.singularName}`),
  });
};

export { CrudRegistry, generateCrudPaths };
