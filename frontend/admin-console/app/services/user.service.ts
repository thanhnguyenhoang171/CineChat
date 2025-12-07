import { axiosClient } from '~/lib/axios-client';
import type { ApiResponse, User } from '~/types/user';


export const userService = {
  getAll: async () => {
    const response = await axiosClient.get<ApiResponse<User[]>>('/users');
    console.log('Checking response.data = ', response.data);

    return response.data;
  },

};
