# Complete API Testing Guide: COSKINn (Phases 1 & 2)

This guide takes you through the entire eCommerce lifecycle. 
> **Note:** Ensure your backend is running locally (`npm run start:dev`). All endpoints are prefixed with `/api`.

---

## 🏗️ PART 1: Admin & Catalog Setup (Phase 1)

### 1. Admin Login (Trigger OTP)
- **Method:** `POST`
- **URL:** `http://localhost:3000/api/auth/login`
- **Body (JSON):**
```json
{
  "email": "admin@coskinn.com",
  "password": "admin123"
}
```
**Expected Output:**
```json
{
  "message": "Password accepted. OTP sent to registered phone number.",
  "nextStep": "verify-otp",
  "phone": "+919876543210"
}
```
*(Check your terminal running the backend. The 6-digit OTP will be logged there!)*

### 2. Verify Admin OTP & Get Token
- **Method:** `POST`
- **URL:** `http://localhost:3000/api/auth/verify-otp`
- **Body (JSON):**
```json
{
  "phone": "<ADMIN_PHONE_FROM_PREVIOUS_RESPONSE>",
  "otp": "<6_DIGIT_OTP_FROM_TERMINAL>",
  "isAdminLogin": true
}
```
**Expected Output:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1...",
  "refresh_token": "def456..."
}
```
*(Copy the `access_token` from the response. You will use this in the `Authorization: Bearer <token>` header for all Admin requests).*

### 3. Create a Category (Admin)
- **Method:** `POST`
- **URL:** `http://localhost:3000/api/categories`
- **Headers:** `Authorization: Bearer <AdminToken>`
- **Body (JSON):**
```json
{
  "name": "Haircare",
  "slug": "haircare",
  "description": "Premium haircare products"
}
```
**Expected Output:**
```json
{
  "id": "e45b98...",
  "name": "Haircare",
  "slug": "haircare",
  "createdAt": "2026-07-08T10:00:00.000Z"
}
```
*(Copy the generated `id` for the category).*

### 4. Create a Product (Admin)
- **Method:** `POST`
- **URL:** `http://localhost:3000/api/product`
- **Headers:** `Authorization: Bearer <AdminToken>`
- **Body (JSON):**
```json
{
  "name": "Nourishing Hair Oil",
  "slug": "nourishing-hair-oil",
  "description": "For strong, shiny hair.",
  "categoryId": "<CATEGORY_ID_FROM_STEP_3>",
  "mrp": 1499.00,
  "discountPrice": 1199.00
}
```
**Expected Output:**
```json
{
  "id": "p789xyz...",
  "name": "Nourishing Hair Oil",
  "slug": "nourishing-hair-oil"
}
```
*(Copy the generated `id` for the product).*

### 5. Add a Product Variant (Admin)
- **Method:** `POST`
- **URL:** `http://localhost:3000/api/product/<PRODUCT_ID_FROM_STEP_4>/variant`
- **Headers:** `Authorization: Bearer <AdminToken>`
- **Body (JSON):**
```json
{
  "sku": "HAIR-OIL-100ML",
  "name": "100ml Bottle",
  "netQuantity": "100ml",
  "mrp": 1499.00,
  "price": 1199.00
}
```
**Expected Output:**
```json
{
  "id": "v123abc...",
  "sku": "HAIR-OIL-100ML",
  "price": 1199
}
```
*(Copy the generated variant `id`).*

---

## 🛒 PART 2: Customer Shopping Flow (Phase 2)

### 6. Customer Login (Send OTP)
- **Method:** `POST`
- **URL:** `http://localhost:3000/api/auth/send-otp`
- **Body (JSON):**
```json
{
  "phone": "+919876543210",
  "isAdminLogin": false
}
```
**Expected Output:**
```json
{
  "message": "OTP sent successfully"
}
```
*(Check your terminal. A 4-digit OTP will be logged).*

### 7. Customer Verify OTP & Get Token
- **Method:** `POST`
- **URL:** `http://localhost:3000/api/auth/verify-otp`
- **Body (JSON):**
```json
{
  "phone": "+919876543210",
  "otp": "<4_DIGIT_OTP_FROM_TERMINAL>",
  "isAdminLogin": false
}
```
**Expected Output:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1...",
  "refresh_token": "abc123..."
}
```
*(Copy the `access_token`. This is your `CustomerToken` for the next steps).*

### 8. View Home Dashboard & Search
*(No Auth Required)*
- **Home:** `GET http://localhost:3000/api/home`
- **Search:** `GET http://localhost:3000/api/products/search?q=hair`

