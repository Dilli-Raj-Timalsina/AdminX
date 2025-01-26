export type IDbColumnType =
  | "boolean"
  | "char"
  | "varchar"
  | "text"
  | "smallint"
  | "integer"
  | "float"
  | "date"
  | "timestamp"
  | "timestamptz"
  | "jsonb"
  | "uuid";

type IEntityInputFieldType<ColType extends IDbColumnType> =
  ColType extends "boolean"
    ? "checkbox"
    : ColType extends "char" | "varchar"
    ? "text"
    : ColType extends "text"
    ? "textarea"
    : ColType extends "smallint" | "integer" | "float"
    ? "number"
    : ColType extends "date" | "timestamp" | "timestamptz"
    ? "date"
    : ColType extends "jsonb"
    ? "json"
    : ColType extends "uuid"
    ? "uuid"
    : ColType extends "select"
    ? "select"
    : never;

export interface IEntityField<
  ColType extends IDbColumnType,
  InputType extends IEntityInputFieldType<ColType> = IEntityInputFieldType<ColType>,
  OtherInputType = "select" | "multi-select" | InputType
> {
  key: string;

  // How this field is stored in the DB
  dbConfig: {
    columnName: string;
    type: ColType;
    nullable?: boolean;
    unique?: boolean;
    indexed?: boolean;
  };

  // How input for this field is shown in the Admin Client
  inputOptions: {
    type: OtherInputType;
    placeholder?: string;
    label: string;
    helpText?: string;
    readOnly?: boolean;
    required?: boolean;
    hidden?: boolean;

    selectOptions?: OtherInputType extends "select" | "multi-select"
      ? Readonly<Array<{ label: string; value: string }>>
      : never;
  };

  saveOptions?: {
    validate?: (value: any) => { error: string } | undefined;
    trim?: boolean;
    transform?: (value: any) => any;
  };

  // How this field's value is displayed when viewing data in the Admin Client, by default, raw value is shown
  displayOptions?: {
    format?: (value: any) => any;
  };
}

type IEntityRelationType =
  // a column with _id suffix is created in the source entity
  | "many-to-one"

  // similar to many-to-one, but with unique constraint on the column
  | "one-to-one"

  // a new table with mm_source_entity_key_target_entity_key is created
  | "many-to-many"

  // similar to many-to-many, but with unique constraint on the columns
  | "one-to-many";

type IEntityRelations<RelType = IEntityRelationType> = Array<{
  key: string;
  type: RelType;
  targetEntityKey: string;
  targetFieldKey: string;
}>;

export interface IEntity {
  key: string;

  // How this entity is stored in the DB
  dbConfig: {
    tableName: string;

    indexes?: Array<{
      fields: Array<string>;
      unique: boolean;
    }>;
  };

  // How this entity is shown in the Admin Client
  display: {
    singularName: string;
    pluralName: string;
    description?: string;
  };

  fields: Array<IEntityField<IDbColumnType>>;

  relations: IEntityRelations;
}
