import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Plus, Search, Trash2, Edit } from 'lucide-react';
import type { Route } from './+types/user-list';
import { queryClient } from '~/lib/query-client';
import { userQueries } from '~/queries/user.queries';
import { Button } from '~/components/ui/button';
import { useBoundStore } from '~/store'; // 👈 1. Import Store
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { toast } from 'sonner';
import type { AxiosError } from 'axios';
import { protectedLoader } from '~/utils/loader-utils';

// 1. LOADER: Prefetch data --> Chỉ Prefetch khi ĐÃ CÓ TOKEN
export async function clientLoader({ request }: Route.ClientLoaderArgs) {
  return protectedLoader(async () => {
    await queryClient.prefetchQuery(userQueries.list());
  });
}

export default function UsersListPage() {
  const {
    data: response,
    isLoading,
    isError,
    error,
  } = useQuery({
    ...userQueries.list(), // Spread option từ file queries
  });

  const users = response?.data || [];

  // 4. EFFECT: Hiện Toast khi lỗi (như bạn yêu cầu)
  useEffect(() => {
    if (isError) {
      const err = error as AxiosError<any>;
      console.log('Checking error = ', error);

      toast.error('Không thể truy cập', {
        description:
          err?.response?.data?.errors ||
          'Bạn không có quyền xem danh sách này hoặc phiên làm việc đã hết hạn.',
      });
    }
  }, [isError, error]);

  // --- UI KHI ĐANG LOADING ---
  if (isLoading) {
    return (
      <div className='space-y-4 animate-pulse'>
        <div className='h-8 w-48 bg-gray-200 rounded'></div>
        <div className='border rounded-lg h-96 bg-gray-50'></div>
      </div>
    );
  }

  // --- UI KHI CÓ LỖI (Fallback) ---
  if (isError) {
    return (
      <div className='flex flex-col items-center justify-center h-96 border-2 border-dashed border-red-200 bg-red-50/50 rounded-lg text-center p-6'>
        <div className='text-red-500 font-semibold text-lg mb-2'>
          Đã xảy ra lỗi
        </div>
        <p className='text-gray-600 max-w-md mb-4'>
          {(error as any)?.response?.data?.errors ||
            'Hệ thống không thể tải danh sách người dùng.'}
        </p>
        <Button variant='outline' onClick={() => window.location.reload()}>
          Tải lại trang
        </Button>
      </div>
    );
  }

  // --- UI CHÍNH (TABLE) ---
  return (
    <div className='space-y-6 animate-in fade-in duration-500'>
      {/* Header & Actions */}
      <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4'>
        <h1 className='text-2xl font-bold tracking-tight text-gray-900'>
          Danh sách người dùng
        </h1>
        <div className='flex items-center gap-2 w-full sm:w-auto'>
          {/* Giả lập thanh Search */}
          <div className='relative flex-1 sm:w-64'>
            <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-gray-500' />
            <input
              className='pl-9 h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring'
              placeholder='Tìm kiếm...'
            />
          </div>
          <Button className='bg-blue-600 hover:bg-blue-700 text-white gap-2'>
            <Plus size={16} /> Thêm mới
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className='border rounded-lg shadow-sm bg-white overflow-hidden'>
        <div className='overflow-x-auto'>
          <table className='w-full text-sm text-left'>
            <thead className='bg-gray-50 text-gray-700 border-b'>
              <tr>
                <th className='px-6 py-4 font-medium'>Người dùng</th>
                <th className='px-6 py-4 font-medium'>Vai trò</th>
                <th className='px-6 py-4 font-medium'>Ngày tạo</th>
                <th className='px-6 py-4 font-medium text-right'>Hành động</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-100'>
              {users.length === 0 ? (
                <tr>
                  <td colSpan={4} className='text-center py-10 text-gray-500'>
                    Chưa có dữ liệu người dùng
                  </td>
                </tr>
              ) : (
                users.map((user: any) => (
                  <tr
                    key={user._id}
                    className='hover:bg-gray-50/50 transition-colors'>
                    {/* Avatar & Name */}
                    <td className='px-6 py-4'>
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
                          <div className='text-xs text-gray-500'>
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Role */}
                    <td className='px-6 py-4'>
                      <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800'>
                        {user.role?.name || 'USER'}
                      </span>
                    </td>

                    {/* Date */}
                    <td className='px-6 py-4 text-gray-500'>
                      {user.createdAt
                        ? format(new Date(user.createdAt), 'dd/MM/yyyy', {
                            locale: vi,
                          })
                        : 'N/A'}
                    </td>

                    {/* Actions */}
                    <td className='px-6 py-4 text-right'>
                      <div className='flex justify-end gap-2'>
                        <Button
                          variant='ghost'
                          size='icon'
                          className='text-gray-500 hover:text-blue-600'>
                          <Edit size={16} />
                        </Button>
                        <Button
                          variant='ghost'
                          size='icon'
                          className='text-gray-500 hover:text-red-600'>
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
