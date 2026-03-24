import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import type { AxiosError } from 'axios';
import { authService } from '~/services/auth.service';
import type { ApiError } from '~/types/api-types/api-error';

export function useRegister() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: authService.registerAccount,

    onSuccess: async (response) => {
      if (response?.data && response?.status === 201) {
        toast.success(`${response?.message}`);
        navigate('/login', { replace: true });
      }
    },

    onError: (error: AxiosError<ApiError>) => {
      const msg = error.response?.data?.errors || 'Internal Server Error!';
      toast.error(msg);
    },
  });
}
