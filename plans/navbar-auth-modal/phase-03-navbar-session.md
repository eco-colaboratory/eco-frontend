# Phase 3: Navbar greeting + cookie hydrate

**Plan:** [plan.md](./plan.md)  
**Depends on:** [phase-02-login-flow.md](./phase-02-login-flow.md)  
**testing:** default

## Objective

Navbar phản ánh session; reload vẫn thấy **Xin chào {username}**.

## Files to modify

| File | Changes |
|------|---------|
| `app/(landing)/_components/layout/navbar.tsx` | `useAppSelector(selectIsAuthenticated)`, `selectUser`; `displayName = user?.username \|\| user?.name \|\| 'bạn'`; desktop + mobile: authenticated → `<span>Xin chào {displayName}</span>` (không mở modal); guest → button Đăng nhập |
| `hooks/useAuthHydration.ts` hoặc `lib/providers/index.tsx` | On mount: `getCookie('authToken')` → `decodeToken` → `dispatch(setTokenWithRefresh({ accessToken, refreshToken from storage? }))` — refresh token lưu cookie/localStorage nếu chưa có |

## Navbar UX (v1)

- **Guest:** nút pill xanh **Đăng nhập** (giữ style hiện tại).
- **Authenticated (non-admin on landing):** text `Xin chào {username}` — cùng vị trí, có thể `rounded-full px-4 py-2` nhưng `bg-transparent` / `text-bloom-green-deep` để không giống CTA.
- **Admin:** thường đã redirect; nếu quay lại landing đã login — có thể vẫn chào hoặc link "Dashboard" (optional, NOTED).

## Hydration note

Hiện Redux **không** restore từ cookie khi F5. Cần một trong:

1. `useAuthHydration` trong `AuthSyncProvider`, hoặc  
2. `Navbar` `useEffect` one-shot hydrate (kém hơn — duplicate)

Ưu tiên (1). Lưu `refreshToken` vào cookie `refreshToken` khi login (nếu chưa) để refresh hoạt động sau reload.

## Done when

- [ ] Sau login Player, navbar đổi ngay
- [ ] F5 landing vẫn **Xin chào …** với cookie hợp lệ
- [ ] Guest không thấy greeting

## Verify

Login Player → greeting → F5 → greeting vẫn còn.
