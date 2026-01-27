import { axiosClient } from '~/lib/axios-client';
import type { ApiResponse } from '~/types/api-types/api-response';
import type { PermissionWithPagination } from '~/types/module-types/permission';

interface GetPermissionsParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortDir?: 'asc' | 'desc';
  search?: string;
  projections?: string;
}

export const permissionService = {
  getAllPermissionWithPagination: async ({
    page,
    limit,
    sortBy,
    sortDir,
    search,
    projections,
  }: GetPermissionsParams) => {
    let sortParam = null;
    if (sortBy) {
      sortParam = sortDir === 'desc' ? `-${sortBy}` : sortBy;
    }

    const response = await axiosClient.get<
      ApiResponse<PermissionWithPagination>
    >('/permissions', {
      params: {
        page,
        limit,
        sort: sortParam,
        search,
        projections,
      },
    });
    console.log('Checking response.data = ', response.data);

    return response.data?.data;
  },
};
