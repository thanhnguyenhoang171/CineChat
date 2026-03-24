import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  TriangleAlert,
  Mail,
  Shield,
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
import type { PaginationMeta, User } from '~/types/module-types/user';
import { get4LastDigitsFromId } from '~/utils/common-utils';
import { UpdateUserModal } from './modal/updateUserModal';
import { AppAlertDialog } from '~/components/shared/alert-dialog/appAlertDialog';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userService } from '~/services/user.service';
import { toast } from 'sonner';
import { userKeys } from '~/queries/user.queries';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { Badge } from '~/components/ui/badge';

interface UserListProps {
  isLoading: boolean;
  error: any;
  handleSort: (key: string) => void;
  sortBy: string;
  sortDir: string;
  usersList: User[];
  handleOnChangePageSize: (pageSize: number) => void;
  pageSize: number;
  handleOnPageChange: (page: number) => void;
  userMeta: PaginationMeta;
}

export function UserList({
  error,
  handleOnChangePageSize,
  handleOnPageChange,
  handleSort,
  isLoading,
  pageSize,
  userMeta,
  usersList,
  sortBy,
  sortDir,
}: UserListProps) {
  const { t } = useTranslation(['app', 'user']);
  const { isMobile, isTablet, isDesktop } = useBreakpoint();
  const queryClient = useQueryClient();

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  const handleEditClick = (user: User) => {
    setSelectedUser(user);
    setIsUpdateModalOpen(true);
  };

  const handleDeleteClick = (user: User) => {
    setUserToDelete(user);
    setIsDeleteDialogOpen(true);
  };

  const { mutate: deleteMutate, isPending: isDeletePending } = useMutation({
    mutationFn: (id: string) => userService.deleteUser(id),
    onSuccess: (response) => {
      if (response.status === 200) {
        toast.success(t('user:deleteDialog.success'));
        queryClient.invalidateQueries({ queryKey: userKeys.lists() });
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
    { label: 'user:table.fullName', key: 'firstName', sortable: true },
    { label: 'user:table.email', key: 'email', sortable: true },
    { label: 'user:table.role', key: 'role', sortable: false },
    { label: 'user:table.status', key: 'isActive', sortable: true },
    { label: 'user:table.actions', key: 'actions', sortable: false },
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
            ) : usersList.length > 0 ? (
              usersList.map((user) => (
                <TableRow
                  key={user._id}
                  className='hover:bg-muted/30 transition-colors'>
                  {/* Full Name & Avatar */}
                  <TableCell className='px-4 py-3'>
                    <div className='flex items-center gap-3'>
                      <Avatar className='h-9 w-9 border border-border'>
                        <AvatarImage
                          src={user.picture?.url}
                          alt={user.firstName}
                        />
                        <AvatarFallback className='bg-primary/5 text-primary text-xs font-bold'>
                          {user.firstName?.[0]}
                          {user.lastName?.[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className='flex flex-col min-w-0'>
                        <span className='font-bold text-sm truncate'>
                          {user.firstName} {user.lastName}
                        </span>
                        <span className='text-[10px] text-muted-foreground font-mono'>
                          ID: {get4LastDigitsFromId(user._id)}
                        </span>
                      </div>
                    </div>
                  </TableCell>

                  {/* Email */}
                  <TableCell className='px-4 py-3'>
                    <div className='flex items-center gap-2 text-muted-foreground'>
                      <Mail className='w-3.5 h-3.5 shrink-0' />
                      <span className='text-sm truncate max-w-[200px]'>
                        {user.email}
                      </span>
                    </div>
                  </TableCell>

                  {/* Role */}
                  <TableCell className='px-4 py-3'>
                    <div className='flex items-center gap-2'>
                      <Shield className='w-3.5 h-3.5 text-primary/70' />
                      <span className='text-xs font-medium bg-primary/5 text-primary px-2 py-0.5 rounded border border-primary/10'>
                        {user.role?.name || 'User'}
                      </span>
                    </div>
                  </TableCell>

                  {/* Status */}
                  <TableCell className='px-4 py-3 text-center'>
                    {user.isActive === 1 ? (
                      <Badge
                        variant='outline'
                        className='bg-green-500/10 text-green-600 border-green-200 text-[10px] font-bold uppercase py-0 px-2'>
                        {t('app:status.active')}
                      </Badge>
                    ) : (
                      <Badge
                        variant='outline'
                        className='bg-slate-500/10 text-slate-500 border-slate-200 text-[10px] font-bold uppercase py-0 px-2'>
                        {t('app:status.inactive')}
                      </Badge>
                    )}
                  </TableCell>

                  {/* Actions */}
                  <TableCell className='px-4 py-3'>
                    <div className='flex items-center justify-center gap-1'>
                      <AppModifyButton
                        handleOnClick={() => handleEditClick(user)}
                      />
                      <AppDeleteButton
                        handleOnClick={() => handleDeleteClick(user)}
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

      <UpdateUserModal
        open={isUpdateModalOpen}
        onOpenChange={setIsUpdateModalOpen}
        user={selectedUser}
      />

      <AppAlertDialog
        openAlertDialog={isDeleteDialogOpen}
        setOpenAlertDialog={setIsDeleteDialogOpen}
        title={t('user:deleteDialog.title')}
        description={t('user:deleteDialog.description', {
          name: `${userToDelete?.firstName} ${userToDelete?.lastName}`,
        })}
        onConfirm={() => userToDelete && deleteMutate(userToDelete._id)}
        variantConfirmBtn='destructive'
        confirmText={t('user:deleteDialog.confirm')}
        cancelText={t('user:deleteDialog.cancel')}
        icon={<TriangleAlert className='text-destructive w-5 h-5' />}
      />

      <div className={isLoading ? 'opacity-50 pointer-events-none' : ''}>
        {isDesktop && (
          <AppPagination
            onPageSizeChange={handleOnChangePageSize}
            pageSize={pageSize}
            className='mt-4'
            onPageChange={handleOnPageChange}
            currentPage={userMeta.page}
            totalPages={userMeta.totalPages}
          />
        )}
        {(isMobile || isTablet) && (
          <AppPaginationMobile
            onPageSizeChange={handleOnChangePageSize}
            pageSize={pageSize}
            className='mt-4'
            onPageChange={handleOnPageChange}
            currentPage={userMeta.page}
            totalPages={userMeta.totalPages}
          />
        )}
      </div>
    </div>
  );
}
