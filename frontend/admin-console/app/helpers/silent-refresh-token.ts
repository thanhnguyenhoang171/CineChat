import { toast } from 'sonner';
import { authService } from '~/services/auth.service';
import { useBoundStore } from '~/store';

export const silentRefreshToken = async (): Promise<boolean> => {
  try {
    const response = await authService.refreshToken();
    const newAccessToken = response?.data?.access_token;

    useBoundStore.getState().setAccessToken(newAccessToken);

    return true;
  } catch (error: any) {
    // if refresh token expired -> logout
    if (error.response?.status === 401) {
      toast.error(
        `${error.response?.message} || 'Đã hết phiên làm việc, vui lòng đăng nhập lại!'`,
      );
      useBoundStore.getState().logout();
    }
    return false;
  }
};
