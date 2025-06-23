# Warehouse API Documentation

## 1. List Warehouses
- **Endpoint:** `GET /api/warehouse`
- **Description:** Lấy danh sách kho
- **Response:**
```json
{
  "success": true,
  "code": "WAREHOUSE_LIST_SUCCESS",
  "message": "Warehouses fetched successfully.",
  "status": 200,
  "data": [ ... ]
}
```

---

## 2. Create Warehouse
- **Endpoint:** `POST /api/warehouse`
- **Description:** Tạo kho mới
- **Body:**
```json
{
  "name": "Kho Hà Nội",
  "address": "123 Đường ABC, Hà Nội",
  "description": "Kho chính khu vực miền Bắc"
}
```
- **Response:**
```json
{
  "success": true,
  "code": "WAREHOUSE_CREATE_SUCCESS",
  "message": "Warehouse created successfully.",
  "status": 201,
  "data": { ... }
}
```

---

## 3. Update Warehouse
- **Endpoint:** `PUT /api/warehouse`
- **Description:** Cập nhật kho (body cần có id)
- **Body:**
```json
{
  "id": "...",
  "name": "Kho Hà Nội Updated",
  "address": "123 Đường ABC, Hà Nội",
  "description": "Kho chính khu vực miền Bắc - cập nhật"
}
```
- **Response:**
```json
{
  "success": true,
  "code": "WAREHOUSE_UPDATE_SUCCESS",
  "message": "Warehouse updated successfully.",
  "status": 200,
  "data": { ... }
}
```

---

## 4. Delete Warehouse
- **Endpoint:** `DELETE /api/warehouse`
- **Description:** Xóa kho (body cần có id)
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
  "code": "WAREHOUSE_DELETE_SUCCESS",
  "message": "Warehouse deleted successfully.",
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
