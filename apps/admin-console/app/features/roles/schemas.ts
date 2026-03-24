import { z } from 'zod';

export const createRoleSchema = z.object({
  name: z.string().min(1, { message: 'Tên vai trò không được để trống' }),
  description: z.string().min(1, { message: 'Mô tả không được để trống' }),
  isActive: z.number(),
  permissionIds: z.array(z.string()).optional(),
});

export type CreateRoleValues = z.infer<typeof createRoleSchema>;
