# Florie Beauty — Master Project Documentation

**One document, everything about the project.** This consolidates the PRD, the Complete Build Form, the original Project Documentation, all 15 build-plan docs, the Git/workflow doc, and the Master Build Plan (segment-toggle spec + gap analysis) into a single source of truth. Where the earlier planning doc and the finalized PRD/Build Form disagree, this document states the **finalized** answer and notes the earlier suggestion so nothing is silently lost.

---

## Table of Contents

1. What Florie Beauty Is
2. Business Model & Launch Strategy
3. Target Personas
4. Brand Identity
5. Product Catalog — Full Detail
6. The Skincare ⇄ Makeup Segment Toggle
7. Platform Surfaces (13 total)
8. Customer Website & App — Full Feature/Screen List
9. Loyalty & Monetary Ecosystem (Wallet, Bonus, Referral, Points, Offers, Membership)
10. Internal Panels — Full Feature Breakdown (all 11)
11. Confirmed Technology Stack
12. AWS Infrastructure Map
13. Database Schema — Full Table Inventory
14. API Endpoint Summary
15. Third-Party Integrations
16. Security Requirements
17. Compliance & Legal Requirements
18. Non-Functional Requirements
19. Product Testing Requirements
20. Reports Required (by department)
21. Team Requirements
22. Git/Repo Structure & Workflow
23. Build Order Summary
24. Known Gaps & Open Decisions
25. Source Documents & Version Notes
26. Glossary

---

## 1. What Florie Beauty Is

Florie Beauty is a **premium, Gen-Z-friendly, fruit-powered skincare and makeup ecommerce brand**, launching as an **inventory-led, private-label** business with a limited, curated range: **12 skincare + 12 makeup SKUs at launch**. It is **one brand** — not a marketplace, not a multi-brand platform.

**Problem it solves:** Indian beauty ecommerce is dominated by large multi-brand marketplaces. Florie Beauty's bet is a tightly curated, ingredient-story-driven (fruit + skin concern) soft-luxury brand with a simple, trustworthy, habit-forming shopping experience, backed by loyalty mechanics strong enough to drive repeat purchase from order one.

**Product vision:** Become the go-to destination for fruit-based, concern-driven skincare and SPF-safe makeup for value-conscious Gen-Z/young-millennial shoppers in India.

**Explicit inspiration constraint:** the business model is inspired by Nykaa's inventory-led approach, but Florie Beauty must not copy Nykaa's brand name, logo, UI, content, images, code, or exact business identity — everything is rebuilt as an original program under Florie Beauty's own branding and rules.

---

## 2. Business Model & Launch Strategy

- **Model:** Inventory-led + private label (Florie Beauty owns/sources its own stock; not a vendor marketplace).
- **Launch scope:** Deliberately limited — 12 skincare + 12 makeup SKUs (a slight expansion from an original 10+10 target), rather than hundreds of products, to keep branding, QC, inventory, and marketing manageable at launch.
- **Vendor/marketplace-seller onboarding is explicitly out of scope for v1.** Recommendation is to defer it — marketplace complexity (seller onboarding/verification, commissions, vendor payouts, fake-product control, extra tax handling) is judged not worth it before the brand has proven itself.
- **Also out of scope for v1:** HR panel and Auditor panel were originally flagged as "Phase 2" in the early Project Documentation, but the finalized PRD/Build Form **do** include them in v1 (Phase 5) — see §25 for this reconciliation. Wallet top-up/add-money by customers is out of scope permanently (see §17, RBI-safe design). International shipping is out of scope.
- **Delivery model for the project itself:** ShadowFox is named as both the **logistics/delivery partner** (courier, tracking, COD remittance) and the **build & delivery agency** executing this SOW.
- **Release roadmap (6 phases):**

| Phase | Focus |
|---|---|
| 1 — Foundation | Design system, DB schema, backend architecture, auth, RBAC |
| 2 — Ecommerce Core | PLP/PDP, cart, checkout, Razorpay, order placement |
| 3 — Operations | Inventory, warehouse, ShadowFox shipping, returns |
| 4 — Loyalty Ecosystem | Wallet, Bonus, Referral, Reward Points, Offers, Membership |
| 5 — Internal Panels | Finance, HR, auditor, marketing/CRM, content |
| 6 — Testing & Launch | QA, security/performance testing, beta, go-live |

- **Success metrics:** repeat purchase rate within 90 days of first order; % of orders using wallet/reward-point redemption; referral-driven signup and conversion rate; membership tier distribution (Member vs Gold vs Platinum); Razorpay payment success rate; ShadowFox on-time delivery rate.

---

## 3. Target Personas

| Persona | Profile | Primary Need |
|---|---|---|
| **The Glow Seeker** | 18–28, college/early career, Instagram-active | Affordable, cute, effective skincare with a visible fruit-ingredient story |
| **The Routine Builder** | 22–32, skin-concern aware | A guided routine (skin quiz) + trust signals (batch/expiry, dermat-tested) |
| **The SPF-Makeup Shopper** | 20–30, wants makeup with sun protection | SPF lipstick / sunscreen-makeup crossover products |
| **The Loyal Repeat Buyer** | Any age, price + rewards sensitive | Wallet cashback, reward points, membership perks, referral earnings |

---

## 4. Brand Identity

- **Name:** Florie Beauty
- **Tagline concept:** *Fruit-Powered Skincare & Makeup*
- **Feel:** Premium, cute, fruit-inspired, soft luxury, trustworthy, youthful, clean, modern, Instagram-friendly.
- **Core creative device:** every product is tied to a specific fruit and a specific skin concern (see §5.3), and product names follow a consistent "soft luxury fruit-based" naming pattern (e.g. *Orange Glow Shield Sunscreen*, *Strawberry Dew Cleanser*, *Mango Melt Moisturizer*, *Pomegranate Plump Serum*).

---

## 5. Product Catalog — Full Detail

### 5.1 Launch Range Overview

**12 Skincare SKUs + 12 Makeup SKUs.** (Originally scoped as 10+10; the working list grew to 12 each — team has the option to keep all 24 or merge some into shared categories.)

### 5.2 Skincare Line (12 SKUs)

1. Face Sunscreen
2. Body Sunscreen
3. Tinted Sunscreen
4. Cleanser
5. SPF Lip Balm
6. Hand Cream
7. Face Mist / Face Spray
8. Moisturizer
9. Serum
10. Toner
11. Face Sheet / Face Mask
12. Cream Blush *(hybrid — skincare/makeup crossover; this is the SKU that must appear under both segments once the toggle ships, see §6)*

**Recommended skincare category grouping:**

| Category | Products |
|---|---|
| Sunscreen | Face Sunscreen, Body Sunscreen, Tinted Sunscreen |
| Hydration | Moisturizer, Face Mist, Toner |
| Treatment | Serum, Face Sheet/Mask |
| Daily Care | Cleanser, SPF Lip Balm, Hand Cream |
| Hybrid Skincare-Makeup | Cream Blush |

### 5.3 Makeup Line (12 SKUs)

1. Brushes with Holder
2. SPF Lipstick
3. Eyeshadow Palette
4. Powder Blush
5. Lip Liner
6. Lip Gloss
7. Mascara
8. Nail Polish
9. Perfume
10. Kajal + Liner
11. Concealer Palette
12. Highlighter

**Recommended makeup category grouping:**

| Category | Products |
|---|---|
| Lips | SPF Lipstick, Lip Liner, Lip Gloss |
| Eyes | Eyeshadow Palette, Mascara, Kajal + Liner |
| Face | Concealer Palette, Powder Blush, Highlighter |
| Tools | Brushes with Holder |
| Beauty Extras | Nail Polish, Perfume |

