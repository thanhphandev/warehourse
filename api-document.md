## Tài Liệu API Cho Dự Án Chemist Warehouse

### Giới Thiệu

Tài liệu này mô tả các API được thiết kế cho hệ thống thương mại điện tử "Chemist Warehouse". Các API cho phép tương tác với các thực thể chính bao gồm: người dùng, danh mục, thương hiệu, sản phẩm, biến thể sản phẩm, kho hàng, nhật ký tồn kho, đánh giá, giỏ hàng, khuyến mãi và đơn hàng.

### Cơ Sở API

- **URL cơ sở**: `https://api.chemistwarehouse.com/v1`
- **Định dạng dữ liệu**: JSON
- **Xác thực**: Sử dụng JWT (JSON Web Tokens) cho các API yêu cầu quyền truy cập.

---

### API Endpoints

Dưới đây là danh sách các điểm cuối API được xây dựng dựa trên các schema:

#### 1. Users (Người Dùng)

- **GET /users**  
  - **Mô tả**: Lấy danh sách tất cả người dùng (yêu cầu quyền admin).  
  - **Phản hồi**: Danh sách các đối tượng người dùng.

- **GET /users/:id**  
  - **Mô tả**: Lấy thông tin chi tiết của một người dùng theo ID.  
  - **Tham số**: `:id` - ID của người dùng.  
  - **Phản hồi**: Thông tin chi tiết của người dùng.

- **POST /users**  
  - **Mô tả**: Tạo một người dùng mới.  
  - **Thân yêu cầu**:  
    ```json
    {
      "full_name": "Nguyễn Văn A",
      "email": {
        "address": "email@example.com"
      },
      "phone_number": {
        "number": "0901234567"
      },
      "password": "password123",
      "role": "customer"
    }
    ```  
  - **Phản hồi**:  
    ```json
    {
      "message": "User created successfully",
      "user_id": "60d5f3f5c8b8f72c3c9d6e3a"
    }
    ```

- **PUT /users/:id**  
  - **Mô tả**: Cập nhật thông tin người dùng.  
  - **Tham số**: `:id` - ID của người dùng.  
  - **Thân yêu cầu**: Các trường cần cập nhật.

- **DELETE /users/:id**  
  - **Mô tả**: Xóa một người dùng.  
  - **Tham số**: `:id` - ID của người dùng.

---

#### 2. Categories (Danh Mục)

- **GET /categories**  
  - **Mô tả**: Lấy danh sách tất cả danh mục.

- **GET /categories/:id**  
  - **Mô tả**: Lấy thông tin chi tiết của một danh mục.

- **POST /categories**  
  - **Mô tả**: Tạo một danh mục mới.

- **PUT /categories/:id**  
  - **Mô tả**: Cập nhật thông tin danh mục.

- **DELETE /categories/:id**  
  - **Mô tả**: Xóa một danh mục.

---

#### 3. Brands (Thương Hiệu)

- **GET /brands**  
  - **Mô tả**: Lấy danh sách tất cả thương hiệu.

- **GET /brands/:id**  
  - **Mô tả**: Lấy thông tin chi tiết của một thương hiệu.

- **POST /brands**  
  - **Mô tả**: Tạo một thương hiệu mới.

- **PUT /brands/:id**  
  - **Mô tả**: Cập nhật thông tin thương hiệu.

- **DELETE /brands/:id**  
  - **Mô tả**: Xóa một thương hiệu.

---

#### 4. Products (Sản Phẩm)

- **GET /products**  
  - **Mô tả**: Lấy danh sách sản phẩm.  
  - **Tham số truy vấn**:  
    - `category_id`: Lọc theo danh mục.  
    - `brand_id`: Lọc theo thương hiệu.  
    - `status`: Lọc theo trạng thái.  
  - **Phản hồi**:  
    ```json
    {
      "products": [
        {
          "_id": "60d5f3f5c8b8f72c3c9d6e3b",
          "name": "Áo Sơ Mi Dài Tay Form Regular",
          "slug": "ao-so-mi-dai-tay-form-regular",
          "description": "Mô tả chi tiết về dòng sản phẩm...",
          "brand_id": "60d5f3f5c8b8f72c3c9d6e3c",
          "category_ids": ["60d5f3f5c8b8f72c3c9d6e3d"],
          "tags": ["sơ mi", "công sở"],
          "status": "published",
          "created_at": "2021-06-22T14:07:00.000Z",
          "updated_at": "2021-06-22T14:07:00.000Z"
        }
      ]
    }
    ```

- **GET /products/:id**  
  - **Mô tả**: Lấy thông tin chi tiết của một sản phẩm.

- **POST /products**  
  - **Mô tả**: Tạo một sản phẩm mới.

- **PUT /products/:id**  
  - **Mô tả**: Cập nhật thông tin sản phẩm.

- **DELETE /products/:id**  
  - **Mô tả**: Xóa một sản phẩm.

---

#### 5. Product Variants (Biến Thể Sản Phẩm)

- **GET /product-variants**  
  - **Mô tả**: Lấy danh sách biến thể sản phẩm.

- **GET /product-variants/:id**  
  - **Mô tả**: Lấy thông tin chi tiết của một biến thể.

- **POST /product-variants**  
  - **Mô tả**: Tạo một biến thể mới.

