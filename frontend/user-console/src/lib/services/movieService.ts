import { Movie } from '@/types';

const MOCK_MOVIES: Movie[] = [
  {
    id: 101,
    title: 'Inception',
    description: 'Kẻ trộm xâm nhập vào giấc mơ của người khác để đánh cắp bí mật.',
    image: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=800&auto=format&fit=crop',
    rating: 8.8,
    matchScore: 98,
    year: 2010,
    duration: '2h 28m',
    quality: '4K',
    type: 'premium',
    genres: ['Hành động', 'Viễn tưởng'],
  },
  {
    id: 102,
    title: 'Stranger Things',
    description: 'Một nhóm bạn trẻ đối mặt với những hiện tượng siêu nhiên tại thị trấn Hawkins.',
    image: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=800&auto=format&fit=crop',
    rating: 8.7,
    matchScore: 95,
    year: 2016,
    duration: '45m',
    quality: '4K',
    type: 'free',
    genres: ['Kinh dị', 'Viễn tưởng'],
    isSeries: true,
    seasons: [
      {
        seasonNumber: 1,
        episodes: [
          { id: 'e1', title: 'Chapter One: The Vanishing of Will Byers', thumbnail: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=400', duration: '48m', description: 'Will Byers mất tích một cách bí ẩn.' },
          { id: 'e2', title: 'Chapter Two: The Weirdo on Maple Street', thumbnail: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=400', duration: '55m', description: 'Mike giấu Eleven trong tầng hầm.' },
        ]
      }
    ]
  },
  // ... Thêm các phim khác tương tự
];

export const movieService = {
  getHeroMovies: async (): Promise<Movie[]> => {
    return [MOCK_MOVIES[0]];
  },
  getMoviesByCategory: async (category: string): Promise<Movie[]> => {
    return MOCK_MOVIES;
  },
  getMovieById: async (id: string | number): Promise<Movie | undefined> => {
    return MOCK_MOVIES.find(m => m.id.toString() === id.toString());
  }
};
