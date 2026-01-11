import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { toast } from 'sonner';
import { useLogout } from '~/hooks/useLogout';
import { authService } from '~/services/auth.service';
import { useBoundStore } from '~/store';

export default function GoogleCallbackPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const setAccessToken = useBoundStore((state) => state.setAccessToken);
  const logout = useBoundStore((state) => state.logout);

  useEffect(() => {
    const handleGoogleCallback = async () => {
      const accessToken = searchParams.get('act');
      const level = searchParams.get('lv');

      // Case 3: Thành công (Token có & đúng quyền)
      setAccessToken(accessToken);

      // Case 1: Không có token -> Lỗi
      if (!accessToken) {
        toast.error('Đăng nhập Google không thành công!', {
          id: 'google-login-fail',
        });
        navigate('/login', { replace: true });
        return;
      }

      // Case 2: Có token nhưng sai quyền (level != '0')
      if (level !== '0') {
        try {
          await authService.logout();
        } catch (error) {
          console.error('Logout error', error);
        }

        logout();

        toast.error('Bạn không có quyền vào trang quản trị', {
          id: 'google-login-fail-permissions',
        });
        navigate('/login', { replace: true });
        return;
      }

      toast.success('Đăng nhập thành công! Chào mừng trở lại.', {
        id: 'google-login-success',
      });
      navigate('/dashboard', { replace: true });
    };

    handleGoogleCallback();
  }, [searchParams, navigate, setAccessToken, logout]);

  return (
    <div className='flex h-screen w-full flex-col items-center justify-center gap-4'>
      <div className='h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent'></div>
      <p className='text-muted-foreground'>Đang xử lý đăng nhập Google...</p>
    </div>
  );
}
