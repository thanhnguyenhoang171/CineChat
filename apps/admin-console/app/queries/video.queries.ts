import { keepPreviousData, queryOptions } from '@tanstack/react-query';
import { videoService } from '~/services/video.service';

export const videoKeys = {
  all: ['videos'] as const,
  lists: () => [...videoKeys.all, 'list'] as const,
  list: (
    page: number,
    limit: number,
    search: string,
    movieId?: string,
    type?: string,
    isActive?: string,
  ) =>
    [
      ...videoKeys.lists(),
      { page, limit, search, movieId, type, isActive },
    ] as const,
};

export const videoQueries = {
  list: (
    page: number = 1,
    limit: number = 10,
    search: string = '',
    movieId: string = 'all',
    type: string = 'all',
    isActive: string = 'all',
  ) =>
    queryOptions({
      queryKey: videoKeys.list(
        page,
        limit,
        search,
        movieId,
        type,
        isActive,
      ),
      queryFn: () =>
        videoService.getAllVideosWithPagination({
          page,
          limit,
          search,
          movieId,
          type,
          isActive,
        }),
      placeholderData: keepPreviousData,
    }),
};
