> **Total APIs Successfully Built:** 265

# Complete Backend API List

### ADMIN Module
- `GET /admin/config/overview`
- `GET /admin/config/roles`
- `PUT /admin/config/roles/:id/panels`
- `GET /admin/config/users`
- `POST /admin/config/users/assign-role`
- `GET /admin/config/settings`
- `PUT /admin/config/settings`
- `GET /admin/config/notifications`

### APP-VERSION Module
- `POST /app-version`
- `GET /app-version/check`
- `GET /app-version`

### AUDIT Module
- `GET /admin/audit/logs`
- `GET /admin/audit/reward-usage`
- `GET /admin/audit/sales-report`
- `GET /admin/audit/session-activity`
- `GET /admin/audit/stock-adjustments`
- `GET /admin/audit/refund-report`
- `GET /admin/audit/payment-report`

### AUTH Module
- `GET /auth/me`
- `POST /auth/login`
- `POST /auth/send-otp`
- `POST /auth/verify-otp`
- `POST /auth/verify-totp`
- `POST /auth/2fa/generate`
- `POST /auth/2fa/verify`
- `POST /auth/refresh`
- `POST /auth/logout`

### BONUS Module

### CART Module
- `GET /cart`
- `POST /cart/items`
- `PUT /cart/items/:id`
- `DELETE /cart/items/:id`

### CATALOG Module
- `GET /catalog/home`
- `GET /catalog/search`
- `GET /catalog/products`
- `GET /catalog/products/:slug`
- `GET /catalog/products/:id/reviews`
- `POST /catalog/products/:id/reviews`
- `GET /catalog/products/:id/similar`
- `GET /catalog/customer/recommendations`
- `GET /catalog/categories/:slug`
- `GET /catalog/skin-types`
- `GET /catalog/skin-concerns`
- `GET /catalog/ingredients`

### CATEGORY Module
- `GET /categories`
- `GET /categories/:id`
- `POST /categories`
- `PUT /categories/:id`
- `DELETE /categories/:id`
- `POST /categories/subcategories`
- `PUT /categories/subcategories/:id`
- `DELETE /categories/subcategories/:id`

### COMPLIANCE Module
- `POST /api/compliance/consent`
- `GET /api/compliance/consent`
- `POST /api/compliance/data-request`
- `GET /api/compliance/admin/data-requests`
- `PATCH /api/compliance/admin/data-requests/:id/status`

### CONTENT Module
- `GET /content/articles`
- `GET /content/articles/:slug`
- `GET /content/faqs`
- `GET /content/admin/articles`
- `POST /content/admin/articles`
- `PUT /content/admin/articles/:id`
- `DELETE /content/admin/articles/:id`
- `POST /content/admin/faqs`
- `PUT /content/admin/faqs/:id`
- `DELETE /content/admin/faqs/:id`
- `GET /content/admin/seo/global`
- `PUT /content/admin/seo/global`

### COUPON Module
- `POST /cart/coupon/apply`
- `GET /cart/coupon/available`
- `POST /cart/coupon`
- `GET /cart/coupon`
- `PATCH /cart/coupon/:id`

### CUSTOMER-PROFILE Module
- `GET /customer/me`
- `POST /customer/skin-quiz`
- `PUT /customer/profile`
- `GET /customer/addresses`
- `GET /customer/addresses/serviceability`
- `POST /customer/addresses`
- `PUT /customer/addresses/:id`
- `DELETE /customer/addresses/:id`
- `GET /customer/admin/all`
- `GET /customer/admin/:id/360`
- `POST /customer/admin/:id/block`
- `POST /customer/admin/:id/unblock`
- `POST /customer/admin/:id/reset-password`

### ENGAGEMENT Module
- `GET /products/:id/reviews`
- `POST /products/:id/reviews`
- `GET /products/:id/questions`
- `POST /products/:id/questions`

### FINANCE-REPORT Module
- `GET /admin/finance/overview`
- `GET /admin/finance/transactions`
- `GET /admin/finance/monthly-breakdown`
- `GET /admin/finance/ledgers`
- `POST /admin/finance/ledgers`
- `POST /admin/finance/journal-entries`
- `POST /admin/finance/settlements/sync`

### HOME Module
- `GET /home`

### HR Module
- `GET /admin/hr/overview`
- `GET /admin/hr/employees`
- `GET /admin/hr/employees/:id`
- `POST /admin/hr/employees`
- `GET /admin/hr/leaves`
- `POST /admin/hr/leaves/:id/status`
- `GET /admin/hr/payroll`
- `POST /admin/hr/attendance`
- `POST /admin/hr/seed`

### INVENTORY Module
- `GET /inventory/warehouses`
- `POST /inventory/warehouses`
- `GET /inventory/dashboard-stats`
- `GET /inventory/stock`
- `GET /inventory/stock/:sku`
- `GET /inventory/transfers`
- `POST /inventory/stock-in`
- `POST /inventory/stock-out`
- `POST /inventory/adjustment`
- `POST /inventory/transfer`
- `POST /inventory/damaged`
- `POST /inventory/expired`
- `GET /inventory/alerts/low-stock`
- `GET /inventory/alerts/near-expiry`
- `GET /inventory/purchase-orders`
- `POST /inventory/purchase-orders`
- `POST /inventory/purchase-orders/:id/update`
- `GET /inventory/returns`

### INVOICE Module
- `GET /orders/:id/invoice`
- `POST /admin/invoices/:id/credit-note`
- `POST /admin/invoices/:id/debit-note`

### LOCATION Module
- `GET /location/ip`
- `GET /location/reverse-geocode`

