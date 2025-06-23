# Product API Documentation

## 1. List Products
- **Endpoint:** `GET /api/products`
- **Description:** Lấy danh sách sản phẩm, hỗ trợ filter, tìm kiếm, phân trang.
- **Query Params:**
  - `status` (string): Trạng thái sản phẩm (`draft`, `published`, `archived`)
  - `brand_id` (string): Lọc theo brand
  - `category_id` (string): Lọc theo category
  - `search` (string): Tìm kiếm theo tên
  - `page` (number): Trang (default: 1)
  - `limit` (number): Số lượng/trang (default: 20)
- **Response:**
```json
{
  "success": true,
  "code": "PRODUCT_LIST_SUCCESS",
  "message": "Products fetched successfully.",
  "status": 200,
  "data": [ ... ],
  "pagination": { "page": 1, "limit": 20, "total": 100 }
}
```

---

## 2. Get Product Detail
- **Endpoint:** `GET /api/products/{productId}`
- **Description:** Lấy chi tiết 1 sản phẩm
- **Response:**
```json
{
  "success": true,
  "code": "PRODUCT_DETAIL_SUCCESS",
  "message": "Product fetched successfully.",
  "status": 200,
  "data": { ... }
}
```

---

## 3. Create Product
- **Endpoint:** `POST /api/products`
- **Description:** Tạo sản phẩm mới
- **Body:**
```json
{
  "name": "Áo sơ mi tay ngắn",
  "slug": "ao-so-mi-tay-ngan",
  "description": "Cotton 100%",
  "brand_id": "...",
  "category_ids": ["..."],
  "tags": ["nam", "cotton"],
  "status": "draft"
}
```
- **Response:**
```json
{
  "success": true,
  "code": "PRODUCT_CREATE_SUCCESS",
  "message": "Product created successfully.",
  "status": 201,
  "data": { ... }
}
```

---

## 4. Update Product
- **Endpoint:** `PUT /api/products/{productId}`
- **Description:** Cập nhật thông tin sản phẩm
- **Body:** (các trường cần cập nhật)
- **Response:**
```json
{
  "success": true,
  "code": "PRODUCT_UPDATE_SUCCESS",
  "message": "Product updated successfully.",
  "status": 200,
  "data": { ... }
}
```

---

## 5. Delete Product
- **Endpoint:** `DELETE /api/products/{productId}`
- **Description:** Xóa sản phẩm
- **Response:**
```json
{
  "success": true,
  "code": "PRODUCT_DELETE_SUCCESS",
  "message": "Product deleted successfully.",
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
