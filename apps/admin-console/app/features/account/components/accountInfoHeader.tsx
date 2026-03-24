import { ChevronLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { TypographyH2 } from '~/components/shared/text/typographyH2';
import { Button } from '~/components/ui/button';
import { useBreakpoint } from '~/hooks/layout/useBreakpoint';
import type { User } from '~/types/module-types/user';
interface AccountInfoHeaderProps {
  account: User;
}
export function AccountInfoHeader({ account }: AccountInfoHeaderProps) {
  const navigate = useNavigate();
  const { isDesktop } = useBreakpoint();
  const { t } = useTranslation(['account', 'role', 'app']);
  return (
    <div className='flex items-center justify-between'>
      <div>
        <TypographyH2
          className='font-medium'
          text={
            account?.role
              ? t('account:header.title', {
                  var:
                    account.role.level === 0
                      ? t('role:level.admin')
                      : t('role:level.manager'),
                }).toUpperCase()
              : ''
          }
        />
        <p className='text-sm text-slate-500'>
          {t('account:header.description')}
        </p>
      </div>

      {!isDesktop ? (
        <Button
          variant='outline'
          size='sm'
          onClick={() => navigate(-1)}
          className='fixed top-2 right-2 z-50'>
          <ChevronLeft className='size-3' />
        </Button>
      ) : (
        <Button
          variant='outline'
          size='sm'
          onClick={() => navigate(-1)}
          className='gap-2'>
          <ChevronLeft className='size-4' />
          {t('app:button.back')}
        </Button>
      )}
    </div>
  );
}
