# Admin API — Gift Code (FE Web Admin Integration Guide)

Cho phép team FE web admin xem danh sách, tạo, sửa, xoá, và bật/tắt gift code khuyến mãi mà người chơi nhập trong app Godot để nhận thưởng (currency, item, flower seed, decor).

---

## Authentication

Cả 6 endpoint yêu cầu JWT Bearer token role `Admin` hoặc `SuperAdmin`:

```
Authorization: Bearer <accessToken>
```

Lấy token qua `POST /api/auth/login`. Thiếu token hoặc sai role → `401 Unauthorized`.

---

## Endpoints

| Method | Route | Mô tả |
|--------|-------|-------|
| GET | `/api/admin/gift-codes` | Danh sách gift code có phân trang |
| GET | `/api/admin/gift-codes/{id}` | Chi tiết một gift code |
| POST | `/api/admin/gift-codes` | Tạo gift code mới |
| PUT | `/api/admin/gift-codes/{id}` | Sửa `code`/`expiryDate`/`usageLimit`/`rewards` (full replace) — dùng khi tạo nhầm |
| DELETE | `/api/admin/gift-codes/{id}` | Xoá vĩnh viễn gift code |
| PATCH | `/api/admin/gift-codes/{id}` | Bật/tắt `isActive` (tạm ngưng, không xoá) |

---

## Response envelope

**Thành công** — `ApiResponse<T>`:

```json
{
  "isSuccess": true,
  "message": "Tạo gift code thành công.",
  "data": { /* T */ },
  "metaData": null
}
```

**Lỗi** — `ApiError`:

```json
{
  "status": false,
  "code": 409,
  "message": "Mã gift code đã tồn tại.",
  "data": null
}
```

> Field lỗi là `code` (HTTP status lặp lại trong body) + `message` (tiếng Việt, hiển thị trực tiếp được). Không có trường `errorCode`/enum riêng — FE nên match theo `code` + nội dung `message` nếu cần phân biệt case.

---

## 1. POST /api/admin/gift-codes — Tạo gift code

### Request

```json
POST /api/admin/gift-codes
{
  "code": "SUMMER2026",
  "expiryDate": "2026-12-31T00:00:00Z",
  "usageLimit": 100,
  "rewards": [
    { "rewardType": 0, "quantity": 500 },
    { "rewardType": 1, "refId": "11111111-1111-1111-1111-111111111111", "quantity": 2 }
  ]
}
```

