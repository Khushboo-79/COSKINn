# COSKINn — Master Build Plan

**This document consolidates:** `00-PANEL-CONNECTIVITY-MAP.md`, `01`–`14` (Customer Web, Customer App, Backend, and all 11 internal panels), `GIT_SETUP_AND_WORKFLOW.md`, the PRD, the Complete Build Form, and the Project Documentation — into one master reference. It does three things the source docs don't do individually:

1. **Verifies every panel-to-panel connection** against the connectivity map and flags the handful of places where documentation was asymmetric (not a code bug, but worth fixing so no dev misreads scope).
2. **Specifies the single-brand, dual-segment (Skincare / Makeup) toggle** end-to-end — this was not in any of the 15 source documents and touches backend schema, both customer surfaces, and four internal panels.
3. **Lists gaps found across the internal panel build plans** — real functional gaps, not nice-to-haves — with the concrete day-by-day additions needed to close them.

Nothing below replaces the 15 source documents; it sits on top of them. Where a fix modifies an existing day, that's called out explicitly ("Day 6, **modified**"). Where it's genuinely new scope, it's a new day appended to that surface's plan.

---

## 1. System Overview

| # | Surface | Repo path | Stack |
|---|---|---|---|
| 1 | Customer Website | `apps/customer-web` | React + Tailwind (Vite) |
| 2 | Customer Mobile App | `apps/customer-app` | React Native CLI |
| 3 | Admin Panel | `apps/internal-panel/src/modules/admin` | React + Tailwind |
| 4 | Product Management Panel | `apps/internal-panel/src/modules/product` | React + Tailwind |
| 5 | Inventory Panel | `apps/internal-panel/src/modules/inventory` | React + Tailwind |
| 6 | Order Management Panel | `apps/internal-panel/src/modules/orders` | React + Tailwind |
| 7 | Warehouse Panel | `apps/internal-panel/src/modules/warehouse` | React + Tailwind |
| 8 | Tax / Finance Panel | `apps/internal-panel/src/modules/finance` | React + Tailwind |
| 9 | HR Panel | `apps/internal-panel/src/modules/hr` | React + Tailwind |
| 10 | Auditor Panel | `apps/internal-panel/src/modules/audit` | React + Tailwind (read-only) |
| 11 | Customer Support Panel | `apps/internal-panel/src/modules/support` | React + Tailwind |
| 12 | Marketing / CRM Panel | `apps/internal-panel/src/modules/marketing` | React + Tailwind |
| 13 | Content Panel | `apps/internal-panel/src/modules/content` | React + Tailwind |
| — | Backend | `backend/src/modules/*` | NestJS + PostgreSQL |

One brand — **COSKINn** — one catalog, sold across two customer surfaces and administered through eleven internal panels sharing one backend. No panel ever calls another panel directly; every cross-panel arrow below is a backend API.

---

## 2. Connectivity Audit — is everything actually connected?

I checked every panel's own "Connects to panels" section in its build-plan doc against `00-PANEL-CONNECTIVITY-MAP.md` §2, line by line. **The functional wiring is consistent** — every "Receives from" on one panel has a matching "Sends to" on the other side, for all 13 surfaces. Nothing is orphaned; nothing reads data that has no producer.

There are, however, **four asymmetric documentation gaps** — the data flow works (per the day-level tasks), but the summary bullet lists don't mention it, which is exactly the kind of thing that causes a new dev to under-scope a feature. Fixed here:

