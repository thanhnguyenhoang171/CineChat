import { axiosClient } from '~/lib/axios-client';
import type {
  ApiResponse,
  UploadAvatar,
  User,
} from '~/types/module-types/user';

export const userService = {
  getAll: async () => {
    const response = await axiosClient.get<ApiResponse<User[]>>('/users');
    console.log('Checking response.data = ', response.data);

    return response.data;
  },
  uploadAvatar: async (
    folder: string,
    imageBlob: Blob,
    originalFile: { name: string; type: string },
  ) => {
    const formData = new FormData();
    const file = new File([imageBlob], originalFile.name, {
      type: originalFile.type,
    });
    formData.append('file', file);
    const response = await axiosClient.post<ApiResponse<UploadAvatar>>(
      '/users/upload-avatar',
      formData,
      {
        params: { folder },
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    console.log('Checking response.data = ', response.data);

    return response.data;
  },
  updateFullName: async (firstName: string, lastName: string) => {
    const response = await axiosClient.patch<ApiResponse<User>>(
      '/users/update-full-name',
      { firstName, lastName },
    );
    console.log('Checking response.data = ', response.data);
    return response.data;
  },
};
