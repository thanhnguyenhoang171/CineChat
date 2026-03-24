import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog';
import { RoleForm } from '../form/roleForm';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { roleService } from '~/services/role.service';
import { toast } from 'sonner';
import { roleKeys } from '~/queries/role.queries';
import { useTranslation } from 'react-i18next';
import type { CreateRoleValues } from '../../schemas';
import type { Role } from '~/types/module-types/role';
import { Edit3 } from 'lucide-react';

interface UpdateRoleModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  role: Role | null;
}

export function UpdateRoleModal({
  open,
  onOpenChange,
  role,
}: UpdateRoleModalProps) {
  const { t } = useTranslation(['role', 'app']);
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (values: CreateRoleValues) =>
      roleService.updateRole(role?._id || '', values),
    onSuccess: (response) => {
      if (response.status === 200) {
        toast.success(t('role:updateDialog.success', 'Role updated successfully'));
        queryClient.invalidateQueries({ queryKey: roleKeys.lists() });
        onOpenChange(false);
      } else {
        toast.error(response.message || t('app:error.general'));
      }
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || t('app:error.general'));
    },
  });

  if (!role) return null;

  const initialValues: CreateRoleValues = {
    name: role.name || '',
    description: role.description || '',
    isActive: role.isActive ?? 1,
    permissionIds: role.permissionIds || [],
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[800px] p-0 overflow-hidden border-none shadow-2xl'>
        <DialogHeader className='px-6 pt-6 pb-4 bg-gradient-to-r from-orange-500/5 to-transparent border-b'>
          <DialogTitle className='text-2xl font-bold tracking-tight text-foreground flex items-center gap-3'>
            <div className='bg-orange-500/10 p-2 rounded-xl'>
              <Edit3 className='w-5 h-5 text-orange-600' />
            </div>
            {t('role:updateDialog.title', 'Edit Role')}
          </DialogTitle>
        </DialogHeader>

        <div className='px-6 py-6 max-h-[80vh] overflow-y-auto'>
          <RoleForm
            initialValues={initialValues}
            onSubmit={(values) => mutate(values)}
            onCancel={() => onOpenChange(false)}
            isPending={isPending}
            submitLabel={t('app:button.update', 'Update')}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
