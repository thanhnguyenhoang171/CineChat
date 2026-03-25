import type { Movie, MovieWithPagination, CreateMovieDto, UpdateMovieDto } from '@cinechat/types';

const MOCK_MOVIES: Movie[] = [
  {
    _id: 'm1',
    title: 'Spider-Man: No Way Home',
    originalTitle: 'Spider-Man: No Way Home',
    overview: 'Peter Parker is unmasked and no longer able to separate his normal life from the high-stakes of being a super-hero.',
    tagline: 'The Multiverse unleashed.',
    releaseDate: '2021-12-17',
    runtime: 148,
    status: 'Released',
    posterPath: 'https://image.tmdb.org/t/p/w500/1g0mXp91Y9TjUe7SfsKVpMWZ5bz.jpg',
    backdropPath: 'https://image.tmdb.org/t/p/original/iQFcwAIWkhBsCUO7p3ST0qBMT8n.jpg',
    genres: [{ _id: 'g1', name: 'Action', isActive: 1, createdAt: '', updatedAt: '' }],
    casts: [],
    popularity: 95.5,
    voteAverage: 8.4,
    voteCount: 15000,
    isActive: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: 'm2',
    title: 'Interstellar',
    originalTitle: 'Interstellar',
    overview: 'The adventures of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel.',
    tagline: 'Mankind was born on Earth. It was never meant to die here.',
    releaseDate: '2014-11-07',
    runtime: 169,
    status: 'Released',
    posterPath: 'https://image.tmdb.org/t/p/w500/gEU2QniE6EwfVnz6n2p2oCLdjXQ.jpg',
    backdropPath: 'https://image.tmdb.org/t/p/original/rAiY_pUm6vCzonePm4pXGcy0v9C.jpg',
    genres: [{ _id: 'g5', name: 'Sci-Fi', isActive: 1, createdAt: '', updatedAt: '' }],
    casts: [],
    popularity: 88.2,
    voteAverage: 8.6,
    voteCount: 22000,
    isActive: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const movieService = {
  getAllMoviesWithPagination: async ({ page, limit, search, status, genreId, isActive }: any): Promise<MovieWithPagination> => {
    await new Promise(resolve => setTimeout(resolve, 500));

    let filtered = [...MOCK_MOVIES];
    if (search) filtered = filtered.filter(m => m.title.toLowerCase().includes(search.toLowerCase()));
    if (status && status !== 'all') filtered = filtered.filter(m => m.status === status);
    if (genreId && genreId !== 'all') filtered = filtered.filter(m => m.genres.some(g => g._id === genreId));
    if (isActive !== undefined && isActive !== 'all') filtered = filtered.filter(m => m.isActive === Number(isActive));

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

  createMovie: async (payload: CreateMovieDto) => {
    console.log('Fake Create Movie:', payload);
    return { status: 201, message: 'Success', data: { ...payload, _id: Math.random().toString() } };
  },

  updateMovie: async (id: string, payload: UpdateMovieDto) => {
    console.log('Fake Update Movie:', id, payload);
    return { status: 200, message: 'Success', data: payload };
  },

  deleteMovie: async (id: string) => {
    console.log('Fake Delete Movie:', id);
    return { status: 200, message: 'Success', data: null };
  },
};

