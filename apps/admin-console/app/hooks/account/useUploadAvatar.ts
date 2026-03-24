import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import type { AxiosError } from 'axios';
import { useBoundStore } from '~/store';
import type { ApiError } from '~/types/api-types/api-error';
import { userService } from '~/services/user.service';
import { useTranslation } from 'react-i18next';

export function useUploadAvatar() {
  const { t } = useTranslation(['account']);
  const queryClient = useQueryClient();
  const setAccount = useBoundStore((state) => state.setAccount);
  const account = useBoundStore((state) => state.account);

  return useMutation({
    mutationFn: ({
      folder,
      blob,
      originalFile,
    }: {
      folder: string;
      blob: Blob;
      originalFile: { name: string; type: string };
    }) => userService.uploadAvatar(folder, blob, originalFile),

    onSuccess: (response) => {
      toast.success(t('account:detail.uploadAvatar.success'));

      //  update user state
      if (account && response.data) {
        setAccount({
          ...account,
          picture: {
            url: response.data.picture.url,
          },
        });
      }

      // Invalidate cache to sync with server
      queryClient.invalidateQueries({ queryKey: ['account'] });
    },

    onError: (error: AxiosError<ApiError>) => {
      const msg = error.response?.data?.errors || 'Internal Server Error!';
      toast.error(msg);
    },
  });
}
