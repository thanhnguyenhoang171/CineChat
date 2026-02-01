import { Mail } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { UserAvatar } from '~/components/shared/image/userAvatar';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { Button } from '~/components/ui/button';
import type { User } from '~/types/module-types/user';
import { useState } from 'react';
import { ImageUploader } from '~/components/shared/image/imageUploader';
import { AccountAvatar } from '~/components/shared/image/accountAvatar';
interface AccountInfoLeftHeroProps {
  account: User;
}
export function AccountInfoLeftHero({ account }: AccountInfoLeftHeroProps) {
  const { t } = useTranslation('role');
  const [openUploadAvatar, setOpenUploadAvatar] = useState(false);
  return (
    <>
      <div className='lg:col-span-4 flex flex-col gap-6'>
        <div className='rounded-xl border bg-white p-6 shadow-sm'>
          <div className='flex flex-col items-center text-center'>
            <AccountAvatar
              setOpenUploadAvatar={setOpenUploadAvatar}
              user={account}
              className='size-32 border-4 border-slate-50 shadow-sm rounded-full overflow-hidden'
            />

            {account?.username && (
              <h2 className='mt-4 text-xl text-slate-900'>
                {account?.username}
              </h2>
            )}
            {account?.email && (
              <span className='text-sm text-slate-500 flex items-center gap-1 mt-4'>
                <Mail className='size-3' /> {account?.email}
              </span>
            )}

            <div className='mt-4 mb-6'>
              <span className='inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10'>
                {t(account?.role.level === 0 ? 'level.admin' : 'level.manager')}
              </span>
            </div>

            <div className='w-full border-t pt-4'>
              <p className='text-sm text-slate-600 leading-relaxed text-justify'>
                System administrator, full rights. Lorem ipsum dolor sit amet,
                consectetur adipisicing elit. Quia eos nam omnis rerum nulla
                dolor ut sequi.
              </p>
            </div>
          </div>
        </div>

        <div className='rounded-xl border border-red-100 bg-red-50/50 p-6'>
          <h3 className='font-medium text-red-900 mb-2'>
            Hủy tài khoản khỏi hệ thống
          </h3>
          <p className='text-xs text-red-600 mb-4'>
            Hành động này không thể hoàn tác.
          </p>
          <Button variant='destructive' className='w-full shadow-none'>
            Hủy
          </Button>
        </div>
      </div>
      <ImageUploader
        open={openUploadAvatar}
        setOpen={setOpenUploadAvatar}
        onImageCropped={(blob) => console.log(blob)}
      />
    </>
  );
}
