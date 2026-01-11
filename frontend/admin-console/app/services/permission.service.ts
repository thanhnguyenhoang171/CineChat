import { axiosClient } from '~/lib/axios-client';
import type { ApiResponse } from '~/types/api-types/api-response';
import type { PermissionWithPagination } from '~/types/module-types/permission';

interface GetPermissionsParams {
  page: number;
  limit: number;
}

export const permissionService = {
  getAllPermissionWithPagination: async ({
    page,
    limit,
  }: GetPermissionsParams) => {
    const response = await axiosClient.get<
      ApiResponse<PermissionWithPagination>
    >('/permissions', {
      params: {
        page,
        limit,
      },
    });
    console.log('Checking response.data = ', response.data);

    return response.data?.data;
  },
};
