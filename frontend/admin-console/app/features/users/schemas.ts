import { z } from 'zod';

export const createUserSchema = z.object({
  firstName: z.string().min(1, { message: 'Họ không được để trống' }),
  lastName: z.string().min(1, { message: 'Tên không được để trống' }),
  email: z.string().email({ message: 'Email không hợp lệ' }),
  password: z.string().min(6, { message: 'Mật khẩu phải ít nhất 6 ký tự' }).optional().or(z.literal('')),
  roleId: z.string().min(1, { message: 'Vui lòng chọn vai trò' }),
  isActive: z.number(),
  pictureUrl: z.string().optional(),
});

export type CreateUserValues = z.infer<typeof createUserSchema>;
