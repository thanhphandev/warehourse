Dưới đây là danh sách **API endpoints cần có** cho hệ thống `Product` và `ProductVariant` mà bạn đã thiết kế — theo **RESTful tiêu chuẩn**, kèm mô tả, mục đích và suggestion cho body request nếu cần.

---

## ✅ PRODUCT API ENDPOINTS

### 1. `GET /api/products`

**Mục đích:** Lấy danh sách sản phẩm (có filter, phân trang, tìm kiếm)

**Query params gợi ý:**

```http
GET /api/products?status=published&brand_id=...&category_id=...&search=ao-thun&page=1&limit=20
```

---

### 2. `GET /api/products/:id`

**Mục đích:** Lấy chi tiết 1 sản phẩm (có thể kèm theo biến thể)

---

### 3. `POST /api/products`

**Mục đích:** Tạo sản phẩm mới

**Body:**

```json
{
  "name": "Áo sơ mi tay ngắn",
  "slug": "ao-so-mi-tay-ngan",
  "description": "Cotton 100%",
  "brand_id": "665abc...",
  "category_ids": ["665def...", "665xyz..."],
  "tags": ["nam", "cotton"],
  "status": "draft"
}
```

---

### 4. `PUT /api/products/:id`

**Mục đích:** Cập nhật thông tin sản phẩm

---

### 5. `DELETE /api/products/:id`

**Mục đích:** Xóa sản phẩm (hoặc `soft delete` nếu bạn muốn giữ data)

---

## ✅ PRODUCT VARIANT API ENDPOINTS

### 6. `GET /api/products/:productId/variants`

**Mục đích:** Lấy danh sách tất cả biến thể của 1 sản phẩm

---

### 7. `GET /api/variants/:variantId`

**Mục đích:** Lấy chi tiết 1 biến thể

---

### 8. `POST /api/products/:productId/variants`

**Mục đích:** Thêm biến thể mới cho 1 sản phẩm

**Body:**

```json
{
  "name": "Áo sơ mi trắng - Size L",
  "sku": "SHIRT-WHITE-L",
  "price": {
    "base": 250000,
    "sale": 220000
  },
  "attributes": [
    { "key": "color", "value": "white" },
    { "key": "size", "value": "L" }
  ],
  "images": ["https://..."],
  "is_default": true,
  "status": "active"
}
```

---

### 9. `PUT /api/variants/:variantId`

**Mục đích:** Cập nhật biến thể

---

### 10. `DELETE /api/variants/:variantId`

**Mục đích:** Xóa biến thể

---

## 🧩 Bonus: Search + Filter nâng cao

* `GET /api/products/search?query=ao-thun&color=white&size=L&price_min=100000&price_max=300000`
* `GET /api/products/facets` – lấy filters dynamic (color, size,…)

---

## 🎁 Tổng hợp route

| Method | Endpoint                     | Description                |
| ------ | ---------------------------- | -------------------------- |
| GET    | `/api/products`              | List sản phẩm              |
| GET    | `/api/products/:id`          | Chi tiết sản phẩm          |
| POST   | `/api/products`              | Tạo sản phẩm mới           |
| PUT    | `/api/products/:id`          | Cập nhật sản phẩm          |
| DELETE | `/api/products/:id`          | Xóa sản phẩm               |
| GET    | `/api/products/:id/variants` | List biến thể theo product |
| POST   | `/api/products/:id/variants` | Tạo biến thể mới           |
| GET    | `/api/variants/:id`          | Lấy chi tiết biến thể      |
| PUT    | `/api/variants/:id`          | Cập nhật biến thể          |
| DELETE | `/api/variants/:id`          | Xóa biến thể               |

---

Bạn muốn mình generate sẵn code cho tất cả các route đó (Next.js App Router API route + `.http` test file) chứ? Mình có thể tạo luôn từng endpoint chi tiết nếu bạn cần.
