# Coin Top-up via PayOS (FE Web Integration Guide)

Cho phép người chơi nạp coin thật bằng tiền (VNĐ) thông qua PayOS, từ một **trang web riêng (web checkout)** — không phải app Godot. Người chơi đăng nhập bằng tài khoản game hiện có trước, sau đó chọn gói coin, tạo đơn hàng, và được redirect sang `checkoutUrl` do PayOS host (PayOS tự hiển thị QR/chuyển khoản, BE/FE không tự vẽ QR).

**Vì sao không làm trong app:** app phân phối qua Google Play, yêu cầu Google Play Billing cho giao dịch coin ảo nếu mua trong app. Đưa toàn bộ luồng mua ra một trang web ngoài app tránh được yêu cầu này. App Godot **không có** UI/link nào trỏ tới trang web này.

---

## Authentication

Tất cả 3 endpoint cho người chơi yêu cầu JWT Bearer token của user role `Player` — dùng **chung** access token với app Godot (cùng hệ thống login):

```
Authorization: Bearer <accessToken>
```

Lấy token qua `POST /api/auth/login` (xem tài liệu auth hiện có).

Endpoint webhook (`POST /api/payments/webhook`) là **server-to-server giữa PayOS và BE**, FE không gọi và không cần quan tâm — chỉ liệt kê ở đây để FE hiểu toàn cảnh.

---

## Trước khi tích hợp: `returnUrl` / `cancelUrl`

`returnUrl` và `cancelUrl` (trang PayOS redirect về sau khi thanh toán xong/huỷ) được cấu hình **cố định ở phía BE** (biến môi trường `PAYOS_RETURN_URL` / `PAYOS_CANCEL_URL`), **không** gửi theo từng request tạo đơn — đây không phải field trong API.

Hiện đang tạm trỏ về:

```
PAYOS_RETURN_URL=https://eco-frontend-zeta.vercel.app/payment-success
PAYOS_CANCEL_URL=https://eco-frontend-zeta.vercel.app/payment-cancel
```

2 route `/payment-success` và `/payment-cancel` **chưa tồn tại** trên FE (`eco-frontend-zeta.vercel.app` hiện chỉ là landing page) — đây là URL tạm để BE test luồng PayOS. FE team cần tạo đúng 2 route này (hoặc báo BE route thật để đổi lại) trước khi go-live; trang `returnUrl` phải tự gọi GET status (xem bước 5 dưới) để biết kết quả thật, không dựa vào việc redirect thành công hay không.

---

## Luồng sử dụng

1. Người chơi đăng nhập (web dùng chung login với app) → có JWT.
2. **GET `/api/coin-packages`** → hiển thị danh sách gói coin cố định.
3. Người chơi chọn 1 gói → **POST `/api/payments/orders`** → nhận `checkoutUrl` → redirect/mở `checkoutUrl` (trang PayOS, không phải trang của mình).
4. Người chơi thanh toán trên PayOS → PayOS redirect về `returnUrl`/`cancelUrl` (đã cấu hình ở BE) **hoặc** đóng tab.
5. Trang `returnUrl` của FE nên gọi **GET `/api/payments/orders/{orderCode}/status`** để xác nhận trạng thái thật (không tin redirect URL — PayOS có thể redirect về `returnUrl` ngay cả khi chưa chắc đã `Paid`, BE xử lý credit qua webhook + reconciliation độc lập với redirect). Có thể poll vài lần (vài giây/lần) nếu vẫn `Pending`, vì webhook có thể đến trễ vài giây.
6. Khi `status = "Paid"`, hiển thị thành công + `currentCurrency` mới của người chơi.

---

## GET /api/coin-packages

Lấy danh sách gói coin cố định (hiện 4 gói, hard-code ở BE, không có CRUD).

**Request**

```http
GET /api/coin-packages
Authorization: Bearer <token>
```

**Response 200**

