import type { Video, VideoWithPagination } from '~/types/module-types/video';

const now = new Date().toISOString();

const MOCK_VIDEOS: Video[] = [
  {
    _id: 'vid_1',
    name: 'Official Trailer',
    key: 'hXzcyx9V0xw',
    site: 'YouTube',
    size: 1080,
    type: 'Trailer',
    official: true,
    publishedAt: now,
    movieId: 'mov_1',
    isActive: 1,
    createdAt: now,
    updatedAt: now,
  },
  {
    _id: 'vid_2',
    name: 'Teaser 1',
    key: 'e1k5g2b4t5',
    site: 'Vimeo',
    size: 720,
    type: 'Teaser',
    official: false,
    publishedAt: now,
    movieId: 'mov_1',
    isActive: 1,
    createdAt: now,
    updatedAt: now,
  },
  {
    _id: 'vid_3',
    name: 'Behind the Scenes: Stunts',
    key: 'f6g7h8i9j0',
    site: 'YouTube',
    size: 1080,
    type: 'Behind the Scenes',
    official: true,
    publishedAt: now,
    movieId: 'mov_2',
    isActive: 0,
    createdAt: now,
    updatedAt: now,
  },
  {
    _id: 'vid_4',
    name: 'Bloopers Reel',
    key: 'k1l2m3n4b5',
    site: 'YouTube',
    size: 480,
    type: 'Bloopers',
    official: false,
    publishedAt: now,
    movieId: 'mov_3',
    isActive: 1,
    createdAt: now,
    updatedAt: now,
  },
  {
    _id: 'vid_5',
    name: 'Main Theme Featurette',
    key: 'c5d6e7f8g9',
    site: 'YouTube',
    size: 1080,
    type: 'Featurette',
    official: true,
    publishedAt: now,
    movieId: 'mov_4',
    isActive: 1,
    createdAt: now,
    updatedAt: now,
  },
];

const videoTypes = [
  'Trailer',
  'Teaser',
  'Clip',
  'Featurette',
  'Behind the Scenes',
  'Bloopers',
] as const;

export interface CreateVideoDto {
  name: string;
  key: string;
  site: 'YouTube' | 'Vimeo' | 'Other';
  size: number;
  type: (typeof videoTypes)[number];
  official: boolean;
  movieId: string;
  isActive: number;
}

export const videoService = {
  getAllVideosWithPagination: async ({
    page,
    limit,
    search,
    movieId,
    type,
    isActive,
  }: any): Promise<VideoWithPagination> => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    let filtered = [...MOCK_VIDEOS];
    if (search)
      filtered = filtered.filter((v) =>
        v.name.toLowerCase().includes(search.toLowerCase()),
      );
    if (movieId && movieId !== 'all')
      filtered = filtered.filter((v) => v.movieId === movieId);
    if (type && type !== 'all')
      filtered = filtered.filter((v) => v.type === type);
    if (isActive !== undefined && isActive !== 'all')
      filtered = filtered.filter((v) => v.isActive === Number(isActive));

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
      },
    };
  },

  createVideo: async (payload: CreateVideoDto) => {
    console.log('Fake Create Video:', payload);
    const now = new Date().toISOString();
    const newVideo: Video = {
      ...payload,
      _id: `vid_${Math.random()}`,
      publishedAt: now,
      createdAt: now,
      updatedAt: now,
    };
    MOCK_VIDEOS.unshift(newVideo);
    return { status: 201, message: 'Success', data: newVideo };
  },

  updateVideo: async (id: string, payload: Partial<CreateVideoDto>) => {
    console.log('Fake Update Video:', id, payload);
    const index = MOCK_VIDEOS.findIndex((v) => v._id === id);
    if (index > -1) {
      MOCK_VIDEOS[index] = {
        ...MOCK_VIDEOS[index],
        ...payload,
        updatedAt: new Date().toISOString(),
      };
      return { status: 200, message: 'Success', data: MOCK_VIDEOS[index] };
    }
    return { status: 404, message: 'Video not found', data: null };
  },

  deleteVideo: async (id: string) => {
    console.log('Fake Delete Video:', id);
    const index = MOCK_VIDEOS.findIndex((v) => v._id === id);
    if (index > -1) {
      MOCK_VIDEOS.splice(index, 1);
      return { status: 200, message: 'Success', data: null };
    }
    return { status: 404, message: 'Video not found', data: null };
  },
};
