# Tài Liệu Schema Hoàn Chỉnh Cho Dự Án Chemist Warehouse
## I. Giới Thiệu
Dự án "Chemist Warehouse" là một hệ thống thương mại điện tử chuyên nghiệp, được thiết kế để quản lý các hoạt động kinh doanh trực tuyến như quản lý sản phẩm, tồn kho, đơn hàng và tương tác với khách hàng. Tài liệu này trình bày chi tiết các schema MongoDB được sử dụng, bao gồm mô tả, cấu trúc và mối quan hệ giữa chúng.
## II. Tổng Quan Các Schema
Hệ thống bao gồm 11 schema chính, chia thành ba nhóm:

Nhóm Thực Thể Lõi (Core Entities):

users: Quản lý thông tin người dùng.
categories: Quản lý danh mục sản phẩm.
brands: Quản lý thông tin thương hiệu.


Nhóm Sản Phẩm & Tồn Kho (Product & Inventory):

products: Quản lý thông tin chung về sản phẩm.
product_variants: Quản lý các biến thể cụ thể của sản phẩm.
warehouses: Quản lý các địa điểm kho hàng.
inventory: Quan ly kho
inventory_logs: Ghi nhận mọi thay đổi về tồn kho.


Nhóm Tương Tác & Giao Dịch (Interaction & Transaction):

reviews: Quản lý đánh giá của khách hàng.
carts: Quản lý giỏ hàng của người dùng.
promotions: Quản lý các chương trình khuyến mãi.
orders: Quản lý thông tin đơn hàng.



III. Chi Tiết Các Schema
1. Schema users (Người Dùng)

Mục đích: Lưu trữ thông tin tài khoản của khách hàng, quản trị viên và các vai trò khác.
``` json
Cấu trúc:{
  "_id": ObjectId,
  "full_name": String,
  "email": {
    "address": String, // Unique
    "is_verified": Boolean
  },
  "phone_number": {
    "number": String, // Unique
    "is_verified": Boolean
  },
  "password": String, // Hashed
  "role": String, // 'customer', 'admin', 'manager'
  "addresses": [
    {
      "address_id": ObjectId,
      "full_name": String,
      "phone_number": String,
      "street": String,
      "ward": String,
      "district": String,
      "city": String,
      "is_default": Boolean
    }
  ],
  "wishlist": [ObjectId], // ref: 'Product' or 'ProductVariant'
  "created_at": ISODate,
  "updated_at": ISODate
}
```


2. Schema categories (Danh Mục)

Mục đích: Tổ chức sản phẩm theo cấu trúc cây đa cấp.
Cấu trúc:
``` json
{
  "_id": ObjectId,
  "name": String,
  "slug": String, // Unique
  "parent_id": ObjectId, // ref: 'categories'
  "ancestors": [
    { "_id": ObjectId, "name": String, "slug": String }
  ],
  "image": String,
  "is_active": Boolean,
  "created_at": ISODate,
  "updated_at": ISODate
}
```


## 3. Schema brands (Thương Hiệu)

Mục đích: Quản lý thông tin các thương hiệu.
Cấu trúc:
``` json
{
  "_id": ObjectId,
  "name": String,
  "slug": String, // Unique
  "logo": String,
  "description": String,
  "created_at": ISODate,
  "updated_at": ISODate
}
```


4. Schema products (Thông Tin Chung Sản Phẩm)

Mục đích: Lưu thông tin chung về một dòng sản phẩm.
Cấu trúc:
``` json
{
  "_id": ObjectId,
  "name": String,
  "slug": String, // Unique
  "description": String,
  "brand_id": ObjectId, // ref: 'brands'
  "category_ids": [ObjectId], // ref: 'categories'
  "tags": [String],
  "status": String, // 'draft', 'published', 'archived'
  "created_at": ISODate,
  "updated_at": ISODate
}
```


5. Schema product_variants (Biến Thể Sản Phẩm)

Mục đích: Quản lý các phiên bản cụ thể của sản phẩm (đơn vị bán hàng).
Cấu trúc:
``` json
{
  "_id": ObjectId,
  "product_id": ObjectId, // ref: 'products'
  "name": String,
  "sku": String, // Unique
  "price": {
    "base": Number,
    "sale": Number
  },
  "attributes": [
    { "key": String, "value": String }
  ],
  "images": [String],
  "is_default": Boolean,
  "status": String, // 'active', 'inactive'
  "created_at": ISODate,
  "updated_at": ISODate
}
```


6. Schema warehouses (Kho Hàng)

