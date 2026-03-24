import axios from 'axios';
import { useBoundStore } from '~/store';
import { Mutex } from 'async-mutex';
import i18n from '~/lib/locales/i18n';
import { authService } from '~/services/auth.service';
import { BusinessCode } from '~/types/bussiness-code';
import { toast } from 'sonner';

const mutex = new Mutex();

export const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

axiosClient.interceptors.request.use(
  (config) => {
    // Take token từ Zustand Store (RAM)
    const token = useBoundStore.getState().accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log('error in interceptors response = ', error);

    const originalRequest = error.config;
    const store = useBoundStore.getState();
    /// Account deleted or locked
    if (
      error.response?.status === 401 &&
      (error.response?.data?.code === BusinessCode.ACCOUNT_DELETED ||
        error.response?.data?.code === BusinessCode.ACCOUNT_DISABLED)
    ) {
      // Thông báo cho người dùng
      const msg =
        error.response?.data?.code === BusinessCode.ACCOUNT_DELETED
          ? i18n.t('account:deleted_msg')
          : i18n.t('account:disabled_msg');

      console.warn(msg);
      toast.error(msg);

      store.logout();
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
      return Promise.reject(error);
    }

    // Checking for 401 error and token expiration
    if (
      error.response?.status === 401 &&
      error.response?.data?.code === BusinessCode.TOKEN_EXPIRED &&
      !originalRequest._retry // to avoid infinite loop
    ) {
      originalRequest._retry = true; // mark as retried

      try {
        await mutex.runExclusive(async () => {
          const currentToken = store.accessToken; // newst token in store

          const failedToken =
            originalRequest.headers.Authorization?.split(' ')[1]; // token used in failed request

          // If token has been refreshed by another request, use the new token --> skip refresh
          if (currentToken && currentToken !== failedToken) {
            originalRequest.headers.Authorization = `Bearer ${currentToken}`;
            return;
          }

          // Refresh token logic
          store.setRefreshTokenStatus(true, null);
          try {
            const response = await authService.refreshToken();

            const newAccessToken = response?.data?.access_token;

            // Update new token in zustand store
            store.setAccessToken(newAccessToken);

            store.setRefreshTokenStatus(false, null);

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
