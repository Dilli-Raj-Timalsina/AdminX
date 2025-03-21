import { IEntity } from "@/types/entity";

export const InsightEntity: IEntity = {
  key: "insights",

  dbConfig: {
    tableName: "insights",
    indexes: [],
  },

  display: {
    singularName: "Insight",
    pluralName: "Insights",
    description: "Insights generated from data analysis",
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
      key: "title",
      dbConfig: {
        columnName: "title",
        type: "varchar",
      },
      inputOptions: {
        type: "text",
        label: "Title",
        placeholder: "Enter insight title",
        required: true,
      },
      saveOptions: {
        trim: true,
        validate: (v) => {
          if (v.length < 5) return { error: "Title too short" };
        },
      },
    },
    {
      key: "description",
      dbConfig: {
        columnName: "description",
        type: "text",
      },
      inputOptions: {
        type: "textarea",
        label: "Description",
        placeholder: "Enter insight description",
        required: true,
      },
    },
    {
      key: "createdBy",
      dbConfig: {
        columnName: "created_by",
        type: "uuid",
        indexed: true,
      },
      inputOptions: {
        type: "text",
        label: "Created By",
        readOnly: false,
      },
    },
    {
      key: "isPublished",
      dbConfig: {
        columnName: "is_published",
        type: "boolean",
      },
      inputOptions: {
        type: "checkbox",
        label: "Published Status",
      },
    },
  ],

  relations: [
    {
      key: "creator",
      type: "many-to-one",
      targetEntityKey: "users",
      targetFieldKey: "id",
    },
  ],
};