Mục đích: Quản lý các địa điểm chứa hàng.
Cấu trúc:
``` json
{
  "_id": ObjectId,
  "name": String,
  "address": {
    "street": String,
    "city": String
  },
  "is_store": Boolean,
  "created_at": ISODate,
  "updated_at": ISODate
}
```


7. Schema inventory_logs (Nhật Ký Kho)

Mục đích: Ghi lại mọi thay đổi tồn kho.
Cấu trúc:
``` json
{
  "_id": ObjectId,
  "variant_id": ObjectId, // ref: 'product_variants'
  "sku": String,
  "warehouse_id": ObjectId, // ref: 'warehouses'
  "quantity_change": Number,
  "reason": String, // 'SALE', 'RETURN', 'STOCK_IN', 'ADJUSTMENT'
  "related_order_id": ObjectId, // ref: 'orders'
  "notes": String,
  "created_at": ISODate
}
```


8. Schema reviews (Đánh Giá)

Mục đích: Lưu trữ đánh giá của khách hàng về sản phẩm.
Cấu trúc:
``` json
{
  "_id": ObjectId,
  "user_id": ObjectId, // ref: 'users'
  "product_id": ObjectId, // ref: 'products'
  "order_id": ObjectId, // ref: 'orders'
  "rating": Number, // 1-5
  "comment": String,
  "images": [String],
  "is_approved": Boolean,
  "created_at": ISODate,
  "updated_at": ISODate
}
```


9. Schema carts (Giỏ Hàng)

Mục đích: Lưu giỏ hàng tạm thời của người dùng.
Cấu trúc:
``` json
{
  "_id": ObjectId,
  "user_id": ObjectId, // ref: 'users', unique
  "items": [
    {
      "variant_id": ObjectId, // ref: 'product_variants'
      "quantity": Number
    }
  ],
  "created_at": ISODate,
  "updated_at": ISODate
}
```


10. Schema promotions (Khuyến Mãi)

Mục đích: Quản lý các chương trình, mã giảm giá.
Cấu trúc:
``` json
{
  "_id": ObjectId,
  "name": String,
  "code": String, // Unique
  "type": String, // 'PERCENTAGE_OFF', 'FIXED_AMOUNT_OFF'
  "value": Number,
  "conditions": {
    "min_spend": Number,
    "applies_to": {
      "type": String, // 'CATEGORIES', 'BRANDS', 'VARIANTS'
      "ids": [ObjectId]
    }
  },
  "start_date": ISODate,
  "end_date": ISODate,
  "usage_limit": Number,
  "usage_count": Number,
  "is_active": Boolean,
  "created_at": ISODate,
  "updated_at": ISODate
}
```


11. Schema orders (Đơn Hàng)

Mục đích: Lưu trữ thông tin đơn hàng bất biến sau khi xác nhận.
Cấu trúc:
``` json
{
  "_id": ObjectId,
  "order_number": String, // Unique
  "user_id": ObjectId, // ref: 'users'
  "items": [
    {
      "variant_id": ObjectId,
      "sku": String,
      "product_name": String,
      "variant_name": String,
      "quantity": Number,
      "price": Number
    }
  ],
  "shipping_address": { /* Copied from user */ },
  "sub_total": Number,
  "shipping_fee": Number,
  "discount_amount": Number,
  "total_amount": Number,
  "payment": {
    "method": String,
    "status": String // 'pending', 'completed', 'failed'
  },
  "status": String, // 'pending', 'processing', 'shipped', 'delivered', 'cancelled'
  "status_history": [
    { "status": String, "timestamp": ISODate }
  ],
  "created_at": ISODate,
  "updated_at": ISODate
}
```


## IV. Mối Quan Hệ Giữa Các Schema

users: Liên kết với orders, reviews, carts, và wishlist.
categories: Liên kết với products qua category_ids.
brands: Liên kết với products qua brand_id.
products: Liên kết với product_variants, reviews.
product_variants: Liên kết với inventory_logs, carts, orders.
warehouses: Liên kết với inventory_logs.
inventory_logs: Liên kết với product_variants, warehouses, và orders.
reviews: Liên kết với users, products, và orders.
carts: Liên kết với users và product_variants.
promotions: Áp dụng cho categories, brands, hoặc product_variants.
orders: Liên kết với users, product_variants, và inventory_logs.

## V. Kết Luận
Tài liệu này cung cấp một cái nhìn toàn diện về các schema MongoDB trong dự án "Chemist Warehouse". Các schema được thiết kế để hỗ trợ các chức năng cốt lõi của hệ thống thương mại điện tử, từ quản lý người dùng, sản phẩm, tồn kho đến đơn hàng và tương tác khách hàng. Đây là nền tảng để nhóm phát triển xây dựng và duy trì hệ thống hiệu quả.