# Complete API Testing Guide: COSKINn (Phases 1-5 & Missing Features)

This guide provides a comprehensive Postman testing plan for the entire COSKINn eCommerce lifecycle. Every API across all modules from Auth to Endpoints is covered here.
> **Note:** Ensure your backend is running locally (`npm run start:dev`). All endpoints are prefixed with `/api`.

---

## 🔐 1. AUTH & CUSTOMER DOMAIN

### Admin & Staff Login
- **Trigger OTP:** `POST /api/auth/login` | Body: `{ "email": "admin@coskinn.com", "password": "admin" }`
- **Verify OTP:** `POST /api/auth/verify-otp` | Body: `{ "phone": "+91...", "otp": "123456", "isAdminLogin": true }` -> Returns `access_token` (AdminToken)
- **Get Me:** `GET /api/auth/me` | Headers: `Authorization: Bearer <AdminToken>`

### Customer Login
- **Send OTP:** `POST /api/auth/send-otp` | Body: `{ "phone": "+919876543210" }`
- **Verify OTP:** `POST /api/auth/verify-otp` | Body: `{ "phone": "+919876543210", "otp": "1234", "isAdminLogin": false }` -> Returns `access_token` (CustomerToken)

### Customer Profiles & Addresses
- **Get Profile:** `GET /api/customer/profile` | Headers: `Authorization: Bearer <CustomerToken>`
- **Update Profile:** `PUT /api/customer/profile` | Body: `{ "skinType": "OILY", "skinConcerns": ["ACNE"] }`
- **Create Address:** `POST /api/customer/addresses` | Body: `{ "fullName": "Jane", "phone": "+919...", "addressLine1": "123 St", "city": "Mumbai", "pincode": "400001" }`
- **Get Addresses:** `GET /api/customer/addresses`

---

## 🛍️ 2. PRODUCT CATALOG DOMAIN (AdminToken Required for POST/PUT/DELETE)

### Categories
- **Create:** `POST /api/categories` | Body: `{ "name": "Skincare", "slug": "skincare", "productLine": "SKINCARE" }`
- **List:** `GET /api/categories?productLine=SKINCARE`
- **Update/Delete:** `PATCH /api/categories/:id` | `DELETE /api/categories/:id`

### Products & Bundles
- **Create Product:** `POST /api/product` | Body: `{ "name": "Vitamin C Serum", "slug": "vit-c", "categoryId": "...", "mrp": 500, "productLine": "SKINCARE" }`
- **Create Variant:** `POST /api/product/:id/variant` | Body: `{ "sku": "VIT-C-30ML", "name": "30ml", "mrp": 500, "price": 400 }`
- **Add Bundle Item:** `POST /api/product/:id/bundle-items` | Body: `{ "componentSku": "COMP-SKU", "quantity": 1 }`
- **Remove Bundle Item:** `DELETE /api/product/:id/bundle-items/:sku`
- **List All (Admin):** `GET /api/product`

### Public Catalog (No Auth Required)
- **Get All Products:** `GET /api/products?segment=SKINCARE`
- **Get By ID/Slug:** `GET /api/products/:id`
- **Search:** `GET /api/products/search?q=serum&segment=SKINCARE`
- **Home Dashboard:** `GET /api/home?segment=SKINCARE`
- **SEO Metadata:** `GET /api/seo/product/:slug` | `GET /api/seo/category/:slug`

### Product Reviews
- **Submit Review:** `POST /api/products/:id/reviews` | Headers: `<CustomerToken>` | Body: `{ "rating": 5, "title": "Great", "content": "..." }`
- **Moderate Reviews (Admin):** `GET /api/product-review?status=PENDING`
- **Approve Review (Admin):** `PATCH /api/product-review/:id/approve`

---

## 📦 3. INVENTORY & WAREHOUSE DOMAIN (AdminToken Required)

