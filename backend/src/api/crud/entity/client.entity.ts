import { IEntity } from "@/types/entity";

export const Client: IEntity = {
  key: "test",

  // this defines how enitity is translated to database table
  dbConfig: {
    tableName: "clients",
    indexes: [],
  },

  // this defines how Admin React app displays info related to this entity
  display: {
    singularName: "Client",
    pluralName: "Clients",
    description: "Clients of the company",
  },

  fields: [
    {
      key: "id",
      // how this field is mapped to DB column
      dbConfig: {
        columnName: "id",
        type: "varchar",
        unique: true,
        indexed: true,
      },
      // how this field is mapped to Input element in React Admin screen
      inputOptions: {
        type: "text",
        label: "ID",
        readOnly: true,
        required: true,
      },
    },

    {
      key: "status",
      dbConfig: {
        columnName: "status",
        type: "varchar",
        indexed: true,
      },

      inputOptions: {
        type: "select",
        placeholder: "Status",
        label: "Status",
        required: true,
        selectOptions: [
          { label: "Active", value: "active" },
          { label: "Inactive", value: "inactive" },
        ],
      },

      // This is run to validate and/or transform field value on Entity create/update
      saveOptions: {
        validate: (v: string) => {
          const ClientActiveOptionList = [
            { label: "Active", value: "active" },
            { label: "Inactive", value: "inactive" },
          ];
          if (
            !ClientActiveOptionList.find(
              (o: { value: string }) => o.value === v
            )
          ) {
            return { error: "Invalid status" };
          }
        },
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
        placeholder: "Name",
        label: "Name",
        required: true,
      },
      saveOptions: {
        trim: true,
        validate: (v) => {
          if (v.length < 3) {
            return { error: "Name must be at least 3 characters long" };
          }
        },
      },
    },

    {
      key: "address",
      dbConfig: {
        columnName: "address",
        type: "varchar",
        nullable: true,
      },
      inputOptions: {
        type: "text",
        placeholder: "Address",
        label: "Address",
        helpText: "The address of the client",
      },
    },

    {
      key: "primaryContactPerson",
      dbConfig: {
        columnName: "primary_contact_person",
        type: "varchar",
        nullable: true,
      },
      inputOptions: {
        type: "text",
        placeholder: "Primary Contact Person",
        label: "Primary Contact Person",
        helpText: "The primary contact person of the client",
      },
    },

    {
      key: "primaryContactPhone",
      dbConfig: {
        columnName: "primary_contact_phone",
        type: "varchar",
        nullable: true,
      },
      inputOptions: {
        type: "text",
        placeholder: "Primary Contact Phone",
        label: "Primary Contact Phone",
        helpText: "The primary contact phone of the client",
      },
    },

    {
      key: "primaryContactEmail",
      dbConfig: {
        columnName: "primary_contact_email",
        type: "varchar",
        nullable: true,
      },
      inputOptions: {
        type: "text",
        placeholder: "Primary Contact Email",
        label: "Primary Contact Email",
        helpText: "The primary contact email of the client",
      },
    },

    {
      key: "files",
      dbConfig: {
        columnName: "files",
        type: "jsonb",
        nullable: true,
      },
      inputOptions: {
        type: "text",
        placeholder: "Files",
        label: "Files",
        helpText: "The files of the client",
      },
    },
  ],

  relations: [
    {
      key: "projects",
      type: "one-to-many",
      targetEntityKey: "projects",
      targetFieldKey: "clientId",
    },
  ],
};
