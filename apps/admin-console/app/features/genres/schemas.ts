import { z } from 'zod';

export const genreSchema = z.object({
  name: z.string().min(1, 'genre.validation.name.required'),
  description: z.string().optional(),
  isActive: z.number().int().min(0).max(1),
});

export type GenreFormValues = z.infer<typeof genreSchema>;

export const defaultGenreValues: GenreFormValues = {
  name: '',
  description: '',
  isActive: 1,
};
