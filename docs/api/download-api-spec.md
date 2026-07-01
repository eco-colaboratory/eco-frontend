# Tài liệu đặc tả API Tải Game an toàn với Rate Limiting (Backend Spec)

Tài liệu này đặc tả cơ chế bảo mật và giới hạn tần suất (Rate Limiting) cho luồng tải game CHẠM Flora trên Backend, nhằm ngăn chặn việc lộ trực tiếp link S3 cố định, hạn chế tấn công từ chối dịch vụ (DDoS) và tối ưu chi phí băng thông lưu trữ.

---

## 1. Kiến trúc luồng tải game

### Cơ chế thông thường (Không khuyến nghị)
```
Frontend ──(Tải trực tiếp)──> AWS S3 URL cố định (Lộ link, dễ bị scrape/spam tải)
```

### Cơ chế an toàn (Khuyến nghị triển khai)
```
Frontend ──(1) Gửi GET /api/v1/game/download ──> Backend (Kiểm tra IP Rate Limit)
                                                    │
                                             (Đạt giới hạn?)
                                            ┌───────┴───────┐
                                         Có │            Không │ (Tạo Presigned URL 5 phút)
                                            ▼               ▼
                                       Trả về 429      Trả về Presigned S3 URL
```

---

## 2. Đặc tả API Endpoint

### **API Lấy link tải game**

*   **Endpoint:** `/api/v1/game/download`
*   **Method:** `GET`
*   **Authentication:** Không bắt buộc (Public cho mọi người chơi tải game).
*   **Rate Limit:** Tối đa **5 lượt tải / 1 địa chỉ IP / 1 giờ** (Max 5 downloads / IP / hour).

#### **A. Phản hồi thành công (200 OK)**
Trả về đường dẫn S3 Presigned URL có thời gian hết hạn ngắn (Ví dụ: 5 phút).

*   **Response Body:**
```json
{
  "isSuccess": true,
  "downloadUrl": "https://chamflora-intaller.s3.us-east-1.amazonaws.com/ChamFlora_Setup.exe?AWSAccessKeyId=AKIAIOSFODNN7EXAMPLE&Signature=vjbyPxybdZaNmGa%2ByT272YEAiv4%3D&Expires=1782055200",
  "expiresAt": "2026-06-30T15:43:17Z",
  "fileName": "ChamFlora_Setup.exe",
  "fileSizeMb": 148
}
```

#### **B. Phản hồi lỗi vượt quá giới hạn (429 Too Many Requests)**
Trả về khi IP của client đã thực hiện quá 5 lần gọi API thành công trong vòng 1 giờ.

*   **Response Headers:**
    *   `Retry-After`: `3600` (Số giây còn lại cần chờ trước khi có thể tải lại)
*   **Response Body:**
```json
{
  "isSuccess": false,
  "error": "Rate limit exceeded",
  "message": "Bạn đã vượt quá giới hạn tải xuống cho phép (Tối đa 5 lượt/giờ). Vui lòng thử lại sau.",
  "retryAfterSeconds": 3600
}
```

---

## 3. Hướng dẫn thiết kế thuật toán & Lưu trữ dữ liệu

Để kiểm tra Rate Limit theo IP, Backend có thể lưu trữ số lượt tải tạm thời bằng 3 cách sau:

### Phương án A: Sử dụng Redis (Khuyên dùng cho Production)
Redis là giải pháp tối ưu cho hệ thống phân tán (nhiều máy chủ backend chạy song song).
*   **Key format:** `download_limit:{ip}`
*   **Thời gian sống (TTL):** 1 giờ (3600 giây).
*   **Mã giả triển khai (Pseudo-code):**
```javascript
const ip = req.ip;
const redisKey = `download_limit:${ip}`;

// Lấy số lượt tải hiện tại
let currentDownloads = await redis.get(redisKey);

if (currentDownloads !== null) {
  currentDownloads = parseInt(currentDownloads, 10);
  if (currentDownloads >= 5) {
    res.setHeader('Retry-After', await redis.ttl(redisKey));
    return res.status(429).json({
      error: "Rate limit exceeded",
      message: "Bạn đã vượt quá giới hạn tải xuống (5 lượt/giờ)."
    });
  }
  // Tăng số lượt tải lên 1
  await redis.incr(redisKey);
} else {
  // Lần đầu tải, set giá trị bằng 1 và đặt TTL = 1 giờ
  await redis.set(redisKey, 1, 'EX', 3600);
}
```

