import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { AppPagination } from '~/components/shared/appPagination';
import { Badge } from '~/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '~/components/ui/tooltip';
import { permissionQueries } from '~/queries/permisson.queries';
import type {
  PaginationMeta,
  Permission,
} from '~/types/module-types/permission';

const defaultMeta: PaginationMeta = {
  page: 1,
  limit: 10,
  total: 0,
  totalPages: 1, // Để là 1 để tránh lỗi chia cho 0 hoặc logic paging
};

export function PermissionList() {
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const { data, isLoading, error } = useQuery(
    permissionQueries.list(page, pageSize),
  );

  const permissionsList: Permission[] = data?.data || [];

  const permissionMeta: PaginationMeta = data?.meta || defaultMeta;

  const onPageChange = (newPage: number) => {
    setPage(newPage); // Cập nhật state -> Trigger query fetch lại
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading) return <div>Đang tải dữ liệu...</div>;
  if (error) return <div>Đã xảy ra lỗi khi tải dữ liệu.</div>;

  return (
    <div className='flex flex-col h-full w-full justify-center'>
      <Table>
        <TableHeader className='border border-border bg-sidebar-border'>
          <TableRow className='hover:bg-transparent'>
            <TableHead>_id</TableHead>
            <TableHead>Tên</TableHead>
            <TableHead>API</TableHead>
            <TableHead className='w-[100px]'>Phương thức</TableHead>
            <TableHead>Module</TableHead>
            <TableHead className='w-[100px]'>Hoạt động</TableHead>
            <TableHead>Ngày tạo</TableHead>
            <TableHead>Ngày cập nhật</TableHead>
            <TableHead>Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className='border border-border'>
          {permissionsList.length > 0 ? (
            permissionsList.map((permission) => (
              <TableRow key={permission._id}>
                <TableCell
                  className='font-medium text-xs truncate max-w-[100px]'
                  title={permission._id}>
                  <Tooltip>
                    <TooltipTrigger> {permission._id}</TooltipTrigger>
                    <TooltipContent>
                      <p>{permission._id}</p>
                    </TooltipContent>
                  </Tooltip>
                </TableCell>
                <TableCell>{permission.name}</TableCell>
                <TableCell className='font-mono text-xs'>
                  {permission.apiPath}
                </TableCell>
                <TableCell>
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
                <TableCell>
                  {permission.isActive === 1 ? (
                    <span className='text-green-600 font-semibold text-xs'>
                      Active
                    </span>
                  ) : (
                    <span className='text-slate-400 font-semibold text-xs'>
                      Inactive
                    </span>
                  )}
                </TableCell>
                <TableCell>
                  {new Date(permission.createdAt).toLocaleDateString('vi-VN')}
                </TableCell>
                <TableCell>
                  {new Date(permission.updatedAt).toLocaleDateString('vi-VN')}
                </TableCell>
                <TableCell>...</TableCell>
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
      <AppPagination
        className='mt-3 mb-3'
        onPageChange={onPageChange}
        currentPage={permissionMeta.page}
        totalPages={permissionMeta.totalPages}
      />
    </div>
  );
}
