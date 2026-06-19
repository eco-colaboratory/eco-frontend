# Daily Task Config API (Admin)

Cho phép Admin xem danh sách nhiệm vụ hàng ngày/hàng tuần và **chỉnh số lần/số phút (`target`) + phần thưởng**. Chỉ dành cho role **Admin** hoặc **SuperAdmin**.

**Quan trọng:** API này **không cho sửa nội dung nhiệm vụ** — `title`, `description`, `type`, `actionSubtype`, `cycle` luôn giữ nguyên vì được định nghĩa cứng ở Godot client (xem [`docs/daily-task/task-stable-ids.md`](daily-task/task-stable-ids.md)). FE admin chỉ cần render các field này ở dạng **read-only**, không có input để sửa.

Base URL: dùng chung với các API admin khác trong repo (xem [`docs/api-reward-tier-config.md`](api-reward-tier-config.md) để biết base URL hiện tại).

---

## Authentication

Tất cả endpoint yêu cầu JWT Bearer token của user có role `Admin`/`SuperAdmin`:

```
Authorization: Bearer <accessToken>
```

Lấy token qua `POST /api/auth/login`.

---

## Giá trị mặc định (seed)

Mọi nhiệm vụ đã có `target` + reward mặc định ngay từ khi seed DB (`Infrastructure/Data/Seeder.cs`) — **không có trạng thái "chưa cấu hình"**. GET luôn trả về giá trị thật (mặc định hoặc giá trị admin đã sửa), không bao giờ `null`/rỗng cho các field này.

| Title | Cycle | Target | RewardCurrency | RewardXP | RewardItemId |
|---|---|---|---|---|---|
| Tưới cây 3 lần | DAILY | 3 | 50 | 20 | null |
| Bón phân 2 lần | DAILY | 2 | 30 | 15 | null |
| Thu hoạch 2 bông hoa | DAILY | 2 | 100 | 50 | null |
| Hoàn thành 1 phiên Focus | DAILY | 1 | 80 | 40 | null |
| Online 30 phút | DAILY | 30 | 20 | 10 | null |
| Chăm sóc cây 10 lần | WEEKLY | 10 | 200 | 80 | null |
| Thu hoạch 5 bông hoa | WEEKLY | 5 | 300 | 120 | null |
| Hoàn thành 3 phiên Focus | WEEKLY | 3 | 250 | 100 | null |

FE admin nên hiển thị các giá trị này làm giá trị khởi tạo của form khi load trang lần đầu (lấy thật từ GET, bảng trên chỉ để FE biết trước baseline, không hardcode).

---

## Luồng sử dụng

1. **GET** để lấy toàn bộ danh sách nhiệm vụ (cả nhiệm vụ đang inactive) cùng `target` và 4 field reward hiện tại.
2. Render mỗi nhiệm vụ thành 1 form: các field content (`title`, `description`, `type`, `actionSubtype`, `cycle`) hiển thị read-only; chỉ `target` và 4 field reward có input cho admin sửa.
3. **PATCH `/{id}/config`** để lưu thay đổi — luôn gửi đủ cả 5 field editable trong 1 lần gọi (API không hỗ trợ partial update kiểu chỉ gửi field đã đổi).

---

## GET /api/admin/daily-tasks

Lấy toàn bộ `DailyTaskDefinition`, bao gồm cả nhiệm vụ `isActive = false`.

**Request**

```http
GET /api/admin/daily-tasks
Authorization: Bearer <token>
```

**Response 200**

```json
{
  "isSuccess": true,
  "message": "",
  "data": [
    {
      "id": "a0000000-da11-0001-0001-000000000001",
      "title": "Tưới cây 3 lần",
      "description": "Tưới nước cho cây 3 lần trong ngày",
      "type": "GARDEN_CARE",
      "actionSubtype": "water",
      "target": 3,
      "cycle": "DAILY",
      "isActive": true,
      "rewardCurrency": 50,
      "rewardItemId": null,
      "rewardItemQty": 0,
      "rewardXP": 20
    }
  ],
  "metaData": null
}
```

| Field | Type | Sửa được? | Mô tả |
|---|---|---|---|
| `id` | string (GUID) | — | Dùng cho PATCH |
| `title` | string | ❌ Read-only | Định nghĩa ở Godot |
| `description` | string | ❌ Read-only | Định nghĩa ở Godot |
| `type` | string | ❌ Read-only | `GARDEN_CARE` / `HARVEST` / `FOCUS_SESSION` / `ONLINE_TIME` |
| `actionSubtype` | string\|null | ❌ Read-only | Phân loại hành động trong `type` (VD: `water`, `fertilize`) |
| `target` | int | ✅ | Số lần/số phút cần đạt — VD "tưới cây **3** lần" |
| `cycle` | string | ❌ Read-only | `DAILY` / `WEEKLY` |
| `isActive` | bool | ❌ Read-only (API này không bật/tắt nhiệm vụ) | |
| `rewardCurrency` | int | ✅ | Xu thưởng |
| `rewardItemId` | string (GUID)\|null | ✅ | Vật phẩm thưởng, `null` = không có |
| `rewardItemQty` | int | ✅ | Số lượng vật phẩm — chỉ có ý nghĩa khi `rewardItemId` khác `null` |
| `rewardXP` | int | ✅ | XP thưởng |

