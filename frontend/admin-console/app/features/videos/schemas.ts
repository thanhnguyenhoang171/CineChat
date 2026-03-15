import { z } from 'zod';

export const videoSchema = z.object({
  movieId: z.string().min(1, 'video.validation.movieId.required'),
  name: z.string().min(1, 'video.validation.name.required'),
  key: z.string().min(1, 'video.validation.key.required'),
  site: z.enum(['YouTube', 'Vimeo', 'Other']),
  size: z.number().int().min(360).max(4320),
  type: z.enum(['Trailer', 'Teaser', 'Clip', 'Featurette', 'Behind the Scenes', 'Bloopers']),
  official: z.boolean(),
  isActive: z.number().int().min(0).max(1),
});

export type VideoFormValues = z.infer<typeof videoSchema>;

export const defaultVideoValues: VideoFormValues = {
  movieId: '',
  name: '',
  key: '',
  site: 'YouTube',
  size: 1080,
  type: 'Trailer',
  official: true,
  isActive: 1,
};
