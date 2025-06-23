e-commerce cơ bản để minh họa đầy đủ các trường hợp:

  * **Authentication:** Đăng ký, đăng nhập, đăng xuất.
  * **Session Management:** Sử dụng JWT (JSON Web Tokens) được lưu trong cookie `HttpOnly` để bảo mật tối đa.
  * **Middleware:** Bảo vệ các trang và API routes.
  * **Authorization:** Phân quyền dựa trên vai trò (customer, admin, manager).
  * **Tích hợp:** Lấy thông tin người dùng ở cả Server Component và Client Component.
  * **Cơ sở dữ liệu:** Thiết kế User schema với MongoDB và Mongoose.

Mục tiêu là cung cấp cho bạn một "boilerplate" (mã nguồn khởi đầu) chuẩn và an toàn mà bạn có thể sử dụng và mở rộng cho các dự án thực tế.

-----

### ⭐ Phần 1: Tổng quan về Kiến trúc và Công nghệ

1.  **Next.js App Router:** Chúng ta sẽ tận dụng kiến trúc mới nhất của Next.js để xử lý logic ở server và client một cách tối ưu.
2.  **JWT (JSON Web Token):** Token sẽ chứa thông tin định danh người dùng (ID, vai trò) và được ký bằng một `secret key`. Đây là phương pháp stateless (không cần lưu session trên server) phổ biến và hiệu quả.
3.  **Cookie `HttpOnly`, `Secure`:** Token JWT sẽ được lưu trong cookie thay vì Local Storage.
      * `HttpOnly`: Ngăn chặn JavaScript phía client truy cập vào cookie, giảm thiểu nguy cơ tấn công XSS (Cross-Site Scripting).
      * `Secure`: Chỉ gửi cookie qua kết nối HTTPS.
      * `SameSite=Strict`: Giảm thiểu nguy cơ tấn công CSRF (Cross-Site Request Forgery).
4.  **bcrypt:** Thư viện để băm (hash) mật khẩu trước khi lưu vào cơ sở dữ liệu. Không bao giờ lưu mật khẩu dưới dạng văn bản thuần.
5.  **MongoDB & Mongoose:** MongoDB là cơ sở dữ liệu NoSQL linh hoạt, rất phù hợp cho các ứng dụng web hiện đại. Mongoose giúp định nghĩa schema và tương tác với MongoDB một cách dễ dàng.
6.  **Middleware (`middleware.ts`):** "Người gác cổng" của ứng dụng. Nó sẽ chạy trước khi một request được xử lý, lý tưởng để kiểm tra xem người dùng đã đăng nhập và có quyền truy cập hay chưa.

-----

### ⭐ Phần 2: Thiết kế Schema User trong MongoDB

Đây là nền tảng của hệ thống. Một schema tốt sẽ giúp việc phân quyền dễ dàng hơn.

Tạo file `models/User.ts`:

```typescript
import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IUserAddress {
  address_id: Types.ObjectId;
  full_name: string;
  phone_number: string;
  street: string;
  ward: string;
  district: string;
  city: string;
  is_default: boolean;
}

export interface IUser extends Document {
  full_name: string;
  email: {
    address: string;
    is_verified: boolean;
  };
  phone_number: {
    number: string;
    is_verified: boolean;
  };
  password: string;
  role: 'customer' | 'admin' | 'manager';
  addresses: IUserAddress[];
  wishlist: Types.ObjectId[];
  created_at: Date;
  updated_at: Date;
}

const UserAddressSchema = new Schema<IUserAddress>({
  address_id: { type: Schema.Types.ObjectId, required: true },
  full_name: { type: String, required: true },
  phone_number: { type: String, required: true },
  street: { type: String, required: true },
  ward: { type: String, required: true },
  district: { type: String, required: true },
  city: { type: String, required: true },
  is_default: { type: Boolean, default: false },
});

const UserSchema = new Schema<IUser>({
  full_name: { type: String, required: true },
  email: {
    address: { type: String, required: true, unique: true },
    is_verified: { type: Boolean, default: false },
  },
  phone_number: {
    number: { type: String, required: true, unique: true },
    is_verified: { type: Boolean, default: false },
  },
  password: { type: String, required: true },
  role: { type: String, enum: ['customer', 'admin', 'manager'], default: 'customer' },
  addresses: [UserAddressSchema],
  wishlist: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

```


-----

### ⭐ Phần 3: Cài đặt và Cấu hình Môi trường

1.  **Cài đặt các thư viện cần thiết:**

    ```bash
    npm install mongoose bcryptjs jsonwebtoken cookie
    npm install -D @types/bcryptjs @types/jsonwebtoken @types/cookie
    ```