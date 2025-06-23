# Promotion API Documentation

## 1. List Promotions
- **Endpoint:** `GET /api/promotion`
- **Description:** Lấy danh sách chương trình khuyến mãi
- **Response:**
```json
{
  "success": true,
  "code": "PROMOTION_LIST_SUCCESS",
  "message": "Promotions fetched successfully.",
  "status": 200,
  "data": [ ... ]
}
```

---

## 2. Create Promotion
- **Endpoint:** `POST /api/promotion`
- **Description:** Thêm chương trình khuyến mãi mới
- **Body:**
```json
{
  "name": "Summer Sale 2025",
  "code": "SUMMER25",
  "type": "PERCENTAGE_OFF",
  "value": 10,
  "conditions": {
    "min_spend": 500000,
    "applies_to": {
      "type": "ALL",
      "ids": []
    }
  },
  "start_date": "2025-07-01T00:00:00.000Z",
  "end_date": "2025-07-31T23:59:59.999Z",
  "usage_limit": 100,
  "usage_limit_per_user": 1
}
```
- **Response:**
```json
{
  "success": true,
  "code": "PROMOTION_CREATE_SUCCESS",
  "message": "Promotion created successfully.",
  "status": 201,
  "data": { ... }
}
```

---

## 3. Get Promotion Detail
- **Endpoint:** `GET /api/promotion/{promotionId}`
- **Description:** Lấy chi tiết chương trình khuyến mãi
- **Response:**
```json
{
  "success": true,
  "code": "PROMOTION_DETAIL_SUCCESS",
  "message": "Promotion fetched successfully.",
  "status": 200,
  "data": { ... }
}
```

---

## 4. Update Promotion
- **Endpoint:** `PUT /api/promotion/{promotionId}`
- **Description:** Cập nhật chương trình khuyến mãi
- **Body:** (các trường cần cập nhật)
- **Response:**
```json
{
  "success": true,
  "code": "PROMOTION_UPDATE_SUCCESS",
  "message": "Promotion updated successfully.",
  "status": 200,
  "data": { ... }
}
```

---

## 5. Delete Promotion
- **Endpoint:** `DELETE /api/promotion/{promotionId}`
- **Description:** Xóa chương trình khuyến mãi
- **Response:**
```json
{
  "success": true,
  "code": "PROMOTION_DELETE_SUCCESS",
  "message": "Promotion deleted successfully.",
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
