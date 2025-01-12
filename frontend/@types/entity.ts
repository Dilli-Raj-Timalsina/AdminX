/* eslint-disable @typescript-eslint/no-explicit-any */
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
    : never;

export interface IEntityField<
  ColType extends IDbColumnType,
  InputType extends IEntityInputFieldType<ColType> = IEntityInputFieldType<ColType>,
  OtherInputType = "select" | "multi-select" | InputType
> {
  key: string;

  dbConfig: {
    columnName: string;
    type: ColType;
    nullable?: boolean;
    unique?: boolean;
    indexed?: boolean;
  };

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

  displayOptions?: {
    format?: (value: any) => any;
  };
}

export type IEntityRelationType =
  | "many-to-one"
  | "one-to-one"
  | "many-to-many"
  | "one-to-many";

export type IEntityRelation = {
  key: string;
  type: IEntityRelationType;
  targetEntityKey: string;
  targetFieldKey: string;
};

export interface IEntity {
  key: string;

  dbConfig: {
    tableName: string;
    indexes?: Array<{
      fields: Array<string>;
      unique: boolean;
    }>;
  };

  display: {
    singularName: string;
    pluralName: string;
    description?: string;
  };

  fields: Array<IEntityField<IDbColumnType>>;
  relations: Array<IEntityRelation>;
}
