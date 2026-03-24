import { Mail } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { UserAvatar } from '~/components/shared/image/userAvatar';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { Button } from '~/components/ui/button';
import type { User } from '~/types/module-types/user';
import { use, useState } from 'react';
import { ImageUploader } from '~/components/shared/image/imageUploader';
import { AccountAvatar } from '~/components/shared/image/accountAvatar';
import { useUploadAvatar } from '~/hooks/account/useUploadAvatar';
import { useCancel } from '~/hooks/auth/useCancel';
import { AppAlertDialog } from '~/components/shared/alert-dialog/appAlertDialog';
import { ca } from 'zod/v4/locales';
interface AccountInfoLeftHeroProps {
  account: User;
}
export function AccountInfoLeftHero({ account }: AccountInfoLeftHeroProps) {
  const { t } = useTranslation(['role', 'account']);
  const { mutate: cancelAccount, isPending: isCanceling } = useCancel();
  const [openUploadAvatar, setOpenUploadAvatar] = useState(false);
  const [uploadData, setUploadData] = useState<{
    blob: Blob;
    fileInfo: { name: string; type: string };
  } | null>(null);

  const [openAlertDialog, setOpenAlertDialog] = useState(false);

  const { mutate: uploadAvatar, isPending } = useUploadAvatar();

  const handleSaveAvatar = () => {
    if (!uploadData) return;

    uploadAvatar(
      {
        folder: 'account-avatars',
        blob: uploadData.blob,
        originalFile: uploadData.fileInfo,
      },
      {
        onSuccess: () => {
          setOpenUploadAvatar(false);
          setUploadData(null);
        },
      },
    );
    // setOpenUploadAvatar(false);
  };

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
              <p className='text-sm text-slate-600 leading-relaxed text-justify wrap-break-word [hyphens:auto] [text-justify:inter-word]'>
                {t(
                  `role:description.${
                    account?.role.level === 0 ? 'admin' : 'manager'
                  }`,
                )}
              </p>
            </div>
          </div>
        </div>

        <div className='rounded-xl border border-red-100 bg-red-50/50 p-6'>
          <h3 className='font-medium text-red-900 mb-2'>
            {t('account:detail.cancelAccount.text')}
          </h3>
          <p className='text-xs text-red-600 mb-4'>
            {t('account:detail.cancelAccount.warning')}
          </p>
          <Button
            variant='destructive'
            className='w-full shadow-none'
            onClick={() => setOpenAlertDialog(true)}
            disabled={isCanceling}>
            {t('account:detail.cancelAccount.cancelBtn')}
          </Button>
        </div>
      </div>
      <AppAlertDialog
        title={t('account:detail.cancelAccount.alert.title')}
        description={t('account:detail.cancelAccount.alert.description')}
        variantConfirmBtn='destructive'
        confirmText={t('account:detail.cancelAccount.alert.confirmBtn')}
        cancelText={t('account:detail.cancelAccount.alert.cancelBtn')}
        openAlertDialog={openAlertDialog}
        onConfirm={cancelAccount}
        setOpenAlertDialog={setOpenAlertDialog}
      />
      <ImageUploader
        headerTitle={t('account:detail.uploadAvatar.title')}
        open={openUploadAvatar}
        maxSize={5 * 1024 * 1024}
        setOpen={setOpenUploadAvatar}
        isUploading={isPending}
        onImageCropped={(blob, fileInfo) => setUploadData({ blob, fileInfo })}
        onSave={handleSaveAvatar}
      />
    </>
  );
}
