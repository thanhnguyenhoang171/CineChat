import { keepPreviousData, queryOptions } from '@tanstack/react-query';
import { castService } from '~/services/cast.service';

export const castKeys = {
  all: ['casts'] as const,
  lists: () => [...castKeys.all, 'list'] as const,
  list: (
    page: number,
    limit: number,
    search: string,
    role?: string,
    isActive?: string,
  ) =>
    [
      ...castKeys.lists(),
      { page, limit, search, role, isActive },
    ] as const,
};

export const castQueries = {
  list: (
    page: number = 1,
    limit: number = 10,
    search: string = '',
    role: string = 'all',
    isActive: string = 'all',
  ) =>
    queryOptions({
      queryKey: castKeys.list(
        page,
        limit,
        search,
        role,
        isActive,
      ),
      queryFn: () =>
        castService.getAllCastsWithPagination({
          page,
          limit,
          search,
          role,
          isActive,
        }),
      placeholderData: keepPreviousData,
    }),
};
