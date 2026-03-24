import {
  CalendarDays,
  Fingerprint,
  Lock,
  Mail,
  MonitorCheck,
  ShieldBan,
  ShieldCheck,
  ShieldUser,
  User as UserIcon,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { CustomLabel } from '~/components/shared/text/customLabel';
import { Button } from '~/components/ui/button';
import { cn } from '~/lib/utils';
import type { User } from '~/types/module-types/user';
import { formatDateTime, formatFullName } from '~/utils/common-utils';
import { UpdateFullNameForm } from './form/updateFullNameForm';
import { useState } from 'react';
import { ChangePasswordModal } from './modal/changePasswordModal';
interface AccountInfoRightHeroProps {
  account: User;
}
export function AccountInfoRightHero({ account }: AccountInfoRightHeroProps) {
  const [openChangePasswordModal, setOpenChangePasswordModal] = useState(false);
  const { t } = useTranslation(['account', 'role']);

  return (
    <>
      <div className='lg:col-span-8 flex flex-col gap-6'>
        <div className='rounded-xl border bg-white shadow-sm h-full flex flex-col'>
          <div className='border-b p-6'>
            <h3 className='text-lg text-slate-900'>
              {t('account:detail.title')}
            </h3>
            <p className='text-sm text-slate-500'>
              {t('account:detail.description')}
            </p>
          </div>

          <div className='p-6 grid gap-y-6 gap-x-10 md:grid-cols-2 flex-1'>
            <div className='space-y-1 md:col-span-2'>
              <UpdateFullNameForm
                firstName={account?.firstName}
                lastName={account?.lastName}
              />
              {/* <CustomLabel
              className='uppercase'
              text={t('account:detail.fullname')}
              icon={<UserIcon className='size-4' />}
            />
            <div className='text-sm font-medium text-slate-900'>
              {formatFullName(account?.firstName, account?.lastName)}
            </div>
            <Button>{t('account:detail.update')}</Button> */}
            </div>

            <div className='space-y-1'>
              <CustomLabel
                text={t('account:detail.userId')}
                icon={<Fingerprint className='size-4' />}
                className='uppercase'
              />
              <div className='font-mono text-sm text-slate-700 bg-slate-100 p-2 rounded w-fit'>
                {account?._id}
              </div>
            </div>

            <div className='space-y-1'>
              <CustomLabel
                className='uppercase'
                text={t('account:detail.createdDate')}
                icon={<CalendarDays className='size-4' />}
              />
              <div className='text-sm font-medium text-slate-900'>
                {formatDateTime(account?.createdAt)}
              </div>
            </div>

            <div className='space-y-1'>
              <CustomLabel
                className='uppercase'
                text={t('account:detail.role.text')}
                icon={<ShieldUser className='size-4' />}
              />
              <div className='text-sm font-medium text-slate-900'>
                {t(
                  account?.role?.level === 0
                    ? 'role:level.admin'
                    : 'role:level.manager',
                )}
              </div>
            </div>

            <div className='space-y-1'>
              <CustomLabel
                text={t('account:detail.status.text')}
                className='uppercase'
                icon={<MonitorCheck className='size-4' />}
              />
              <div className='flex items-center gap-2'>
                <span
                  className={cn(
                    'flex h-2 w-2 rounded-full bg-green-600',
                    account?.isActive !== 1 && 'bg-red-600',
                  )}></span>
                <span
                  className={cn(
                    'text-sm font-medium text-green-700',
                    account?.isActive !== 1 && 'text-red-700',
                  )}>
                  {t(
                    account?.isActive === 1
                      ? 'account:detail.status.active'
                      : 'account:detail.status.inactive',
                  )}
                </span>
              </div>
            </div>

            {account?.email && account?.emailVerified !== undefined && (
              <div className='space-y-1 md:col-span-2'>
                <CustomLabel text={t('account:detail.email.verify')} />
                <div
                  className={cn(
                    'flex items-center gap-2 text-green-700 bg-green-50 w-fit px-3 py-1.5 rounded-md border border-green-100',
                    account.emailVerified === false &&
                      'text-red-700 bg-red-50 border-red-100',
                  )}>
                  {account?.emailVerified ? (
                    <ShieldCheck className='size-4' />
                  ) : (
                    <ShieldBan className='size-4' />
                  )}
                  <span className='text-sm font-medium'>
                    {t(
                      account?.emailVerified === true
                        ? 'account:detail.email.verify'
                        : 'account:detail.email.unverified',
                    )}
                  </span>
                </div>
              </div>
            )}
          </div>
          {account?.provider !== 0 && (
            <div className='border-t bg-slate-50/50 p-6 flex justify-end gap-3 rounded-b-xl mt-auto'>
              <Button
                variant='outline'
                className='gap-2'
                onClick={() => setOpenChangePasswordModal(true)}>
                <Lock className='size-4 text-slate-500' />
                {t('account:detail.changePass')}
              </Button>
              {/* <Button>{t('account:detail.update')}</Button> */}
            </div>
          )}
        </div>
      </div>
      <ChangePasswordModal
        open={openChangePasswordModal}
        setOpen={setOpenChangePasswordModal}
      />
    </>
  );
}
