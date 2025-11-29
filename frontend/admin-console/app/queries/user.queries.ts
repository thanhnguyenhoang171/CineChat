// 📂 File: app/queries/user.queries.ts
import { queryOptions } from '@tanstack/react-query';
import { userService } from '~/services/user.service';

// 1. Query Key Factory (Quan trọng)
// Giúp quản lý key tập trung, tránh việc gõ nhầm ['users'] ở nhiều nơi
export const userKeys = {
  // 1. Gốc của cây (Root)
  // Kết quả: ['users']
  all: ['users'] as const,

  // 2. Nhánh danh sách (Scope: List)
  // Nó lấy gốc 'all' nối thêm chữ 'list'
  // Kết quả: ['users', 'list']
  lists: () => [...userKeys.all, 'list'] as const,

  // 3. Chiếc lá danh sách cụ thể (Specific List)
  // Nó lấy nhánh 'lists' nối thêm bộ lọc (filter/page/sort)
  // Kết quả: ['users', 'list', { page: 1, search: 'abc' }]
  list: (filters: string) => [...userKeys.lists(), { filters }] as const,

  // 4. Nhánh chi tiết (Scope: Detail)
  // Kết quả: ['users', 'detail']
  details: () => [...userKeys.all, 'detail'] as const,

  // 5. Chiếc lá chi tiết cụ thể (Specific Item)
  // Kết quả: ['users', 'detail', '123']
  detail: (id: string) => [...userKeys.details(), id] as const,
};

// 2. Query Options
export const userQueries = {
  // Option để lấy danh sách
  list: () =>
    queryOptions({
      queryKey: userKeys.lists(), // Key: ['users', 'list']
      queryFn: userService.getAll,
    }),

  //   // Option để lấy chi tiết 1 user
  //   detail: (id: string) =>
  //     queryOptions({
  //       queryKey: userKeys.detail(id), // Key: ['users', 'detail', '123']
  //       queryFn: () => userService.getById(id),
  //       enabled: !!id, // Chỉ fetch khi có id
  //     }),
};
