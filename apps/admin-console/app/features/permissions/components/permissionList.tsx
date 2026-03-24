import { ArrowDown, ArrowUp, ArrowUpDown, TriangleAlert } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AppDeleteButton } from '~/components/shared/button/AppDeleteButton';
import { AppModifyButton } from '~/components/shared/button/AppModifyButton';
import { AppPagination } from '~/components/shared/pagination/appPagination';
import { AppPaginationMobile } from '~/components/shared/pagination/appPaginationMobile';
import { Badge } from '~/components/ui/badge';
import { Skeleton } from '~/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table';

import { PermissionTableHeader } from '~/constants/app/permisson-constant';
import { useBreakpoint } from '~/hooks/layout/useBreakpoint';
import { cn } from '~/lib/utils';
import type {
  PaginationMeta,
  Permission,
} from '~/types/module-types/permission';
import { get4LastDigitsFromId } from '~/utils/common-utils';
import { UpdatePermissionModal } from './modal/updatePermissionModal';
import { AppAlertDialog } from '~/components/shared/alert-dialog/appAlertDialog';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { permissionService } from '~/services/permission.service';
import { toast } from 'sonner';
import { permissionKeys } from '~/queries/permisson.queries';

interface PermissionListProps {
  isLoading: boolean;
  error: any;
  handleSort: (key: string) => void;
  sortBy: string;
  sortDir: string;
  permissionsList: Permission[];
  handleOnChangePageSize: (pageSize: number) => void;
  pageSize: number;
  handleOnPageChange: (page: number) => void;
  permissionMeta: PaginationMeta;
}

