export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export type PaginatedMeta = PaginationMeta;

export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}

export interface ApiResponse<T> {
  status: number;
  code: string;
  message: string;
  data: T;
  path?: string;
  timestamp?: string;
  errors?: any;
}
