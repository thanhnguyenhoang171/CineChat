import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog';
import { PermissionForm } from '../form/permissionForm';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { permissionService } from '~/services/permission.service';
import { toast } from 'sonner';
import { permissionKeys } from '~/queries/permisson.queries';
import { useTranslation } from 'react-i18next';
import type { CreatePermissionValues } from '../../schemas';
import type { Permission } from '~/types/module-types/permission';
import { Edit3 } from 'lucide-react';

interface UpdatePermissionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  permission: Permission | null;
}

export function UpdatePermissionModal({
  open,
  onOpenChange,
  permission,
}: UpdatePermissionModalProps) {
  const { t } = useTranslation(['permission', 'app']);
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (values: CreatePermissionValues) =>
      permissionService.updatePermission(permission?._id || '', values),
    onSuccess: (response) => {
      if (response.status === 200) {
        toast.success(t('permission:updateDialog.success', 'Permission updated successfully'));
        queryClient.invalidateQueries({ queryKey: permissionKeys.lists() });
        onOpenChange(false);
      } else {
        toast.error(response.message || t('app:error.general'));
      }
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || t('app:error.general'));
    },
  });

  if (!permission) return null;

  const initialValues: CreatePermissionValues = {
    name: permission.name || '',
    apiPath: permission.apiPath || '',
    method: (permission.method as any) || 'GET',
    module: permission.module || '',
    isActive: permission.isActive ?? 1,
    // Assuming you might need to map roles if they are objects
    roleIds: permission.roleIds || [],
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[800px] p-0 overflow-hidden border-none shadow-2xl'>
        <DialogHeader className='px-6 pt-6 pb-4 bg-linear-to-r from-orange-500/5 to-transparent border-b'>
          <DialogTitle className='text-2xl font-bold tracking-tight text-foreground flex items-center gap-3'>
            <div className='bg-orange-500/10 p-2 rounded-xl'>
              <Edit3 className='w-5 h-5 text-orange-600' />
            </div>
            {t('permission:updateDialog.title', 'Edit Permission')}
          </DialogTitle>
        </DialogHeader>

        <div className='px-6 py-6 max-h-[80vh] overflow-y-auto'>
          <PermissionForm
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
