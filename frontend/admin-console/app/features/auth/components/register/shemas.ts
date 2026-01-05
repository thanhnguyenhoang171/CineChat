import { z } from 'zod';

export const registerSchema = z
  .object({
    fullName: z.string().min(1, { message: 'Vui lòng nhập họ và tên' }),
    username: z.string().min(1, { message: 'Vui lòng nhập tên tài khoản' }),
    password: z
      .string()
      .min(1, { message: 'Vui lòng nhập mật khẩu' })
      .min(3, { message: 'Mật khẩu phải có ít nhất 6 ký tự' })
      .max(50, { message: 'Mật khẩu không được vượt quá 50 ký tự' }),

    confirmPassword: z
      .string()
      .min(1, { message: 'Vui lòng nhập mật khẩu' })
      .min(3, { message: 'Mật khẩu phải có ít nhất 6 ký tự' })
      .max(50, { message: 'Mật khẩu không được vượt quá 50 ký tự' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Mật khẩu xác nhận không khớp',
    path: ['confirmPassword'],
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;
