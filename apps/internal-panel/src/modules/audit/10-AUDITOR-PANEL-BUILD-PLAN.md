# COSKINn — Auditor Panel Build Plan (React + Tailwind, Read-Only)

**Repo path:** `apps/internal-panel/src/modules/audit`
**Stack:** React + Tailwind CSS · shared `packages/ui` component library · React Query · shared route shell (login, nav, layout) inside `apps/internal-panel`
**Depends on backend:** `auth/RBAC` (`02-BACKEND-BUILD-PLAN.md` Day 9), `audit` module — read-only logs across price/stock/order/wallet/points changes (Day 59)
**Connects to panels** (per `00-PANEL-CONNECTIVITY-MAP.md` §2):
- **Sends to →** none — produces exports only, no panel consumes this panel's output
- **Receives from ←** Admin, Order Management, Inventory, Finance, Marketing — reads their logs, never writes

This is the last panel to build per the dependency chain in `00-PANEL-CONNECTIVITY-MAP.md` §4, because it only reads what every other panel has already produced — there is nothing for it to display until Admin, Order Management, Inventory, Finance, and Marketing all have real data flowing.

| Day | Tasks | Backend dependency |
|---|---|---|
| 1 | Scaffold routed module at `apps/internal-panel/src/modules/audit`; RBAC guard for `auditor` role — enforce **read-only at the query layer**, not just the UI (a hidden/disabled button is not sufficient; the backend must reject any write from this role); wire into shared internal-panel shell (login/nav/layout) | Backend Day 9 (RBAC) |
| 2 | Admin activity log screen — who changed what RBAC/role/settings, when, filterable by admin user and date range | Backend Day 59, cross-panel: Admin Panel |
| 3 | Price-change log screen — product price/discount change history, before/after values, changed-by, timestamp | Backend Day 59, cross-panel: Product Management Panel |
| 4 | Stock-adjustment log screen — every manual stock adjustment/transfer/damage/expiry write-off, before/after quantity, reason code, changed-by | Backend Day 59, cross-panel: Inventory Panel, Warehouse Panel |
| 5 | Order-modification log screen — every manual order status override, cancellation, and correction outside normal lifecycle progression | Backend Day 59, cross-panel: Order Management Panel |
| 6 | Login/session activity log screen — login attempts, OTP failures, device/IP changes, 2FA events for Admin/Finance logins | Backend Day 59, 10 |
| 7 | Coupon/wallet/reward usage log screen — coupon redemptions, wallet ledger entries, reward-points earn/redeem events, flagged for anomaly (e.g. same-device multiple referral credits) | Backend Day 59, cross-panel: Marketing/CRM Panel, Wallet/Rewards modules |
| 8 | Sales report screen (read-only mirror of Finance's sales report, scoped to auditor role) | Backend Day 55, cross-panel: Tax/Finance Panel |
| 9 | Tax report screen (read-only mirror of Finance's GST report) | Backend Day 55, cross-panel: Tax/Finance Panel |
| 10 | Refund report screen — refund initiation-to-completion audit trail across Razorpay and Wallet-default COD refunds | Backend Day 39, 56 |
| 11 | Inventory report screen — stock-movement history, damaged/expired write-off summary (read-only mirror of Inventory's reporting screen) | Backend Day 59, cross-panel: Inventory Panel |
| 12 | Payment report screen — transaction log, signature-verification failures, webhook event log | Backend Day 24, 59 |
| 13 | Export & remarks feature — CSV/PDF export on every log/report screen, auditor remarks/annotation field attached to specific log entries (remarks are additive notes, not edits to the underlying record) | Backend Day 59 |
| 14 | Cross-log correlation view — single search (order ID, SKU, user ID) that surfaces every related log entry across price/stock/order/payment/wallet logs in one screen | Backend Day 59 (aggregate) |
| 15 | Accessibility pass (WCAG 2.1 AA on internal-panel forms), read-only enforcement testing (confirm no write path is reachable from this role at any layer), RBAC edge-case testing | — |
| 16 | Integration test against staging backend, bug fixes, staging sign-off | All above |

**Compliance/data-integrity note:** this is the one panel where the "no edit rights" rule (Build Form §6.8) must be verified at the database/query layer, not assumed from the UI — the RBAC guard set up on Day 1 needs a specific test on Day 15 that attempts a write from an authenticated auditor session and confirms the backend rejects it, independent of whether the UI exposes a way to try. Auditor remarks are the sole exception — they are new annotation records, never mutations of the audited data itself.

**Definition of done:** every log category in Build Form §6.8 (admin activity, price-change, stock-adjustment, order-modification, coupon/wallet/reward usage) is visible with correct filtering and export, every report (sales/tax/refund/inventory/payment) mirrors its source panel with no discrepancy, remarks can be attached without altering underlying records, and a backend-level test confirms this role cannot write to any table outside its own remarks/annotations.
