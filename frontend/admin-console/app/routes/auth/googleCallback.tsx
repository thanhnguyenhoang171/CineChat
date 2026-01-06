import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { toast } from 'sonner';
import { useBoundStore } from '~/store';

export default function GoogleCallbackPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const setAccessToken = useBoundStore((state) => state.setAccessToken);

  useEffect(() => {
    const accessToken = searchParams.get('act');
    if (accessToken) {
      setAccessToken(accessToken);
      navigate('/dashboard', { replace: true });
      toast.success('Đăng nhập thành công! Chào mừng trở lại.', {
        id: 'google-login-success',
      });
    } else {
      toast.error('Đăng nhập Google không thành công!', {
        id: 'google-login-fail',
      });
      navigate('/login', { replace: true });
    }
  }, [searchParams, navigate]);

  // Giao diện trong lúc chờ xử lý (Loading Spinner)
  return (
    <div className='flex h-screen w-full flex-col items-center justify-center gap-4'>
      <div className='h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent'></div>
      <p className='text-muted-foreground'>Đang xử lý đăng nhập Google...</p>
    </div>
  );
}
