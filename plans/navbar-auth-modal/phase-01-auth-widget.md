# Phase 0: Auth widget UI (`components/widget/auth`) — DONE

**Plan:** [plan.md](./plan.md)  
**Status:** Complete (UI only, no API)  
**testing:** default

## Objective

Tạo module auth tái sử dụng: modal shell + form đăng nhập/đăng ký, nối API hiện có.

## Files to create

| File | Responsibility |
|------|----------------|
| `components/widget/auth/auth-modal.tsx` | `Dialog` controlled (`open`, `onOpenChange`); tab `login` \| `register`; render forms |
| `components/widget/auth/login-form.tsx` | Email/password, submit → `loginAsync` hoặc `useAuth().login` |
| `components/widget/auth/register-form.tsx` | Email, password, name (nếu API cần), submit → `fetchAuth.register` |
| `components/widget/auth/index.ts` | Export `AuthModal` (và forms nếu cần test riêng) |

Optional: `components/widget/auth/auth-schema.ts` — zod schemas nếu project đã dùng zod ở form khác (grep trước khi thêm dep).

## Implementation notes

### AuthModal

- Props: `open: boolean`, `onOpenChange: (open: boolean) => void`, optional `defaultTab?: 'login' | 'register'`.
- Reset tab về `login` khi `open` chuyển `false` (tránh mở lại vẫn ở register).
- Header: title theo tab — "Đăng nhập" / "Đăng ký".
- Footer link: "Chưa có tài khoản? Đăng ký" / "Đã có tài khoản? Đăng nhập".
- `DialogContent` className: max-w-md, bloom palette, giữ nút close mặc định shadcn.

### LoginForm

- Fields: `email` (type email), `password` (type password, autocomplete `current-password`).
- Submit: `useAuth().login({ email, password })` **hoặc** `dispatch(loginAsync).unwrap()` + `setupAutoRefresh` — ưu tiên `useAuth` để thống nhất toast/redirect.
- Loading: disable submit khi `auth.isLoading`.
- Hiển thị `auth.error` từ Redux nếu reject.

### RegisterForm

- Fields tối thiểu theo `RegisterRequest`: `email`, `password`; thêm `name` nếu backend yêu cầu (kiểm tra `.frontend-os` / API doc hoặc thử payload).
- Flow đề xuất:
  1. `const res = await fetchAuth.register(data)`
  2. Nếu `res.isSuccess && res.data.accessToken`: `dispatch(setTokenWithRefresh({ accessToken, refreshToken }))`, `setupAutoRefresh`, `apiService.setAuthToken`, decode user → `toast.success`, `onOpenChange(false)`, redirect (cùng policy login).
  3. Else: hiển thị `res.message`.
- Có thể sau register gọi luôn `loginAsync` với cùng credentials nếu API register không trả token.

### Security (phase checklist)

- [ ] Không lưu password vào state/global ngoài controlled input.
- [ ] Validate email format + password min length phía client (khớp backend nếu biết).
- [ ] `autocomplete` đúng cho trình quản lý mật khẩu.

## Done when

- [ ] `AuthModal` render độc lập được (story/page tạm hoặc mount trong layout test).
- [ ] Login + register submit không lỗi TypeScript.
- [ ] Tab switching hoạt động; đóng modal reset tab.

## Verify

```bash
# Typecheck (project script)
npm run build
# hoặc
npx tsc --noEmit
```

Manual: mở modal tạm trên dev page → submit login với credential test (nếu có API local).
