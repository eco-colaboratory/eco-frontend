# Phase 2: Modal login + landing post-login

**Plan:** [plan.md](./plan.md)  
**Depends on:** [phase-01-api-redux.md](./phase-01-api-redux.md)  
**testing:** default

## Objective

Wire `LoginForm` → API; đóng modal; Admin redirect; non-admin ở landing.

## Files to create / modify

| File | Changes |
|------|---------|
| `hooks/useLandingAuth.ts` | **New** — `login({ account, password })`, `isLoading`, `error`; dùng `loginAsync` + `setupAutoRefresh`; đọc role từ **`result.user`** (không stale state); Admin → `router.push('/admin/dashboard')`; else toast + return |
| `components/widget/auth/auth-credentials-form.tsx` | Login: label **Email hoặc tên đăng nhập**; field `account` (vẫn 1 input); map submit → `{ account, password }` |
| `components/widget/auth/login-form.tsx` | `useLandingAuth`, loading/disabled, hiển thị error |
| `components/widget/auth/auth-modal.tsx` | Props `onLoginSuccess?: () => void`; pass `onOpenChange(false)` sau login non-admin |

## `useLandingAuth` behavior

```ts
const result = await dispatch(loginAsync({ account, password })).unwrap()
setupAutoRefresh(result.token, dispatch)
const roles = result.user?.role ?? []
const isAdmin = roles.includes(ROLE_ADMIN) // sau normalize

toast.success('Đăng nhập thành công')

if (isAdmin) {
  router.push('/admin/dashboard')
  return result
}

// Player / other: stay on landing
return result
```

**Không** gọi `useAuth().login` (tránh redirect `/courses`).

## AuthModal

```tsx
<LoginForm
  onSuccess={() => onOpenChange(false)}
/>
```

`LoginForm` gọi `useLandingAuth().login` rồi `onSuccess` khi không redirect admin.

## Register (v1)

- **Option A (khuyến nghị cook):** Tab Đăng ký disabled / "Sắp có" — chỉ ship login.
- **Option B:** Gọi API với stub `firstName: ''`, `lastName: ''`, `username` = email local-part.

Ghi rõ trong PR nếu chọn A.

## Done when

- [ ] Login thật từ modal
- [ ] Admin vào dashboard
- [ ] Player: modal đóng, không navigate away
- [ ] Toast lỗi khi API fail

## Verify

| Account | Expected |
|---------|----------|
| Admin | `/admin/dashboard` |
| Player | `/` + modal closed |