| Gap | What's actually true (found in day-level tasks) | Fix |
|---|---|---|
| Auditor's upstream sources aren't listed as recipients on their own pages | Admin (Day 2), Order Management (Day 5), Inventory (Day 4, 11), Finance (Day 8–9), Marketing (Day 18) all produce logs/reports Auditor reads | Add **"Auditor Panel (log/report read access)"** to the "Sends to →" list of: Admin, Order Management, Inventory, Tax/Finance, Marketing/CRM build-plan docs |
| Warehouse ⇄ Inventory shared-table dependency undersells how tight the coupling is | Warehouse plan says it "reads and writes the same `warehouses`/`warehouse_bins`/`inventory_stock` tables Inventory Panel establishes" — this is closer to co-ownership than a simple send/receive | No plan change needed, but **flag in onboarding**: these two panels must ship against the same migration, never independently |
| HR → Admin is one-way in the map, but HR Day 4 also **writes** into the shared `user_roles` table (exit process, Day 13) | HR isn't just a data *source* for Admin's dashboard — it's a second writer into RBAC tables that Admin Panel "owns" per its own doc | Add explicit line to Admin Panel's compliance note: *"HR Panel is the one exception to Admin being the sole RBAC writer — HR's exit-process workflow deactivates `user_roles` access as part of Backend Day 58/9. This must be captured in `audit_logs` exactly like an Admin-originated RBAC change."* |
| Order Management's "Sends to" list doesn't mention Customer Support even though Support's ticket screen depends on it | Support Day 5 explicitly cross-references Order Management for the order-lookup widget | Add **"Customer Support Panel (order lookup)"** to Order Management's "Sends to →" list (the map already has this; only the individual panel doc was missing it) |

None of these require new backend work — they're documentation-only fixes, called out here so the next person editing these files keeps them in sync.

---

## 3. NEW REQUIREMENT — Single Brand, Dual Segment: Skincare ⇄ Makeup Toggle

This was not specified anywhere in the PRD, Build Form, or Project Documentation, and none of the 15 build-plan docs account for it. It is a cross-cutting change — one brand, one account, one cart, but the *browsing experience* forks into two distinct UI modes selected by a toggle at the top of the customer surfaces.

### 3.1 Product decision (stated plainly, so every team builds the same thing)

- **One brand, one login, one cart, one order history, one wallet/points/membership balance.** The toggle is a **browse-mode filter**, not a second storefront, sub-brand, or separate account.
- A persistent toggle/segmented-control sits at the **top of the header on Customer Web** and as a **persistent top segmented-control (below the status bar) on Customer App** — two options: **Skincare** and **Makeup**.
- Switching the toggle re-renders: home dashboard (hero banner, category rail, fruit-concern rail), category/subcategory tree, PLP filters (skincare gets skin-type/concern/SPF filters; makeup gets shade/finish/look filters), search scoping (default-scoped to the active segment, with an explicit "search all COSKINn" escape hatch), and SEO landing pages (`/skincare/...` vs `/makeup/...` URL namespaces).
- **Cart, wishlist, checkout, order history, wallet, reward points, membership tier, and account settings are segment-agnostic** — a customer can have a Skincare item and a Makeup item in the same cart; the toggle never partitions the account.
- The **Cream Blush** SKU (and any future hybrid SKU) is tagged to **both** segments and appears under whichever toggle is active — this is a tagging rule, not a special case in code.

### 3.2 Backend additions

| Day | Module / Deliverable | Tables touched | Notes |
|---|---|---|---|
| **6, modified** | Product core module — add mandatory `product_line` field | `products`: add `product_line ENUM('skincare','makeup')` **NOT NULL**, plus `is_cross_segment BOOLEAN DEFAULT false` for hybrid SKUs (e.g. Cream Blush) shown under both toggles | Server-side validation: a product cannot go Live without `product_line` set — same enforcement pattern as the existing Cosmetics Rules 2020 gate |
| **5, modified** | Category/Subcategory module — segment-scoped categories | `categories`: add `product_line ENUM('skincare','makeup','both')` | A category like "Sunscreen" is skincare-only; a hybrid category (if ever needed) uses `both` |
| **16, modified** | Home Dashboard aggregation API — segment param | `categories, products, banners` | `GET /home?segment=skincare|makeup` returns segment-scoped hero/category/fruit-concern rails; falls back to a segment-neutral response only during onboarding before a segment is chosen |
| **11, modified** | Public catalog read APIs — segment filter | `products` (read) | `GET /products?segment=skincare|makeup` becomes the default query shape consumed by both PLP and search |
| **12, modified** | Search service — segment scoping | — | Search defaults to `segment` query param scope; explicit "search all" flag removes the filter |
| **14, modified** | SEO metadata + landing pages — segment-namespaced URLs | `products` (SEO fields) | Landing-page slugs move to `/skincare/<slug>` and `/makeup/<slug>`; redirect map needed if any pre-existing SEO URLs assumed a flat namespace |
| **62, modified** | Marketing/CRM module — banner/campaign segment targeting | `banners, campaigns` | Add `target_segment ENUM('skincare','makeup','both')` to banners and campaigns so Marketing can run a Skincare-only sale banner without it leaking into Makeup mode |
| **63, modified** | Content module — segment tagging | `blog_posts, faqs, legal_pages`/`content_blocks` | Blog/FAQ/homepage-copy entries get an optional `segment` tag so Content Panel authors can target "Skincare" or "Makeup" audiences; legal pages remain segment-neutral |
| **New — 64A** | Bundle/Kit product type (see §5.4 below, pulled forward here because it interacts with segment tagging: a "Routine Kit" or "Gift Set" spanning both segments needs `is_cross_segment` support) | `products, product_bundle_items` (new) | See §5.4 for full spec |

