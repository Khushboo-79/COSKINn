# Complete API Testing Guide: COSKINn Backend

> **Base URL:** `http://localhost:3000/api`
> **Prerequisites:** Backend running (`npm run start:dev`), Database connected (Docker PostgreSQL).
> **Global Prefix:** All endpoints are prefixed with `/api` via `app.setGlobalPrefix('api')`.

---

## 📋 Table of Contents

| # | Section | Auth Required |
|---|---------|---------------|
| 1 | [Auth — Admin Login](#1-auth--admin-login) | ❌ |
| 2 | [Auth — Customer Login (OTP)](#2-auth--customer-login-otp) | ❌ |
| 3 | [Auth — Token Management](#3-auth--token-management) | ❌ |
| 4 | [Home & Catalog (Public)](#4-home--catalog-public) | ❌ |
| 5 | [SEO (Public)](#5-seo-public) | ❌ |
| 6 | [Categories (Admin)](#6-categories-admin) | ✅ Admin |
| 7 | [Products (Admin CRUD)](#7-products-admin-crud) | ✅ Admin |
| 8 | [Product Variants](#8-product-variants) | ✅ Admin |
| 9 | [Product Media](#9-product-media) | ✅ Admin |
| 10 | [Product Lifecycle (Approval)](#10-product-lifecycle-approval) | ✅ Admin |
| 11 | [Product Reviews (Moderation)](#11-product-reviews-moderation) | ✅ Admin |
| 12 | [Customer Profile & Addresses](#12-customer-profile--addresses) | ✅ Customer |
| 13 | [Wishlist](#13-wishlist) | ✅ Customer |
| 14 | [Cart](#14-cart) | ✅ Customer |
| 15 | [Coupons](#15-coupons) | ✅ Customer |
| 16 | [Orders (Customer)](#16-orders-customer) | ✅ Customer |
| 17 | [Payments & Webhooks](#17-payments--webhooks) | ✅/❌ |
| 18 | [Invoices](#18-invoices) | ✅ |
| 19 | [Orders (Admin)](#19-orders-admin) | ✅ Admin |
| 20 | [Returns](#20-returns) | ✅ |
| 21 | [Refunds](#21-refunds) | ✅ Admin |
| 22 | [Shipping & Logistics](#22-shipping--logistics) | ✅ |
| 23 | [Warehouse Operations](#23-warehouse-operations) | ✅ Admin |
| 24 | [Inventory Management](#24-inventory-management) | ✅ Admin |
| 25 | [Purchase Orders](#25-purchase-orders) | ✅ Admin |
| 26 | [Wallet](#26-wallet) | ✅ Customer |
| 27 | [Referrals (Admin)](#27-referrals-admin) | ✅ Admin |
| 28 | [Engagement (Reviews & Q&A)](#28-engagement-reviews--qa) | ❌/✅ |
| 29 | [Marketing (Banners, Coupons, Campaigns)](#29-marketing-banners-coupons-campaigns) | ✅ Admin |
| 30 | [Support Tickets](#30-support-tickets) | ✅ |
| 31 | [HR Module](#31-hr-module) | ✅ Admin |
| 32 | [Tax Module](#32-tax-module) | ✅ Admin |
| 33 | [Finance & Reporting](#33-finance--reporting) | ✅ Admin |
| 34 | [Audit & Compliance](#34-audit--compliance) | ✅ Admin |
| 35 | [CMS (Content)](#35-cms-content) | ❌/✅ |
| 36 | [Admin Config & RBAC](#36-admin-config--rbac) | ✅ SuperAdmin |
| 37 | [CRM (Customer Admin)](#37-crm-customer-admin) | ✅ Admin |
| 38 | [Upload](#38-upload) | ✅ Admin |
| 39 | [Product CSV Import/Export](#39-product-csv-importexport) | ✅ Admin |

---

## 🔑 Postman Setup

### Step 1: Create Environment Variables

Create a Postman environment named `COSKINn Local` with these variables:

| Variable | Initial Value |
|----------|---------------|
| `base_url` | `http://localhost:3000/api` |
| `admin_token` | *(empty — set after login)* |
| `customer_token` | *(empty — set after login)* |
| `category_id` | *(empty)* |
| `product_id` | *(empty)* |
| `variant_id` | *(empty)* |
| `order_id` | *(empty)* |
| `address_id` | *(empty)* |
| `razorpay_order_id` | *(empty)* |

### Step 2: Create Authorization Helpers

For **Admin requests**, set the Authorization header:
```
Authorization: Bearer {{admin_token}}
```

For **Customer requests**, set the Authorization header:
```
Authorization: Bearer {{customer_token}}
```

---

# 🔐 SECTION A: Authentication

## 1. Auth — Admin Login

### 1.1 Admin Login (Trigger OTP)
- **Method:** `POST`
- **URL:** `{{base_url}}/auth/login`
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
> 📌 Check your backend terminal for the 6-digit OTP.

### 1.2 Verify Admin OTP & Get Token
- **Method:** `POST`
- **URL:** `{{base_url}}/auth/verify-otp`
- **Body (JSON):**
```json
{
  "phone": "+919876543210",
  "otp": "<6_DIGIT_OTP_FROM_TERMINAL>",
  "isAdminLogin": true
}
```
**Expected Output:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```
> 📌 Copy `access_token` → Set as `admin_token` in your environment.

---

## 2. Auth — Customer Login (OTP)

### 2.1 Send OTP
- **Method:** `POST`
- **URL:** `{{base_url}}/auth/send-otp`
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
> 📌 Check your terminal for the 4-digit OTP.

### 2.2 Verify Customer OTP
- **Method:** `POST`
- **URL:** `{{base_url}}/auth/verify-otp`
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
  "access_token": "eyJhbGciOiJIUzI1NiIs...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIs..."
}
```
> 📌 Copy `access_token` → Set as `customer_token` in your environment.

---

## 3. Auth — Token Management

### 3.1 Refresh Token
- **Method:** `POST`
- **URL:** `{{base_url}}/auth/refresh`
- **Body (JSON):**
```json
{
  "refreshToken": "{{refresh_token}}"
}
```
**Expected Output:**
```json
{
  "access_token": "eyJhbG...(new token)...",
  "refresh_token": "eyJhbG...(new refresh token)..."
}
```

### 3.2 Logout
- **Method:** `POST`
- **URL:** `{{base_url}}/auth/logout`
- **Body (JSON):**
```json
{
  "refreshToken": "{{refresh_token}}"
}
```
**Expected Output:**
```json
{
  "message": "Logged out successfully"
}
```

---

# 🌐 SECTION B: Public / Storefront APIs

## 4. Home & Catalog (Public)

### 4.1 Home Dashboard
- **Method:** `GET`
- **URL:** `{{base_url}}/home`
**Expected Output:**
```json
{
  "banners": [...],
  "featuredProducts": [...],
  "categories": [...],
  "newArrivals": [...]
}
```

### 4.2 Catalog Home Dashboard
- **Method:** `GET`
- **URL:** `{{base_url}}/catalog/home`
**Expected Output:**
```json
{
  "categories": [...],
  "bestSellers": [...],
  "newArrivals": [...]
}
```

### 4.3 Catalog Search
- **Method:** `GET`
- **URL:** `{{base_url}}/catalog/search?q=hair`
**Expected Output:**
```json
[
  {
    "id": "...",
    "name": "Nourishing Hair Oil",
    "slug": "nourishing-hair-oil",
    "discountPrice": 1199
  }
]
```

### 4.4 Catalog Products (with filters)
- **Method:** `GET`
- **URL:** `{{base_url}}/catalog/products?page=1&minPrice=500&maxPrice=2000&category=haircare&skinType=oily`
**Expected Output:**
```json
{
  "data": [...],
  "total": 5,
  "page": 1
}
```

### 4.5 Get Product by Slug
- **Method:** `GET`
- **URL:** `{{base_url}}/catalog/products/nourishing-hair-oil`
**Expected Output:**
```json
{
  "id": "...",
  "name": "Nourishing Hair Oil",
  "slug": "nourishing-hair-oil",
  "variants": [...],
  "images": [...]
}
```

### 4.6 Get Similar Products
- **Method:** `GET`
- **URL:** `{{base_url}}/catalog/products/{{product_id}}/similar`

### 4.7 Customer Recommendations
- **Method:** `GET`
- **URL:** `{{base_url}}/catalog/customer/recommendations`

### 4.8 Category by Slug
- **Method:** `GET`
- **URL:** `{{base_url}}/catalog/categories/haircare`

### 4.9 Public Products (Paginated & Filtered)
- **Method:** `GET`
- **URL:** `{{base_url}}/products?page=1&limit=10&minPrice=200&maxPrice=5000&skinType=dry&sortBy=price_asc`
**Expected Output:**
```json
{
  "data": [...],
  "total": 20,
  "page": 1,
  "limit": 10
}
```

### 4.10 Product Search (Public)
- **Method:** `GET`
- **URL:** `{{base_url}}/products/search?q=moisturizer`

### 4.11 Products by Category
- **Method:** `GET`
- **URL:** `{{base_url}}/products/category/{{category_id}}`

### 4.12 Products by Concern
- **Method:** `GET`
- **URL:** `{{base_url}}/products/concern/{{concern_id}}`

### 4.13 Products by Fruit
- **Method:** `GET`
- **URL:** `{{base_url}}/products/fruit/mango`

### 4.14 Get Single Product (Public)
- **Method:** `GET`
- **URL:** `{{base_url}}/products/{{product_id}}`

### 4.15 Get Product Variants (Public)
- **Method:** `GET`
- **URL:** `{{base_url}}/products/{{product_id}}/variants`

---

## 5. SEO (Public)

### 5.1 Product SEO Meta
- **Method:** `GET`
- **URL:** `{{base_url}}/seo/product/nourishing-hair-oil`
**Expected Output:**
```json
{
  "title": "Nourishing Hair Oil | COSKINn",
  "description": "For strong, shiny hair.",
  "keywords": "hair oil, nourishing, skincare"
}
```

### 5.2 Category SEO Meta
- **Method:** `GET`
- **URL:** `{{base_url}}/seo/category/haircare`

### 5.3 Fruit SEO Meta
- **Method:** `GET`
- **URL:** `{{base_url}}/seo/fruit/mango`

---

# 🏗️ SECTION C: Admin — Catalog Management

## 6. Categories (Admin)

### 6.1 Get All Categories
- **Method:** `GET`
- **URL:** `{{base_url}}/categories`
**Expected Output:**
```json
[
  {
    "id": "cat123...",
    "name": "Haircare",
    "slug": "haircare",
    "subcategories": [...]
  }
]
```

### 6.2 Get Single Category
- **Method:** `GET`
- **URL:** `{{base_url}}/categories/{{category_id}}`

### 6.3 Create Category
- **Method:** `POST`
- **URL:** `{{base_url}}/categories`
- **Headers:** `Authorization: Bearer {{admin_token}}`
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
  "createdAt": "2026-07-17T10:00:00.000Z"
}
```
> 📌 Save `id` → `category_id`.

### 6.4 Update Category
- **Method:** `PUT`
- **URL:** `{{base_url}}/categories/{{category_id}}`
- **Headers:** `Authorization: Bearer {{admin_token}}`
- **Body (JSON):**
```json
{
  "name": "Hair & Scalp Care",
  "description": "Updated description"
}
```

### 6.5 Delete Category
- **Method:** `DELETE`
- **URL:** `{{base_url}}/categories/{{category_id}}`
- **Headers:** `Authorization: Bearer {{admin_token}}`

### 6.6 Create Subcategory
- **Method:** `POST`
- **URL:** `{{base_url}}/categories/subcategories`
- **Headers:** `Authorization: Bearer {{admin_token}}`
- **Body (JSON):**
```json
{
  "name": "Hair Oils",
  "slug": "hair-oils",
  "categoryId": "{{category_id}}"
}
```

### 6.7 Update Subcategory
- **Method:** `PUT`
- **URL:** `{{base_url}}/categories/subcategories/:subcategoryId`
- **Headers:** `Authorization: Bearer {{admin_token}}`
- **Body (JSON):**
```json
{
  "name": "Natural Hair Oils"
}
```

### 6.8 Delete Subcategory
- **Method:** `DELETE`
- **URL:** `{{base_url}}/categories/subcategories/:subcategoryId`
- **Headers:** `Authorization: Bearer {{admin_token}}`

---

## 7. Products (Admin CRUD)

### 7.1 Create Product
- **Method:** `POST`
- **URL:** `{{base_url}}/product`
- **Headers:** `Authorization: Bearer {{admin_token}}`
- **Roles:** `SUPER_ADMIN`, `PRODUCT_MANAGER`
- **Body (JSON):**
```json
{
  "name": "Nourishing Hair Oil",
  "slug": "nourishing-hair-oil",
  "sku": "HAIR-OIL-BASE",
  "description": "For strong, shiny hair.",
  "categoryId": "{{category_id}}",
  "mrp": 1499.00,
  "discountPrice": 1199.00
}
```
**Expected Output:**
```json
{
  "id": "p789xyz...",
  "name": "Nourishing Hair Oil",
  "slug": "nourishing-hair-oil",
  "sku": "HAIR-OIL-BASE",
  "status": "DRAFT"
}
```
> 📌 Save `id` → `product_id`.

### 7.2 Get All Products (Admin)
- **Method:** `GET`
- **URL:** `{{base_url}}/product?categoryId={{category_id}}&search=hair`

### 7.3 Get Single Product (Admin)
- **Method:** `GET`
- **URL:** `{{base_url}}/product/{{product_id}}`

### 7.4 Update Product
- **Method:** `PATCH`
- **URL:** `{{base_url}}/product/{{product_id}}`
- **Headers:** `Authorization: Bearer {{admin_token}}`
- **Body (JSON):**
```json
{
  "name": "Nourishing Hair Oil - Premium",
  "discountPrice": 1099.00
}
```

### 7.5 Delete Product
- **Method:** `DELETE`
- **URL:** `{{base_url}}/product/{{product_id}}`
- **Headers:** `Authorization: Bearer {{admin_token}}`

### 7.6 Update Tags
- **Method:** `PATCH`
- **URL:** `{{base_url}}/product/{{product_id}}/tags`
- **Headers:** `Authorization: Bearer {{admin_token}}`
- **Body (JSON):**
```json
{
  "tags": ["bestseller", "new-arrival", "organic"]
}
```

### 7.7 Update Compliance
- **Method:** `PATCH`
- **URL:** `{{base_url}}/product/{{product_id}}/compliance`
- **Headers:** `Authorization: Bearer {{admin_token}}`
- **Body (JSON):**
```json
{
  "manufacturer": "COSKINn Labs",
  "countryOfOrigin": "India",
  "fssaiLicense": "12345678901234"
}
```

### 7.8 Update Content (Rich Description)
- **Method:** `PATCH`
- **URL:** `{{base_url}}/product/{{product_id}}/content`
- **Headers:** `Authorization: Bearer {{admin_token}}`
- **Body (JSON):**
```json
{
  "howToUse": "Apply 2-3 drops on scalp. Massage gently.",
  "ingredients": "Coconut Oil, Argan Oil, Vitamin E"
}
```

### 7.9 Update Product SEO
- **Method:** `PATCH`
- **URL:** `{{base_url}}/product/{{product_id}}/seo`
- **Headers:** `Authorization: Bearer {{admin_token}}`
- **Body (JSON):**
```json
{
  "seoTitle": "Best Hair Oil for Dry Hair",
  "seoDesc": "Premium nourishing hair oil with argan and coconut.",
  "seoKeywords": "hair oil, argan, coconut, dry hair"
}
```

### 7.10 Marketing Feed
- **Method:** `GET`
- **URL:** `{{base_url}}/product/marketing-feed`

### 7.11 Product Stats & Reports
- **Method:** `GET`
- **URL:** `{{base_url}}/product/stats/reports`
- **Headers:** `Authorization: Bearer {{admin_token}}`
**Expected Output:**
```json
{
  "totalProducts": 25,
  "activeProducts": 20,
  "draftProducts": 3,
  "outOfStock": 2,
  "topSelling": [...]
}
```

---

## 8. Product Variants

### 8.1 Create Variant
- **Method:** `POST`
- **URL:** `{{base_url}}/product/{{product_id}}/variant`
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
  "name": "100ml Bottle",
  "price": 1199
}
```
> 📌 Save `id` → `variant_id`.

### 8.2 Update Variant
- **Method:** `PATCH`
- **URL:** `{{base_url}}/product/{{product_id}}/variant/{{variant_id}}`
- **Body (JSON):**
```json
{
  "price": 1099.00,
  "mrp": 1399.00
}
```

### 8.3 Delete Variant
- **Method:** `DELETE`
- **URL:** `{{base_url}}/product/{{product_id}}/variant/{{variant_id}}`

### 8.4 Initialize Opening Stock
- **Method:** `POST`
- **URL:** `{{base_url}}/product/{{product_id}}/variant/{{variant_id}}/stock`
- **Headers:** `Authorization: Bearer {{admin_token}}`
- **Body (JSON):**
```json
{
  "quantity": 100,
  "warehouseId": "{{warehouse_id}}"
}
```

---

## 9. Product Media

### 9.1 Upload Image
- **Method:** `POST`
- **URL:** `{{base_url}}/product/{{product_id}}/media/image`
- **Body:** `form-data` → key: `file`, value: select image file
**Expected Output:**
```json
{
  "id": "img123...",
  "url": "http://localhost:3000/uploads/media/1689123456-hair-oil.jpg",
  "order": 0
}
```

### 9.2 Add Video (URL)
- **Method:** `POST`
- **URL:** `{{base_url}}/product/{{product_id}}/media/video`
- **Body (JSON):**
```json
{
  "url": "https://youtube.com/watch?v=example",
  "title": "How to use Hair Oil"
}
```

### 9.3 Reorder Media
- **Method:** `PATCH`
- **URL:** `{{base_url}}/product/{{product_id}}/media/reorder`
- **Body (JSON):**
```json
{
  "orderedIds": ["img123", "img456", "vid789"]
}
```

### 9.4 Delete Image
- **Method:** `DELETE`
- **URL:** `{{base_url}}/product/{{product_id}}/media/image/:imageId`

### 9.5 Delete Video
- **Method:** `DELETE`
- **URL:** `{{base_url}}/product/{{product_id}}/media/video/:videoId`

---

## 10. Product Lifecycle (Approval)

### 10.1 Submit for Approval
- **Method:** `POST`
- **URL:** `{{base_url}}/product/{{product_id}}/submit-approval`
- **Headers:** `Authorization: Bearer {{admin_token}}`
**Expected Output:**
```json
{
  "id": "...",
  "status": "PENDING_APPROVAL"
}
```

### 10.2 Approve Product (Super Admin)
- **Method:** `POST`
- **URL:** `{{base_url}}/product/{{product_id}}/approve`
- **Headers:** `Authorization: Bearer {{admin_token}}`
**Expected Output:**
```json
{
  "id": "...",
  "status": "ACTIVE"
}
```

### 10.3 Reject Product (Super Admin)
- **Method:** `POST`
- **URL:** `{{base_url}}/product/{{product_id}}/reject`
- **Headers:** `Authorization: Bearer {{admin_token}}`
- **Body (JSON):**
```json
{
  "reason": "Missing ingredient list and compliance data"
}
```

### 10.4 Deactivate Product
- **Method:** `POST`
- **URL:** `{{base_url}}/product/{{product_id}}/deactivate`
- **Headers:** `Authorization: Bearer {{admin_token}}`

---

## 11. Product Reviews (Moderation)

### 11.1 Get All Reviews
- **Method:** `GET`
- **URL:** `{{base_url}}/product-review?status=PENDING&search=hair`
- **Headers:** `Authorization: Bearer {{admin_token}}`
**Expected Output:**
```json
[
  {
    "id": "rev123...",
    "rating": 4,
    "title": "Great product!",
    "content": "My hair feels amazing",
    "isApproved": false,
    "product": { "name": "Nourishing Hair Oil" },
    "user": { "firstName": "Jane", "lastName": "Doe" }
  }
]
```

### 11.2 Approve Review
- **Method:** `PATCH`
- **URL:** `{{base_url}}/product-review/:reviewId/approve`
- **Headers:** `Authorization: Bearer {{admin_token}}`

### 11.3 Delete Review
- **Method:** `DELETE`
- **URL:** `{{base_url}}/product-review/:reviewId`
- **Headers:** `Authorization: Bearer {{admin_token}}`

---

# 🛒 SECTION D: Customer Shopping Flow

## 12. Customer Profile & Addresses

### 12.1 Get My Profile
- **Method:** `GET`
- **URL:** `{{base_url}}/customer/me`
- **Headers:** `Authorization: Bearer {{customer_token}}`
**Expected Output:**
```json
{
  "id": "usr123...",
  "phone": "+919876543210",
  "firstName": "Jane",
  "lastName": "Doe",
  "email": "jane@example.com"
}
```

### 12.2 Update Profile
- **Method:** `PUT`
- **URL:** `{{base_url}}/customer/profile`
- **Headers:** `Authorization: Bearer {{customer_token}}`
- **Body (JSON):**
```json
{
  "firstName": "Jane",
  "lastName": "Doe",
  "email": "jane@example.com",
  "gender": "female",
  "dateOfBirth": "1995-05-15"
}
```

### 12.3 Save Skin Quiz
- **Method:** `POST`
- **URL:** `{{base_url}}/customer/skin-quiz`
- **Headers:** `Authorization: Bearer {{customer_token}}`
- **Body (JSON):**
```json
{
  "skinType": "oily",
  "concerns": ["acne", "dark_spots"],
  "age": "25-30"
}
```
**Expected Output:**
```json
{
  "message": "Skin quiz preferences saved successfully!",
  "recommendationsUrl": "/api/customer/recommendations"
}
```

### 12.4 Get All Addresses
- **Method:** `GET`
- **URL:** `{{base_url}}/customer/addresses`
- **Headers:** `Authorization: Bearer {{customer_token}}`

### 12.5 Check Serviceability (No Auth)
- **Method:** `GET`
- **URL:** `{{base_url}}/customer/addresses/serviceability?pincode=400001`
**Expected Output:**
```json
{
  "serviceable": true,
  "codAvailable": true,
  "message": "Delivery is available"
}
```

### 12.6 Add Address
- **Method:** `POST`
- **URL:** `{{base_url}}/customer/addresses`
- **Headers:** `Authorization: Bearer {{customer_token}}`
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
  "city": "Mumbai",
  "isDefault": true
}
```
> 📌 Save `id` → `address_id`.

### 12.7 Update Address
- **Method:** `PUT`
- **URL:** `{{base_url}}/customer/addresses/{{address_id}}`
- **Headers:** `Authorization: Bearer {{customer_token}}`
- **Body (JSON):**
```json
{
  "addressLine1": "456 New Street",
  "pincode": "400002"
}
```

### 12.8 Delete Address
- **Method:** `DELETE`
- **URL:** `{{base_url}}/customer/addresses/{{address_id}}`
- **Headers:** `Authorization: Bearer {{customer_token}}`

---

## 13. Wishlist

### 13.1 Get Wishlist
- **Method:** `GET`
- **URL:** `{{base_url}}/wishlist`
- **Headers:** `Authorization: Bearer {{customer_token}}`
**Expected Output:**
```json
[
  {
    "id": "wl123...",
    "productId": "p789xyz...",
    "product": { "name": "Nourishing Hair Oil", "discountPrice": 1199 }
  }
]
```

### 13.2 Add to Wishlist
- **Method:** `POST`
- **URL:** `{{base_url}}/wishlist/{{product_id}}`
- **Headers:** `Authorization: Bearer {{customer_token}}`

### 13.3 Remove from Wishlist
- **Method:** `DELETE`
- **URL:** `{{base_url}}/wishlist/{{product_id}}`
- **Headers:** `Authorization: Bearer {{customer_token}}`

---

## 14. Cart

### 14.1 Get Cart
- **Method:** `GET`
- **URL:** `{{base_url}}/cart`
- **Headers:** `Authorization: Bearer {{customer_token}}`
**Expected Output:**
```json
{
  "items": [
    {
      "id": "ci123...",
      "productId": "p789xyz...",
      "variantId": "v123abc...",
      "quantity": 2,
      "product": { "name": "Nourishing Hair Oil" }
    }
  ],
  "summary": {
    "totalMrp": 2998,
    "totalDiscountPrice": 2398,
    "offerDiscount": 0,
    "finalTotal": 2398,
    "walletBalance": 100,
    "rewardPointsBalance": 0
  }
}
```

### 14.2 Add to Cart
- **Method:** `POST`
- **URL:** `{{base_url}}/cart/items`
- **Headers:** `Authorization: Bearer {{customer_token}}`
- **Body (JSON):**
```json
{
  "productId": "{{product_id}}",
  "variantId": "{{variant_id}}",
  "quantity": 2
}
```

### 14.3 Update Cart Item Quantity
- **Method:** `PUT`
- **URL:** `{{base_url}}/cart/items/:cartItemId`
- **Headers:** `Authorization: Bearer {{customer_token}}`
- **Body (JSON):**
```json
{
  "quantity": 3
}
```

### 14.4 Remove from Cart
- **Method:** `DELETE`
- **URL:** `{{base_url}}/cart/items/:cartItemId`
- **Headers:** `Authorization: Bearer {{customer_token}}`

---

## 15. Coupons

### 15.1 Apply Coupon
- **Method:** `POST`
- **URL:** `{{base_url}}/cart/coupon/apply`
- **Headers:** `Authorization: Bearer {{customer_token}}`
- **Body (JSON):**
```json
{
  "code": "WELCOME20"
}
```
**Expected Output:**
```json
{
  "message": "Coupon applied successfully",
  "discount": 200,
  "finalTotal": 2198
}
```

---

# 💳 SECTION E: Checkout & Fulfillment

## 16. Orders (Customer)

### 16.1 Create Order / Checkout
- **Method:** `POST`
- **URL:** `{{base_url}}/orders`
- **Headers:** `Authorization: Bearer {{customer_token}}`
- **Body (JSON):**
```json
{
  "addressId": "{{address_id}}",
  "paymentMode": "ONLINE",
  "pointsToRedeem": 0
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
> 📌 Save `id` → `order_id`, `razorpayOrderId` → `razorpay_order_id`.

### 16.2 Place Order with Reward Points
- **Method:** `POST`
- **URL:** `{{base_url}}/orders`
- **Headers:** `Authorization: Bearer {{customer_token}}`
- **Body (JSON):**
```json
{
  "addressId": "{{address_id}}",
  "paymentMode": "ONLINE",
  "pointsToRedeem": 50
}
```
> ⚠️ Attempting to redeem more points than you own will throw an error.

### 16.3 Cancel Order (Customer)
- **Method:** `POST`
- **URL:** `{{base_url}}/orders/{{order_id}}/cancel`
- **Headers:** `Authorization: Bearer {{customer_token}}`
- **Body (JSON):**
```json
{
  "reason": "Changed my mind"
}
```

---

## 17. Payments & Webhooks

### 17.1 Create Razorpay Order
- **Method:** `POST`
- **URL:** `{{base_url}}/payments/create-order`
- **Headers:** `Authorization: Bearer {{customer_token}}`
- **Body (JSON):**
```json
{
  "orderId": "{{order_id}}"
}
```
**Expected Output:**
```json
{
  "razorpayOrderId": "order_xyz123",
  "amount": 239800,
  "currency": "INR"
}
```

### 17.2 Simulate Payment Success (Webhook)
- **Method:** `POST`
- **URL:** `{{base_url}}/payments/webhook`
- **Headers:** `x-razorpay-signature: mock_signature`
- **Body (JSON):**
```json
{
  "event": "payment.captured",
  "payload": {
    "payment": {
      "entity": {
        "order_id": "{{razorpay_order_id}}",
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
> 📌 Order status transitions from `DRAFT` → `PLACED`.

---

## 18. Invoices

### 18.1 Get/Download Invoice (Customer)
- **Method:** `GET`
- **URL:** `{{base_url}}/orders/{{order_id}}/invoice`
- **Headers:** `Authorization: Bearer {{customer_token}}`
**Expected Output:**
```json
{
  "pdfUrl": "/invoices/INV-ord123.pdf",
  "invoiceNumber": "INV-2026-0001",
  "gstDetails": { "cgst": 108, "sgst": 108, "total": 216 }
}
```

### 18.2 Create Credit Note (Admin)
- **Method:** `POST`
- **URL:** `{{base_url}}/admin/invoices/:invoiceId/credit-note`
- **Headers:** `Authorization: Bearer {{admin_token}}`
- **Roles:** `ADMIN`, `SUPER_ADMIN`, `FINANCE`
- **Body (JSON):**
```json
{
  "amount": 500,
  "reason": "Damaged goods return"
}
```

### 18.3 Create Debit Note (Admin)
- **Method:** `POST`
- **URL:** `{{base_url}}/admin/invoices/:invoiceId/debit-note`
- **Headers:** `Authorization: Bearer {{admin_token}}`
- **Body (JSON):**
```json
{
  "amount": 200,
  "reason": "Additional shipping charges"
}
```

---

## 19. Orders (Admin)

### 19.1 List All Orders (Admin)
- **Method:** `GET`
- **URL:** `{{base_url}}/admin/orders?status=PLACED&paymentMode=ONLINE`
- **Headers:** `Authorization: Bearer {{admin_token}}`
**Expected Output:**
```json
[
  {
    "id": "ord123...",
    "status": "PLACED",
    "totalAmount": 2398,
    "paymentMode": "ONLINE",
    "user": { "firstName": "Jane", "phone": "+919876543210" }
  }
]
```

### 19.2 Get Order Details (Admin)
- **Method:** `GET`
- **URL:** `{{base_url}}/admin/orders/{{order_id}}`
- **Headers:** `Authorization: Bearer {{admin_token}}`

### 19.3 Get Order Invoice (Admin)
- **Method:** `GET`
- **URL:** `{{base_url}}/admin/orders/{{order_id}}/invoice`
- **Headers:** `Authorization: Bearer {{admin_token}}`

### 19.4 Update Order Status
- **Method:** `PUT`
- **URL:** `{{base_url}}/admin/orders/{{order_id}}/status`
- **Headers:** `Authorization: Bearer {{admin_token}}`
- **Body (JSON):**
```json
{
  "status": "SHIPPED",
  "notes": "Shipped via BlueDart AWB#12345"
}
```
**Expected Output:**
```json
{
  "id": "ord123...",
  "status": "SHIPPED",
  "shippedAt": "2026-07-17T11:00:00.000Z"
}
```
> 📌 Status flow: `DRAFT` → `PLACED` → `CONFIRMED` → `SHIPPED` → `DELIVERED`

### 19.5 Admin Cancel Order
- **Method:** `POST`
- **URL:** `{{base_url}}/admin/orders/{{order_id}}/cancel`
- **Headers:** `Authorization: Bearer {{admin_token}}`
- **Body (JSON):**
```json
{
  "reason": "Out of stock"
}
```

### 19.6 Get Cancellations
- **Method:** `GET`
- **URL:** `{{base_url}}/admin/orders/config/cancellations`
- **Headers:** `Authorization: Bearer {{admin_token}}`

### 19.7 Get Order Settings
- **Method:** `GET`
- **URL:** `{{base_url}}/admin/orders/settings/config`
- **Headers:** `Authorization: Bearer {{admin_token}}`

### 19.8 Update Order Settings
- **Method:** `PUT`
- **URL:** `{{base_url}}/admin/orders/settings/config`
- **Headers:** `Authorization: Bearer {{admin_token}}`
- **Body (JSON):**
```json
{
  "returnWindowDays": 7,
  "autoCancelHours": 48,
  "codEnabled": true,
  "maxCodAmount": 5000
}
```

---

## 20. Returns

### 20.1 Request Return (Customer)
- **Method:** `POST`
- **URL:** `{{base_url}}/returns/request`
- **Headers:** `Authorization: Bearer {{customer_token}}`
- **Body (JSON):**
```json
{
  "orderId": "{{order_id}}",
  "reason": "Product damaged during delivery",
  "refundType": "WALLET"
}
```
**Expected Output:**
```json
{
  "id": "ret123...",
  "status": "REQUESTED",
  "orderId": "ord123...",
  "reason": "Product damaged during delivery"
}
```

### 20.2 List All Returns (Admin)
- **Method:** `GET`
- **URL:** `{{base_url}}/returns?status=REQUESTED`
- **Headers:** `Authorization: Bearer {{admin_token}}`

### 20.3 Process Return (Admin — Approve/Reject)
- **Method:** `PUT`
- **URL:** `{{base_url}}/returns/:returnId/process`
- **Headers:** `Authorization: Bearer {{admin_token}}`
- **Body (JSON):**
```json
{
  "action": "APPROVED",
  "adminNotes": "Return approved. Ship back within 5 days."
}
```

### 20.4 Return QC (Warehouse)
- **Method:** `POST`
- **URL:** `{{base_url}}/returns/:returnId/qc`
- **Headers:** `Authorization: Bearer {{admin_token}}`
- **Body (JSON):**
```json
{
  "qcResult": "PASS"
}
```

---

## 21. Refunds

### 21.1 Process Wallet Refund
- **Method:** `POST`
- **URL:** `{{base_url}}/refunds/process/wallet`
- **Headers:** `Authorization: Bearer {{admin_token}}`
- **Roles:** `SUPER_ADMIN`, `FINANCE`
- **Body (JSON):**
```json
{
  "orderId": "{{order_id}}",
  "amount": 1199,
  "reason": "Return approved and QC passed"
}
```

### 21.2 Process Original Source Refund
- **Method:** `POST`
- **URL:** `{{base_url}}/refunds/process/original-source`
- **Headers:** `Authorization: Bearer {{admin_token}}`
- **Body (JSON):**
```json
{
  "orderId": "{{order_id}}",
  "amount": 1199,
  "reason": "Refund to original payment method"
}
```

---

## 22. Shipping & Logistics

### 22.1 Check Serviceability
- **Method:** `POST`
- **URL:** `{{base_url}}/shipping/serviceability`
- **Body (JSON):**
```json
{
  "pincode": "400001"
}
```
**Expected Output:**
```json
{
  "serviceable": true,
  "estimatedDeliveryDays": 3,
  "codAvailable": true
}
```

### 22.2 Create Shipment (Admin)
- **Method:** `POST`
- **URL:** `{{base_url}}/shipping/shipments`
- **Headers:** `Authorization: Bearer {{admin_token}}`
- **Roles:** `SUPER_ADMIN`, `ORDER_MANAGER`
- **Body (JSON):**
```json
{
  "orderId": "{{order_id}}",
  "weightGrams": 500
}
```
**Expected Output:**
```json
{
  "id": "ship123...",
  "trackingNumber": "SF12345678",
  "carrier": "ShadowFox",
  "status": "CREATED"
}
```

### 22.3 Get Order Shipments
- **Method:** `GET`
- **URL:** `{{base_url}}/shipping/orders/{{order_id}}`
- **Headers:** `Authorization: Bearer {{customer_token}}`

### 22.4 Get All Shipments (Admin)
- **Method:** `GET`
- **URL:** `{{base_url}}/shipping/all`
- **Headers:** `Authorization: Bearer {{admin_token}}`

---

## 23. Warehouse Operations

### 23.1 Generate Pick List
- **Method:** `POST`
- **URL:** `{{base_url}}/warehouse/pick-list`
- **Headers:** `Authorization: Bearer {{admin_token}}`
- **Roles:** `SUPER_ADMIN`, `WAREHOUSE_STAFF`, `ORDER_MANAGER`
- **Body (JSON):**
```json
{
  "orderIds": ["{{order_id}}"]
}
```
**Expected Output:**
```json
{
  "pickList": [
    {
      "sku": "HAIR-OIL-100ML",
      "productName": "Nourishing Hair Oil",
      "quantity": 2,
      "location": "Aisle A, Shelf 3"
    }
  ]
}
```

### 23.2 Verify Barcode Scan
- **Method:** `POST`
- **URL:** `{{base_url}}/warehouse/scan`
- **Headers:** `Authorization: Bearer {{admin_token}}`
- **Body (JSON):**
```json
{
  "orderId": "{{order_id}}",
  "barcode": "HAIR-OIL-100ML"
}
```

---

## 24. Inventory Management

### 24.1 Dashboard Stats
- **Method:** `GET`
- **URL:** `{{base_url}}/inventory/dashboard-stats`
- **Headers:** `Authorization: Bearer {{admin_token}}`
**Expected Output:**
```json
{
  "totalSKUs": 50,
  "totalStock": 5000,
  "lowStockCount": 3,
  "nearExpiryCount": 1
}
```

### 24.2 Get All Warehouses
- **Method:** `GET`
- **URL:** `{{base_url}}/inventory/warehouses`
- **Headers:** `Authorization: Bearer {{admin_token}}`

### 24.3 Create Warehouse
- **Method:** `POST`
- **URL:** `{{base_url}}/inventory/warehouses`
- **Headers:** `Authorization: Bearer {{admin_token}}`
- **Roles:** `SUPER_ADMIN`
- **Body (JSON):**
```json
{
  "name": "Mumbai Central Warehouse",
  "address": "Plot 42, MIDC, Andheri East",
  "city": "Mumbai",
  "pincode": "400093"
}
```

### 24.4 Get Global Stock
- **Method:** `GET`
- **URL:** `{{base_url}}/inventory/stock`
- **Headers:** `Authorization: Bearer {{admin_token}}`

### 24.5 Get Stock for SKU
- **Method:** `GET`
- **URL:** `{{base_url}}/inventory/stock/HAIR-OIL-100ML`
- **Headers:** `Authorization: Bearer {{admin_token}}`
**Expected Output:**
```json
{
  "sku": "HAIR-OIL-100ML",
  "totalQuantity": 100,
  "warehouses": [
    { "warehouseName": "Mumbai Central", "quantity": 60 },
    { "warehouseName": "Delhi Hub", "quantity": 40 }
  ]
}
```

### 24.6 Stock In (Inward)
- **Method:** `POST`
- **URL:** `{{base_url}}/inventory/stock-in`
- **Headers:** `Authorization: Bearer {{admin_token}}`
- **Body (JSON):**
```json
{
  "sku": "HAIR-OIL-100ML",
  "quantity": 50,
  "warehouseId": "{{warehouse_id}}",
  "batchNumber": "BATCH-2026-07",
  "expiryDate": "2028-07-01"
}
```

### 24.7 Stock Out
- **Method:** `POST`
- **URL:** `{{base_url}}/inventory/stock-out`
- **Headers:** `Authorization: Bearer {{admin_token}}`
- **Body (JSON):**
```json
{
  "sku": "HAIR-OIL-100ML",
  "quantity": 10,
  "warehouseId": "{{warehouse_id}}",
  "reason": "Shipped for order ORD123"
}
```

### 24.8 Adjust Stock
- **Method:** `POST`
- **URL:** `{{base_url}}/inventory/adjustment`
- **Headers:** `Authorization: Bearer {{admin_token}}`
- **Body (JSON):**
```json
{
  "sku": "HAIR-OIL-100ML",
  "warehouseId": "{{warehouse_id}}",
  "adjustedQuantity": -5,
  "reason": "Physical count correction"
}
```

### 24.9 Transfer Stock
- **Method:** `POST`
- **URL:** `{{base_url}}/inventory/transfer`
- **Headers:** `Authorization: Bearer {{admin_token}}`
- **Body (JSON):**
```json
{
  "sku": "HAIR-OIL-100ML",
  "fromWarehouseId": "wh_mumbai",
  "toWarehouseId": "wh_delhi",
  "quantity": 20
}
```

### 24.10 Report Damaged Stock
- **Method:** `POST`
- **URL:** `{{base_url}}/inventory/damaged`
- **Headers:** `Authorization: Bearer {{admin_token}}`
- **Body (JSON):**
```json
{
  "sku": "HAIR-OIL-100ML",
  "quantity": 3,
  "warehouseId": "{{warehouse_id}}",
  "reason": "Broken bottles during transit"
}
```

### 24.11 Report Expired Stock
- **Method:** `POST`
- **URL:** `{{base_url}}/inventory/expired`
- **Headers:** `Authorization: Bearer {{admin_token}}`
- **Body (JSON):**
```json
{
  "sku": "HAIR-OIL-100ML",
  "quantity": 5,
  "warehouseId": "{{warehouse_id}}"
}
```

### 24.12 Low Stock Alerts
- **Method:** `GET`
- **URL:** `{{base_url}}/inventory/alerts/low-stock`
- **Headers:** `Authorization: Bearer {{admin_token}}`

### 24.13 Near Expiry Alerts
- **Method:** `GET`
- **URL:** `{{base_url}}/inventory/alerts/near-expiry`
- **Headers:** `Authorization: Bearer {{admin_token}}`

### 24.14 Get Purchase Orders (via Inventory)
- **Method:** `GET`
- **URL:** `{{base_url}}/inventory/purchase-orders`
- **Headers:** `Authorization: Bearer {{admin_token}}`

### 24.15 Create Purchase Order (via Inventory)
- **Method:** `POST`
- **URL:** `{{base_url}}/inventory/purchase-orders`
- **Headers:** `Authorization: Bearer {{admin_token}}`
- **Body (JSON):**
```json
{
  "warehouseId": "{{warehouse_id}}",
  "vendorId": "vendor123",
  "status": "PENDING"
}
```

### 24.16 Update Purchase Order (via Inventory)
- **Method:** `POST`
- **URL:** `{{base_url}}/inventory/purchase-orders/:id/update`
- **Headers:** `Authorization: Bearer {{admin_token}}`
- **Body (JSON):**
```json
{
  "status": "RECEIVED",
  "items": [
    { "sku": "HAIR-OIL-100ML", "quantity": 50 }
  ]
}
```

### 24.17 Get Suppliers
- **Method:** `GET`
- **URL:** `{{base_url}}/inventory/suppliers`
- **Headers:** `Authorization: Bearer {{admin_token}}`

### 24.18 Create Supplier
- **Method:** `POST`
- **URL:** `{{base_url}}/inventory/suppliers`
- **Headers:** `Authorization: Bearer {{admin_token}}`
- **Body (JSON):**
```json
{
  "name": "Green Herbs Pvt Ltd",
  "contactEmail": "sales@greenherbs.com",
  "contactPhone": "+919012345678",
  "address": "Jaipur, Rajasthan"
}
```

### 24.19 Update Supplier
- **Method:** `POST`
- **URL:** `{{base_url}}/inventory/suppliers/:supplierId`
- **Headers:** `Authorization: Bearer {{admin_token}}`
- **Body (JSON):**
```json
{
  "name": "Green Herbs India Pvt Ltd"
}
```

### 24.20 Get Returns (Inventory)
- **Method:** `GET`
- **URL:** `{{base_url}}/inventory/returns`
- **Headers:** `Authorization: Bearer {{admin_token}}`

---

## 25. Purchase Orders

### 25.1 Create Purchase Order
- **Method:** `POST`
- **URL:** `{{base_url}}/purchase-orders`
- **Headers:** `Authorization: Bearer {{admin_token}}`
- **Roles:** `SUPER_ADMIN`, `INVENTORY_STAFF`, `WAREHOUSE_STAFF`
- **Body (JSON):**
```json
{
  "supplierId": "supplier123",
  "warehouseId": "{{warehouse_id}}",
  "items": [
    { "sku": "HAIR-OIL-100ML", "quantity": 100, "unitCost": 500 }
  ]
}
```

### 25.2 List Purchase Orders
- **Method:** `GET`
- **URL:** `{{base_url}}/purchase-orders`
- **Headers:** `Authorization: Bearer {{admin_token}}`

### 25.3 Get Purchase Order Detail
- **Method:** `GET`
- **URL:** `{{base_url}}/purchase-orders/:poId`
- **Headers:** `Authorization: Bearer {{admin_token}}`

### 25.4 Create GRN (Goods Received Note)
- **Method:** `POST`
- **URL:** `{{base_url}}/purchase-orders/:poId/grn`
- **Headers:** `Authorization: Bearer {{admin_token}}`
- **Body (JSON):**
```json
{
  "receivedItems": [
    { "sku": "HAIR-OIL-100ML", "receivedQuantity": 98, "rejectedQuantity": 2 }
  ],
  "notes": "2 bottles were broken"
}
```

---

# 💰 SECTION F: Financial & Promotional

## 26. Wallet

### 26.1 Get Wallet Balance
- **Method:** `GET`
- **URL:** `{{base_url}}/wallet`
- **Headers:** `Authorization: Bearer {{customer_token}}`
**Expected Output:**
```json
{
  "id": "wal123...",
  "userId": "usr123...",
  "balance": 100,
  "transactions": [
    {
      "type": "CREDIT",
      "amount": 100,
      "reference": "Sign-up Bonus",
      "createdAt": "2026-07-17T10:00:00.000Z"
    }
  ]
}
```

---

## 27. Referrals (Admin)

### 27.1 Get All Referrals
- **Method:** `GET`
- **URL:** `{{base_url}}/referral/admin/all`
- **Headers:** `Authorization: Bearer {{admin_token}}`
- **Roles:** `SUPER_ADMIN`, `MARKETING_MANAGER`
**Expected Output:**
```json
[
  {
    "id": "ref123...",
    "referrerId": "usr123...",
    "refereeId": "usr456...",
    "bonusAwarded": false
  }
]
```

### 27.2 Award Referral Bonus
- **Method:** `POST`
- **URL:** `{{base_url}}/referral/admin/:referralId/award`
- **Headers:** `Authorization: Bearer {{admin_token}}`

---

## 28. Engagement (Reviews & Q&A)

### 28.1 Get Product Reviews (Public)
- **Method:** `GET`
- **URL:** `{{base_url}}/products/{{product_id}}/reviews`

### 28.2 Add Review (Customer)
- **Method:** `POST`
- **URL:** `{{base_url}}/products/{{product_id}}/reviews`
- **Headers:** `Authorization: Bearer {{customer_token}}`
- **Body (JSON):**
```json
{
  "rating": 5,
  "title": "Amazing product!",
  "content": "My hair feels so smooth and healthy after using this oil."
}
```

### 28.3 Get Product Questions (Public)
- **Method:** `GET`
- **URL:** `{{base_url}}/products/{{product_id}}/questions`

### 28.4 Ask a Question (Customer)
- **Method:** `POST`
- **URL:** `{{base_url}}/products/{{product_id}}/questions`
- **Headers:** `Authorization: Bearer {{customer_token}}`
- **Body (JSON):**
```json
{
  "content": "Is this product suitable for sensitive scalp?"
}
```

---

# 🏢 SECTION G: Admin Panels

## 29. Marketing (Banners, Coupons, Campaigns)

### 29.1 Get Banners
- **Method:** `GET`
- **URL:** `{{base_url}}/marketing/banners`
- **Headers:** `Authorization: Bearer {{admin_token}}`

### 29.2 Create Banner
- **Method:** `POST`
- **URL:** `{{base_url}}/marketing/banners`
- **Headers:** `Authorization: Bearer {{admin_token}}`
- **Body (JSON):**
```json
{
  "title": "Summer Sale",
  "imageUrl": "https://example.com/summer-banner.jpg",
  "targetUrl": "/products?tag=summer",
  "position": 1,
  "isActive": true
}
```

### 29.3 Update Banner
- **Method:** `PUT`
- **URL:** `{{base_url}}/marketing/banners/:bannerId`
- **Headers:** `Authorization: Bearer {{admin_token}}`
- **Body (JSON):**
```json
{
  "title": "Monsoon Sale",
  "isActive": false
}
```

### 29.4 Delete Banner
- **Method:** `DELETE`
- **URL:** `{{base_url}}/marketing/banners/:bannerId`
- **Headers:** `Authorization: Bearer {{admin_token}}`

### 29.5 Get Coupons (Marketing)
- **Method:** `GET`
- **URL:** `{{base_url}}/marketing/coupons`
- **Headers:** `Authorization: Bearer {{admin_token}}`

### 29.6 Create Coupon
- **Method:** `POST`
- **URL:** `{{base_url}}/marketing/coupons`
- **Headers:** `Authorization: Bearer {{admin_token}}`
- **Body (JSON):**
```json
{
  "code": "WELCOME20",
  "discountType": "PERCENTAGE",
  "discountValue": 20,
  "minOrderValue": 500,
  "maxDiscount": 200,
  "usageLimit": 100,
  "expiresAt": "2026-12-31T23:59:59Z"
}
```

### 29.7 Update Coupon
- **Method:** `PUT`
- **URL:** `{{base_url}}/marketing/coupons/:couponId`
- **Headers:** `Authorization: Bearer {{admin_token}}`

### 29.8 Delete Coupon
- **Method:** `DELETE`
- **URL:** `{{base_url}}/marketing/coupons/:couponId`
- **Headers:** `Authorization: Bearer {{admin_token}}`

### 29.9 Get Campaigns
- **Method:** `GET`
- **URL:** `{{base_url}}/marketing/campaigns`
- **Headers:** `Authorization: Bearer {{admin_token}}`

### 29.10 Create Campaign
- **Method:** `POST`
- **URL:** `{{base_url}}/marketing/campaigns`
- **Headers:** `Authorization: Bearer {{admin_token}}`
- **Body (JSON):**
```json
{
  "name": "Diwali Sale 2026",
  "type": "EMAIL",
  "audience": "ALL_CUSTOMERS",
  "scheduledAt": "2026-10-29T10:00:00Z"
}
```

### 29.11 Get Abandoned Carts
- **Method:** `GET`
- **URL:** `{{base_url}}/marketing/abandoned-carts?recovered=false`
- **Headers:** `Authorization: Bearer {{admin_token}}`

---

## 30. Support Tickets

### 30.1 Create Ticket
- **Method:** `POST`
- **URL:** `{{base_url}}/support/tickets`
- **Headers:** `Authorization: Bearer {{customer_token}}`
- **Body (JSON):**
```json
{
  "userId": "{{user_id}}",
  "subject": "My order is delayed",
  "priority": "HIGH"
}
```
**Expected Output:**
```json
{
  "id": "tkt123...",
  "subject": "My order is delayed",
  "status": "OPEN",
  "priority": "HIGH"
}
```

### 30.2 Get Ticket Messages
- **Method:** `GET`
- **URL:** `{{base_url}}/support/tickets/:ticketId/messages`
- **Headers:** `Authorization: Bearer {{customer_token}}`

### 30.3 Get All Tickets (Admin)
- **Method:** `GET`
- **URL:** `{{base_url}}/support/admin/tickets?status=OPEN`
- **Headers:** `Authorization: Bearer {{admin_token}}`

### 30.4 Reply to Ticket (Admin)
- **Method:** `POST`
- **URL:** `{{base_url}}/support/admin/tickets/:ticketId/reply`
- **Headers:** `Authorization: Bearer {{admin_token}}`
- **Body (JSON):**
```json
{
  "adminId": "{{admin_user_id}}",
  "message": "We are looking into this. Your order will be shipped by tomorrow."
}
```

### 30.5 Close Ticket (Admin)
- **Method:** `POST`
- **URL:** `{{base_url}}/support/admin/tickets/:ticketId/close`
- **Headers:** `Authorization: Bearer {{admin_token}}`

### 30.6 Escalate Ticket (Admin)
- **Method:** `POST`
- **URL:** `{{base_url}}/support/admin/tickets/:ticketId/escalate`
- **Headers:** `Authorization: Bearer {{admin_token}}`

### 30.7 Assign Ticket (Admin)
- **Method:** `POST`
- **URL:** `{{base_url}}/support/admin/tickets/:ticketId/assign`
- **Headers:** `Authorization: Bearer {{admin_token}}`
- **Body (JSON):**
```json
{
  "adminId": "{{support_agent_id}}"
}
```

### 30.8 SLA Stats (Admin)
- **Method:** `GET`
- **URL:** `{{base_url}}/support/admin/tickets/stats/sla`
- **Headers:** `Authorization: Bearer {{admin_token}}`
**Expected Output:**
```json
{
  "totalTickets": 45,
  "openTickets": 10,
  "avgResolutionTimeHours": 4.2,
  "slaComplianceRate": 92
}
```

---

## 31. HR Module

### 31.1 HR Overview
- **Method:** `GET`
- **URL:** `{{base_url}}/admin/hr/overview`
- **Headers:** `Authorization: Bearer {{admin_token}}`
- **Roles:** `ADMIN`, `SUPER_ADMIN`, `HR`
**Expected Output:**
```json
{
  "totalEmployees": 12,
  "activeEmployees": 10,
  "totalPayroll": 600000,
  "pendingLeaves": 3
}
```

### 31.2 Get All Employees
- **Method:** `GET`
- **URL:** `{{base_url}}/admin/hr/employees`
- **Headers:** `Authorization: Bearer {{admin_token}}`

### 31.3 Get Employee by ID
- **Method:** `GET`
- **URL:** `{{base_url}}/admin/hr/employees/:employeeId`
- **Headers:** `Authorization: Bearer {{admin_token}}`

### 31.4 Create Employee
- **Method:** `POST`
- **URL:** `{{base_url}}/admin/hr/employees`
- **Headers:** `Authorization: Bearer {{admin_token}}`
- **Body (JSON):**
```json
{
  "name": "John Doe",
  "email": "john@coskinn.com",
  "role": "MANAGER",
  "department": "SALES",
  "salary": 50000,
  "phone": "+919012345678",
  "joinDate": "2026-07-01"
}
```

### 31.5 Get Leave Requests
- **Method:** `GET`
- **URL:** `{{base_url}}/admin/hr/leaves`
- **Headers:** `Authorization: Bearer {{admin_token}}`

### 31.6 Approve/Reject Leave
- **Method:** `POST`
- **URL:** `{{base_url}}/admin/hr/leaves/:leaveId/status`
- **Headers:** `Authorization: Bearer {{admin_token}}`
- **Body (JSON):**
```json
{
  "status": "Approved"
}
```

### 31.7 Get Payroll Summary
- **Method:** `GET`
- **URL:** `{{base_url}}/admin/hr/payroll`
- **Headers:** `Authorization: Bearer {{admin_token}}`

### 31.8 Mark Attendance
- **Method:** `POST`
- **URL:** `{{base_url}}/admin/hr/attendance`
- **Headers:** `Authorization: Bearer {{admin_token}}`
- **Body (JSON):**
```json
{
  "employeeId": "{{employee_id}}",
  "status": "PRESENT"
}
```

### 31.9 Seed HR Data (Dev/Testing)
- **Method:** `POST`
- **URL:** `{{base_url}}/admin/hr/seed`
- **Headers:** `Authorization: Bearer {{admin_token}}`

---

## 32. Tax Module

### 32.1 Get HSN Codes
- **Method:** `GET`
- **URL:** `{{base_url}}/admin/tax/hsn`
- **Headers:** `Authorization: Bearer {{admin_token}}`
**Expected Output:**
```json
[
  { "id": "...", "code": "3304", "description": "Beauty or make-up preparations" },
  { "id": "...", "code": "3305", "description": "Hair preparations" }
]
```

### 32.2 Create HSN Code
- **Method:** `POST`
- **URL:** `{{base_url}}/admin/tax/hsn`
- **Headers:** `Authorization: Bearer {{admin_token}}`
- **Body (JSON):**
```json
{
  "code": "3305",
  "description": "Preparations for use on the hair"
}
```

### 32.3 Get Tax Rates
- **Method:** `GET`
- **URL:** `{{base_url}}/admin/tax/rates`
- **Headers:** `Authorization: Bearer {{admin_token}}`
**Expected Output:**
```json
[
  { "id": "...", "name": "GST 18%", "cgst": 9, "sgst": 9, "igst": 18 }
]
```

### 32.4 Create Tax Rate
- **Method:** `POST`
- **URL:** `{{base_url}}/admin/tax/rates`
- **Headers:** `Authorization: Bearer {{admin_token}}`
- **Body (JSON):**
```json
{
  "name": "GST 18%",
  "cgst": 9,
  "sgst": 9,
  "igst": 18
}
```

---

## 33. Finance & Reporting

### 33.1 Finance Overview
- **Method:** `GET`
- **URL:** `{{base_url}}/admin/finance/overview`
- **Headers:** `Authorization: Bearer {{admin_token}}`
**Expected Output:**
```json
{
  "totalRevenue": 1500000,
  "totalOrders": 350,
  "totalRefunds": 25000,
  "netProfit": 1475000
}
```

### 33.2 Get Transactions
- **Method:** `GET`
- **URL:** `{{base_url}}/admin/finance/transactions`
- **Headers:** `Authorization: Bearer {{admin_token}}`

### 33.3 Monthly Breakdown
- **Method:** `GET`
- **URL:** `{{base_url}}/admin/finance/monthly-breakdown`
- **Headers:** `Authorization: Bearer {{admin_token}}`

### 33.4 Get Ledgers
- **Method:** `GET`
- **URL:** `{{base_url}}/admin/finance/ledgers`
- **Headers:** `Authorization: Bearer {{admin_token}}`

### 33.5 Create Ledger
- **Method:** `POST`
- **URL:** `{{base_url}}/admin/finance/ledgers`
- **Headers:** `Authorization: Bearer {{admin_token}}`
- **Body (JSON):**
```json
{
  "accountName": "Sales Revenue"
}
```

### 33.6 Create Journal Entry
- **Method:** `POST`
- **URL:** `{{base_url}}/admin/finance/journal-entries`
- **Headers:** `Authorization: Bearer {{admin_token}}`
- **Body (JSON):**
```json
{
  "ledgerId": "{{ledger_id}}",
  "type": "CREDIT",
  "amount": 1000,
  "reference": "Order #ORD123 payment received"
}
```

### 33.7 Sync Settlements
- **Method:** `POST`
- **URL:** `{{base_url}}/admin/finance/settlements/sync`
- **Headers:** `Authorization: Bearer {{admin_token}}`
- **Body (JSON):**
```json
{
  "settlements": [
    { "settlementId": "setl_abc", "amount": 50000, "settledAt": "2026-07-15" }
  ]
}
```

---

## 34. Audit & Compliance

### 34.1 Get Audit Logs
- **Method:** `GET`
- **URL:** `{{base_url}}/admin/audit/logs?page=1&limit=50&entity=Order`
- **Headers:** `Authorization: Bearer {{admin_token}}`
- **Roles:** `SUPER_ADMIN`, `AUDITOR`
**Expected Output:**
```json
{
  "data": [
    {
      "id": "log123...",
      "entity": "Order",
      "action": "STATUS_CHANGE",
      "details": "PLACED → SHIPPED",
      "userId": "admin123...",
      "createdAt": "2026-07-17T10:30:00.000Z"
    }
  ],
  "total": 150,
  "page": 1
}
```

### 34.2 Reward Usage Log
- **Method:** `GET`
- **URL:** `{{base_url}}/admin/audit/reward-usage`
- **Headers:** `Authorization: Bearer {{admin_token}}`

### 34.3 Sales Report
- **Method:** `GET`
- **URL:** `{{base_url}}/admin/audit/sales-report`
- **Headers:** `Authorization: Bearer {{admin_token}}`

### 34.4 Session Activity Log
- **Method:** `GET`
- **URL:** `{{base_url}}/admin/audit/session-activity`
- **Headers:** `Authorization: Bearer {{admin_token}}`

### 34.5 Stock Adjustments Log
- **Method:** `GET`
- **URL:** `{{base_url}}/admin/audit/stock-adjustments`
- **Headers:** `Authorization: Bearer {{admin_token}}`

### 34.6 Refund Report
- **Method:** `GET`
- **URL:** `{{base_url}}/admin/audit/refund-report`
- **Headers:** `Authorization: Bearer {{admin_token}}`

### 34.7 Payment Report
- **Method:** `GET`
- **URL:** `{{base_url}}/admin/audit/payment-report`
- **Headers:** `Authorization: Bearer {{admin_token}}`

---

## 35. CMS (Content)

### 35.1 Get Published Articles (Public)
- **Method:** `GET`
- **URL:** `{{base_url}}/content/articles?type=TIP`
**Expected Output:**
```json
[
  {
    "id": "art123...",
    "title": "Top 10 Skincare Tips",
    "slug": "top-10-skincare-tips",
    "type": "TIP",
    "isPublished": true
  }
]
```

### 35.2 Get Article by Slug (Public)
- **Method:** `GET`
- **URL:** `{{base_url}}/content/articles/top-10-skincare-tips`

### 35.3 Get FAQs (Public)
- **Method:** `GET`
- **URL:** `{{base_url}}/content/faqs`
**Expected Output:**
```json
[
  {
    "id": "faq123...",
    "question": "What is your return policy?",
    "answer": "We accept returns within 7 days of delivery.",
    "order": 1
  }
]
```

### 35.4 Create Article (Admin)
- **Method:** `POST`
- **URL:** `{{base_url}}/content/admin/articles`
- **Headers:** `Authorization: Bearer {{admin_token}}`
- **Roles:** `SUPER_ADMIN`, `CONTENT_MANAGER`
- **Body (JSON):**
```json
{
  "title": "Top 10 Skincare Tips for Monsoon",
  "slug": "top-10-skincare-tips-monsoon",
  "type": "TIP",
  "contentJson": "{\"blocks\": [{\"type\": \"paragraph\", \"text\": \"Monsoon brings humidity...\"}]}",
  "isPublished": true
}
```

### 35.5 Update Article (Admin)
- **Method:** `PUT`
- **URL:** `{{base_url}}/content/admin/articles/:articleId`
- **Headers:** `Authorization: Bearer {{admin_token}}`

### 35.6 Delete Article (Admin)
- **Method:** `DELETE`
- **URL:** `{{base_url}}/content/admin/articles/:articleId`
- **Headers:** `Authorization: Bearer {{admin_token}}`

### 35.7 Create FAQ (Admin)
- **Method:** `POST`
- **URL:** `{{base_url}}/content/admin/faqs`
- **Headers:** `Authorization: Bearer {{admin_token}}`
- **Body (JSON):**
```json
{
  "question": "How long does delivery take?",
  "answer": "Standard delivery takes 3-5 business days.",
  "order": 2
}
```

### 35.8 Update FAQ (Admin)
- **Method:** `PUT`
- **URL:** `{{base_url}}/content/admin/faqs/:faqId`
- **Headers:** `Authorization: Bearer {{admin_token}}`

### 35.9 Delete FAQ (Admin)
- **Method:** `DELETE`
- **URL:** `{{base_url}}/content/admin/faqs/:faqId`
- **Headers:** `Authorization: Bearer {{admin_token}}`

### 35.10 Get Global SEO Settings (Admin)
- **Method:** `GET`
- **URL:** `{{base_url}}/content/admin/seo/global`
- **Headers:** `Authorization: Bearer {{admin_token}}`

### 35.11 Update Global SEO Settings (Admin)
- **Method:** `PUT`
- **URL:** `{{base_url}}/content/admin/seo/global`
- **Headers:** `Authorization: Bearer {{admin_token}}`
- **Body (JSON):**
```json
{
  "siteTitle": "COSKINn - Premium Skincare",
  "siteDescription": "India's leading natural skincare brand",
  "defaultOgImage": "https://coskinn.com/og-image.jpg"
}
```

---

## 36. Admin Config & RBAC

### 36.1 Admin Overview Dashboard
- **Method:** `GET`
- **URL:** `{{base_url}}/admin/config/overview`
- **Headers:** `Authorization: Bearer {{admin_token}}`
- **Roles:** `SUPER_ADMIN`
**Expected Output:**
```json
{
  "totalUsers": 500,
  "totalOrders": 350,
  "totalRevenue": 1500000,
  "activeProducts": 25
}
```

### 36.2 Get All Roles
- **Method:** `GET`
- **URL:** `{{base_url}}/admin/config/roles`
- **Headers:** `Authorization: Bearer {{admin_token}}`
**Expected Output:**
```json
[
  "SUPER_ADMIN",
  "PRODUCT_MANAGER",
  "ORDER_MANAGER",
  "INVENTORY_STAFF",
  "WAREHOUSE_STAFF",
  "MARKETING_MANAGER",
  "CONTENT_MANAGER",
  "FINANCE",
  "HR",
  "SUPPORT",
  "AUDITOR",
  "CRM_MANAGER"
]
```

### 36.3 Get All Users
- **Method:** `GET`
- **URL:** `{{base_url}}/admin/config/users`
- **Headers:** `Authorization: Bearer {{admin_token}}`

### 36.4 Assign Role to User
- **Method:** `POST`
- **URL:** `{{base_url}}/admin/config/users/assign-role`
- **Headers:** `Authorization: Bearer {{admin_token}}`
- **Body (JSON):**
```json
{
  "userId": "{{user_id}}",
  "roleName": "PRODUCT_MANAGER"
}
```

### 36.5 Get System Settings
- **Method:** `GET`
- **URL:** `{{base_url}}/admin/config/settings`
- **Headers:** `Authorization: Bearer {{admin_token}}`

### 36.6 Update System Settings
- **Method:** `PUT`
- **URL:** `{{base_url}}/admin/config/settings`
- **Headers:** `Authorization: Bearer {{admin_token}}`
- **Body (JSON):**
```json
{
  "storeName": "COSKINn",
  "storeEmail": "support@coskinn.com",
  "currency": "INR",
  "signupBonus": 100
}
```

### 36.7 Get Notifications
- **Method:** `GET`
- **URL:** `{{base_url}}/admin/config/notifications`
- **Headers:** `Authorization: Bearer {{admin_token}}`

---

## 37. CRM (Customer Admin)

### 37.1 Get All Customers (Admin)
- **Method:** `GET`
- **URL:** `{{base_url}}/customer/admin/all?page=1&limit=10&search=jane`
- **Headers:** `Authorization: Bearer {{admin_token}}`
- **Roles:** `SUPER_ADMIN`, `CRM_MANAGER`, `CUSTOMER_SUPPORT`
**Expected Output:**
```json
{
  "data": [
    {
      "id": "usr123...",
      "phone": "+919876543210",
      "firstName": "Jane",
      "email": "jane@example.com",
      "totalOrders": 5,
      "totalSpent": 12000
    }
  ],
  "total": 250,
  "page": 1
}
```

### 37.2 Customer 360° View
- **Method:** `GET`
- **URL:** `{{base_url}}/customer/admin/:customerId/360`
- **Headers:** `Authorization: Bearer {{admin_token}}`
**Expected Output:**
```json
{
  "profile": { "firstName": "Jane", "email": "jane@example.com" },
  "orders": [...],
  "wallet": { "balance": 100 },
  "tickets": [...],
  "addresses": [...]
}
```

### 37.3 Block User
- **Method:** `POST`
- **URL:** `{{base_url}}/customer/admin/:customerId/block`
- **Headers:** `Authorization: Bearer {{admin_token}}`

### 37.4 Unblock User
- **Method:** `POST`
- **URL:** `{{base_url}}/customer/admin/:customerId/unblock`
- **Headers:** `Authorization: Bearer {{admin_token}}`

### 37.5 Send Reset Password Link
- **Method:** `POST`
- **URL:** `{{base_url}}/customer/admin/:customerId/reset-password`
- **Headers:** `Authorization: Bearer {{admin_token}}`

---

## 38. Upload

### 38.1 Get Presigned Upload URL
- **Method:** `POST`
- **URL:** `{{base_url}}/upload/presigned-url`
- **Headers:** `Authorization: Bearer {{admin_token}}`
- **Roles:** `ADMIN`, `PRODUCT_MANAGER`, `MARKETING`
- **Body (JSON):**
```json
{
  "fileName": "product-image.jpg",
  "contentType": "image/jpeg",
  "folder": "products"
}
```
**Expected Output:**
```json
{
  "uploadUrl": "https://s3.amazonaws.com/bucket/...",
  "publicUrl": "https://cdn.coskinn.com/products/product-image.jpg"
}
```

---

## 39. Product CSV Import/Export

### 39.1 Export Products CSV
- **Method:** `GET`
- **URL:** `{{base_url}}/product/export/csv`
- **Headers:** `Authorization: Bearer {{admin_token}}`
> 📌 Response is a downloadable CSV file.

### 39.2 Import Products CSV
- **Method:** `POST`
- **URL:** `{{base_url}}/product/import/csv`
- **Headers:** `Authorization: Bearer {{admin_token}}`
- **Body:** `form-data` → key: `file`, value: select CSV file
**Expected Output:**
```json
{
  "imported": 15,
  "skipped": 2,
  "errors": ["Row 5: Missing SKU"]
}
```

---

# 🧪 SECTION H: Testing Workflow (Step-by-Step)

Follow this exact sequence to test the complete e-commerce lifecycle:

## Phase 1: Setup
| Step | Action | Endpoint |
|------|--------|----------|
| 1 | Admin Login | `POST /auth/login` |
| 2 | Verify Admin OTP | `POST /auth/verify-otp` |
| 3 | Create Category | `POST /categories` |
| 4 | Create Product | `POST /product` |
| 5 | Create Variant | `POST /product/:id/variant` |
| 6 | Upload Image | `POST /product/:id/media/image` |
| 7 | Submit for Approval | `POST /product/:id/submit-approval` |
| 8 | Approve Product | `POST /product/:id/approve` |

## Phase 2: Customer Flow
| Step | Action | Endpoint |
|------|--------|----------|
| 9 | Customer Login | `POST /auth/send-otp` |
| 10 | Verify OTP | `POST /auth/verify-otp` |
| 11 | Browse Home | `GET /home` |
| 12 | Search Products | `GET /products/search?q=hair` |
| 13 | View Product Detail | `GET /products/:id` |
| 14 | Add to Wishlist | `POST /wishlist/:productId` |
| 15 | Add to Cart | `POST /cart/items` |
| 16 | View Cart | `GET /cart` |
| 17 | Apply Coupon | `POST /cart/coupon/apply` |
| 18 | Add Address | `POST /customer/addresses` |
| 19 | Check Serviceability | `GET /customer/addresses/serviceability?pincode=400001` |

## Phase 3: Checkout & Payment
| Step | Action | Endpoint |
|------|--------|----------|
| 20 | Create Order | `POST /orders` |
| 21 | Simulate Payment | `POST /payments/webhook` |
| 22 | Download Invoice | `GET /orders/:id/invoice` |
| 23 | Leave a Review | `POST /products/:id/reviews` |

## Phase 4: Admin Fulfillment
| Step | Action | Endpoint |
|------|--------|----------|
| 24 | View Placed Orders | `GET /admin/orders?status=PLACED` |
| 25 | Generate Pick List | `POST /warehouse/pick-list` |
| 26 | Create Shipment | `POST /shipping/shipments` |
| 27 | Update to SHIPPED | `PUT /admin/orders/:id/status` |
| 28 | Update to DELIVERED | `PUT /admin/orders/:id/status` |

## Phase 5: Post-Delivery
| Step | Action | Endpoint |
|------|--------|----------|
| 29 | Request Return | `POST /returns/request` |
| 30 | Admin Approve Return | `PUT /returns/:id/process` |
| 31 | Warehouse QC | `POST /returns/:id/qc` |
| 32 | Process Refund | `POST /refunds/process/wallet` |
| 33 | Check Wallet Balance | `GET /wallet` |

---

# 📊 Complete API Route Summary

| Module | Routes | Auth |
|--------|--------|------|
| Auth | 5 | ❌ |
| Home | 1 | ❌ |
| Catalog | 6 | ❌ |
| Public Products | 7 | ❌ |
| SEO | 3 | ❌ |
| Categories | 8 | ✅ Admin (CUD) |
| Products (Admin) | 14 | ✅ Admin |
| Variants | 3 | ✅ Admin |
| Media | 5 | ✅ Admin |
| Product Review Moderation | 3 | ✅ Admin |
| Customer Profile | 8 | ✅ Customer |
| Wishlist | 3 | ✅ Customer |
| Cart | 4 | ✅ Customer |
| Coupons | 1 | ✅ Customer |
| Orders (Customer) | 3 | ✅ Customer |
| Payments | 2 | ✅/❌ |
| Invoices | 3 | ✅ |
| Orders (Admin) | 8 | ✅ Admin |
| Returns | 4 | ✅ |
| Refunds | 2 | ✅ Admin |
| Shipping | 4 | ✅ |
| Warehouse | 2 | ✅ Admin |
| Inventory | 20 | ✅ Admin |
| Purchase Orders | 4 | ✅ Admin |
| Wallet | 1 | ✅ Customer |
| Referrals | 2 | ✅ Admin |
| Engagement (Reviews/Q&A) | 4 | ❌/✅ |
| Marketing | 11 | ✅ Admin |
| Support | 8 | ✅ |
| HR | 9 | ✅ Admin |
| Tax | 4 | ✅ Admin |
| Finance | 7 | ✅ Admin |
| Audit | 7 | ✅ Admin |
| CMS (Content) | 11 | ❌/✅ |
| Admin Config | 7 | ✅ Super Admin |
| CRM | 5 | ✅ Admin |
| Upload | 1 | ✅ Admin |
| CSV Import/Export | 2 | ✅ Admin |
| **TOTAL** | **~200** | |
