export interface Role {
  _id: string;
  name: string;
  description: string;
  isActive: number;
  createdAt: string;
  updatedAt: string;
  permissionIds?: string[];
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface RoleWithPagination {
  data: Role[];
  meta: PaginationMeta;
}
