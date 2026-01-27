import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import type { AxiosError } from 'axios';
import { useBoundStore } from '~/store';
import { authService } from '~/services/auth.service';
import type { ApiError } from '~/types/api-types/api-error';
import { useTranslation } from 'react-i18next';

export function useLogin() {
  const { t } = useTranslation('login');
  const navigate = useNavigate();
  const loginSuccess = useBoundStore((state) => state.loginSuccess);
  const logout = useBoundStore((state) => state.logout);
  const resetAccount = useBoundStore((state) => state.resetAccount);

  return useMutation({
    mutationFn: authService.login,

    onSuccess: async (response) => {
      if (response.data) {
        const { access_token, level } = response.data;

        await loginSuccess(access_token); // call action loginSuccess and it will fetch user info

        if (level !== 0 && level !== 1) {
          toast.error(t('toast.unauthorized'), { id: 'login-role-error' });

          try {
            await authService.logout();
          } catch (error) {
            console.warn(t('toast.warning'), error);
          }

          // 3. Clear state trong store
          logout();
          resetAccount();
          // KHÔNG navigate đến dashboard
          return; // Dừng lại ở đây
        } else {
          toast.success(t('toast.success') || response.message);
          navigate('/dashboard', { replace: true });
        }
      }
    },

    onError: (error: AxiosError<ApiError>) => {
      const msg = error.response?.data?.errors || t('toast.errorInternal');
      toast.error(msg);
    },
  });
}
