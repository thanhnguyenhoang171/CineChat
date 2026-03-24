import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import type { AxiosError } from 'axios';
import { useBoundStore } from '~/store';
import { authService } from '~/services/auth.service';
import type { ApiError } from '~/types/api-types/api-error';
import { useTranslation } from 'react-i18next';

export function useCancel() {
  const { t } = useTranslation(['account', 'login']);
  const navigate = useNavigate();
  const setAccessToken = useBoundStore((state) => state.setAccessToken);
  const resetAccount = useBoundStore((state) => state.resetAccount);

  return useMutation({
    mutationFn: authService.cancelAccount,

    onSuccess: async (response) => {
      if (response.code === 'USR_210') {
        toast.success(t('account:detail.cancelAccount.success'));

        // Clear access token and account store
        setAccessToken(null);
        resetAccount();

        navigate('/login', { replace: true });
      } else {
        toast.error(t('account:detail.cancelAccount.failure'));
      }
    },

    onError: (error: AxiosError<ApiError>) => {
      let msg = error.response?.data?.errors || t('login:toast.errorInternal');

      if (error.response?.data?.code === 'USR_321') {
        msg = t('account:detail.cancelAccount.lastAccountFailure');
      }
      toast.error(msg);
    },
  });
}
