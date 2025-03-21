import { IEntity } from "@/types/entity";

export const UserEntity: IEntity = {
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
      key: "id",
      dbConfig: {
        columnName: "id",
        type: "uuid",
        unique: true,
        indexed: true,
      },
      inputOptions: {
        type: "text",
        label: "ID",
            readOnly: false,
      },
    },
    {
      key: "name",
      dbConfig: {
        columnName: "name",
        type: "varchar",
      },
      inputOptions: {
        type: "text",
        label: "Name",
        placeholder: "Enter full name",
        required: true,
      },
      saveOptions: {
        trim: true,
        validate: (v) => {
          if (v.length < 2) return { error: "Name too short" };
        },
      },
    },
    {
      key: "role",
      dbConfig: {
        columnName: "role",
        type: "varchar",
      },
      inputOptions: {
        type: "select",
        label: "Role",
        required: true,
        selectOptions: [
          { label: "Admin", value: "admin" },
          { label: "User", value: "user" },
          { label: "Guest", value: "guest" },
        ],
      },
    },
    {
      key: "email",
      dbConfig: {
        columnName: "email",
        type: "varchar",
        unique: true,
      },
      inputOptions: {
        type: "text",
        label: "Email",
        required: true,
      },
      saveOptions: {
        validate: (v) => {
          if (!v.includes("@")) return { error: "Invalid email" };
        },
      },
    },
    {
      key: "isActive",
      dbConfig: {
        columnName: "is_active",
        type: "boolean",
      },
      inputOptions: {
        type: "checkbox",
        label: "Active Status",
      },
    },
  ],

  relations: [
    {
      key: "posts",
      type: "one-to-many",
      targetEntityKey: "posts",
      targetFieldKey: "userId",
    },
  ],
};
