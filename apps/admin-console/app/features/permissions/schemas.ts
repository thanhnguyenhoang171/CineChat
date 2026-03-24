import { z } from 'zod';

export const createPermissionSchema = z.object({
  name: z.string().min(1, { message: 'Tên permission không được để trống' }),
  apiPath: z.string().min(1, { message: 'API path không được để trống' }),
  method: z.string().min(1, { message: 'Vui lòng chọn method' }),
  module: z.string().min(1, { message: 'Tên module không được để trống' }),
  isActive: z.number(),
  roleIds: z.array(z.string()).optional(),
});

export type CreatePermissionValues = z.infer<typeof createPermissionSchema>;