### Warehouse & Serviceability
- **Create Warehouse:** `POST /api/warehouse` | Body: `{ "name": "Mumbai Hub" }`
- **List Warehouses:** `GET /api/warehouse`
- **Create Serviceable Pincode:** `POST /api/serviceable-pincode` | Body: `{ "code": "400001", "city": "Mumbai" }`
- **Check Serviceability (Public):** `GET /api/serviceable-pincode/check/400001`

### Inventory & Suppliers
- **Create Supplier:** `POST /api/supplier` | Body: `{ "name": "ABC Labs", "email": "contact@abc.com" }`
- **Get Global Stock:** `GET /api/inventory/global-stock`
- **Get SKU Stock:** `GET /api/inventory/stock/:sku` (Dynamically calculates bundle inventory too!)
- **Stock In (Manual):** `POST /api/inventory/stock-in` | Body: `{ "warehouseId": "...", "sku": "VIT-C-30ML", "quantity": 100 }`
- **Stock Out (Manual):** `POST /api/inventory/stock-out`

### Purchase Orders (PO)
- **Create PO:** `POST /api/purchase-order` | Body: `{ "warehouseId": "...", "supplierId": "..." }`
- **Create GRN (Goods Received Note):** `POST /api/purchase-order/grn` | Body: `{ "purchaseOrderId": "...", "items": [{ "sku": "VIT-C-30ML", "quantity": 50 }] }` -> (Auto triggers Stock-In)

---

## 🛒 4. SHOPPING, CART & WISHLIST (CustomerToken Required)

### Wishlist
- **Toggle Item:** `POST /api/wishlist/:productId`
- **View Wishlist:** `GET /api/wishlist`

### Cart
- **Add to Cart:** `POST /api/cart/items` | Body: `{ "productId": "...", "variantId": "...", "quantity": 1 }`
- **Update Quantity:** `PUT /api/cart/items/:id` | Body: `{ "quantity": 2 }`
- **View Cart:** `GET /api/cart` (Returns Best-Offer discounts & Wallet balances automatically)
- **Remove Item:** `DELETE /api/cart/items/:id`

---

## 💳 5. CHECKOUT, PAYMENTS & ORDERS

### Checkout (CustomerToken)
- **Create Order:** `POST /api/orders` | Body: `{ "addressId": "...", "paymentMode": "ONLINE", "pointsToRedeem": 50 }` -> Returns `razorpayOrderId`
- **View My Orders:** `GET /api/orders`
- **Download Invoice:** `GET /api/orders/:id/invoice`

### Payments (Webhooks)
- **Razorpay Success Webhook:** `POST /api/payments/webhook` | Headers: `x-razorpay-signature` | Body: `{ "event": "payment.captured", "payload": { "payment": { "entity": { "order_id": "...", "status": "captured" } } } }` -> (Converts Draft order to Placed)

### Order Management & Shipping (AdminToken)
- **List All Orders:** `GET /api/admin/orders?status=PLACED`
- **Update Status:** `PUT /api/admin/orders/:id/status` | Body: `{ "status": "SHIPPED" }`
- **Track Shipment (Public):** `GET /api/shipping/track/:orderId`

---

## 🔄 6. RETURNS & REFUNDS (CustomerToken & AdminToken)

- **Request Return (Customer):** `POST /api/return` | Body: `{ "orderId": "...", "items": [...], "reason": "Damaged" }`
- **Approve Return (Admin):** `PATCH /api/return/:id/approve`
- **Initiate Refund (Admin):** `POST /api/refund/initiate` | Body: `{ "orderId": "...", "amount": 500 }`

---

## 🎁 7. PROMOTIONS, OFFERS & LOYALTY

### Coupons & Offers (AdminToken to Create)
- **Create Coupon:** `POST /api/coupon` | Body: `{ "code": "WELCOME10", "discountPercent": 10 }`
- **Create Offer:** `POST /api/offer` | Body: `{ "name": "Diwali Sale", "discountType": "PERCENTAGE", "discountValue": 15 }`
- **Apply Coupon (Customer):** `POST /api/cart/apply-coupon` | Body: `{ "code": "WELCOME10" }`