**Customer's segment preference is remembered** — stored on `customer_profiles` (`preferred_segment`) once they've toggled at least once, so their next session opens on the segment they last viewed; still overridable at any time via the toggle. First-ever session (no preference stored) opens on a neutral "Both" landing view or defaults to Skincare — **product/design decision, flag for design sign-off, doesn't block backend work**.

### 3.3 Customer Web additions (`01-CUSTOMER-WEB-BUILD-PLAN.md`)

| Day | Tasks | Backend dependency |
|---|---|---|
| **6, modified** | Home dashboard shell **+ segment toggle component** in the top header (persistent across all routes, not just Home); toggle state drives every downstream data fetch | Backend Day 16 (modified) |
| **7, modified** | Category & subcategory pages, PLP **with segment-aware filter sets** (skin-type/concern/SPF for Skincare mode, shade/finish/look for Makeup mode) | Backend Day 16, 11 (modified) |
| **9, modified** | Search page **scoped to active segment by default**, with "search all COSKINn" override; SEO landing pages move to `/skincare/*` and `/makeup/*` namespaces | Backend Day 12, 14 (modified) |
| **New — 6B** | Segment-preference persistence (cookie/local storage keyed off logged-in user id, synced to `customer_profiles.preferred_segment` once authenticated) and cross-tab sync | Backend Day 4 (modified) |

### 3.4 Customer App additions (`03-CUSTOMER-APP-BUILD-PLAN.md`)

| Day | Tasks | Backend dependency |
|---|---|---|
| **6, modified** | Home dashboard **+ persistent segmented-control** (native tab-style toggle, not a screen — stays visible across Home/Category/Search) | Backend Day 16 (modified) |
| **7, modified** | Category & subcategory screens, PLP **with segment-aware Filter/Sort screens** | Backend Day 16 (modified) |
| **9, modified** | Search screen scoped to active segment with "search all" override | Backend Day 12 (modified) |
| **New — 6B** | Segment-preference persistence via secure/local storage, synced to `customer_profiles.preferred_segment` | Backend Day 4 (modified) |

### 3.5 Product Management Panel additions (`04-PRODUCT-MANAGEMENT-PANEL-BUILD-PLAN.md`)

| Day | Tasks | Backend dependency |
|---|---|---|
| **3, modified** | Create Product wizard — **`Product Line` becomes a mandatory field** (Skincare / Makeup / Both) right after category selection; product cannot be saved past Draft without it | Backend Day 6 (modified) |
| **2, modified** | Category/Subcategory management — category tree screen gets a **segment column and segment filter**, and a segment picker when creating a category | Backend Day 5 (modified) |
| **12, modified** | Bulk CSV import/export — template gains a `product_line` column; import validation rejects rows missing it, same severity as missing Cosmetics Rules fields | Backend Days 6–7 (modified) |

### 3.6 Admin Panel additions (`14-ADMIN-PANEL-BUILD-PLAN.md`)

| Day | Tasks | Backend dependency |
|---|---|---|
| **6, modified** | Master dashboard shell gains a **segment filter toggle** (All / Skincare / Makeup) that scopes every widget slot beneath it | — |
| **7, modified** | Sales & order dashboard widget — **segment breakdown** (already implied by the "category-wise sales" report requirement in the Project Documentation §31.1; this makes it explicit and consistent with the toggle) | Backend Day 27, 55 |

