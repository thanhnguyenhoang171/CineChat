import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  TriangleAlert,
  Star,
  Calendar,
  Clock,
} from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AppDeleteButton } from '~/components/shared/button/AppDeleteButton';
import { AppModifyButton } from '~/components/shared/button/AppModifyButton';
import { AppPagination } from '~/components/shared/pagination/appPagination';
import { AppPaginationMobile } from '~/components/shared/pagination/appPaginationMobile';
import { Skeleton } from '~/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table';
import { useBreakpoint } from '~/hooks/layout/useBreakpoint';
import { cn } from '~/lib/utils';
import type { PaginationMeta, Movie } from '@cinechat/types';
import { get4LastDigitsFromId } from '~/utils/common-utils';
import { AppAlertDialog } from '~/components/shared/alert-dialog/appAlertDialog';
import { UpdateMovieModal } from './modal/updateMovieModal';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { movieService } from '~/services/movie.service';
import { toast } from 'sonner';
import { movieKeys } from '~/queries/movie.queries';
import { Badge } from '~/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';

interface MovieListProps {
  isLoading: boolean;
  error: any;
  handleSort: (key: string) => void;
  sortBy: string;
  sortDir: string;
  moviesList: Movie[];
  handleOnChangePageSize: (pageSize: number) => void;
  pageSize: number;
  handleOnPageChange: (page: number) => void;
  movieMeta: PaginationMeta;
}

