# Postman Testing Guide: COSKINn API (Auth to End)

This guide provides the exact requests you need to test the entire flow of the COSKINn platform, from logging in as an admin to creating a fully functional product.

> [!NOTE] 
> All requests assume your backend is running locally at `http://localhost:3000/api`.
> 
> **Want to test instantly?** We have generated a Postman Collection for you! Open Postman, click **Import**, and select the `docs/COSKINn_Postman_Collection.json` file in this repository. All the requests below are already pre-configured for you!

---

## 1. Authentication (2FA Flow)

Since we enforce 2FA for admins, you must first log in with your email/password to trigger the OTP, and then verify the OTP.

### Step 1A: Login (Trigger OTP)
- **Method:** `POST`
- **URL:** `http://localhost:3000/api/auth/login`
- **Body (JSON):**
```json
{
  "email": "admin@coskinn.com",
  "password": "your_secure_password"
}
```
*Look at your terminal! (The exact terminal window where you ran `npm run start:dev` for the backend). The NestJS server will print a 6-digit mock OTP in the console logs.*

### Step 1B: Verify OTP
- **Method:** `POST`
- **URL:** `http://localhost:3000/api/auth/verify-otp`
- **Body (JSON):**
```json
{
  "phone": "+919876543210", 
  "otp": "123456" 
}
```
*(Use the phone number associated with the admin account, and the OTP printed in the terminal).*
**Important:** Copy the `access_token` from the response.

### Step 1C: Set Authorization Header in Postman
For all subsequent requests below, you must go to the **Authorization** tab in Postman, select **Bearer Token**, and paste your `access_token`.

---

## 2. Product Metadata (Tags)

Before creating a product, we need to create the tags associated with it.

### Create Category
- **Method:** `POST`
- **URL:** `http://localhost:3000/api/categories`
- **Body (JSON):**
```json
{
  "name": "Skincare",
  "slug": "skincare",
  "description": "Premium skincare products"
}
```
*(Copy the generated category `id` from the response for later).*

---

## 3. Media Upload (S3 Presigned URL)

Before saving a product, the frontend uploads the image to AWS S3. Here is how to test that API:

### Get Presigned URL
- **Method:** `POST`
- **URL:** `http://localhost:3000/api/upload/presigned-url`
- **Body (JSON):**
```json
{
  "fileName": "cleanser.jpg",
  "contentType": "image/jpeg",
  "folder": "products"
}
```
*(This will return a `presignedUrl` which you would normally use to PUT the actual file, and a `finalUrl` which is what you save to the database).*

---

## 4. Product Creation

Now that we have categories, tags, and image URLs, we can create the actual product.

### Create Product
- **Method:** `POST`
- **URL:** `http://localhost:3000/api/product`
- **Body (JSON):**
```json
{
  "name": "Hydrating Cleanser",
  "slug": "hydrating-cleanser",
  "description": "A gentle cleanser for all skin types.",
  "categoryId": "<INSERT_CATEGORY_ID_HERE>",
  "mrp": 999.00,
  "discountPrice": 799.00
}
```
*(Copy the generated product `id`).*

### Add Product Variant
- **Method:** `POST`
- **URL:** `http://localhost:3000/api/product/<INSERT_PRODUCT_ID_HERE>/variant`
- **Body (JSON):**
```json
{
  "sku": "CLEANSER-50ML",
  "name": "50ml Travel Size",
  "netQuantity": "50ml",
  "mrp": 499.00,
  "price": 399.00
}
```

---

## 5. Public Catalog & Search APIs (Phase 2)

These endpoints do not require authentication (`Authorization: Bearer <token>` is not needed) and are used by the customer-facing frontend.

### Step 5A: List All Products
- **Method:** `GET`
- **URL:** `http://localhost:3000/api/products?page=1&limit=10`
*(Returns paginated live products with basic details).*

