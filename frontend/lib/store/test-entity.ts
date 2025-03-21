import { IEntity } from "@/types/entity";

export const TestEntity: IEntity = {
  key: "users",
  dbConfig: {
    tableName: "users",
    indexes: [],
  },
  display: {
    singularName: "User",
    pluralName: "Users",
    description: "System users",
  },
  fields: [
    {
      key: "dfsf",
      dbConfig: {
        columnName: "name",
        type: "integer",
        unique: true,
        indexed: true,
      },
      inputOptions: {
        type: "number",
        label: "das",
        placeholder: "Enter name...",
        required: true,
      },
    },
  ],
  relations: [
    {
      key: "posts",
      type: "many-to-one",
      targetEntityKey: "posts",
      targetFieldKey: "userId",
    },
  ],
};
