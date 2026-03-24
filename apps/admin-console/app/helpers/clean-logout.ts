import { authService } from '~/services/auth.service';
import { useBoundStore } from '~/store';

export const handleCleanLogout = async () => {
  const store = useBoundStore.getState();

  try {
    await authService.logout(); // api remove cookie
  } catch (error) {
    console.error('Logout api error: ', error);
  } finally {
    store.logout(); // remove token state (authSlice)
    store.resetAccount(); // remove user data (accountSlice)
  }
};
