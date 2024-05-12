type PaginatedResponse<T> = {
  data: T[];
  total: number;
  limit: number;
  offset: number;
  totalPages: number;
};

type PaginationParams = {
  orderBy: string;
  orderDirection: OrderDirection;
  offset: number;
  limit: number;
};

type OrderDirection = "asc" | "desc";

export { PaginatedResponse, PaginationParams, OrderDirection };
