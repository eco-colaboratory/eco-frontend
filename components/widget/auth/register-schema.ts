import { z } from 'zod'

export const registerSchema = z
  .object({
    firstName: z.string().trim().min(1, 'Vui lòng nhập họ'),
    lastName: z.string().trim().min(1, 'Vui lòng nhập tên'),
    email: z.string().trim().email('Email không hợp lệ'),
    username: z
      .string()
      .trim()
      .min(3, 'Tên đăng nhập tối thiểu 3 ký tự')
      .regex(/^[a-zA-Z0-9_]+$/, 'Chỉ dùng chữ, số và dấu gạch dưới'),
    password: z.string().min(6, 'Mật khẩu tối thiểu 6 ký tự'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Mật khẩu xác nhận không khớp',
    path: ['confirmPassword'],
  })

export type RegisterFormValues = z.infer<typeof registerSchema>

export type RegisterFieldErrors = Partial<Record<keyof RegisterFormValues, string>>

export function validateRegisterForm(values: RegisterFormValues): RegisterFieldErrors {
  const result = registerSchema.safeParse(values)
  if (result.success) return {}

  const errors: RegisterFieldErrors = {}
  for (const issue of result.error.issues) {
    const field = issue.path[0] as keyof RegisterFormValues | undefined
    if (field && !errors[field]) {
      errors[field] = issue.message
    }
  }
  return errors
}