### 3.7 Marketing/CRM Panel additions (`12-MARKETING-CRM-PANEL-BUILD-PLAN.md`)

| Day | Tasks | Backend dependency |
|---|---|---|
| **2, modified** | Banner management screen — **segment targeting field** (Skincare / Makeup / Both) on every banner, enforced so a Skincare-only banner never renders in Makeup mode | Backend Day 62 (modified) |
| **6, modified** | Campaign creation part 1 — **audience segment field extended** to include product-line targeting alongside existing audience-segment targeting | Backend Day 62 (modified) |

### 3.8 Content Panel additions (`13-CONTENT-PANEL-BUILD-PLAN.md`)

| Day | Tasks | Backend dependency |
|---|---|---|
| **2, modified** | Blog post editor — optional **segment tag** (Skincare / Makeup / Both) so Customer Web/App can filter "Skincare tips" vs "Makeup tips" inside the toggle-scoped experience | Backend Day 63 (modified) |

### 3.9 Testing requirement (append to every affected surface's accessibility/integration-test day)

Add to Customer Web Day 27, Customer App Day 27, Product Management Day 13, Admin Day 17, Marketing Day 19, Content Day 16:

> **Segment-toggle regression pass:** every catalog, search, banner, campaign, and content surface correctly respects the active segment; switching the toggle never leaks the other segment's products/banners; the Cream Blush-style cross-segment SKU correctly appears in both modes; segment preference persists across sessions and devices for a logged-in user.

---

## 4. Gaps Found in the Internal Panel Build Plans

These are functional gaps — things the system will need on day one that no current build-plan day covers — not stylistic suggestions. Each includes exactly where to slot it in.

### 4.1 India DPDP Act 2023 — data-rights requests (missing entirely)

None of the 15 docs mention India's **Digital Personal Data Protection Act, 2023**, even though the Compliance sections cover Cosmetics Rules 2020, GST/HSN, and Consumer Protection (E-Commerce) Rules in detail. A customer's right to access/export/erase their data needs both a customer-facing entry point and an internal fulfillment screen.

| Surface | New day | Task | Backend dependency |
|---|---|---|---|
| Backend | **New — Day 63A** | Data-rights module — `POST /customer/data-request` (export/delete), verification step, fulfillment job, retention-policy exceptions (financial/tax records legally must be retained despite a delete request) | `data_requests` (new table) |
| Customer Web | **New — 25B** | Account Settings → "Download my data" / "Delete my account" request flow, request-status view | Backend Day 63A |
| Customer App | **New — 25B** | Same, native | Backend Day 63A |
| Admin Panel | **New — 15B** | Data-request queue — view pending export/delete requests, mark fulfilled, see retention-exception flags | Backend Day 63A |

### 4.2 Communication consent/preference center (referenced but never built)

The Marketing/CRM compliance note says sends "must respect consent/opt-out flags on the customer record" — but no screen in any plan lets a customer set those flags, and no screen lets Marketing see opt-out rates.

| Surface | New day | Task | Backend dependency |
|---|---|---|---|
| Backend | **New — Day 62A** | Consent module — per-channel (push/email/SMS/WhatsApp) opt-in/out flags on customer record, consent-change audit trail | `customer_consent` (new table) |
| Customer Web / App | **25, modified** | Account Settings screen gains a **Notification Preferences** sub-screen — per-channel toggle | Backend Day 62A |
| Marketing/CRM Panel | **New — 10B** | Opt-out/consent visibility on the push/email/SMS/WhatsApp campaign screens — audience counts reflect only consented customers | Backend Day 62A |

### 4.3 Serviceability / COD-zone management (backend-only today, no internal screen)

The backend has a pincode/COD-serviceability stub (Backend Day 20) and ShadowFox serviceability checks (Day 35), but **no panel lets ops staff view or manage which pincodes are serviceable or COD-eligible** — today it would require a direct DB edit.

| Surface | New day | Task | Backend dependency |
|---|---|---|---|
| Warehouse Panel | **New — 14B** | Serviceability & COD-zone management screen — pincode list upload/CRUD, COD-eligibility flag per zone, ShadowFox sync status | Backend Day 20, 35 |

