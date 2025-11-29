// 📂 File: app/routes/dashboard/users/user-list.tsx
import { useQuery } from '@tanstack/react-query';
import { Plus, Search, Trash2, Edit } from 'lucide-react';
import type { Route } from './+types/user-list'; // ⚠️ Quan trọng: Để có Type chuẩn
import { queryClient } from '~/lib/query-client';
import { userQueries } from '~/queries/user.queries';
import { Button } from '~/components/ui/button';
import { cn } from '~/lib/utils';

// 👇 THÊM 2 DÒNG NÀY
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

// 1. LOADER: Prefetch data (Chạy song song khi load trang)
export async function clientLoader({ request }: Route.ClientLoaderArgs) {
  // Đảm bảo data được load vào cache trước khi render component
  // Nếu mạng nhanh, user sẽ thấy bảng ngay lập tức.
  await queryClient.ensureQueryData(userQueries.list());
  return null;
}

// 2. COMPONENT CHÍNH
export default function UsersListPage() {
  // Sử dụng options
  const {
    data: response,
    isLoading,
    isError,
    error,
  } = useQuery(userQueries.list());

  const users = response?.data || [];
  console.log('Checking res users == ', users);

  // --- UI KHI ĐANG LOADING ---
  if (isLoading) {
    return (
      <div className='space-y-4 animate-pulse'>
        <div className='h-8 w-48 bg-gray-200 rounded'></div>
        <div className='h-64 w-full bg-gray-100 rounded-md'></div>
      </div>
    );
  }

  // --- UI KHI CÓ LỖI ---
  if (isError) {
    return (
      <div className='p-4 border border-red-200 bg-red-50 text-red-600 rounded-md'>
        Lỗi tải dữ liệu: {error.message}
      </div>
    );
  }

  // --- UI CHÍNH (TABLE) ---
  return (
    <div className='space-y-6'>
      {/* Header: Title & Actions */}
      <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4'>
        <div>
          <h1 className='text-2xl font-bold tracking-tight text-gray-900'>
            Người dùng
          </h1>
          <p className='text-sm text-gray-500'>
            Quản lý danh sách tài khoản hệ thống ({users?.length || 0})
          </p>
        </div>
        <Button className='gap-2 shadow-sm bg-slate-900 text-white hover:bg-slate-800'>
          <Plus size={16} /> Thêm mới
        </Button>
      </div>

      {/* Filter Bar (Giả lập) */}
      <div className='flex items-center gap-2'>
        <div className='relative flex-1 max-w-sm'>
          <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-gray-500' />
          <input
            type='text'
            placeholder='Tìm kiếm theo email, tên...'
            className='w-full pl-9 pr-4 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-slate-900'
          />
        </div>
      </div>

      {/* Table Container */}
      <div className='border rounded-lg shadow-sm bg-white overflow-hidden'>
        <div className='overflow-x-auto'>
          <table className='w-full text-sm text-left'>
            <thead className='bg-gray-50 text-gray-700 border-b'>
              <tr>
                <th className='px-6 py-4 font-medium'>Người dùng</th>
                <th className='px-6 py-4 font-medium'>Ngày tạo</th>
                <th className='px-6 py-4 font-medium text-right'>Hành động</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-100'>
              {users?.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className='px-6 py-8 text-center text-gray-500'>
                    Chưa có dữ liệu nào.
                  </td>
                </tr>
              ) : (
                users?.map((user) => (
                  <tr
                    key={user._id}
                    className='hover:bg-gray-50/50 transition-colors'>
                    {/* Cột 1: Avatar + Name + Email */}
                    <td className='px-6 py-4'>
                      <div className='flex items-center gap-3'>
                        <div className='h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold overflow-hidden border'>
                          {user.picture ? (
                            <img
                              src={user.picture}
                              alt={`${user.firstName} + ${user.lastName}`}
                              className='h-full w-full object-cover'
                            />
                          ) : (
                            user.firstName.charAt(0).toUpperCase()
                          )}
                        </div>
                        <div>
                          <div className='font-medium text-gray-900'>
                            {`${user.firstName} + ${user.lastName}`}
                          </div>
                          <div className='text-xs text-gray-500'>
                            {user?.email}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Cột 4: Ngày tạo */}
                    <td className='px-6 py-4 text-gray-500'>
                      {/* Cũ: new Date(user.createdAt).toLocaleDateString('vi-VN') */}

                      {/* Mới: Dùng date-fns */}
                      {user.createdAt
                        ? format(new Date(user.createdAt), 'dd/MM/yyyy', {
                            locale: vi,
                          })
                        : 'N/A'}
                    </td>

                    {/* Cột 5: Actions */}
                    <td className='px-6 py-4 text-right'>
                      <div className='flex justify-end gap-2'>
                        <Button
                          variant='ghost'
                          size='icon'
                          className='h-8 w-8 text-gray-500 hover:text-blue-600'>
                          <Edit size={16} />
                        </Button>
                        <Button
                          variant='ghost'
                          size='icon'
                          className='h-8 w-8 text-gray-500 hover:text-red-600'>
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
