// 📂 File: app/services/user.service.ts
import { axiosClient } from '~/lib/axios-client';
import type { ApiResponse, User } from '~/types/user';

// Gom nhóm các hàm API vào một object (giống Static Class)
export const userService = {
  // 1. Lấy danh sách
  getAll: async () => {
    const response = await axiosClient.get<ApiResponse<User[]>>('/users');
    console.log('Checking response.data = ', response.data);

    return response.data;
  },

  //   // 2. Lấy chi tiết
  //   getById: async (id: string) => {
  //     const response = await axiosClient.get<User>(`/users/${id}`);
  //     return response.data;
  //   },

  //   // 3. Tạo mới
  //   create: async (data: CreateUserDto) => {
  //     const response = await axiosClient.post<User>('/users', data);
  //     return response.data;
  //   },

  //   // 4. Xóa
  //   delete: async (id: string) => {
  //     const response = await axiosClient.delete(`/users/${id}`);
  //     return response.data;
  //   },
};
