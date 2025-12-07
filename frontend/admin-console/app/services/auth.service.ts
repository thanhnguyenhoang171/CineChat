import { axiosClient } from '~/lib/axios-client';
import type { LoginRequest, LoginResponse } from '~/types/auth';
import type { ApiResponse, User } from '~/types/user';

export const authService = {
  login: async (data: LoginRequest): Promise<ApiResponse<LoginResponse>> => {
    const response = await axiosClient.post<ApiResponse<LoginResponse>>(
      '/auth/login',
      data,
      { withCredentials: true }, // Send cookie (httpOnly refresh token)
    );
    return response.data;
  },
  logout: () => {
    return axiosClient.post(
      '/auth/logout',
      {},
      {
        withCredentials: true,
      },
    );
  },

  getAccount: async () => {
    const response = await axiosClient.get<ApiResponse<User>>('/auth/account');
    console.log('Checking response.data = ', response.data);

    return response.data;
  },
};
