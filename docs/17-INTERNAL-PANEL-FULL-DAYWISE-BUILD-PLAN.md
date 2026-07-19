# COSKINn — Internal Panel: Full Day-Wise Build Plan (All-In-One)

Everything needed to build the internal-panel frontend — shared login/RBAC core, Admin, Product Management, Inventory, Order Management, Warehouse, Customer Support, Tax/Finance, Marketing/CRM, Content, HR, Auditor — in **one continuous day sequence**. No other file needs to be opened.

**App:** `apps/internal-panel` (single React + Tailwind app, shared `packages/ui`, React Query, React Hook Form + Zod)
**Total: 200 build days**, sequenced by real dependency order (backend readiness, cross-panel data dependency), not alphabetically.

**Backend status:** already built and shipped (per `02-BACKEND-BUILD-PLAN.md`, Days 1–63 + additions). **Nothing in this plan builds or modifies backend code.** Every day below is frontend-only work — UI, state, routing, forms, and wiring calls into the existing API.

**How to read the table:** *Global Day* is this plan's sequence. *Tasks* is the frontend work item. *Backend dependency* now just names **which already-existing backend module/endpoint this screen wires up to** (i.e. the integration target), not something still to be built — kept so you know exactly which real endpoint each screen should call once you connect it, instead of a mock. Where a task references another panel's "Day N," that N is that panel's own local day count within its section below.

**Sequencing note:** the day order below is still driven by *frontend* dependency (e.g. Admin's approval-gate screen must exist before Product Management's activate-toggle screen can call it meaningfully) — not by backend readiness, since backend is already done. You can build screens against the real API from day one instead of mocking and swapping later.

**Integration:** see the companion section **"Backend Integration Plan"** at the end of this document for exactly how to wire each module's screens to the live backend once its frontend days are complete.

---

## PHASE 0 — Shared Core (Days 1–10)

Built once. Every module below plugs into this instead of rebuilding login/shell/RBAC/API-layer per panel.

