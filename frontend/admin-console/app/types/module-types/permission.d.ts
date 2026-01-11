export interface Permission {
  _id: string;
  name: string;
  apiPath: string;
  method: string;
  module: string;
  isActive: number;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface PermissionWithPagination {
  data: Permission[];
  meta: PaginationMeta;
}
