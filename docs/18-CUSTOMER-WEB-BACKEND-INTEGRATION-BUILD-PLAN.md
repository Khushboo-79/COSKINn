# COSKINn — Customer Web: Backend Integration Build Plan

**Scope:** the web developer has already built the Customer Website frontend (React + Tailwind). The backend (`02-BACKEND-BUILD-PLAN.md`, Days 1–63) is already built. **Nothing here builds or modifies frontend UI or backend code** — this is purely wiring the existing website's screens to the existing, already-live API. Same backend serves Customer Web and Customer App, so this plan's endpoint-by-endpoint sequence applies to both; only the client code differs.

**Assumption stated up front:** since I haven't seen the website's actual component/route structure, this plan sequences integration by **backend domain**, in the order a customer actually moves through the site (browse → account → cart → checkout → post-purchase → loyalty → content). If the web dev's folder structure differs, the day order still holds — just map each day's endpoints to whatever screen/component already calls (or should call) them.

---

## Phase 0 — Setup (Days 1–2)

| Day | Task |
|---|---|
| 1 | Confirm/point the website's API client (Axios/Fetch wrapper, wherever it lives in the existing codebase) at the real backend base URL per environment (local/staging/prod); confirm CORS is open from the website's origin(s); set up a single request interceptor for auth headers and a single response interceptor for error normalization (401 → redirect to login, 5xx → toast, etc.) |
| 2 | Confirm token storage/refresh strategy matches the backend's JWT + refresh-rotation design (Backend Day 10); confirm every existing "logged in" check in the website reads from this real session state, not a placeholder/mock flag |

## Phase 1 — Auth & Account (Days 3–5)

| Day | Task | Backend endpoint(s) |
|---|---|---|
| 3 | OTP login flow — send-OTP, verify-OTP, session issuance, logout, refresh-token; rate-limit/error states (too many attempts, expired OTP, wrong number) surfaced correctly | Backend Day 10 |
| 4 | Customer profile — GET/PUT profile, skin type, skin concern, makeup preference; confirm this feeds the Skin Quiz/Routine Builder screen if the site already has skin-profile UI | Backend Day 4 |
| 5 | Address book — full CRUD, pincode/COD serviceability check wired to the real (non-stub) ShadowFox-backed check once Day 35's real implementation is confirmed live | Backend Day 20, real-ified by Day 35 |

## Phase 2 — Catalog & Discovery (Days 6–10)

| Day | Task | Backend endpoint(s) |
|---|---|---|
| 6 | Public catalog reads — product list, product detail, category listing, concern listing, fruit listing | Backend Day 11 |
| 7 | Search — wire the search bar to the real typo-tolerant/trigram search endpoint, confirm <1s response target is actually met against real data volume | Backend Day 12 |
| 8 | Filter & sort — price, skin type, concern, fruit, rating, newness, combinable filters on PLP | Backend Day 13 |
| 9 | SEO metadata — wire per-page SEO title/description/keywords into whatever SSR/SSG pre-render step the site uses; confirm fruit-ingredient landing pages pull real data, not placeholder copy | Backend Day 14 |
| 10 | Home dashboard — hero banner slot, category rail, fruit-concern rail; **banners will read as empty/stub until Marketing/CRM's Day 62 module ships (internal panel side)** — confirm the site handles an empty banner response gracefully rather than breaking layout | Backend Day 16 |

## Phase 3 — Product Detail & Social Proof (Days 11–13)

| Day | Task | Backend endpoint(s) |
|---|---|---|
| 11 | Product Detail Page — full field set (how-to-use, ingredients, benefits, warnings, claims), shade/variant selector wired to real variant/stock data | Backend Day 15 |
| 12 | Reviews & Ratings + Q&A — GET/POST reviews, questions/answers on PDP | Backend Day 17 |
| 13 | Wishlist — GET/POST/DELETE, wired to the heart-icon/wishlist-page UI, confirm state persists across login | Backend Day 18 |

## Phase 4 — Cart & Checkout (Days 14–19)