### Step 5B: Search Products (Typo-Tolerant)
- **Method:** `GET`
- **URL:** `http://localhost:3000/api/products/search?q=cleanser`
*(Tests PostgreSQL full-text search across name and description).*

### Step 5C: Get Product by Fruit Ingredient
- **Method:** `GET`
- **URL:** `http://localhost:3000/api/products/fruit/watermelon`

### Step 5D: Get Single Product Details
- **Method:** `GET`
- **URL:** `http://localhost:3000/api/products/<INSERT_PRODUCT_ID_HERE>`
*(Returns full product data including reviews, questions, variants, ingredients).*

### Step 5E: Filter & Sort Products
- **Method:** `GET`
- **URL:** `http://localhost:3000/api/products?minPrice=500&maxPrice=1500&skinType=Oily&sortBy=price_asc`
*(Tests the dynamic querying and sorting engine).*

### Step 5F: SEO Data for Product
- **Method:** `GET`
- **URL:** `http://localhost:3000/api/seo/product/hydrating-cleanser`
*(Returns fast, lightweight SEO tags for Next.js SSG).*

### Step 5G: SEO Data for Fruit Landing Page
- **Method:** `GET`
- **URL:** `http://localhost:3000/api/seo/fruit/watermelon`

### Step 5H: Cart & Address
1. **Add Item to Cart**: `POST http://localhost:3000/cart/items`
   - Headers: `Authorization: Bearer <CustomerToken>`
   - Body: `{"productId": "<id>", "variantId": "<id>", "quantity": 1}`
2. **View Cart**: `GET http://localhost:3000/cart`
3. **Save Address**: `POST http://localhost:3000/customer-profile/addresses`
   - Body: `{"fullName": "John Doe", "addressLine1": "123 Street", "city": "Mumbai", "state": "MH", "pincode": "400001", "phone": "9999999999"}`
4. **Serviceability Check**: `GET http://localhost:3000/customer-profile/addresses/serviceability?pincode=400001`

### Step 5I: Coupons & Orders
1. **Apply Coupon**: `POST http://localhost:3000/cart/coupon/apply`
   - Body: `{"code": "WELCOME10"}`
2. **Create Order (Draft)**: `POST http://localhost:3000/orders`
   - Body: `{"addressId": "<saved_address_id>", "paymentMode": "ONLINE"}`

### Step 5J: Razorpay Webhook & Notifications
1. **Simulate Webhook**: `POST http://localhost:3000/payments/webhook`
   - Headers: `x-razorpay-signature: mock_signature` (bypasses crypto check for local dev)
   - Body: `{"event": "payment.captured", "payload": {"payment": {"entity": {"order_id": "<mock_rzp_id_returned_from_createOrder>"}}}}`
   - Expected: Order status updates to `PLACED`, and an internal notification fires in server logs.

### Step 5K: Invoices
1. **Generate Invoice PDF**: `GET http://localhost:3000/orders/<order_id>/invoice`
   - Headers: `Authorization: Bearer <CustomerToken>`
   - Expected: Returns a JSON with `pdfUrl`. You can then view the PDF physically generated in the `backend/public/invoices/` folder.

### Step 5L: Admin Order Management
1. **List All Orders (Admin)**: `GET http://localhost:3000/admin/orders?status=PLACED`
   - Headers: `Authorization: Bearer <AdminToken>`
2. **Update Order Status (Admin)**: `PUT http://localhost:3000/admin/orders/<order_id>/status`
   - Headers: `Authorization: Bearer <AdminToken>`
   - Body: `{"status": "PACKED"}`

### Step 5M: Home Dashboard API
- **Method:** `GET`
- **URL:** `http://localhost:3000/api/home`
*(Returns banners, categories, trending fruits, and new arrivals in one call).*

### Step 5I: Post a Review (Requires Customer Login)
- **Method:** `POST`
- **URL:** `http://localhost:3000/api/products/<INSERT_PRODUCT_ID_HERE>/reviews`
- **Headers:** `Authorization: Bearer <CUSTOMER_JWT_TOKEN>`
- **Body (JSON):**
```json
{
  "rating": 5,
  "title": "Amazing product!",
  "content": "Loved it, my skin feels great."
}
```

