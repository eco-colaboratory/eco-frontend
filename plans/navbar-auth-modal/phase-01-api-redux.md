# Phase 1: API + Redux alignment

**Plan:** [plan.md](./plan.md)  
**Depends on:** UI (done)  
**testing:** default

## Objective

Khớp `fetchAuth` + `authSlice` với Public `AuthController` và JWT mới.

## Files to modify

| File | Changes |
|------|---------|
| `lib/api/services/fetchAuth.ts` | Routes `api/auth/login`, `register`, `refresh-token`; types `LoginRequest { account, password }`, `RegisterRequest` theo doc; response bỏ `expiresAt` nếu không có |
| `lib/redux/slices/authSlice.ts` | `loginAsync` credentials `{ account, password }`; `refreshTokenAsync` URL; `logout` URL; `decodeToken` map `username`, `name`; **`normalizeRole()`** |
| `lib/types/roles.ts` | (optional) `isAdminRole(roles)` helper — `ROLE_ADMIN` hoặc raw `Admin`/`SuperAdmin` |
| `lib/redux/slices/authSlice.ts` `User` | `username: string`, `name?: string`; deprecate/remove `userNname` |

## `normalizeRole` (sketch)

```ts
const ADMIN_ROLES = new Set(['Admin', 'SuperAdmin', ROLE_ADMIN])

export function normalizeRole(role: string | string[]): string[] {
  const list = Array.isArray(role) ? role : [role]
  return list.map((r) =>
    ADMIN_ROLES.has(r) ? ROLE_ADMIN : r,
  )
}
```

Gọi trong `decodeToken` trước khi gán `user.role`.

## `fetchAuth` endpoints

```ts
// base: NEXT_PUBLIC_API_URL + "api/auth/login" (no v1)
post<AuthLoginResponse>('api/auth/login', { account, password })
post('api/auth/register', registerPayload)
post('api/auth/refresh-token', { refreshToken })
```

Đồng bộ `lib/api/core.ts` interceptor refresh URL nếu vẫn trỏ `api/v1/auth/refresh-token`.

## Done when

- [ ] Typecheck pass
- [ ] `loginAsync` accepts `account` (breaking call sites updated in phase 2)
- [ ] Decoded user có `username` từ JWT
- [ ] JWT `role: "Admin"` → `user.role` chứa `ROLE_ADMIN`

## Verify

Manual với API local: POST login → inspect Redux state / cookie.