| Field | Type | Required | Note |
|-------|------|----------|------|
| `code` | string | yes | Tự động chuẩn hoá `trim + UPPERCASE` ở BE — xem [Code normalization](#code-normalization) |
| `expiryDate` | ISO datetime | yes | **Không bị validate** ở BE hiện tại — có thể tạo code đã hết hạn từ trước, xem [Known gap](#known-gap-expirydate-không-được-validate) |
| `usageLimit` | int? | no | `null` = không giới hạn số lần đổi |
| `rewards` | array | yes | Tối thiểu 1 phần tử |
| `rewards[].rewardType` | int enum | yes | `0`=Currency, `1`=Item, `2`=FlowerSeed, `3`=Decor — xem [RewardType](#rewardtype-enum) |
| `rewards[].refId` | uuid? | khi cần | **Bắt buộc** cho `Item`/`FlowerSeed`/`Decor`, phải tồn tại trong bảng tương ứng (`Items`/`FlowerTemplates`/`Decors`). Bỏ qua/null cho `Currency`. |
| `rewards[].quantity` | int | yes | Số lượng / số currency nhận được |

### RewardType enum

| Value | Name | `refId` trỏ tới bảng |
|-------|------|------------------------|
| 0 | Currency | (không dùng `refId`) |
| 1 | Item | `Items` |
| 2 | FlowerSeed | `FlowerTemplates` |
| 3 | Decor | `Decors` |

### Response — 201 Created

```json
{
  "isSuccess": true,
  "message": "Tạo gift code thành công.",
  "data": {
    "id": "b0000000-0001-4001-8001-000000000099",
    "code": "SUMMER2026",
    "expiryDate": "2026-12-31T00:00:00Z",
    "usageLimit": 100,
    "timesUsed": 0,
    "isActive": true,
    "rewards": [
      { "rewardType": 0, "refId": null, "quantity": 500 },
      { "rewardType": 1, "refId": "11111111-1111-1111-1111-111111111111", "quantity": 2 }
    ]
  },
  "metaData": null
}
```

`isActive` mặc định `true` khi tạo. `timesUsed` luôn bắt đầu từ `0`.

### Lỗi có thể gặp

| HTTP | Message | Khi nào |
|------|---------|---------|
| 400 | `Gift code phải có ít nhất một phần thưởng.` | `rewards` rỗng |
| 400 | `RefId của phần thưởng không hợp lệ.` | `refId` thiếu hoặc không tồn tại trong bảng tương ứng cho `Item`/`FlowerSeed`/`Decor` |
| 401 | `Truy cập bị từ chối.` | thiếu/sai JWT admin |
| 409 | `Mã gift code đã tồn tại.` | `code` (đã chuẩn hoá) đã tồn tại trong DB |

```json
{ "status": false, "code": 400, "message": "Gift code phải có ít nhất một phần thưởng.", "data": null }
```
```json
{ "status": false, "code": 400, "message": "RefId của phần thưởng không hợp lệ.", "data": null }
```
```json
{ "status": false, "code": 409, "message": "Mã gift code đã tồn tại.", "data": null }
```

---

## 2. PUT /api/admin/gift-codes/{id} — Sửa gift code

Full replace `code`/`expiryDate`/`usageLimit`/`rewards` — dùng khi tạo nhầm (sai code, sai phần thưởng...). **Không** đổi `isActive` hoặc `timesUsed` (dùng PATCH cho `isActive`; `timesUsed` chỉ đổi qua redeem).

> Sửa `rewards` của một code đã có người đổi (`timesUsed > 0`) **không** ảnh hưởng tới những lượt đã redeem trước đó — chỉ áp dụng cho các lượt redeem **sau** khi sửa.

### Request

```json
PUT /api/admin/gift-codes/b0000000-0001-4001-8001-000000000099
{
  "code": "SUMMER2026FIX",
  "expiryDate": "2026-12-31T00:00:00Z",
  "usageLimit": 100,
  "rewards": [
    { "rewardType": 0, "quantity": 500 },
    { "rewardType": 1, "refId": "11111111-1111-1111-1111-111111111111", "quantity": 2 }
  ]
}
```

Body giống hệt request của POST (xem bảng field ở mục 1) — phải gửi **toàn bộ** `rewards` mong muốn sau khi sửa, không phải chỉ phần thay đổi (full replace, không phải patch từng phần tử).

### Response — 200 OK

```json
{
  "isSuccess": true,
  "message": "Cập nhật gift code thành công.",
  "data": {
    "id": "b0000000-0001-4001-8001-000000000099",
    "code": "SUMMER2026FIX",
    "expiryDate": "2026-12-31T00:00:00Z",
    "usageLimit": 100,
    "timesUsed": 0,
    "isActive": true,
    "rewards": [
      { "rewardType": 0, "refId": null, "quantity": 500 },
      { "rewardType": 1, "refId": "11111111-1111-1111-1111-111111111111", "quantity": 2 }
    ]
  },
  "metaData": null
}
```

### Lỗi có thể gặp

| HTTP | Message | Khi nào |
|------|---------|---------|
| 400 | `Gift code phải có ít nhất một phần thưởng.` | `rewards` rỗng |
| 400 | `RefId của phần thưởng không hợp lệ.` | `refId` thiếu hoặc không tồn tại trong bảng tương ứng |
| 404 | `Không tìm thấy gift code.` | `id` không tồn tại |
| 409 | `Mã gift code đã tồn tại.` | `code` (đã chuẩn hoá) trùng với một gift code **khác** — đổi `code` về chính giá trị hiện tại của nó thì không bị tính là trùng |

```json
{ "status": false, "code": 404, "message": "Không tìm thấy gift code.", "data": null }
```
```json
{ "status": false, "code": 409, "message": "Mã gift code đã tồn tại.", "data": null }
```

---

## 3. DELETE /api/admin/gift-codes/{id} — Xoá gift code

Xoá vĩnh viễn khỏi DB. Không thể hoàn tác — dùng PATCH nếu chỉ muốn tạm ngưng.

### Response — 200 OK

```json
{
  "isSuccess": true,
  "message": "Xóa gift code thành công.",
  "data": { "id": "b0000000-0001-4001-8001-000000000099" },
  "metaData": null
}
```

### Lỗi — 404 Not Found

```json
{ "status": false, "code": 404, "message": "Không tìm thấy gift code.", "data": null }
```

401 dùng envelope giống mục 1.

---

## 4. PATCH /api/admin/gift-codes/{id} — Bật/tắt active

Dùng để tạm ngưng một code mà không xoá lịch sử/cấu hình — không đổi `expiryDate`, `usageLimit`, hoặc `timesUsed`.

### Request

```json
PATCH /api/admin/gift-codes/b0000000-0001-4001-8001-000000000099
{ "isActive": false }
```

### Response — 200 OK

```json
{
  "isSuccess": true,
  "message": "Cập nhật trạng thái gift code thành công.",
  "data": { "id": "b0000000-0001-4001-8001-000000000099", "isActive": false },
  "metaData": null
}
```

### Lỗi — 404 Not Found

```json
{ "status": false, "code": 404, "message": "Không tìm thấy gift code.", "data": null }
```

> Khi `isActive=false`, người chơi redeem code này nhận lỗi riêng **`Gift code không còn hoạt động.`** (400, không phải 404 `NotFound`) — vì code vẫn tồn tại trong DB, chỉ bị tắt. FE admin nên phân biệt rõ 2 trạng thái này khi hiển thị danh sách.

---

## 5. GET /api/admin/gift-codes — Danh sách gift code

Trả về danh sách phân trang, sắp xếp: active trước (`isActive DESC`), sau đó theo `expiryDate ASC`.

### Query params

| Param | Type | Default | Max | Note |
|-------|------|---------|-----|------|
| `page` | int | `1` | — | Trang hiện tại (1-based) |
| `pageSize` | int | `20` | `100` | Số item mỗi trang — BE tự cap tại 100 nếu FE gửi lớn hơn |

### Response — 200 OK

```json
{
  "isSuccess": true,
  "message": "Lấy thông tin gift code thành công.",
  "data": {
    "items": [
      {
        "id": "b0000000-0001-4001-8001-000000000099",
        "code": "SUMMER2026",
        "expiryDate": "2026-12-31T00:00:00Z",
        "usageLimit": 100,
        "timesUsed": 12,
        "isActive": true,
        "rewards": [
          { "rewardType": 0, "refId": null, "quantity": 500 },
          { "rewardType": 1, "refId": "11111111-1111-1111-1111-111111111111", "quantity": 2 }
        ]
      }
    ],
    "pagination": {
      "currentPage": 1,
      "pageSize": 20,
      "totalItems": 45,
      "totalPages": 3
    }
  },
  "metaData": null
}
```

`items` là `GiftCodeDto[]` — mỗi item bao gồm đầy đủ `rewards`. `pagination.totalPages = ceil(totalItems / pageSize)`. Nếu không có gift code nào, `items = []` và `totalItems = 0` (không phải 404).

### Lỗi có thể gặp

| HTTP | Message | Khi nào |
|------|---------|---------|
| 401 | `Truy cập bị từ chối.` | thiếu/sai JWT admin |

---

## 6. GET /api/admin/gift-codes/{id} — Chi tiết gift code

### Response — 200 OK

```json
{
  "isSuccess": true,
  "message": "Lấy thông tin gift code thành công.",
  "data": {
    "id": "b0000000-0001-4001-8001-000000000099",
    "code": "SUMMER2026",
    "expiryDate": "2026-12-31T00:00:00Z",
    "usageLimit": 100,
    "timesUsed": 12,
    "isActive": true,
    "rewards": [
      { "rewardType": 0, "refId": null, "quantity": 500 },
      { "rewardType": 1, "refId": "11111111-1111-1111-1111-111111111111", "quantity": 2 }
    ]
  },
  "metaData": null
}
```

### Lỗi có thể gặp

| HTTP | Message | Khi nào |
|------|---------|---------|
| 401 | `Truy cập bị từ chối.` | thiếu/sai JWT admin |
| 404 | `Không tìm thấy gift code.` | `id` không tồn tại |

```json
{ "status": false, "code": 404, "message": "Không tìm thấy gift code.", "data": null }
```

---

## Tổng hợp toàn bộ lỗi (6 endpoint)

| HTTP | Message | Endpoint |
|------|---------|----------|
| 400 | `Gift code phải có ít nhất một phần thưởng.` | POST / PUT |
| 400 | `RefId của phần thưởng không hợp lệ.` | POST / PUT |
| 401 | `Truy cập bị từ chối.` | GET / GET {id} / POST / PUT / DELETE / PATCH |
| 404 | `Không tìm thấy gift code.` | GET {id} / PUT / DELETE / PATCH |
| 409 | `Mã gift code đã tồn tại.` | POST / PUT |

> Các mã lỗi phía người chơi khi redeem (`GiftCodeExpired`, `GiftCodeAlreadyRedeemed`, `GiftCodeQuotaExceeded`, `GiftCodeRedeemConflict`...) **không áp dụng** cho 6 endpoint admin này — chỉ liệt kê ở đây để tránh nhầm lẫn khi đọc code BE.

---

## Code normalization

Mọi `code` được chuẩn hoá bằng `Trim().ToUpperInvariant()` **cả khi tạo (admin) và khi redeem (player)** — ví dụ `" summer 2026 "` → `"SUMMER 2026"`. So khớp luôn không phân biệt hoa/thường và khoảng trắng đầu/cuối.

---

## Known gap: `expiryDate` không được validate

Implementation hiện tại (`GiftCodeService.CreateGiftCodeAsync`) **không kiểm tra** `expiryDate` phải ở tương lai — có thể tạo một gift code với `expiryDate` đã ở quá khứ, code đó sẽ tồn tại nhưng mọi lượt redeem sẽ luôn trả lỗi `Gift code đã hết hạn.` (400). FE admin nên tự validate `expiryDate > now` trên UI trước khi gọi POST để tránh tạo code "chết" ngay từ đầu.

---

## Curl examples

```bash
# Login lấy token admin
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"ecoadmin","password":"ecoadmin"}'

# Danh sách gift code (trang 1, 20 item/trang)
curl http://localhost:5000/api/admin/gift-codes \
  -H "Authorization: Bearer $TOKEN"

# Trang 2, 10 item/trang
curl "http://localhost:5000/api/admin/gift-codes?page=2&pageSize=10" \
  -H "Authorization: Bearer $TOKEN"

# Chi tiết một gift code
curl http://localhost:5000/api/admin/gift-codes/b0000000-0001-4001-8001-000000000099 \
  -H "Authorization: Bearer $TOKEN"

# Tạo gift code
curl -X POST http://localhost:5000/api/admin/gift-codes \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "code": "SUMMER2026",
    "expiryDate": "2026-12-31T00:00:00Z",
    "usageLimit": 100,
    "rewards": [
      { "rewardType": 0, "quantity": 500 },
      { "rewardType": 1, "refId": "11111111-1111-1111-1111-111111111111", "quantity": 2 }
    ]
  }'

# Tạo lại CÙNG code -> 409 Conflict
curl -X POST http://localhost:5000/api/admin/gift-codes \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"code":"SUMMER2026","expiryDate":"2026-12-31T00:00:00Z","rewards":[{"rewardType":0,"quantity":500}]}'

# Sửa gift code (PUT, full replace)
curl -X PUT http://localhost:5000/api/admin/gift-codes/{id} \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "code": "SUMMER2026FIX",
    "expiryDate": "2026-12-31T00:00:00Z",
    "usageLimit": 100,
    "rewards": [
      { "rewardType": 0, "quantity": 500 },
      { "rewardType": 1, "refId": "11111111-1111-1111-1111-111111111111", "quantity": 2 }
    ]
  }'

# Tắt active (PATCH)
curl -X PATCH http://localhost:5000/api/admin/gift-codes/{id} \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"isActive": false}'

# Xoá code KHÔNG tồn tại -> 404 Not Found
curl -X DELETE http://localhost:5000/api/admin/gift-codes/00000000-0000-0000-0000-000000000000 \
  -H "Authorization: Bearer $TOKEN"

# Xoá thật
curl -X DELETE http://localhost:5000/api/admin/gift-codes/{id} \
  -H "Authorization: Bearer $TOKEN"
```

---

## Testing checklist

- [ ] Gọi cả 6 endpoint không có token → 401
- [ ] Gọi cả 6 endpoint với token role `Player` (không phải Admin) → 401
- [ ] GET list không có gift code nào → 200, `items: []`, `totalItems: 0` (không phải 404)
- [ ] GET list `page=1&pageSize=5` khi có 12 gift code → `totalPages: 3`, `totalItems: 12`
- [ ] GET list `pageSize=200` → BE tự cap về 100, response `pageSize: 100`
- [ ] GET list kiểm tra sort: active (`isActive=true`) lên trước, trong cùng nhóm sort theo `expiryDate` gần nhất lên đầu
- [ ] GET {id} với `id` hợp lệ → 200, `rewards` đầy đủ
- [ ] GET {id} với `id` không tồn tại → 404 `GiftCodeNotFound`
- [ ] POST với `rewards: []` → 400 `GiftCodeRewardsRequired`
- [ ] POST với `rewardType: 1` (Item) và `refId` không tồn tại → 400 `GiftCodeRewardRefIdInvalid`
- [ ] POST với `code` đã tồn tại (khác hoa/thường, ví dụ `"summer2026"` khi `"SUMMER2026"` đã có) → 409 `GiftCodeAlreadyExists`
- [ ] POST với `usageLimit: null` → tạo thành công, `usageLimit` trả về `null` (không giới hạn)
- [ ] PUT với `id` không tồn tại → 404 `GiftCodeNotFound`
- [ ] PUT đổi `code` thành code của một gift code **khác** đã tồn tại → 409 `GiftCodeAlreadyExists`
- [ ] PUT đổi `code` về **chính** giá trị hiện tại (không đổi) → 200 thành công, không bị tính là trùng
- [ ] PUT với `rewards: []` → 400 `GiftCodeRewardsRequired`
- [ ] PUT đổi `rewards` thành danh sách khác → GET lại thấy `rewards` mới hoàn toàn (rewards cũ không còn trong DB)
- [ ] PUT trên code đã có `timesUsed > 0` → vẫn sửa thành công, không đổi `timesUsed`
- [ ] PATCH `isActive: false` rồi thử redeem code đó ở app player → nhận lỗi `Gift code không còn hoạt động.` (không phải `NotFound`)
- [ ] PATCH `isActive: true` lại → redeem hoạt động bình thường trở lại
- [ ] DELETE với `id` không tồn tại → 404 `GiftCodeNotFound`
- [ ] DELETE thành công rồi GET/redeem code đó → `GiftCodeNotFound` (đã xoá khỏi DB)
- [ ] POST với `expiryDate` ở quá khứ → **tạo thành công** (gap đã ghi ở trên) — không phải lỗi, xác nhận hành vi thực tế trước khi báo bug
