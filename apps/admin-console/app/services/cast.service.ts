import type { Cast, CastWithPagination, CreateCastDto } from '@cinechat/types';

const MOCK_CASTS: Cast[] = [
  { _id: 'c1', name: 'Tom Holland', biography: 'Thomas Stanley Holland is an English actor.', birthday: '1996-06-01', gender: 2, placeOfBirth: 'London, England', popularity: 85.5, profilePath: 'https://image.tmdb.org/t/p/w500/bppwsIl97Y99uSww79uXOf7y7sJ.jpg', role: 'ACTOR', isActive: 1, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { _id: 'c2', name: 'Zendaya', biography: 'Zendaya Maree Stoermer Coleman is an American actress and singer.', birthday: '1996-09-01', gender: 1, placeOfBirth: 'Oakland, California, USA', popularity: 92.3, profilePath: 'https://image.tmdb.org/t/p/w500/62uS18m68beS99E6Y9vXpP0io8Z.jpg', role: 'ACTOR', isActive: 1, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { _id: 'c3', name: 'Christopher Nolan', biography: 'Christopher Edward Nolan is a British-American film director.', birthday: '1970-07-30', gender: 2, placeOfBirth: 'Westminster, London, England', popularity: 45.2, profilePath: 'https://image.tmdb.org/t/p/w500/v999PeTYv9v0beZ96v9v0v0v0v0.jpg', role: 'DIRECTOR', isActive: 1, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { _id: 'c4', name: 'Scarlett Johansson', biography: 'Scarlett Ingrid Johansson is an American actress.', birthday: '1984-11-22', gender: 1, placeOfBirth: 'Manhattan, New York City, USA', popularity: 88.7, profilePath: 'https://image.tmdb.org/t/p/w500/69SnsZpsv668vSzoCDvGl6IDZTP.jpg', role: 'ACTOR', isActive: 1, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { _id: 'c5', name: 'Cillian Murphy', biography: 'Cillian Murphy is an Irish actor.', birthday: '1976-05-25', gender: 2, placeOfBirth: 'Douglas, County Cork, Ireland', popularity: 75.4, profilePath: 'https://image.tmdb.org/t/p/w500/llS9S9S9S9S9S9S9S9S9S9S9S9S.jpg', role: 'ACTOR', isActive: 1, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
];

export const castService = {
  getAllCastsWithPagination: async ({ page, limit, search, role, isActive }: any) => {
    await new Promise(resolve => setTimeout(resolve, 500));

    let filtered = [...MOCK_CASTS];
    if (search) filtered = filtered.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));
    if (role && role !== 'all') filtered = filtered.filter(c => c.role === role);
    if (isActive !== undefined && isActive !== 'all') filtered = filtered.filter(c => c.isActive === Number(isActive));

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

  createCast: async (payload: CreateCastDto) => {
    console.log('Fake Create Cast:', payload);
    return { status: 201, message: 'Success', data: { ...payload, _id: Math.random().toString() } };
  },

  updateCast: async (id: string, payload: Partial<CreateCastDto>) => {
    console.log('Fake Update Cast:', id, payload);
    return { status: 200, message: 'Success', data: payload };
  },

  deleteCast: async (id: string) => {
    console.log('Fake Delete Cast:', id);
    return { status: 200, message: 'Success', data: null };
  },
};

