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
import { Plus } from 'lucide-react';

interface CreatePermissionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreatePermissionModal({
  open,
  onOpenChange,
}: CreatePermissionModalProps) {
  const { t } = useTranslation(['permission', 'app']);
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (values: CreatePermissionValues) =>
      permissionService.createPermission(values),
    onSuccess: (response) => {
      if (response.status === 201) {
        toast.success(t('permission:createDialog.success'));
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[800px] p-0 overflow-hidden border-none shadow-2xl'>
        <DialogHeader className='px-6 pt-6 pb-4 bg-gradient-to-r from-primary/5 to-transparent border-b'>
          <DialogTitle className='text-2xl font-bold tracking-tight text-foreground flex items-center gap-2'>
            <div className='bg-primary/10 p-1.5 rounded-lg'>
              <Plus className='w-5 h-5 text-primary' />
            </div>
            {t('permission:createDialog.title')}
          </DialogTitle>
        </DialogHeader>

        <div className='px-6 py-6 max-h-[80vh] overflow-y-auto'>
          <PermissionForm
            onSubmit={(values) => mutate(values)}
            onCancel={() => onOpenChange(false)}
            isPending={isPending}
            submitLabel={t('permission:createDialog.submit')}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
