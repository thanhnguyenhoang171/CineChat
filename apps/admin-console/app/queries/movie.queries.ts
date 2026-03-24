import { keepPreviousData, queryOptions } from '@tanstack/react-query';
import { movieService } from '~/services/movie.service';

export const movieKeys = {
  all: ['movies'] as const,
  lists: () => [...movieKeys.all, 'list'] as const,
  list: (
    page: number,
    limit: number,
    search: string,
    status?: string,
    genreId?: string,
    isActive?: string,
  ) =>
    [
      ...movieKeys.lists(),
      { page, limit, search, status, genreId, isActive },
    ] as const,
};

export const movieQueries = {
  list: (
    page: number = 1,
    limit: number = 10,
    search: string = '',
    status: string = 'all',
    genreId: string = 'all',
    isActive: string = 'all',
  ) =>
    queryOptions({
      queryKey: movieKeys.list(
        page,
        limit,
        search,
        status,
        genreId,
        isActive,
      ),
      queryFn: () =>
        movieService.getAllMoviesWithPagination({
          page,
          limit,
          search,
          status,
          genreId,
          isActive,
        }),
      placeholderData: keepPreviousData,
    }),
};
