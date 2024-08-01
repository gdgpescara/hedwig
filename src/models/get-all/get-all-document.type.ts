import type {FlattenKeys, OrderDirection} from "~/models/base-model.ts";

type GetAllDocumentsParam<T> = {
  orderBy: FlattenKeys<T>;
  orderDirection: OrderDirection;
};

export type { GetAllDocumentsParam };