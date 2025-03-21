import { type Router } from "express";
import { validateRequest } from "@/common/utils/http-handler";
import { IEntity } from "@/types/entity";
import { generateCrudModels } from "../crud-model";
import { crudService } from "../crud-service";

const generateCrudRoutes = (crudRouter: Router, entity: IEntity) => {
  const {
    EntitySchema,
    GetEntitySchema,
    GetAllEntitySchema,
    PostEntitySchema,
    PatchEntitySchema,
    DeleteEntitySchema
  } = generateCrudModels(entity);
  
  const tableName = entity.dbConfig.tableName;

  crudRouter.get(
    "/",
    validateRequest(null, GetAllEntitySchema.shape.query, null),
    (req, res) => crudService.findAll(req, res, tableName)
  );

  crudRouter.get(
    "/:id",
    validateRequest(null, null, GetEntitySchema),
    (req, res) => crudService.findById(req, res, tableName)
  );

  crudRouter.post(
    "/",
    validateRequest(PostEntitySchema.body.content["application/json"].schema, null, null),
    (req, res) => crudService.create(req, res, tableName, entity)
  );

  crudRouter.patch(
    "/:id",
    validateRequest(
      PatchEntitySchema.body.content["application/json"].schema.partial(),
      null,
      GetEntitySchema
    ),
    (req, res) => crudService.update(req, res, tableName)
  );

  crudRouter.delete(
    "/:id",
    validateRequest(null, null, GetEntitySchema),
    (req, res) => crudService.delete(req, res, tableName)
  );
};

export default generateCrudRoutes;