---

## PATCH /api/admin/daily-tasks/{id}/config

Cập nhật `target` + 4 field reward của một nhiệm vụ theo `id` (lấy từ GET). **Phải gửi đủ cả 5 field** — không phải partial update, field nào không gửi sẽ bị hiểu là giá trị mặc định (`0`/`null`).

**Request**

```http
PATCH /api/admin/daily-tasks/a0000000-da11-0001-0001-000000000001/config
Authorization: Bearer <token>
Content-Type: application/json
```

```json
{
  "target": 5,
  "rewardCurrency": 80,
  "rewardXP": 30,
  "rewardItemId": null,
  "rewardItemQty": 0
}
```

| Field | Type | Bắt buộc | Validation |
|---|---|---|---|
| `target` | int | Có | `> 0` |
| `rewardCurrency` | int | Có | `>= 0` |
| `rewardXP` | int | Có | `>= 0` |
| `rewardItemId` | string (GUID)\|null | Không | Phải tồn tại trong bảng Items nếu khác `null` |
| `rewardItemQty` | int | Có nếu `rewardItemId` khác `null` | `> 0` khi có `rewardItemId`; nếu `rewardItemId = null` thì server tự ép `rewardItemQty` về `0` bất kể giá trị gửi lên |

**Response 200**

```json
{
  "isSuccess": true,
  "message": "",
  "data": {
    "id": "a0000000-da11-0001-0001-000000000001",
    "title": "Tưới cây 3 lần",
    "description": "Tưới nước cho cây 3 lần trong ngày",
    "type": "GARDEN_CARE",
    "actionSubtype": "water",
    "target": 5,
    "cycle": "DAILY",
    "isActive": true,
    "rewardCurrency": 80,
    "rewardItemId": null,
    "rewardItemQty": 0,
    "rewardXP": 30
  },
  "metaData": null
}
```

Lưu ý: `title`/`description`/`type`/`cycle` trong response giữ nguyên — chỉ `target` và 4 field reward thay đổi.

**Response 400 — validation lỗi** (VD: `target <= 0`, hoặc `rewardItemId` không tồn tại)

```json
{
  "status": false,
  "code": 400,
  "message": "RewardItemId không tồn tại trong danh sách vật phẩm.",
  "data": null
}
```

**Response 404 — id không tồn tại**

```json
{
  "status": false,
  "code": 404,
  "message": "Không tìm thấy nhiệm vụ.",
  "data": null
}
```

**Chú ý hình dạng JSON khác nhau giữa thành công và lỗi:** response 200 có dạng `{ isSuccess, message, data, metaData }`, còn response lỗi (400/404) có dạng `{ status, code, message, data }`. FE nên check theo HTTP status code, không nên dò field `isSuccess` cho trường hợp lỗi.

---

## Ví dụ fetch (JavaScript)

```js
const BASE_URL = 'http://20.40.58.246:5000'; // đổi theo môi trường thật

async function getDailyTasks(token) {
  const res = await fetch(`${BASE_URL}/api/admin/daily-tasks`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const json = await res.json();
  return json.data; // array of DailyTaskAdminDto
}

async function updateDailyTaskConfig(token, id, { target, rewardCurrency, rewardXP, rewardItemId, rewardItemQty }) {
  const res = await fetch(`${BASE_URL}/api/admin/daily-tasks/${id}/config`, {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ target, rewardCurrency, rewardXP, rewardItemId, rewardItemQty }),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message);
  return json.data; // updated DailyTaskAdminDto
}
```

---

## Lưu ý

- Luôn GET trước để lấy `id` chính xác, không hardcode `id` trong FE — danh sách `id` cố định có ở [`docs/daily-task/task-stable-ids.md`](daily-task/task-stable-ids.md) chỉ để tham khảo, không nên dùng để build UI tĩnh.
- API này **không có** endpoint bật/tắt (`isActive`) hay tạo/xóa nhiệm vụ — ngoài phạm vi hiện tại.
- Sửa `target` hoặc reward có hiệu lực **ngay lập tức** cho mọi tiến độ (`UserTaskProgress`) chưa claim trong kỳ hiện tại — không cần đợi reset ngày/tuần. Nếu người chơi đã claim rồi thì không bị ảnh hưởng.
- Nếu giảm `target` xuống thấp hơn tiến độ hiện tại của người chơi, nhiệm vụ đó sẽ thành đủ điều kiện claim ngay khi họ load lại — đây là hành vi mong muốn (live-read), FE admin không cần xử lý gì thêm.