### 5.4 Fruit ↔ Skin-Concern Mapping (the core creative/marketing system)

| Fruit | Skin Concern Addressed | Typical Product Use | Brand Feel |
|---|---|---|---|
| Orange | Dullness, pigmentation, uneven tone | Vitamin C serum, face wash, toner, face mist | Brightening, fresh glow |
| Strawberry | Acne marks, dull skin, soft exfoliation | Cleanser, face mask, lip balm, blush | Cute, fresh, youthful |
| Mango | Dryness, uneven texture, dull glow | Moisturizer, hand cream, body sunscreen | Nourishing, juicy, soft skin |
| Blueberry | Antioxidant care, tired skin, pollution damage | Serum, face mist, night cream, sheet mask | Anti-pollution, antioxidant, fresh |
| Green Tea | Oily skin, acne-prone skin, sensitive skin | Toner, cleanser, sunscreen, face mist | Calming, oil control, soothing |
| Pomegranate | Ageing, firmness, glow, skin repair | Serum, moisturizer, cream blush, sheet mask | Premium, anti-ageing, luxury glow |

This mapping drives fruit-concern browsing on Customer Web/App, the fruit-ingredient SEO landing pages, the Content Panel's fruit-benefit pages, and the Marketing Panel's campaign themes (e.g. "Mango Moisture Week").

### 5.5 Product Variants (launch-controlled)

**Skincare variants** (representative — full detail per SKU):
- Face Sunscreen: SPF 50 PA++++, gel-based, matte finish, for oily/combination skin
- Body Sunscreen: SPF 50, lotion-based, water-resistant, non-sticky
- Tinted Sunscreen: Light / Medium / Deep shade, SPF 50
- Cleanser: gel, fruit-based, low pH, non-stripping
- SPF Lip Balm: SPF 30, tinted and non-tinted, fruit flavors
- Hand Cream: Mango / Pomegranate / Strawberry
- Face Mist: Blueberry / Green Tea / Orange
- Moisturizer: Mango (dry skin) / Green Tea (oily skin) / Pomegranate (mature skin)
- Serum: Orange Vitamin C / Pomegranate firming / Blueberry antioxidant
- Toner: Green Tea calming / Orange glow
- Face Sheet/Mask: Strawberry bright / Blueberry hydration / Pomegranate repair
- Cream Blush: Strawberry pink / Mango peach / Pomegranate rose

**Makeup variants** (representative — full detail per SKU):
- Brushes with Holder: Mini kit / Full-face kit / Travel kit
- SPF Lipstick: Nude pink, Rose beige, Berry red, Peach coral, Mocha brown
- Eyeshadow Palette: Fruit nude, Berry glam, Mango sunset
- Powder Blush: Strawberry pink, Peach mango, Rose pomegranate
- Lip Liner: Nude brown, Rose pink, Berry red, Mocha nude
- Lip Gloss: Clear, Strawberry, Peach, Berry
- Mascara: Black, Brown
- Nail Polish: Rose beige, Toffee nude, Mocha brown, Lavender mist, Baby blue, Berry red
- Perfume: Orange blossom, Strawberry mist, Mango vanilla, Pomegranate luxe
- Kajal + Liner: Black kajal, Brown kajal, Waterproof liner
- Concealer Palette: Light / Medium / Deep
- Highlighter: Champagne, Rose gold, Pearl glow

### 5.6 Additional Product Types Named in Scope (beyond the 24 core SKUs)

The Project Documentation explicitly lists these as sellable product types, in addition to the 24 launch SKUs — **these need a bundle/kit product-type in Product Management + Inventory + Order Management** (flagged as a build gap, see §24):
- Beauty tools
- Fragrance products
- Combo kits
- Routine kits
- Gift sets

### 5.7 Skin Quiz → Routine Builder Logic

**Skin Quiz questions:**
1. Skin type: Oily / Dry / Combination / Sensitive / Normal
2. Main skin concern: Pigmentation / Acne / Dullness / Dryness / Ageing / Open pores / Uneven texture / Sensitive skin
3. Preferred finish: Matte / Dewy / Natural / Glow
4. Daily routine level: Simple / Medium / Full routine
5. Budget: Affordable / Mid-range / Premium

**Sample routine recommendations generated from quiz answers:**

| Skin Profile | Recommended Routine |
|---|---|
| Oily skin | Green Tea Cleanser → Green Tea Toner → Lightweight Sunscreen → Blueberry Mist |
| Dry skin | Mango Cleanser → Mango Moisturizer → Body Sunscreen → Mango Hand Cream |
| Pigmentation | Orange Toner → Orange Vitamin C Serum → Orange Glow Sunscreen → Pomegranate Sheet Mask |
| Ageing | Pomegranate Serum → Pomegranate Moisturizer → Pomegranate Sheet Mask → Tinted Sunscreen |
| Sensitive skin | Green Tea Cleanser → Green Tea Toner → Blueberry Mist → Gentle Moisturizer |

---

## 6. The Skincare ⇄ Makeup Segment Toggle

