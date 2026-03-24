import { toast } from 'sonner';
import { authService } from '~/services/auth.service';
import { useBoundStore } from '~/store';

export const silentRefreshToken = async (): Promise<boolean> => {
  try {
    const response = await authService.refreshToken();
    const newAccessToken = response?.data?.access_token || null;

    useBoundStore.getState().setAccessToken(newAccessToken);

    return true;
  } catch (error: any) {
    // if refresh token expired -> logout
    if (error.response?.status === 401) {
      const { isAuthenticated, logout } = useBoundStore.getState();
      if (isAuthenticated) {
        toast.error(
          error.response?.data?.message ||
            'Đã hết phiên làm việc, vui lòng đăng nhập lại!',
        );
      }
      logout();
    }
    return false;
  }
};