- **PUT /product-variants/:id**  
  - **Mô tả**: Cập nhật thông tin biến thể.

- **DELETE /product-variants/:id**  
  - **Mô tả**: Xóa một biến thể.

---

#### 6. Warehouses (Kho Hàng)

- **GET /warehouses**  
  - **Mô tả**: Lấy danh sách kho hàng.

- **GET /warehouses/:id**  
  - **Mô tả**: Lấy thông tin chi tiết của một kho hàng.

- **POST /warehouses**  
  - **Mô tả**: Tạo một kho hàng mới.

- **PUT /warehouses/:id**  
  - **Mô tả**: Cập nhật thông tin kho hàng.

- **DELETE /warehouses/:id**  
  - **Mô tả**: Xóa một kho hàng.

---

#### 7. Inventory Logs (Nhật Ký Tồn Kho)

- **GET /inventory-logs**  
  - **Mô tả**: Lấy danh sách nhật ký tồn kho.

- **GET /inventory-logs/:id**  
  - **Mô tả**: Lấy thông tin chi tiết của một bản ghi nhật ký.

- **POST /inventory-logs**  
  - **Mô tả**: Tạo một bản ghi nhật ký mới.

- **PUT /inventory-logs/:id**  
  - **Mô tả**: Cập nhật thông tin bản ghi nhật ký.

- **DELETE /inventory-logs/:id**  
  - **Mô tả**: Xóa một bản ghi nhật ký.

---

#### 8. Reviews (Đánh Giá)

- **GET /reviews**  
  - **Mô tả**: Lấy danh sách đánh giá.

- **GET /reviews/:id**  
  - **Mô tả**: Lấy thông tin chi tiết của một đánh giá.

- **POST /reviews**  
  - **Mô tả**: Tạo một đánh giá mới.

- **PUT /reviews/:id**  
  - **Mô tả**: Cập nhật thông tin đánh giá.

- **DELETE /reviews/:id**  
  - **Mô tả**: Xóa một đánh giá.

---

#### 9. Carts (Giỏ Hàng)

- **GET /carts**  
  - **Mô tả**: Lấy danh sách giỏ hàng (yêu cầu quyền admin).

- **GET /carts/:id**  
  - **Mô tả**: Lấy thông tin chi tiết của một giỏ hàng.

- **POST /carts**  
  - **Mô tả**: Tạo một giỏ hàng mới.

- **PUT /carts/:id**  
  - **Mô tả**: Cập nhật thông tin giỏ hàng.

- **DELETE /carts/:id**  
  - **Mô tả**: Xóa một giỏ hàng.

---

#### 10. Promotions (Khuyến Mãi)

- **GET /promotions**  
  - **Mô tả**: Lấy danh sách khuyến mãi.

- **GET /promotions/:id**  
  - **Mô tả**: Lấy thông tin chi tiết của một khuyến mãi.

- **POST /promotions**  
  - **Mô tả**: Tạo một khuyến mãi mới.

- **PUT /promotions/:id**  
  - **Mô tả**: Cập nhật thông tin khuyến mãi.

- **DELETE /promotions/:id**  
  - **Mô tả**: Xóa một khuyến mãi.

---

#### 11. Orders (Đơn Hàng)

- **GET /orders**  
  - **Mô tả**: Lấy danh sách đơn hàng.

- **GET /orders/:id**  
  - **Mô tả**: Lấy thông tin chi tiết của một đơn hàng.

- **POST /orders**  
  - **Mô tả**: Tạo một đơn hàng mới.  
  - **Thân yêu cầu**:  
    ```json
    {
      "user_id": "60d5f3f5c8b8f72c3c9d6e3a",
      "items": [
        {
          "variant_id": "60d5f3f5c8b8f72c3c9d6e3e",
          "quantity": 1
        }
      ],
      "shipping_address": {
        "full_name": "Nguyễn Văn A",
        "phone_number": "0901234567",
        "street": "123 Đường ABC",
        "ward": "Phường XYZ",
        "district": "Quận 1",
        "city": "TP. Hồ Chí Minh"
      },
      "payment": {
        "method": "COD"
      }
    }
    ```  
  - **Phản hồi**:  
    ```json
    {
      "message": "Order created successfully",
      "order_id": "60d5f3f5c8b8f72c3c9d6e3f"
    }
    ```

- **PUT /orders/:id**  
  - **Mô tả**: Cập nhật thông tin đơn hàng.

- **DELETE /orders/:id**  
  - **Mô tả**: Xóa một đơn hàng.

---

### Xác Thực

Các API yêu cầu xác thực cần bao gồm token JWT trong header của yêu cầu:  
```
Authorization: Bearer <token>
```

---

### Xử Lý Lỗi

Các lỗi sẽ được trả về với mã trạng thái HTTP phù hợp và thông tin chi tiết trong thân phản hồi. Ví dụ:  
```json
{
  "error": "Invalid token",
  "message": "Token is invalid or expired"
}
```

---

### Kết Luận

Tài liệu API này cung cấp một cái nhìn tổng quan và chi tiết về cách tương tác với hệ thống "Chemist Warehouse". Mỗi điểm cuối được thiết kế để quản lý các thực thể tương ứng, hỗ trợ đầy đủ các chức năng cần thiết cho một hệ thống thương mại điện tử toàn diện.