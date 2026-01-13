import { keepPreviousData, queryOptions } from '@tanstack/react-query';
import { permissionService } from '~/services/permission.service';

export const permissionKeys = {
  // Root key (Scope: All)
  all: ['permissions'] as const,

  //  branch list (Scope: List) - ['users', 'list']
  lists: () => [...permissionKeys.all, 'list'] as const,

  //  Specific [Branch] with filters (Specific List)
  // Result: ['users', 'list', { filters: 'role=admin' }]
  // Key bao gồm cả page và limit để cache riêng từng trang
  list: (
    page: number,
    limit: number,
    sortBy: string,
    sortDir: string,
    search: string,
  ) =>
    [
      ...permissionKeys.lists(),
      { page, limit, sortBy, sortDir, search },
    ] as const,

  details: () => [...permissionKeys.all, 'detail'] as const,

  detail: (id: string) => [...permissionKeys.details(), id] as const,
};

export const permissionQueries = {
  // Nhận page và limit (có giá trị mặc định)
  list: (
    page: number = 1,
    limit: number = 10,
    sortBy: string = 'createdAt',
    sortDir: 'asc' | 'desc' = 'desc',
    search: string = '',
  ) =>
    queryOptions({
      queryKey: permissionKeys.list(page, limit, sortBy, sortDir, search),
      queryFn: () =>
        permissionService.getAllPermissionWithPagination({
          page,
          limit,
          sortBy,
          sortDir,
          search,
        }),
      // Giữ lại data cũ trong khi đang fetch trang mới (tránh giật màn hình)
      placeholderData: keepPreviousData,
    }),
};

//   // Option để lấy chi tiết 1 user
//   detail: (id: string) =>
//     queryOptions({
//       queryKey: userKeys.detail(id), // Key: ['users', 'detail', '123']
//       queryFn: () => userService.getById(id),
//       enabled: !!id, // Chỉ fetch khi có id
//     }),
