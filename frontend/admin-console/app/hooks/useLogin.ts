import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import type { AxiosError } from 'axios';
import { useBoundStore } from '~/store';
import { authService } from '~/services/auth.service';
import type { ApiError } from '~/types/api-error';

export function useLogin() {
  const navigate = useNavigate();
  const loginSuccess = useBoundStore((state) => state.loginSuccess);

  return useMutation({
    mutationFn: authService.login,

    onSuccess: async (response) => {
      if (response.data) {
        const { access_token } = response.data;

        await loginSuccess(access_token); // call action loginSuccess and it will fetch user info

        toast.success(`${response.message}`);
        navigate('/dashboard', { replace: true });
      }
    },

    onError: (error: AxiosError<ApiError>) => {
      const msg = error.response?.data?.errors;
      toast.error(msg);
    },
  });
}
