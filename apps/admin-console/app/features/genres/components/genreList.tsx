import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  TriangleAlert,
  Tag,
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
import type { PaginationMeta, Genre } from '~/types/module-types/genre';
import { get4LastDigitsFromId } from '~/utils/common-utils';
import { UpdateGenreModal } from './modal/updateGenreModal';
import { AppAlertDialog } from '~/components/shared/alert-dialog/appAlertDialog';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { genreService } from '~/services/genre.service';
import { toast } from 'sonner';
import { genreKeys } from '~/queries/genre.queries';
import { Badge } from '~/components/ui/badge';

interface GenreListProps {
  isLoading: boolean;
  error: any;
  handleSort: (key: string) => void;
  sortBy: string;
  sortDir: string;
  genresList: Genre[];
  handleOnChangePageSize: (pageSize: number) => void;
  pageSize: number;
  handleOnPageChange: (page: number) => void;
  genreMeta: PaginationMeta;
}

export function GenreList({
  error,
  handleOnChangePageSize,
  handleOnPageChange,
  handleSort,
  isLoading,
  pageSize,
  genreMeta,
  genresList,
  sortBy,
  sortDir,
}: GenreListProps) {
  const { t } = useTranslation(['app', 'genre']);
  const { isMobile, isTablet, isDesktop } = useBreakpoint();
  const queryClient = useQueryClient();

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [genreToDelete, setGenreToDelete] = useState<Genre | null>(null);

  const handleEditClick = (genre: Genre) => {
    setSelectedGenre(genre);
    setIsUpdateModalOpen(true);
  };

  const handleDeleteClick = (genre: Genre) => {
    setGenreToDelete(genre);
    setIsDeleteDialogOpen(true);
  };

  const { mutate: deleteMutate } = useMutation({
    mutationFn: (id: string) => genreService.deleteGenre(id),
    onSuccess: (response) => {
      if (response.status === 200) {
        toast.success(t('genre:deleteDialog.success'));
        queryClient.invalidateQueries({ queryKey: genreKeys.lists() });
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
    { label: 'genre:table.name', key: 'name', sortable: true },
    { label: 'genre:table.description', key: 'description', sortable: false },
    { label: 'genre:table.status', key: 'isActive', sortable: true },
    { label: 'genre:table.actions', key: 'actions', sortable: false },
  ];

  return (
    <div className='flex flex-col h-full w-full justify-center'>
      <div className='rounded-md border border-border overflow-hidden'>
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
                      header.key === 'actions' || header.key === 'isActive'
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
            ) : genresList.length > 0 ? (
              genresList.map((genre) => (
                <TableRow
                  key={genre._id}
                  className='hover:bg-muted/30 transition-colors'>
                  {/* Name */}
                  <TableCell className='px-4 py-3'>
                    <div className='flex items-center gap-3'>
                      <div className='bg-primary/5 p-2 rounded-lg border border-primary/10'>
                        <Tag className='w-4 h-4 text-primary/70' />
                      </div>
                      <div className='flex flex-col min-w-0'>
                        <span className='font-bold text-sm truncate text-foreground/80'>
                          {genre.name}
                        </span>
                        <span className='text-[10px] text-muted-foreground font-mono'>
                          ID: {get4LastDigitsFromId(genre._id)}
                        </span>
                      </div>
                    </div>
                  </TableCell>

                  {/* Description */}
                  <TableCell className='px-4 py-3 text-sm text-muted-foreground max-w-[300px] truncate'>
                    {genre.description || '--'}
                  </TableCell>

                  {/* Status */}
                  <TableCell className='px-4 py-3 text-center'>
                    {genre.isActive === 1 ? (
                      <span className='text-green-600 font-bold text-[10px] uppercase bg-green-50 px-2 py-0.5 rounded border border-green-100'>
                        {t('app:status.active')}
                      </span>
                    ) : (
                      <span className='text-slate-400 font-bold text-[10px] uppercase bg-slate-50 px-2 py-0.5 rounded border border-slate-100'>
                        {t('app:status.inactive')}
                      </span>
                    )}
                  </TableCell>

                  {/* Actions */}
                  <TableCell className='px-4 py-3'>
                    <div className='flex items-center justify-center gap-1'>
                      <AppModifyButton
                        handleOnClick={() => handleEditClick(genre)}
                      />
                      <AppDeleteButton
                        handleOnClick={() => handleDeleteClick(genre)}
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

      {isUpdateModalOpen && (
        <UpdateGenreModal
          open={isUpdateModalOpen}
          onOpenChange={setIsUpdateModalOpen}
          genre={selectedGenre}
        />
      )}

      <AppAlertDialog
        openAlertDialog={isDeleteDialogOpen}
        setOpenAlertDialog={setIsDeleteDialogOpen}
        title={t('genre:deleteDialog.title')}
        description={t('genre:deleteDialog.description', {
          name: genreToDelete?.name,
        })}
        onConfirm={() => genreToDelete && deleteMutate(genreToDelete._id)}
        variantConfirmBtn='destructive'
        confirmText={t('genre:deleteDialog.confirm')}
        cancelText={t('genre:deleteDialog.cancel')}
        icon={<TriangleAlert className='text-destructive w-5 h-5' />}
      />

      <div className={isLoading ? 'opacity-50 pointer-events-none' : ''}>
        {isDesktop && (
          <AppPagination
            onPageSizeChange={handleOnChangePageSize}
            pageSize={pageSize}
            className='mt-4'
            onPageChange={handleOnPageChange}
            currentPage={genreMeta.page}
            totalPages={genreMeta.totalPages}
          />
        )}
        {(isMobile || isTablet) && (
          <AppPaginationMobile
            onPageSizeChange={handleOnChangePageSize}
            pageSize={pageSize}
            className='mt-4'
            onPageChange={handleOnPageChange}
            currentPage={genreMeta.page}
            totalPages={genreMeta.totalPages}
          />
        )}
      </div>
    </div>
  );
}
