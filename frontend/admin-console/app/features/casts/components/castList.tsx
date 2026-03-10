import { ArrowDown, ArrowUp, ArrowUpDown, TriangleAlert, Star } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AppDeleteButton } from '~/components/shared/button/appDeleteButton';
import { AppModifyButton } from '~/components/shared/button/appModifyButton';
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
import type {
  PaginationMeta,
  Cast,
} from '~/types/module-types/cast';
import { get4LastDigitsFromId } from '~/utils/common-utils';
import { UpdateCastModal } from './modal/updateCastModal';
import { AppAlertDialog } from '~/components/shared/alert-dialog/appAlertDialog';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { castService } from '~/services/cast.service';
import { toast } from 'sonner';
import { castKeys } from '~/queries/cast.queries';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { Badge } from '~/components/ui/badge';

interface CastListProps {
  isLoading: boolean;
  error: any;
  handleSort: (key: string) => void;
  sortBy: string;
  sortDir: string;
  castsList: Cast[];
  handleOnChangePageSize: (pageSize: number) => void;
  pageSize: number;
  handleOnPageChange: (page: number) => void;
  castMeta: PaginationMeta;
}

export function CastList({
  error,
  handleOnChangePageSize,
  handleOnPageChange,
  handleSort,
  isLoading,
  pageSize,
  castMeta,
  castsList,
  sortBy,
  sortDir,
}: CastListProps) {
  const { t } = useTranslation(['app', 'cast']);
  const { isMobile, isTablet, isDesktop } = useBreakpoint();
  const queryClient = useQueryClient();

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedCast, setSelectedCast] = useState<Cast | null>(null);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [castToDelete, setCastToDelete] = useState<Cast | null>(null);

  const handleEditClick = (cast: Cast) => {
    setSelectedCast(cast);
    setIsUpdateModalOpen(true);
  };

  const handleDeleteClick = (cast: Cast) => {
    setCastToDelete(cast);
    setIsDeleteDialogOpen(true);
  };

  const { mutate: deleteMutate } = useMutation({
    mutationFn: (id: string) => castService.deleteCast(id),
    onSuccess: (response) => {
      if (response.status === 200) {
        toast.success(t('cast:deleteDialog.success'));
        queryClient.invalidateQueries({ queryKey: castKeys.lists() });
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
    { label: 'cast:table.name', key: 'name', sortable: true },
    { label: 'cast:table.role', key: 'role', sortable: false },
    { label: 'cast:table.birthday', key: 'birthday', sortable: true },
    { label: 'cast:table.popularity', key: 'popularity', sortable: true },
    { label: 'cast:table.status', key: 'isActive', sortable: true },
    { label: 'cast:table.actions', key: 'actions', sortable: false },
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
                    header.sortable && 'cursor-pointer hover:text-foreground transition-colors',
                  )}
                  onClick={() => header.sortable && handleSort(header.key)}>
                  <div className={cn(
                    'flex items-center gap-1',
                    header.key === 'actions' || header.key === 'isActive' || header.key === 'popularity' ? 'justify-center' : 'justify-start'
                  )}>
                    {t(header.label)}
                    {header.sortable && (
                      <span className='ml-1'>
                        {sortBy === header.key ? (
                          sortDir === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />
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
            ) : castsList.length > 0 ? (
              castsList.map((cast) => (
                <TableRow key={cast._id} className='hover:bg-muted/30 transition-colors'>
                  {/* Name & Avatar */}
                  <TableCell className='px-4 py-3'>
                    <div className='flex items-center gap-3'>
                      <Avatar className='h-10 w-10 border border-border rounded-lg overflow-hidden'>
                        <AvatarImage src={cast.profilePath} alt={cast.name} className='object-cover' />
                        <AvatarFallback className='bg-primary/5 text-primary text-xs font-bold rounded-lg'>
                          {cast.name?.[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className='flex flex-col min-w-0'>
                        <span className='font-bold text-sm truncate text-foreground/80'>
                          {cast.name}
                        </span>
                        <span className='text-[10px] text-muted-foreground font-mono'>
                          ID: {get4LastDigitsFromId(cast._id)}
                        </span>
                      </div>
                    </div>
                  </TableCell>

                  {/* Role */}
                  <TableCell className='px-4 py-3'>
                    <Badge variant='outline' className='text-[10px] font-black border-primary/20 text-primary/70 bg-primary/5'>
                      {cast.role}
                    </Badge>
                  </TableCell>

                  {/* Birthday */}
                  <TableCell className='px-4 py-3 text-sm text-muted-foreground'>
                    {cast.birthday || '--'}
                  </TableCell>

                  {/* Popularity */}
                  <TableCell className='px-4 py-3 text-center'>
                    <div className='flex items-center justify-center gap-1.5'>
                      <Star className='w-3.5 h-3.5 text-yellow-500 fill-yellow-500' />
                      <span className='text-sm font-bold text-slate-700'>{cast.popularity?.toFixed(1) || '0.0'}</span>
                    </div>
                  </TableCell>

                  {/* Status */}
                  <TableCell className='px-4 py-3 text-center'>
                    {cast.isActive === 1 ? (
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
                      <AppModifyButton handleOnClick={() => handleEditClick(cast)} />
                      <AppDeleteButton handleOnClick={() => handleDeleteClick(cast)} />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={tableHeaders.length} className='text-center h-32 text-muted-foreground italic'>
                  {t('app:noData')}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <UpdateCastModal
        open={isUpdateModalOpen}
        onOpenChange={setIsUpdateModalOpen}
        cast={selectedCast}
      />

      <AppAlertDialog
        openAlertDialog={isDeleteDialogOpen}
        setOpenAlertDialog={setIsDeleteDialogOpen}
        title={t('cast:deleteDialog.title')}
        description={t('cast:deleteDialog.description', { name: castToDelete?.name })}
        onConfirm={() => castToDelete && deleteMutate(castToDelete._id)}
        variantConfirmBtn='destructive'
        confirmText={t('cast:deleteDialog.confirm')}
        cancelText={t('cast:deleteDialog.cancel')}
        icon={<TriangleAlert className='text-destructive w-5 h-5' />}
      />

      <div className={isLoading ? 'opacity-50 pointer-events-none' : ''}>
        {isDesktop && (
          <AppPagination
            onPageSizeChange={handleOnChangePageSize}
            pageSize={pageSize}
            className='mt-4'
            onPageChange={handleOnPageChange}
            currentPage={castMeta.page}
            totalPages={castMeta.totalPages}
          />
        )}
        {(isMobile || isTablet) && (
          <AppPaginationMobile
            onPageSizeChange={handleOnChangePageSize}
            pageSize={pageSize}
            className='mt-4'
            onPageChange={handleOnPageChange}
            currentPage={castMeta.page}
            totalPages={castMeta.totalPages}
          />
        )}
      </div>
    </div>
  );
}
