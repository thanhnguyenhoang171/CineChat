import { z } from 'zod';

export const loginSchema = z.object({
  username: z.string().min(1, { message: 'Vui lòng nhập username' }),
  password: z
    .string()
    .min(1, { message: 'Vui lòng nhập mật khẩu' })
    .min(3, { message: 'Mật khẩu phải có ít nhất 6 ký tự' })
    .max(50, { message: 'Mật khẩu không được vượt quá 50 ký tự' }),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
