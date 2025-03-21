import { UserEntity } from "./user-entity";
import { IEntity } from "@/types/entity";
import { PostEntity } from "./post-entity";
import { InsightEntity } from "./insight-entity";

export const entityList: Array<IEntity> = [
  UserEntity,
  PostEntity,
  InsightEntity,
];
