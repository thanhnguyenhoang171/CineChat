'use client';
import { useTranslation } from 'react-i18next';
import { Spinner } from '../../ui/spinner';

export function LayoutSpinner() {
  const { t } = useTranslation('app');
  return (
    <div className='flex h-screen w-full items-center justify-center bg-slate-50'>
      <div className='flex flex-col items-center gap-4'>
        <Spinner className='size-10 text-blue-500' />
        <p className='text-sm text-slate-500 font-medium'>
          {t('spinner.loading')}
        </p>
      </div>
    </div>
  );
}
