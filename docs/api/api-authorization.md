# Phân quyền API — Admin & SuperAdmin

Tài liệu thống kê các endpoint yêu cầu role **Admin** hoặc **SuperAdmin** (`[Authorize(Roles = "Admin,SuperAdmin")]`).

_Cập nhật theo codebase hiện tại._

---

## Chi tiết theo controller

### `ApiConfigsController` — toàn bộ controller

Controller gắn `[Authorize(Roles = "Admin,SuperAdmin")]` ở cấp class → mọi action đều yêu cầu Admin/SuperAdmin.

| Method | Route | Mô tả |
|--------|-------|--------|
| `POST` | `/api/apiconfigs` | Tạo cấu hình API |

---

### `UserController`

| Method | Route | Mô tả |
|--------|-------|--------|
| `GET` | `/api/user` | Danh sách player (phân trang) |
params: isBanned, sortBy, sortDescending, page, pageSize
response :
{
  "isSuccess": true,
  "message": "string",
  "data": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "email": "string",
      "username": "string",
      "firstName": "string",
      "lastName": "string",
      "role": "string",
      "currency": 0,
      "level": 0,
      "isBanned": true
    }
  ],
  "metaData": 
  {
    "currentPage": 1,
    "pageSize": 10,
    "totalItems": 15,
    "totalPages": 2
  }
}
| `GET` | `/api/user/{userId}` | Chi tiết user theo ID |
| `POST` | `/api/user` | Admin tạo user |
| `PUT` | `/api/user/{userId}` | Admin cập nhật user |
| `POST` | `/api/user/{userId}/ban` | Cấm user |
| `POST` | `/api/user/{userId}/unban` | Bỏ cấm user |

---

### `ItemsController`

| Method | Route | Mô tả |
|--------|-------|--------|
| `POST` | `/api/items` | Tạo item |
REQUEST:
{
  "name": "string",
  "price": 0,
  "imageUrl": "string",
  "cooldownTime": 0,
  "type": 0,
  "receivedExp": 0
}
| `PUT` | `/api/items/{id}` | Cập nhật item |
REQUEST: 
{
  "name": "string",
  "price": 0,
  "imageUrl": "string",
  "cooldownTime": 0,
  "type": 0,
  "receivedExp": 0
}
| `DELETE` | `/api/items/{id}` | Xóa item (soft delete) |

**Public (không yêu cầu Admin/SuperAdmin):**

| Method | Route | Ghi chú |
|--------|-------|---------|
| `GET` | `/api/items` | Không có `[Authorize]` |
params: IsDeleted, Type, Search, SortBy, SortDescending, Page, PageSize
response: 
{
  "isSuccess": true,
  "message": "string",
  "data": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "name": "string",
      "price": 0,
      "imageUrl": "string",
      "cooldownTime": 0,
      "type": 0,
      "receivedExp": 0,
      "isDeleted": true
    }
  ],
  "metaData": {}
}
| `GET` | `/api/items/{id}` | Không có `[Authorize]` |

---

### `DecorsController`

| Method | Route | Mô tả |
|--------|-------|--------|
| `POST` | `/api/decors` | Tạo decor |
REQUEST: 
{
  "name": "string",
  "price": 0,
  "imageUrl": "string"
}
| `PUT` | `/api/decors/{id}` | Cập nhật decor |
REQUEST: 
{
  "name": "string",
  "price": 0,
  "imageUrl": "string"
}
| `DELETE` | `/api/decors/{id}` | Xóa decor |

**Public:**

| Method | Route | Ghi chú |
|--------|-------|---------|
| `GET` | `/api/decors` | Không có `[Authorize]` |
params: IsDeleted, Search, SortBy, SortDescending, Page, PageSize
response:
{
  "isSuccess": true,
  "message": "string",
  "data": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "name": "string",
      "price": 0,
      "imageUrl": "string",
      "isDeleted": true
    }
  ],
  "metaData": {}
}
| `GET` | `/api/decors/{id}` | Không có `[Authorize]` |

---

### `SynergiesController`

| Method | Route | Mô tả |
|--------|-------|--------|
| `POST` | `/api/synergies` | Tạo synergy |
{
  "name": "string",
  "xpPlus": 0,
  "cooldownMinus": 0,
  "flowerTemplateIds": [
    "3fa85f64-5717-4562-b3fc-2c963f66afa6"
  ]
}
| `PUT` | `/api/synergies/{id}` | Cập nhật synergy |
{
  "name": "string",
  "xpPlus": 0,
  "cooldownMinus": 0,
  "flowerTemplateIds": [
    "3fa85f64-5717-4562-b3fc-2c963f66afa6"
  ]
}
| `DELETE` | `/api/synergies/{id}` | Xóa synergy |

