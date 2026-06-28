# Admin API — Shop Price Editing (FE Web Admin Integration Guide)

Cho phép admin xem toàn bộ sản phẩm trong shop và chỉnh giá từng sản phẩm mà không cần thay đổi code.

---

## Authentication

Cả 2 endpoint yêu cầu JWT Bearer token role `Admin` hoặc `SuperAdmin`:

```
Authorization: Bearer <accessToken>
```

Lấy token qua `POST /api/auth/login`. Thiếu token hoặc sai role → `403 Forbidden`.

---

## Endpoints

| Method | Route | Mô tả |
|--------|-------|-------|
| GET | `/api/admin/shop/catalog` | Toàn bộ sản phẩm shop (Items + Seeds + Decors + Characters) |
| PATCH | `/api/admin/shop/{prefixedId}/price` | Sửa giá một sản phẩm theo prefixedId |

---

## Prefix Strategy

Mỗi sản phẩm được định danh bằng chuỗi `prefixedId` gồm prefix + raw ID:

| Loại | Prefix | Raw ID | Ví dụ |
|------|--------|--------|-------|
| Consumable (nước, phân, thuốc) | `item:` | UUID | `item:3fa85f64-5717-4562-b3fc-2c963f66afa6` |
| Seed (hạt giống hoa) | `seed:` | UUID | `seed:8d3e1c20-aa1b-4a7b-9f8c-1234567890ab` |
| Decoration (trang trí) | `deco:` | UUID | `deco:b2f04e10-cc2d-4b8e-a1d5-abcdef123456` |
| Character (nhân vật) | `character:` | int index | `character:1` |
| Coin Package (gói nạp) | `package:` | UUID | `package:7f2a1b3c-8e4d-4f0a-b5c9-123456789abc` |

> **URL encoding**: Khi gọi PATCH, colon `:` trong prefixedId **không cần** encode vì ASP.NET Core tự decode path segment. Ví dụ: `PATCH /api/admin/shop/item:3fa85f64.../price` là hợp lệ.

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

## GET /api/admin/shop/catalog

Trả về toàn bộ sản phẩm từ 5 loại: Consumable, Seed, Decoration, Character, CoinPackage. Admin thấy cả item `isActive = false` (khác với player endpoint chỉ thấy active).

**Request:**
```
GET /api/admin/shop/catalog
Authorization: Bearer <token>
```

**Response 200:**
```json
{
  "isSuccess": true,
  "message": "Lấy danh sách cửa hàng (admin) thành công.",
  "data": [
    {
      "id": "item:3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "name": "Nước tưới",
      "price": 100,
      "category": "Consumable",
      "imageUrl": "https://...",
      "isActive": true
    },
    {
      "id": "seed:8d3e1c20-aa1b-4a7b-9f8c-1234567890ab",
      "name": "Hoa hướng dương",
      "price": 150,
      "category": "Seed",
      "imageUrl": "https://...",
      "isActive": true
    },
    {
      "id": "deco:b2f04e10-cc2d-4b8e-a1d5-abcdef123456",
      "name": "Chậu gỗ",
      "price": 300,
      "category": "Decoration",
      "imageUrl": "https://...",
      "isActive": true
    },
    {
      "id": "character:0",
      "name": "ECO",
      "price": 0,
      "category": "Character",
      "imageUrl": "",
      "isActive": true
    },
    {
      "id": "character:1",
      "name": "CHAM",
      "price": 10000,
      "category": "Character",
      "imageUrl": "",
      "isActive": true
    },
    {
      "id": "package:7f2a1b3c-8e4d-4f0a-b5c9-123456789abc",
      "name": "500 Coins",
      "price": 25000,
      "category": "CoinPackage",
      "imageUrl": "",
      "isActive": true
    }
  ]
}
```

**Error codes:**

| Code | Mô tả |
|------|-------|
| 403 | Token thiếu hoặc không đủ role Admin/SuperAdmin |
| 500 | Server error |

---

## PATCH /api/admin/shop/{prefixedId}/price

Cập nhật giá của một sản phẩm. Giá mới có hiệu lực ngay lập tức với player.

**Request:**
```
PATCH /api/admin/shop/character:1/price
Authorization: Bearer <token>
Content-Type: application/json

{
  "price": 5000
}
```

**Response 200:**
```json
{
  "isSuccess": true,
  "message": "Cập nhật giá thành công.",
  "data": {
    "id": "character:1",
    "name": "CHAM",
    "price": 5000,
    "category": "Character",
    "imageUrl": "",
    "isActive": true
  }
}
```

**Error codes:**

| Code | Mô tả |
|------|-------|
| 400 | `price < 0` — giá không được âm |
| 400 | `prefixedId` sai format (không có `:`, prefix không nhận dạng được, raw ID không parse được) |
| 403 | Token thiếu hoặc không đủ role |
| 404 | Không tìm thấy sản phẩm với prefixedId đó (item/seed/deco/character/package) |
| 409 | Xung đột concurrent — admin khác vừa sửa cùng lúc. FE hiển thị thông báo "Giá vừa được cập nhật bởi người khác. Vui lòng tải lại và thử lại." |

---

## FE Implementation Checklist

- [ ] Gọi `GET /api/admin/shop/catalog` để hiển thị danh sách, lưu `id` của từng item.
- [ ] Khi admin bấm "Sửa giá", gọi `PATCH /api/admin/shop/{item.id}/price` với body `{ "price": newPrice }`.
- [ ] Handle `409`: toast "Giá vừa bị sửa bởi người khác — đang tải lại..." rồi re-fetch catalog.
- [ ] Handle `400` với message từ server để hiển thị validation error inline.
- [ ] `character:` items có `imageUrl = ""` — FE tự map `character:0` → sprite ECO, `character:1` → sprite CHAM (không lấy từ API).
- [ ] `package:` items: `price` là giá VND (đơn vị đồng). `name` là `"{coinAmount} Coins"`. `imageUrl = ""`.
- [ ] Category `"Character"` và `"CoinPackage"` không xuất hiện trong player-facing `/api/shop/items` — chỉ có ở admin catalog.

---

## Backward Compatibility

- Player endpoint `GET /api/shop/items` — **không thay đổi** interface.
- Player endpoint `POST /api/shop/purchase` — **không thay đổi** interface. Sau khi admin PATCH giá, lần purchase tiếp theo của player dùng giá mới từ DB.
- Godot client: lỗi mua character không hợp lệ vẫn trả về `HTTP 400` (không đổi).
