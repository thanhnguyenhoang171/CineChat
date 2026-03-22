import { z } from 'zod';

const videoTypes = [
  'Trailer',
  'Teaser',
  'Clip',
  'Featurette',
  'Behind the Scenes',
  'Bloopers',
] as const;

export const videoSchema = z.object({
  name: z.string().min(1, { message: 'Vui lòng nhập tên video' }),
  movieId: z.string().min(1, { message: 'Vui lòng chọn phim' }),
  key: z.string().min(1, { message: 'Vui lòng nhập YouTube/Vimeo Key' }),
  site: z.enum(['YouTube', 'Vimeo', 'Other']),
  type: z.enum(videoTypes),
  size: z.number().min(240, { message: 'Chất lượng không hợp lệ' }),
  official: z.boolean(),
  isActive: z.number().min(0).max(1),
});

export type VideoFormValues = z.infer<typeof videoSchema>;
