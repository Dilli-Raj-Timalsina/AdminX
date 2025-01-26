import { type Router } from "express";
import { validateRequest } from "@/common/utils/http-handler";
import {
  DeleteCrudSchema,
  GetAllCrudSchema,
  GetCrudSchema,
  PatchCrudSchema,
  PostCrudSchema,
} from "../crud-model";
import { crudService } from "../crud-service";

const generateCrudRoutes = (crudRouter: Router) => {
  crudRouter.get(
    "/",
    validateRequest(null, GetAllCrudSchema.shape.query, null),
    crudService.findAll
  );

  crudRouter.get(
    "/:id",
    validateRequest(null, null, GetCrudSchema.shape.params),
    crudService.findById
  );

  crudRouter.post(
    "/",
    validateRequest(
      PostCrudSchema.body.content["application/json"].schema,
      null,
      null
    ),
    crudService.create
  );

  crudRouter.patch(
    "/:id",
    validateRequest(
      PatchCrudSchema.body.content["application/json"].schema.partial(),
      null,
      PatchCrudSchema.params
    ),
    crudService.update
  );

  crudRouter.delete(
    "/:id",
    validateRequest(null, null, DeleteCrudSchema.shape.params),
    crudService.delete
  );
};

export default generateCrudRoutes;