### 4.4 Bundle / Kit / Gift Set product type (named in scope, never built)

The Project Documentation explicitly lists **combo kits, routine kits, and gift sets** as sellable product types (§2, §3.1 recommended structure), but the Product Management, Inventory, and Order Management plans only model single-SKU products. A kit needs to decrement stock on each component SKU, not a phantom "kit SKU."

| Surface | New day | Task | Backend dependency |
|---|---|---|---|
| Backend | **New — Day 64A** | Bundle/Kit module — `products.product_type` gains `bundle`; `product_bundle_items` (bundle product_id → component product_id + quantity) | `product_bundle_items` (new) |
| Product Management Panel | **New — 4B** | Bundle/Kit builder screen — compose a kit from existing SKUs, kit-level pricing (may differ from sum of parts), kit-level compliance fields (inherits strictest expiry among components) | Backend Day 64A |
| Inventory Panel | **New — 9B** | Bundle stock-availability view — a kit's "available to sell" = min(available/qty-required) across its components; stock-out triggers when any single component runs out | Backend Day 64A |
| Order Management Panel | **New — 8B** | Order line-item display for bundles — expand a kit line item into its component SKUs for pick-list/invoice purposes | Backend Day 64A, cross-panel: Warehouse |

### 4.5 Supplier / vendor master data (referenced inline, never given its own screen)

Warehouse Panel Day 3 says the PO screen captures "supplier details" inline, but there's no reusable Supplier master so the same supplier has to be re-typed on every PO.

| Surface | New day | Task | Backend dependency |
|---|---|---|---|
| Warehouse Panel | **New — 2B** | Supplier management screen — CRUD supplier master (name, GSTIN, contact, address, payment terms), PO screen (Day 3) references this instead of free-text | Backend Day 33 (modified: `suppliers` table added) |

### 4.6 Mobile app version / force-update gate (standard RN launch requirement, absent from both App and Admin plans)

| Surface | New day | Task | Backend dependency |
|---|---|---|---|
| Backend | **New — Day 63B** | App-version config module — `GET /app/version-check` (min supported version, latest version, force-update flag per platform) | `app_versions` (new table) |
| Customer App | **New — 27B** | Version-check on launch, force-update blocking screen if below minimum | Backend Day 63B |
| Admin Panel | **New — 15C** | App version config screen (part of System Settings, Day 15) — set min/latest version per platform, toggle force-update | Backend Day 63B |

### 4.7 Global return/cancellation-window policy (currently only per-product, no store-wide default)

Product Management Day 8 sets return policy **per product**, but there's no store-wide default/override the way wallet-expiry and membership thresholds get one in Admin (Day 13).

| Surface | New day | Task | Backend dependency |
|---|---|---|---|
| Admin Panel | **15, modified** | System settings screen — add **global default return/cancellation window** (days), which per-product settings can override but fall back to when unset | Backend Day 53 (modified) |

### 4.8 Role-based access to internal panels + authentication method (mentioned nowhere as a single spec)

The 15 source docs treat RBAC as "Admin owns `user_roles`" (§2) but never spell out **what a role actually grants access to** or **how a staff member proves who they are**, and no doc states that customer auth and staff auth are two different mechanisms. This needs one explicit spec so every panel's login screen is built the same way.

- **Role → panel-access mapping.** A staff account's role determines which of the 11 internal panels they can open — not just which actions they can take inside one panel. **Super Admin** is the one role that can access **all 11 panels** (Admin, Product Management, Inventory, Order Management, Warehouse, Tax/Finance, HR, Auditor, Customer Support, Marketing/CRM, Content); every other role (Product Manager, Warehouse Staff, Finance, HR, Auditor, Support Agent, Marketing, Content) is scoped to only the panel(s) their role covers, enforced both in the nav shell (panel doesn't even render as an option) and at the API layer (backend rejects the call regardless of what the frontend shows).
- **Staff authentication = 2FA, on top of role gating.** Every internal-panel login (all 11 panels) requires two-factor authentication — password/credential plus a second factor (TOTP authenticator app or OTP to registered email/phone, consistent with the TOTP-based 2FA precedent already used on comparable admin panels) — before the role-based permission check even runs. This applies uniformly, including to Super Admin.
- **Customer authentication = mobile-number OTP.** Customer Web and Customer App use mobile number + OTP (no password) as the sole login method — a deliberately different, lighter mechanism from staff 2FA, since customers are a different trust boundary than internal staff.

