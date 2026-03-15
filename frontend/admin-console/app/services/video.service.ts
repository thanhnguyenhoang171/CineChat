import type { Video, VideoWithPagination, CreateVideoDto, UpdateVideoDto } from '~/types/module-types/video';

const MOCK_VIDEOS: Video[] = [
  {
    _id: 'v1',
    movieId: 'm1',
    name: 'Official Trailer',
    key: 'JfVOs4VSpmA',
    site: 'YouTube',
    size: 1080,
    type: 'Trailer',
    official: true,
    publishedAt: new Date().toISOString(),
    isActive: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: 'v2',
    movieId: 'm2',
    name: 'Teaser Trailer',
    key: 'zSWdZVtXT7E',
    site: 'YouTube',
    size: 1080,
    type: 'Teaser',
    official: true,
    publishedAt: new Date().toISOString(),
    isActive: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const videoService = {
  getAllVideosWithPagination: async ({ page, limit, search, movieId, type, isActive }: any): Promise<VideoWithPagination> => {
    await new Promise(resolve => setTimeout(resolve, 500));

    let filtered = [...MOCK_VIDEOS];
    if (search) filtered = filtered.filter(v => v.name.toLowerCase().includes(search.toLowerCase()));
    if (movieId && movieId !== 'all') filtered = filtered.filter(v => v.movieId === movieId);
    if (type && type !== 'all') filtered = filtered.filter(v => v.type === type);
    if (isActive !== undefined && isActive !== 'all') filtered = filtered.filter(v => v.isActive === Number(isActive));

    const total = filtered.length;
    const start = (page - 1) * limit;
    const data = filtered.slice(start, start + limit);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      }
    };
  },

  createVideo: async (payload: CreateVideoDto) => {
    console.log('Fake Create Video:', payload);
    return { status: 201, message: 'Success', data: { ...payload, _id: Math.random().toString() } };
  },

  updateVideo: async (id: string, payload: UpdateVideoDto) => {
    console.log('Fake Update Video:', id, payload);
    return { status: 200, message: 'Success', data: payload };
  },

  deleteVideo: async (id: string) => {
    console.log('Fake Delete Video:', id);
    return { status: 200, message: 'Success', data: null };
  },
};
