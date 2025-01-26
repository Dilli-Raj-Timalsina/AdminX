import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";
import { commonValidations } from "@/common/utils/common-validations";
import { Client } from "./entity/client.entity";
import { generateCrudSchema } from "./helpers/generate-crud-schema";

extendZodWithOpenApi(z);

export const CrudSchema = generateCrudSchema(Client);
export type CrudSchemaType = z.infer<typeof CrudSchema>;

//GET /crud/{id}
export const GetCrudSchema = z.object({
  params: z.object({ id: commonValidations.id }),
});

//GET /crud
export const GetAllCrudSchema = z.object({
  query: CrudSchema.partial(),
});

//POST /crud
export const PostCrudSchema = {
  body: {
    content: {
      "application/json": {
        schema: CrudSchema,
      },
    },
  },
  required: true,
};

//PATCH /crud/{id}
export const PatchCrudSchema = {
  params: z.object({ id: commonValidations.id }),
  body: {
    content: {
      "application/json": {
        schema: CrudSchema,
      },
    },
    required: true,
  },
};

//DELETE /crud/{id}
export const DeleteCrudSchema = z.object({
  params: z.object({ id: commonValidations.id }),
});
