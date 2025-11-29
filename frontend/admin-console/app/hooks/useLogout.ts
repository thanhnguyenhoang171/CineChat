// hooks/useLogout.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { authService } from '~/services/auth.service';

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => authService.logout(),
    onSettled: () => {
      // 1. Xóa tokens từ client storage
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');

      // 2. Clear React Query cache
      queryClient.clear();

      // 3. Thông báo
      toast.info('Đã đăng xuất');

      // 4. Redirect
      navigate('/login', { replace: true });
    },
    onError: (error) => {
      console.error('Logout error:', error);
      toast.error('Đăng xuất thất bại');
    },
  });
}