### Step 5J: Add to Wishlist (Requires Customer Login)
- **Method:** `POST`
- **URL:** `http://localhost:3000/api/wishlist/<INSERT_PRODUCT_ID_HERE>`
- **Headers:** `Authorization: Bearer <CUSTOMER_JWT_TOKEN>`

---

## 6. Customer Checkout Flow

Once you have a product, you can test the complete customer checkout journey.

### Step 6A: Add to Cart
- **Method:** `POST`
- **URL:** `http://localhost:3000/api/cart/items`
- **Body (JSON):**
```json
{
  "productId": "<INSERT_PRODUCT_ID_HERE>",
  "quantity": 1
}
```

### Step 5B: Get Cart Totals
- **Method:** `GET`
- **URL:** `http://localhost:3000/api/cart`
*(This will return the cart items along with dynamic `totalMrp`, `totalDiscountPrice`, and `totalSavings`).*

### Step 5C: Add Delivery Address
- **Method:** `POST`
- **URL:** `http://localhost:3000/api/customer/addresses`
- **Body (JSON):**
```json
{
  "fullName": "Jane Doe",
  "phone": "+919876543210",
  "addressLine1": "123 Beauty Lane",
  "city": "Mumbai",
  "state": "Maharashtra",
  "pincode": "400001"
}
```
*(Copy the generated address `id` from the response).*

### Step 5D: Checkout (Create Order)
- **Method:** `POST`
- **URL:** `http://localhost:3000/api/orders`
- **Body (JSON):**
```json
{
  "addressId": "<INSERT_ADDRESS_ID_HERE>",
  "paymentMode": "ONLINE"
}
```
*(This automatically clears your cart and creates an Order in DRAFT status. Copy the generated order `id`).*

### Step 5E: Razorpay Create Order
- **Method:** `POST`
- **URL:** `http://localhost:3000/api/payments/create-order`
- **Body (JSON):**
```json
{
  "orderId": "<INSERT_ORDER_ID_HERE>"
}
```
*(This simulates generating a Razorpay Order ID for the frontend to open the payment modal).*

---

# AWS Deployment Guide

If you are running the COSKINn backend on an AWS EC2 instance, follow these commands to get it up and running in production.

### 1. Prerequisites
Ensure your AWS EC2 instance has Node.js (v18+) and PM2 installed.
```bash
# Update server
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2 globally (Process Manager to keep the app running)
sudo npm install -g pm2
```

### 2. Setup the Project
SSH into your AWS instance and clone your repository.
```bash
git clone <your-repo-url>
cd COSKINn/backend

# Install dependencies
npm install
```

### 3. Environment Variables
Create your `.env` file on the server.
```bash
nano .env
```
Ensure you have the production database URL and AWS S3 credentials:
```env
DATABASE_URL="postgresql://user:password@your-rds-endpoint.amazonaws.com:5432/coskinn?schema=public"
JWT_SECRET="your_secure_production_secret"
AWS_REGION="ap-south-1"
AWS_ACCESS_KEY_ID="your_access_key"
AWS_SECRET_ACCESS_KEY="your_secret_key"
AWS_S3_BUCKET="coskinn-media-storage"
```

### 4. Build and Run
First, generate the Prisma client and push the schema to your production database, then build the NestJS app.
```bash
# Generate Prisma Client
npx prisma generate

# Push schema to production DB (or run migrations: npx prisma migrate deploy)
npx prisma db push

# Build the NestJS application
npm run build

# Start the application using PM2
pm2 start dist/main.js --name "coskinn-backend"

# Save the PM2 list so it restarts automatically on server reboot
pm2 save
pm2 startup
```

### 5. Viewing Logs
To see real-time logs (e.g., to find the OTP if you are testing on the live server):
```bash
pm2 logs coskinn-backend
```
