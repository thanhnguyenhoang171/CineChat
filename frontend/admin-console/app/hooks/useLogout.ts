import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { authService } from '~/services/auth.service';
import { useBoundStore } from '~/store';

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const logoutFromStore = useBoundStore((state) => state.logout);

  return useMutation({
    mutationFn: () => authService.logout(),

    // Using onSettled to ensure client logout regardless of API success or failure
    onSettled: async (response) => {
      logoutFromStore();

      queryClient.clear(); // remove all queries from cache
      navigate('/login', { replace: true });
      toast.info(`${response?.message}`);
    },

    onError: (error) => {
      console.error('Logout API error:', error);
    },
  });
}