export function PermissionList({
  error,
  handleOnChangePageSize,
  handleOnPageChange,
  handleSort,
  isLoading,
  pageSize,
  permissionMeta,
  permissionsList,
  sortBy,
  sortDir,
}: PermissionListProps) {
  const { t } = useTranslation(['app', 'permission']);
  const { isMobile, isTablet, isDesktop } = useBreakpoint();
  const queryClient = useQueryClient();

  const [selectedFields, setSelectedFields] = useState<string[]>(
    PermissionTableHeader.map((h) => h.key),
  );

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedPermission, setSelectedPermission] =
    useState<Permission | null>(null);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [permissionToDelete, setPermissionToDelete] =
    useState<Permission | null>(null);

  const handleEditClick = (permission: Permission) => {
    setSelectedPermission(permission);
    setIsUpdateModalOpen(true);
  };

  const handleDeleteClick = (permission: Permission) => {
    setPermissionToDelete(permission);
    setIsDeleteDialogOpen(true);
  };

  const { mutate: deleteMutate, isPending: isDeletePending } = useMutation({
    mutationFn: (id: string) => permissionService.deletePermission(id),
    onSuccess: (response) => {
      if (response.status === 200) {
        toast.success(
          t(
            'permission:deleteDialog.success',
            'Permission deleted successfully',
          ),
        );
        queryClient.invalidateQueries({ queryKey: permissionKeys.lists() });
        setIsDeleteDialogOpen(false);
      } else {
        toast.error(response.message || t('app:error.general'));
      }
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || t('app:error.general'));
    },
  });

  const visibleColumnsSet = useMemo(() => {
    return new Set(
      PermissionTableHeader.filter(
        (col) => col.alwaysShow || selectedFields.includes(col.key),
      ).map((col) => col.key),
    );
  }, [selectedFields]);

  const isVisible = (key: string) => visibleColumnsSet.has(key);

  if (error)
    return (
      <div className='text-destructive'>Đã xảy ra lỗi khi tải dữ liệu.</div>
    );

  return (
    <div className='flex flex-col h-full w-full justify-center'>
      <div className='rounded-md border border-border overflow-hidden'>
        <Table>
          <TableHeader className='bg-muted/50'>
            <TableRow>
              {PermissionTableHeader.map((header) => {
                if (!isVisible(header.key)) return null;
                return (
                  <TableHead
                    key={header.key}
                    className={cn(
                      'text-muted-foreground select-none whitespace-nowrap px-4 py-3',
                      header.width, // Sử dụng width từ config nếu có
                      header.sortable &&
                        'cursor-pointer hover:text-foreground transition-colors',
                    )}
                    onClick={() => header.sortable && handleSort(header.key)}>
                    <div
                      className={cn(
                        'flex items-center gap-1',
                        header.key === 'actions' ||
                          header.key === 'isActive' ||
                          header.key === 'method'
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
                );
              })}
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: pageSize }).map((_, index) => (
                <TableRow key={index}>
                  {PermissionTableHeader.map(
                    (header) =>
                      isVisible(header.key) && (
                        <TableCell
                          key={header.key}
                          className='px-4 py-4 text-center'>
                          <Skeleton className='h-4 w-full max-w-[100px] mx-auto' />
                        </TableCell>
                      ),
                  )}
                </TableRow>
              ))
            ) : permissionsList.length > 0 ? (
              permissionsList.map((permission) => (
                <TableRow
                  key={permission._id}
                  className='hover:bg-muted/30 transition-colors'>
                  {/* ID */}
                  {isVisible('_id') && (
                    <TableCell
                      className={cn(
                        'px-4 py-3 font-medium text-xs truncate max-w-[200px]',
                        (isMobile || isTablet) && 'max-w-[50px]',
                      )}
                      title={permission._id}>
                      {permission._id ? (
                        isMobile || isTablet ? (
                          <p>{get4LastDigitsFromId(permission._id)}</p>
                        ) : (
                          <p>{permission._id}</p>
                        )
                      ) : (
                        '--'
                      )}
                    </TableCell>
                  )}

                  {/* Name */}
                  {isVisible('name') && (
                    <TableCell className='px-4 py-3 font-bold text-sm text-foreground/80'>
                      {permission.name || '--'}
                    </TableCell>
                  )}

                  {/* API Path */}
                  {isVisible('apiPath') && (
                    <TableCell className='px-4 py-3 font-mono text-[11px] text-muted-foreground bg-muted/5'>
                      {permission.apiPath || '--'}
                    </TableCell>
                  )}

                  {/* Method */}
                  {isVisible('method') && (
                    <TableCell className='px-4 py-3 text-center'>
                      {permission.method ? (
                        <Badge
                          className='text-[10px] font-bold h-5 px-2'
                          variant={
                            permission.method === 'GET'
                              ? 'default'
                              : permission.method === 'POST'
                                ? 'secondary'
                                : permission.method === 'DELETE'
                                  ? 'destructive'
                                  : 'outline'
                          }>
                          {permission.method}
                        </Badge>
                      ) : (
                        '--'
                      )}
                    </TableCell>
                  )}

                  {/* Module */}
                  {isVisible('module') && (
                    <TableCell className='px-4 py-3'>
                      <Badge
                        variant='outline'
                        className='text-[10px] font-bold border-primary/20 text-primary/80 bg-primary/5 capitalize'>
                        {permission.module || '--'}
                      </Badge>
                    </TableCell>
                  )}

                  {/* Active Status */}
                  {isVisible('isActive') && (
                    <TableCell className='px-4 py-3 text-center'>
                      {permission.isActive === 1 ? (
                        <span className='text-green-600 font-bold text-[10px] uppercase bg-green-50 px-2 py-0.5 rounded border border-green-100'>
                          {t('app:status.active')}
                        </span>
                      ) : (
                        <span className='text-slate-400 font-bold text-[10px] uppercase bg-slate-50 px-2 py-0.5 rounded border border-slate-100'>
                          {t('app:status.inactive')}
                        </span>
                      )}
                    </TableCell>
                  )}

                  {/* CreatedAt */}
                  {isVisible('createdAt') && (
                    <TableCell className='px-4 py-3 text-center text-xs text-muted-foreground'>
                      {permission.createdAt
                        ? new Date(permission.createdAt).toLocaleDateString(
                            'vi-VN',
                          )
                        : '--'}
                    </TableCell>
                  )}

                  {/* UpdatedAt */}
                  {isVisible('updatedAt') && (
                    <TableCell className='px-4 py-3 text-center text-xs text-muted-foreground'>
                      {permission.updatedAt
                        ? new Date(permission.updatedAt).toLocaleDateString(
                            'vi-VN',
                          )
                        : '--'}
                    </TableCell>
                  )}

                  {/* Actions */}
                  {isVisible('actions') && (
                    <TableCell className='px-4 py-3'>
                      <div className='flex flex-row gap-1 justify-center items-center'>
                        <AppModifyButton
                          handleOnClick={() => handleEditClick(permission)}
                        />
                        <AppDeleteButton
                          handleOnClick={() => handleDeleteClick(permission)}
                        />
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={visibleColumnsSet.size}
                  className='text-center h-32 text-muted-foreground italic'>
                  {t('app:noData')}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <UpdatePermissionModal
        open={isUpdateModalOpen}
        onOpenChange={setIsUpdateModalOpen}
        permission={selectedPermission}
      />

      <AppAlertDialog
        openAlertDialog={isDeleteDialogOpen}
        setOpenAlertDialog={setIsDeleteDialogOpen}
        title={t('permission:deleteDialog.title')}
        description={t('permission:deleteDialog.description', {
          name: permissionToDelete?.name,
        })}
        onConfirm={() =>
          permissionToDelete && deleteMutate(permissionToDelete._id)
        }
        variantConfirmBtn='destructive'
        confirmText={t('permission:deleteDialog.confirm')}
        cancelText={t('permission:deleteDialog.cancel')}
        icon={<TriangleAlert className='text-destructive w-5 h-5' />}
      />

      <div className={isLoading ? 'opacity-50 pointer-events-none' : ''}>
        {isDesktop && (
          <AppPagination
            onPageSizeChange={handleOnChangePageSize}
            pageSize={pageSize}
            className='mt-4'
            onPageChange={handleOnPageChange}
            currentPage={permissionMeta.page}
            totalPages={permissionMeta.totalPages}
          />
        )}
        {(isMobile || isTablet) && (
          <AppPaginationMobile
            onPageSizeChange={handleOnChangePageSize}
            pageSize={pageSize}
            className='mt-4'
            onPageChange={handleOnPageChange}
            currentPage={permissionMeta.page}
            totalPages={permissionMeta.totalPages}
          />
        )}
      </div>
    </div>
  );
}
