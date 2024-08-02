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

type BaseModel = {
  id?: string;
};

export type { OrderDirection, FlattenKeys, BaseModel };