### Phương án B: Sử dụng Memory Cache (Chỉ dùng khi chạy đơn máy chủ)
Phù hợp khi hệ thống gọn nhẹ và chạy duy nhất một instance Backend (không có cụm cân bằng tải).
*   Có thể dùng các thư viện như `node-cache` (Node.js) hoặc `MemoryCache` (.NET).
*   **Mã giả triển khai:**
```javascript
const ipCache = new Map(); // Lưu cache { ip: { count, expiresAt } }

const ip = req.ip;
const now = Date.now();
const record = ipCache.get(ip);

if (record) {
  if (now > record.expiresAt) {
    // Đã qua 1 giờ, reset lại giới hạn
    ipCache.set(ip, { count: 1, expiresAt: now + 3600000 });
  } else if (record.count >= 5) {
    const waitSeconds = Math.round((record.expiresAt - now) / 1000);
    res.setHeader('Retry-After', waitSeconds);
    return res.status(429).json({ error: "Rate limit exceeded" });
  } else {
    record.count += 1;
  }
} else {
  ipCache.set(ip, { count: 1, expiresAt: now + 3600000 });
}
```

### Phương án C: Lưu lịch sử vào Database (Giải pháp dự phòng)
Sử dụng nếu dự án chưa tích hợp Redis và không muốn mất dữ liệu rate limit khi khởi động lại Backend.
*   **Cấu trúc bảng `download_logs`:**
    *   `ip`: VARCHAR(45)
    *   `downloaded_at`: TIMESTAMP (Default: Current Time)
*   **Mã giả kiểm tra:**
```sql
-- Đếm số lượt tải của IP trong 1 giờ qua
SELECT COUNT(*) FROM download_logs 
WHERE ip = :ip AND downloaded_at > NOW() - INTERVAL 1 HOUR;
```
*   Nếu `count >= 5` thì chặn lại và báo lỗi 429. Nếu thỏa mãn thì ghi thêm 1 bản ghi vào bảng và trả về link tải.

---

## 4. Cách tạo AWS S3 Presigned URL trên Backend

Khi kiểm tra Rate Limit thành công, Backend sẽ tạo một liên kết tạm thời trỏ tới file trên S3 với thời hạn ngắn (ví dụ `Expires: 300` giây - tức 5 phút).

### Ví dụ bằng Node.js (AWS SDK v3):
```typescript
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client({
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

async function generateDownloadUrl() {
  const command = new GetObjectCommand({
    Bucket: "chamflora-intaller",
    Key: "ChamFlora_Setup.exe",
  });

  // Tạo presigned URL có hạn sử dụng là 300 giây (5 phút)
  const presignedUrl = await getSignedUrl(s3Client, command, { expiresIn: 300 });
  return presignedUrl;
}
```

---

## 5. Hướng dẫn tích hợp phía Frontend

Sau khi Backend hoàn thành API, Frontend sẽ được sửa đổi để gọi API này thay vì dùng biến môi trường trực tiếp trỏ vào S3:

1.  Frontend gọi `axios.get('/api/v1/game/download')`.
2.  Nếu thành công (200), lấy `downloadUrl` và chuyển hướng trình duyệt hoặc kích hoạt tải xuống:
    ```javascript
    window.location.assign(res.data.downloadUrl);
    ```
3.  Nếu lỗi (429), hiển thị thông báo thân thiện dạng Toast cảnh báo người dùng đã tải quá nhiều lần và gợi ý họ thử lại sau.
