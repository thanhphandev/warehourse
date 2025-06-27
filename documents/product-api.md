# Product API Documentation

## Tổng quan
API này cung cấp các endpoint để truy vấn, tạo mới sản phẩm cho hệ thống E-Commerce. Dữ liệu trả về hỗ trợ đa ngôn ngữ (vi/en) cho các trường liên quan.

---

## 1. Lấy danh sách sản phẩm

### Endpoint
```
GET /api/products
```

### Query Params
| Tên           | Kiểu    | Mô tả                                                        |
|---------------|---------|--------------------------------------------------------------|
| status        | string  | Trạng thái sản phẩm (nếu có)                                  |
| brand_id      | string  | Lọc theo brand                                               |
| manufacturer_id| string | Lọc theo manufacturer                                        |
| category_id   | string  | Lọc theo category                                            |
| search        | string  | Tìm kiếm theo tên sản phẩm                                   |
| lang          | string  | Ngôn ngữ trả về: `vi` (mặc định) hoặc `en`                   |
| page          | number  | Trang, mặc định 1                                            |
| limit         | number  | Số lượng/trang, mặc định 20                                   |

### Ví dụ
```
GET /api/products?brand_id=...&category_id=...&search=milk&lang=en&page=1&limit=10
```

### Response
```json
{
  "success": true,
  "code": "PRODUCT_LIST_SUCCESS",
  "message": "Products fetched successfully.",
  "status": 200,
  "data": [
    {
      "_id": "...",
      "sku": "SKU001",
      "slug": "san-pham-demo",
      "brand_id": { ... },
      "manufacturer_id": { ... },
      "categories": [ ... ],
      "product_name": "Tên sản phẩm theo lang",
      "description": "Mô tả theo lang",
      "ingredients": "Thành phần theo lang",
      "image": "...",
      "net_weight": { "value": 100, "unit": "g" },
      "shelf_life": { "value": 12, "unit": "months" },
      "usage_instructions": ["..."],
      "storage_instructions": "...",
      "packaging_details": "...",
      "dietary_info": {
        "suitability": ["..."],
        "allergen_warnings": ["..."]
      },
      "additional_info": [
        { "key": "...", "value": "..." }
      ],
      "created_at": "...",
      "updated_at": "..."
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100
  }
}
```

---

## 2. Tạo mới sản phẩm

### Endpoint
```
POST /api/products
```

### Body
```json
{
  "sku": "SKU001",
  "slug": "san-pham-demo",
  "brand_id": "...",
  "manufacturer_id": "...",
  "categories": ["..."],
  "product_name": { "vi": "Sản phẩm demo", "en": "Demo Product" },
  "description": { "vi": "Mô tả", "en": "Description" },
  "ingredients": { "vi": "Thành phần", "en": "Ingredients" },
  "net_weight": { "value": 100, "unit": "g" },
  "image": "...",
  "shelf_life": { "value": 12, "unit": "months" },
  "usage_instructions": { "vi": ["HDSD 1"], "en": ["Instruction 1"] },
  "storage_instructions": { "vi": "Bảo quản nơi khô ráo", "en": "Keep dry" },
  "dietary_info": {
    "suitability": { "vi": ["Ăn chay"], "en": ["Vegetarian"] },
    "allergen_warnings": { "vi": ["Không"], "en": ["None"] }
  },
  "packaging_details": { "vi": "Hộp giấy", "en": "Paper box" },
  "additional_info": [
    { "key_vi": "Xuất xứ", "key_en": "Origin", "value_vi": "Việt Nam", "value_en": "Vietnam" }
  ]
}
```

### Response
- 201: Tạo thành công, trả về object sản phẩm vừa tạo
- 409: Trùng slug
- 400/500: Lỗi validate hoặc server

---

## 3. Các trường trả về (theo lang)
- `product_name`, `description`, `ingredients`, `usage_instructions`, `storage_instructions`, `packaging_details`, `dietary_info`, `additional_info` đều trả về đúng ngôn ngữ theo query param `lang`.
- Nếu không có dữ liệu theo ngôn ngữ, trả về null/[] hoặc fallback sang giá trị gốc.

---

## 4. Lưu ý
- Các trường `_id`, `brand_id`, `manufacturer_id`, `categories` là objectId hoặc object populate.
- `image` là đường dẫn ảnh sản phẩm.
- `created_at`, `updated_at` là ISO date string.

---

## 5. Ví dụ sử dụng
- Lấy danh sách sản phẩm tiếng Việt:
  ```
  GET /api/products?lang=vi
  ```
- Lấy danh sách sản phẩm tiếng Anh, tìm kiếm:
  ```
  GET /api/products?lang=en&search=milk
  ```
- Tạo mới sản phẩm:
  ```
  POST /api/products
  ```

---

## 6. Lỗi trả về
- 400: Tham số không hợp lệ
- 409: Slug đã tồn tại
- 500: Lỗi server

---

## 7. Mở rộng
- Có thể áp dụng logic trả về theo ngôn ngữ cho các API detail (`/api/products/[id]`, `/api/products/slug/[slug]`) tương tự.
