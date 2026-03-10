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
import type { Cast } from '~/types/module-types/cast';
import { Edit3 } from 'lucide-react';

interface UpdateCastModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  cast: Cast | null;
}

export function UpdateCastModal({
  open,
  onOpenChange,
  cast,
}: UpdateCastModalProps) {
  const { t } = useTranslation(['cast', 'app']);
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (values: CreateCastValues) =>
      castService.updateCast(cast?._id || '', values),
    onSuccess: (response) => {
      if (response.status === 200) {
        toast.success(t('cast:updateDialog.success'));
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

  if (!cast) return null;

  const initialValues: CreateCastValues = {
    name: cast.name || '',
    biography: cast.biography || '',
    birthday: cast.birthday || '',
    placeOfBirth: cast.placeOfBirth || '',
    gender: cast.gender ?? 0,
    role: cast.role || 'ACTOR',
    isActive: cast.isActive ?? 1,
    profilePath: cast.profilePath || '',
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[800px] p-0 overflow-hidden border-none shadow-2xl'>
        <DialogHeader className='px-6 pt-6 pb-4 bg-gradient-to-r from-orange-500/5 to-transparent border-b'>
          <DialogTitle className='text-2xl font-bold tracking-tight text-foreground flex items-center gap-3'>
            <div className='bg-orange-500/10 p-2 rounded-xl'>
              <Edit3 className='w-5 h-5 text-orange-600' />
            </div>
            {t('cast:updateDialog.title')}
          </DialogTitle>
        </DialogHeader>

        <div className='px-6 py-6 max-h-[80vh] overflow-y-auto'>
          <CastForm
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
