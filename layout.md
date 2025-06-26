

Bạn là một chuyên gia UI/UX kiêm copywriter cho thương mại điện tử. Hãy viết nội dung cho **trang chủ website E-Commerce thực phẩm khô Việt Nam xuất khẩu**, theo cấu trúc rõ ràng dưới đây. Sử dụng dữ liệu **mock** đã cung cấp chính xác (brand, sản phẩm).

Yêu cầu:

* Nội dung phải **gây ấn tượng mạnh về thương hiệu, sản phẩm và khuyến mãi**
* Ngôn ngữ: **song ngữ Việt – Anh**
* Style: **thân thiện, rõ ràng, dễ đọc**
* Gắn đúng dữ liệu từ mock schema

---

### 🔷 Schema layout:

#### **1. Hero Banner**

```json
{
  "title_vi": "Ưu đãi lên đến 50% cho các sản phẩm truyền thống Việt",
  "title_en": "Up to 50% OFF on traditional Vietnamese specialties",
  "cta_text_vi": "Khám phá ngay",
  "cta_text_en": "Shop Now",
  "image": "https://link-to-hero-banner.jpg",
  "carousel": true
}
```

#### **2. Categories**

```json
[
  {
    "name_vi": "Bánh tráng",
    "name_en": "Rice Paper",
    "image": "https://link-to-category-image.jpg",
    "slug": "banh-trang"
  },
  {
    "name_vi": "Trái cây sấy",
    "name_en": "Dried Fruits",
    "image": "https://link-to-category-image.jpg",
    "slug": "trai-cay-say"
  }
]
```

#### **3. Featured Products**

Từ dữ liệu `sản phẩm`, render:

```json
[
  {
    "name_vi": "Bánh tráng mè đen nướng (40g)",
    "name_en": "Grilled black sesame rice crackers (40g)",
    "slug": "banh-trang-me-den-nuong-40g",
    "image": "https://i.postimg.cc/LXWr50kM/gaomeden.png",
    "brand_name": "PHUONG NGUYEN VIET NAM CO., LTD",
    "brand_logo": "https://cdnv2.tgdd.vn/...logo.jpg",
    "description_vi": "Giòn rụm – béo ngậy – truyền thống Việt",
    "description_en": "Crispy – rich – authentic Vietnamese taste",
    "tag": "bestseller"
  }
]
```

#### **4. Brands Section**

Từ `brand` mock, render:

```json
[
  {
    "name": "SPEVI FOOD CO., LTD",
    "logo": "https://encrypted-tbn0.gstatic.com/...KrCG1Q&s",
    "description": "Trái cây sấy xuất khẩu Mỹ, EU",
    "slug": "spevi-food-co-ltd"
  },
  {
    "name": "PHUONG NGUYEN VIET NAM CO., LTD",
    "logo": "https://cdnv2.tgdd.vn/...logo.jpg",
    "description": "Bánh tráng truyền thống Bình Định",
    "slug": "phuong-nguyen-viet-nam-co-ltd"
  }
]
```

---

### 📌 Format yêu cầu:

* **Output: JSON hoặc HTML section-ready**
* Dễ tích hợp vào CMS hoặc framework frontend (NextJS, React, Vue...)
* Giữ nguyên các trường `slug`, `image`, `logo` từ mock data
* Gợi ý: **Đặt tag “bestseller” / “new arrival” / “top rated” tương ứng để gợi ý UI icon sau này**

---

Kết thúc prompt.

---

Nếu bạn cần mình viết sẵn nội dung từ prompt trên để kiểm thử, hoặc muốn prompt này ở dạng `GraphQL`, `REST`, `Markdown`, hoặc `Tailwind JSX`, hãy nói nhé!
