import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog';
import { movieService } from '~/services/movie.service';
import { movieKeys } from '~/queries/movie.queries';
import { MovieForm } from '../form/movieForm';
import { type MovieFormValues } from '../../schemas';
import { Film } from 'lucide-react';

interface CreateMovieModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateMovieModal({
  open,
  onOpenChange,
}: CreateMovieModalProps) {
  const { t } = useTranslation(['movie', 'app']);
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (values: MovieFormValues) => movieService.createMovie(values),
    onSuccess: (response) => {
      if (response.status === 201) {
        toast.success(t('movie:createDialog.success'));
        queryClient.invalidateQueries({ queryKey: movieKeys.lists() });
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
      <DialogContent className='sm:max-w-[900px] p-0 overflow-hidden border-none shadow-2xl'>
        <DialogHeader className='p-6 bg-primary/5 border-b'>
          <div className='flex items-center gap-3'>
            <div className='p-2 bg-primary/10 rounded-lg'>
              <Film className='w-5 h-5 text-primary' />
            </div>
            <DialogTitle className='text-xl font-bold text-foreground'>
              {t('movie:createDialog.title')}
            </DialogTitle>
          </div>
        </DialogHeader>
        <div className='p-6 max-h-[80vh] overflow-y-auto'>
          <MovieForm
            onSubmit={mutate}
            onCancel={() => onOpenChange(false)}
            isPending={isPending}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
