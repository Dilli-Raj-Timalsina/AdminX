import { IEntity } from "@/types/entity";

export const PostEntity: IEntity = {
  key: "posts",

  dbConfig: {
    tableName: "posts",
    indexes: [],
  },

  display: {
    singularName: "Post",
    pluralName: "Posts",
    description: "User posts",
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
        placeholder: "Enter post title",
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
      key: "content",
      dbConfig: {
        columnName: "content",
        type: "text",
      },
      inputOptions: {
        type: "textarea",
        label: "Content",
        placeholder: "Enter post content",
        required: true,
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
      key: "author",
      type: "many-to-one",
      targetEntityKey: "users",
      targetFieldKey: "id",
    },
  ],
};
