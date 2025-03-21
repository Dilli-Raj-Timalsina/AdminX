import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";
import { commonValidations } from "@/common/utils/common-validations";
import { generateCrudSchema } from "./helpers/generate-crud-schema";
import { IEntity } from "@/types/entity";

extendZodWithOpenApi(z);

export const generateCrudModels = (entity: IEntity) => {
  const EntitySchema = generateCrudSchema(entity);
  
  // GET /{entity}/{id}
  const GetEntitySchema = z.object({
    params: z.object({ id: commonValidations.id }),
  });
  
  // GET /{entity}
  const GetAllEntitySchema = z.object({
    query: EntitySchema.partial(),
  });
  
  // POST /{entity}
  const PostEntitySchema = {
    body: {
      content: {
        "application/json": {
          schema: EntitySchema,
        },
      },
    },
    required: true,
  };
  
  // PATCH /{entity}/{id}
  const PatchEntitySchema = {
    params: z.object({ id: commonValidations.id }),
    body: {
      content: {
        "application/json": {
          schema: EntitySchema,
        },
      },
      required: true,
    },
  };
  
  // DELETE /{entity}/{id}
  const DeleteEntitySchema = z.object({
    params: z.object({ id: commonValidations.id }),
  });
  
  return {
    EntitySchema,
    GetEntitySchema,
    GetAllEntitySchema,
    PostEntitySchema,
    PatchEntitySchema,
    DeleteEntitySchema
  };
};

export type EntitySchemaType<T extends z.ZodType> = z.infer<T>;
