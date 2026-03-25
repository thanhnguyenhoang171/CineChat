import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog';
import { UserForm } from '../form/userForm';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userService } from '~/services/user.service';
import { toast } from 'sonner';
import { userKeys } from '~/queries/user.queries';
import { useTranslation } from 'react-i18next';
import type { CreateUserValues } from '../../schemas';
import type { User } from '@cinechat/types';
import { Edit3 } from 'lucide-react';

interface UpdateUserModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: User | null;
}

export function UpdateUserModal({
  open,
  onOpenChange,
  user,
}: UpdateUserModalProps) {
  const { t } = useTranslation(['user', 'app']);
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (values: CreateUserValues) =>
      userService.updateUser(user?._id || '', {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        roleId: values.roleId,
        isActive: values.isActive,
        pictureUrl: values.pictureUrl,
      }),
    onSuccess: (response) => {
      if (response.status === 200) {
        toast.success(t('user:updateDialog.success'));
        queryClient.invalidateQueries({ queryKey: userKeys.lists() });
        onOpenChange(false);
      } else {
        toast.error(response.message || t('app:error.general'));
      }
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || t('app:error.general'));
    },
  });

  if (!user) return null;

  const initialValues: CreateUserValues = {
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    email: user.email || '',
    roleId: user.role?._id || '',
    isActive: user.isActive ?? 1,
    pictureUrl: user.picture?.url || '',
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[800px] p-0 overflow-hidden border-none shadow-2xl'>
        <DialogHeader className='px-6 pt-6 pb-4 bg-gradient-to-r from-orange-500/5 to-transparent border-b'>
          <DialogTitle className='text-2xl font-bold tracking-tight text-foreground flex items-center gap-3'>
            <div className='bg-orange-500/10 p-2 rounded-xl'>
              <Edit3 className='w-5 h-5 text-orange-600' />
            </div>
            {t('user:updateDialog.title')}
          </DialogTitle>
        </DialogHeader>

        <div className='px-6 py-6 max-h-[80vh] overflow-y-auto'>
          <UserForm
            initialValues={initialValues}
            onSubmit={(values) => mutate(values)}
            onCancel={() => onOpenChange(false)}
            isPending={isPending}
            submitLabel={t('app:button.update')}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