| Surface | New day | Task | Backend dependency |
|---|---|---|---|
| Backend | **New — Day 5B** | RBAC module extension — `roles` table gains a `panel_access` set (which of the 11 panel keys a role may open); Super Admin role is seeded with all 11 by default and cannot be edited down to fewer; every panel API route checks `panel_access` in addition to existing action-level permissions | `roles`, `user_roles` (modified: `panel_access`) |
| Backend | **New — Day 5C** | Staff 2FA module — TOTP enrollment + verification endpoints, backup-code issuance, 2FA enforced at login for all 11 internal panels before role check runs | `staff_2fa` (new table) |
| Backend | **4, modified** | Customer auth — confirm/standardize mobile-number + OTP as the only customer login path (no password field anywhere on Customer Web/App) | `otp_requests` (existing/modified) |
| Admin Panel | **6, modified** | Role management screen — role editor shows a **panel-access matrix** (checkbox per panel per role); Super Admin row is locked to all-checked and non-editable | Backend Day 5B |
| Admin Panel | **New — 6C** | Staff 2FA enrollment/reset screen — Admin can view 2FA status per staff account and force a reset if a device is lost | Backend Day 5C |
| All 11 Internal Panels | **1, modified** (each panel's own Day 1 login/shell task) | Panel login screen requires 2FA step after credentials, before the panel shell renders; nav shows only the panels the logged-in role has `panel_access` to | Backend Day 5B, 5C |
| Customer Web / App | **1, modified** (each surface's own signup/login day) | Confirm login flow is mobile number → OTP → session, with no password field, aligning with the auth spec above | Backend Day 4 (modified) |

---

## 5. Backend Build Plan — Consolidated Additions

All items below are additive to `02-BACKEND-BUILD-PLAN.md` — none change an existing day's scope beyond what's marked "modified," and no existing day number is reused for different work.

| Day | Module / Deliverable | Tables touched | Origin |
|---|---|---|---|
| 5, **modified** | + `product_line` on categories | `categories` | §3.2 |
| 6, **modified** | + `product_line`, `is_cross_segment` on products | `products` | §3.2 |
| 11, **modified** | + `segment` query param | — | §3.2 |
| 12, **modified** | + segment scoping | — | §3.2 |
| 14, **modified** | + segment-namespaced SEO URLs | `products` | §3.2 |
| 16, **modified** | + `segment` param on Home aggregation | `categories, products` | §3.2 |
| 20, **modified** | + serviceability/COD-zone CRUD backing the new Warehouse screen | `serviceable_pincodes` (new) | §4.3 |
| 33, **modified** | + `suppliers` table, PO references supplier_id | `suppliers` | §4.5 |
| 62, **modified** | + `target_segment` on banners/campaigns | `banners, campaigns` | §3.2 |
| 63, **modified** | + `segment` tag on content | `blog_posts, faqs` | §3.2 |
| **63A (new)** | Data-rights module (DPDP) | `data_requests` | §4.1 |
| **63B (new)** | App version/force-update config | `app_versions` | §4.6 |
| **62A (new)** | Consent/preference module | `customer_consent` | §4.2 |
| **64A (new)** | Bundle/Kit module | `product_bundle_items` | §4.4 |
| **5B (new)** | RBAC panel-access module — Super Admin = all 11 panels, other roles scoped per panel | `roles`, `user_roles` | §4.8 |
| **5C (new)** | Staff 2FA module | `staff_2fa` | §4.8 |
| 4, **modified** | + confirm mobile-OTP-only customer auth | `otp_requests` | §4.8 |

**Non-functional targets note:** the DPDP data-rights module (63A) must respect the existing audit-logging requirement — every export/delete request and its fulfillment is itself an auditable event, visible to the Auditor Panel the same way price/stock/order/wallet changes already are.

---

## 6. Master Phase-Based Build Order (all surfaces, merged)

This merges `00-PANEL-CONNECTIVITY-MAP.md` §4 with every surface's own day plan, plus every addition from §3 and §4 above, into one execution order. Backend phases gate everything else — nothing on the right goes from mocked to real data until its backend phase ships.

```
BACKEND PHASE 1 — Foundation (Days 1–10, +62A, +63A, +63B schema groundwork)
  → PRODUCT MANAGEMENT PANEL (Days 1–14, + segment field Day 3/2/12)
  → CUSTOMER WEB + CUSTOMER APP, first pass (Days 1–9, + segment toggle Day 6/7/9/6B)
       → ORDER MANAGEMENT PANEL (Days 1–17)
  BACKEND PHASE 2 — Ecommerce Core (Days 11–27, + segment scoping on 11/12/14/16)
  BACKEND PHASE 3 — Operations (Days 28–40, + serviceability Day 20 mod, + suppliers Day 33 mod)
       → INVENTORY PANEL (Days 1–16, + bundle-stock view 9B)
       → WAREHOUSE PANEL (Days 1–17, + supplier mgmt 2B, + serviceability 14B)
       → CUSTOMER SUPPORT PANEL (Days 1–18)
  BACKEND PHASE 4 — Loyalty & Monetary Ecosystem (Days 41–52)
       → (Customer Web/App Days 19–24; Marketing/CRM configuration screens)
  BACKEND PHASE 5 — Internal Panels & Content (Days 53–63, + 62A/63A/63B/64A new modules, + 62/63 segment mods)
       → TAX/FINANCE PANEL (Days 1–18)
       → MARKETING/CRM PANEL (Days 1–20, + segment targeting 2/6, + consent visibility 10B)
       → CONTENT PANEL (Days 1–17, + segment tag Day 2)
       → HR PANEL (Days 1–16)
       → AUDITOR PANEL (Days 1–16) — built last, reads everything above
       → ADMIN PANEL (built in parallel throughout Days 1–5 early;
                       dashboard widgets Days 6–16 trail each source's ship date;
                       + segment filter Day 6, + data-request queue 15B, + app-version 15C,
                       + global return-policy default Day 15 mod)
  PRODUCT-TYPE ADDITION (cuts across Phase 3/5): Bundle/Kit module (Backend 64A)
       → Product Management 4B → Inventory 9B → Order Management 8B
FINAL — Cross-surface segment-toggle regression pass (§3.9) + full staging sign-off, all surfaces
```

---

## 7. Master Definition of Done

The project is launch-ready when **all** of the following hold simultaneously — this is the union of every individual plan's Definition of Done plus the new scope above:

- Every FR-# in PRD §4–6 has a real (non-mocked) screen on both Customer Web and Customer App.
- Every one of the 11 internal panels meets its own Definition of Done as written in its build-plan doc.
- **The Skincare/Makeup toggle works identically on Web and App**: switching it re-scopes home, category, PLP, search, and SEO without ever leaking the other segment's data; a logged-in customer's segment preference persists across devices; the cross-segment SKU (Cream Blush and any future hybrid/bundle product) appears correctly in both modes.
- Role & permission management (Admin) propagates to every panel's RBAC guard with no manual step, **and** HR's exit-process RBAC write is captured in the same audit trail as an Admin-originated change.
- **Panel-level RBAC and authentication are both enforced**: Super Admin can access all 11 internal panels; every other role only sees/can call the panel(s) its `panel_access` grants; every internal-panel login requires 2FA on top of the role check; every customer login on Web and App is mobile-number + OTP only, with no password field anywhere on the customer side.
- Every write from every panel into another module's data goes through that module's own backend endpoint — never a direct table write — and is captured in `audit_logs`.
- The four documentation-consistency fixes in §2 are reflected in the individual build-plan docs (Auditor listed as a recipient on Admin/Order Management/Inventory/Finance/Marketing; Order Management explicitly lists Customer Support as a recipient).
- DPDP data-rights requests (export/delete), consent/preference management, serviceability/COD-zone management, supplier master data, bundle/kit products, and app-version gating are all live per §4, with no mocked figures.
- A backend-level test confirms the Auditor role cannot write to any table outside its own remarks/annotations (existing requirement, restated here because it's the single most safety-critical DoD item in the system).
