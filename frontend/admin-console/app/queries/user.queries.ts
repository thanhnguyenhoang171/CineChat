import { keepPreviousData, queryOptions } from '@tanstack/react-query';
import { userService } from '~/services/user.service';

export const userKeys = {
  all: ['users'] as const,
  lists: () => [...userKeys.all, 'list'] as const,
  list: (
    page: number,
    limit: number,
    sortBy: string,
    sortDir: string,
    search: string,
    projections: string,
    isActive?: string,
    roleId?: string,
  ) =>
    [
      ...userKeys.lists(),
      { page, limit, sortBy, sortDir, search, projections, isActive, roleId },
    ] as const,
};

export const userQueries = {
  list: (
    page: number = 1,
    limit: number = 10,
    sortBy: string = 'createdAt',
    sortDir: 'asc' | 'desc' = 'desc',
    search: string = '',
    projections: string = '',
    isActive: string = 'all',
    roleId: string = 'all',
  ) =>
    queryOptions({
      queryKey: userKeys.list(
        page,
        limit,
        sortBy,
        sortDir,
        search,
        projections,
        isActive,
        roleId,
      ),
      queryFn: () =>
        userService.getAllUsersWithPagination({
          page,
          limit,
          sortBy,
          sortDir,
          search,
          projections,
          isActive,
          roleId,
        }),
      placeholderData: keepPreviousData,
    }),
};
