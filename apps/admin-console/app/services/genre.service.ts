import type { Genre, GenreWithPagination, CreateGenreDto, UpdateGenreDto } from '~/types/module-types/genre';

const MOCK_GENRES: Genre[] = [
  { _id: 'g1', name: 'Action', description: 'Action movies often involve high-energy, physical stunts and chases.', isActive: 1, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { _id: 'g2', name: 'Comedy', description: 'Comedy movies are designed to make the audience laugh.', isActive: 1, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { _id: 'g3', name: 'Drama', description: 'Drama movies focus on realistic characters and emotional themes.', isActive: 1, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { _id: 'g4', name: 'Horror', description: 'Horror movies aim to evoke fear and dread in the audience.', isActive: 1, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { _id: 'g5', name: 'Sci-Fi', description: 'Science Fiction movies often explore futuristic technology and space travel.', isActive: 1, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { _id: 'g6', name: 'Romance', description: 'Romance movies focus on romantic love and relationships.', isActive: 1, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { _id: 'g7', name: 'Thriller', description: 'Thriller movies are designed to keep the audience on the edge of their seats.', isActive: 1, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { _id: 'g8', name: 'Animation', description: 'Animated movies use computer-generated or hand-drawn images.', isActive: 1, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
];

export const genreService = {
  getAllGenresWithPagination: async ({ page, limit, search, isActive }: any): Promise<GenreWithPagination> => {
    await new Promise(resolve => setTimeout(resolve, 500));

    let filtered = [...MOCK_GENRES];
    if (search) filtered = filtered.filter(g => g.name.toLowerCase().includes(search.toLowerCase()));
    if (isActive !== undefined && isActive !== 'all') filtered = filtered.filter(g => g.isActive === Number(isActive));

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

  createGenre: async (payload: CreateGenreDto) => {
    console.log('Fake Create Genre:', payload);
    return { status: 201, message: 'Success', data: { ...payload, _id: Math.random().toString() } };
  },

  updateGenre: async (id: string, payload: UpdateGenreDto) => {
    console.log('Fake Update Genre:', id, payload);
    return { status: 200, message: 'Success', data: payload };
  },

  deleteGenre: async (id: string) => {
    console.log('Fake Delete Genre:', id);
    return { status: 200, message: 'Success', data: null };
  },
};
