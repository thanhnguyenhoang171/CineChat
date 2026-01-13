import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';
import { AppDeleteButton } from '~/components/shared/button/appDeleteButton';
import { AppModifyButton } from '~/components/shared/button/appModifyButton';
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
import { useBreakpoint } from '~/hooks/useBreakpoint';
import { cn } from '~/lib/utils';
import type {
  PaginationMeta,
  Permission,
} from '~/types/module-types/permission';
import { get4LastDigitsFromId } from '~/utils/common-utils';

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
  const { isMobile, isTablet, isDesktop } = useBreakpoint();

  if (error)
    return (
      <div className='text-destructive'>Đã xảy ra lỗi khi tải dữ liệu.</div>
    );

  return (
    <div className='flex flex-col h-full w-full justify-center'>
      <Table>
        <TableHeader className='border border-border bg-muted'>
          <TableRow className='hover:bg-transparent'>
            {/* 6. Render Header động dựa trên cấu hình */}
            {PermissionTableHeader.map((header) => (
              <TableHead
                key={header.key}
                className={cn(
                  'text-muted-foreground select-none whitespace-nowrap',
                  header.sortable &&
                    'cursor-pointer hover:text-foreground transition-colors',
                )}
                onClick={() => header.sortable && handleSort(header.key)}>
                <div className='flex items-center gap-1 justify-center'>
                  {' '}
                  {/* Căn giữa hoặc start tùy design */}
                  {header.label}
                  {/* Logic hiển thị Icon */}
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
        <TableBody className='border border-border'>
          {isLoading ? (
            Array.from({ length: pageSize }).map((_, index) => (
              <TableRow key={index} className='hover:bg-transparent'>
                {/* ID */}
                <TableCell>
                  <Skeleton className='h-4 w-[50px]' />
                </TableCell>

                {/* Name */}
                <TableCell>
                  <Skeleton className='h-4 w-[150px]' />
                </TableCell>

                {/* API Path */}
                <TableCell>
                  <Skeleton className='h-4 w-[200px]' />
                </TableCell>

                {/* Method */}
                <TableCell className='text-center'>
                  <Skeleton className='h-5 w-12 mx-auto rounded-full' />
                </TableCell>

                {/* Module */}
                <TableCell>
                  <Skeleton className='h-4 w-[100px]' />
                </TableCell>

                {/* Active Status */}
                <TableCell className='text-center'>
                  <Skeleton className='h-4 w-10 mx-auto' />
                </TableCell>

                {/* CreatedAt */}
                <TableCell className='text-center'>
                  <Skeleton className='h-4 w-20 mx-auto' />
                </TableCell>

                {/* UpdatedAt */}
                <TableCell className='text-center'>
                  <Skeleton className='h-4 w-20 mx-auto' />
                </TableCell>

                {/* Actions */}
                <TableCell className='flex justify-center gap-2'>
                  <Skeleton className='h-8 w-8 rounded-md' /> {/* Nút Sửa */}
                  <Skeleton className='h-8 w-8 rounded-md' /> {/* Nút Xóa */}
                </TableCell>
              </TableRow>
            ))
          ) : permissionsList.length > 0 ? (
            permissionsList.map((permission) => (
              <TableRow key={permission._id}>
                <TableCell
                  className={cn(
                    'font-medium text-xs truncate max-w-[200px]',
                    (isMobile || isTablet) && 'max-w-[50px]',
                  )}
                  title={permission._id}>
                  {isMobile || isTablet ? (
                    <p>{get4LastDigitsFromId(permission._id)}</p>
                  ) : (
                    <p>{permission._id}</p>
                  )}
                </TableCell>
                <TableCell>{permission.name}</TableCell>
                <TableCell className='font-mono text-xs'>
                  {permission.apiPath}
                </TableCell>
                <TableCell className='text-center'>
                  <Badge
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
                </TableCell>
                <TableCell>{permission.module}</TableCell>
                <TableCell className='text-center'>
                  {permission.isActive === 1 ? (
                    <span className='text-green-600 font-semibold text-xs'>
                      Active
                    </span>
                  ) : (
                    <span className='text-slate-400 font-semibold text-xs '>
                      Inactive
                    </span>
                  )}
                </TableCell>
                <TableCell className='text-center'>
                  {new Date(permission.createdAt).toLocaleDateString('vi-VN')}
                </TableCell>
                <TableCell className='text-center'>
                  {new Date(permission.updatedAt).toLocaleDateString('vi-VN')}
                </TableCell>
                <TableCell className='flex flex-row gap-2 justify-center items-center'>
                  <AppModifyButton />
                  <AppDeleteButton />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={9} // Sửa thành 9 cột cho khớp header
                className='text-center h-24 text-muted-foreground'>
                Không có dữ liệu
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className={isLoading ? 'opacity-50 pointer-events-none' : ''}>
        {isDesktop && (
          <AppPagination
            onPageSizeChange={handleOnChangePageSize}
            pageSize={pageSize}
            className='mt-3 mb-3'
            onPageChange={handleOnPageChange}
            currentPage={permissionMeta.page}
            totalPages={permissionMeta.totalPages}
          />
        )}
        {(isMobile || isTablet) && (
          <AppPaginationMobile
            onPageSizeChange={handleOnChangePageSize}
            pageSize={pageSize}
            className='mt-3 mb-3'
            onPageChange={handleOnPageChange}
            currentPage={permissionMeta.page}
            totalPages={permissionMeta.totalPages}
          />
        )}
      </div>
    </div>
  );
}
