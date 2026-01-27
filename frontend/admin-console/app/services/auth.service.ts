  import { axiosClient } from '~/lib/axios-client';
  import axios from 'axios';
  import type {
    LoginRequest,
    LoginResponse,
    RegisterAccountResponse,
    RegisterRequest,
  } from '~/types/module-types/auth';
  import type { ApiResponse, User } from '~/types/module-types/user';

  const BASE_URL = import.meta.env.VITE_API_URL;

  export const authService = {
    login: async (data: LoginRequest): Promise<ApiResponse<LoginResponse>> => {
      const response = await axios.post<ApiResponse<LoginResponse>>(
        `${BASE_URL}/auth/login`,
        data,
        { withCredentials: true }, // Send cookie (httpOnly refresh token)
      );
      return response.data;
    },
    logout: async (): Promise<ApiResponse<any>> => {
      const response = await axiosClient.post(
        `/auth/logout`,
        {},
        {
          withCredentials: true,
        },
      );
      return response.data;
    },
    getAccount: async () => {
      const response = await axiosClient.get<ApiResponse<User>>('/auth/account');
      console.log('Checking response.data = ', response.data);

      return response.data;
    },

    refreshToken: async (): Promise<ApiResponse<LoginResponse>> => {
      const response = await axios.post<ApiResponse<LoginResponse>>(
        `${BASE_URL}/auth/refresh`,
        {},
        { withCredentials: true }, // Send cookie (httpOnly refresh token)
      );
      return response.data;
    },

    registerAccount: async (
      data: RegisterRequest,
    ): Promise<ApiResponse<RegisterAccountResponse>> => {
      const response = await axios.post<ApiResponse<RegisterAccountResponse>>(
        `${BASE_URL}/auth/register`,
        data,
      );
      return response.data;
    },
  };
