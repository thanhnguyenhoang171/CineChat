import { axiosClient } from '~/lib/axios-client';
import type { User, CreateUserDto, ApiResponse } from '~/types/module-types/user';

export const userService = {
  getAllUsersWithPagination: async ({
    page,
    limit,
    search,
    isActive,
    roleId,
    sortBy = 'createdAt',
    sortOrder = 'desc',
  }: any) => {
    const response = await axiosClient.get('/users', {
      params: {
        page,
        limit,
        search,
        isActive,
        roleId,
        sortBy,
        sortOrder,
      },
    });
    return response.data;
  },

  createUser: async (payload: CreateUserDto) => {
    const response = await axiosClient.post('/users', payload);
    return {
      status: response.status,
      message: response.data?.message || 'Success',
      data: response.data?.data,
    };
  },

  updateUser: async (id: string, payload: Partial<CreateUserDto>) => {
    const response = await axiosClient.patch(`/users/${id}`, payload);
    return {
      status: response.status,
      message: response.data?.message || 'Success',
      data: response.data?.data,
    };
  },

  deleteUser: async (id: string) => {
    const response = await axiosClient.delete(`/users/${id}`);
    return {
      status: response.status,
      message: response.data?.message || 'Success',
      data: response.data?.data,
    };
  },

  uploadAvatar: async (
    folder: string,
    imageBlob: Blob,
    originalFile: { name: string; type: string },
  ) => {
    const formData = new FormData();
    // Chuyển Blob thành File để Cloudinary nhận diện đúng định dạng
    const file = new File([imageBlob], originalFile.name, { type: originalFile.type });
    formData.append('file', file);

    const response = await axiosClient.post(`/users/upload-avatar`, formData, {
      params: { folder },
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return {
      status: response.status,
      message: response.data?.message || 'Upload Success',
      data: response.data?.data, // Chứa { _id, picture: { url } }
    };
  },

  updateFullName: async (firstName: string, lastName: string) => {
    const response = await axiosClient.patch('/users/update-full-name', {
      firstName,
      lastName,
    });
    return {
      status: response.status,
      message: response.data?.message || 'Success',
      data: response.data?.data,
    };
  },

  // API lấy danh sách user để gán quyền (đã có trong Backend)
  fetchUserListToSignRole: async (params: any) => {
    const response = await axiosClient.get('/users/list-to-sign-role', { params });
    return response.data;
  },

  signRoleToUser: async (roleId: string, userIds: string[]) => {
    const response = await axiosClient.patch(`/users/sign-role-to-users/${roleId}`, {
      userIds,
    });
    return response.data;
  },
};