### 9. Add Item to Cart (Customer)
- **Method:** `POST`
- **URL:** `http://localhost:3000/api/cart/items`
- **Headers:** `Authorization: Bearer <CustomerToken>`
- **Body (JSON):**
```json
{
  "productId": "<PRODUCT_ID>",
  "variantId": "<VARIANT_ID>",
  "quantity": 2
}
```
**Expected Output:**
```json
{
  "id": "c123...",
  "userId": "u123...",
  "items": [
    {
      "productId": "p789xyz...",
      "quantity": 2
    }
  ]
}
```

### 10. View Cart Totals (Customer)
- **Method:** `GET`
- **URL:** `http://localhost:3000/api/cart`
- **Headers:** `Authorization: Bearer <CustomerToken>`
**Expected Output:**
```json
{
  "items": [...],
  "totalMrp": 2998,
  "totalDiscountPrice": 2398,
  "totalSavings": 600
}
```

### 11. Add Delivery Address (Customer)
- **Method:** `POST`
- **URL:** `http://localhost:3000/api/customer-profile/addresses`
- **Headers:** `Authorization: Bearer <CustomerToken>`
- **Body (JSON):**
```json
{
  "fullName": "Jane Doe",
  "phone": "+919876543210",
  "addressLine1": "123 Coskinn Avenue",
  "city": "Mumbai",
  "state": "Maharashtra",
  "pincode": "400001",
  "isDefault": true
}
```
**Expected Output:**
```json
{
  "id": "addr999...",
  "fullName": "Jane Doe",
  "city": "Mumbai"
}
```
*(Copy the generated address `id`).*

---

## 💳 PART 3: Checkout, Payment & Fulfillment (Phase 2)

### 12. Create Order / Checkout (Customer)
- **Method:** `POST`
- **URL:** `http://localhost:3000/api/orders`
- **Headers:** `Authorization: Bearer <CustomerToken>`
- **Body (JSON):**
```json
{
  "addressId": "<ADDRESS_ID_FROM_STEP_11>",
  "paymentMode": "ONLINE"
}
```
**Expected Output:**
```json
{
  "id": "ord123...",
  "status": "DRAFT",
  "totalAmount": 2398,
  "razorpayOrderId": "order_xyz123"
}
```
*(This clears your cart and creates an Order in `DRAFT` status. Copy the generated order `id`).*

### 13. Simulate Payment Success (Webhook bypass)
*(This simulates Razorpay telling our server the payment was successful).*
- **Method:** `POST`
- **URL:** `http://localhost:3000/api/payments/webhook`
- **Headers:** `x-razorpay-signature: mock_signature`
- **Body (JSON):**
```json
{
  "event": "payment.captured",
  "payload": {
    "payment": {
      "entity": {
        "order_id": "<RAZORPAY_ORDER_ID_FROM_STEP_12>",
        "status": "captured"
      }
    }
  }
}
```
**Expected Output:**
```json
{
  "received": true
}
```
*(If successful, you will see a notification trigger in the backend terminal, and the order status becomes `PLACED`).*

### 14. Download PDF Invoice (Customer)
- **Method:** `GET`
- **URL:** `http://localhost:3000/api/orders/<ORDER_ID_FROM_STEP_12>/invoice`
- **Headers:** `Authorization: Bearer <CustomerToken>`
**Expected Output:**
```json
{
  "pdfUrl": "/invoices/INV-ord123.pdf"
}
```
*(You can physically check the `backend/public/invoices/` folder for the newly generated PDF).*

### 15. Manage Orders (Admin)
*(Switch back to your `AdminToken` from Step 2).*
- **List Placed Orders:** 
  `GET http://localhost:3000/api/admin/orders?status=PLACED`
  *(Headers: `Authorization: Bearer <AdminToken>`)*

- **Mark Order as Shipped:**
  - **Method:** `PUT`
  - **URL:** `http://localhost:3000/api/admin/orders/<ORDER_ID_FROM_STEP_12>/status`
  - **Headers:** `Authorization: Bearer <AdminToken>`
  - **Body (JSON):**
    ```json
    {
      "status": "SHIPPED"
    }
    ```
  **Expected Output:**
  ```json
  {
    "id": "ord123...",
    "status": "SHIPPED",
    "shippedAt": "2026-07-08T11:00:00.000Z"
  }
  ```
*(You have now fully processed a customer's order from start to finish!)*
