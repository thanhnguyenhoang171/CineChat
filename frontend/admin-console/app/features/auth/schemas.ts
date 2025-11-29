import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Vui lòng nhập email' })
    .email({ message: 'Địa chỉ email không hợp lệ' })
    .transform((email) => email.toLowerCase().trim()), // Chuẩn hóa email
  password: z
    .string()
    .min(1, { message: 'Vui lòng nhập mật khẩu' })
    .min(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' })
    .max(50, { message: 'Mật khẩu không được vượt quá 50 ký tự' }),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

// // Optional: Extended schema với remember me
// export const loginSchemaWithRemember = loginSchema.extend({
//   rememberMe: z.boolean().default(false),
// });

// export type LoginFormValuesWithRemember = z.infer<
//   typeof loginSchemaWithRemember
// >;
