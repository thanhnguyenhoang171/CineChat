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
import type { Genre } from '~/types/module-types/genre';
import { Edit } from 'lucide-react';

interface UpdateGenreModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  genre: Genre | null;
}

export function UpdateGenreModal({
  open,
  onOpenChange,
  genre,
}: UpdateGenreModalProps) {
  const { t } = useTranslation(['genre', 'app']);
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (values: GenreFormValues) =>
      genreService.updateGenre(genre?._id || '', values),
    onSuccess: (response) => {
      if (response.status === 200) {
        toast.success(t('genre:updateDialog.success'));
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

  const initialValues: GenreFormValues | undefined = genre
    ? {
        name: genre.name,
        description: genre.description || '',
        isActive: genre.isActive,
      }
    : undefined;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[600px] p-0 overflow-hidden border-none shadow-2xl'>
        <DialogHeader className='p-6 bg-blue-500/5 border-b border-blue-500/10'>
          <div className='flex items-center gap-3'>
            <div className='p-2 bg-blue-500/10 rounded-lg'>
              <Edit className='w-5 h-5 text-blue-500' />
            </div>
            <DialogTitle className='text-xl font-bold text-foreground'>
              {t('genre:updateDialog.title')}
            </DialogTitle>
          </div>
        </DialogHeader>
        <div className='p-6'>
          <GenreForm
            onSubmit={mutate}
            onCancel={() => onOpenChange(false)}
            isPending={isPending}
            initialValues={initialValues}
            submitLabel={t('genre:updateDialog.submit')}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
