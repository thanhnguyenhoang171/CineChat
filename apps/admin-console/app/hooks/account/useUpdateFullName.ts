import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import type { AxiosError } from 'axios';
import type { ApiError } from '~/types/api-types/api-error';
import { userService } from '~/services/user.service';
import { useTranslation } from 'react-i18next';

export function useUpdateFullName() {
  const { t } = useTranslation(['account']);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      firstName,
      lastName,
    }: {
      firstName: string;
      lastName: string;
    }) => userService.updateFullName(firstName, lastName),

    onSuccess: (response) => {
      toast.success(t('account:detail.updateFullName.success'));

      // Invalidate cache to sync with server
      queryClient.invalidateQueries({ queryKey: ['account'] });
    },

    onError: (error: AxiosError<ApiError>) => {
      const msg = error.response?.data?.errors || 'Internal Server Error!';
      toast.error(msg);
    },
  });
}
