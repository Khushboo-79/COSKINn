# COSKINn — Backend Build Plan (Node.js / NestJS + PostgreSQL)

**Repo path:** `backend/src/modules/*`
**Stack:** Node.js · NestJS · PostgreSQL · Prisma ORM · Redis (cache + queues) · JWT auth · RBAC · AWS S3 + CloudFront (media) · Razorpay (payments) · ShadowFox (shipping) · Firebase Cloud Messaging (push) · AWS ECS Fargate + RDS (infra)
**This is the master dependency for every other build plan.** No panel or app screen goes from "mocked" to "real" until its matching backend day below has shipped. Every other build-plan doc lists the exact day number(s) it depends on — this file is the single source of truth for those numbers; if a day's scope changes here, update the referencing plan in the same PR.
**Referenced by:** `00-PANEL-CONNECTIVITY-MAP.md` (all cross-panel data flows run through these modules — no panel ever calls another panel directly), `01-CUSTOMER-WEB-BUILD-PLAN.md`, `03-CUSTOMER-APP-BUILD-PLAN.md`, and every `0X-<PANEL>-BUILD-PLAN.md`.

For the first version this ships as a **modular monolith** (one NestJS app, one Postgres DB, cleanly separated modules under `backend/src/modules/<domain>`) — not microservices. This keeps the team of 8–10 shipping fast; it can be split into services later if scale demands it.

---

## Phase 1 — Foundation (Days 1–10)

| Day | Module / Deliverable | Tables touched | Notes |
|---|---|---|---|
| 1 | Repo scaffold: NestJS app inside `backend/`, `docker-compose.yml` (Postgres + Redis), Prisma init, module folder structure (`auth`, `product`, `order`, `inventory`, `payment`, `wallet`, etc. as empty modules), health-check endpoint, CI hook (`turbo run build --filter=backend`) | — | Every dev runs `docker compose up -d` per `GIT_SETUP_AND_WORKFLOW.md` §10 |
| 2 | Full DB schema, part 1 — Auth & Customer domain migrations | `users, roles, permissions, user_roles, role_permissions, otp_logs, login_sessions, devices, customer_profiles, customer_addresses, customer_skin_profiles, customer_makeup_preferences, wishlist, wishlist_items` | Seed script with dummy roles (customer, admin, product-manager, inventory-staff, order-manager, warehouse-staff, finance, hr, auditor, support, marketing, content) |
| 3 | Full DB schema, part 2 — Product, Inventory, Order, Payment domain migrations | `brands, categories, subcategories, products, product_variants, product_images, product_videos, product_ingredients, product_benefits, product_skin_types, product_concerns, product_reviews, product_questions, product_answers, warehouses, warehouse_bins, inventory_stock, inventory_batches, stock_movements, stock_adjustments, damaged_stock, expired_stock, purchase_orders, goods_received_notes, carts, cart_items, orders, order_items, order_status_history, order_addresses, order_payments, order_shipments, order_invoices, order_cancellations, returns, return_items, refunds, payment_transactions, razorpay_orders, razorpay_payment_events, refund_transactions, cod_collections, settlements` | All UUID PKs, `created_at/updated_at`, soft-delete flag where applicable |
| 4 | **Customer Profile module** — `GET/PUT /customer/profile`, save skin type / skin concern / makeup preference | `customer_profiles, customer_skin_profiles, customer_makeup_preferences` | Frontend dependency: Customer Web Day 5, Customer App profile-setup screen |
| 5 | Brand / Category / Subcategory module — admin CRUD + public read endpoints | `brands, categories, subcategories` | Feeds Product Management Panel Day 1 and public catalog |
| 6 | Product core module — product CRUD (admin), variants, images/videos schema | `products, product_variants, product_images, product_videos` | Full field set per PRD §10.2 (SKU, MRP, GST, HSN, batch, expiry, etc.) |
| 7 | Product tagging module — fruit ingredient, skin concern, skin type, benefits | `product_ingredients, product_benefits, product_skin_types, product_concerns` | Powers fruit-concern browsing and Skin Quiz recommendations |
| 8 | Product media pipeline — S3 presigned upload, CloudFront delivery, image/video validation (type, size, virus scan) | — | Used by Product Management Panel image/video upload screens |
| 9 | RBAC module — roles/permissions wiring, route guards, 2FA scaffold for Admin/Finance logins | `roles, permissions, user_roles, role_permissions` | Foundation every internal panel's RBAC route guard depends on |
| 10 | **Auth module complete** — `POST /auth/send-otp`, `/verify-otp`, `/logout`, `/refresh-token`, `GET /auth/me`; JWT access + refresh rotation; OTP rate limiting; device/IP throttling | `otp_logs, login_sessions, devices` | Frontend dependency: Customer Web Day 1 & 4, Customer App login/OTP screens |

## Phase 2 — Ecommerce Core (Days 11–27)

