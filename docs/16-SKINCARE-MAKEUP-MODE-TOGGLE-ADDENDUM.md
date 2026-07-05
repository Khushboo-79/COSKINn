# COSKINn — Skincare ⇄ Makeup Mode Toggle (Feature Addendum)

**Status:** New requirement, not in PRD v1.0 — this addendum extends `01-CUSTOMER-WEB-BUILD-PLAN.md`, `03-CUSTOMER-APP-BUILD-PLAN.md`, `02-BACKEND-BUILD-PLAN.md`, `04-PRODUCT-MANAGEMENT-PANEL-BUILD-PLAN.md`, and `12-MARKETING-CRM-PANEL-BUILD-PLAN.md`. Splice these tasks into those files at the day slots noted below rather than replacing them — renumber subsequent days by the count added.

## 1. What this is

One persistent toggle, visible from anywhere in the app/web, that switches the **entire customer-facing experience** — navigation, home screen, theme/colors, category tree, and search scope — between two modes:

- **Skincare Mode**
- **Makeup Mode**

This is a presentation-layer split, not two separate businesses: **one account, one cart, one wallet, one order history, one membership tier** — those stay shared and mode-agnostic no matter which mode is active. Only *browsing, theming, and navigation* change per mode.

## 2. What switches vs what stays shared

| Switches per mode | Stays shared across both modes |
|---|---|
| Bottom/side navigation structure | Login/account/profile |
| Home screen (hero banner, category rail, featured rail) | Cart & Checkout |
| Category/subcategory tree shown | Wishlist |
| Theme (colors, accent, imagery style) | Orders, tracking, returns/refunds |
| Default search scope | Wallet, Bonus, Referral, Reward Points |
| Default filters on listing pages | Membership tier & benefits |
| | Notifications, Support/chat |
| | Legal pages, account settings |

A product tagged `productType: skincare` still shows up if a customer searches "for it by name" in Makeup Mode via the "search everywhere" override (§6) — mode only changes *defaults*, it never hides a product the customer explicitly searched for by exact name/SKU.

## 3. Data model changes (Backend)

Product Management Panel already captures a **product type** field (skincare/makeup) at product-creation time (`04-PRODUCT-MANAGEMENT-PANEL-BUILD-PLAN.md` Day 3). This addendum reuses that field as the mode key — no new product-level field needed. New additions:

| Table | Change |
|---|---|
| `customer_profiles` | Add `preferred_mode` enum(`skincare`, `makeup`, `null`) — null until the customer picks one on first launch; changing the toggle updates this so preference syncs across devices |
| `banners`, `campaigns` (Marketing module) | Add `mode` enum(`skincare`, `makeup`, `both`) — a banner tagged `both` shows in either mode |
| `categories` | Add `mode` enum(`skincare`, `makeup`) so the category tree returned to nav/home is mode-scoped (subcategories inherit their parent's mode) |
| New: `home_layout_config` (or reuse `homepage_sections` from Marketing Day 3) | Keyed by `mode`, so hero/category-rail/featured-rail ordering can differ between the two modes |

## 4. Backend build tasks (insert into `02-BACKEND-BUILD-PLAN.md`)

| Insert after Day | New task | Notes |
|---|---|---|
| Day 4 (Customer Profile module) | Add `preferred_mode` to `customer_profiles`, `PUT /customer/preferred-mode` | Small, self-contained |
| Day 5 (Brand/Category module) | Add `mode` field to `categories`; `GET /categories?mode=skincare\|makeup` | Category CRUD screen in Product Management Panel gets a mode selector |
| Day 16 (Home Dashboard aggregation API) | Extend to `GET /home?mode=skincare\|makeup` — hero banner, category rail, featured rail all filtered/ordered per mode | This is the core endpoint every mode-switch re-fetches |
| Day 16 (same day, nav) | New: `GET /nav-config?mode=skincare\|makeup` — returns the category tree structure for the nav menu | Powers Web/App nav re-render on toggle |
| Day 62 (Marketing/CRM module) | Add `mode` field to `banners`/`campaigns`; homepage-section config becomes mode-keyed | Marketing/CRM Panel's banner/homepage screens (Days 2–3 of that plan) get a mode selector field |

No new backend phase is needed — this rides inside existing Phase 2 and Phase 5 days.

## 5. Customer Web build tasks (insert into `01-CUSTOMER-WEB-BUILD-PLAN.md`)

| Insert at | New task | Backend dependency |
|---|---|---|
| New Day, right after Day 2 (design-system base components) | **Mode Context/Provider** — global React context holding `currentMode`, persisted to `localStorage`, exposes `setMode()` that triggers theme swap + re-fetch | — |
| Same slot | **Two theme token sets** in `packages/ui` — Skincare palette (fruit-pastel/greens) and Makeup palette (vibrant/coral) as CSS variable sets swapped by the Mode Provider | — |
| New Day, right after Day 3 (Onboarding) | **First-launch Mode Selection screen** — "Which are you here for?" Skincare / Makeup, sets `preferred_mode`, skippable-but-defaults-to-last-chosen on repeat visits | Backend Day 4 (preferred-mode endpoint) |
| Same slot | **Persistent Mode Toggle component** — segmented control in the header, present on every route, switching it: swaps theme instantly, re-fetches nav config + home data, does **not** clear cart/wishlist/session | Backend Day 16 (nav-config, home) |
| Modify Day 6 (Home dashboard shell) | Home screen now fetches `GET /home?mode=…` and re-renders fully on toggle | Backend Day 16 |
| Modify Day 7 (Category/PLP) | Category tree and default PLP filters are mode-scoped | Backend Day 16 |
| Modify Day 9 (Search) | Search defaults to current mode scope; add a "Search all" toggle in the search bar per §6 below | Backend Day 12 (extend to accept mode param) |

## 6. Customer App build tasks (insert into `03-CUSTOMER-APP-BUILD-PLAN.md`)

Mirror of the Web tasks above, native equivalents:

| Insert at | New task | Backend dependency |
|---|---|---|
| Right after Day 2 (native design-system components) | **Mode Context** via Redux slice, persisted to AsyncStorage/Keychain; two native theme objects (Skincare/Makeup) consumed by the navigation/theming layer | — |
| Right after Day 3 (Onboarding) | First-launch Mode Selection screen; persistent Mode Toggle in the top nav bar or a segmented tab, same behavior as web — instant theme swap, nav/home re-fetch, cart/session untouched | Backend Day 4, 16 |
| Modify Day 6 (Home dashboard) | Mode-scoped `GET /home?mode=…` | Backend Day 16 |
| Modify Day 7 (Category/PLP screens) | Mode-scoped category tree and default filters | Backend Day 16 |
| Modify Day 9 (Search screen) | Mode-scoped default + "Search all" toggle | Backend Day 12 |

## 7. Product Management Panel build tasks (insert into `04-PRODUCT-MANAGEMENT-PANEL-BUILD-PLAN.md`)

| Insert at | New task |
|---|---|
| Modify Day 2 (Category management) | Add a required **Mode** selector (Skincare/Makeup) when creating a category — subcategories inherit it |
| Modify Day 3 (Create Product wizard) | Product type field (already planned) is now explicitly labeled and enforced as the mode key — validation blocks mismatched category/product-type combinations |

## 8. Marketing/CRM Panel build tasks (insert into `12-MARKETING-CRM-PANEL-BUILD-PLAN.md`)

| Insert at | New task |
|---|---|
| Modify Day 2 (Banner management) | Add **Mode** field (Skincare / Makeup / Both) to every banner |
| Modify Day 3 (Homepage section management) | Section ordering/toggling becomes mode-keyed — a marketer configures the Skincare home layout and the Makeup home layout independently |
| Modify Day 6–7 (Campaigns) | Campaign audience targeting can optionally scope by mode (e.g. "Mango Moisture Week" only shown in Skincare Mode) |

## 9. Search-scope behavior (design decision, confirm before build)

Default: search results are scoped to the active mode. A visible **"Search all"** toggle inside the search bar lets the customer search the full catalog regardless of mode — this avoids the frustrating case where a customer in Makeup Mode searches for a skincare product they saw earlier and gets zero results. Recommend this be **on by default with a "matches in [other mode]" hint** rather than fully hidden, so nothing feels lost — but this is a UX call the team should confirm before Day 9 of the web/app plans.

## 10. Definition of done

- Toggling mode from any screen swaps theme instantly with no full page/app reload, re-fetches nav and home data for the new mode, and never clears cart, wishlist, or session.
- A customer's last-chosen mode persists across app restarts (local storage) and across devices (synced via `preferred_mode` on their profile).
- Every category, banner, and homepage section is correctly mode-scoped end-to-end from Marketing/CRM and Product Management Panel input through to what Customer Web/App renders, with no manual step.
- Cart, wallet, orders, membership, and support remain fully shared and unaffected by which mode is active.