*(This is the client's explicit new requirement, layered onto the base project — not present in the original PRD/Build Form/Project Documentation, though the Project Documentation did already envision separate "Skincare category page" and "Makeup category page" as website pages, which this formalizes into a persistent toggle rather than just two static pages.)*

- **One brand, one account, one cart, one order history, one wallet/points/membership balance** — the toggle changes *browsing UI only*, never the account or transaction layer.
- A persistent toggle sits at the **top of Customer Web's header** and as a **persistent segmented control below the status bar on Customer App**, with two states: **Skincare** and **Makeup**.
- Switching it re-scopes: home dashboard (hero banner, category rail, fruit-concern rail), category/subcategory tree, PLP filter sets (skin-type/concern/SPF for Skincare; shade/finish/look for Makeup), search scope (segment-default with an explicit "search all Florie Beauty" override), and SEO landing-page URL namespaces (`/skincare/*` vs `/makeup/*`).
- **Cream Blush** (and any future hybrid/bundle SKU) is tagged to **both** segments and shows under either toggle state — a tagging rule (`is_cross_segment`), not special-cased code.
- Segment preference is remembered per logged-in customer (`customer_profiles.preferred_segment`) and persists across sessions/devices.
- **Backend:** `products.product_line ENUM('skincare','makeup')` (mandatory, server-side gated like the Cosmetics Rules 2020 fields) + `is_cross_segment`; `categories.product_line ENUM('skincare','makeup','both')`; segment query params on catalog/search/home APIs; `target_segment` on banners/campaigns; optional `segment` tag on content.
- **Touches every one of these build plans:** Backend, Customer Web, Customer App, Product Management Panel, Admin Panel, Marketing/CRM Panel, Content Panel. Full day-by-day spec is in `15-MASTER-BUILD-PLAN.md` §3.

---

## 7. Platform Surfaces (13 total)

| # | Surface | Repo path | Stack | Purpose |
|---|---|---|---|---|
| 1 | Customer Website | `apps/customer-web` | React (Vite) + Tailwind | Full storefront, desktop + SEO |
| 2 | Customer Mobile App | `apps/customer-app` | React Native CLI | Full storefront, iOS + Android |
| 3 | Admin Panel | `.../modules/admin` | React + Tailwind | Top-level oversight; only panel with full read + RBAC-write access |
| 4 | Product Management Panel | `.../modules/product` | React + Tailwind | Catalog CRUD, compliance gate, activation workflow |
| 5 | Inventory Panel | `.../modules/inventory` | React + Tailwind | Stock ledger, batches, alerts |
| 6 | Order Management Panel | `.../modules/orders` | React + Tailwind | Order lifecycle, payments view, cancellations, returns intake |
| 7 | Warehouse Panel | `.../modules/warehouse` | React + Tailwind | PO/GRN, pick-pack-ship, returns QC |
| 8 | Tax/Finance Panel | `.../modules/finance` | React + Tailwind | GST/HSN, invoices, reports, reconciliation |
| 9 | HR Panel | `.../modules/hr` | React + Tailwind | Employees, payroll, recruitment — self-contained |
| 10 | Auditor Panel | `.../modules/audit` | React + Tailwind, **read-only** | Cross-system log/report viewer, no write path anywhere |
| 11 | Customer Support Panel | `.../modules/support` | React + Tailwind | Ticketing, live chat, SLA |
| 12 | Marketing/CRM Panel | `.../modules/marketing` | React + Tailwind | Banners, campaigns, loyalty configuration surface |
| 13 | Content Panel | `.../modules/content` | React + Tailwind | Blog, ingredient library, legal pages, SEO content |
| — | Backend | `backend/src/modules/*` | NestJS + PostgreSQL | Single source of truth; every cross-panel link is a backend API — **no panel ever calls another panel directly** |

Panels 3–13 all live inside **one** `apps/internal-panel` app, each its own routed module behind RBAC, sharing a common shell (login/nav/layout) and the `packages/ui` component library.

---

## 8. Customer Website & App — Full Feature/Screen List

### 8.1 Core Shopping (both surfaces)

Splash/onboarding (fruit-based intro, skincare-by-concern, SPF/makeup glow) → mobile-number login + OTP → profile setup (skin type, skin concern, makeup preference) → home dashboard → categories/subcategories → PLP with filter/sort (price, skin type, concern, fruit, rating, newness) → PDP (images/video, ingredients, benefits, how-to-use, shade/variant selector, reviews) → search (typo-tolerant, <1s) → wishlist → cart (cross-device persistence) → coupon apply → address management → checkout (coupon + wallet + points stacking) → Razorpay payment → order success → my orders / order details / track order (ShadowFox) → cancel order / return request (photo/video proof) / refund status → reviews & Q&A submission → beauty tips/blog/ingredient library → skin quiz → routine builder results → notifications → customer support entry (ticket + live chat) → account settings → legal pages.

### 8.2 Customer Website — Page List

Home · Login/signup · Skincare category page · Makeup category page · Product listing · Product detail · Ingredient page · Skin concern page · Fruit ingredient page · Cart · Checkout · Order success · My orders · Wishlist · Blog · About us · Contact us · Privacy policy · T&C · Return/refund policy · Shipping policy · FAQ.

### 8.3 SEO Landing Pages (representative list)

Best sunscreen for oily skin · Best fruit-based cleanser · Best Vitamin C serum · Best tinted sunscreen · Best SPF lipstick · Best moisturizer for dry skin · Best toner for acne-prone skin · Best pomegranate serum · Best strawberry lip balm · Best mango hand cream. (With the segment toggle, these move to `/skincare/*` and `/makeup/*` namespaces — §6.)

### 8.4 Customer App — Full Screen List (28-day build plan; native-specific notes below)

Splash → 3 onboarding screens → Login → OTP verification → Profile setup → Skin type selection → Skin concern selection → Makeup preference → Home dashboard → Search → Category → Skincare category → Makeup category → Product listing → Filter → Sort → Product detail → Shade selection → Ingredient details → How to use → Reviews → Wishlist → Cart → Coupon → Address list → Add address → Payment → Order success → Order details → Track order → Cancel order → Return request → Refund status → My orders → Beauty tips → Routine builder → Customer support → Account settings.

**App-only platform notes:** push notifications via Firebase Cloud Messaging (web uses browser notifications as the lighter equivalent, same backend table); native share sheets (WhatsApp/SMS/social/copy-link) for referral; secure token storage via iOS Keychain / Android Keystore (vs web's httpOnly-cookie/memory-based handling); app builds ship through Fastlane → TestFlight/Play Internal, separate from the S3/CloudFront pipeline used for web.

### 8.5 Shared Loyalty Ecosystem Screens (App + Web — full detail in §9)

Wallet balance widget + ledger + apply-at-checkout toggle · Bonus history (tagged entries inside wallet ledger) · Referral code/link screen + native share + dashboard · Reward Points balance/ledger/apply-at-checkout · Membership tier badge + progress bar + benefits matrix · Offers/deals home section + auto-applied best-coupon banner + tier-exclusive badges.

---

## 9. Loyalty & Monetary Ecosystem

This is the platform's most distinctive functional block — additive to the base ecommerce feature set, modeled on category-standard mechanics (comparable to Nykaa Prive) but rebuilt entirely under Florie Beauty's own branding, rules, and rate tables.

### 9.1 Wallet

| Requirement | Detail |
|---|---|
| One balance per customer | Balance always equals the sum of non-expired ledger entries |
| Auto-credited from | Refunds, cancellations, referral payouts, reward-point conversions, goodwill/support credits, cashback offers, bonuses |
| Checkout use | Applied partially or fully, combinable with Razorpay online payment |
| Ledger | Full credit/debit/expiry/source transaction history screen |
| Expiry | Admin-configurable (e.g. 180/365 days), scheduled expiry job |
| **No add-money.** | There is deliberately **no** "add funds" entry point anywhere in app/web — wallet is system-credited only, specifically to avoid PPI/RBI licensing triggers (see §17). |

### 9.2 Bonus

Sign-up bonus (post-OTP registration) · First-order bonus (credited after delivery + return window closes) · Birthday bonus (scheduled job, tier-aware multiplier) · Festive/campaign bonus (Marketing-configured, time-bound) · App-download/app-exclusive bonus. All bonus history is visible inside the wallet ledger, tagged by bonus type.

### 9.3 Referral Program

Unique code/link per customer (shareable via native share sheet — WhatsApp/SMS/social/copy-link) → referee gets a welcome discount on first order → referrer earns wallet credit or reward points once the referee's first order is delivered **and** past the return window → referral dashboard shows invites/signups/conversions/total earned. **Fraud checks:** one credited referral per unique verified mobile number/device, plus a minimum order-value threshold.

### 9.4 Reward Points

1 point per ₹1 of eligible spend, credited after the return window closes on the qualifying order → redeemable at checkout up to an admin-configured cap (% of order value) → birthday-month multiplier, tier-based (Member 1.5x / Gold 2x / Platinum 3x) → bonus point campaigns / limited-time multiplier events → admin-configurable expiry policy → points may be locked from redemption during designated sale windows (admin toggle) → dedicated ledger screen (earn/redeem/expiry history).

### 9.5 Offers

Admin/Marketing can scope offers by category, product, payment method, or membership tier → homepage Offers/Deals section reflects only currently valid (in-date-range) offers → best eligible coupon/offer auto-applies at cart (system selects the highest-value valid offer unless the customer overrides) → bank/Razorpay-partner instant-discount offers → time-bound flash-sale/seasonal countdowns.

### 9.6 Membership Program (Member / Gold / Platinum)

Free, auto-enrolling, spend-based tiered program. No joining fee. Based on **rolling 365-day purchase value** — GST, delivery charges, and returned items are excluded from the spend calculation.

| Tier | Qualifying Spend (365 days) | Renewal Threshold |
|---|---|---|
| Member | ₹1,500+ | ₹1,500 / 365 days |
| Gold | ₹4,000+ | ₹4,000 / 365 days |
| Platinum | ₹8,000+ | ₹8,000 / 365 days |

**Tier benefit matrix:**

| Benefit | Member | Gold | Platinum |
|---|---|---|---|
| Reward points earn rate | 1 pt/₹1 | 1 pt/₹1 | 1 pt/₹1 |
| Birthday point multiplier | 1.5x | 2x | 3x |
| Free shipping | — | On all orders | On all orders |
| Birthday gift | — | Yes | Yes (premium) |
| Early sale access | — | Yes | Yes (first access) |
| Tier-exclusive offers/coupons | — | Yes | Yes |
| Beauty tips/routine content access | Yes | Yes | Yes |
| Priority support | — | — | Yes (dedicated queue) |
| Point-multiplier campaign events | — | — | Yes |
| Platinum-exclusive product drops/combos | — | — | Yes |

**Rules:** auto-enrolled at Member on first ₹1,500 in rolling spend; auto-upgraded once a threshold is crossed **and** the qualifying order's return window has closed (with push/email notification); auto-downgraded via a **nightly recalculation job (AWS Lambda)** if rolling spend falls below the renewal threshold; customer-facing Membership screen shows current tier, benefits, and a progress bar to the next threshold.

---

## 10. Internal Panels — Full Feature Breakdown

### 10.1 Admin Panel

**Only panel with full read access across every module and write access to role/permission data.** Every other panel's RBAC guard traces back to a role this panel manages.

- **Dashboard:** total sales, orders by status, refund amount, customers (new/repeat), top-selling & low-stock/near-expiry/out-of-stock products, payment success rate, COD vs prepaid split, complaints, coupon usage, campaign performance, wallet liability, reward-points liability, membership tier distribution.
- **Modules:** user management, product/category/brand management (approval gate only — creation is Product Management's job), inventory, orders, returns/refunds, payments, coupons, banners, notifications, reviews, support, tax/finance reports, HR access, auditor access, **role & permission management** (the only screen with write access to `roles`/`permissions`/`role_permissions`), audit logs, wallet-expiry & membership-tier configuration, system settings, internal announcement/broadcast, global cross-panel search.
- **Compliance-critical:** mandatory 2FA (one of two panels, with Finance); every write into another module's data must go through that module's own backend endpoint and land in `audit_logs`; dashboard widgets are read/aggregate-only, never an editable form for another module's data.

### 10.2 Product Management Panel

**First internal panel built** — Inventory, Customer Web/App catalog, and Order Management all read data this panel produces.

- **Features:** add/edit/delete/activate product; images/video; variants; shades; fruit-ingredient tagging; skin-concern/skin-type tagging; pricing/discount; GST/HSN; batch/expiry; opening stock entry; how-to-use/ingredients/warnings/claims/storage instructions; return policy per product; SEO fields; bulk CSV import/export for the launch catalog.
- **Product fields:** name, slug, SKU, category, subcategory, brand, fruit ingredient, skin concern, skin type, product type, description, short description, MRP, selling price, discount, GST rate, HSN code, net quantity, shade name/code, fragrance/flavor, manufacturing/expiry date, batch number, manufacturer name/address, country of origin, storage instructions, usage instructions, ingredients, warnings, returnable status, COD availability, images, video, SEO title/description/keywords.
- **Compliance gate:** the Activate toggle is blocked **server-side**, not just client-side, until every mandatory Cosmetics Rules 2020 field is populated (batch number, expiry, manufacturer details, country of origin, test-report references at minimum).
- **Status workflow:** Draft → Pending Admin Approval → Live (final approval sits with Admin Panel).

### 10.3 Inventory Panel

Builds **second** in the dependency chain — needs Product Management's opening-stock trigger and can't go live until the backend inventory module ships.

- **Features:** stock in/stock out, available/reserved/damaged/expired stock views, low-stock alerts, near-expiry alerts, batch-wise stock, shade-wise stock, warehouse-wise stock, stock adjustment, stock transfer, return-stock handling, barcode scan, inventory audit (point-in-time count vs system count with variance reconciliation).
- **Fields:** product ID, SKU, variant ID, shade ID, batch number, manufacturing/expiry date, warehouse ID, bin location, total/available/reserved/damaged/returned/expired stock, reorder level, supplier/manufacturer, purchase price, MRP, selling price.
- **Ledger discipline:** every stock-in/out/adjustment/transfer is a `stock_movements` ledger entry, never a direct mutation of the current-stock number — on-screen available quantity is always a derived sum. No negative-stock write without an explicit reason code.

### 10.4 Order Management Panel

Builds after Product Management, Inventory, and the customer checkout flow are underway.

- **Order lifecycle statuses:** placed → payment pending → payment confirmed → order confirmed → processing → packed → ready to ship → shipped → out for delivery → delivered / cancelled / return requested → return approved → return picked → return received → refund initiated → refund completed.
- **Features:** order list with search/filter (ID, mobile, email, status, payment mode, date), order detail, status-update workflow with mandatory reason log, payment status panel (read-only — mutations happen only via Razorpay webhook), invoice screen, shipment tracking (ShadowFox), cancellation (pre-ship only by default, RBAC-gated post-ship override), return request queue with photo/video proof viewer, return approval/QC workflow, refund status/initiation, stock-reservation visibility widget, bulk actions/CSV export for Finance reconciliation.
- **Compliance-critical:** every status transition writes through `order_status_history`; no backward status jump without an explicit, separately-logged RBAC-gated correction.

### 10.5 Warehouse Panel

Builds after Inventory Panel — shares the same `warehouses`/`warehouse_bins`/`inventory_stock` tables.

- **Features:** warehouse & bin management, Purchase Order creation, GRN (Goods Received Note) creation against a PO, batch/expiry/packaging QC-on-receipt, bin put-away (barcode-scan supported), pick-list processing (from Order Management's confirm trigger), pack confirmation, invoice & shipping-label generation, ShadowFox courier handover/manifest, ship-confirmation, returned-order QC (sellable vs damaged), damaged/expired marking, stock-adjustment **requests** (routes to Inventory/RBAC-elevated approval, doesn't mutate directly), throughput dashboard.
- **Fulfillment flow:** order placed → payment confirmed/COD selected → pick list generated → staff picks → batch/expiry check → pack → invoice + shipping label generated → courier pickup scheduled → status → shipped → customer gets tracking link → delivered.

### 10.6 Tax / Finance Panel

Phase 5 work — can't be built for real until Order Management, Payments, Returns/Refunds, and the Loyalty ecosystem are all live.

- **Tax features:** HSN code management, tax-rate configuration (CGST/SGST/IGST, intra-state vs inter-state), GST tax-invoice viewer, credit-note creation, debit-note creation, product-wise/state-wise sales & tax reports.
- **Finance features:** sales report, GST report, general ledger/journal entries, Razorpay settlement reconciliation, COD collection reconciliation, wallet & reward-points liability ledger, P&L report (revenue, COGS from Inventory cost data, tax, refunds, loyalty liability), refund reconciliation, export & audit-trail hooks.
- **Compliance-critical:** one of two panels (with Admin) requiring mandatory 2FA; this panel is read/aggregate-only against source-of-truth tables owned by other modules — credit/debit notes and reconciliation flags are the *only* new financial records it's authorized to create.

### 10.7 HR Panel

**The only panel with no cross-panel data dependency** in either direction beyond feeding a summary to Admin — fully self-contained, can be built any time after auth/RBAC.

- **Features:** department management, employee management (profile, department/role, employment status), role assignment (links employee records to system RBAC roles), attendance (daily marking, calendar view, manual correction with reason log), leave management (application/approval/balance/leave-type config), employee documents (S3-backed), payroll (salary structure + monthly run + payslip PDF generation), performance review, recruitment (job requisitions, candidate pipeline), offer letters (template + e-sign tracking), exit process (resignation/termination workflow, full-and-final settlement, **automatic RBAC access revocation** as part of the same transaction).
- **Departments modeled:** Admin, Technology, Design, Product, Warehouse, Inventory, Finance, Tax, Customer Support, Marketing, Content, HR, Legal/Compliance, Operations.
- **Sensitive-data rule:** salary/document data is RBAC-scoped to HR and (if ever added) the employee's own self-service record — never a company-wide payroll export outside the HR role.

### 10.8 Auditor Panel (Read-Only)

**Built last** in the dependency chain — it only reads what every other panel has already produced.

- **Features:** admin activity log, price-change log, stock-adjustment log, order-modification log, login/session activity log, coupon/wallet/reward usage log (with anomaly flagging, e.g. same-device multiple referral credits), sales/tax/refund/inventory/payment reports (read-only mirrors of the owning panel's own reports), export (CSV/PDF) on every screen, auditor remarks/annotations (additive notes, never edits to the underlying record).
- **The one hard rule:** "no edit rights" must be enforced at the **database/query layer**, not just the UI — a specific test must confirm the backend rejects any write attempted from an authenticated auditor session, independent of what the UI exposes.

### 10.9 Customer Support Panel

Builds after Order Management, alongside Inventory/Warehouse — needs real orders/returns data before ticket-to-order linking is meaningful.

- **Features:** ticket list (search/filter by ID, customer, status, category, priority, agent, date), ticket detail (full thread, linked order), complaint category taxonomy + routing, order-lookup widget (read-only cross-reference), return-status widget, internal agent-only notes, escalation workflow, live chat (WebSocket, chat-to-ticket conversion, canned responses), email/WhatsApp integration threads, call-log entries, SLA tracking dashboard (first-response + resolution timers, breach flagging), action-back-to-order screen (agent-initiated status update / return-refund action, RBAC-gated), agent performance/workload dashboard.
- **Fixed complaint taxonomy:** order not delivered, payment failed but money deducted, wrong item received, damaged item received, expired item received, missing item, product leakage, return pickup not done, refund delayed, coupon not working, login issue, product/allergic reaction complaint.
- **Compliance-critical:** any order/return state change originating from a ticket must go through Order Management's/Returns' own backend endpoints — never a direct table write — so the order status-history audit trail stays the single source of truth.

### 10.10 Marketing / CRM Panel

Phase 5 work — full feature set can't ship until the wallet/bonus/referral/rewards/offers/membership backend and the Marketing/CRM backend module are live. Also backfills the home-banner stub the customer surfaces were built against from Day 6 onward.

- **Features:** banner management (homepage + category, scheduled, active-date-range), homepage section reorder/toggle, coupon creation (percent/flat, min-order, scope, usage limits, validity), campaign creation (name/goal/audience/date-range + linked coupon/offer/bonus rules + performance dashboard), push notification compose/schedule/send (FCM), email campaign (template + open/click tracking), SMS + WhatsApp campaigns, abandoned-cart recovery (pulled from Order Management, triggers recovery sequence, recovery-rate dashboard), referral-program configuration (payout rules, fraud-check settings), bonus & reward-points campaign configuration (birthday multiplier, campaign multiplier events, sale-window lockout), offers-engine configuration, membership-tier-targeted campaigns, influencer tracking (unique code/link, attribution, payout), affiliate tracking (commission rules, payout), marketing performance dashboard (campaign + channel rollup, coupon usage).
- **Campaign example set:** Fruit Glow Launch Sale, Sunscreen Summer Sale, Strawberry Lip Care Drop, Mango Moisture Week, Pomegranate Anti-Ageing Kit, Green Tea Calm Skin Sale, Blueberry Hydration Combo, SPF Makeup Collection Launch.
- **Compliance-critical:** this panel is a **configuration surface** for loyalty rules owned by the Wallet/Bonus/Referral/Rewards/Offers backend modules — it must never write directly to `wallet_ledger`/`reward_points_ledger`/`referrals` tables. Sends must respect customer consent/opt-out flags.

### 10.11 Content Panel

Phase 5 work, alongside Marketing/CRM — needs the Content backend module and Product Management's fruit/ingredient tagging to be real first.

- **Features:** blog post editor (rich-text, draft/publish), beauty tips (short-form, tip-of-the-day slotting), skin-routine articles (structured AM/PM routine layout), ingredient education/library (per-ingredient detail, pulls fruit taxonomy from Product Management), fruit benefit pages (long-form per launch fruit, cross-linked to tagged products), product usage guide (long-form, distinct from Product Management's short how-to-use field), video tutorial upload, SEO content (meta title/description/keywords), FAQ management, homepage editorial content (copy blocks — distinct from Marketing's banners), product description writing (long-form, feeds back for review but never bypasses Product Management's approval gate), routine-builder content (copy layer alongside the algorithmic recommendation), legal-pages CMS (versioned, publish history), content calendar/publish scheduling.
- **Blog idea bank:** how to choose sunscreen for your skin type; benefits of orange for glowing skin; green tea for oily skin; mango butter for dry skin; pomegranate for anti-ageing; how to use serum correctly; toner vs mist; SPF lipstick — why lips need sun protection; how to build a fruit-based skincare routine.
- **Compliance-critical:** legal-page edits must be versioned, never overwritten in place, for an auditable record of what was live on any given date.

---

## 11. Confirmed Technology Stack

*(This is the finalized stack from the PRD and Complete Build Form. The original Project Documentation had suggested Next.js for web and Shiprocket/Delhivery for shipping and Cashfree/PayU/PhonePe as gateway alternatives — those were early options; the finalized, confirmed choices below supersede them. See §25 for the full reconciliation.)*

| Layer | Confirmed Choice |
|---|---|
| Customer Website | React.js (Vite build) + Tailwind CSS + Headless UI |
| Customer Website state | Redux Toolkit / React Query |
| Customer Website routing | React Router v6 |
| Customer Website forms | React Hook Form + Zod |
| Customer Website SEO | React Helmet + a pre-render/SSG or lightweight SSR layer (to keep landing pages crawlable despite CSR-first React) |
| Customer Website HTTP | Axios with JWT-refresh interceptors |
| Customer Website hosting | AWS S3 + CloudFront (or AWS Amplify Hosting) |
| Customer App | React Native (CLI, not Expo — for full native module access) |
| Customer App language | TypeScript |
| Customer App state | Redux Toolkit |
| Customer App navigation | React Navigation (native stack + bottom tabs) |
| Customer App styling | NativeWind (Tailwind for RN), mirroring web design tokens |
| Customer App secure storage | react-native-keychain / EncryptedStorage |
| Customer App push | Firebase Cloud Messaging |
| Customer App payments | Razorpay React Native SDK |
| Customer App build/release | Fastlane + GitHub Actions / AWS CodeBuild |
| Backend runtime | Node.js (LTS) + NestJS — **modular monolith** at launch, splittable to microservices later |
| Database | PostgreSQL (AWS RDS, Multi-AZ) |
| ORM | Prisma |
| Cache/Queue | Redis (AWS ElastiCache) — sessions, OTP throttling, cart cache, BullMQ job queues |
| Auth | JWT (access + refresh tokens) + OTP-based mobile login |
| File storage | AWS S3 (product media, KYC/compliance docs) |
| CDN | AWS CloudFront |
| Search | PostgreSQL full-text/trigram search at launch; OpenSearch optional at scale |
| Notifications | Firebase Cloud Messaging (push), AWS SES (email), SMS/WhatsApp via MSG91/Gupshup-style provider |
| Payments | **Razorpay — sole gateway** (Orders API, Payment Links, Webhooks, Route for settlements) |
| Logistics | **ShadowFox** — shipping/tracking/RTO/COD remittance |
| Internal Panels | Same React + Tailwind stack as web, shared `packages/ui` component library, role-based route guarding |

---

## 12. AWS Infrastructure Map

| AWS Service | Purpose |
|---|---|
| EC2 / ECS Fargate | Containerized NestJS backend services, auto-scaling |
| RDS (PostgreSQL, Multi-AZ) | Primary transactional database |
| ElastiCache (Redis) | Session cache, OTP throttle, cart, queues |
| S3 | Product media, invoices, compliance documents, static web build |
| CloudFront | CDN for web app, images, video |
| Route 53 | DNS management |
| ALB | Traffic routing across ECS tasks |
| SES | Transactional & marketing email |
| Lambda | Scheduled jobs — expiry alerts, wallet expiry, membership tier recalculation, abandoned cart |
| CloudWatch | Logs, metrics, alarms |
| WAF + Shield | Web application firewall / DDoS protection |
| Secrets Manager | Razorpay keys, DB credentials, JWT secrets |
| AWS Backup | Automated RDS/S3 backup and retention policy |
| CodePipeline/CodeBuild or GitHub Actions | CI/CD for web, app, and backend |

---

## 13. Database Schema — Full Table Inventory

All tables use UUID primary keys, `created_at`/`updated_at` timestamps, and soft-delete flags where applicable.

| Domain | Tables |
|---|---|
| **Auth & Access** | `users, roles, permissions, user_roles, role_permissions, otp_logs, login_sessions, devices` |
| **Customer** | `customer_profiles, customer_addresses, customer_skin_profiles, customer_makeup_preferences, wishlist, wishlist_items` |
| **Product** | `brands, categories, subcategories, products, product_variants, product_images, product_videos, product_ingredients, product_benefits, product_skin_types, product_concerns, product_reviews, product_questions, product_answers` |
| **Inventory** | `warehouses, warehouse_bins, inventory_stock, inventory_batches, stock_movements, stock_adjustments, damaged_stock, expired_stock, purchase_orders, goods_received_notes` |
| **Cart & Order** | `carts, cart_items, orders, order_items, order_status_history, order_addresses, order_payments, order_shipments, order_invoices, order_cancellations, returns, return_items, refunds` |
| **Payments (Razorpay)** | `payment_transactions, razorpay_orders, razorpay_payment_events, refund_transactions, cod_collections, settlements` |
| **Loyalty (Wallet/Bonus/Referral/Rewards/Offers/Membership)** | `customer_wallets, wallet_transactions (wallet_ledger), bonus_rules, bonus_grants (bonus_ledger), referral_codes, referrals, reward_points_ledger, reward_points_rules, offers, offer_rules, coupons, coupon_rules, coupon_usage, memberships (membership_tiers), membership_tier_history (membership_history)` |
| **Marketing** | `campaigns, banners, push_notifications, email_campaigns, sms_campaigns` |
| **Tax/Finance** | `hsn_codes, tax_rates, gst_invoices, credit_notes, debit_notes, ledgers, journal_entries, finance_reports` |
| **HR** | `employees, departments, attendance, leaves, payroll, salary_slips, employee_documents` |
| **Audit** | `audit_logs, admin_activity_logs, price_change_logs, stock_change_logs, order_change_logs, login_activity_logs` |
| **Support** | `support_tickets, ticket_categories, ticket_notes` |
| **Content** | `blog_posts, faqs, legal_pages` (or a generic `content_blocks`) |

### 13.1 Schema additions required by the segment toggle and gap-fill (from the Master Build Plan)

| New/Modified Table | Change | Reason |
|---|---|---|
| `products` | `+ product_line ENUM('skincare','makeup')` NOT NULL, `+ is_cross_segment BOOLEAN` | Segment toggle (§6) |
| `categories` | `+ product_line ENUM('skincare','makeup','both')` | Segment toggle |
| `banners`, `campaigns` | `+ target_segment ENUM('skincare','makeup','both')` | Segment-targeted marketing |
| `blog_posts`/`faqs` | `+ segment` tag (optional) | Segment-targeted content |
| `data_requests` *(new)* | Customer data export/delete requests, verification + fulfillment status | DPDP Act 2023 compliance gap |
| `customer_consent` *(new)* | Per-channel (push/email/SMS/WhatsApp) opt-in/out flags + change audit | Consent/preference gap |
| `serviceable_pincodes` *(new)* | Pincode-level serviceability + COD-eligibility flags | Serviceability-zone management gap |
| `suppliers` *(new)* | Supplier master data (name, GSTIN, contact, address, payment terms) | Supplier-master gap |
| `product_bundle_items` *(new)* | Bundle/kit product → component SKU + quantity mapping | Bundle/Kit product-type gap |
| `app_versions` *(new)* | Min/latest supported app version per platform, force-update flag | App-version gate gap |

---

## 14. API Endpoint Summary

| Group | Representative Endpoints |
|---|---|
| Auth | `POST /auth/send-otp`, `/auth/verify-otp`, `/auth/logout`, `/auth/refresh-token`, `GET /auth/me` |
| Customer | `GET/PUT /customer/profile`, `/customer/address` (CRUD), `POST /customer/skin-quiz`, `GET /customer/recommendations` |
| Product/Catalog | `GET /products`, `/products/:id`, `/products/search`, `/products/category/:id`, `/products/concern/:id`, `/products/fruit/:name`, `/products/:id/similar`, `GET/POST /products/:id/reviews` |
| Cart & Wishlist | `GET /cart`, `POST /cart/items`, `PUT/DELETE /cart/items/:id`, `POST /cart/apply-coupon`, `DELETE /cart/remove-coupon`, `GET/POST/DELETE /wishlist/:productId` |
| Orders | `POST /orders`, `GET /orders`, `GET /orders/:id`, `POST /orders/:id/cancel`, `GET /orders/:id/track`, `GET /orders/:id/invoice` |
| Payments (Razorpay) | `POST /payments/razorpay/create-order`, `/payments/razorpay/verify`, `/payments/razorpay/webhook`, `GET /payments/:orderId/status`, `POST /refunds/initiate`, `GET /refunds/:id/status` |
| Returns | `POST /returns/request`, `GET /returns`, `GET /returns/:id`, `PUT /returns/:id/approve`, `/reject`, `POST /returns/:id/qc` |
| Loyalty | `GET /wallet/balance`, `/wallet/transactions`, `POST /checkout/apply-wallet`, `GET /bonus/history`, `GET /referral/code`, `POST /referral/redeem`, `GET /referral/dashboard`, `GET /rewards/balance`, `/rewards/ledger`, `POST /checkout/apply-points`, `GET /offers/active`, `GET /membership/status`, `/membership/benefits` |
| Admin & Internal | `GET /admin/dashboard`, `/admin/users`, `/admin/orders` (+`PUT` status), `/admin/products` (CRUD), `/admin/categories`, `/admin/brands`, `/admin/reports/sales`, `/admin/reports/inventory` |
| Inventory | `GET /inventory/stock`, `POST /inventory/stock-in`, `/stock-out`, `/adjustment`, `GET /inventory/low-stock`, `/near-expiry`, `POST /inventory/transfer` |
| Finance | `GET /finance/dashboard`, `/sales-report`, `/gst-report`, `/invoices`, `/refunds`, `/payment-settlements`, `POST /finance/hsn-code`, `/tax-rate` |
| HR | `POST /hr/employees`, `GET /hr/employees`, `PUT /hr/employees/:id`, `POST /hr/attendance`, `/leaves`, `PUT /hr/leaves/:id/approve`, `POST /hr/payroll/generate` |
| Audit | `GET /audit/logs`, `/audit/orders`, `/audit/payments`, `/audit/inventory`, `/audit/tax`, `/audit/admin-activity` |
| Shipping (ShadowFox) | `POST /shipping/shadowfox/create-shipment`, `GET /shipping/shadowfox/track/:awb`, `POST /shipping/shadowfox/webhook`, `/cancel`, `GET /shipping/shadowfox/serviceability` |

---

## 15. Third-Party Integrations

| Partner | Role | Key Flow |
|---|---|---|
| **Razorpay** | Sole payment gateway — UPI, cards, netbanking, wallets, EMI, Pay Later; COD as a non-gateway mode | Cart → coupon/wallet/points applied → backend computes final payable → Razorpay Order created via Orders API → Checkout (web SDK / RN SDK) → backend verifies signature server-side → **webhook is the source of truth for payment status, never the client callback alone** → refunds via Razorpay Refunds API for prepaid, Wallet-default for COD → nightly settlement reconciliation |
| **ShadowFox** | Delivery/logistics partner **and** the build & delivery agency for this SOW | Pincode/COD serviceability check at cart/checkout → shipment creation + AWB + label printing from Warehouse Panel → pickup scheduling/handover → real-time tracking webhooks to the customer's Track Order screen → reverse pickup for returns/RTO → COD remittance reconciliation against Finance Panel |
| **Firebase Cloud Messaging** | Push notifications (app), also used as the mobile delivery channel for order/loyalty/marketing notifications | — |
| **AWS SES** | Transactional & marketing email | — |
| **SMS/WhatsApp provider** (MSG91/Gupshup-style) | SMS + WhatsApp campaign and transactional sends | — |

---

## 16. Security Requirements

- JWT auth with short-lived access token + refresh-token rotation
- OTP rate limiting and device/IP throttling
- Role-based access control (RBAC) across all internal panels
- **Mandatory 2FA for Admin and Finance panel logins** (the only two panels with this requirement)
- Password hashing (bcrypt/argon2) for internal-panel users
- API rate limiting at the ALB/API-gateway layer
- Razorpay webhook signature verification on every event
- File-upload validation (type, size, virus scan) for product media and support attachments
- Input validation & sanitization on every endpoint (class-validator/Zod)
- **Full audit logging** of price, stock, order, and wallet/points adjustments
- AES-256 encryption at rest (RDS, S3) and TLS 1.2+ in transit
- Automated daily RDS + S3 backups with defined retention
- HTTPS everywhere, CSRF protection on web, XSS/SQL-injection protection, optional Admin IP allow-listing

---

## 17. Compliance & Legal Requirements

### 17.1 Cosmetics Rules, 2020 (CDSCO)

Per-product data that must be stored and gated before a product can go Live: manufacturing license details, third-party manufacturer details, product formula approval, ingredient list, batch number, manufacturing date, expiry date, MRP, net quantity, country of origin, manufacturer address, importer details (if applicable), label artwork, product claim proof, test report, certificate of analysis, stability testing report, microbial testing report, heavy-metal testing report (if applicable), safety data sheet (if applicable), GST and HSN code.

### 17.2 GST / Tax

GST/HSN compliance and tax-invoice generation; CGST/SGST/IGST calculation engine (intra-state vs inter-state).

### 17.3 RBI — Wallet Design

The wallet is a **non-loadable, promotional-credit-only instrument** — no customer add-money path exists anywhere in app/web, specifically to stay outside PPI/RBI licensing triggers.

### 17.4 Consumer Protection (E-Commerce) Rules — Mandatory Legal Pages

Terms & Conditions, Privacy Policy, Shipping Policy, Return/Refund/Cancellation Policy, Payment Policy, Cookie Policy, Product/Allergy/Cosmetic-usage Disclaimers, Contact Us, Grievance Officer details.

### 17.5 India DPDP Act 2023 — **gap identified, now added to scope**

None of the source documents (PRD, Build Form, Project Documentation) addressed India's Digital Personal Data Protection Act, 2023, despite covering the other three compliance regimes in detail. This has been added as a new requirement: customer-facing data export/delete request flow, backend `data_requests` module with a verification + fulfillment step, retention-policy exceptions (financial/tax records must legally be retained even against a delete request), and an Admin queue to fulfill requests. Full spec in the Master Build Plan §4.1.

---

## 18. Non-Functional Requirements

| Category | Requirement |
|---|---|
| Performance | PLP/PDP pages load in <2s on 4G; API p95 response time <400ms |
| Scalability | Backend auto-scales via ECS Fargate; RDS read replica ready for scale-out |
| Availability | 99.9% uptime target for storefront and payment path |
| Security | JWT + refresh tokens, RBAC, 2FA for admin/finance, TLS 1.2+, AES-256 at rest, Razorpay webhook signature verification |
| Compliance | Cosmetics Rules 2020, GST/HSN invoicing, Consumer Protection (E-Commerce) Rules legal pages, RBI-safe non-loadable wallet |
| Auditability | Full audit log of price, stock, order, and reward-point changes |
| Accessibility | WCAG 2.1 AA target for web storefront and internal-panel forms |
| Observability | Centralized logging & alerting via AWS CloudWatch |

---

## 19. Product Testing Requirements (pre-launch, physical product)

Stability testing · microbial testing · dermatological testing · patch testing · preservative-efficacy testing · heavy-metal testing · pH testing · SPF testing (sunscreen) · PA-rating testing (sunscreen) · water-resistance testing (sunscreen, if claimed) · color-stability testing (makeup) · fragrance-allergen check · packaging-compatibility testing · shelf-life testing. **Sunscreen/SPF products need special care** — SPF claims must be scientifically tested and proven before any marketing claim is made.

---

## 20. Reports Required (by department)

| Department | Reports |
|---|---|
| **Sales** | Daily sales, monthly sales, product-wise, category-wise, fruit-wise, skin-concern-wise, makeup-category-wise, city-wise, payment-mode-wise, coupon-wise |
| **Inventory** | Current stock, low stock, out-of-stock, near-expiry, expired, damaged stock, batch-wise, warehouse-wise, shade-wise |
| **Finance** | Total revenue, refund amount, COD amount, prepaid amount, payment-gateway charges, shipping cost, coupon cost, gross margin, net margin, tax summary |
| **Customer** | New customers, repeat customers, inactive customers, high-value customers, skin-type segmentation, skin-concern segmentation, most-searched products, most-wishlisted products, cart abandonment |
| **Marketing** | Campaign performance, coupon performance, push-notification performance, email-campaign performance, referral conversion, influencer sales, affiliate sales |

Note: several of these (fruit-wise sales, makeup-category-wise sales) already anticipate a segment split — the segment toggle (§6) formalizes this into an explicit dashboard filter rather than a report-only breakdown.

---

## 21. Team Requirements

| Role | Responsibility |
|---|---|
| Project Manager | Delivery ownership, sprint planning, client reporting |
| Business Analyst | Requirement sign-off, scope tracking |
| UI/UX Designer | Design system, screens for web/app/admin |
| React.js Developer(s) | Customer website + admin/internal panels |
| React Native Developer(s) | Customer mobile app (iOS + Android) |
| Backend Developer(s) — Node.js/NestJS | APIs, services, Razorpay & ShadowFox integrations |
| Database Engineer | PostgreSQL schema, performance tuning |
| DevOps Engineer | AWS infra, CI/CD, monitoring, security hardening |
| QA Engineer | Functional, regression, payment & security testing |
| Compliance Consultant (client-side) | Cosmetics Rules 2020 documentation support |

*(The earlier Project Documentation additionally named a Product Formulation Expert, Cosmetic Compliance Consultant, Digital Marketing Executive, Content Writer, Customer Support Executive, Warehouse Executive, and Finance/Tax Consultant as business-side roles outside the ShadowFox delivery team — these are the client's own operating staff, distinct from the technical delivery team above.)*

---

## 22. Git/Repo Structure & Workflow

- **Monorepo:** `apps/` (customer-web, customer-app, internal-panel), `backend/`, `packages/` (ui, types), `infra/`, `docs/` — npm/yarn workspaces + Turborepo.
- **Branching:** trunk-based with short-lived feature branches. `main` is always deployable, protected (1 PR approval + passing CI). Feature branches: `feature/<panel-or-app>/<short-desc>`. Fix branches: `fix/<area>/<short-desc>`. Squash-merge only.
- **Folder ownership:** `backend/src/modules/*` → backend devs (split by domain); `apps/customer-web` → React dev(s); `apps/customer-app` → RN dev; `apps/internal-panel/src/modules/<panel>` → one dev per panel where possible; `packages/ui`/`packages/types` → shared, PR-reviewed by design lead (breaking changes here affect every app). Because every panel has its own subfolder, two developers rarely touch the same file.
- **Commits:** Conventional Commits — `<type>(<scope>): <description>`, e.g. `feat(inventory): add low-stock alert widget`.
- **PR checklist:** what changed, which panel/app/module, backend API dependency + status (ready/mocked), screenshots for UI, and confirmation of lint/tests passing, no secrets committed, RBAC guard added for new routes.
- **CI/CD:** `ci.yml` (lint/typecheck/test/build per package via Turborepo) · `deploy-backend.yml` (Docker → ECR → ECS Fargate) · `deploy-web.yml` (S3 + CloudFront) · `deploy-internal-panel.yml` (same pattern, VPN/IP-gated) · `deploy-app.yml` (Fastlane → TestFlight/Play Internal).
- **Secrets:** local `.env` (gitignored, `.env.example` committed with dummies); CI/CD & prod via AWS Secrets Manager, injected via OIDC (no long-lived AWS keys in GitHub).
- **Environments:** Local (Docker Compose Postgres+Redis+localhost backend) · Staging (ECS staging, S3+CloudFront staging, TestFlight/Play Internal, VPN-gated internal panel, RDS staging) · Production (ECS auto-scaled, S3+CloudFront prod, App/Play Store, VPN/IP-gated internal panel, RDS Multi-AZ).

---

## 23. Build Order Summary

Full day-by-day detail lives in the 15 individual build-plan docs and the consolidated `15-MASTER-BUILD-PLAN.md`. High-level order:

```
Backend Phase 1 (auth/RBAC)
  → Backend Phase 2 (catalog/cart/orders/payments)
      → Product Management Panel
      → Customer Web + Customer App
          → Order Management Panel
  → Backend Phase 3 (inventory/warehouse/shipping/returns)
      → Inventory Panel → Warehouse Panel
      → Customer Support Panel
  → Backend Phase 4 (wallet/bonus/referral/rewards/offers/membership)
      → (Customer Web/App loyalty screens + Marketing/CRM configuration screens)
  → Backend Phase 5 (finance/hr/audit/marketing/content APIs)
      → Tax/Finance Panel → Marketing/CRM Panel → Content Panel → HR Panel
      → Auditor Panel (built last)
      → Admin Panel (scaffold/RBAC built in parallel from Day 1; dashboard widgets trail each source panel's real ship date)
```

Admin Panel is the one exception to strict sequencing — its RBAC/role-management and approval-gate screens must exist early (Product Management's approval workflow depends on them), while its dashboard widgets go live incrementally as each source module ships real data.

---

## 24. Known Gaps & Open Decisions

These were identified by cross-referencing all 15 build-plan docs against the PRD/Build Form/Project Documentation and are **not yet resolved in any source document** — flagged here so nothing gets built against an assumption instead of a decision. (Full technical spec for each is in `15-MASTER-BUILD-PLAN.md` §3–§4.)

1. **Skincare/Makeup segment toggle** — now specified (§6), needs design sign-off on default landing segment for first-ever session.
2. **India DPDP Act 2023 data-rights requests** — export/delete flow was missing entirely; now scoped, needs a decision on retention-exception rules (which records survive a delete request for legal/tax reasons).
3. **Consent/preference center** — Marketing's compliance note referenced opt-out flags that no screen ever created; now scoped.
4. **Serviceability/COD-zone management** — backend-only stub existed with no internal-panel screen; now scoped, needs a decision on which panel owns it long-term (Warehouse vs Admin).
5. **Bundle/Kit/Gift Set products** — named in scope (Project Documentation §2) but never modeled in any panel; now scoped, needs a decision on kit-level pricing rules (sum-of-components vs custom kit price) and kit-level compliance inheritance (which component's expiry date governs the kit).
6. **Supplier master data** — currently free-text per PO; now scoped as a proper master table.
7. **App version/force-update gating** — standard for an RN launch, absent from both App and Admin plans; now scoped.
8. **Global default return/cancellation window** — currently only settable per-product; now scoped as an Admin-level fallback default.
9. **First-ever-session default segment** (Skincare vs a neutral "Both" view) — flagged for design sign-off, doesn't block backend work.
10. **Documentation asymmetries** — four places where a panel's own "Sends to" summary omitted a real data flow (mostly around Auditor's upstream sources); functionally fine, but the individual docs should be edited to match (see Master Build Plan §2).

---

## 25. Source Documents & Version Notes

This master document draws from, in order of authority (later supersedes earlier where they conflict):

1. **`projdoc.md`** (Florie Beauty Skincare & Makeup Ecommerce Project Documentation) — the earliest, most exploratory doc. Suggested Next.js for web, Shiprocket/Delhivery for logistics, and Cashfree/PayU/PhonePe as gateway options; suggested HR/Auditor/advanced finance as Phase 2 (post-v1).
2. **`Florie Beauty_PRD.docx`** — the finalized Product Requirements Document. **Confirms** React + Tailwind (Vite) for web (not Next.js), Razorpay as the **sole** gateway, and folds HR/Auditor panels into v1 Phase 5.
3. **`Florie Beauty_Complete_Build_Form.docx`** — the finalized technical/delivery specification. **Confirms** ShadowFox as the sole logistics partner (superseding the earlier Shiprocket/Delhivery mention) and fixes the full AWS infrastructure map, DB schema, and API list.
4. **`00`–`14` build-plan docs + `GIT_SETUP_AND_WORKFLOW.md`** — the execution-level, day-by-day plans derived from the above, one per surface.
5. **`15-MASTER-BUILD-PLAN.md`** (previously produced) — the connectivity audit, segment-toggle technical spec, and gap-fill additions layered on top of all of the above.

Where this document states a "confirmed" stack or scope choice, it is quoting item #2/#3 (the finalized specs) even in cases where item #1 (the earliest doc) suggested something different.

---

## 26. Glossary

| Term | Meaning |
|---|---|
| **PLP / PDP** | Product Listing Page / Product Detail Page |
| **SKU** | Stock Keeping Unit — one sellable product/variant combination |
| **GRN** | Goods Received Note — warehouse's record of stock received against a Purchase Order |
| **HSN** | Harmonized System of Nomenclature — the tax classification code used for GST |
| **CGST/SGST/IGST** | Central/State/Integrated Goods & Services Tax — India's GST split for intra-state vs inter-state sales |
| **RTO** | Return to Origin — a shipment that couldn't be delivered and is returned to the warehouse |
| **AWB** | Air Waybill — the courier's unique shipment tracking number |
| **COD** | Cash on Delivery |
| **RBAC** | Role-Based Access Control |
| **2FA** | Two-Factor Authentication |
| **PPI** | Prepaid Payment Instrument — the RBI-regulated category the wallet is deliberately designed to avoid becoming |
| **DPDP Act** | India's Digital Personal Data Protection Act, 2023 |
| **CDSCO** | Central Drugs Standard Control Organisation — regulates cosmetics under the Cosmetics Rules, 2020 |
| **SSG/SSR** | Static Site Generation / Server-Side Rendering — used here to keep a client-rendered React app's SEO pages crawlable |
| **Segment (in this doc)** | Either "Skincare" or "Makeup" — the two catalog halves the new toggle switches between |