| Day | Module / Deliverable | Tables touched | Notes |
|---|---|---|---|
| 11 | Public catalog read APIs — `GET /products, /products/:id, /products/category/:id, /products/concern/:id, /products/fruit/:name` | `products` (read) | |
| 12 | Search service — typo-tolerant full-text/trigram search, target <1s response | — | Powers Customer Web/App Search screen |
| 13 | Filter & sort engine — price, skin type, concern, fruit, rating, newness, combinable | — | Powers PLP filter/sort |
| 14 | SEO metadata + landing-page data endpoints (the 10-page list in PRD §8.2), fruit-ingredient landing pages | `products` (SEO fields) | Consumed by SSG pre-render step on Customer Web |
| 15 | Product Detail completion — how-to-use, ingredients, benefits, warnings, claims, shade/variant selector API | `product_variants, product_ingredients, product_benefits` | |
| 16 | Home Dashboard aggregation API — hero banner slot, category rail, fruit-concern rail | `categories, products` (+ `banners` once Day 62 ships; stub until then) | Frontend dependency: Customer Web/App Home, PLP, Search, SEO pages |
| 17 | Reviews & Ratings + Q&A module — `GET/POST /products/:id/reviews`, questions/answers | `product_reviews, product_questions, product_answers` | |
| 18 | Wishlist module — `GET/POST/DELETE /wishlist/:productId` | `wishlist, wishlist_items` | |
| 19 | Cart module — `GET /cart, POST /cart/items, PUT/DELETE /cart/items/:id`, cross-device persistence | `carts, cart_items` | |
| 20 | Address module — full CRUD `/customer/address`, pincode/COD serviceability check (ShadowFox stub) | `customer_addresses, order_addresses` | |
| 21 | Coupon module (`POST /cart/apply-coupon`, `DELETE /cart/remove-coupon`) + Skin Quiz & Routine Builder (`POST /customer/skin-quiz`, `GET /customer/recommendations`) | `coupons, coupon_rules, coupon_usage` | Two small self-contained features shipped same day |
| 22 | Order creation — `POST /orders` (pre-payment order draft), order address snapshot | `orders, order_items, order_addresses` | |
| 23 | Razorpay integration, part 1 — `POST /payments/create-order`, Razorpay Orders API call | `razorpay_orders` | |
| 24 | Razorpay integration, part 2 — signature verification, webhook handler (`/payments/verify`, `/payments/webhook`) — webhook is source of truth, never trust client callback alone | `payment_transactions, razorpay_payment_events` | |
| 25 | Notification service foundation — Firebase Cloud Messaging setup, order-confirmation push/email trigger | `push_notifications` | |
| 26 | Invoice generation — GST/HSN breakup PDF, `GET /orders/:id/invoice` | `order_invoices` | |
| 27 | Order Management APIs (admin-facing) — `GET/PUT /admin/orders`, status update, search/filter by ID/mobile/email/status/payment-mode/date | `order_status_history` | Frontend dependency: Order Management Panel, Customer Web/App My Orders/Order Details |

## Phase 3 — Operations (Days 28–40)

| Day | Module / Deliverable | Tables touched | Notes |
|---|---|---|---|
| 28 | Warehouse/Inventory schema wiring — warehouse & bin structure, stock ledger init | `warehouses, warehouse_bins, inventory_stock, inventory_batches` | |
| 29 | Inventory stock-in/out — `POST /inventory/stock-in, /stock-out` | `stock_movements` | |
| 30 | Inventory adjustments & transfers — `POST /inventory/adjustment, /transfer` | `stock_adjustments` | |
| 31 | Low-stock & near-expiry alerts — `GET /inventory/low-stock, /near-expiry`, scheduled job | — | Feeds Admin dashboard |
| 32 | Damaged/expired stock handling | `damaged_stock, expired_stock` | |
| 33 | Purchase Orders & GRN — GRN creation APIs | `purchase_orders, goods_received_notes` | Feeds Warehouse Panel |
| 34 | Warehouse fulfillment flow — pick-list generation, pack, barcode-scan support, stock reservation on order confirm | — | Ties Inventory ↔ Order Management per connectivity map |
| 35 | ShadowFox shipping integration — pincode/COD serviceability, shipment creation, AWB + label generation, tracking-webhook ingestion, `GET /orders/:id/track` | `order_shipments` | |
| 36 | Order cancellation flow — `POST /orders/:id/cancel`, stock release back to Inventory | `order_cancellations` | |
| 37 | Return request module — `POST /returns/request` with photo/video upload to S3 | `returns, return_items` | |
| 38 | Return approval/QC workflow — `PUT /returns/:id/approve, /reject`, `POST /returns/:id/qc`, ShadowFox reverse-pickup trigger | — | |
| 39 | Refund module — `POST /refunds/initiate`, `GET /refunds/:id/status`, Razorpay Refunds API; COD refunds default to Wallet | `refunds, refund_transactions` | |
| 40 | Hardening — integration test across order → inventory → warehouse → shipping → return → refund pipeline; checkout load test | — | |

## Phase 4 — Loyalty & Monetary Ecosystem (Days 41–52)

