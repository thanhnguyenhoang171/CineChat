import { axiosClient } from '~/lib/axios-client';
import type { ApiResponse } from '@cinechat/types';
import type {
  Permission,
  PermissionWithPagination,
} from '@cinechat/types';

interface GetPermissionsParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortDir?: 'asc' | 'desc';
  search?: string;
  projections?: string;
  method?: string;
  module?: string;
  isActive?: string;
}

export interface CreatePermissionDto {
  name: string;
  apiPath: string;
  method: string;
  module: string;
  isActive: number;
  roleIds?: string[];
}

export const permissionService = {
  getAllPermissionWithPagination: async ({
    page,
    limit,
    sortBy,
    sortDir,
    search,
    projections,
    method,
    module,
    isActive,
  }: GetPermissionsParams) => {
    let sortParam = null;
    if (sortBy) {
      sortParam = sortDir === 'desc' ? `-${sortBy}` : sortBy;
    }

    const filterParts: string[] = [];
    if (method && method !== 'all') filterParts.push(`method=${method}`);
    if (module) filterParts.push(`module=${module}`);
    
    const activeFilter = isActive === 'all' ? undefined : isActive;
    if (activeFilter !== undefined) filterParts.push(`isActive=${activeFilter}`);

    const filtersParam = filterParts.length > 0 ? filterParts.join('&') : undefined;

    const params: Record<string, any> = {
      page,
      limit,
      sort: sortParam,
      search: search || undefined,
      projections: projections || undefined,
      filters: filtersParam,
    };

    Object.keys(params).forEach((key) => {
      if (params[key] === undefined) {
        delete params[key];
      }
    });

    const response = await axiosClient.get<
      ApiResponse<PermissionWithPagination>
    >('/permissions', { params });

    return response.data?.data;
  },

  createPermission: async (payload: CreatePermissionDto) => {
    const response = await axiosClient.post<ApiResponse<Permission>>(
      '/permissions',
      payload,
    );
    return response.data;
  },

  updatePermission: async (id: string, payload: Partial<CreatePermissionDto>) => {
    const response = await axiosClient.patch<ApiResponse<Permission>>(
      `/permissions/${id}`,
      payload,
    );
    return response.data;
  },

  deletePermission: async (id: string) => {
    const response = await axiosClient.delete<ApiResponse<null>>(
      `/permissions/${id}`,
    );
    return response.data;
  },
};

