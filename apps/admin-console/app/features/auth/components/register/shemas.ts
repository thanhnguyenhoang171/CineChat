import { z } from 'zod';
import { phoneRegex } from '~/utils/common-utils';

export const registerSchema = z
  .object({
    firstName: z.string().min(1, { message: 'Vui lòng nhập tên' }),
    lastName: z.string().min(1, { message: 'Vui lòng nhập họ và tên đệm' }),
    username: z.string().min(1, { message: 'Vui lòng nhập tên tài khoản' }),
    dateOfBirth: z
      .date()
      .min(new Date('1900-01-01'), { message: 'Ngày sinh quá xa' })
      .max(new Date(), { message: 'Ngày sinh không thể ở tương lai' })
      .refine(
        (date) => {
          const today = new Date();
          const age = today.getFullYear() - date.getFullYear();
          const monthDiff = today.getMonth() - date.getMonth();

          if (
            monthDiff < 0 ||
            (monthDiff === 0 && today.getDate() < date.getDate())
          ) {
            return age - 1 >= 18;
          }
          return age >= 18;
        },
        { message: 'Bạn phải trên 18 tuổi để đăng ký' },
      ),
    phoneNumber: z
      .string()
      .min(10, { message: 'Số điện thoại phải có ít nhất 10 chữ số' })
      .max(12, { message: 'Số điện thoại không quá 12 ký tự' })
      .refine((value) => phoneRegex.test(value), {
        message:
          'Số điện thoại không đúng định dạng Việt Nam (ví dụ: 0912345678)',
      }),
    password: z
      .string()
      .min(1, { message: 'Vui lòng nhập mật khẩu' })
      .min(3, { message: 'Mật khẩu phải có ít nhất 6 ký tự' })
      .max(50, { message: 'Mật khẩu không được vượt quá 50 ký tự' }),
    gender: z.enum(['male', 'female', 'other']).optional(),
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
