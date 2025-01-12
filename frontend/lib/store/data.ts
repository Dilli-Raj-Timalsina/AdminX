import { v4 as uuidv4 } from "uuid";

type EntityData = Record<string, any>;

class EntityStore {
  private data: Map<string, Map<string, EntityData>>;

  constructor() {
    this.data = new Map();
  }

  // Initialize
  initEntity(entityKey: string) {
    if (!this.data.has(entityKey)) {
      this.data.set(entityKey, new Map());
    }
  }

  // Create
  async create(
    entityKey: string,
    data: Omit<EntityData, "id">
  ): Promise<EntityData> {
    const entityMap = this.data.get(entityKey);
    if (!entityMap) throw new Error(`Entity ${entityKey} not found`);

    const id = uuidv4();
    const record = { id, ...data };
    entityMap.set(id, record);
    return record;
  }

  // Read (list all)
  async list(entityKey: string): Promise<EntityData[]> {
    const entityMap = this.data.get(entityKey);
    if (!entityMap) throw new Error(`Entity ${entityKey} not found`);

    return Array.from(entityMap.values());
  }

  // Read (single)
  async get(entityKey: string, id: string): Promise<EntityData | null> {
    const entityMap = this.data.get(entityKey);
    if (!entityMap) throw new Error(`Entity ${entityKey} not found`);

    return entityMap.get(id) || null;
  }

  // Update
  async update(
    entityKey: string,
    id: string,
    data: Partial<EntityData>
  ): Promise<EntityData> {
    const entityMap = this.data.get(entityKey);
    if (!entityMap) throw new Error(`Entity ${entityKey} not found`);

    const existing = entityMap.get(id);
    if (!existing) throw new Error(`Record ${id} not found`);

    const updated = { ...existing, ...data };
    entityMap.set(id, updated);
    return updated;
  }

  // Delete
  async delete(entityKey: string, id: string): Promise<void> {
    const entityMap = this.data.get(entityKey);
    if (!entityMap) throw new Error(`Entity ${entityKey} not found`);

    entityMap.delete(id);
  }
}

export const store = new EntityStore();

store.initEntity("users");

store.create("users", {
  name: "John Doe",
  email: "john@example.com",
  role: "admin",
  isActive: true,
});

store.create("users", {
  name: "Jane Smith",
  email: "jane@example.com",
  role: "user",
  isActive: true,
});
