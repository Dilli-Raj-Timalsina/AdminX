import { IEntity } from "@/types/entity";

export const generateTableDefinition = (entity: IEntity): string => {
  const { dbConfig, fields } = entity;

  let sql = `CREATE TABLE ${dbConfig.tableName} (\n`;

  fields.forEach((field) => {
    const { key, dbConfig } = field;
    let fieldDefinition = `  ${dbConfig.columnName} ${mapTypeToPostgres(
      dbConfig.type
    )}`;

    if (dbConfig.unique) fieldDefinition += " UNIQUE";
    if (!dbConfig.nullable) fieldDefinition += " NOT NULL";

    sql += fieldDefinition + ",\n";
  });

  // Removing trailing comma and adding closing bracket
  sql = sql.trim().replace(/,$/, "") + "\n);";

  // Generate separate index creation statements
  fields.forEach((field) => {
    if (field.dbConfig.indexed) {
      sql += `\nCREATE INDEX idx_${dbConfig.tableName}_${field.dbConfig.columnName} ON ${dbConfig.tableName} (${field.dbConfig.columnName});`;
    }
  });

  return sql;
};

const mapTypeToPostgres = (type: string): string => {
  switch (type) {
    case "varchar":
      return "VARCHAR(255)";
    case "jsonb":
      return "JSONB";
    case "int":
      return "INTEGER";
    case "boolean":
      return "BOOLEAN";
    case "date":
      return "DATE";
    case "timestamp":
      return "TIMESTAMP";
    case "float":
      return "FLOAT";
    case "double":
      return "DOUBLE PRECISION";
    case "text":
      return "TEXT";
    case "uuid":
      return "UUID";
    default:
      throw new Error(`unsupported type: ${type}`);
  }
};
