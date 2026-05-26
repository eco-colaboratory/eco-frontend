# Phase 1: Redux `registerAsync` + post-auth helper

**Plan:** [plan.md](./plan.md)  
**Depends on:** login flow (done)  
**testing:** default

## Objective

Thêm thunk đăng ký và logic lưu session tái sử dụng cho login/register.

## Files to modify / create

| File | Changes |
|------|---------|
| `lib/redux/slices/authSlice.ts` | `registerAsync` thunk; `extraReducers` pending/fulfilled/rejected |
| `lib/auth/complete-auth-session.ts` | **New** — `completeAuthSession(dispatch, { accessToken, refreshToken })` → cookies, api token, decode user |
| `lib/auth/handle-landing-auth-success.ts` | **New** (optional) — role check + redirect / callback |
| `hooks/useLandingAuth.ts` | Refactor `login` dùng helper; thêm `register()` |

## `registerAsync` sketch

```ts
export const registerAsync = createAsyncThunk(
  'auth/register',
  async (payload: RegisterRequest, { rejectWithValue }) => {
    const response = await fetchAuth.register(payload)
    if (response.isSuccess && response.data.accessToken) {
      const { accessToken, refreshToken } = response.data
      const user = decodeToken(accessToken)
      persistAuthCookies(accessToken, refreshToken)
      apiService.setAuthToken(accessToken)
      return { token: accessToken, refreshToken, user }
    }
    return rejectWithValue(response.message || 'Đăng ký thất bại')
  },
)
```

## Loading state

Option A: dùng chung `isLoading` cho login + register (đơn giản, modal chỉ một tab active).

Option B: `isRegistering` riêng — chỉ nếu cần song song (không cần v1).

## Done when

- [ ] `registerAsync` typecheck
- [ ] Login vẫn hoạt động sau refactor helper
- [ ] Rejected case set `auth.error`

## Verify

Unit/manual: dispatch register với payload test (API local).
