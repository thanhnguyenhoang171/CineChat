import { keepPreviousData, queryOptions } from '@tanstack/react-query';
import { genreService } from '~/services/genre.service';

export const genreKeys = {
  all: ['genres'] as const,
  lists: () => [...genreKeys.all, 'list'] as const,
  list: (
    page: number,
    limit: number,
    search: string,
    isActive?: string,
  ) =>
    [
      ...genreKeys.lists(),
      { page, limit, search, isActive },
    ] as const,
};

export const genreQueries = {
  list: (
    page: number = 1,
    limit: number = 10,
    search: string = '',
    isActive: string = 'all',
  ) =>
    queryOptions({
      queryKey: genreKeys.list(
        page,
        limit,
        search,
        isActive,
      ),
      queryFn: () =>
        genreService.getAllGenresWithPagination({
          page,
          limit,
          search,
          isActive,
        }),
      placeholderData: keepPreviousData,
    }),
};