```json
{
  "isSuccess": true,
  "message": "Lấy danh sách gói nạp coin thành công.",
  "data": [
    { "id": "b0000000-c01n-0001-0001-000000000001", "priceVnd": 20000,  "coinAmount": 200 },
    { "id": "b0000000-c01n-0001-0001-000000000002", "priceVnd": 50000,  "coinAmount": 500 },
    { "id": "b0000000-c01n-0001-0001-000000000003", "priceVnd": 100000, "coinAmount": 1000 },
    { "id": "b0000000-c01n-0001-0001-000000000004", "priceVnd": 200000, "coinAmount": 2000 }
  ],
  "metaData": null
}
```

(`id` thật là GUID random sinh khi seed DB — ví dụ trên chỉ minh hoạ hình dạng, FE phải GET thật, không hardcode.)

| Field | Type | Mô tả |
|---|---|---|
| `id` | string (GUID) | Dùng làm `packageId` khi gọi POST tạo đơn |
| `priceVnd` | int | Giá tiền thật (VNĐ) |
| `coinAmount` | int | Số coin nhận được — đây là số sẽ được cộng vào tài khoản, **không phụ thuộc** số tiền PayOS báo về |

---

## POST /api/payments/orders

Tạo đơn hàng PayOS cho 1 gói coin, trả về `checkoutUrl` để redirect người chơi sang.

**Request**

```http
POST /api/payments/orders
Authorization: Bearer <token>
Content-Type: application/json
```

```json
{ "packageId": "b0000000-c01n-0001-0001-000000000002" }
```

| Field | Type | Bắt buộc | Validation |
|---|---|---|---|
| `packageId` | string (GUID) | Có | Phải khác `Guid.Empty`; phải là `id` thật lấy từ GET `/api/coin-packages` |

**Response 200**

```json
{
  "isSuccess": true,
  "message": "Tạo đơn nạp coin thành công.",
  "data": {
    "orderCode": 1750412345123,
    "checkoutUrl": "https://pay.payos.vn/web/abcd1234efgh",
    "expiresAtUnix": 1750413245
  },
  "metaData": null
}
```

| Field | Type | Mô tả |
|---|---|---|
| `orderCode` | long (number) | Mã đơn — dùng để poll trạng thái ở endpoint status |
| `checkoutUrl` | string | URL PayOS host — **redirect/mở trực tiếp URL này**, không tự vẽ QR |
| `expiresAtUnix` | long (unix timestamp, giây) | Đơn hết hạn sau khi tạo **15 phút** — quá hạn mà chưa thanh toán thì không thể `Paid` được nữa (status sẽ thành `Expired`) |

**Response lỗi** (hình dạng `{ status, code, message, data }`, khác hình dạng response 200):

| Code | Khi nào | Message |
|---|---|---|
| 400 | `packageId` rỗng/sai định dạng, hoặc gói `isActive = false` | tuỳ trường hợp |
| 401 | Thiếu/sai JWT | — |
| 404 | `packageId` không tồn tại | "Không tìm thấy gói nạp coin." |
| 502 | PayOS API lỗi/timeout khi tạo link thanh toán | "Tạo đơn nạp coin thất bại. Vui lòng thử lại." |

```json
{ "status": false, "code": 404, "message": "Không tìm thấy gói nạp coin.", "data": null }
```

---

## GET /api/payments/orders/{orderCode}/status

Kiểm tra trạng thái 1 đơn hàng (theo `orderCode` lấy từ response tạo đơn).

**Request**

```http
GET /api/payments/orders/1750412345123/status
Authorization: Bearer <token>
```

**Response 200**

```json
{
  "isSuccess": true,
  "message": "Lấy trạng thái đơn nạp coin thành công.",
  "data": {
    "orderCode": 1750412345123,
    "status": "Paid",
    "currentCurrency": 1500
  },
  "metaData": null
}
```

| Field | Type | Mô tả |
|---|---|---|
| `orderCode` | long | — |
| `status` | string | `"Pending"` \| `"Paid"` \| `"Cancelled"` \| `"Expired"` |
| `currentCurrency` | int \| null | Số coin hiện tại của người chơi **sau khi cộng** — chỉ có giá trị (khác `null`) khi `status = "Paid"`; các trạng thái khác luôn `null` |

