import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router';
import { toast } from 'sonner';
import { authService } from '~/services/auth.service';
import { useBoundStore } from '~/store';

export default function GoogleCallbackPage() {
  const { t } = useTranslation('login');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Ref để tránh chạy logic 2 lần trong React StrictMode (Development)
  const processedRef = useRef(false);

  const setAccessToken = useBoundStore((state) => state.setAccessToken);
  const logout = useBoundStore((state) => state.logout);
  const resetAccount = useBoundStore((state) => state.resetAccount);

  useEffect(() => {
    const handleGoogleCallback = async () => {
      // Chặn chạy 2 lần (quan trọng khi dùng Toast)
      if (processedRef.current) return;
      processedRef.current = true;

      const accessToken = searchParams.get('act');
      const level = searchParams.get('lv');

      // --- CHECK Không có Token ---
      if (!accessToken) {
        toast.error(t('toast.errorGG'), { id: 'google-login-fail' });
        navigate('/login', { replace: true });
        return;
      }

      // --- CHECK Sai quyền (Forbidden) ---

      if (level !== '0' && level !== '1') {
        try {
          await authService.logout();
        } catch (error) {
          console.error('Logout error', error);
        }

        // Cleanup
        logout(); // Xóa Token
        resetAccount(); // Xóa User Data

        toast.error(t('toast.unauthorized'), {
          id: 'google-login-fail-permissions',
        });
        navigate('/login', { replace: true });
        return;
      }

      setAccessToken(accessToken);

      toast.success(t('toast.success'), { id: 'google-login-success' });
      navigate('/dashboard', { replace: true });
    };

    handleGoogleCallback();
  }, [searchParams, navigate, setAccessToken, logout, resetAccount, t]);

  return (
    <div className='flex h-screen w-full flex-col items-center justify-center gap-4 bg-slate-50'>
      <div className='h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent'></div>
      <p className='text-sm font-medium text-muted-foreground animate-pulse'>
        {t('text.GGProcessing')}...
      </p>
    </div>
  );
}
