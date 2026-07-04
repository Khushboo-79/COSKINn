# COSKINn — Customer Website Build Plan (React + Tailwind)

**Repo path:** `apps/customer-web`
**Stack:** React (Vite) · Tailwind CSS + Headless UI · Redux Toolkit / React Query · React Router v6 · React Hook Form + Zod · Axios · SSG/SSR pre-render layer for SEO pages
**Depends on backend:** `auth`, `catalog`, `cart`, `wishlist`, `orders`, `payments`, `shipping`, `returns`, `wallet`, `bonus`, `referral`, `rewards`, `offers`, `membership`, `content` (see `00-BACKEND-BUILD-PLAN.md`)
**Connects to panels:** Product Management (catalog it displays), Order Management (order status), Customer Support (ticket submission), Marketing/CRM (banners/offers/campaigns it renders), Content (blog/tips it renders)

Frontend work on any screen below cannot start for real data until the matching backend day (noted in brackets) has shipped; build against mocked API responses before that and swap once ready — mark this in the PR per the pull-request checklist.

| Day | Tasks | Backend dependency |
|---|---|---|
| 1 | Vite + React + TS scaffold inside `apps/customer-web`; Tailwind config matching brand tokens (fruit-pastel palette); routing skeleton; Axios client with JWT-refresh interceptor | Backend Day 10 (auth) |
| 2 | Design-system base components in `packages/ui` (buttons, inputs, cards, badges) shared with internal panels | — |
| 3 | Splash/loading state, Onboarding screens (fruit-based intro, skincare-by-concern, SPF/makeup glow) | — |
| 4 | Mobile-number login + OTP verification screens, refresh-token silent renewal | Backend Day 10 |
| 5 | Profile setup, skin type/concern selection, makeup preference screens | Backend Day 4 |
| 6 | Home dashboard shell: hero banner slot, category rail, fruit-concern rail (data wired once Marketing banners API is ready, Day 9 below) | Backend Day 16 |
| 7 | Category & subcategory pages, Product Listing Page with filter/sort (price, skin type, concern, fruit) | Backend Day 16 |
| 8 | Product Detail Page: images/video gallery, ingredients, benefits, how-to-use, shade/variant selector, reviews | Backend Days 15–17 |
| 9 | Search page (typo-tolerant, <1s), fruit-ingredient landing pages, SEO landing pages (Section 8.2 list) with pre-render/SSG so they're crawlable | Backend Day 16 |
| 10 | Wishlist page, Cart page (cross-device persistence) | Backend Days 18–19 |
| 11 | Coupon apply UI, Address list + add/edit address | Backend Days 20–21 |
| 12 | Checkout page: order summary, stacking rules for coupon + wallet + points | Backend Day 42, 48 |
| 13 | Razorpay Checkout integration (web SDK), payment success/failure handling, signature-verified confirmation | Backend Days 23–24 |
| 14 | Order success page, My Orders list, Order Details, Track Order (ShadowFox status) | Backend Days 22, 27, 35 |
| 15 | Cancel order flow, Return request flow (reason + photo/video upload), Refund status page | Backend Days 37–39 |
| 16 | Reviews & ratings submission, Q&A submission | Backend Day 17 |
| 17 | Skin Quiz flow + Routine Builder results page | Backend Day 21 |
| 18 | Beauty tips / blog pages, ingredient library pages (Content Panel output) | Backend Day 63 |
| 19 | **Loyalty ecosystem — Wallet**: balance widget on Home/Account, ledger screen, apply-wallet-at-checkout toggle | Backend Days 41–43 |
| 20 | **Bonus**: bonus history inside wallet ledger, tagged entries | Backend Days 44–45 |
| 21 | **Referral**: code/link screen with native share sheet, referral dashboard (invites/conversions/earnings) | Backend Days 46–47 |
| 22 | **Reward Points**: balance, ledger, apply-points-at-checkout | Backend Days 48–49 |
| 23 | **Membership**: tier badge, progress bar to next tier, benefits matrix screen | Backend Days 50–51 |
| 24 | **Offers**: Home offers/deals section, auto-applied best coupon banner at cart, tier-exclusive offer badges | Backend Day 52 |
| 25 | Notifications center (in-app), account settings, legal pages (T&C, privacy, shipping, return/refund, cancellation, payment, cookie policy, disclaimers, grievance officer) | Backend Day 63 (content) |
| 26 | Customer Support entry point: ticket creation form, live chat widget (WebSocket) | Backend Days 60–61 |
| 27 | Accessibility pass (WCAG 2.1 AA), performance pass (PLP/PDP <2s on 4G, image lazy-load/CDN), Lighthouse audit | — |
| 28 | Cross-browser/device QA, integration test against staging backend, bug fixes, staging sign-off | All above |

**Definition of done:** every FR-# in the PRD sections 4–6 (Core Shopping + Loyalty + Membership) has a corresponding screen wired to a real, non-mocked endpoint.
