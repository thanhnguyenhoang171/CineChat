import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import type { AxiosError } from 'axios';
import { useBoundStore } from '~/store';
import { authService } from '~/services/auth.service';
import type { ApiError } from '~/types/api-error';

export function useLogin() {
  const navigate = useNavigate();
  // Lấy action từ Slice
  const loginSuccess = useBoundStore((state) => state.loginSuccess);

  return useMutation({
    mutationFn: authService.login, // Gọi service

    onSuccess: (response) => {
      // API trả về: { data: { user, access_token }, message: "..." }
      if (response.data) {
        const { user, access_token } = response.data;

        // 1. Lưu vào Store (và LocalStorage)
        loginSuccess(user, access_token);

        // 2. Thông báo & Chuyển hướng
        toast.success('Đăng nhập thành công!', {
          description: `Chào mừng ${user.firstName} ${user.lastName} trở lại Admin Console!`,
        });
        navigate('/dashboard', { replace: true });
      }
    },

    onError: (error: AxiosError<ApiError>) => {
      const msg = error.response?.data?.errors || 'Đăng nhập thất bại';
      toast.error(msg);
    },
  });
}
