# Product Variant API Documentation

## 1. List Variants of a Product
- **Endpoint:** `GET /api/products/{productId}/variants`
- **Description:** Lấy danh sách biến thể của 1 sản phẩm
- **Response:**
```json
{
  "success": true,
  "code": "VARIANT_LIST_SUCCESS",
  "message": "Variants fetched successfully.",
  "status": 200,
  "data": [ ... ]
}
```

---

## 2. Create Variant for a Product
- **Endpoint:** `POST /api/products/{productId}/variants`
- **Description:** Thêm biến thể mới cho sản phẩm
- **Body:**
```json
{
  "name": "Áo sơ mi trắng - Size L",
  "sku": "SHIRT-WHITE-L",
  "price": { "base": 250000, "sale": 220000 },
  "attributes": [
    { "key": "color", "value": "white" },
    { "key": "size", "value": "L" }
  ],
  "images": ["https://..."],
  "is_default": true,
  "status": "active"
}
```
- **Response:**
```json
{
  "success": true,
  "code": "VARIANT_CREATE_SUCCESS",
  "message": "Variant created successfully.",
  "status": 201,
  "data": { ... }
}
```

---

## 3. Get Variant Detail
- **Endpoint:** `GET /api/variants/{variantId}`
- **Description:** Lấy chi tiết 1 biến thể
- **Response:**
```json
{
  "success": true,
  "code": "VARIANT_DETAIL_SUCCESS",
  "message": "Variant fetched successfully.",
  "status": 200,
  "data": { ... }
}
```

---

## 4. Update Variant
- **Endpoint:** `PUT /api/variants/{variantId}`
- **Description:** Cập nhật biến thể
- **Body:** (các trường cần cập nhật)
- **Response:**
```json
{
  "success": true,
  "code": "VARIANT_UPDATE_SUCCESS",
  "message": "Variant updated successfully.",
  "status": 200,
  "data": { ... }
}
```

---

## 5. Delete Variant
- **Endpoint:** `DELETE /api/variants/{variantId}`
- **Description:** Xóa biến thể
- **Response:**
```json
{
  "success": true,
  "code": "VARIANT_DELETE_SUCCESS",
  "message": "Variant deleted successfully.",
  "status": 200,
  "data": { ... }
}
```

---

## 6. Error Response
```json
{
  "success": false,
  "code": "INTERNAL_SERVER_ERROR",
  "message": "...",
  "status": 500
}
```
