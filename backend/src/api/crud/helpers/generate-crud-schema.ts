import { IEntity, IDbColumnType } from "@/types/entity";
import { z } from "zod";

export const generateCrudSchema = (entity: IEntity): z.ZodObject<any> => {
  const { fields } = entity;

  const fieldSchemas = fields.reduce((acc, field) => {
    const { dbConfig, inputOptions } = field;
    let fieldSchema = mapFieldTypeToZod(
      dbConfig.type,
      dbConfig.nullable,
      inputOptions?.required
    );

    acc[field.dbConfig.columnName] = fieldSchema;
    return acc;
  }, {} as Record<string, z.ZodTypeAny>);

  return z.object(fieldSchemas);
};

const mapFieldTypeToZod = (
  type: IDbColumnType,
  nullable?: boolean,
  required?: boolean
): z.ZodTypeAny => {
  let schema: z.ZodTypeAny;
  switch (type) {
    case "varchar":
    case "char":
      schema = z.string();
      break;
    case "text":
      schema = z.string();
      break;
    case "jsonb":
      schema = z.any().transform((val) => JSON.stringify(val));
      break;
    case "smallint":
    case "integer":
    case "float":
      schema = z.number();
      break;
    case "boolean":
      schema = z.boolean();
      break;
    case "date":
    case "timestamp":
    case "timestamptz":
      schema = z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: "invalid date format",
      });
      break;
    case "uuid":
      schema = z.string().uuid();
      break;
    default:
      throw new Error(`unsupported type: ${type}`);
  }

  return schema.refine(
    (val) => {
      if (!nullable && (val === null || val === undefined)) return false;
      if (required && val === "") return false;
      return true;
    },
    {
      message: "value validation failed",
    }
  );
};
