import { z } from 'zod';

export const movieSchema = z.object({
  title: z.string().min(1, 'movie.validation.title.required'),
  originalTitle: z.string().optional(),
  overview: z.string().optional(),
  tagline: z.string().optional(),
  releaseDate: z.string().optional(),
  runtime: z.number().int().min(0).optional().or(z.literal(0)),
  status: z.enum(['Rumored', 'Planned', 'In Production', 'Post Production', 'Released', 'Canceled']),
  posterPath: z.string().optional(),
  backdropPath: z.string().optional(),
  genreIds: z.array(z.string()).min(1, 'movie.validation.genres.required'),
  isActive: z.number().int().min(0).max(1),
});

export type MovieFormValues = z.infer<typeof movieSchema>;

export const defaultMovieValues: MovieFormValues = {
  title: '',
  originalTitle: '',
  overview: '',
  tagline: '',
  releaseDate: '',
  runtime: 0,
  status: 'Released',
  posterPath: '',
  backdropPath: '',
  genreIds: [],
  isActive: 1,
};