### Loyalty: Wallet, Points, Bonus & Referral (CustomerToken)
- **Get Wallet Balance:** `GET /api/wallet`
- **Get Reward Points:** `GET /api/reward-point`
- **Generate Referral Code:** `POST /api/referral/generate`
- **Get Membership Tier:** `GET /api/membership/status`
- **View Available Bonuses:** `GET /api/bonus/available`

---

## 📊 8. ADMIN PANELS, HR & FINANCE (AdminToken Required)

### Tax & Finance
- **Get HSN Codes / Tax Rates:** `GET /api/tax/hsn` | `GET /api/tax/rates`
- **Get Finance Ledgers:** `GET /api/finance-report/ledgers`
- **Generate Sales Report:** `GET /api/finance-report/sales?startDate=...&endDate=...`

### HR Module
- **List Employees:** `GET /api/hr/employees`
- **Create Employee:** `POST /api/hr/employees` | Body: `{ "name": "John", "role": "MANAGER", "salary": 50000 }`
- **Mark Attendance:** `POST /api/hr/attendance`
- **Generate Payroll:** `POST /api/hr/payroll` | Body: `{ "employeeId": "...", "month": 10, "year": 2026 }`

### CMS & Content
- **Create Article:** `POST /api/content/articles` | Body: `{ "title": "Tips", "segment": "SKINCARE" }`
- **Get Articles (Public):** `GET /api/content/articles?segment=SKINCARE`
- **Create FAQ:** `POST /api/content/faqs` | Body: `{ "question": "?", "answer": "!" }`

### Audit & Security
- **View Audit Logs:** `GET /api/audit/logs` (Auditor Role Required)

---

## 📈 9. MARKETING & ENGAGEMENT (AdminToken Required)

- **Create Campaign:** `POST /api/marketing/campaigns` | Body: `{ "name": "Summer Sale", "targetSegment": "SKINCARE" }`
- **Create Banner:** `POST /api/marketing/banners` | Body: `{ "imageUrl": "...", "targetSegment": "SKINCARE" }`
- **Get Banners (Public):** `GET /api/marketing/banners?segment=SKINCARE`
- **Send Push Notification:** `POST /api/notification/push` | Body: `{ "userId": "...", "title": "Sale!", "body": "...", "mobileToken": "..." }`
- **Abandoned Cart Logs:** `GET /api/engagement/abandoned-carts`

---

## ⚖️ 10. SUPPORT, COMPLIANCE & APP CONFIG

### Customer Support
- **Create Ticket (Customer):** `POST /api/support/tickets` | Body: `{ "subject": "Issue", "priority": "HIGH" }`
- **Reply to Ticket (Admin):** `POST /api/support/tickets/:id/messages`
- **Close Ticket (Admin):** `PATCH /api/support/tickets/:id/close`

### Compliance (DPDP Act 2023)
- **Record Consent (Customer):** `POST /api/compliance/consent` | Body: `{ "push": true, "email": true, "sms": false, "whatsapp": true }`
- **Create Data Request (Customer):** `POST /api/compliance/data-request` | Body: `{ "requestType": "EXPORT" }`
- **Manage Data Requests (Admin):** `GET /api/compliance/admin/data-requests`
- **Update Request Status (Admin):** `PATCH /api/compliance/data-request/:id/status` | Body: `{ "status": "FULFILLED" }`

### App Versions (Force Updates)
- **Configure Version (Admin):** `POST /api/app-version` | Body: `{ "platform": "android", "latestVersion": "1.0.1", "minVersion": "1.0.0", "forceUpdate": false }`
- **Check Version (Public):** `GET /api/app-version/check?platform=android&version=1.0.0`
