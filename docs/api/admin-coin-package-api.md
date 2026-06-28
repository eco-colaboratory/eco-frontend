# Admin API — Coin Package CRUD (FE Web Admin Integration Guide)

Cho phép admin quản lý đầy đủ các gói nạp coin: xem, tạo, cập nhật, bật/tắt, xóa mềm.

---

## Authentication

Tất cả endpoint yêu cầu JWT Bearer token role `Admin` hoặc `SuperAdmin`:

```
Authorization: Bearer <accessToken>
```

Lấy token qua `POST /api/auth/login`. Thiếu token hoặc sai role → `403 Forbidden`.

---

## Endpoints

| Method | Route | Mô tả |
|--------|-------|-------|
| GET | `/api/admin/coin-packages` | Toàn bộ gói nạp (kể cả inactive, trừ deleted) |
| POST | `/api/admin/coin-packages` | Tạo gói nạp mới |
| PUT | `/api/admin/coin-packages/{id}` | Cập nhật giá VND và số coin |
| PATCH | `/api/admin/coin-packages/{id}/status` | Bật / tắt gói nạp |
| DELETE | `/api/admin/coin-packages/{id}` | Xóa mềm gói nạp |

> **Lưu ý:** Giá VND của một gói có thể sửa qua cả `PUT /api/admin/coin-packages/{id}` (endpoint này) lẫn `PATCH /api/admin/shop/package:{id}/price` (admin shop catalog). Cả hai đều ghi vào cùng field `PriceVnd`.

---

## Response Envelope

**Thành công** — `ApiResponse<T>`:

```json
{
  "isSuccess": true,
  "message": "...",
  "data": { }
}
```

**Lỗi** — `ApiError`:

```json
{
  "status": false,
  "code": 400,
  "message": "Mô tả lỗi."
}
```

---

## Data Model — AdminCoinPackageDto

```json
{
  "id": "7f2a1b3c-8e4d-4f0a-b5c9-123456789abc",
  "priceVnd": 25000,
  "coinAmount": 500,
  "isActive": true
}
```

| Field | Type | Mô tả |
|-------|------|-------|
| `id` | string (UUID) | ID của gói (dùng cho PUT/PATCH/DELETE) |
| `priceVnd` | int | Giá VND người dùng thanh toán |
| `coinAmount` | int | Số coin nhận được sau khi mua |
| `isActive` | bool | true = hiển thị cho player; false = ẩn |

---

## GET /api/admin/coin-packages

Lấy toàn bộ gói nạp chưa bị xóa (gồm cả inactive). Khác với `GET /api/coin-packages` (player-facing) — chỉ trả active packages.

**Response 200:**
```json
{
  "isSuccess": true,
  "message": "Lấy danh sách gói nạp coin (admin) thành công.",
  "data": [
    { "id": "...", "priceVnd": 20000, "coinAmount": 100, "isActive": true },
    { "id": "...", "priceVnd": 50000, "coinAmount": 300, "isActive": false }
  ]
}
```

---

## POST /api/admin/coin-packages

Tạo gói nạp mới. Gói mới mặc định `isActive = true`.

**Request:**
```json
{
  "priceVnd": 99000,
  "coinAmount": 2000
}
```

**Validation:**
- `priceVnd > 0` (bắt buộc)
- `coinAmount > 0` (bắt buộc)

**Response 201:**
```json
{
  "isSuccess": true,
  "message": "Tạo gói nạp coin thành công.",
  "data": {
    "id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    "priceVnd": 99000,
    "coinAmount": 2000,
    "isActive": true
  }
}
```

**Error codes:**

| Code | Mô tả |
|------|-------|
| 400 | `priceVnd ≤ 0` hoặc `coinAmount ≤ 0` |
| 403 | Không đủ quyền |

---

## PUT /api/admin/coin-packages/{id}

Cập nhật giá VND và số coin của một gói. Cả hai field đều bắt buộc.

**Request:**
```json
{
  "priceVnd": 45000,
  "coinAmount": 250
}
```

**Response 200:**
```json
{
  "isSuccess": true,
  "message": "Cập nhật gói nạp coin thành công.",
  "data": {
    "id": "7f2a1b3c-8e4d-4f0a-b5c9-123456789abc",
    "priceVnd": 45000,
    "coinAmount": 250,
    "isActive": true
  }
}
```

**Error codes:**

| Code | Mô tả |
|------|-------|
| 400 | `priceVnd ≤ 0` hoặc `coinAmount ≤ 0` |
| 403 | Không đủ quyền |
| 404 | Không tìm thấy gói (đã bị xóa hoặc ID sai) |

---

## PATCH /api/admin/coin-packages/{id}/status

Bật (`true`) hoặc tắt (`false`) một gói nạp. Khi tắt, gói không xuất hiện ở player-facing endpoint.

**Request:**
```json
{
  "isActive": false
}
```

**Response 200:**
```json
{
  "isSuccess": true,
  "message": "Cập nhật trạng thái gói nạp coin thành công.",
  "data": {
    "id": "7f2a1b3c-8e4d-4f0a-b5c9-123456789abc",
    "priceVnd": 25000,
    "coinAmount": 500,
    "isActive": false
  }
}
```

**Error codes:**

| Code | Mô tả |
|------|-------|
| 403 | Không đủ quyền |
| 404 | Không tìm thấy gói |

---

## DELETE /api/admin/coin-packages/{id}

Xóa mềm (soft delete) gói nạp. Gói bị xóa không còn xuất hiện trong bất kỳ listing nào (admin lẫn player). Thao tác không thể hoàn tác qua API.

**Response 200:**
```json
{
  "isSuccess": true,
  "message": "Xóa gói nạp coin thành công.",
  "data": true
}
```

**Error codes:**

| Code | Mô tả |
|------|-------|
| 403 | Không đủ quyền |
| 404 | Gói không tồn tại hoặc đã bị xóa trước đó |

---

## FE Implementation Checklist

- [ ] Gọi `GET /api/admin/coin-packages` để hiển thị bảng danh sách; lưu `id` mỗi gói.
- [ ] Nút "Tạo" → form nhập `priceVnd` + `coinAmount` → `POST`.
- [ ] Nút "Sửa" → pre-fill form với giá trị hiện tại → `PUT /{id}`.
- [ ] Toggle switch → `PATCH /{id}/status` với `{ "isActive": true/false }`.
- [ ] Nút "Xóa" → confirm dialog → `DELETE /{id}` → xóa row khỏi danh sách local.
- [ ] Handle `404`: thông báo "Gói này không còn tồn tại. Vui lòng tải lại danh sách."
- [ ] `isActive = false` trong listing → hiển thị badge "Tắt" nhưng vẫn show row.

---

## Backward Compatibility

- Player endpoint `GET /api/coin-packages` — **không thay đổi**: vẫn chỉ trả packages có `isActive = true` và `IsDeleted = false`.
- Payment flow (`POST /api/payments/orders`) — **không thay đổi**: vẫn validate package tồn tại và active trước khi tạo đơn.
