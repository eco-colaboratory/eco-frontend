# Reward Tier Config API

Quản lý bảng reward tier cho Focus Session. Chỉ dành cho role **Admin** hoặc **SuperAdmin**.

Base URL: `http://20.40.58.246:5000`

---

## Authentication

Tất cả endpoints yêu cầu JWT Bearer token trong header:

```
Authorization: Bearer <accessToken>
```

Lấy token qua `POST /api/auth/login`.

---

## Luồng sử dụng

1. **GET** để lấy danh sách tiers và IDs
2. **POST** để thêm tier mới
3. **PATCH /{id}** để sửa tier theo ID lấy từ bước 1
4. **DELETE /{id}** để xóa tier

---

## GET /api/admin/focus-rewards/tiers

Lấy toàn bộ danh sách reward tiers, sắp xếp theo `minMinutes` tăng dần.

**Request**

```http
GET /api/admin/focus-rewards/tiers
Authorization: Bearer <token>
```

**Response 200**

```json
{
  "isSuccess": true,
  "message": "",
  "data": [
    {
      "id": "a1000000-0000-0000-0000-000000000001",
      "minMinutes": 1,
      "wateringCanQty": 1,
      "fertilizerQty": 1
    },
    {
      "id": "a1000000-0000-0000-0000-000000000002",
      "minMinutes": 50,
      "wateringCanQty": 2,
      "fertilizerQty": 1
    },
    {
      "id": "a1000000-0000-0000-0000-000000000003",
      "minMinutes": 75,
      "wateringCanQty": 3,
      "fertilizerQty": 2
    }
  ],
  "metaData": null
}
```

**Logic reward:** server tìm tier có `minMinutes` cao nhất mà `≤ durationMinutes` của session. Nếu không có tier nào thỏa thì không trả reward.

---

## POST /api/admin/focus-rewards/tiers

Tạo tier mới. ID tự sinh server-side, không cần truyền.

**Request**

```http
POST /api/admin/focus-rewards/tiers
Authorization: Bearer <token>
Content-Type: application/json
```

```json
{
  "minMinutes": 100,
  "wateringCanQty": 4,
  "fertilizerQty": 3
}
```

| Field | Type | Mô tả |
|---|---|---|
| `minMinutes` | int | Số phút tối thiểu để đạt tier này |
| `wateringCanQty` | int | Số Watering Can (0 = không có) |
| `fertilizerQty` | int | Số Fertilizer (0 = không có) |

**Response 201**

```json
{
  "isSuccess": true,
  "message": "",
  "data": {
    "id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    "minMinutes": 100,
    "wateringCanQty": 4,
    "fertilizerQty": 3
  },
  "metaData": null
}
```

---

## PATCH /api/admin/focus-rewards/tiers/{id}

Cập nhật một phần tier theo ID. Lấy ID từ GET trước. Chỉ truyền field muốn đổi — field nào bỏ qua sẽ giữ nguyên giá trị cũ.

**Request**

```http
PATCH /api/admin/focus-rewards/tiers/a1000000-0000-0000-0000-000000000001
Authorization: Bearer <token>
Content-Type: application/json
```

```json
{
  "minMinutes": 25,
  "wateringCanQty": 2,
  "fertilizerQty": 0
}
```

| Field | Type | Bắt buộc | Mô tả |
|---|---|---|---|
| `minMinutes` | int? | Không | Số phút tối thiểu để đạt tier này |
| `wateringCanQty` | int? | Không | Số Watering Can (0 = không có) |
| `fertilizerQty` | int? | Không | Số Fertilizer (0 = không có) |

**Response 200**

```json
{
  "isSuccess": true,
  "message": "",
  "data": {
    "id": "a1000000-0000-0000-0000-000000000001",
    "minMinutes": 25,
    "wateringCanQty": 2,
    "fertilizerQty": 0
  },
  "metaData": null
}
```

**Response 404**

```json
{
  "isSuccess": false,
  "message": "Reward tier not found.",
  "data": null,
  "metaData": null
}
```

---

## DELETE /api/admin/focus-rewards/tiers/{id}

Xóa tier theo ID.

**Request**

```http
DELETE /api/admin/focus-rewards/tiers/a1000000-0000-0000-0000-000000000001
Authorization: Bearer <token>
```

**Response 204** — Xóa thành công, không có body

**Response 404** — ID không tồn tại

---

## Ví dụ fetch (JavaScript)

```js
const BASE_URL = 'http://20.40.58.246:5000';

async function getRewardTiers(token) {
  const res = await fetch(`${BASE_URL}/api/admin/focus-rewards/tiers`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const json = await res.json();
  return json.data; // array of tiers, sorted by minMinutes asc
}

async function createRewardTier(token, { minMinutes, wateringCanQty, fertilizerQty }) {
  const res = await fetch(`${BASE_URL}/api/admin/focus-rewards/tiers`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ minMinutes, wateringCanQty, fertilizerQty }),
  });
  const json = await res.json();
  if (!json.isSuccess) throw new Error(json.message);
  return json.data; // newly created tier with server-generated id
}

async function updateRewardTier(token, id, { minMinutes, wateringCanQty, fertilizerQty }) {
  const res = await fetch(`${BASE_URL}/api/admin/focus-rewards/tiers/${id}`, {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ minMinutes, wateringCanQty, fertilizerQty }),
  });
  const json = await res.json();
  if (!json.isSuccess) throw new Error(json.message);
  return json.data;
}

async function deleteRewardTier(token, id) {
  const res = await fetch(`${BASE_URL}/api/admin/focus-rewards/tiers/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  if (res.status === 404) throw new Error('Tier not found');
  // 204 = success, no body
}
```

---

## Lưu ý

- ID tự sinh server-side khi POST — FE không truyền ID khi tạo mới.
- Luôn GET trước để lấy ID chính xác, không hardcode ID trong FE.
- Server không validate xung đột `minMinutes` giữa các tiers — FE nên kiểm tra trùng trước khi POST/PATCH.
- `minMinutes = 0` nghĩa là mọi session đều nhận reward (dùng để test).
