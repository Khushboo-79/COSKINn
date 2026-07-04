# COSKINn — Order Management Panel Build Plan (React + Tailwind)

**Repo path:** `apps/internal-panel/src/modules/orders`
**Stack:** React + Tailwind CSS · shared `packages/ui` component library · React Query · React Hook Form + Zod · shared route shell (login, nav, layout) inside `apps/internal-panel`
**Depends on backend:** `auth/RBAC` (`02-BACKEND-BUILD-PLAN.md` Day 9), `order` module (Days 22, 27), `payment` module (Days 23–24), `shipping` module (Day 35), `returns`/`refunds` modules (Days 37–39), `inventory` module (Days 29, 34) for stock-reservation visibility, `finance` module (Day 53) for invoice/tax data
**Connects to panels** (per `00-PANEL-CONNECTIVITY-MAP.md` §2):
- **Sends to →** Warehouse Panel (pick list on order confirmation), Tax/Finance Panel (invoice/tax data), Customer Support Panel (order lookup for tickets), Customer Web/App (order status updates)
- **Receives from ←** Inventory Panel (stock availability at order time), Warehouse Panel (pack/ship status updates), Payments module (payment status via backend webhook), Shipping module (ShadowFox tracking events via backend)

All of the above happens only through backend APIs — this panel never calls Inventory, Warehouse, or Customer Support directly.

Per the build-order dependency chain (`00-PANEL-CONNECTIVITY-MAP.md` §4), this panel builds after Product Management, Inventory, and the customer-facing apps' checkout flow are underway — it needs Backend Phase 2 (orders/payments, Days 22–27) and reads live order data that Customer Web/App checkout produces.

| Day | Tasks | Backend dependency |
|---|---|---|
| 1 | Scaffold routed module at `apps/internal-panel/src/modules/orders`; RBAC guard for `order-manager` role; wire into shared internal-panel shell (login/nav/layout) | Backend Day 9 (RBAC) |
| 2 | Order list screen — search/filter by order ID, mobile, email, status, payment mode, date range; paginated table with status badges | Backend Day 27 |
| 3 | Order Detail screen — items, quantities, pricing breakup, customer info, shipping address, payment status, status history timeline | Backend Day 27, 22 |
| 4 | Order status update workflow — placed → payment confirmed → processing → packed → shipped → out for delivery → delivered, with RBAC-gated manual overrides and mandatory status-change reason log | Backend Day 27 |
| 5 | Payment status panel — Razorpay transaction reference, signature-verification status, retry/failure reason display (read-only; payment mutations happen via backend webhook, never from this UI) | Backend Days 23–24 |
| 6 | Invoice screen — GST/HSN breakup view, invoice PDF download/reprint | Backend Day 26 |
| 7 | Shipment tracking screen — ShadowFox AWB, label reprint, live tracking-webhook status feed, "out for delivery"/"delivered" event display | Backend Day 35 |
| 8 | Order cancellation screen — cancel action with reason, triggers stock-release event visible in Inventory Panel; cancellation eligibility rules (pre-ship only, RBAC-gated post-ship override) | Backend Day 36, cross-panel: Inventory Panel |
| 9 | Return request queue — incoming return requests with photo/video proof viewer, linked order/item detail | Backend Day 37 |
| 10 | Return approval/QC workflow screen — approve/reject, triggers ShadowFox reverse-pickup, status sync back to Warehouse QC queue | Backend Day 38, cross-panel: Warehouse Panel |
| 11 | Refund status screen — refund initiation trigger (Razorpay Refunds API for prepaid, Wallet credit for COD-default), refund status tracking per return | Backend Day 39 |
| 12 | Stock-reservation visibility widget on Order Detail — shows Inventory Panel's reservation/release state for the order's line items (read-only cross-reference) | Backend Day 34, cross-panel: Inventory Panel |
| 13 | Order Management → Warehouse handoff screen — pick-list trigger confirmation, pack/ship status pulled back from Warehouse Panel actions (read-only sync view) | Backend Day 34, cross-panel: Warehouse Panel |
| 14 | Customer Support lookup integration screen — order search surfaced for Support Panel ticket linking (read-only order snapshot consumed by Support Panel via backend, not called directly) | Backend Day 60, cross-panel: Customer Support Panel |
| 15 | Bulk actions — bulk status update, bulk invoice export, CSV export of filtered order list for Finance reconciliation | Backend Day 27, 53 |
| 16 | Accessibility pass (WCAG 2.1 AA on internal-panel forms), form validation hardening, RBAC edge-case testing (order-manager vs read-only support-linked roles) | — |
| 17 | Integration test against staging backend — full pipeline order → payment → inventory reservation → warehouse pack/ship → cancellation/return → refund; bug fixes, staging sign-off | Backend Day 40 (hardening pass) |

**Compliance/data-integrity note:** every status transition must be written through the backend (`order_status_history` table) and never mutated client-side only; the panel must never allow a status to skip backward (e.g. "delivered" → "processing") without an explicit RBAC-gated correction action that's logged separately from normal lifecycle progression, per the audit-logging requirement in `02-BACKEND-BUILD-PLAN.md`'s non-functional targets.

**Definition of done:** every order lifecycle state (placed → payment confirmed → processing → packed → shipped → out for delivery → delivered / cancelled → return → refund) is visible and actionable from this panel with correct RBAC gating, search/filter works across ID/mobile/email/status/payment-mode/date, invoice download works for every completed order, ShadowFox tracking status reflects live webhook events with no manual refresh needed, and cancellations/returns correctly trigger stock-release visible in the Inventory Panel with no manual database step.
