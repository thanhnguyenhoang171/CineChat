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
import type { Movie } from '~/types/module-types/movie';
import { Edit } from 'lucide-react';

interface UpdateMovieModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  movie: Movie | null;
}

export function UpdateMovieModal({
  open,
  onOpenChange,
  movie,
}: UpdateMovieModalProps) {
  const { t } = useTranslation(['movie', 'app']);
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (values: MovieFormValues) =>
      movieService.updateMovie(movie?._id || '', values),
    onSuccess: (response) => {
      if (response.status === 200) {
        toast.success(t('movie:updateDialog.success'));
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

  const initialValues: MovieFormValues | undefined = movie
    ? {
        title: movie.title,
        originalTitle: movie.originalTitle || '',
        overview: movie.overview || '',
        tagline: movie.tagline || '',
        releaseDate: movie.releaseDate || '',
        runtime: movie.runtime || 0,
        status: movie.status as any,
        posterPath: movie.posterPath || '',
        backdropPath: movie.backdropPath || '',
        genreIds: movie.genres.map((g) => g._id),
        isActive: movie.isActive,
      }
    : undefined;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[900px] p-0 overflow-hidden border-none shadow-2xl'>
        <DialogHeader className='p-6 bg-blue-500/5 border-b border-blue-500/10'>
          <div className='flex items-center gap-3'>
            <div className='p-2 bg-blue-500/10 rounded-lg'>
              <Edit className='w-5 h-5 text-blue-500' />
            </div>
            <DialogTitle className='text-xl font-bold text-foreground'>
              {t('movie:updateDialog.title')}
            </DialogTitle>
          </div>
        </DialogHeader>
        <div className='p-6 max-h-[80vh] overflow-y-auto'>
          <MovieForm
            onSubmit={mutate}
            onCancel={() => onOpenChange(false)}
            isPending={isPending}
            initialValues={initialValues}
            submitLabel={t('movie:updateDialog.submit')}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
