# Plan: Landing auth — Public AuthController + navbar session

**Status:** Complete  
**Mode:** Fast  
**Test:** default (build pass)  
**Spec:** [docs/api/api-authorization.md](../../docs/api/api-authorization.md)  
**Prior work:** UI done — `components/widget/auth`, navbar **Đăng nhập** + `AuthModal`

## Goal

Nối **Public `AuthController`** (`/api/auth/login`, `/api/auth/register`, `/api/auth/refresh-token`) vào modal landing. Sau đăng nhập:

| Role (JWT) | Hành vi |
|------------|---------|
| **Admin** (và **SuperAdmin** nếu có) | `router.push('/admin/dashboard')` |
| **Khác** (Player, …) | Ở lại landing; đóng modal; navbar đổi **Đăng nhập** → **Xin chào {username}** |

## Phases

- [x] Phase 0 (done): Auth modal UI + navbar trigger
- [x] Phase 1: API + Redux alignment (`phase-01-api-redux.md`)
- [x] Phase 2: Modal login wiring + landing post-login (`phase-02-login-flow.md`)
- [x] Phase 3: Navbar greeting + session hydrate (`phase-03-navbar-session.md`)

## Success criteria

1. Login với `account` + `password` gọi đúng `POST /api/auth/login`, lưu cookie + Redux.
2. Admin → redirect `/admin/dashboard`; non-admin → modal đóng, vẫn ở landing.
3. Navbar hiển thị **Xin chào {username}** khi đã login (non-admin); không mở modal khi đã login (v1: text tĩnh).
4. Reload trang landing vẫn thấy greeting nếu cookie còn hạn (hydrate).
5. Lỗi API hiển thị message (toast hoặc inline).
6. `refresh-token` path khớp doc (cùng prefix `/api/auth/`).

## Session Notes
<!-- Updated by cook automatically — do not edit manually -->

**Last active:** 2026-05-23  
**Phase in progress:** —  
**Status:** All phases complete — `npm run build` passed

### Decisions made this session
- Login-only shipped; register tab shows “Sắp có” placeholder.
- `normalizeRoles()` maps JWT `Admin`/`SuperAdmin` → `ROLE_ADMIN`; middleware + `Player` public-route block added.
- `refreshToken` stored in cookie alongside `authToken` for F5 hydrate.
- `useLandingAuth` used instead of `useAuth` on landing to avoid `/courses` redirect.

### Next immediate action
- Manual test against live API: Admin login → dashboard; Player → greeting + F5 persists.
