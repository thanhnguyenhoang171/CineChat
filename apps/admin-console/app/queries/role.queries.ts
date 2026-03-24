import { keepPreviousData, queryOptions } from '@tanstack/react-query';
import { roleService } from '~/services/role.service';

export const roleKeys = {
  all: ['roles'] as const,
  lists: () => [...roleKeys.all, 'list'] as const,
  list: (
    page: number,
    limit: number,
    sortBy: string,
    sortDir: string,
    search: string,
    projections: string,
    isActive?: string,
  ) =>
    [
      ...roleKeys.lists(),
      { page, limit, sortBy, sortDir, search, projections, isActive },
    ] as const,
};

export const roleQueries = {
  list: (
    page: number = 1,
    limit: number = 10,
    sortBy: string = 'createdAt',
    sortDir: 'asc' | 'desc' = 'desc',
    search: string = '',
    projections: string = '',
    isActive: string = 'all',
  ) =>
    queryOptions({
      queryKey: roleKeys.list(
        page,
        limit,
        sortBy,
        sortDir,
        search,
        projections,
        isActive,
      ),
      queryFn: () =>
        roleService.getAllRolesWithPagination({
          page,
          limit,
          sortBy,
          sortDir,
          search,
          projections,
          isActive,
        }),
      placeholderData: keepPreviousData,
    }),
};
