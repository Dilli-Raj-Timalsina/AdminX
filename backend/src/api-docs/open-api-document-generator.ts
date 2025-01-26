import {
  OpenAPIRegistry,
  OpenApiGeneratorV3,
} from "@asteasolutions/zod-to-openapi";
import {
  CrudRegistry,
  generateCrudPaths,
} from "@/api/crud/helpers/generate-crud-paths";
import { healthCheckRegistry } from "@/api/health-check/health-check-router";
import { entityList } from "@/common/constants/entity-list";

export function generateOpenAPIDocument() {
  entityList.forEach((entity) => {
    generateCrudPaths(entity);
  });

  const registry = new OpenAPIRegistry([healthCheckRegistry, CrudRegistry]);
  const generator = new OpenApiGeneratorV3(registry.definitions);

  return generator.generateDocument({
    openapi: "3.0.0",
    info: {
      version: "1.0.0",
      title: "Swagger API",
    },
    externalDocs: {
      description: "View the raw OpenAPI Specification in JSON format",
      url: "/swagger.json",
    },
  });
}
