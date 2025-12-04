import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { authService } from '~/services/auth.service';
import { useBoundStore } from '~/store'; // 👈 1. Import Store tổng

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // 👇 2. Lấy action logout từ Store
  const logoutFromStore = useBoundStore((state) => state.logout);

  return useMutation({
    // Gọi API logout (để xóa HttpOnly Cookie phía server)
    mutationFn: () => authService.logout(),

    // Dùng onSettled thay vì onSuccess:
    // Để đảm bảo dù API lỗi (mất mạng, server 500) thì Client vẫn logout được
    onSettled: () => {
      // ✅ 3. Gọi Action của Zustand
      // Hàm này sẽ set user = null, token = null
      // => Middleware Persist sẽ tự động cập nhật LocalStorage
      logoutFromStore();

      // 4. Xóa sạch Cache của React Query (Tránh lộ data cũ của user trước)
      queryClient.clear();

      // 5. Điều hướng & Thông báo
      navigate('/login', { replace: true });
      toast.info('Đã đăng xuất');
    },

    onError: (error) => {
      console.error('Logout API error:', error);
      // Không cần toast lỗi ở đây vì dù API lỗi ta cũng đã logout client rồi
    },
  });
}