### MARKETING Module
- `GET /marketing/public/banners`
- `GET /marketing/banners`
- `POST /marketing/banners`
- `PUT /marketing/banners/:id`
- `DELETE /marketing/banners/:id`
- `GET /marketing/coupons`
- `POST /marketing/coupons`
- `PUT /marketing/coupons/:id`
- `DELETE /marketing/coupons/:id`
- `GET /marketing/campaigns`
- `POST /marketing/campaigns`
- `GET /marketing/abandoned-carts`

### MEMBERSHIP Module
- `GET /membership/my-tier`
- `GET /membership/tiers`
- `GET /admin/membership/tiers`
- `POST /admin/membership/tiers`
- `PUT /admin/membership/tiers/:id`
- `DELETE /admin/membership/tiers/:id`

### NOTIFICATION Module
- `POST /notification/push`

### OFFER Module

### ORDER Module
- `POST /orders`
- `GET /orders`
- `GET /orders/:id/track`
- `GET /orders/:id/invoice`
- `POST /orders/:id/cancel`
- `GET /admin/orders`
- `GET /admin/orders/:id`
- `GET /admin/orders/:id/invoice`
- `PUT /admin/orders/:id/status`
- `POST /admin/orders/:id/cancel`
- `GET /admin/orders/config/cancellations`
- `GET /admin/orders/settings/config`
- `PUT /admin/orders/settings/config`

### PAYMENT Module
- `POST /payments/create-order`
- `POST /payments/webhook`

### MEDIA Module
- `POST /product/:productId/media/image`
- `POST /product/:productId/media/video`
- `PATCH /product/:productId/media/reorder`
- `DELETE /product/:productId/media/image/:imageId`
- `DELETE /product/:productId/media/video/:videoId`

### PRODUCT Module
- `POST /product`
- `GET /product`
- `GET /product/marketing-feed`
- `GET /product/export/csv`
- `POST /product/import/csv`
- `GET /product/stats/reports`
- `GET /product/:id`
- `PATCH /product/:id`
- `DELETE /product/:id`
- `PATCH /product/:id/tags`
- `PATCH /product/:id/compliance`
- `POST /product/:id/variant/:variantId/stock`
- `PATCH /product/:id/content`
- `POST /product/:id/submit-approval`
- `POST /product/:id/approve`
- `POST /product/:id/reject`
- `POST /product/:id/deactivate`
- `PATCH /product/:id/seo`
- `POST /product/:id/bundle-items`
- `DELETE /product/:id/bundle-items/:componentSku`

### PUBLIC-CATALOG Module
- `GET /products`
- `GET /products/search`
- `GET /products/category/:id`
- `GET /products/concern/:id`
- `GET /products/fruit/:name`
- `GET /products/:id`
- `GET /products/:id/variants`

### REVIEW Module
- `GET /product-review`
- `PATCH /product-review/:id/approve`
- `DELETE /product-review/:id`

### VARIANT Module
- `POST /product/:productId/variant`
- `PATCH /product/:productId/variant/:variantId`
- `DELETE /product/:productId/variant/:variantId`

### PURCHASE-ORDER Module
- `POST /purchase-orders`
- `GET /purchase-orders`
- `GET /purchase-orders/:id`
- `POST /purchase-orders/:id/grn`

### REFERRAL Module
- `GET /referral/my-code`
- `POST /referral/apply`
- `GET /referral/admin/all`
- `POST /referral/admin/:id/award`

### REFUND Module
- `GET /refunds/admin/all`
- `POST /refunds/process/wallet`
- `POST /refunds/process/original-source`

### RETURN Module
- `POST /returns/request`
- `GET /returns`
- `PUT /returns/:id/process`
- `POST /returns/:id/qc`

### REWARD-POINT Module
- `GET /reward-point`
- `GET /reward-point/admin/ledger`

### SEO Module
- `GET /seo/product/:slug`
- `GET /seo/category/:slug`
- `GET /seo/fruit/:name`
- `GET /seo/admin/global`
- `PUT /seo/admin/global`

### SERVICEABLE-PINCODE Module
- `POST /serviceable-pincode`
- `GET /serviceable-pincode`
- `GET /serviceable-pincode/check/:code`
- `GET /serviceable-pincode/:id`
- `PATCH /serviceable-pincode/:id`
- `DELETE /serviceable-pincode/:id`

### SHIPPING Module
- `POST /shipping/serviceability`
- `POST /shipping/shipments`
- `GET /shipping/orders/:orderId`
- `GET /shipping/all`

### SUPPLIER Module
- `POST /supplier`
- `GET /supplier`
- `GET /supplier/:id`
- `PATCH /supplier/:id`
- `DELETE /supplier/:id`

### SUPPORT Module
- `POST /support/contact`
- `POST /support/tickets`
- `GET /support/tickets/:id/messages`
- `GET /support/admin/tickets`
- `POST /support/admin/tickets/:id/close`
- `POST /support/admin/tickets/:id/reply`
- `POST /support/admin/tickets/:id/escalate`
- `POST /support/admin/tickets/:id/assign`
- `GET /support/admin/tickets/stats/sla`

### TAX Module
- `GET /admin/tax/hsn`
- `POST /admin/tax/hsn`
- `GET /admin/tax/rates`
- `POST /admin/tax/rates`

### UPLOAD Module
- `POST /upload/presigned-url`

### WALLET Module
- `GET /wallet`
- `GET /wallet/admin/transactions`

### WAREHOUSE Module
- `GET /warehouse/purchase-orders`
- `POST /warehouse/purchase-orders`
- `GET /warehouse/bins`
- `POST /warehouse/bins`
- `POST /warehouse/grn`
- `POST /warehouse/pick-list`
- `POST /warehouse/scan`

### WISHLIST Module
- `GET /wishlist`
- `POST /wishlist/:productId`
- `DELETE /wishlist/:productId`