| Day | Task | Depends on |
|---|---|---|
| 1 | Repo scaffold: `apps/internal-panel` (Vite + React + Tailwind), link `packages/ui`, React Query + Axios client shell, React Router setup, env config | — |
| 2 | **Login screen** — staff email/username + password form, calls `POST /auth/staff/login` | Backend Day 5B/5C |
| 3 | **2FA step screen** — TOTP code entry + backup-code fallback, gates session issuance for every role including Super Admin, no bypass path | Backend Day 5C |
| 4 | **Role router** — reads `panel_access[]`/`role` from session; `panel_access.length > 1` (Super Admin) → `/admin`; `length === 1` → that panel's root; `length === 0` → "no panel access" state | Backend Day 5B |
| 5 | Shared shell: collapsible sidebar (nav items driven by `panel_access`), topbar (search, notification bell, mail icon, profile menu + logout), content frame, breadcrumb slot, loading/empty/error states | — |
| 6 | `core/rbac`: `<RequirePanel>` route guard, `<RequirePermission>` inline guard, `useAuth()` hook, session refresh + auto-logout | Backend Day 9, 5B |
| 7 | `core/api`: one typed client file per backend domain (auth, product, inventory, order, payment, warehouse, shipping, returns, wallet, bonus, referral, rewards, membership, offers, tax, finance, hr, audit, support, marketing, content, rbac) + React Query hooks on top — every module below imports from here, none writes its own fetch call | Backend Days 1–63 (all) |
| 8 | Shared UI kit on `packages/ui`: `<StatCard>`, `<DataTable>` (sort/filter/paginate/export), `<ChartCard>` (line/bar/donut), `<StatusBadge>`, `<ApprovalGate>` banner, `<AuditNote>` tag | — |
| 9 | 2FA enrollment/reset flow component (reused later by Admin's staff-2FA screen), "forgot password" staff flow | Backend Day 5C |
| 10 | Shared-shell integration test: login → 2FA → correct landing for all 11 roles + Super Admin; nav hides/shows correctly; direct-URL access to unauthorized panel → 403 screen | All above |

**Definition of done:** a test account per role lands exactly where §2 of the master plan says; no panel reachable without `panel_access`; every module from here on imports API calls from `core/api` only.

---

## MODULE 1 — Admin Panel, Early Pass (Days 11–15)
**Repo path:** `apps/internal-panel/src/modules/admin` · **Role:** `admin` (super-admin), mandatory 2FA (already global from Phase 0)
**Why early:** Product Management's Day 9 approval workflow depends on this existing first.
**Connects to:** receives from all 11 panels (dashboards, later pass); writes to `roles/permissions/user_roles/role_permissions`, product approval gate, wallet expiry policy, membership tier thresholds. Never calls another panel directly — backend aggregation APIs only.

| Global Day | Local Day | Task | Backend dependency |
|---|---|---|---|
| 11 | 1 | Register `/admin` route + nav entry (shell/2FA already shared); RBAC guard for `admin` role | Backend Day 9 |
| 12 | 2 | Role & permission management screen — create/edit roles, assign permissions, role-to-user mapping; **only** screen with write access to `roles`/`permissions`/`role_permissions`; role editor shows a **panel-access matrix** (checkbox per panel per role), Super Admin row locked all-checked and non-editable | Backend Day 9, 5B |
| 13 | 2B | Staff 2FA status/reset screen — view 2FA status per staff account, force reset if device lost | Backend Day 5C |
| 14 | 3 | Admin/internal user management screen — create/deactivate internal-panel accounts, assign panel role (product-manager, inventory-staff, order-manager, warehouse-staff, finance, hr, auditor, support, marketing, content), optional read-only link to HR employee record | Backend Day 9, cross-panel: HR Panel |
| 15 | 4–5 | Category & Brand approval screen (approve/reject submissions from Product Mgmt Day 2) + Product Activate/Live approval screen (final compliance-gated approval, Draft → Pending → Live, blocked server-side until Cosmetics Rules 2020 fields present) | Backend Day 5–7, cross-panel: Product Management Panel Day 9 |

---

## MODULE 2 — Product Management Panel (Days 16–29)
**Repo path:** `.../modules/product` · **Role:** `product-manager`
**Connects to:** sends to → Inventory (new SKU → opening-stock), Customer Web/App (published catalog), Marketing/CRM (product feed). Receives from ← Admin (category/brand approval gate).

| Global Day | Local Day | Task | Backend dependency |
|---|---|---|---|
| 16 | 1 | Register `/product` route + nav; RBAC guard for `product-manager` | Backend Day 9 |
| 17 | 2 | Brand, Category, Subcategory management screens (CRUD, nested tree UI) | Backend Day 5 |
| 18 | 3 | Product list (search/filter by category/brand/status) + Create Product wizard: name, slug, SKU, category, subcategory, brand, product type, description, short description, MRP, selling price, discount | Backend Day 6 |
| 19 | 4 | Variant management screen, Shade management screen (name, code, fragrance/flavor) | Backend Day 6 |
| 20 | 5 | Fruit-ingredient, skin-concern, skin-type tagging screens | Backend Day 7 |
| 21 | 6 | Image & video upload screens — S3 presigned upload, gallery reorder/crop, video embed, validation feedback | Backend Day 8 |
| 22 | 7 | Compliance & commerce fields screen: GST rate, HSN code, batch number, mfg/expiry date, manufacturer name/address, country of origin, net quantity, opening-stock entry (triggers Inventory intake) | Backend Day 3 schema + cross-panel: Inventory Panel Day 11 |
| 23 | 8 | Content fields screen: how-to-use, ingredients, warnings, benefits, claims, storage instructions, returnable status, COD availability, return policy | Backend Day 7, 15 |
| 24 | 9 | Activate/Deactivate toggle + status workflow (Draft → Pending Admin Approval → Live), status badges | Cross-panel: Admin Panel approval action |
| 25 | 10 | SEO fields screen — title, description, keywords (feeds SSG pre-render) | Backend Day 14 |
| 26 | 11 | Product feed screen for Marketing/CRM — "which SKUs to feature," filterable by fruit/concern/category | Backend Day 62 (build against mocked consumer until Marketing ships) |
| 27 | 12 | Bulk CSV import/export for launch catalog (12 skincare + 12 makeup SKUs), import validation (mandatory Cosmetics Rules 2020 fields) | Backend Days 6–7 |
| 28 | 13 | Accessibility pass (WCAG 2.1 AA), form validation hardening, RBAC edge-case testing | — |
| 29 | 14 | Integration test against staging backend, bug fixes, staging sign-off | All above |

**Compliance note:** Activate toggle must be blocked server-side, not just client-side, until every mandatory Cosmetics Rules 2020 field is populated.
**DoD:** every PRD §10.2 field exists on the product form; every Activate action is RBAC- and compliance-gated; a newly activated product appears on Customer Web/App and triggers an opening-stock entry in Inventory with no manual step.

---

## MODULE 3 — Inventory Panel (Days 30–45)
**Repo path:** `.../modules/inventory` · **Role:** `inventory-staff`
**Connects to:** sends to → Warehouse, Order Management (reservation confirmation), Admin (low-stock/near-expiry feed), Auditor (stock-change logs). Receives from ← Product Mgmt (new SKU trigger), Warehouse (GRN stock-in), Order Mgmt (stock release on cancel/return).

| Global Day | Local Day | Task | Backend dependency |
|---|---|---|---|
| 30 | 1 | Register `/inventory` route + nav; RBAC guard for `inventory-staff` | Backend Day 9 |
| 31 | 2 | Warehouse & bin selector screens (read-only); stock dashboard shell — per-SKU available/reserved/damaged/expired summary cards | Backend Day 28 |
| 32 | 3 | Opening-stock intake screen — auto-triggered on Product Mgmt Day 7 SKU activation; manual fallback for pre-launch load | Backend Day 28 |
| 33 | 4 | Stock-in screen (manual, non-GRN) + Stock-out screen (damage write-off, internal use, sample stock) with reason-code dropdowns | Backend Day 29 |
| 34 | 5 | Batch-wise stock view — per-SKU/batch quantity, batch number, mfg/expiry date, linked to Product Mgmt compliance fields | Backend Day 29 |
| 35 | 6 | Shade-wise and warehouse-wise stock breakdown views (pivot/filter) | Backend Day 29 |
| 36 | 7 | Stock adjustment screen (correction, mandatory reason + approver note) + Stock transfer screen (warehouse-to-warehouse, bin-to-bin) | Backend Day 30 |
| 37 | 8 | Low-stock alert dashboard (configurable threshold) + Near-expiry alert dashboard (configurable lead-time), scheduled-job backed | Backend Day 31 |
| 38 | 9 | Damaged-stock screen (mark, quantity, reason, photo) + Expired-stock screen (auto-flag + manual override) | Backend Day 32 |
| 39 | 10 | Return-stock handling screen — receives post-Warehouse-QC return events, re-integrates sellable units, quarantines non-sellable | Backend Day 38 |
| 40 | 11 | Barcode scan support — scan-to-lookup SKU/batch, scan-driven stock-in/out (keyboard-wedge + manual fallback) | Backend Day 29 |
| 41 | 12 | Inventory audit screen — point-in-time stock count vs system count, variance report, adjustment-on-reconcile | Backend Day 30 |
| 42 | 13 | Stock reservation visibility screen — read-only view of Order Mgmt reservation/release state | Backend Day 34, cross-panel: Order Management Panel |
| 43 | 14 | Reporting screen — stock movement history, adjustment logs, damaged/expired summary, CSV export (feeds Auditor + Admin) | Backend Day 59 (build against mocked export until then) |
| 44 | 15 | Accessibility pass, form validation hardening, RBAC edge-case testing (read-only vs edit, warehouse-scoped staff) | — |
| 45 | 16 | Integration test against staging backend, bug fixes, staging sign-off | All above |

**Compliance note:** every stock-in/out/adjustment/transfer must be a ledger entry (`stock_movements`), never a direct current-stock mutation; no negative stock write without a reason code; damaged/expired write-offs traceable to a specific batch.
**DoD:** every stock state visible per SKU/batch/shade/warehouse; every mutation is an audited ledger entry; low-stock/near-expiry surfaces on Admin automatically; opening-stock fires with no manual step; reservation/release stays in sync with Order Management.

---

## MODULE 4 — Order Management Panel (Days 46–62)
**Repo path:** `.../modules/orders` · **Role:** `order-manager`
**Connects to:** sends to → Warehouse (pick list), Tax/Finance (invoice/tax data), Customer Support (order lookup), Customer Web/App (status updates). Receives from ← Inventory (stock availability), Warehouse (pack/ship updates), Payments (webhook status), Shipping (tracking events).

| Global Day | Local Day | Task | Backend dependency |
|---|---|---|---|
| 46 | 1 | Register `/orders` route + nav; RBAC guard for `order-manager` | Backend Day 9 |
| 47 | 2 | Order list screen — search/filter by order ID, mobile, email, status, payment mode, date range; paginated table with status badges | Backend Day 27 |
| 48 | 3 | Order Detail screen — items, quantities, pricing breakup, customer info, shipping address, payment status, status history timeline | Backend Day 27, 22 |
| 49 | 4 | Order status update workflow (placed → payment confirmed → processing → packed → shipped → out for delivery → delivered), RBAC-gated manual overrides, mandatory status-change reason log | Backend Day 27 |
| 50 | 5 | Payment status panel — Razorpay transaction reference, signature-verification status, retry/failure display (read-only) | Backend Days 23–24 |
| 51 | 6 | Invoice screen — GST/HSN breakup view, invoice PDF download/reprint | Backend Day 26 |
| 52 | 7 | Shipment tracking screen — ShadowFox AWB, label reprint, live tracking-webhook feed | Backend Day 35 |
| 53 | 8 | Order cancellation screen — cancel with reason, triggers stock-release visible in Inventory; cancellation eligibility rules (pre-ship only, RBAC-gated post-ship override) | Backend Day 36, cross-panel: Inventory Panel |
| 54 | 9 | Return request queue — incoming requests with photo/video proof viewer, linked order/item detail | Backend Day 37 |
| 55 | 10 | Return approval/QC workflow screen — approve/reject, triggers ShadowFox reverse-pickup, syncs to Warehouse QC queue | Backend Day 38, cross-panel: Warehouse Panel |
| 56 | 11 | Refund status screen — refund initiation trigger (Razorpay Refunds API / Wallet credit for COD-default), status tracking per return | Backend Day 39 |
| 57 | 12 | Stock-reservation visibility widget on Order Detail (read-only cross-reference to Inventory) | Backend Day 34, cross-panel: Inventory Panel |
| 58 | 13 | Order Mgmt → Warehouse handoff screen — pick-list trigger confirmation, pack/ship status pulled back (read-only sync) | Backend Day 34, cross-panel: Warehouse Panel |
| 59 | 14 | Customer Support lookup integration screen — order search surfaced for Support ticket linking | Backend Day 60, cross-panel: Customer Support Panel |
| 60 | 15 | Bulk actions — bulk status update, bulk invoice export, CSV export for Finance reconciliation | Backend Day 27, 53 |
| 61 | 16 | Accessibility pass, form validation hardening, RBAC edge-case testing | — |
| 62 | 17 | Integration test against staging backend — full pipeline order → payment → reservation → pack/ship → cancel/return → refund; bug fixes, staging sign-off | Backend Day 40 |

**Compliance note:** every status transition writes through `order_status_history`, never mutated client-side only; no backward status skip without an explicit RBAC-gated, separately-logged correction action.
**DoD:** every lifecycle state visible/actionable with correct RBAC gating; search/filter works across all fields; invoice download works for every completed order; tracking reflects live webhook events with no manual refresh; cancellations/returns trigger stock-release with no manual step.

---

## MODULE 5 — Warehouse Panel (Days 63–79)
**Repo path:** `.../modules/warehouse` · **Role:** `warehouse-staff`
**Connects to:** sends to → Order Management (packed/shipped status), Inventory (stock-in from GRN, damaged/expired flags). Receives from ← Order Management (pick list), Inventory (current stock/bin data).

| Global Day | Local Day | Task | Backend dependency |
|---|---|---|---|
| 63 | 1 | Register `/warehouse` route + nav; RBAC guard for `warehouse-staff` | Backend Day 9 |
| 64 | 2 | Warehouse & bin management screens — create/edit warehouse, bin structure CRUD (source data Inventory reads) | Backend Day 28 |
| 65 | 3 | Purchase Order screen — create/view POs, supplier details, expected quantity/SKU | Backend Day 33 |
| 66 | 4 | GRN creation screen — receive against PO, quantity received vs ordered, discrepancy flagging | Backend Day 33 |
| 67 | 5 | Batch/expiry/packaging QC-on-receipt screen — per-unit checklist, pass/fail with reason, triggers stock-in on pass | Backend Day 33, cross-panel: Inventory Panel |
| 68 | 6 | Bin storage / put-away screen — assign received stock to bins, barcode-scan support | Backend Day 28–29 |
| 69 | 7 | Pick-list screen — incoming pick lists on order confirmation, pick-by-bin sequencing, barcode-scan confirmation | Backend Day 34, cross-panel: Order Management Panel |
| 70 | 8 | Pack screen — pack confirmation, item-count verification, pack-station workflow | Backend Day 34 |
| 71 | 9 | Invoice & shipping-label generation screen — print/reprint at pack stage | Backend Day 26, 35 |
| 72 | 10 | ShadowFox courier handover screen — manifest generation, handover confirmation, AWB reconciliation | Backend Day 35 |
| 73 | 11 | Ship-confirmation screen — marks order shipped, status pushed to Order Management | Backend Day 35, cross-panel: Order Management Panel |
| 74 | 12 | Returned-order QC screen — receive returned units, QC checklist (sellable vs damaged), feeds Inventory's return-stock screen | Backend Day 38, cross-panel: Inventory Panel |
| 75 | 13 | Damaged/expired marking screen — flag stock at any stage, writes to Inventory's damaged/expired views | Backend Day 32, cross-panel: Inventory Panel |
| 76 | 14 | Stock adjustment request screen — request only (not direct mutate); routes to Inventory/RBAC-elevated approval | Backend Day 30, cross-panel: Inventory Panel |
| 77 | 15 | Warehouse dashboard — daily throughput (received/picked/packed/shipped), pending pick-lists, pending GRNs, QC backlog | Backend Days 28–35 |
| 78 | 16 | Accessibility pass, barcode-scanner input hardening (keyboard-wedge + manual fallback), RBAC edge-case testing | — |
| 79 | 17 | Integration test — full pipeline GRN → put-away → pick → pack → ship → return QC; bug fixes, staging sign-off | Backend Day 40 |

**Compliance note:** every stock movement writes through the same ledger `stock_movements` table Inventory writes to — no local caching/independent on-hand recompute; always re-read from backend after mutation.
**DoD:** a unit traces end-to-end PO → GRN → QC → put-away → pick → pack → handover → ship-confirmation with no manual DB step; returned units route correctly through QC; pick-lists appear with no polling delay beyond backend's real-time layer.

---

## MODULE 6 — Customer Support Panel (Days 80–97)
**Repo path:** `.../modules/support` · **Role:** `support`
**Connects to:** sends to → Order Management (status updates from resolved complaints), Returns (return/refund actions). Receives from ← Order Management (order lookup), Returns (return status), Customer Web/App (ticket submissions).

| Global Day | Local Day | Task | Backend dependency |
|---|---|---|---|
| 80 | 1 | Register `/support` route + nav; RBAC guard for `support` | Backend Day 9 |
| 81 | 2 | Ticket list screen — search/filter by ticket ID, customer, status, category, priority, assigned agent, date range | Backend Day 60 |
| 82 | 3 | Ticket detail screen — full conversation thread, customer info, linked order, status/priority controls | Backend Day 60 |
| 83 | 4 | Complaint category configuration/tagging — order, payment, return, refund, damaged, wrong item, expired, allergic reaction (fixed taxonomy), category-based routing | Backend Day 60 |
| 84 | 5 | Order lookup widget on ticket screen — order snapshot (items, status, payment, shipment), read-only | Backend Day 27, cross-panel: Order Management Panel |
| 85 | 6 | Return status widget on ticket screen — linked return/refund status | Backend Day 38–39, cross-panel: Returns module |
| 86 | 7 | Internal notes screen — agent-only notes, not visible to customer, timestamped/attributed | Backend Day 60 |
| 87 | 8 | Escalation workflow — escalate to senior agent/manager, escalation reason, SLA-clock behavior on escalation | Backend Day 61 |
| 88 | 9 | Live chat screen part 1 — WebSocket connection, agent-side chat UI, active-conversation queue | Backend Day 61 |
| 89 | 10 | Live chat screen part 2 — chat-to-ticket conversion, transcript attachment, canned-response snippets | Backend Day 61 |
| 90 | 11 | Email integration screen — inbound/outbound email threading tied to a ticket | Backend Day 61 |
| 91 | 12 | WhatsApp integration screen — inbound/outbound message log tied to a ticket | Backend Day 61 |
| 92 | 13 | Call log screen — manual call-log entry (outcome, duration, notes) tied to a ticket | Backend Day 61 |
| 93 | 14 | SLA tracking dashboard — first-response/resolution timers per ticket, breach flagging, team-level compliance view | Backend Day 61 |
| 94 | 15 | Action-back-to-order screen — agent-initiated status update pushed to Order Management + return/refund actions on customer's behalf, both RBAC-gated | Backend Day 27, 38–39, cross-panel: Order Management, Returns |
| 95 | 16 | Agent performance/workload dashboard — tickets resolved, avg handle time, SLA compliance per agent | Backend Day 61 |
| 96 | 17 | Accessibility pass, live-chat reconnect/offline handling, RBAC edge-case testing (agent vs supervisor/escalation roles) | — |
| 97 | 18 | Integration test against staging backend, bug fixes, staging sign-off | All above |

**Compliance note:** any order/return state change from this panel must go through Order Management/Returns' own backend endpoints, never a direct table write — Order Management's status-history stays the single source of truth even when the change originates from a ticket.
**DoD:** every complaint category is supported end-to-end; live chat works with reconnect handling and converts cleanly to a ticket; SLA timers accurate/breach-flagged; email/WhatsApp/call-log attach correctly; any order/return action is reflected in Order Management with full audit attribution back to the ticket.

---

## MODULE 7 — Tax / Finance Panel (Days 98–115)
**Repo path:** `.../modules/finance` · **Role:** `finance`, mandatory 2FA (already global)
**Connects to:** sends to → Admin (P&L, GST dashboards), Auditor (tax/payment reports). Receives from ← Order Management (order/invoice data), Payments (settlements), Returns (refund data), Wallet/Rewards (liability ledgers).

| Global Day | Local Day | Task | Backend dependency |
|---|---|---|---|
| 98 | 1 | Register `/finance` route + nav; RBAC guard for `finance` (2FA already global) | Backend Day 9 |
| 99 | 2 | HSN code management screen — CRUD for HSN codes and tax rates | Backend Day 53 |
| 100 | 3 | Tax calculation configuration screen — CGST/SGST/IGST rule setup, rate mapping per HSN/category | Backend Day 53 |
| 101 | 4 | GST tax invoice viewer — read/search invoices from Order Management, GST breakup, bulk download | Backend Day 54, cross-panel: Order Management Panel |
| 102 | 5 | Credit note creation/management screen — issue against returns/refunds/price corrections | Backend Day 54 |
| 103 | 6 | Debit note creation/management screen — issue against supplier adjustments/corrections | Backend Day 54 |
| 104 | 7 | Sales report screen — filterable by date range/category/SKU/payment mode, exportable | Backend Day 55 |
| 105 | 8 | GST report screen — period-wise liability, CGST/SGST/IGST breakup, filing-ready export | Backend Day 55 |
| 106 | 9 | Product-wise and state-wise sales/tax report screens | Backend Day 55 |
| 107 | 10 | General ledger and journal entries viewer | Backend Day 55 |
| 108 | 11 | Razorpay settlement reconciliation screen — batch view, matched vs unmatched, discrepancy flagging | Backend Day 56, cross-panel: Payments module |
| 109 | 12 | COD collection reconciliation screen — collected vs remitted, ShadowFox COD remittance matching | Backend Day 56, cross-panel: Order Mgmt/Shipping |
| 110 | 13 | Wallet & reward-points liability ledger screen — outstanding balance as financial liability, expiry-adjusted | Backend Day 56, cross-panel: Wallet/Rewards modules |
| 111 | 14 | P&L report screen — revenue, COGS (Inventory/GRN cost data), tax, refunds, loyalty liability rolled into period P&L | Backend Day 55–56, cross-panel: Inventory Panel |
| 112 | 15 | Refund reconciliation screen — initiated vs completed, Razorpay refund status cross-reference | Backend Day 39, 56 |
| 113 | 16 | Export & audit-trail hooks — CSV/PDF export on every report, all exports logged (feeds Auditor) | Backend Day 59 (mocked until it ships) |
| 114 | 17 | Accessibility pass, 2FA edge-case testing, RBAC edge-case testing (finance vs read-only auditor) | — |
| 115 | 18 | Integration test against staging backend, bug fixes, staging sign-off | All above |

**Compliance note:** every report screen is read/aggregate-only against source-of-truth tables owned by other modules; credit/debit notes and reconciliation flags are the only new financial records this panel may create.
**DoD:** every report in PRD/Build Form §6.6 is live against real data with no mocked figures; 2FA enforced on every login; every export captured in the audit log visible to Auditor.

---

## MODULE 8 — Marketing / CRM Panel (Days 116–135)
**Repo path:** `.../modules/marketing` · **Role:** `marketing`
**Connects to:** sends to → Customer Web/App (banners, offers, campaigns), Product Mgmt (SKUs to feature). Receives from ← Product Mgmt (catalog feed), Order Mgmt (abandoned cart), Membership module (tier-targeted campaigns).

| Global Day | Local Day | Task | Backend dependency |
|---|---|---|---|
| 116 | 1 | Register `/marketing` route + nav; RBAC guard for `marketing` | Backend Day 9 |
| 117 | 2 | Banner management screen — create/edit/schedule homepage & category banners, image upload, active-date-range | Backend Day 62 |
| 118 | 3 | Homepage section management screen — reorder/toggle hero, category rail, fruit-concern rail, featured-products sections | Backend Day 62, 16 |
| 119 | 4 | Coupon creation screen — code/rules (percent/flat, min-order, category/product scope, usage limits, validity window) | Backend Day 21, 62 |
| 120 | 5 | Product feed / "SKUs to feature" screen — consumes Product Mgmt's feed, filterable by fruit/concern/category | Backend Day 62, cross-panel: Product Management Panel |
| 121 | 6 | Campaign creation screen part 1 — name, goal, audience segment, date range | Backend Day 62 |
| 122 | 7 | Campaign creation screen part 2 — link to coupon/offer/bonus rules, performance dashboard (reach, redemptions, revenue) | Backend Day 62, 45, 52 |
| 123 | 8 | Push notification screen — compose/schedule/send, audience targeting, FCM delivery status | Backend Day 62, 25 |
| 124 | 9 | Email campaign screen — compose/schedule/send, templates, open/click tracking | Backend Day 62 |
| 125 | 10 | SMS campaign screen and WhatsApp campaign screen — compose/schedule/send, delivery status | Backend Day 62 |
| 126 | 11 | Abandoned-cart recovery screen — view carts from Order Management, trigger recovery sequence, recovery-rate dashboard | Backend Day 62, cross-panel: Order Management Panel |
| 127 | 12 | Referral program configuration screen — payout rules, welcome-discount config, fraud-check settings | Backend Days 46–47 |
| 128 | 13 | Bonus & Reward Points campaign configuration screen — birthday multiplier, campaign multiplier events, sale-window lockout | Backend Days 45, 49 |
| 129 | 14 | Offers engine configuration screen — scope by category/product/payment-method/tier, homepage offers, best-offer auto-apply | Backend Day 52 |
| 130 | 15 | Membership-tier-targeted campaign screen — segment campaigns by tier | Backend Days 50–51, cross-panel: Membership module |
| 131 | 16 | Influencer tracking screen — profile, tracking code/link, order attribution, payout summary | Backend Day 62 |
| 132 | 17 | Affiliate tracking screen — profile, tracking link/code, commission-rule config, payout summary | Backend Day 62 |
| 133 | 18 | Marketing performance dashboard — campaign/channel rollup, coupon usage report | Backend Day 62, 55 |
| 134 | 19 | Accessibility pass, send-throttling/rate-limit safeguards, RBAC edge-case testing | — |
| 135 | 20 | Integration test — banner/campaign/coupon → live on Customer Web/App → redemption tracked back; bug fixes, staging sign-off | All above |

**Compliance note:** every loyalty-affecting config (bonus multipliers, reward-points rates/caps, referral payout, offer stacking) must go through the Wallet/Bonus/Referral/Rewards/Offers backend modules — never a direct write to `wallet_ledger`/`reward_points_ledger`/`referrals`. Sends must respect consent/opt-out flags.
**DoD:** every PRD §20.1 feature is live against real data; banners/offers/campaigns appear on Customer Web/App with no manual step; no screen writes directly to a loyalty ledger table.

---

## MODULE 9 — Content Panel (Days 136–152)
**Repo path:** `.../modules/content` · **Role:** `content`
**Connects to:** sends to → Customer Web/App (blog, tips, ingredient pages). Receives from ← Product Mgmt (ingredient/fruit data for tagging).

| Global Day | Local Day | Task | Backend dependency |
|---|---|---|---|
| 136 | 1 | Register `/content` route + nav; RBAC guard for `content` | Backend Day 9 |
| 137 | 2 | Blog post editor screen — rich-text/WYSIWYG, cover image, category/tag, draft/publish workflow | Backend Day 63 |
| 138 | 3 | Beauty tips screen — short-form tip authoring, homepage/app tip-of-the-day slotting | Backend Day 63 |
| 139 | 4 | Skin-routine articles screen — structured multi-step routine content, linkable to Routine Builder | Backend Day 63, cross-panel: Backend Day 21 |
| 140 | 5 | Ingredient education / library screen — per-ingredient entries, pulls fruit-ingredient taxonomy from Product Mgmt | Backend Day 63, cross-panel: Product Management Panel |
| 141 | 6 | Fruit benefit pages screen — long-form page per launch fruit, cross-linked to tagged products | Backend Day 63, 14, cross-panel: Product Management Panel |
| 142 | 7 | Product usage guide screen — how-to-use long-form content per product/category | Backend Day 63, cross-panel: Product Management Panel |
| 143 | 8 | Video tutorial upload screen — S3-backed upload, thumbnail, linked product/routine tags | Backend Day 63, 8 |
| 144 | 9 | SEO content screen — meta title/description/keywords, feeds SSG pre-render | Backend Day 63, 14 |
| 145 | 10 | FAQ management screen — category-grouped CRUD, ordering, homepage/product-page slotting | Backend Day 63 |
| 146 | 11 | Homepage content screen — editorial copy blocks (not banners), seasonal messaging, hero copy | Backend Day 63, cross-panel: Marketing/CRM Panel |
| 147 | 12 | Product description writing screen — long-form editorial descriptions, feeds back to product record for review, never bypasses Product Mgmt's approval gate | Backend Day 63, cross-panel: Product Management Panel |
| 148 | 13 | Routine builder content screen — copy/recommendation-text layer alongside algorithmic output | Backend Day 63, 21 |
| 149 | 14 | Legal-pages CMS screen — T&C, privacy, shipping, return/refund, cancellation, payment, cookie policy, disclaimers, grievance-officer page, versioned with publish history | Backend Day 63 |
| 150 | 15 | Content calendar / publish-scheduling screen — schedule future publish dates, draft/review/published workflow | Backend Day 63 |
| 151 | 16 | Accessibility pass, image/video alt-text enforcement, RBAC edge-case testing (content vs read-only reviewer) | — |
| 152 | 17 | Integration test — publish flow verified live on Customer Web/App, ingredient/fruit cross-linking verified; bug fixes, staging sign-off | All above |

**Compliance note:** legal-page edits must be versioned with publish history, never overwritten in place; product description writing must never set a product's Live/Draft/Pending status directly.
**DoD:** every PRD §21.1 feature is live against real data; every legal page in PRD §29 exists and is versioned; content appears correctly on Customer Web/App with correct SEO pre-render.

---

## MODULE 10 — HR Panel (Days 153–168)
**Repo path:** `.../modules/hr` · **Role:** `hr`
**Connects to:** sends to → Admin (headcount, payroll cost). Receives from ← none.

| Global Day | Local Day | Task | Backend dependency |
|---|---|---|---|
| 153 | 1 | Register `/hr` route + nav; RBAC guard for `hr` | Backend Day 9 |
| 154 | 2 | Department management screen — CRUD for departments, org structure | Backend Day 57 |
| 155 | 3 | Employee management screen — add/edit, profile fields, department/role assignment, employment status | Backend Day 57 |
| 156 | 4 | Role assignment screen — link employee records to system RBAC roles | Backend Day 9, 57 |
| 157 | 5 | Attendance screen — daily marking/view, calendar view, manual correction with reason log | Backend Day 57 |
| 158 | 6 | Leave management screen — application, approval workflow, balance tracking, leave-type config | Backend Day 57 |
| 159 | 7 | Employee documents screen — upload/store ID proof, contracts, certifications (S3) | Backend Day 58 |
| 160 | 8 | Payroll screen part 1 — salary structure per employee (basic, allowances, deductions) | Backend Day 58 |
| 161 | 9 | Payroll screen part 2 — monthly payroll run, salary slip generation/download (PDF) | Backend Day 58 |
| 162 | 10 | Performance review screen — review cycles, manager/self ratings, history | Backend Day 58 |
| 163 | 11 | Recruitment screen — job requisitions, candidate pipeline (applied/interview/offer/hired/rejected) | Backend Day 58 |
| 164 | 12 | Offer letter screen — template-based generation, e-sign/acknowledgement tracking | Backend Day 58 |
| 165 | 13 | Exit process screen — resignation/termination workflow, exit checklist, full-and-final settlement, RBAC access sync on exit | Backend Day 58, 9 |
| 166 | 14 | HR dashboard for Admin feed — headcount, payroll cost, attendance/leave summary widgets | Backend Day 57–58, cross-panel: Admin Panel |
| 167 | 15 | Accessibility pass, form validation hardening, RBAC edge-case testing | — |
| 168 | 16 | Integration test against staging backend, bug fixes, staging sign-off | All above |

**Compliance note:** the exit-process workflow must revoke RBAC access in the same transaction as marking an employee exited, and this must be captured in the same audit trail as an Admin-originated RBAC change.
**DoD:** every function in Build Form §6.7 works end-to-end; Admin's headcount/payroll widgets populate with no manual step; access is auto-revoked the moment exit is finalized.

---

## MODULE 11 — Admin Panel, Dashboard Pass (Days 169–181)

Continues Module 1 — now that every source panel has real data.

| Global Day | Local Day | Task | Backend dependency |
|---|---|---|---|
| 169 | 6 | Master dashboard shell — aggregation-widget scaffold, per-module widget slots, empty/loading states for unshipped sources | — |
| 170 | 7 | Sales & order dashboard widget — order volume, revenue, status-mix rollup | Backend Day 27, cross-panel: Order Management Panel |
| 171 | 8 | Inventory dashboard widget — low-stock and near-expiry alert feed | Backend Day 31, cross-panel: Inventory Panel |
| 172 | 9 | Finance dashboard widget — P&L summary, GST liability summary | Backend Day 55–56, cross-panel: Tax/Finance Panel |
| 173 | 10 | Marketing dashboard widget — campaign/channel performance rollup, coupon usage summary | Backend Day 62, cross-panel: Marketing/CRM Panel |
| 174 | 11 | HR dashboard widget — headcount, payroll cost, attendance/leave summary | Backend Day 57–58, cross-panel: HR Panel |
| 175 | 12 | Support dashboard widget — open-ticket volume, SLA compliance snapshot | Backend Day 61, cross-panel: Customer Support Panel |
| 176 | 13 | Wallet & Membership policy configuration screen — wallet expiry policy, membership tier thresholds; writable only from this panel | Backend Day 43, 50 |
| 177 | 14 | Global cross-panel search screen — single search box (order ID, customer, product, ticket ID) → deep-links into owning panel | Backend Day 27, 60, 6 |
| 178 | 15 | System settings screen — feature flags, maintenance-mode toggle, COD-availability default, default tax-config pointer | Backend Day 53 |
| 179 | 16 | Internal announcement/broadcast screen — announcement banner visible internal-panel-wide | Backend Day 62 |
| 180 | 17 | Accessibility pass, 2FA edge-case testing, RBAC edge-case testing (super-admin vs scoped panel-admin, confirm no self-elevation) | — |
| 181 | 18 | Integration test against staging backend — category/brand and product-approval flows end-to-end; every widget verified against real data; role-management writes verified to propagate with no manual step; bug fixes, staging sign-off | All above |

**Compliance note:** every write this panel makes into another module's data must go through that module's own backend endpoint, never a direct table write, and must be captured in `audit_logs`. Dashboard widgets are read/aggregate-only — never editable forms for another module's data.
**DoD:** role/permission management propagates to every panel's RBAC guard; approval gates enforced server-side; every widget reflects live data by its source's ship date; wallet-expiry/membership-tier config writable only here; admin-activity audit trail is complete.

---

## MODULE 12 — Auditor Panel (Days 182–197, read-only)
**Repo path:** `.../modules/audit` · **Role:** `auditor`
**Connects to:** sends to → none (exports only). Receives from ← Admin, Order Management, Inventory, Finance, Marketing (reads their logs, never writes). Built last — nothing to show until those five have real data.

| Global Day | Local Day | Task | Backend dependency |
|---|---|---|---|
| 182 | 1 | Register `/audit` route + nav; RBAC guard for `auditor` — enforce **read-only at the query layer**, not just UI | Backend Day 9 |
| 183 | 2 | Admin activity log screen — who changed what RBAC/role/settings, filterable by admin user and date | Backend Day 59, cross-panel: Admin Panel |
| 184 | 3 | Price-change log screen — product price/discount history, before/after, changed-by, timestamp | Backend Day 59, cross-panel: Product Management Panel |
| 185 | 4 | Stock-adjustment log screen — every manual adjustment/transfer/damage/expiry write-off, before/after qty, reason code | Backend Day 59, cross-panel: Inventory Panel, Warehouse Panel |
| 186 | 5 | Order-modification log screen — every manual status override, cancellation, correction outside normal lifecycle | Backend Day 59, cross-panel: Order Management Panel |
| 187 | 6 | Login/session activity log screen — login attempts, OTP failures, device/IP changes, 2FA events for Admin/Finance logins | Backend Day 59, 10 |
| 188 | 7 | Coupon/wallet/reward usage log screen — redemptions, ledger entries, earn/redeem events, anomaly flagging | Backend Day 59, cross-panel: Marketing/CRM Panel, Wallet/Rewards |
| 189 | 8 | Sales report screen (read-only mirror of Finance's, scoped to auditor role) | Backend Day 55, cross-panel: Tax/Finance Panel |
| 190 | 9 | Tax report screen (read-only mirror of Finance's GST report) | Backend Day 55, cross-panel: Tax/Finance Panel |
| 191 | 10 | Refund report screen — initiation-to-completion trail across Razorpay and Wallet-default COD refunds | Backend Day 39, 56 |
| 192 | 11 | Inventory report screen — stock-movement history, damaged/expired write-off summary | Backend Day 59, cross-panel: Inventory Panel |
| 193 | 12 | Payment report screen — transaction log, signature-verification failures, webhook event log | Backend Day 24, 59 |
| 194 | 13 | Export & remarks feature — CSV/PDF export on every screen, auditor remarks (additive notes, never edits) | Backend Day 59 |
| 195 | 14 | Cross-log correlation view — single search (order ID, SKU, user ID) surfacing every related log across price/stock/order/payment/wallet | Backend Day 59 |
| 196 | 15 | Accessibility pass, read-only enforcement testing (confirm no write path reachable at any layer), RBAC edge-case testing | — |
| 197 | 16 | Integration test against staging backend, bug fixes, staging sign-off | All above |

**Compliance note:** the "no edit rights" rule must be verified at the database/query layer — Day 196 needs a specific test that attempts a write from an authenticated auditor session and confirms the backend rejects it. Remarks are the sole exception (new annotation records, never mutations).
**DoD:** every log category is visible with correct filtering and export; every report mirrors its source with no discrepancy; remarks attach without altering underlying records; a backend-level test confirms this role cannot write outside its own remarks.

---

## FINAL — Cross-Module Integration (Days 198–200)

| Global Day | Task |
|---|---|
| 198 | Full RBAC matrix regression — all 11 roles + Super Admin land correctly, nav correctly scoped, direct-URL access to unauthorized panels bounces to 403, panel-access matrix edits in Admin propagate live |
| 199 | 2FA edge cases end-to-end (lost device, backup code, forced reset) across every role; cross-panel data-flow verification for every "Sends to / Receives from" pair across all 11 panels against live (non-mocked) backend |
| 200 | WCAG 2.1 AA cross-module spot-check, final bug bash, staging sign-off for the entire `apps/internal-panel` app |

---

## Master Definition of Done

- One deployable app serves all 11 panels + Super Admin; no separate build/deploy per panel.
- Login → 2FA → role-based landing works for all 11 roles + Super Admin per the access matrix in Phase 0/Module 1.
- `core/api` contains a typed client function for every endpoint in `02-BACKEND-BUILD-PLAN.md`; zero module defines its own HTTP call.
- Every module (2–12) meets its own Definition of Done as listed in its section above.
- Admin's role/permission screen writes `panel_access` per role and it takes effect with no manual step, including the locked Super Admin row.
- Auditor's read-only enforcement is verified at the query layer, not just hidden UI.
- Visual language (sidebar, stat cards, charts, tables, quick actions) is consistent across all modules via shared `core/ui` primitives.
- WCAG 2.1 AA passes on every module's forms; the Day 198–200 cross-module regression is signed off on staging.

---

## Backend Integration Plan (Days 201–212)

Everything above builds the frontend. This section is what happens once a module's screens exist and you're ready to connect them to the **already-built** backend — no backend work, only wiring the frontend to it.

### How integration is structured

Because `core/api/` (Phase 0, Day 7) is the single place every module calls through, integration is not "go into 11 modules and rewire each one" — it's **one client file per backend domain**, pointed at the real base URL, exercised module by module. The work below is sequenced so each domain gets wired, then immediately verified against the screens that depend on it.

| Day | Task |
|---|---|
| 201 | **Environment setup** — `.env` files for local/staging/prod API base URLs; Axios/React Query client in `core/api` reads `VITE_API_BASE_URL`; confirm CORS is open from the internal-panel origin on the backend (config-only check, no backend code change); set up request/response interceptors for auth headers and error normalization |
| 202 | **Auth + 2FA integration** — point `core/api/auth.ts` at the real `/auth/staff/login`, TOTP verify, refresh-token, and `/auth/me` endpoints; confirm the Phase 0 login → 2FA → role-router flow (Days 2–4) works against a real staff account for every one of the 11 roles + Super Admin, using each role's real `panel_access` payload from the backend, not a hardcoded fixture |
| 203 | **RBAC/session wiring** — confirm `useAuth()` and `<RequirePanel>`/`<RequirePermission>` guards read the real `role`/`permissions`/`panel_access` claims returned by the backend session, not local mocks; verify token refresh and auto-logout against real token expiry |
| 204 | **Admin domain wiring** — point `core/api/rbac.ts` and the Admin-specific endpoints at real routes; verify role/permission writes (Module 1, Day 12), category/brand and product-Live approval actions (Day 15) actually persist and are readable by other modules immediately after |
| 205 | **Product domain wiring** — `core/api/product.ts` against real brand/category/product/variant/media/compliance/SEO endpoints; run the Product module's own screens end-to-end against real data (create → tag → upload media → compliance fields → submit for approval) |
| 206 | **Inventory domain wiring** — `core/api/inventory.ts` against real stock/batch/adjustment/alert endpoints; confirm opening-stock intake actually fires when a real product goes Live in Module 2, no manual step |
| 207 | **Order + Payment + Shipping + Returns domain wiring** — `core/api/order.ts`, `payment.ts`, `shipping.ts`, `returns.ts` against real endpoints; verify the full order lifecycle screens (Module 4) reflect real webhook-driven status changes, not polling against a mock |
| 208 | **Warehouse domain wiring** — `core/api/warehouse.ts` against real PO/GRN/pick/pack/ship endpoints; verify pick-lists generated by a real order confirmation actually appear in the Warehouse module with no manual trigger |
| 209 | **Support domain wiring** — `core/api/support.ts` plus the real WebSocket endpoint for live chat; verify ticket creation, order-lookup widget, and escalation against real data |
| 210 | **Finance + Tax domain wiring** — `core/api/finance.ts`/`tax.ts` against real HSN/invoice/report/reconciliation endpoints; confirm 2FA-gated login still enforces correctly once pointed at the real auth flow |
| 211 | **Marketing + Content + HR domain wiring** — `core/api/marketing.ts`, `content.ts`, `hr.ts` against real endpoints; verify banners/campaigns/content published here actually appear on Customer Web/App (cross-surface check, not just internal-panel-side) |
| 212 | **Audit domain wiring + full read-only re-verification** — `core/api/audit.ts` against real log endpoints; re-run the read-only enforcement test (Module 12, Day 196) now against the real backend RBAC layer, confirming a write attempt from an authenticated auditor session is rejected by the actual API, not just absent from the UI |

### Per-module integration checklist (apply at each day above)

1. **Swap the base URL** — nothing else should need to change if `core/api` was built correctly in Phase 0; if a screen needed a code change to work against the real API, that's a signal the mock shape didn't match the real contract — fix the client function, not the screen.
2. **Verify the contract** — compare the real response shape against what the module's React Query hooks expect (field names, pagination shape, error format); adjust only inside `core/api/<domain>.ts`.
3. **Re-run that module's own accessibility/RBAC/integration-test day** (already scheduled at the end of every module section above) — these days are exactly where real-backend verification belongs; nothing new needs to be invented.
4. **Cross-panel checks** — for any screen marked "cross-panel" in this plan, confirm the data now flows from the real producing panel, not a fixture (e.g. Inventory's low-stock feed actually reflects a real Admin dashboard widget, Order Management's pick-list actually reaches a real Warehouse queue).
5. **Error/loading states** — confirm the shared `<DataTable>`/`<StatCard>`/`<ChartCard>` empty/loading/error states (Phase 0, Day 5 & 8) render correctly for real network latency and real error responses (401/403/422/500), not just the happy path a mock always returns.

### Go-live checklist (after Day 212)

- Every `core/api/*.ts` file points at the production backend base URL, no dev/mock URLs left in any module.
- Every one of the 11 roles + Super Admin has logged in against production auth at least once as part of sign-off.
- Auditor's read-only enforcement has been confirmed against production RBAC, not staging.
- 2FA is confirmed working end-to-end (enrollment, login challenge, backup code, reset) against production for Admin and Finance logins specifically, since those are the two mandatory-2FA modules.
- Full cross-panel regression (Days 198–200 in the frontend plan) is re-run one final time against production data before staff accounts go live.
