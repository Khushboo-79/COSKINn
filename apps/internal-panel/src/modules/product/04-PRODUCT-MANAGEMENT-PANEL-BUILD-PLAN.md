# COSKINn — Product Management Panel Build Plan (React + Tailwind)

**Repo path:** `apps/internal-panel/src/modules/product`
**Stack:** React + Tailwind CSS · shared `packages/ui` component library · React Query · React Hook Form + Zod · shared route shell (login, nav, layout) inside `apps/internal-panel`
**Depends on backend:** `auth/RBAC`, `product` (brand/category, product core, tagging, media pipeline) — see `02-BACKEND-BUILD-PLAN.md` Days 5–9, 14–15
**Connects to panels** (per `00-PANEL-CONNECTIVITY-MAP.md` §2):
- **Sends to →** Inventory Panel (new SKU → opening-stock intake), Customer Web/App (published catalog, live the moment a product is activated), Marketing/CRM Panel (product feed for offers/banners)
- **Receives from ←** Admin Panel (category/brand approval gate)

All of the above happens only through backend APIs — this panel never calls Inventory or Marketing directly.

This is the first internal panel to build per the dependency chain in `00-PANEL-CONNECTIVITY-MAP.md` §4, because Inventory, Customer Web/App catalog screens, and Order Management all read data this panel produces.

| Day | Tasks | Backend dependency |
|---|---|---|
| 1 | Scaffold routed module at `apps/internal-panel/src/modules/product`; RBAC guard for `product-manager` role; wire into shared internal-panel shell (login/nav/layout) | Backend Day 9 (RBAC) |
| 2 | Brand management, Category management, Subcategory management screens (CRUD, nested category tree UI) | Backend Day 5 |
| 3 | Product list screen (search/filter by category/brand/status) + Create Product wizard: name, slug, SKU, category, subcategory, brand, product type, description, short description, MRP, selling price, discount | Backend Day 6 |
| 4 | Variant management screen (add/edit variants), Shade management screen (shade name, shade code, fragrance/flavor) | Backend Day 6 |
| 5 | Fruit-ingredient tagging, skin-concern tagging, skin-type tagging screens — powers Customer Web/App fruit-concern browsing | Backend Day 7 |
| 6 | Image & video upload screens — S3 presigned upload, gallery reorder/crop, video embed, upload validation feedback | Backend Day 8 |
| 7 | Compliance & commerce fields screen: GST rate, HSN code, batch number, manufacturing/expiry date, manufacturer name/address, country of origin, net quantity, opening stock entry (triggers Inventory Panel intake) | Backend Day 3 (schema) + cross-panel: Inventory Panel Day 11 |
| 8 | Content fields screen: how-to-use, ingredients, warnings, benefits, product claims, storage instructions, returnable status, COD availability, return policy per product | Backend Day 7, 15 |
| 9 | Activate/Deactivate toggle + product status workflow (Draft → Pending Admin Approval → Live), status badges on the list screen | Cross-panel: Admin Panel approval action |
| 10 | SEO fields screen — SEO title, description, keywords (feeds SSG pre-render on Customer Web) | Backend Day 14 |
| 11 | Product feed endpoint/screen for Marketing/CRM — "which SKUs to feature," filterable by fruit/concern/category | Backend Day 62 (build against mocked feed consumer until Marketing ships) |
| 12 | Bulk CSV import/export for the launch catalog (12 skincare + 12 makeup SKUs per PRD §3), validation on import (required Cosmetics Rules 2020 fields must be present before a product can go Live) | Backend Days 6–7 |
| 13 | Accessibility pass (WCAG 2.1 AA on internal-panel forms), form validation hardening, RBAC edge-case testing (read-only vs edit roles) | — |
| 14 | Integration test against staging backend, bug fixes, staging sign-off | All above |

**Compliance note:** the Activate toggle (Day 9) must be blocked server-side, not just client-side, until every mandatory Cosmetics Rules 2020 field (PRD §27) is populated — batch number, expiry, manufacturer details, country of origin, and test-report references at minimum. Don't let the UI be the only gate.

**Definition of done:** every field in PRD §10.2 exists on the product form, every product Activate action is RBAC- and compliance-gated, and a newly activated product appears correctly on Customer Web/App catalog screens and triggers an opening-stock entry visible in the Inventory Panel — with no manual database step in between.
