import { queryOptions } from '@tanstack/react-query';
import { userService } from '~/services/user.service';


export const userKeys = {
  // Root key (Scope: All)
  all: ['users'] as const,

  //  branch list (Scope: List) - ['users', 'list']
  lists: () => [...userKeys.all, 'list'] as const,

  //  Specific [Branch] with filters (Specific List)
  // Result: ['users', 'list', { filters: 'role=admin' }]
  list: (filters: string) => [...userKeys.lists(), { filters }] as const,

  details: () => [...userKeys.all, 'detail'] as const,

  detail: (id: string) => [...userKeys.details(), id] as const,
};

export const userQueries = {
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