| Day | Module / Deliverable | Tables touched | Notes |
|---|---|---|---|
| 41 | Wallet core — balance = sum of non-expired ledger entries | `customer_wallets, wallet_ledger` | FR-W1, FR-W2 |
| 42 | Wallet checkout integration — apply wallet partial/full, begin coupon+wallet stacking-rule engine | — | FR-W3; frontend dependency: Checkout page stacking rules |
| 43 | Wallet expiry engine — admin-configurable expiry, scheduled expiry job, ledger screen API | — | FR-W4, FR-W5 — no add-money endpoint exists anywhere (RBI-safe design) |
| 44 | Bonus core — sign-up bonus (post-OTP), first-order bonus (post-delivery + return window) | `bonus_rules, bonus_ledger` (or tagged `wallet_ledger` entries) | FR-B1, FR-B2 |
| 45 | Bonus campaigns — birthday bonus (scheduled job, tier-aware multiplier), Marketing-configured campaign bonuses | — | FR-B3, FR-B4 |
| 46 | Referral core — unique code/link generation, native-share payload | `referrals` | FR-R1 |
| 47 | Referral conversion & fraud checks — referee welcome discount auto-apply, referrer payout post return-window, one-credit-per-device/mobile rule, referral dashboard API | — | FR-R2, FR-R3, FR-R4 |
| 48 | Reward Points core — 1pt/₹1 earn (post return-window), redemption at checkout up to admin cap; finalize 3-way stacking (coupon + wallet + points) | `reward_points_ledger` | FR-P1, FR-P2; frontend dependency: Checkout page stacking rules |
| 49 | Reward Points advanced — birthday multiplier (tier-aware: 1.5x/2x/3x), campaign multiplier events, expiry policy, sale-window redemption lockout | — | FR-P3, FR-P4, FR-P5 |
| 50 | Membership schema + tier engine — rolling 365-day spend calc (GST/delivery/returns excluded), auto-enroll at Member (₹1,500+) | `membership_tiers, membership_history` | FR-M1 |
| 51 | Membership auto-upgrade/downgrade — nightly Lambda recalculation job, tier history log, progress-to-next-tier API | — | FR-M2, FR-M3, FR-M4 |
| 52 | Offers engine — scoping by category/product/payment-method/tier, homepage offers API, best-offer auto-apply at cart | `offers, offer_rules` | FR-O1, FR-O2, FR-O3 |

## Phase 5 — Internal Panels & Content (Days 53–63)

| Day | Module / Deliverable | Tables touched | Notes |
|---|---|---|---|
| 53 | Tax/HSN module — HSN codes, tax rates, CGST/SGST/IGST calculation engine | `hsn_codes, tax_rates` | |
| 54 | GST invoice & credit/debit notes | `gst_invoices, credit_notes, debit_notes` | |
| 55 | Finance reports — sales/GST/product-wise/state-wise, ledgers | `ledgers, journal_entries, finance_reports` | |
| 56 | Razorpay settlement & COD reconciliation, wallet/reward liability ledger | `settlements` | |
| 57 | HR module, part 1 — employees, departments, attendance, leaves | `employees, departments, attendance, leaves` | Self-contained; no ecommerce data dependency |
| 58 | HR module, part 2 — payroll, salary slips, documents, recruitment, offer letters, exit process | `payroll, salary_slips, employee_documents` | |
| 59 | Audit module — read-only logs across price/stock/order/wallet/points changes | `audit_logs, admin_activity_logs, price_change_logs, stock_change_logs, order_change_logs, login_activity_logs` | Auditor Panel has read-only DB role — enforce at query layer, not just UI |
| 60 | Customer Support schema + ticketing | `support_tickets, ticket_categories, ticket_notes` | |
| 61 | Live chat (WebSocket) + SLA tracking, email/WhatsApp/call-log integration | — | |
| 62 | Marketing/CRM module — banners, campaigns, push/email/SMS/WhatsApp sending, abandoned-cart recovery, influencer/affiliate tracking | `banners, campaigns, push_notifications, email_campaigns, sms_campaigns` | Backfills Day 16 banner data |
| 63 | Content module — blog, beauty tips, ingredient library, legal-pages CMS, FAQ, homepage content | `blog_posts, faqs, legal_pages` (or generic `content_blocks`) | Frontend dependency: Beauty tips/blog pages, all legal pages, notifications center copy |

**Definition of done:** every endpoint listed in PRD §26 / Build Form §8 exists, is covered by an integration test, sits behind the correct RBAC role, and has its Razorpay/ShadowFox/Firebase webhook paths verified against signatures — no panel or app screen should ever be wired to a mocked response by staging sign-off.

**Non-functional targets carried into every module (PRD §7):** API p95 <400ms, JWT + refresh rotation, RBAC everywhere, 2FA for Admin/Finance, TLS 1.2+ and AES-256 at rest, Razorpay webhook signature verification on every event, full audit logging of price/stock/order/wallet/points changes, WCAG 2.1 AA on rendered surfaces, CloudWatch centralized logging.
