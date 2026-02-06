import { use } from 'react';
import { useParams } from 'react-router';
import { LayoutSpinner } from '~/components/shared/spinner/layoutSpinner';
import { Button } from '~/components/ui/button';
import {
  AccountInfoHeader,
  AccountInfoLeftHero,
  AccountInfoRightHero,
} from '~/features/account';
import { useAccount } from '~/hooks/account/useAccount';

export default function AccountInfo() {
  const { id } = useParams();
  const { data: user, isLoading, isError, refetch } = useAccount();
  if (isLoading) {
    return <LayoutSpinner />;
  }
  if (isError || !user) {
    return (
      <div className='p-6 text-center text-red-500'>
        <p>Lỗi tải thông tin.</p>
        <Button variant='outline' onClick={() => refetch()} className='mt-2'>
          Thử lại
        </Button>
      </div>
    );
  }

  console.log('Checking account detail = ', user);

  return (
    <div className='min-h-screen bg-slate-50/50 p-6'>
      <div className='mx-auto max-w-7xl space-y-6'>
        <AccountInfoHeader account={user} />

        <div className='grid gap-6 grid-cols-1 lg:grid-cols-12'>
          <AccountInfoLeftHero account={user} />

          <AccountInfoRightHero account={user} />
        </div>
      </div>
    </div>
  );
}
