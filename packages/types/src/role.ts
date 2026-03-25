export interface Role {
  _id: string;
  name: string;
  description: string;
  isActive: number;
  createdAt: string;
  updatedAt: string;
  permissionIds?: string[];
}

export interface RoleWithPagination {
  data: Role[];
  meta: import('./common.js').PaginatedMeta;
}
