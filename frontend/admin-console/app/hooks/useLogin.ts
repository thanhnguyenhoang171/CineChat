import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { authService } from '~/services/auth.service';
import type { ApiError } from '~/types/api-error';
import type { ApiResponse } from '~/types/api-response';
import type { LoginRequest, LoginResponse } from '~/types/auth';
import { toast } from 'sonner';
import { useNavigate } from 'react-router';

export function useLogin() {
  const navigate = useNavigate();
  return useMutation<
    ApiResponse<LoginResponse>,
    AxiosError<ApiError>,
    LoginRequest
  >({
    // 1. Function to call API
    mutationFn: async (data: LoginRequest) => {
      return authService.login(data);
    },

    // 2. When success
    onSuccess: (data: ApiResponse<LoginResponse>) => {
      if (data.data) {
        // ✅ Lưu accessToken vào localStorage/memory (KHÔNG phải cookie)
        localStorage.setItem('accessToken', data.data.access_token);

        // ✅ Có thể lưu user info nếu cần
        localStorage.setItem('user', JSON.stringify(data.data.user));

        toast.success('Đăng nhập thành công!');
        navigate('/dashboard');
      }
    },
    // 3. Khi thất bại
    onError: (error: AxiosError<ApiError>) => {
      // Lấy message từ response của NestJS
      const message =
        error.response?.data?.errors || 'Đăng nhập thất bại. Vui lòng thử lại.';

      toast.error('Lỗi đăng nhập', {
        description: message,
      });
    },
  });
}
