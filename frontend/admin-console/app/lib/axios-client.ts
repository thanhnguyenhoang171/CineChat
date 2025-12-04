import axios from 'axios';
import { useBoundStore } from '~/store';

export const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// This approach enables clean retry logic when handling authentication errors:
// Request interceptor - lấy accessToken từ memory/localStorage
axiosClient.interceptors.request.use((config) => {
  // Lấy token từ Bound Store (Auth Slice)
  const token = useBoundStore.getState().accessToken;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // ✅ Xử lý lỗi 401 - tự động refresh token
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Gọi API refresh token (refresh_token tự động gửi qua cookie)
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/auth/refresh`,
          {},
          { withCredentials: true }, // ✅ Quan trọng: gửi httpOnly cookie
        );

        const newAccessToken = response.data.data.access_token;

        // Cập nhật token mới vào Bound Store
        useBoundStore.getState().setAccessToken(newAccessToken);

        // ✅ Retry request với token mới
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosClient(originalRequest);
      } catch (refreshError) {
        // Refresh failed - logout user
        localStorage.removeItem('accessToken');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);
