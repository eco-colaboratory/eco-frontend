# Game Download API — FE Integration Guide

Cho phép người dùng tải installer game (`ChamFlora_Setup.exe`) thông qua một link tạm thời hết hạn sau **5 phút**, không lộ URL file thật. BE giới hạn **5 lần tải / IP / giờ**.

---

## Tổng quan luồng

```
FE                              BE                           Redis
 │                               │                             │
 │── GET /api/v1/game/download ──>│                             │
 │                               │── check download_limit:{ip} ─>│
 │                               │<─ count / not found ─────────│
 │                               │── set token (TTL 5 phút) ───>│
 │<── 200 { downloadUrl, ... } ──│                             │
 │                               │                             │
 │── GET /api/v1/game/download/file?token=xxx ──>│             │
 │                               │── get & delete token ───────>│
 │<── 302 Location: <S3 URL> ────│                             │
 │                               │                             │
 │── (browser tự follow redirect → tải file) ──────────────────│
```

---

## Authentication

**Không cần JWT.** Cả 2 endpoint đều public — không gửi header `Authorization`.

---

## Endpoint 1 — Lấy link tải

**`GET /api/v1/game/download`**

### Response thành công — `200 OK`

```json
{
  "isSuccess": true,
  "downloadUrl": "/api/v1/game/download/file?token=a1b2c3d4e5f6...",
  "expiresAt": "2026-06-30T15:43:17.0000000Z",
  "fileName": "ChamFlora_Setup.exe",
  "fileSizeMb": 148
}
```

| Field | Mô tả |
|-------|-------|
| `downloadUrl` | Link dùng để tải — chỉ dùng được **1 lần** trong **5 phút** |
| `expiresAt` | ISO 8601 UTC — thời điểm token hết hạn |
| `fileName` | Tên file để hiển thị cho user |
| `fileSizeMb` | Dung lượng MB để hiển thị |

### Response vượt rate limit — `429 Too Many Requests`

Header: `Retry-After: <seconds>`

```json
{
  "isSuccess": false,
  "error": "Rate limit exceeded",
  "message": "Bạn đã vượt quá giới hạn tải xuống cho phép (Tối đa 5 lượt/giờ). Vui lòng thử lại sau.",
  "retryAfterSeconds": 3421
}
```

`retryAfterSeconds` là số giây còn lại cần chờ (chính xác theo cửa sổ 1 giờ tính từ lần tải đầu tiên, không phải fixed 3600).

---

## Endpoint 2 — Tải file (follow redirect)

**`GET /api/v1/game/download/file?token=<token>`**

FE **không cần gọi endpoint này trực tiếp** — chỉ cần assign `downloadUrl` vào `window.location` hoặc thẻ `<a>`, browser sẽ tự follow redirect 302 về file thật.

### Response hợp lệ — `302 Found`

Header: `Location: <URL file thật>`

Browser tự tải file.

### Response token không hợp lệ / hết hạn / đã dùng — `404 Not Found`

```json
{
  "isSuccess": false,
  "error": "Invalid or expired token",
  "message": "Token không hợp lệ hoặc đã hết hạn. Vui lòng yêu cầu link tải mới."
}
```

### Response BE lỗi — `503 Service Unavailable`

```json
{
  "isSuccess": false,
  "error": "Service temporarily unavailable"
}
```

---

## Hướng dẫn implement FE

### 1. Gọi API lấy link

```javascript
async function getDownloadUrl() {
  const res = await axios.get('/api/v1/game/download')
  return res.data // { isSuccess, downloadUrl, expiresAt, fileName, fileSizeMb }
}
```

### 2. Trigger download

```javascript
// Cách đơn giản nhất — browser tự follow 302 redirect
window.location.assign(downloadUrl)

// Hoặc dùng thẻ <a> ẩn nếu muốn không rời trang
const a = document.createElement('a')
a.href = downloadUrl
a.click()
```

> **Không dùng `axios.get(downloadUrl)`** — axios follow redirect nhưng không trigger browser download. Phải dùng `window.location` hoặc thẻ `<a>`.

### 3. Xử lý lỗi 429

```javascript
async function handleDownload() {
  try {
    const { data } = await axios.get('/api/v1/game/download')
    window.location.assign(data.downloadUrl)
  } catch (err) {
    if (err.response?.status === 429) {
      const { retryAfterSeconds, message } = err.response.data
      const minutes = Math.ceil(retryAfterSeconds / 60)
      // Hiển thị toast: message hoặc tự format
      showToast(`Bạn đã tải quá nhiều lần. Thử lại sau ${minutes} phút.`, 'warning')
    } else {
      showToast('Không thể tải file. Vui lòng thử lại sau.', 'error')
    }
  }
}
```

### 4. Hiển thị thông tin file trước khi tải (optional)

```javascript
const { fileName, fileSizeMb, expiresAt } = data
// Ví dụ: "ChamFlora_Setup.exe — 148 MB"
// Link hết hạn lúc: new Date(expiresAt).toLocaleTimeString()
```

---

## Lưu ý quan trọng

| # | Lưu ý |
|---|-------|
| 1 | `downloadUrl` **chỉ dùng được 1 lần** — sau khi redirect xong, token bị xóa ngay |
| 2 | Token hết hạn sau **5 phút** kể từ khi nhận được |
| 3 | Rate limit tính theo **IP**, không theo user — 5 lần/giờ trên cùng mạng |
| 4 | `retryAfterSeconds` là giây còn lại trong cửa sổ 1 giờ **hiện tại**, không phải luôn = 3600 |
| 5 | Nếu user click download 2 lần cùng lúc — lần 2 sẽ nhận 404 (token đã bị consume bởi lần 1) |
| 6 | URL file thật không bao giờ xuất hiện trong response của `/api/v1/game/download` |

---

## Ví dụ flow UI khuyến nghị

```
[Nút "Tải Game"]
      │
      ▼
Gọi GET /api/v1/game/download
      │
  ┌───┴───────────────┐
200 OK              429 Too Many
      │                   │
assign downloadUrl    Toast: "Thử lại sau X phút"
      │
Browser tải file (302 → S3)
      │
  ┌───┴───────────────┐
Tải thành công     Lỗi mạng / 404
                       │
               Toast: "Vui lòng lấy link mới"
               + gọi lại GET /api/v1/game/download
```
