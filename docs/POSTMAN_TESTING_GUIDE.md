# Complete API Testing Guide: COSKINn (Full Master Plan)

This guide provides a comprehensive Postman testing plan for the entire COSKINn eCommerce lifecycle. Every implemented API across all modules from Auth to Endpoints is covered here with complete request inputs and expected responses.

> **Note:** Ensure your backend is running locally (`npm run start:dev`). All endpoints are prefixed with `/api`.
> **Headers:** For all protected routes, include `Authorization: Bearer <token>`

---

## 🔐 1. AUTH & CUSTOMER DOMAIN

### Admin & Staff Login
**Trigger OTP**
- `POST /api/auth/login`
- **Body:** `{ "email": "admin@coskinn.com", "password": "admin" }`
- **Output:** `{ "success": true, "message": "OTP sent to your phone" }`

**Verify OTP & Get Token**
- `POST /api/auth/verify-otp`
- **Body:** `{ "phone": "+919999999999", "otp": "123456", "isAdminLogin": true }`
- **Output:** `{ "access_token": "eyJhbG...", "user": { "id": "uuid", "role": "SUPER_ADMIN" } }`

### Customer Login
**Send OTP**
- `POST /api/auth/send-otp`
- **Body:** `{ "phone": "+919876543210" }`
- **Output:** `{ "success": true, "message": "OTP Sent" }`

**Verify OTP & Get Token**
- `POST /api/auth/verify-otp`
- **Body:** `{ "phone": "+919876543210", "otp": "1234", "isAdminLogin": false }`
- **Output:** `{ "access_token": "eyJhbG...", "profile": { "id": "uuid", "phone": "+91..." } }`

---

## 🛍️ 2. PRODUCT CATALOG DOMAIN

### Categories (Admin Token)
**Create Category**
- `POST /api/categories`
- **Body:** `{ "name": "Skincare", "slug": "skincare", "productLine": "SKINCARE" }`
- **Output:** `{ "id": "uuid", "name": "Skincare", "productLine": "SKINCARE" }`

### Products (Admin Token)
**Create Product**
- `POST /api/product`
- **Body:** `{ "name": "Vitamin C Serum", "slug": "vit-c", "categoryId": "uuid", "mrp": 500, "productLine": "SKINCARE" }`
- **Output:** `{ "id": "uuid", "name": "Vitamin C Serum", "status": "DRAFT" }`

### Public Catalog (No Auth)
**Get Products (with Segment Filter)**
- `GET /api/products?segment=SKINCARE`
- **Output:** `[ { "id": "uuid", "name": "Vitamin C Serum", "variants": [...] } ]`

---

## 📦 3. INVENTORY & WAREHOUSE DOMAIN (Admin Token)

### Warehouse 
**Create Warehouse**
- `POST /api/warehouse`
- **Body:** `{ "name": "Mumbai Hub" }`
- **Output:** `{ "id": "uuid", "name": "Mumbai Hub", "bins": [] }`

### Inventory Stock 
**Global Stock Overview**
- `GET /api/inventory/global-stock`
- **Output:** `[ { "sku": "VIT-C", "available": 150, "reserved": 10 } ]`

**Stock In**
- `POST /api/inventory/stock-in`
- **Body:** `{ "warehouseId": "uuid", "sku": "VIT-C", "quantity": 100 }`
- **Output:** `{ "success": true, "transactionId": "uuid" }`

---

## 🛒 4. CART & WISHLIST (Customer Token)

**Add to Cart**
- `POST /api/cart/items`
- **Body:** `{ "productId": "uuid", "variantId": "uuid", "quantity": 1 }`
- **Output:** `{ "id": "cart_id", "items": [...], "subTotal": 500 }`

**Apply Coupon**
- `POST /api/cart/apply-coupon`
- **Body:** `{ "code": "WELCOME10" }`
- **Output:** `{ "discountApplied": 50, "finalTotal": 450 }`

---

## 💳 5. CHECKOUT & ORDERS (Customer Token)

**Create Order**
- `POST /api/orders`
- **Body:** `{ "addressId": "uuid", "paymentMode": "ONLINE", "pointsToRedeem": 0 }`
- **Output:** `{ "orderId": "uuid", "razorpayOrderId": "order_rcpt123", "amount": 450 }`

