import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import type { AxiosError } from 'axios';
import { useBoundStore } from '~/store';
import { authService } from '~/services/auth.service';
import type { ApiError } from '~/types/api-types/api-error';

export function useLogin() {
  const navigate = useNavigate();
  const loginSuccess = useBoundStore((state) => state.loginSuccess);
  const logout = useBoundStore((state) => state.logout);

  return useMutation({
    mutationFn: authService.login,

    onSuccess: async (response) => {
      if (response.data) {
        const { access_token, level } = response.data;

        await loginSuccess(access_token); // call action loginSuccess and it will fetch user info

        if (level !== 0) {
          toast.error(
            'Tài khoản không có quyền truy cập vào trang quản trị hệ thống',
            { id: 'login-role-error' },
          );

          try {
            await authService.logout();
          } catch (error) {
            console.warn('Logout API failed, but continuing...', error);
          }

          // 3. Clear state trong store
          logout();

          // KHÔNG navigate đến dashboard
          return; // Dừng lại ở đây
        } else {
          toast.success(`${response.message}`);
          navigate('/dashboard', { replace: true });
        }
      }
    },

    onError: (error: AxiosError<ApiError>) => {
      const msg = error.response?.data?.errors;
      toast.error(msg);
    },
  });
}
