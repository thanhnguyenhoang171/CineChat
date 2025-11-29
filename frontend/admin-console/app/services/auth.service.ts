import { axiosClient } from '~/lib/axios-client';
import type { LoginRequest, LoginResponse } from '~/types/auth';
import type { ApiResponse } from '~/types/user';

export const authService = {
  login: async (data: LoginRequest): Promise<ApiResponse<LoginResponse>> => {
    const response = await axiosClient.post<ApiResponse<LoginResponse>>(
      '/auth/login',
      data,
      { withCredentials: true }, // Gửi kèm cookie (httpOnly refresh token)
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
};
