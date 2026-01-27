import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router';
import { TypographyH2 } from '~/components/shared/text/typographyH2';
import { Button } from '~/components/ui/button';
import { useBreakpoint } from '~/hooks/useBreakpoint';
import type { User } from '~/types/module-types/user';
interface AccountInfoHeaderProps {
  account: User;
}
export function AccountInfoHeader({ account }: AccountInfoHeaderProps) {
  const navigate = useNavigate();
  const { isDesktop } = useBreakpoint();
  return (
    <div className='flex items-center justify-between'>
      <div>
        <TypographyH2
          text={`MCA ${account?.role?.level === 0 ? 'Admin' : 'Manager'} Account`}
        />
        <p className='text-sm text-slate-500'>
          Quản lý thông tin chi tiết và cài đặt tài khoản.
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
          Quay lại
        </Button>
      )}
    </div>
  );
}
