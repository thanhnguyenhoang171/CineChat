import axios from 'axios';
import { useBoundStore } from '~/store'; // Đảm bảo import đúng store tổng
import { Mutex } from 'async-mutex';
import { BusinessCode } from '~/types/bussiness-code';

const mutex = new Mutex();

export const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.request.use((config) => {
  // Take token từ Zustand Store
  const token = useBoundStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log('error in interceptors response = ', error);

    const originalRequest = error.config;
    const store = useBoundStore.getState();

    // Checking for 401 error and token expiration
    if (
      error.response?.status === 401 &&
      error.response?.data?.code === BusinessCode.TOKEN_EXPIRED &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        await mutex.runExclusive(async () => {
          const currentToken = store.accessToken;
          const failedToken =
            originalRequest.headers.Authorization?.split(' ')[1];

          // If token has been refreshed by another request, use the new token --> skip refresh
          if (currentToken && currentToken !== failedToken) {
            originalRequest.headers.Authorization = `Bearer ${currentToken}`;
            return;
          }

          // Refresh token logic
          store.setRefreshTokenStatus(true, null);
          try {
            const response = await axios.post(
              `${import.meta.env.VITE_API_URL}/auth/refresh`,
              {},
              { withCredentials: true },
            );

            const newAccessToken = response.data.data.access_token;

            // Update new token in zustand store (only token, not user info --> using setAccessToken)
            store.setAccessToken(newAccessToken);

            store.setRefreshTokenStatus(false, null);

            // Get user info only when the original request is not for account info
            if (
              !originalRequest.url?.includes('/auth/account') &&
              !originalRequest.url?.includes('/auth/login') &&
              !originalRequest.url?.includes('/auth/logout')
            ) {
              store.fetchAccount(); // don't await --> avoid slowing down the retry
            }

            // Update Authorization header
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          } catch (apiError: any) {
            throw apiError;
          }
        });

        // Retry request
        return axiosClient(originalRequest);
      } catch (refreshError: any) {
        // Refresh failed: handle logout
        const errorMessage = refreshError?.response?.data?.message;

        store.setRefreshTokenStatus(false, errorMessage);

        // Logout Clean
        store.logout();
        window.location.href = '/login';

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);
