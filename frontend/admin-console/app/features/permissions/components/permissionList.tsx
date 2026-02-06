import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
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
import { useBreakpoint } from '~/hooks/layout/useBreakpoint';
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
  const { t } = useTranslation('app');
  const { isMobile, isTablet, isDesktop } = useBreakpoint();

  const [selectedFields, setSelectedFields] = useState<string[]>(
    PermissionTableHeader.map((h) => h.key),
  );

  const visibleColumnsSet = useMemo(() => {
    return new Set(
      PermissionTableHeader.filter(
        (col) => col.alwaysShow || selectedFields.includes(col.key),
      ).map((col) => col.key),
    );
  }, [selectedFields]);

  const isVisible = (key: string) => visibleColumnsSet.has(key);

  const toggleColumn = (columnKey: string) => {
    setSelectedFields((prevFields) => {
      if (prevFields.includes(columnKey)) {
        return prevFields.filter((key) => key !== columnKey);
      }
      return [...prevFields, columnKey];
    });
  };

  if (error)
    return (
      <div className='text-destructive'>Đã xảy ra lỗi khi tải dữ liệu.</div>
    );

  return (
    <div className='flex flex-col h-full w-full justify-center'>
      <Table>
        <TableHeader className='border border-border bg-muted'>
          <TableRow className='hover:bg-transparent'>
            {PermissionTableHeader.map((header) => {
              if (!isVisible(header.key)) return null;
              return (
                <TableHead
                  key={header.key}
                  className={cn(
                    'text-muted-foreground select-none whitespace-nowrap',
                    header.width, // Sử dụng width từ config nếu có
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
        <TableBody className='border border-border'>
          {isLoading ? (
            Array.from({ length: pageSize }).map((_, index) => (
              <TableRow key={index} className='hover:bg-transparent'>
                {/* Sửa: Chỉ render Skeleton nếu cột đó Visible */}
                {isVisible('_id') && (
                  <TableCell>
                    <Skeleton className='h-4 w-[50px]' />
                  </TableCell>
                )}
                {isVisible('name') && (
                  <TableCell>
                    <Skeleton className='h-4 w-[150px]' />
                  </TableCell>
                )}
                {isVisible('apiPath') && (
                  <TableCell>
                    <Skeleton className='h-4 w-[200px]' />
                  </TableCell>
                )}
                {isVisible('method') && (
                  <TableCell className='text-center'>
                    <Skeleton className='h-5 w-12 mx-auto rounded-full' />
                  </TableCell>
                )}
                {isVisible('module') && (
                  <TableCell>
                    <Skeleton className='h-4 w-[100px]' />
                  </TableCell>
                )}
                {isVisible('isActive') && (
                  <TableCell className='text-center'>
                    <Skeleton className='h-4 w-10 mx-auto' />
                  </TableCell>
                )}
                {isVisible('createdAt') && (
                  <TableCell className='text-center'>
                    <Skeleton className='h-4 w-20 mx-auto' />
                  </TableCell>
                )}
                {isVisible('updatedAt') && (
                  <TableCell className='text-center'>
                    <Skeleton className='h-4 w-20 mx-auto' />
                  </TableCell>
                )}
                {isVisible('actions') && (
                  <TableCell className='flex justify-center gap-2'>
                    <Skeleton className='h-8 w-8 rounded-md' />
                    <Skeleton className='h-8 w-8 rounded-md' />
                  </TableCell>
                )}
              </TableRow>
            ))
          ) : permissionsList.length > 0 ? (
            permissionsList.map((permission) => (
              <TableRow key={permission._id}>
                {/* ID */}
                {isVisible('_id') && (
                  <TableCell
                    className={cn(
                      'font-medium text-xs truncate max-w-[200px]',
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
                  <TableCell>{permission.name || '--'}</TableCell>
                )}

                {/* API Path */}
                {isVisible('apiPath') && (
                  <TableCell className='font-mono text-xs'>
                    {permission.apiPath || '--'}
                  </TableCell>
                )}

                {/* Method */}
                {isVisible('method') && (
                  <TableCell className='text-center'>
                    {permission.method ? (
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
                    ) : (
                      '--'
                    )}
                  </TableCell>
                )}

                {/* Module */}
                {isVisible('module') && (
                  <TableCell>{permission.module || '--'}</TableCell>
                )}

                {/* Active Status */}
                {isVisible('isActive') && (
                  <TableCell className='text-center'>
                    {/* Kiểm tra null/undefined thay vì falsy check để tránh lỗi số 0 */}
                    {permission.isActive !== undefined &&
                    permission.isActive !== null ? (
                      permission.isActive === 1 ? (
                        <span className='text-green-600 font-semibold text-xs'>
                          {t('status.active')}
                        </span>
                      ) : (
                        <span className='text-slate-400 font-semibold text-xs '>
                          {t('status.inactive')}
                        </span>
                      )
                    ) : (
                      '--'
                    )}
                  </TableCell>
                )}

                {/* CreatedAt */}
                {isVisible('createdAt') && (
                  <TableCell className='text-center'>
                    {permission.createdAt
                      ? new Date(permission.createdAt).toLocaleDateString(
                          'vi-VN',
                        )
                      : '--'}
                  </TableCell>
                )}

                {/* UpdatedAt */}
                {isVisible('updatedAt') && (
                  <TableCell className='text-center'>
                    {permission.updatedAt
                      ? new Date(permission.updatedAt).toLocaleDateString(
                          'vi-VN',
                        )
                      : '--'}
                  </TableCell>
                )}

                {/* Actions */}
                {isVisible('actions') && (
                  <TableCell className='flex flex-row gap-2 justify-center items-center'>
                    <AppModifyButton />
                    <AppDeleteButton />
                  </TableCell>
                )}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                // Sửa colSpan động theo số cột hiển thị
                colSpan={visibleColumnsSet.size}
                className='text-center h-24 text-muted-foreground'>
                {t('noData')}
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
