import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog';
import { CastForm } from '../form/castForm';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { castService } from '~/services/cast.service';
import { toast } from 'sonner';
import { castKeys } from '~/queries/cast.queries';
import { useTranslation } from 'react-i18next';
import type { CreateCastValues } from '../../schemas';
import { UserPlus } from 'lucide-react';

interface CreateCastModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateCastModal({
  open,
  onOpenChange,
}: CreateCastModalProps) {
  const { t } = useTranslation(['cast', 'app']);
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (values: CreateCastValues) =>
      castService.createCast(values),
    onSuccess: (response) => {
      if (response.status === 201) {
        toast.success(t('cast:createDialog.success'));
        queryClient.invalidateQueries({ queryKey: castKeys.lists() });
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
              <UserPlus className='w-5 h-5 text-primary' />
            </div>
            {t('cast:createDialog.title')}
          </DialogTitle>
        </DialogHeader>

        <div className='px-6 py-6 max-h-[80vh] overflow-y-auto'>
          <CastForm
            onSubmit={(values) => mutate(values)}
            onCancel={() => onOpenChange(false)}
            isPending={isPending}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
