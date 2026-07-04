# COSKINn — Panel Connectivity Map

This is the master map of how every surface in the system talks to every other surface. Every individual panel build plan (`0X-<PANEL>-BUILD-PLAN.md`) links back to this file instead of repeating it, so it stays in sync as scope changes.

All connections happen **only through the backend** (`backend/src/modules/*`) — no panel ever calls another panel directly.

## 1. Surfaces in the system

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
| 12 | Marketing/CRM Panel | `apps/internal-panel/src/modules/marketing` | React + Tailwind |
| 13 | Content Panel | `apps/internal-panel/src/modules/content` | React + Tailwind |
| — | Backend | `backend/src/modules/*` | NestJS + PostgreSQL |

All panels 3–13 live inside the **one** `apps/internal-panel` app, each as its own routed module behind RBAC, sharing a common shell (login, nav, layout) and `packages/ui`.

## 2. Who talks to whom (panel-to-panel, via backend)

| Panel | Sends data to → | Receives data from ← |
|---|---|---|
| **Product Management** | Inventory (new SKU → opening stock), Customer Web/App (published catalog), Marketing (product feed for offers/banners) | Admin (category/brand approval) |
| **Inventory** | Warehouse (bin/stock levels), Order Management (stock reservation on order), Admin (low-stock/near-expiry dashboard), Auditor (stock-change logs) | Product Management (new SKUs), Warehouse (GRN stock-in), Order Management (stock release on cancel/return) |
| **Order Management** | Warehouse (pick list on confirmation), Finance (invoice/tax data), Customer Support (order lookup for tickets), Customer Web/App (status updates) | Inventory (stock availability), Warehouse (pack/ship status), Payments module (payment status), Shipping module (ShadowFox tracking events) |
| **Warehouse** | Order Management (packed/shipped status), Inventory (stock-in from GRN, damaged/expired flags) | Order Management (pick list), Inventory (current stock/bin data) |
| **Tax / Finance** | Admin (P&L, GST dashboards), Auditor (tax/payment reports) | Order Management (order + invoice data), Payments module (Razorpay settlements), Returns module (refund data), Wallet/Rewards modules (liability ledgers) |
| **HR** | Admin (headcount, payroll cost) | (self-contained; no dependency on ecommerce data) |
| **Auditor** (read-only) | — (produces exports only) | Admin, Order Management, Inventory, Finance, Marketing — reads their logs, never writes |
| **Customer Support** | Order Management (status updates from resolved complaints), Returns module (return/refund actions initiated on customer's behalf) | Order Management (order lookup), Returns module (return status), Customer Web/App (ticket submissions) |
| **Marketing / CRM** | Customer Web/App (banners, offers, campaigns), Product Management (which SKUs to feature) | Product Management (catalog feed), Order Management (abandoned cart data), Membership module (tier-targeted campaigns) |
| **Content** | Customer Web/App (blog, beauty tips, ingredient pages) | Product Management (ingredient/fruit data for content tagging) |
| **Admin** | — (top-level oversight) | **All panels** — dashboard aggregates every module's data; only panel with full read + role-management write access |

## 3. Customer-facing ↔ backend loyalty ecosystem

| Feature | Customer Web/App shows | Configured by |
|---|---|---|
| Wallet | Balance, ledger, apply-at-checkout | Admin (expiry policy) |
| Bonus | Wallet-ledger tagged entries | Marketing/CRM (campaign bonus rules) |
| Referral | Code, share sheet, dashboard | Marketing/CRM (payout rules) |
| Reward Points | Balance, ledger, redemption at checkout | Marketing/CRM (earn rate, caps, lockouts) |
| Offers | Home offers section, auto-apply at cart | Marketing/CRM (offer/campaign CRUD) |
| Membership | Tier badge, progress bar, benefits | Admin (tier thresholds — rarely changed) |

## 4. Build-order dependency chain

This is the order panels should be built in, because each one depends on backend modules — and sometimes on data created by another panel — being ready first.

```
Backend Phase 1 (auth/RBAC) 
  → Backend Phase 2 (catalog/cart/orders/payments)
      → Product Management Panel   (needs catalog module)
      → Customer Web + Customer App (needs catalog/cart/orders/payments)
          → Order Management Panel (needs orders + payments)
  → Backend Phase 3 (inventory/warehouse/shipping/returns)
      → Inventory Panel            (needs inventory module)
      → Warehouse Panel            (needs inventory + shipping modules; reads Inventory Panel's stock data)
      → Customer Support Panel     (needs orders + returns modules)
  → Backend Phase 4 (wallet/bonus/referral/rewards/offers/membership)
      → (surfaces inside Customer Web/App + Marketing/CRM Panel configuration screens)
  → Backend Phase 5 (finance/hr/audit/marketing/content APIs)
      → Tax/Finance Panel
      → Marketing/CRM Panel        (full feature set, config UI for loyalty rules)
      → Content Panel
      → HR Panel
      → Auditor Panel              (built last — it only reads what every other panel has already produced)
      → Admin Panel                (built in parallel throughout, but its dashboard widgets go live incrementally as each module ships)
```

## 5. Folder ownership reminder

Per `GIT_SETUP_AND_WORKFLOW.md` §4 — each panel has its own subfolder under `apps/internal-panel/src/modules/<panel-name>/` with its own routes/components/api-hooks, so two developers on different panels rarely touch the same file. Shared files are only the route registry and `packages/ui`.
