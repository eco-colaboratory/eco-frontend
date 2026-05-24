# Plan: Luồng đăng ký (Auth modal — tab Đăng ký)

**Status:** Complete  
**Mode:** Fast  
**Test:** default (`npm run build` pass)  
**Spec:** [docs/api/api-authorization.md](../../docs/api/api-authorization.md)  
**Depends on:** [navbar-auth-modal](../navbar-auth-modal/plan.md) (login đã xong)

## Goal

Thay placeholder tab **Đăng ký** bằng form đầy đủ, gọi `POST /api/auth/register`, lưu session giống login, xử lý sau đăng ký **giống login** (Admin → dashboard, Player → ở landing + đóng modal + navbar chào).

## Phases

- [x] Phase 1: Redux `registerAsync` + shared post-auth (`phase-01-register-redux.md`)
- [x] Phase 2: Register form UI + validation (`phase-02-register-form.md`)
- [x] Phase 3: Wire `useLandingAuth.register` + modal copy (`phase-03-register-wire.md`)

## Success criteria

1. Tab Đăng ký hiển thị form: họ, tên, email, username, mật khẩu (+ xác nhận mật khẩu client).
2. Submit gọi đúng API; lỗi hiển thị inline/toast.
3. Thành công: cookie + Redux; toast; Admin redirect; Player đóng modal + navbar **Xin chào {username}**.
4. Loading/disable submit khi đang gọi API (dùng chung `auth.isLoading`).
5. `npm run build` pass.

## Session Notes
<!-- Updated by cook automatically — do not edit manually -->

**Last active:** 2026-05-23  
**Phase in progress:** —  
**Status:** All phases complete

### Decisions made this session
- `createAuthSession()` shared by login/register thunks.
- `handleLandingAuthSuccess()` tách post-auth redirect/callback.
- Zod validation client; confirm password không gửi API.
- Register tab dùng `onSuccess` đóng modal (bỏ placeholder + onSwitchToLogin).

### Next immediate action
- Manual test register against local API.