export function MovieList({
  error,
  handleOnChangePageSize,
  handleOnPageChange,
  handleSort,
  isLoading,
  pageSize,
  movieMeta,
  moviesList,
  sortBy,
  sortDir,
}: MovieListProps) {
  const { t } = useTranslation(['app', 'movie']);
  const { isMobile, isTablet, isDesktop } = useBreakpoint();
  const queryClient = useQueryClient();

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [movieToDelete, setMovieToDelete] = useState<Movie | null>(null);

  const handleEditClick = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsUpdateModalOpen(true);
  };

  const handleDeleteClick = (movie: Movie) => {
    setMovieToDelete(movie);
    setIsDeleteDialogOpen(true);
  };

  const { mutate: deleteMutate } = useMutation({
    mutationFn: (id: string) => movieService.deleteMovie(id),
    onSuccess: (response) => {
      if (response.status === 200) {
        toast.success(t('movie:deleteDialog.success'));
        queryClient.invalidateQueries({ queryKey: movieKeys.lists() });
        setIsDeleteDialogOpen(false);
      } else {
        toast.error(response.message || t('app:error.general'));
      }
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || t('app:error.general'));
    },
  });

  if (error)
    return (
      <div className='text-destructive'>Đã xảy ra lỗi khi tải dữ liệu.</div>
    );

  const tableHeaders = [
    { label: 'movie:table.title', key: 'title', sortable: true },
    { label: 'movie:table.releaseDate', key: 'releaseDate', sortable: true },
    { label: 'movie:table.status', key: 'status', sortable: true },
    { label: 'movie:table.rating', key: 'voteAverage', sortable: true },
    { label: 'movie:table.actions', key: 'actions', sortable: false },
  ];

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'Released':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'In Production':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Post Production':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'Canceled':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className='flex flex-col h-full w-full justify-center'>
      <div className='rounded-md border border-border overflow-hidden bg-card'>
        <Table>
          <TableHeader className='bg-muted/50'>
            <TableRow>
              {tableHeaders.map((header) => (
                <TableHead
                  key={header.key}
                  className={cn(
                    'text-muted-foreground select-none whitespace-nowrap px-4 py-3',
                    header.sortable &&
                      'cursor-pointer hover:text-foreground transition-colors',
                  )}
                  onClick={() => header.sortable && handleSort(header.key)}>
                  <div
                    className={cn(
                      'flex items-center gap-1',
                      ['actions', 'status', 'voteAverage'].includes(header.key)
                        ? 'justify-center'
                        : 'justify-start',
                    )}>
                    {t(header.label)}
                    {header.sortable && (
                      <span className='ml-1'>
                        {sortBy === header.key ? (
                          sortDir === 'asc' ? (
                            <ArrowUp size={14} />
                          ) : (
                            <ArrowDown size={14} />
                          )
                        ) : (
                          <ArrowUpDown size={14} className='opacity-30' />
                        )}
                      </span>
                    )}
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: pageSize }).map((_, index) => (
                <TableRow key={index}>
                  {tableHeaders.map((h) => (
                    <TableCell key={h.key} className='px-4 py-4'>
                      <Skeleton className='h-5 w-full max-w-[150px]' />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : moviesList.length > 0 ? (
              moviesList.map((movie) => (
                <TableRow
                  key={movie._id}
                  className='hover:bg-muted/30 transition-colors group'>
                  {/* Title & Poster */}
                  <TableCell className='px-4 py-3'>
                    <div className='flex items-center gap-3'>
                      <div className='relative shrink-0'>
                        <Avatar className='h-12 w-9 border border-border rounded-sm overflow-hidden'>
                          <AvatarImage
                            src={movie.posterPath}
                            alt={movie.title}
                            className='object-cover'
                          />
                          <AvatarFallback className='bg-primary/5 text-primary text-[10px] font-bold rounded-sm'>
                            FILM
                          </AvatarFallback>
                        </Avatar>
                      </div>
                      <div className='flex flex-col min-w-0'>
                        <span className='font-bold text-sm truncate text-foreground group-hover:text-primary transition-colors'>
                          {movie.title}
                        </span>
                        <div className='flex items-center gap-2 mt-0.5'>
                          <span className='text-[10px] text-muted-foreground font-mono'>
                            ID: {get4LastDigitsFromId(movie._id)}
                          </span>
                          <span className='text-[10px] text-muted-foreground flex items-center gap-0.5'>
                            <Clock size={10} /> {movie.runtime}m
                          </span>
                        </div>
                      </div>
                    </div>
                  </TableCell>

                  {/* Release Date */}
                  <TableCell className='px-4 py-3'>
                    <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                      <Calendar className='w-3.5 h-3.5 text-primary/40' />
                      {movie.releaseDate || '--'}
                    </div>
                  </TableCell>

                  {/* Status */}
                  <TableCell className='px-4 py-3 text-center'>
                    <span
                      className={cn(
                        'font-bold text-[10px] uppercase px-2 py-0.5 rounded border',
                        getStatusBadgeVariant(movie.status),
                      )}>
                      {movie.status}
                    </span>
                  </TableCell>

                  {/* Rating */}
                  <TableCell className='px-4 py-3 text-center'>
                    <div className='flex flex-col items-center justify-center gap-0.5'>
                      <div className='flex items-center gap-1'>
                        <Star className='w-3.5 h-3.5 text-yellow-500 fill-yellow-500' />
                        <span className='text-sm font-bold text-slate-700'>
                          {movie.voteAverage?.toFixed(1) || '0.0'}
                        </span>
                      </div>
                      <span className='text-[10px] text-muted-foreground'>
                        {movie.voteCount} votes
                      </span>
                    </div>
                  </TableCell>

                  {/* Actions */}
                  <TableCell className='px-4 py-3'>
                    <div className='flex items-center justify-center gap-1'>
                      <AppModifyButton
                        handleOnClick={() => handleEditClick(movie)}
                      />
                      <AppDeleteButton
                        handleOnClick={() => handleDeleteClick(movie)}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={tableHeaders.length}
                  className='text-center h-32 text-muted-foreground italic'>
                  {t('app:noData')}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <UpdateMovieModal
        open={isUpdateModalOpen}
        onOpenChange={setIsUpdateModalOpen}
        movie={selectedMovie}
      />

      <AppAlertDialog
        openAlertDialog={isDeleteDialogOpen}
        setOpenAlertDialog={setIsDeleteDialogOpen}
        title={t('movie:deleteDialog.title')}
        description={t('movie:deleteDialog.description', {
          name: movieToDelete?.title,
        })}
        onConfirm={() => movieToDelete && deleteMutate(movieToDelete._id)}
        variantConfirmBtn='destructive'
        confirmText={t('movie:deleteDialog.confirm')}
        cancelText={t('movie:deleteDialog.cancel')}
        icon={<TriangleAlert className='text-destructive w-5 h-5' />}
      />

      <div className={isLoading ? 'opacity-50 pointer-events-none' : ''}>
        {isDesktop && (
          <AppPagination
            onPageSizeChange={handleOnChangePageSize}
            pageSize={pageSize}
            className='mt-4'
            onPageChange={handleOnPageChange}
            currentPage={movieMeta.page}
            totalPages={movieMeta.totalPages}
          />
        )}
        {(isMobile || isTablet) && (
          <AppPaginationMobile
            onPageSizeChange={handleOnChangePageSize}
            pageSize={pageSize}
            className='mt-4'
            onPageChange={handleOnPageChange}
            currentPage={movieMeta.page}
            totalPages={movieMeta.totalPages}
          />
        )}
      </div>
    </div>
  );
}

