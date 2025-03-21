import { InsightEntity } from "@/api/crud/entity/insight-entity";
import { PostEntity } from "@/api/crud/entity/post-entity";
import { UserEntity } from "@/api/crud/entity/user-entity";
import { IEntity } from "@/types/entity";

export const entityList: Array<IEntity> = [
  UserEntity,
  PostEntity,
  InsightEntity,
];
