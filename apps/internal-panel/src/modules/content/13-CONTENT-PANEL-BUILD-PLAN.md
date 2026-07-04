# COSKINn — Content Panel Build Plan (React + Tailwind)

**Repo path:** `apps/internal-panel/src/modules/content`
**Stack:** React + Tailwind CSS · shared `packages/ui` component library · React Query · React Hook Form + Zod · rich-text/WYSIWYG editor · shared route shell (login, nav, layout) inside `apps/internal-panel`
**Depends on backend:** `auth/RBAC` (`02-BACKEND-BUILD-PLAN.md` Day 9), `Content module` — blog, beauty tips, ingredient library, legal-pages CMS, FAQ, homepage content (Day 63), plus read access into `product` tagging (Days 7, ingredient/fruit data)
**Connects to panels** (per `00-PANEL-CONNECTIVITY-MAP.md` §2):
- **Sends to →** Customer Web/App (blog, beauty tips, ingredient pages)
- **Receives from ←** Product Management Panel (ingredient/fruit data for content tagging)

All of the above happens only through backend APIs — this panel never calls Product Management or Customer Web/App directly.

Per the build-order dependency chain (`00-PANEL-CONNECTIVITY-MAP.md` §4), this is Phase 5 work, built alongside Marketing/CRM — it needs the Day 63 Content module and Product Management's fruit/ingredient tagging (Day 7 of that plan) to be real before content can be meaningfully cross-linked to products. Customer Web/App's Day 18 (beauty tips/blog screens) and Day 25 (legal pages) both consume this panel's output.

| Day | Tasks | Backend dependency |
|---|---|---|
| 1 | Scaffold routed module at `apps/internal-panel/src/modules/content`; RBAC guard for `content` role; wire into shared internal-panel shell (login/nav/layout) | Backend Day 9 (RBAC) |
| 2 | Blog post editor screen — rich-text/WYSIWYG create/edit, cover image, category/tag assignment, draft/publish workflow, per PRD §21.2 blog-idea list (sunscreen guide, orange-for-glow, green tea for oily skin, etc.) | Backend Day 63 |
| 3 | Beauty tips screen — short-form tip authoring, homepage/app tip-of-the-day slotting | Backend Day 63 |
| 4 | Skin-routine articles screen — structured multi-step routine content (AM/PM routine builder-style layout), linkable to Routine Builder recommendations | Backend Day 63, cross-panel: Backend Day 21 (Skin Quiz/Routine Builder) |
| 5 | Ingredient education / ingredient library screen — per-ingredient detail entries (benefit, source, skin type suitability), pulls fruit-ingredient taxonomy from Product Management tagging | Backend Day 63, cross-panel: Product Management Panel Day 5 |
| 6 | Fruit benefit pages screen — dedicated long-form page per launch fruit (mango, strawberry, pomegranate, green tea, blueberry, etc.), cross-linked to products tagged with that fruit | Backend Day 63, 14, cross-panel: Product Management Panel |
| 7 | Product usage guide screen — how-to-use long-form content per product/category, distinct from the short how-to-use field owned by Product Management | Backend Day 63, cross-panel: Product Management Panel Day 8 |
| 8 | Video tutorial upload screen — S3-backed video upload, thumbnail, linked product/routine tags | Backend Day 63, 8 (media pipeline) |
| 9 | SEO content screen — meta title/description/keywords per content piece, feeds the same SSG pre-render layer as product SEO fields | Backend Day 63, 14 |
| 10 | FAQ management screen — category-grouped FAQ CRUD, ordering, homepage/product-page slotting | Backend Day 63 |
| 11 | Homepage content screen — editorial copy blocks (not banners — those are Marketing/CRM's), seasonal messaging, hero copy | Backend Day 63, cross-panel: Marketing/CRM Panel (banner vs copy ownership boundary) |
| 12 | Product description writing screen — long-form editorial product descriptions, distinct from Product Management's structured description/short-description fields; write access here feeds back into the product record for review, never bypasses Product Management's approval gate | Backend Day 63, cross-panel: Product Management Panel |
| 13 | Routine builder content screen — the copy/recommendation-text layer shown alongside Routine Builder's algorithmic output | Backend Day 63, 21 |
| 14 | Legal-pages CMS screen — T&C, privacy, shipping, return/refund, cancellation, payment, cookie policy, disclaimers, grievance-officer page, versioned edits with publish history | Backend Day 63 |
| 15 | Content calendar / publish-scheduling screen — schedule future publish dates across blog/tips/campaigns, draft/review/published status workflow | Backend Day 63 |
| 16 | Accessibility pass (WCAG 2.1 AA on internal-panel forms and on rendered content structure), image/video alt-text enforcement, RBAC edge-case testing (content vs read-only reviewer roles) | — |
| 17 | Integration test against staging backend — publish flow for blog/FAQ/legal pages verified live on Customer Web/App with no manual step, ingredient/fruit cross-linking verified against real Product Management data; bug fixes, staging sign-off | All above |

**Compliance/data-integrity note:** legal-page edits (Day 14) must be versioned with a publish history, not overwritten in place — Cosmetics Rules 2020 and consumer-protection disclosures need an auditable record of what version was live on any given date. Product description writing (Day 12) must never let this panel set a product Live/Draft/Pending-Approval status directly — that status workflow belongs to Product Management Panel per its Day 9 compliance gate.

**Definition of done:** every feature in PRD §21.1 (blog, beauty tips, skin-routine articles, ingredient education, fruit benefit pages, product usage guide, video tutorials, SEO content, FAQ, homepage content, product description writing, routine builder content) is live against real backend data, every legal page required in PRD §29 exists and is versioned, and content published here appears correctly on Customer Web/App's blog/tips/legal/ingredient-library screens with no manual step and correct SEO pre-render.
