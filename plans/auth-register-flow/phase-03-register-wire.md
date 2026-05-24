# Phase 3: Wire `useLandingAuth.register` + modal copy

**Plan:** [plan.md](./plan.md)  
**Depends on:** [phase-02-register-form.md](./phase-02-register-form.md)  
**testing:** default

## Objective

Nối form → API → post-auth; cập nhật copy tab Đăng ký.

## Files to modify

| File | Changes |
|------|---------|
| `hooks/useLandingAuth.ts` | `register(payload, onSuccess)` → `registerAsync` + shared success handler |
| `components/widget/auth/register-form.tsx` | `onSubmit` → `register` |
| `components/widget/auth/auth-modal.tsx` | `TAB_HINT.register` → copy production |

## `useLandingAuth.register`

```ts
const register = async (payload: RegisterRequest, onSuccess?: () => void) => {
  const result = await dispatch(registerAsync(payload)).unwrap()
  setupAutoRefresh(result.token, dispatch)
  toast.success('Đăng ký thành công')
  // same role branch as login
  if (result.user?.role.includes(ROLE_ADMIN)) router.push('/admin/dashboard')
  else onSuccess?.()
}
```

## Auth modal

- `RegisterForm onSuccess={() => onOpenChange(false)}`
- Hint: *"Tạo tài khoản để tham gia CHẠM Flora."*

## Edge cases

- [ ] Double-submit prevented (`isLoading`)
- [ ] API error → toast + optional inline banner
- [ ] Switch tab login/register không leak password values (reset state on tab change — optional)

## Done when

- [ ] E2E manual: register Player → modal close → greeting
- [ ] Build pass

## Verify

| Case | Expected |
|------|----------|
| Valid Player | Greeting, cookies set |
| Duplicate email | Error message from API |
| Admin register (nếu có) | Redirect dashboard |
