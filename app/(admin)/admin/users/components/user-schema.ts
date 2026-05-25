import { z } from 'zod';
import { ASSIGNABLE_ROLES } from '@/lib/types/admin/user';

export const createUserSchema = z.object({
  username: z.string().min(1, 'Username bắt buộc'),
  password: z.string().min(6, 'Mật khẩu tối thiểu 6 ký tự'),
  email: z.string().email('Email không hợp lệ').optional().or(z.literal('')),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  role: z.enum(ASSIGNABLE_ROLES as unknown as [string, ...string[]]).optional(),
  currency: z.coerce.number().min(0, 'Số xu không thể âm').optional().default(0),
  level: z.coerce.number().min(1, 'Cấp độ tối thiểu là 1').optional().default(1),
});

export const updateUserSchema = createUserSchema.omit({ password: true }).extend({
  password: z.string().optional(),
});

export type CreateUserFormValues = z.infer<typeof createUserSchema>;
export type UpdateUserFormValues = z.infer<typeof updateUserSchema>;