**Response lỗi**

| Code | Khi nào |
|---|---|
| 400 | JWT không hợp lệ (không parse được userId) |
| 401 | Thiếu/sai JWT |
| 404 | `orderCode` không tồn tại, hoặc thuộc về user khác (BE không phân biệt 2 trường hợp này để tránh lộ thông tin đơn của người khác) |

**Lưu ý quan trọng:** đơn `Pending` quá 15 phút sẽ tự chuyển `Expired` khi được poll (BE check lười, không cần cron riêng để FE thấy đúng trạng thái). Một đơn `Expired` **vẫn có thể** chuyển `Paid` sau đó nếu PayOS báo thanh toán thành công trễ (ví dụ người chơi thanh toán đúng lúc sắp hết 15 phút) — đây là hành vi đúng, không phải bug; FE nên tiếp tục poll thêm vài lần ngay cả khi thấy `Expired` gần mốc 15 phút, hoặc đơn giản là tin tưởng giá trị `status` mới nhất mỗi lần gọi.

---

## Ví dụ fetch (JavaScript)

```js
const BASE_URL = 'http://20.40.58.246:5000'; // đổi theo môi trường thật

async function getCoinPackages(token) {
  const res = await fetch(`${BASE_URL}/api/coin-packages`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const json = await res.json();
  return json.data; // array of { id, priceVnd, coinAmount }
}

async function createOrder(token, packageId) {
  const res = await fetch(`${BASE_URL}/api/payments/orders`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ packageId }),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message);
  return json.data; // { orderCode, checkoutUrl, expiresAtUnix }
}

async function getOrderStatus(token, orderCode) {
  const res = await fetch(`${BASE_URL}/api/payments/orders/${orderCode}/status`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message);
  return json.data; // { orderCode, status, currentCurrency }
}

// Luồng đầy đủ: chọn gói -> tạo đơn -> redirect sang PayOS
async function startTopup(token, packageId) {
  const order = await createOrder(token, packageId);
  window.location.href = order.checkoutUrl; // redirect khỏi trang của mình
}

// Trang returnUrl: poll vài lần để chờ webhook xử lý xong
async function pollUntilSettled(token, orderCode, { maxAttempts = 10, intervalMs = 2000 } = {}) {
  for (let i = 0; i < maxAttempts; i++) {
    const status = await getOrderStatus(token, orderCode);
    if (status.status !== 'Pending') return status; // Paid / Cancelled / Expired
    await new Promise((r) => setTimeout(r, intervalMs));
  }
  return getOrderStatus(token, orderCode); // trả về lần cuối, để FE tự quyết định UI (vẫn đang chờ)
}
```

---

## Lưu ý

- **Không tin số tiền/redirect** — chỉ tin `status`/`currentCurrency` lấy từ GET status. Số coin cộng vào luôn lấy theo `coinAmount` của gói lúc tạo đơn, không phải số tiền PayOS báo về, nên không cần FE validate số tiền.
- `checkoutUrl` chỉ dùng được **một lần** cho đúng đơn đó — không cache để dùng lại; mỗi lần người chơi muốn nạp coin phải gọi `POST /api/payments/orders` để tạo đơn mới (kể cả khi chọn lại đúng gói cũ).
- Không có endpoint hủy đơn thủ công cho người chơi — đơn tự `Expired` sau 15 phút nếu không thanh toán.
- Response 200 có hình dạng `{ isSuccess, message, data, metaData }`; response lỗi (400/401/404/502) có hình dạng `{ status, code, message, data }` — FE nên check theo HTTP status code, không dò field `isSuccess` để phát hiện lỗi.
- 4 gói coin hiện tại hard-code ở BE (không có trang quản trị tạo/sửa gói) — nếu cần thêm/đổi gói, báo BE team sửa trực tiếp, không có API riêng cho việc này.
