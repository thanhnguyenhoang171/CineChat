import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog';
import { genreService } from '~/services/genre.service';
import { genreKeys } from '~/queries/genre.queries';
import { GenreForm } from '../form/genreForm';
import { type GenreFormValues } from '../../schemas';
import { Tag } from 'lucide-react';

interface CreateGenreModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateGenreModal({
  open,
  onOpenChange,
}: CreateGenreModalProps) {
  const { t } = useTranslation(['genre', 'app']);
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (values: GenreFormValues) => genreService.createGenre(values),
    onSuccess: (response) => {
      if (response.status === 201) {
        toast.success(t('genre:createDialog.success'));
        queryClient.invalidateQueries({ queryKey: genreKeys.lists() });
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
      <DialogContent className='sm:max-w-[600px] p-0 overflow-hidden border-none shadow-2xl'>
        <DialogHeader className='p-6 bg-primary/5 border-b'>
          <div className='flex items-center gap-3'>
            <div className='p-2 bg-primary/10 rounded-lg'>
              <Tag className='w-5 h-5 text-primary' />
            </div>
            <DialogTitle className='text-xl font-bold text-foreground'>
              {t('genre:createDialog.title')}
            </DialogTitle>
          </div>
        </DialogHeader>
        <div className='p-6'>
          <GenreForm
            onSubmit={mutate}
            onCancel={() => onOpenChange(false)}
            isPending={isPending}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
