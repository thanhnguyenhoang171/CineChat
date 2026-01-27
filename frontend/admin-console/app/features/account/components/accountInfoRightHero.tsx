import {
  CalendarDays,
  Fingerprint,
  Lock,
  Mail,
  ShieldCheck,
  User as UserIcon,
} from 'lucide-react';
import { CustomLabel } from '~/components/shared/text/customLabel';
import { Button } from '~/components/ui/button';
import type { User } from '~/types/module-types/user';
interface AccountInfoRightHeroProps {
  account: User;
}
export function AccountInfoRightHero({ account }: AccountInfoRightHeroProps) {
  return (
    <div className='lg:col-span-8 flex flex-col gap-6'>
      <div className='rounded-xl border bg-white shadow-sm h-full flex flex-col'>
        <div className='border-b p-6'>
          <h3 className='text-lg text-slate-900'>Thông tin chi tiết</h3>
          <p className='text-sm text-slate-500'>
            Dữ liệu cá nhân và trạng thái hệ thống.
          </p>
        </div>

        <div className='p-6 grid gap-y-6 gap-x-10 md:grid-cols-2 flex-1'>
          <div className='space-y-1'>
            <CustomLabel
              text='User ID'
              icon={<Fingerprint className='size-4' />}
            />
            <div className='font-mono text-sm text-slate-700 bg-slate-100 p-2 rounded w-fit'>
              {account?._id}
            </div>
          </div>

          <div className='space-y-1'>
            <CustomLabel
              text='Ngày tạo'
              icon={<CalendarDays className='size-4' />}
            />
            <div className='text-sm font-medium text-slate-900'>
              {account.createdAt?.toString()}
            </div>
          </div>

          <div className='space-y-1 md:col-span-2'>
            <CustomLabel
              text='Họ và tên'
              icon={<UserIcon className='size-4' />}
            />
            <div className='text-sm font-medium text-slate-900'>
              {account?.firstName}
            </div>
          </div>

          <div className='space-y-1'>
            <CustomLabel text='Vai trò' />
            <div className='text-sm font-medium text-slate-900'>Admin</div>
          </div>

          <div className='space-y-1'>
            <CustomLabel text='Trạng thái' />
            <div className='flex items-center gap-2'>
              <span className='flex h-2 w-2 rounded-full bg-green-600'></span>
              <span className='text-sm font-medium text-green-700'>Active</span>
            </div>
          </div>

          <div className='space-y-1 md:col-span-2'>
            <CustomLabel text='Xác thực Email' />
            <div className='flex items-center gap-2 text-green-700 bg-green-50 w-fit px-3 py-1.5 rounded-md border border-green-100'>
              <ShieldCheck className='size-4' />
              <span className='text-sm font-medium'>Đã xác minh</span>
            </div>
          </div>
        </div>

        <div className='border-t bg-slate-50/50 p-6 flex justify-end gap-3 rounded-b-xl mt-auto'>
          <Button variant='outline' className='gap-2'>
            <Lock className='size-4 text-slate-500' />
            Đổi mật khẩu
          </Button>
          <Button>Cập nhật hồ sơ</Button>
        </div>
      </div>
    </div>
  );
}
