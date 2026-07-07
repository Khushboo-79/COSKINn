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
