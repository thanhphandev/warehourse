# Inventory API Documentation

API endpoint: `/api/inventory`

## 1. GET /api/inventory
Lấy danh sách tồn kho, hỗ trợ lọc và phân trang.

### Query Params
- `variant_id` (string, optional): Lọc theo mã biến thể sản phẩm
- `warehouse_id` (string, optional): Lọc theo mã kho
- `page` (number, optional, default=1): Trang
- `limit` (number, optional, default=20): Số bản ghi/trang

### Response
```json
{
  "success": true,
  "code": "INVENTORY_LIST_SUCCESS",
  "message": "Inventory fetched successfully.",
  "status": 200,
  "data": [
    {
      "_id": "...",
      "variant_id": "...",
      "warehouse_id": "...",
      "quantity": 100,
      "updated_at": "2025-06-23T10:00:00.000Z"
    }
  ],
  "pagination": { "page": 1, "limit": 20, "total": 100 }
}
```

## 2. POST /api/inventory
Tạo mới bản ghi tồn kho cho một biến thể tại một kho.

### Request Body
```json
{
  "variant_id": "string (ObjectId)",
  "warehouse_id": "string (ObjectId)",
  "quantity": 100
}
```

### Response
- Thành công:
```json
{
  "success": true,
  "code": "INVENTORY_CREATE_SUCCESS",
  "message": "Inventory created successfully.",
  "status": 201,
  "data": { ... }
}
```
- Lỗi trùng lặp:
```json
{
  "success": false,
  "code": "DUPLICATE_INVENTORY",
  "message": "Inventory record already exists for this variant and warehouse.",
  "status": 409
}
```

## 3. PATCH /api/inventory?id=...
Cập nhật số lượng tồn kho theo id.

### Query Params
- `id` (string, required): Mã inventory

### Request Body
```json
{
  "quantity": 120
}
```

### Response
```json
{
  "success": true,
  "code": "INVENTORY_UPDATE_SUCCESS",
  "message": "Inventory updated successfully.",
  "status": 200,
  "data": { ... }
}
```

## 4. DELETE /api/inventory?id=...
Xoá bản ghi tồn kho theo id.

### Query Params
- `id` (string, required): Mã inventory

### Response
```json
{
  "success": true,
  "code": "INVENTORY_DELETE_SUCCESS",
  "message": "Inventory deleted successfully.",
  "status": 200,
  "data": { ... }
}
```

## 5. Error Codes
- `INVALID_QUERY_PARAMS`: Tham số truy vấn không hợp lệ
- `VALIDATION_ERROR`: Dữ liệu đầu vào không hợp lệ
- `VARIANT_NOT_FOUND`: Không tìm thấy biến thể sản phẩm
- `WAREHOUSE_NOT_FOUND`: Không tìm thấy kho
- `DUPLICATE_INVENTORY`: Đã tồn tại bản ghi tồn kho
- `INVENTORY_NOT_FOUND`: Không tìm thấy bản ghi tồn kho
- `INTERNAL_SERVER_ERROR`: Lỗi hệ thống

## 6. Notes
- `variant_id` và `warehouse_id` phải hợp lệ và tồn tại trong hệ thống.
- Không thể tạo trùng inventory cho cùng một cặp variant_id + warehouse_id.
- Số lượng (`quantity`) phải là số nguyên không âm.
