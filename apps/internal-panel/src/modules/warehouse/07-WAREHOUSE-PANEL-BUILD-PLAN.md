# COSKINn — Warehouse Panel Build Plan (React + Tailwind)

**Repo path:** `apps/internal-panel/src/modules/warehouse`
**Stack:** React + Tailwind CSS · shared `packages/ui` component library · React Query · React Hook Form + Zod · shared route shell (login, nav, layout) inside `apps/internal-panel`
**Depends on backend:** `auth/RBAC` (`02-BACKEND-BUILD-PLAN.md` Day 9), `inventory` module (Days 28–32), `purchase-order/GRN` module (Day 33), `warehouse fulfillment` module (Day 34), `shipping` module (Day 35), `returns` module (Day 38)
**Connects to panels** (per `00-PANEL-CONNECTIVITY-MAP.md` §2):
- **Sends to →** Order Management Panel (packed/shipped status), Inventory Panel (stock-in from GRN, damaged/expired flags)
- **Receives from ←** Order Management Panel (pick list on order confirmation), Inventory Panel (current stock/bin data)

All of the above happens only through backend APIs — this panel never calls Order Management or Inventory directly.

Per the build-order dependency chain (`00-PANEL-CONNECTIVITY-MAP.md` §4), this panel builds after the Inventory Panel — it reads and writes the same `warehouses`/`warehouse_bins`/`inventory_stock` tables Inventory Panel establishes, and it needs Order Management's pick-list trigger (Backend Day 34) to be functional before its fulfillment screens are meaningful.

| Day | Tasks | Backend dependency |
|---|---|---|
| 1 | Scaffold routed module at `apps/internal-panel/src/modules/warehouse`; RBAC guard for `warehouse-staff` role; wire into shared internal-panel shell (login/nav/layout) | Backend Day 9 (RBAC) |
| 2 | Warehouse & bin management screens — create/edit warehouse, bin structure CRUD (this panel owns the source data Inventory Panel reads) | Backend Day 28 |
| 3 | Purchase Order screen — create/view POs, supplier details, expected quantity/SKU | Backend Day 33 |
| 4 | GRN (Goods Received Note) creation screen — receive against a PO, quantity received vs ordered, discrepancy flagging | Backend Day 33 |
| 5 | Batch/expiry/packaging QC-on-receipt screen — per-unit QC checklist (batch number verification, expiry date check, packaging integrity), pass/fail with reason, triggers stock-in on pass | Backend Day 33, cross-panel: Inventory Panel (stock-in) |
| 6 | Bin storage / put-away screen — assign received stock to bins, barcode-scan support for bin assignment | Backend Day 28–29 |
| 7 | Pick-list screen — incoming pick lists from Order Management on order confirmation, pick-by-bin sequencing, barcode-scan pick confirmation | Backend Day 34, cross-panel: Order Management Panel |
| 8 | Pack screen — pack confirmation, item-count verification against order, pack-station workflow | Backend Day 34 |
| 9 | Invoice & shipping-label generation screen — print/reprint invoice and ShadowFox shipping label at pack stage | Backend Day 26, 35 |
| 10 | ShadowFox courier handover screen — manifest generation, handover confirmation, AWB reconciliation | Backend Day 35 |
| 11 | Ship-confirmation screen — marks order shipped, status pushed back to Order Management Panel (read-only sync view on the OM side) | Backend Day 35, cross-panel: Order Management Panel |
| 12 | Returned-order QC screen — receive returned units, QC checklist (sellable vs damaged), decision feeds Inventory Panel's return-stock handling screen | Backend Day 38, cross-panel: Inventory Panel |
| 13 | Damaged/expired marking screen — flag stock at any warehouse stage as damaged or expired, writes to Inventory Panel's damaged/expired stock views | Backend Day 32, cross-panel: Inventory Panel |
| 14 | Stock adjustment request screen — warehouse staff can request an adjustment (not directly mutate); routes to Inventory Panel/RBAC-elevated approval | Backend Day 30, cross-panel: Inventory Panel |
| 15 | Warehouse dashboard — daily throughput (received/picked/packed/shipped counts), pending pick-lists, pending GRNs, QC backlog | Backend Days 28–35 (aggregate) |
| 16 | Accessibility pass (WCAG 2.1 AA on internal-panel forms), barcode-scanner input hardening (keyboard-wedge + manual fallback), RBAC edge-case testing (warehouse-scoped staff vs multi-warehouse supervisor) | — |
| 17 | Integration test against staging backend — full pipeline GRN → put-away → pick → pack → ship → return QC; bug fixes, staging sign-off | Backend Day 40 (hardening pass) |

**Compliance/data-integrity note:** every stock movement this panel initiates (GRN stock-in, damaged/expired marking, return-stock QC decisions) must write through the same ledger-based `stock_movements` table Inventory Panel writes to — this panel and Inventory Panel share the underlying stock truth, so no screen here should locally cache or independently recompute an on-hand quantity; always re-read from the backend after a mutation.

**Definition of done:** a unit can be traced end-to-end through this panel from PO → GRN → QC → bin put-away → pick → pack → ShadowFox handover → ship-confirmation with no manual database step, returned units correctly route through QC into either sellable (back to Inventory available stock) or damaged/expired stock with no manual reconciliation, and every pick-list generated by Order Management on order confirmation appears here with no polling delay beyond what the backend's real-time/webhook layer provides.
