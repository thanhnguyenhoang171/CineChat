import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router';
import { toast } from 'sonner';
import { useLogout } from '~/hooks/useLogout';
import { authService } from '~/services/auth.service';
import { useBoundStore } from '~/store';

export default function GoogleCallbackPage() {
  const { t } = useTranslation('login');
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
        toast.error(t('toast.errorGG'), {
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

        toast.error(t('toast.unauthorized'), {
          id: 'google-login-fail-permissions',
        });
        navigate('/login', { replace: true });
        return;
      }

      toast.success(t('toast.success'), {
        id: 'google-login-success',
      });
      navigate('/dashboard', { replace: true });
    };

    handleGoogleCallback();
  }, [searchParams, navigate, setAccessToken, logout]);

  return (
    <div className='flex h-screen w-full flex-col items-center justify-center gap-4'>
      <div className='h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent'></div>
      <p className='text-muted-foreground'>{t('text.GGProcessing')}</p>
    </div>
  );
}
