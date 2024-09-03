import type { GetAllDocumentsParam } from "~/models/get-all/get-all-document.type.ts";
import type {LocalizationParam} from "~/models/localization/localization.type.ts";

type PaginatedResponse<T> = {
  data: T[];
  total: number;
  limit: number;
  offset: number;
  totalPages: number;
};

type PaginationParams<T> = GetAllDocumentsParam<T> & LocalizationParam & {
  offset: number;
  limit: number;
};

export type { PaginatedResponse, PaginationParams };
