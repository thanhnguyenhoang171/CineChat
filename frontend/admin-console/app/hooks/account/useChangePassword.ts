import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import type { AxiosError } from 'axios';
import type { ApiError } from '~/types/api-types/api-error';
import { userService } from '~/services/user.service';
import { useTranslation } from 'react-i18next';
import { authService } from '~/services/auth.service';
import { useBoundStore } from '~/store';

export function useChangePassword() {
  const { t } = useTranslation(['account']);
  const queryClient = useQueryClient();
  const setAccessToken = useBoundStore((state) => state.setAccessToken);

  return useMutation({
    mutationFn: (payload: { currentPassword: string; newPassword: string }) =>
      authService.changePassword(payload),

    onSuccess: (response) => {
      if (response.data?.access_token) {
        setAccessToken(response.data.access_token);
      }

      toast.success(
        t('account:changePassword.success', 'Thay đổi mật khẩu thành công!'),
      );
    },

    onError: (error: AxiosError<ApiError>) => {
      const msg = error.response?.data?.errors || 'Internal Server Error!';
      toast.error(msg);
    },
  });
}
