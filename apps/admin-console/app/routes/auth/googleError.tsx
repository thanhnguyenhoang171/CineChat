import { useTranslation } from 'react-i18next';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import { Button } from '~/components/ui/button';
import { useNavigate, useSearchParams } from 'react-router';

export default function GoogleError() {
  const { t } = useTranslation('login');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const errorCode = searchParams.get('error_code');

  const getErrorMessage = () => {
    if (!errorCode) return t('googleLogin.errors.google_unknown');
    return t(`googleLogin.errors.${errorCode}`, {
      defaultValue: t('googleLogin.errors.google_default'),
    });
  };

  return (
    <div className='flex min-h-[400px] w-full flex-col items-center justify-center p-6 text-center'>
      {/* Icon Error */}
      <div className='mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-red-100'>
        <AlertCircle className='h-10 w-10 text-red-600' />
      </div>

      {/* Text Content */}
      <h1 className='mb-2 text-2xl font-bold text-slate-900'>
        {t('googleLogin.text.google_failed_title', {
          defaultValue: 'Đăng nhập thất bại',
        })}
      </h1>

      <p className='mb-8 w-full text-muted-foreground'>{getErrorMessage()}</p>

      {/* Actions */}
      <div className='flex flex-col gap-3 w-full max-w-[240px]'>
        <Button
          onClick={() => navigate('/login', { replace: true })}
          className='flex items-center justify-center gap-2'>
          <ArrowLeft className='h-4 w-4' />
          {t('googleLogin.button.back_to_login', {
            defaultValue: 'Quay lại đăng nhập',
          })}
        </Button>
      </div>

      {/* Footer hint */}
      <p className='mt-8 text-xs text-muted-foreground'>
        {t('googleLogin.text.contact_admin_hint', {
          defaultValue: 'Nếu bạn tin rằng đây là lỗi, vui lòng liên hệ admin.',
        })}
      </p>
    </div>
  );
}
