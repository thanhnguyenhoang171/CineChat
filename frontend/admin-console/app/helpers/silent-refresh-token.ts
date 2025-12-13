import { authService } from '~/services/auth.service';
import { useBoundStore } from '~/store';

export const silentRefreshToken = async (): Promise<boolean> => {
  try {
    const response = await authService.refreshToken();
    const newAccessToken = response?.data?.access_token;

    useBoundStore.getState().setAccessToken(newAccessToken);

    return true;
  } catch (error) {
    return false;
  }
};
