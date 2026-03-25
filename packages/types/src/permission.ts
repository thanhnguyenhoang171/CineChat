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
  roleIds?: string[];
}

export interface PermissionWithPagination {
  data: Permission[];
  meta: import('./common.js').PaginatedMeta;
}
