type PaginatedResponse<T> = {
  data: T[];
  total: number;
  limit: number;
  offset: number;
  totalPages: number;
};

type PaginationParams<T> = {
  orderBy: FlattenKeys<T>;
  orderDirection: OrderDirection;
  offset: number;
  limit: number;
};

type OrderDirection = "asc" | "desc";

type FlattenKeys<T> = T extends object
  ? {
      [K in keyof T]-?: T[K] extends Date
        ? `${K & string}`
        : K extends string | number | boolean
          ? `${K}` | `${K & string}.${FlattenKeys<T[K]>}`
          : never;
    }[keyof T]
  : never;

export type { PaginatedResponse, PaginationParams, OrderDirection };
