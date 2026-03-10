import { ArrowDown, ArrowUp, ArrowUpDown, TriangleAlert } from 'lucide-react';
import { useMemo, useState } from 'react';
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

import { RoleTableHeader } from '~/constants/app/role-constant';
import { useBreakpoint } from '~/hooks/layout/useBreakpoint';
import { cn } from '~/lib/utils';
import type {
  PaginationMeta,
  Role,
} from '~/types/module-types/role';
import { get4LastDigitsFromId } from '~/utils/common-utils';
import { UpdateRoleModal } from './modal/updateRoleModal';
import { AppAlertDialog } from '~/components/shared/alert-dialog/appAlertDialog';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { roleService } from '~/services/role.service';
import { toast } from 'sonner';
import { roleKeys } from '~/queries/role.queries';

interface RoleListProps {
  isLoading: boolean;
  error: any;
  handleSort: (key: string) => void;
  sortBy: string;
  sortDir: string;
  rolesList: Role[];
  handleOnChangePageSize: (pageSize: number) => void;
  pageSize: number;
  handleOnPageChange: (page: number) => void;
  roleMeta: PaginationMeta;
}

export function RoleList({
  error,
  handleOnChangePageSize,
  handleOnPageChange,
  handleSort,
  isLoading,
  pageSize,
  roleMeta,
  rolesList,
  sortBy,
  sortDir,
}: RoleListProps) {
  const { t } = useTranslation(['app', 'role']);
  const { isMobile, isTablet, isDesktop } = useBreakpoint();
  const queryClient = useQueryClient();

  const [selectedFields, setSelectedFields] = useState<string[]>(
    RoleTableHeader.map((h) => h.key),
  );

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState<Role | null>(null);

  const handleEditClick = (role: Role) => {
    setSelectedRole(role);
    setIsUpdateModalOpen(true);
  };

  const handleDeleteClick = (role: Role) => {
    setRoleToDelete(role);
    setIsDeleteDialogOpen(true);
  };

  const { mutate: deleteMutate, isPending: isDeletePending } = useMutation({
    mutationFn: (id: string) => roleService.deleteRole(id),
    onSuccess: (response) => {
      if (response.status === 200) {
        toast.success(t('role:deleteDialog.success', 'Role deleted successfully'));
        queryClient.invalidateQueries({ queryKey: roleKeys.lists() });
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
      RoleTableHeader.filter(
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
              {RoleTableHeader.map((header) => {
                if (!isVisible(header.key)) return null;
                return (
                  <TableHead
                    key={header.key}
                    className={cn(
                      'text-muted-foreground select-none whitespace-nowrap px-4 py-3 text-center',
                      header.sortable &&
                        'cursor-pointer hover:text-foreground transition-colors',
                    )}
                    onClick={() => header.sortable && handleSort(header.key)}>
                    <div className='flex items-center gap-1 justify-center'>
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
                  {RoleTableHeader.map((header) => isVisible(header.key) && (
                    <TableCell key={header.key} className='px-4 py-4 text-center'>
                      <Skeleton className='h-4 w-full max-w-[100px] mx-auto' />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : rolesList.length > 0 ? (
              rolesList.map((role) => (
                <TableRow key={role._id} className='hover:bg-muted/30 transition-colors'>
                  {/* ID */}
                  {isVisible('_id') && (
                    <TableCell
                      className={cn(
                        'px-4 py-3 font-medium text-xs truncate max-w-[200px]',
                        (isMobile || isTablet) && 'max-w-[50px]',
                      )}
                      title={role._id}>
                      {role._id ? (
                        isMobile || isTablet ? (
                          <p>{get4LastDigitsFromId(role._id)}</p>
                        ) : (
                          <p>{role._id}</p>
                        )
                      ) : (
                        '--'
                      )}
                    </TableCell>
                  )}

                  {/* Name */}
                  {isVisible('name') && (
                    <TableCell className='px-4 py-3 text-center font-bold text-primary'>{role.name || '--'}</TableCell>
                  )}

                  {/* Description */}
                  {isVisible('description') && (
                    <TableCell className='px-4 py-3 text-center text-xs text-muted-foreground'>
                      {role.description || '--'}
                    </TableCell>
                  )}

                  {/* Active Status */}
                  {isVisible('isActive') && (
                    <TableCell className='px-4 py-3 text-center'>
                      {role.isActive === 1 ? (
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
                      {role.createdAt
                        ? new Date(role.createdAt).toLocaleDateString('vi-VN')
                        : '--'}
                    </TableCell>
                  )}

                  {/* UpdatedAt */}
                  {isVisible('updatedAt') && (
                    <TableCell className='px-4 py-3 text-center text-xs text-muted-foreground'>
                      {role.updatedAt
                        ? new Date(role.updatedAt).toLocaleDateString('vi-VN')
                        : '--'}
                    </TableCell>
                  )}

                  {/* Actions */}
                  {isVisible('actions') && (
                    <TableCell className='px-4 py-3'>
                      <div className='flex flex-row gap-1 justify-center items-center'>
                        <AppModifyButton handleOnClick={() => handleEditClick(role)} />
                        <AppDeleteButton handleOnClick={() => handleDeleteClick(role)} />
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

      <UpdateRoleModal
        open={isUpdateModalOpen}
        onOpenChange={setIsUpdateModalOpen}
        role={selectedRole}
      />

      <AppAlertDialog
        openAlertDialog={isDeleteDialogOpen}
        setOpenAlertDialog={setIsDeleteDialogOpen}
        title={t('role:deleteDialog.title')}
        description={t('role:deleteDialog.description', { name: roleToDelete?.name })}
        onConfirm={() => roleToDelete && deleteMutate(roleToDelete._id)}
        variantConfirmBtn='destructive'
        confirmText={t('role:deleteDialog.confirm')}
        cancelText={t('role:deleteDialog.cancel')}
        icon={<TriangleAlert className='text-destructive w-5 h-5' />}
      />

      <div className={isLoading ? 'opacity-50 pointer-events-none' : ''}>
        {isDesktop && (
          <AppPagination
            onPageSizeChange={handleOnChangePageSize}
            pageSize={pageSize}
            className='mt-4'
            onPageChange={handleOnPageChange}
            currentPage={roleMeta.page}
            totalPages={roleMeta.totalPages}
          />
        )}
        {(isMobile || isTablet) && (
          <AppPaginationMobile
            onPageSizeChange={handleOnChangePageSize}
            pageSize={pageSize}
            className='mt-4'
            onPageChange={handleOnPageChange}
            currentPage={roleMeta.page}
            totalPages={roleMeta.totalPages}
          />
        )}
      </div>
    </div>
  );
}
