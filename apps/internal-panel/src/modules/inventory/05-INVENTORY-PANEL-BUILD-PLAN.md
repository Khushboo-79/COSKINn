# COSKINn — Inventory Panel Build Plan (React + Tailwind)

**Repo path:** `apps/internal-panel/src/modules/inventory`
**Stack:** React + Tailwind CSS · shared `packages/ui` component library · React Query · React Hook Form + Zod · shared route shell (login, nav, layout) inside `apps/internal-panel`
**Depends on backend:** `auth/RBAC` (`02-BACKEND-BUILD-PLAN.md` Day 9), `inventory` module (Days 28–32), `product` module (Days 5–8, for SKU/variant data), `warehouse`-adjacent tables owned by the Warehouse module (Day 33)
**Connects to panels** (per `00-PANEL-CONNECTIVITY-MAP.md` §2):
- **Sends to →** Warehouse Panel (bin/stock levels for pick-pack), Order Management Panel (stock reservation confirmation on order placed), Admin Panel (low-stock/near-expiry dashboard feed), Auditor Panel (stock-change logs)
- **Receives from ←** Product Management Panel (new SKU → triggers opening-stock intake screen), Warehouse Panel (GRN stock-in events), Order Management Panel (stock release on cancel/return)

All of the above happens only through backend APIs — this panel never calls Product Management, Warehouse, or Order Management directly.

This panel builds second in the internal-panel dependency chain (`00-PANEL-CONNECTIVITY-MAP.md` §4) — it cannot go live until Product Management Panel Day 7 (opening-stock trigger) exists and Backend Phase 3 (Days 28–32) has shipped. Warehouse Panel, Order Management's stock-reservation calls, and Admin's low-stock dashboard widget all depend on data this panel produces.

| Day | Tasks | Backend dependency |
|---|---|---|
| 1 | Scaffold routed module at `apps/internal-panel/src/modules/inventory`; RBAC guard for `inventory-staff` role; wire into shared internal-panel shell (login/nav/layout) | Backend Day 9 (RBAC) |
| 2 | Warehouse & bin selector screens (read-only consumption of warehouse/bin structure owned by Warehouse Panel); stock dashboard shell — per-SKU available/reserved/damaged/expired summary cards | Backend Day 28 |
| 3 | Opening-stock intake screen — triggered automatically when Product Management Panel activates a new SKU (Day 7 of that plan); manual opening-stock entry fallback for pre-launch catalog load | Backend Day 28 |
| 4 | Stock-in screen (manual, non-GRN adjustments) and Stock-out screen (damage write-off, internal use, sample stock) with reason-code dropdowns | Backend Day 29 |
| 5 | Batch-wise stock view — per-SKU, per-batch quantity, batch number, manufacturing/expiry date, linked to Product Management's compliance fields | Backend Day 29 |
| 6 | Shade-wise and warehouse-wise stock breakdown views (pivot/filter by shade, warehouse, bin) | Backend Day 29 |
| 7 | Stock adjustment screen (correction with mandatory reason + approver note) and Stock transfer screen (warehouse-to-warehouse, bin-to-bin) | Backend Day 30 |
| 8 | Low-stock alert dashboard (admin-configurable threshold per SKU) and Near-expiry alert dashboard (configurable lead-time window), both backed by the scheduled job | Backend Day 31 |
| 9 | Damaged-stock screen (mark damaged, quantity, reason, photo upload) and Expired-stock screen (auto-flagged by scheduled job + manual override), both feeding write-off reporting | Backend Day 32 |
| 10 | Return-stock handling screen — receives return-stock events from the Returns module (post Warehouse QC) and re-integrates sellable units back into available stock, quarantines non-sellable units | Backend Day 38 (Warehouse QC gate) |
| 11 | Barcode scan support — scan-to-lookup SKU/batch, scan-driven stock-in/stock-out for warehouse floor use (keyboard-wedge scanner input + manual entry fallback) | Backend Day 29 |
| 12 | Inventory audit screen — point-in-time stock count vs system count, variance report, adjustment-on-reconcile workflow | Backend Day 30 |
| 13 | Stock reservation visibility screen — read-only view of stock reserved by Order Management on order-confirm, and released on cancel/return, so inventory staff can see why available ≠ on-hand | Backend Day 34 (Order Management ↔ Inventory tie), cross-panel: Order Management Panel |
| 14 | Reporting screen — stock movement history, adjustment logs, damaged/expired summary, exportable to CSV (feeds Auditor Panel read access and Admin dashboard) | Backend Day 59 (audit logs) — build against mocked export until Day 59 ships |
| 15 | Accessibility pass (WCAG 2.1 AA on internal-panel forms), form validation hardening, RBAC edge-case testing (read-only vs edit roles, warehouse-scoped staff) | — |
| 16 | Integration test against staging backend, bug fixes, staging sign-off | All above |

**Compliance/data-integrity note:** every stock-in, stock-out, adjustment, and transfer must be a ledger entry (`stock_movements`), never a direct mutation of the current-stock number — the on-screen available quantity is always a derived sum, matching the backend's ledger design (`02-BACKEND-BUILD-PLAN.md` Day 3, `inventory_stock` / `stock_movements` tables). The UI must never allow a negative stock write without an explicit reason code, and damaged/expired write-offs must be traceable back to a specific batch.

**Definition of done:** every stock state (available, reserved, damaged, expired) is visible per SKU/batch/shade/warehouse, every mutation to stock happens through an audited ledger entry with RBAC gating, low-stock and near-expiry alerts surface on the Admin dashboard automatically, opening-stock intake fires with no manual database step when a product goes live on the Product Management Panel, and stock reservation/release stays in sync with Order Management with no manual reconciliation.
