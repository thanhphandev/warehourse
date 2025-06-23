# Category API Documentation

## 1. List Categories
- **Endpoint:** `GET /api/category`
- **Description:** Lấy danh sách category
- **Response:**
```json
{
  "success": true,
  "code": "CATEGORY_LIST_SUCCESS",
  "message": "Categories fetched successfully.",
  "status": 200,
  "data": [ ... ]
}
```

---

## 2. Create Category
- **Endpoint:** `POST /api/category`
- **Description:** Tạo category mới
- **Body:**
```json
{
  "name": "Áo thun",
  "slug": "ao-thun",
  "description": "Danh mục áo thun"
}
```
- **Response:**
```json
{
  "success": true,
  "code": "CATEGORY_CREATE_SUCCESS",
  "message": "Category created successfully.",
  "status": 201,
  "data": { ... }
}
```

---

## 3. Update Category
- **Endpoint:** `PUT /api/category`
- **Description:** Cập nhật category (body cần có id)
- **Body:**
```json
{
  "id": "...",
  "name": "Áo thun updated",
  "slug": "ao-thun",
  "description": "Mô tả mới"
}
```
- **Response:**
```json
{
  "success": true,
  "code": "CATEGORY_UPDATE_SUCCESS",
  "message": "Category updated successfully.",
  "status": 200,
  "data": { ... }
}
```

---

## 4. Delete Category
- **Endpoint:** `DELETE /api/category`
- **Description:** Xóa category (body cần có id)
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
  "code": "CATEGORY_DELETE_SUCCESS",
  "message": "Category deleted successfully.",
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
