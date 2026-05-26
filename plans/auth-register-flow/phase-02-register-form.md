# Phase 2: Register form UI + validation

**Plan:** [plan.md](./plan.md)  
**Depends on:** [phase-01-register-redux.md](./phase-01-register-redux.md)  
**testing:** default

## Objective

Form đăng ký đầy đủ, đồng bộ visual với login (rounded-2xl, bloom palette).

## Files to modify / create

| File | Changes |
|------|---------|
| `components/widget/auth/register-schema.ts` | **New** — zod schema |
| `components/widget/auth/register-form.tsx` | Replace placeholder |
| `components/widget/auth/auth-field.tsx` | **Optional** — shared label+input nếu tránh lặp |

## Fields (UI)

| Field | API key | Ghi chú |
|-------|---------|---------|
| Họ | `firstName` | required, min 1 |
| Tên | `lastName` | required, min 1 |
| Email | `email` | email format |
| Tên đăng nhập | `username` | min 3, pattern `[a-zA-Z0-9_]` (confirm với BE) |
| Mật khẩu | `password` | min 6 (khớp login) |
| Xác nhận mật khẩu | — | client only, `refine` match |

Layout: 2 cột `firstName` | `lastName` trên mobile stack; `space-y-3.5` giống login.

## Validation (zod)

```ts
export const registerSchema = z.object({
  firstName: z.string().min(1, 'Vui lòng nhập họ'),
  lastName: z.string().min(1, 'Vui lòng nhập tên'),
  email: z.string().email('Email không hợp lệ'),
  username: z.string().min(3, 'Tên đăng nhập tối thiểu 3 ký tự'),
  password: z.string().min(6, 'Mật khẩu tối thiểu 6 ký tự'),
  confirmPassword: z.string(),
}).refine((d) => d.password === d.confirmPassword, {
  message: 'Mật khẩu xác nhận không khớp',
  path: ['confirmPassword'],
})
```

Hiển thị lỗi field dưới input (text-xs red) — không cần react-hook-form nếu state + zod.parse đủ nhẹ.

## Password visibility

Reuse pattern Eye/EyeOff cho password + confirmPassword.

## Done when

- [ ] Form render trong tab Đăng ký (có thể wire submit stub trước phase 3)
- [ ] Client validation chặn submit invalid
- [ ] Styling khớp `auth-credentials-form`

## Verify

Manual: submit empty → errors; mismatch password → error.