**Public:**

| Method | Route | Ghi chú |
|--------|-------|---------|
| `GET` | `/api/synergies` | Không có `[Authorize]` |
params:  IsDeleted, Search, SortBy, SortDescending, Page, PageSize
response :
{
  "isSuccess": true,
  "message": "string",
  "data": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "name": "string",
      "xpPlus": 0,
      "cooldownMinus": 0,
      "isDeleted": true,
      "flowerTemplates": [
        {
          "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "name": "string",
          "basePrice": 0,
          "imageUrl": "string",
          "synergyId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "isDeleted": true
        }
      ]
    }
  ],
  "metaData": {}
}
| `GET` | `/api/synergies/{id}` | Không có `[Authorize]` |

---

### `FlowerTemplatesController`

| Method | Route | Mô tả |
|--------|-------|--------|
| `POST` | `/api/flowertemplates` | Tạo mẫu hoa |
{
  "name": "string",
  "price": 0,
  "imageUrl": "string"
}
| `PUT` | `/api/flowertemplates/{id}` | Cập nhật mẫu hoa |
{
  "name": "string",
  "price": 0,
  "imageUrl": "string"
}
| `DELETE` | `/api/flowertemplates/{id}` | Xóa mẫu hoa |

**Public:**

| Method | Route | Ghi chú |
|--------|-------|---------|
| `GET` | `/api/flowertemplates` | Không có `[Authorize]` |
params: IsDeleted, Search, SortBy, SortDescending, Page, PageSize
response: 
{
  "isSuccess": true,
  "message": "string",
  "data": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "name": "string",
      "basePrice": 0,
      "imageUrl": "string",
      "synergyId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "isDeleted": true
    }
  ],
  "metaData": {}
}
| `GET` | `/api/flowertemplates/{id}` | Không có `[Authorize]` |

---

## API không thuộc Admin/SuperAdmin (đối chiếu)

### Public — `AuthController`

| Method | Route | Mô tả |
|--------|-------|--------|
| `POST` | `/api/auth/login` | Đăng nhập |
payload
{
  "account": "string",
  "password": "string"
}
response
{
  "isSuccess": true,
  "message": "string",
  "data": {
    "accessToken": "string",
    "refreshToken": "string"
  },
  "metaData": "string"
}
| `POST` | `/api/auth/register` | Đăng ký |
payload
{
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "username": "string",
  "password": "string"
}
response
{
  "isSuccess": true,
  "message": "string",
  "data": {
    "accessToken": "string",
    "refreshToken": "string"
  },
  "metaData": "string"
}

| `POST` | `/api/auth/refresh-token` | Làm mới token |
payload
{
  "refreshToken": "string"
}
response
{
  "isSuccess": true,
  "message": "string",
  "data": {
    "accessToken": "string",
    "refreshToken": "string"
  },
  "metaData": "string"
}

decoded jwt 
{
  "id": "824c7e25-06b1-4d9c-bef2-39b3d34ba60b",
  "email": "",
  "username": "admin",
  "name": "admin 1",
  "role": "Admin",
  "exp": 1779643408,
  "iss": "ECOGAME",
  "aud": "ECOGAMEClients"
}


### Chỉ `Player` — `AuthController`

| Method | Route | Mô tả |
|--------|-------|--------|
| `GET` | `/api/auth/profile` | Lấy thông tin cá nhân |
| `PUT` | `/api/auth/profile` | Cập nhật thông tin cá nhân |
| `PUT` | `/api/auth/change-password` | Đổi mật khẩu |

---


## Danh sách nhanh — 19 endpoint Admin/SuperAdmin

```
POST   /api/apiconfigs
GET    /api/user
GET    /api/user/{userId}
POST   /api/user
PUT    /api/user/{userId}
POST   /api/user/{userId}/ban
POST   /api/user/{userId}/unban
POST   /api/items
PUT    /api/items/{id}
DELETE /api/items/{id}
POST   /api/decors
PUT    /api/decors/{id}
DELETE /api/decors/{id}
POST   /api/synergies
PUT    /api/synergies/{id}
DELETE /api/synergies/{id}
POST   /api/flowertemplates
PUT    /api/flowertemplates/{id}
DELETE /api/flowertemplates/{id}
```
