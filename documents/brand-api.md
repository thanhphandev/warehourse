# Brand API Documentation

## 1. List Brands
- **Endpoint:** `GET /api/brand`
- **Description:** Lấy danh sách brand
- **Response:**
```json
{
  "success": true,
  "code": "BRAND_LIST_SUCCESS",
  "message": "Brands fetched successfully.",
  "status": 200,
  "data": [ ... ]
}
```

---

## 2. Create Brand
- **Endpoint:** `POST /api/brand`
- **Description:** Tạo brand mới
- **Body:**
```json
{
  "name": "Nike",
  "slug": "nike",
  "logo": "https://...",
  "description": "Thương hiệu thể thao nổi tiếng"
}
```
- **Response:**
```json
{
  "success": true,
  "code": "BRAND_CREATE_SUCCESS",
  "message": "Brand created successfully.",
  "status": 201,
  "data": { ... }
}
```

---

## 3. Update Brand
- **Endpoint:** `PUT /api/brand`
- **Description:** Cập nhật brand (body cần có id)
- **Body:**
```json
{
  "id": "...",
  "name": "Nike Updated",
  "slug": "nike",
  "logo": "https://...",
  "description": "Mô tả mới"
}
```
- **Response:**
```json
{
  "success": true,
  "code": "BRAND_UPDATE_SUCCESS",
  "message": "Brand updated successfully.",
  "status": 200,
  "data": { ... }
}
```

---

## 4. Delete Brand
- **Endpoint:** `DELETE /api/brand`
- **Description:** Xóa brand (body cần có id)
- **Body:**
```json
{
  "id": "..."
}
```
- **Response:**
```json
{
  "success": true,
  "code": "BRAND_DELETE_SUCCESS",
  "message": "Brand deleted successfully.",
  "status": 200,
  "data": { ... }
}
```

---

## 5. Error Response
```json
{
  "success": false,
  "code": "INTERNAL_SERVER_ERROR",
  "message": "...",
  "status": 500
}
```
