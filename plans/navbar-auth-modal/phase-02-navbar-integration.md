# Phase 2: Navbar integration + polish

**Plan:** [plan.md](./plan.md)  
**Depends on:** [phase-01-auth-widget.md](./phase-01-auth-widget.md)  
**testing:** default

## Objective

Gắn `AuthModal` vào navbar Cham Bloom; thay CTA mailto bằng Đăng nhập trên desktop và mobile.

## Files to modify

| File | Change |
|------|--------|
| `app/(landing)/_components/layout/navbar.tsx` | Import `AuthModal`; `useState` cho `authOpen`; thay 2× `Link mailto` bằng `button` mở modal |

## Implementation notes

### Desktop (sm+)

Thay block hiện tại (~lines 206–211):

```tsx
<Link href={`mailto:${email}`} ...>{cta}</Link>
```

Bằng:

```tsx
<button type="button" onClick={() => setAuthOpen(true)} className={...same styles...}>
  Đăng nhập
</button>
```

- Giữ className CTA (rounded-full, `bg-bloom-green-mid`, …).
- Label: **"Đăng nhập"** (hardcode hoặc constant; không dùng `contact.cta` = "Liên hệ ngay").
- Có thể bỏ destructure `cta` nếu không còn dùng; giữ `email` nếu section contact khác vẫn cần.

### Mobile drawer

Thay `Link mailto` trong footer drawer (~lines 260–266) bằng cùng button:

- `onClick={() => { setOpen(false); setAuthOpen(true); }}` — đóng menu trước/sau mở modal tùy UX (ưu tiên đóng menu rồi mở modal).

### AuthModal placement

- Render `<AuthModal open={authOpen} onOpenChange={setAuthOpen} />` trong `<header>` (sibling của `m.nav`), `z-index` dialog đã z-50 — navbar z-50: OK với Radix portal.

### Authenticated user (optional v1 — NOTED)

Nếu `selectIsAuthenticated`: có thể đổi label thành "Tài khoản" hoặc ẩn modal — **chỉ làm nếu product yêu cầu** trong validation; mặc định v1 vẫn "Đăng nhập" và modal vẫn mở (login lại).

## A11y

- [ ] Button có accessible name "Đăng nhập".
- [ ] Mobile menu button `aria-expanded` không đổi.
- [ ] Modal: `DialogTitle` khớp tab hiện tại.

## Done when

- [ ] Header desktop + mobile không còn mailto CTA.
- [ ] Click Đăng nhập mở modal với login/register.
- [ ] Không regression scroll/spy nav hiện có.

## Verify

- Manual trên viewport mobile + desktop.
- Nếu có `e2e/cham-bloom-smoke.spec.ts`: chụp lại screenshot navbar nếu test so sánh pixel (cập nhật baseline nếu cần).
