import { z } from 'zod';

export const createCastSchema = z.object({
  name: z.string().min(1, { message: 'Tên không được để trống' }),
  biography: z.string().optional(),
  birthday: z.string().optional(),
  placeOfBirth: z.string().optional(),
  gender: z.number(),
  role: z.string().min(1, { message: 'Vui lòng chọn vai trò' }),
  isActive: z.number(),
  profilePath: z.string().optional(),
});

export type CreateCastValues = z.infer<typeof createCastSchema>;