**Razorpay Webhook (Internal Testing)**
- `POST /api/payments/webhook`
- **Headers:** `x-razorpay-signature: <hash>`
- **Body:** `{ "event": "payment.captured", "payload": { "payment": { "entity": { "order_id": "order_rcpt123", "status": "captured" } } } }`
- **Output:** `{ "received": true }` (Order status changes from DRAFT to PLACED)

---

## 🔄 6. RETURNS & REFUNDS

**Request Return (Customer Token)**
- `POST /api/return`
- **Body:** `{ "orderId": "uuid", "items": [{ "sku": "VIT-C", "quantity": 1 }], "reason": "Damaged" }`
- **Output:** `{ "returnId": "uuid", "status": "PENDING_APPROVAL" }`

**Initiate Refund (Admin Token)**
- `POST /api/refund/initiate`
- **Body:** `{ "orderId": "uuid", "amount": 450, "refundDestination": "SOURCE" }`
- **Output:** `{ "refundId": "uuid", "razorpayRefundId": "rfnd_123", "status": "PROCESSED" }`

---

## 🎁 7. PROMOTIONS & LOYALTY

**Get Wallet Balance (Customer Token)**
- `GET /api/wallet`
- **Output:** `{ "balance": 1500, "transactions": [...] }`

**Create Coupon (Admin Token)**
- `POST /api/coupon`
- **Body:** `{ "code": "SUMMER20", "discountPercent": 20, "maxDiscount": 500, "minOrderValue": 1000 }`
- **Output:** `{ "id": "uuid", "code": "SUMMER20", "active": true }`

---

## 📊 8. HR & FINANCE (Admin Token)

**Finance Overview**
- `GET /api/admin/finance/overview`
- **Output:** `{ "revenue": 1250000, "revenueTrend": "+12.5%", "profit": 350000, "pendingPayments": 45000, "refunds": 12000, "taxes": 225000 }`

**HR Employees List**
- `GET /api/admin/hr/employees`
- **Output:** `[ { "id": "uuid", "name": "John Doe", "role": "product-manager", "salary": 75000, "status": "Active" } ]`

**HR Leave Requests**
- `GET /api/admin/hr/leaves`
- **Output:** `[ { "id": "uuid", "employee": { "name": "Jane" }, "type": "Sick", "status": "Pending", "days": 2 } ]`

---

## 📈 9. MARKETING (Admin Token)

**Create Push Notification**
- `POST /api/notification/push`
- **Body:** `{ "userId": "uuid", "title": "Flash Sale!", "body": "50% off on Skincare", "mobileToken": "token123" }`
- **Output:** `{ "success": true, "messageId": "msg_123" }`

---

## ⚙️ CURRENT API STATUS (Remaining Gaps vs Mocks)

### **Remaining APIs to Build (approx. 9 endpoints):**
1. **DPDP Act / Data-rights:** Export & Delete requests (`POST /api/compliance/data-request`).
2. **Consent Center:** Push/SMS/WhatsApp opt-ins.
3. **Serviceability Master:** CRUD for Pincode/COD zones.
4. **Bundle / Kit Configurator:** APIs to map components to bundles (`POST /api/product/bundles`).
5. **Supplier Master Data:** CRUD for Warehousing POs.
6. **Mobile App Versioning:** Force update configurations (`GET /api/app-version`).
7. **Global Return Policy Default:** Admin settings.
8. **RBAC Panel Access Config:** Setting which internal panels a role can access.
9. **Staff 2FA (TOTP):** Admin multi-factor auth setup.

### **Current Mocks in Use (approx. 6 areas):**
1. **ShadowFox API:** Shipping rate and AWB generation are mocked locally.
2. **AWS S3 / Cloudinary:** Media uploads are saved locally in the `uploads/` folder instead of the cloud.
3. **Razorpay Refunds:** Live refund settlements are bypassed; wallet refunds work dynamically, but source refunds just update DB state.
4. **Marketing Crons:** Push notifications log to the console instead of firing actual Firebase FCM queries.
5. **HR/Finance Overview Trends:** Percentage trends (`+12.5%`) and active daily counts are currently hardcoded mock data.
6. **Catalog Best Sellers:** Feed endpoints are mocked using generic categories instead of ML-driven recommendation logic.
