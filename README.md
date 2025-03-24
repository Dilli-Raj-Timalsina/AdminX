# AdminX

A powerful and flexible API generator that automatically creates database tables, CRUD endpoints and Admin Panel for UI from entity definitions.

![AdminX](https://img.shields.io/badge/AdminX-1.0.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue)
![Express](https://img.shields.io/badge/Express-4.x-green)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14.x-blue)

## Description

AdminX is a powerful backend framework built with Express.js that automatically generates database tables and CRUD endpoints from entity definitions. Simply define your data model once, and the system will create PostgreSQL tables, validation schemas, and RESTful API endpoints with proper documentation. The architecture follows a code-first approach where entity definitions drive the entire API lifecycle, making development faster and more consistent. This system is designed for rapid application development while maintaining type safety, validation, and comprehensive documentation throughout.

## Features

- **Dynamic CRUD Generation**: Automatically generates endpoints for all your entities based on their definitions.
- **Automatic Table Creation**: Creates PostgreSQL tables with proper columns, constraints, and indexes based on entity definitions.
- **Entity-based Routing**: Routes are organized based on entity definitions for better structure and readability.
- **Validation with Zod**: Request validation using generated Zod schemas that match your entity structure.
- **OpenAPI Integration**: Automatically generates OpenAPI specifications for all entity endpoints.
- **Swagger UI for API Documentation**: Interactive interface to explore and test your dynamically generated API endpoints.
- **Type Safety**: Full TypeScript support throughout the codebase ensures type safety and better developer experience.
- **Error Handling Middleware**: Centralized error handling to manage and respond to errors gracefully.
- **Logging with Pino**: High-performance logging for Node.js applications.
- **Environment-based Configuration**: Easily switch configurations based on the environment.
- **Modular Architecture**: Designed for easy extension and maintenance.
- **Security Best Practices**: Follows industry standards to ensure the security of your application.
- **Scalable Design**: Built to handle increasing loads and scale with your application's growth.

## Entity Definition

### Entity Structure

Entities are defined using a TypeScript interface:

```typescript
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
```

### Field Types

The system supports various field types:

```typescript
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
```

### Example Entity Definition

```typescript
const UserEntity: IEntity = {
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
    },
  ],
  relations: [],
};
```

## Architecture

### Table Generation

The system automatically generates PostgreSQL tables based on entity definitions:

```typescript
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
```

### Validation Schema Generation

Zod validation schemas are generated from entity definitions:

```typescript
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
```

### CRUD Routes Generation

The system automatically generates Express routes for CRUD operations:

```typescript
const generateCrudRoutes = (crudRouter: Router, entity: IEntity) => {
  const {
    EntitySchema,
    GetEntitySchema,
    GetAllEntitySchema,
    PostEntitySchema,
    PatchEntitySchema,
    DeleteEntitySchema,
  } = generateCrudModels(entity);

  const tableName = entity.dbConfig.tableName;

  crudRouter.get(
    "/",
    validateRequest(null, GetAllEntitySchema.shape.query, null),
    (req, res) => crudService.findAll(req, res, tableName)
  );

  crudRouter.get(
    "/:id",
    validateRequest(null, null, GetEntitySchema),
    (req, res) => crudService.findById(req, res, tableName)
  );

  crudRouter.post(
    "/",
    validateRequest(
      PostEntitySchema.body.content["application/json"].schema,
      null,
      null
    ),
    (req, res) => crudService.create(req, res, tableName, entity)
  );

  crudRouter.patch(
    "/:id",
    validateRequest(
      PatchEntitySchema.body.content["application/json"].schema.partial(),
      null,
      GetEntitySchema
    ),
    (req, res) => crudService.update(req, res, tableName)
  );

  crudRouter.delete(
    "/:id",
    validateRequest(null, null, GetEntitySchema),
    (req, res) => crudService.delete(req, res, tableName)
  );
};
```

## Installation

1. **Clone the repository**:

   ```sh
   git clone <repository-url>
   ```

2. **Navigate to the project directory**:

   ```sh
   cd backend
   ```

3. **Install the dependencies**:

   ```sh
   npm install
   ```

4. **Configure environment variables**:
   Create a `.env` file with the following variables:

   ```
   NODE_ENV=development
   PORT=5000
   HOST=localhost

   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=open-saas
   DB_USERNAME=postgres
   DB_PASSWORD=yourpassword
   ```

## Usage

1. **Start the server**:

   ```sh
   npm start
   ```

2. **Access the server**:
   The server will be running at `http://localhost:5000`.

3. **Explore API documentation**:
   Visit `http://localhost:5000/api-docs` to view the Swagger UI.

4. **Define your entities**:
   Create entity definitions in the `/backend/src/api/crud/entity/` directory.

5. **Interact with CRUD routes**:
   CRUD routes are automatically available under `/api/<entity-name>`.

## API Endpoints

Once an entity is defined, the following endpoints are automatically available:

| Method | Endpoint          | Description         |
| ------ | ----------------- | ------------------- |
| GET    | /api/{entity}     | Get all records     |
| GET    | /api/{entity}/:id | Get record by ID    |
| POST   | /api/{entity}     | Create a new record |
| PATCH  | /api/{entity}/:id | Update a record     |
| DELETE | /api/{entity}/:id | Delete a record     |

## Frontend Admin Interface

The system includes a powerful React-based admin interface for creating and managing entity definitions without writing code.

### Features

- **Entity Creation Form**: User-friendly interface to create entity definitions
- **Field Type Editor**: Visual editor for defining entity fields with validation
- **Relation Manager**: UI for setting up relationships between entities
- **Entity Preview**: Instant preview of your entity structure before saving
- **Entity Management**: Edit, clone, or delete existing entity definitions

### Admin Dashboard

The admin dashboard provides a comprehensive overview of all registered entities and system status. It includes:

- Quick access to create new entities
- List of all registered entities with key metrics
- System status and health indicators
- API documentation link

### Entity Definition UI

Define entities through a intuitive UI with support for:

- General entity properties (name, table name, description)
- Field definitions with full type support
- Input options configuration (labels, placeholders, validation)
- Relationship mapping between entities
- Advanced options like indexes and constraints

### Example

```tsx
export default function EntityGeneratorForm() {
  const [entity, setEntity] = useState<Partial<IEntity>>({
    key: "",
    dbConfig: {
      tableName: "",
      indexes: [],
    },
    display: {
      singularName: "",
      pluralName: "",
      description: "",
    },
    fields: [],
    relations: [],
  });

  // Form handling logic
  const addField = () => {
    const newField: IEntityField<IDbColumnType> = {
      key: "",
      dbConfig: {
        columnName: "",
        type: "varchar",
      },
      inputOptions: {
        type: "text",
        label: "",
      },
    };

    setEntity({
      ...entity,
      fields: [...(entity.fields || []), newField],
    });
  };

  // Additional methods for managing fields and relations
  // ...
}
```

### Getting Started with the Admin UI

1. Start the frontend development server:

   ```sh
   cd frontend
   npm run dev
   ```

2. Navigate to `http://localhost:3000/admin` in your browser

3. Use the entity creation form to define your data model

4. Save your entity and instantly get a fully functional API endpoint

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any improvements or bug fixes.

---

Built with ❤️ using TypeScript, Express, and PostgreSQL.
