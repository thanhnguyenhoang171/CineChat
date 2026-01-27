import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { authService } from '~/services/auth.service';
import { useBoundStore } from '~/store';

export function useLogout() {
  const { t } = useTranslation('logout');
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const logoutFromStore = useBoundStore((state) => state.logout);
  const resetAccount = useBoundStore((state) => state.resetAccount);

  return useMutation({
    mutationFn: () => authService.logout(),

    // Using onSettled to ensure client logout regardless of API success or failure
    onSettled: async (response) => {
      logoutFromStore();
      resetAccount();

      queryClient.clear(); // remove all queries from cache
      navigate('/login', { replace: true });
      toast.info(t('logout.success') || `${response?.message}`);
    },

    onError: (error) => {
      const msg = error.response?.data?.errors || 'Internal Server Error!';
      toast.error(msg);
    },
  });
}
