import { useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from '@tanstack/react-table'; //  1. Import React Table
import { Plus, Search, Trash2, Edit } from 'lucide-react';
import type { Route } from './+types/user-list';
import { queryClient } from '~/lib/query-client';
import { userQueries } from '~/queries/user.queries';
import { Button } from '~/components/ui/button';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { toast } from 'sonner';
import type { AxiosError } from 'axios';
import { protectedLoader } from '~/utils/loader-utils';
import type { User } from '~/types/user';


// --- 1. LOADER ---
export async function clientLoader({ request }: Route.ClientLoaderArgs) {
  return protectedLoader(async () => {
    await queryClient.prefetchQuery(userQueries.list());
  });
}

// --- 2. CẤU HÌNH CỘT (COLUMNS) ---
const columnHelper = createColumnHelper<User>();

const columns = [
  // Cột 1: User Info (Avatar + Tên + Email)
  columnHelper.accessor('_id', {
    header: 'Người dùng',
    cell: (info) => {
      const user = info.row.original;
      return (
        <div className='flex items-center gap-3'>
          <div className='h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold overflow-hidden border'>
            {user.picture ? (
              <img
                src={user.picture}
                alt='Avatar'
                className='h-full w-full object-cover'
              />
            ) : (
              user.firstName?.charAt(0).toUpperCase() || 'U'
            )}
          </div>
          <div>
            <div className='font-medium text-gray-900'>
              {user.firstName} {user.lastName}
            </div>
            <div className='text-xs text-gray-500'>{user.email}</div>
          </div>
        </div>
      );
    },
  }),
  // Cột 2: Role
  columnHelper.accessor('role', {
    header: 'Vai trò',
    cell: (info) => (
      <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800'>
        {info.getValue()?.name || 'USER'}
      </span>
    ),
  }),
  // Cột 3: Ngày tạo
  columnHelper.accessor('createdAt', {
    header: 'Ngày tạo',
    cell: (info) => {
      const date = info.getValue();
      return (
        <span className='text-gray-500'>
          {date ? format(new Date(date), 'dd/MM/yyyy', { locale: vi }) : 'N/A'}
        </span>
      );
    },
  }),
  // Cột 4: Hành động (Actions)
  columnHelper.display({
    id: 'actions',
    header: () => <div className='text-right'>Hành động</div>,
    cell: (info) => (
      <div className='flex justify-end gap-2'>
        <Button
          variant='ghost'
          size='icon'
          className='text-gray-500 hover:text-blue-600'
          onClick={() => console.log('Edit', info.row.original._id)}>
          <Edit size={16} />
        </Button>
        <Button
          variant='ghost'
          size='icon'
          className='text-gray-500 hover:text-red-600'
          onClick={() => console.log('Delete', info.row.original._id)}>
          <Trash2 size={16} />
        </Button>
      </div>
    ),
  }),
];

export default function UsersListPage() {
  const {
    data: response,
    isLoading,
    isError,
    error,
  } = useQuery({ ...userQueries.list() });

  const users = useMemo(() => response?.data || [], [response]);

  // Handle Error Toast
  useEffect(() => {
    if (isError) {
      const err = error as AxiosError<any>;
      toast.error('Không thể truy cập', {
        description:
          err?.response?.data?.errors ||
          'Bạn không có quyền xem danh sách này.',
      });
    }
  }, [isError, error]);

  // --- 3. KHỞI TẠO TABLE INSTANCE ---
  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  // --- UI Loading ---
  if (isLoading) {
    return (
      <div className='space-y-4 animate-pulse'>
        <div className='h-8 w-48 bg-gray-200 rounded'></div>
        <div className='border rounded-lg h-96 bg-gray-50'></div>
      </div>
    );
  }

  // --- UI Error ---
  if (isError) {
    return (
      <div className='flex flex-col items-center justify-center h-96 border-2 border-dashed border-red-200 bg-red-50/50 rounded-lg text-center p-6'>
        <div className='text-red-500 font-semibold text-lg mb-2'>
          Đã xảy ra lỗi
        </div>
        <Button variant='outline' onClick={() => window.location.reload()}>
          Tải lại trang
        </Button>
      </div>
    );
  }

  // --- UI CHÍNH ---
  return (
    <div className='space-y-6 animate-in fade-in duration-500'>
      {/* Header & Actions */}
      <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4'>
        <h1 className='text-2xl font-bold tracking-tight text-gray-900'>
          Danh sách người dùng
        </h1>
        <div className='flex items-center gap-2 w-full sm:w-auto'>
          <div className='relative flex-1 sm:w-64'>
            <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-gray-500' />
            <input
              className='pl-9 h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring'
              placeholder='Tìm kiếm...'
            />
          </div>
          <Button className='bg-blue-600 hover:bg-blue-700 text-white gap-2'>
            <Plus size={16} /> Thêm mới
          </Button>
        </div>
      </div>

      {/* Table Render bằng React Table */}
      <div className='border rounded-lg shadow-sm bg-white overflow-hidden'>
        <div className='overflow-x-auto'>
          <table className='w-full text-sm text-left'>
            <thead className='bg-gray-50 text-gray-700 border-b'>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id} className='px-6 py-4 font-medium'>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className='divide-y divide-gray-100'>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className='hover:bg-gray-50/50 transition-colors'>
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className='px-6 py-4'>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={columns.length}
                    className='text-center py-10 text-gray-500'>
                    Chưa có dữ liệu người dùng
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