| Day | Task | Backend endpoint(s) |
|---|---|---|
| 14 | Cart — GET/POST/PUT/DELETE cart items, cross-device persistence; **verify guest-cart → logged-in-cart merge behavior explicitly** (the backend plan doesn't call this out as a separate step — confirm it during this integration, don't assume it's automatic) | Backend Day 19 |
| 15 | Coupon apply/remove at cart — `POST /cart/apply-coupon`, `DELETE /cart/remove-coupon`; Skin Quiz & Routine Builder — `POST /customer/skin-quiz`, `GET /customer/recommendations` | Backend Day 21 |
| 16 | Wallet + Reward Points + coupon 3-way stacking at checkout — apply wallet partial/full, redeem points up to cap, confirm the final-payable-amount computation on screen matches what the backend actually charges (this is the FR-6 requirement — test the arithmetic, not just that the fields render) | Backend Day 42, 48 (stacking finalized Day 48) |
| 17 | Order creation — `POST /orders` pre-payment draft, address snapshot | Backend Day 22 |
| 18 | Razorpay integration — `POST /payments/create-order`, checkout widget wired to Razorpay Orders API response, then signature verification (`/payments/verify`) on return; **do not trust the client-side payment-success callback alone** — the order's real status must come from the webhook-driven state, so the "payment successful" screen should poll/subscribe for the webhook-confirmed status, not just show success on the client callback | Backend Day 23–24 |
| 19 | Order-confirmation push/email trigger firing correctly post-payment; invoice PDF download/reprint wired on the confirmation and My Orders screens | Backend Day 25–26 |

## Phase 5 — Post-Purchase (Days 20–23)

| Day | Task | Backend endpoint(s) |
|---|---|---|
| 20 | My Orders / Order Detail — list + detail, live status (placed → delivered), wired to the same `order_status_history`-backed data the Order Management Panel uses, so status is never stale between customer and internal view | Backend Day 27 |
| 21 | Order cancellation — `POST /orders/:id/cancel`, pre-ship-only UI gating, confirm stock-release is reflected (indirectly) in product availability shown elsewhere on site | Backend Day 36 |
| 22 | Return request — `POST /returns/request` with photo/video upload, wired to the returns UI on Order Detail | Backend Day 37 |
| 23 | Refund status tracking on Order Detail — reflects `POST /refunds/initiate` outcome (Razorpay Refunds API for prepaid, Wallet credit for COD-default) | Backend Day 39 |

## Phase 6 — Loyalty & Monetary Ecosystem (Days 24–29)

| Day | Task | Backend endpoint(s) |
|---|---|---|
| 24 | Wallet — balance display, ledger/history screen, expiry-aware balance (no add-money UI should exist anywhere — confirm the site doesn't have one, since the backend intentionally has no add-money endpoint) | Backend Day 41, 43 |
| 25 | Bonus — sign-up bonus (post-OTP) and first-order bonus (post-delivery + return window) reflected correctly in wallet/points history, no premature crediting shown | Backend Day 44 |
| 26 | Referral — unique code/link generation + native-share, referee welcome-discount auto-apply at signup/checkout, referral dashboard (status of pending/paid referrals) | Backend Day 46–47 |
| 27 | Reward Points — earn display (post return-window), redemption at checkout (already wired Day 16 above — this day covers the standalone points-history/dashboard screen), birthday/campaign multiplier badges if the site surfaces them | Backend Day 48–49 |
| 28 | Membership — current tier, benefits, progress-to-next-tier bar (FR-M4) wired to real spend-based tier data | Backend Day 50–51 |
| 29 | Offers — homepage Offers/Deals section reflecting only in-date-range offers (FR-O2), best-offer auto-apply behavior verified at cart | Backend Day 52 |

## Phase 7 — Content & Support (Days 30–32)

| Day | Task | Backend endpoint(s) |
|---|---|---|
| 30 | Content — blog, beauty tips, ingredient library, fruit-benefit pages, FAQ, legal pages (T&C, privacy, shipping, return/refund, cancellation, grievance-officer page), homepage editorial copy blocks; confirm legal-page content shows the currently-published version, not a stale cache | Backend Day 63 |
| 31 | Support/contact — wire the "Contact Us"/help form to a real ticket-creation call; **verify this endpoint actually exists** (see gap list below) so a customer's ticket lands in the Customer Support Panel, not nowhere | Backend Day 60 (verify) |
| 32 | Notification center, if the site has one — verify there's a real "list my notifications" read endpoint behind it, not just the one-way push/email triggers (see gap list below) | Backend Day 25 (verify) |

## Phase 8 — Hardening & Sign-off (Days 33–35)

| Day | Task |
|---|---|
| 33 | Error/loading/retry states pass across every integrated screen — confirm real network latency, real 401/403/422/500 responses, real empty-states (e.g. empty cart, empty wishlist, zero search results) all render correctly, not just the happy path a mock always returned |
| 34 | Performance verification against PRD NFRs — PLP/PDP load <2s on 4G, API p95 <400ms observed against real backend, not simulated |
| 35 | Full regression across the whole customer journey (browse → account → cart → checkout → post-purchase → loyalty → content) against production data; staging sign-off |

---

## Reusable AI Integration Prompt

Paste this once at the start of a session, followed by the relevant phase(s) of the build plan above, whenever you want an AI to actually wire a batch of screens to the backend:

```
You are integrating an already-built Customer Website frontend (React + Tailwind)
with an already-built backend (Node.js/NestJS + PostgreSQL). Both exist and are
functioning independently — your only job is to connect the frontend's screens
to the real backend API calls described in the build plan I give you.

Hard rules:
1. Do NOT modify, add, or "improve" any backend code, route, or schema. If you
   believe an endpoint is missing or doesn't match what a screen needs, STOP
   and tell me exactly what's missing — do not invent a new endpoint or
   fabricate a response shape to make the frontend work.
2. Do NOT redesign or restyle any existing frontend screen. Only add/modify the
   data-fetching, state, and event-handling code needed to call the real API
   and render its real response — the visual design stays as-is.
3. Before wiring a screen, find and reuse the site's existing API-client
   pattern (whatever HTTP client, hooks, or service layer already exists) —
   don't introduce a second, competing way of calling the API.
4. Work strictly in the day order I give you from the build plan. After each
   day's task, tell me: which endpoint(s) you wired, which file(s) you
   touched, and any mismatch you found between the real API response and what
   the screen expected — I need to know about contract mismatches, not have
   them silently patched around.
5. Never trust a client-side "success" callback for anything payment-related —
   always reflect the webhook-confirmed/server-confirmed state, and tell me if
   a screen currently does trust a client callback so I know it needs fixing.
6. If a screen has no error/loading/empty state today, add one — but flag it
   to me as a gap you filled, don't do it silently.
7. When you finish a day's task, do not proceed to the next day until I confirm.

I will give you one phase of the build plan at a time. Confirm you understand
before I paste the first phase.
```

---

## Things to verify before/during integration — possible gaps in the backend plan

I haven't seen the backend's actual code, only its build plan document — these are gaps *in the plan's description*, not confirmed missing in the implementation. Worth a quick check before you rely on them:

1. **Customer-facing "create support ticket" endpoint.** `11-CUSTOMER-SUPPORT-PANEL-BUILD-PLAN.md` lists "Receives from ← Customer Web/App (ticket submissions)" as a data flow, but `02-BACKEND-BUILD-PLAN.md` Day 60 only describes the internal ticketing schema — there's no explicit `POST /support/tickets` (customer-facing) listed. Confirm it exists before wiring a "Contact Us" form to it.
2. **Customer-facing "list my notifications" read endpoint.** Day 25 sets up push/email triggers (outbound only). If the website has an in-app notification bell/center, confirm there's a `GET /customer/notifications` (or similar) to read past notifications — the plan as written only covers sending, not a readable history.
3. **Guest-cart → logged-in-cart merge.** Day 19's cart module says "cross-device persistence" but doesn't explicitly describe merge behavior when a guest with an active cart logs in mid-session. Confirm the behavior (merge vs. overwrite vs. prompt) is actually implemented before assuming it.
4. **Account deletion / data export.** Not mentioned anywhere in the backend plan. If Indian e-commerce/consumer-protection compliance or your own policy requires a customer-initiated data-deletion or data-export flow, it isn't accounted for — worth confirming with whoever owns compliance sign-off.
5. **Guest order tracking (no login).** Not explicitly covered — if the site is meant to let a guest track an order via order-ID + mobile without logging in, confirm that lookup path exists; Day 27's order APIs are described as "admin-facing" plus the standard customer My Orders flow, not an explicit guest-tracking endpoint.
6. **Sitemap.xml / robots.txt generation.** Day 14 covers per-page SEO metadata but not a sitemap-generation endpoint/job — check whether this is handled elsewhere (e.g. build-time, not runtime) before assuming it's missing.

None of these block starting integration — they only affect Phases 5, 6, and 7 above. Flag them to your backend dev early so you're not blocked mid-phase.
