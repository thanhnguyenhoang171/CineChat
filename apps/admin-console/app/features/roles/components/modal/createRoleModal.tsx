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
import { Plus } from 'lucide-react';

interface CreateRoleModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateRoleModal({
  open,
  onOpenChange,
}: CreateRoleModalProps) {
  const { t } = useTranslation(['role', 'app']);
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (values: CreateRoleValues) =>
      roleService.createRole(values),
    onSuccess: (response) => {
      if (response.status === 201) {
        toast.success(t('role:createDialog.success'));
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[800px] p-0 overflow-hidden border-none shadow-2xl'>
        <DialogHeader className='px-6 pt-6 pb-4 bg-gradient-to-r from-primary/5 to-transparent border-b'>
          <DialogTitle className='text-2xl font-bold tracking-tight text-foreground flex items-center gap-2'>
            <div className='bg-primary/10 p-1.5 rounded-lg'>
              <Plus className='w-5 h-5 text-primary' />
            </div>
            {t('role:createDialog.title')}
          </DialogTitle>
        </DialogHeader>

        <div className='px-6 py-6 max-h-[80vh] overflow-y-auto'>
          <RoleForm
            onSubmit={(values) => mutate(values)}
            onCancel={() => onOpenChange(false)}
            isPending={isPending}
            submitLabel={t('role:createDialog.submit')}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
