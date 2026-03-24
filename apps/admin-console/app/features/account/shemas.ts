import { z } from 'zod';

export const profileFormSchema = z.object({
  fullName: z.string().min(2, { message: 'Họ tên phải ít nhất 2 ký tự.' }),
});

export type ProfileFormValues = z.infer<typeof profileFormSchema>;

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(6, 'Mật khẩu hiện tại tối thiểu 6 ký tự'),
    newPassword: z.string().min(6, 'Mật khẩu mới tối thiểu 6 ký tự'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Mật khẩu xác nhận không khớp',
    path: ['confirmPassword'],
  });

export type ChangePasswordValues = z.infer<typeof changePasswordSchema>;
