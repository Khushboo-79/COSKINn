# COSKINn — Customer Mobile App Build Plan (React Native)

**Repo path:** `apps/customer-app`
**Stack:** React Native CLI · TypeScript · Redux Toolkit · React Navigation · Axios · Secure storage (Keychain/Keystore) for tokens · Firebase Cloud Messaging (push) · Razorpay React Native SDK · Fastlane (TestFlight/Play Internal)
**Depends on backend:** `auth`, `catalog`, `cart`, `wishlist`, `orders`, `payments`, `shipping`, `returns`, `wallet`, `bonus`, `referral`, `rewards`, `offers`, `membership`, `content` — see `02-BACKEND-BUILD-PLAN.md` for exact day numbers.
**Connects to panels:** same as Customer Website (`00-PANEL-CONNECTIVITY-MAP.md` §3) — Product Management (catalog), Order Management (order status), Customer Support (tickets), Marketing/CRM (banners/offers), Content (blog/tips). All traffic goes through the shared backend; the app never calls `apps/customer-web` or any internal panel directly.
**Shares code with:** `packages/ui` design tokens are mirrored (not directly imported — RN can't consume web components) into an RN-native component set in `apps/customer-app/src/components`; `packages/types` (TypeScript interfaces/DTOs) **is** shared directly with the web app and the backend, so a DTO shape change only needs to happen once.

This plan runs in parallel with `01-CUSTOMER-WEB-BUILD-PLAN.md` — same backend, same day-numbers, different developer(s), different repo folder. Build against mocked API responses before the matching backend day ships; swap once ready and note it in the PR per the pull-request checklist.

| Day | Tasks | Backend dependency |
|---|---|---|
| 1 | RN CLI scaffold inside `apps/customer-app`; TypeScript config; React Navigation stack/tab structure; Redux Toolkit store; Axios client with JWT-refresh interceptor + secure token storage | Backend Day 10 (auth) |
| 2 | Native design-system components (buttons, inputs, cards, badges) matching `packages/ui` tokens; theming (fruit-pastel palette) | — |
| 3 | Splash screen, Onboarding screens (fruit-based intro, skincare-by-concern, SPF/makeup glow) | — |
| 4 | Mobile-number login + OTP verification screens (native OTP autofill), refresh-token silent renewal, secure device registration | Backend Day 10 |
| 5 | Profile setup, skin type/concern selection, makeup preference screens | Backend Day 4 |
| 6 | Home dashboard: hero banner slot, category rail, fruit-concern rail (mocked banners until Day 62) | Backend Day 16 |
| 7 | Category & subcategory screens, Product Listing screen with filter/sort (separate Filter & Sort screens per app-navigation pattern, unlike web's inline panel) | Backend Day 16 |
| 8 | Product Detail screen: image/video gallery (native video player), ingredients, benefits, how-to-use, Shade Selection screen, Reviews screen | Backend Days 15–17 |
| 9 | Search screen (typo-tolerant, <1s), Ingredient Details screen, fruit-concern browsing | Backend Day 16 |
| 10 | Wishlist screen, Cart screen (cross-device persistence — same cart as web, keyed by logged-in user) | Backend Days 18–19 |
| 11 | Coupon screen, Address List + Add Address screen (native address autofill where available) | Backend Days 20–21 |
| 12 | Checkout flow: order summary, stacking rules for coupon + wallet + points | Backend Day 42, 48 |
| 13 | Razorpay Checkout integration (React Native SDK), payment success/failure handling, signature-verified confirmation | Backend Days 23–24 |
| 14 | Order Success screen, My Orders screen, Order Details screen, Track Order screen (ShadowFox status, native map/timeline UI) | Backend Days 22, 27, 35 |
| 15 | Cancel Order screen, Return Request screen (native camera/gallery picker for photo/video proof), Refund Status screen | Backend Days 37–39 |
| 16 | Reviews & ratings submission, Q&A submission | Backend Day 17 |
| 17 | Skin Quiz flow (multi-step native form) + Routine Builder results screen | Backend Day 21 |
| 18 | Beauty tips / blog screens, ingredient library screens (Content Panel output) | Backend Day 63 |
| 19 | **Loyalty ecosystem — Wallet**: balance widget on Home/Account, ledger screen, apply-wallet-at-checkout toggle | Backend Days 41–43 |
| 20 | **Bonus**: bonus history inside wallet ledger, tagged entries | Backend Days 44–45 |
| 21 | **Referral**: code/link screen with native share sheet (WhatsApp/SMS/social/copy-link), referral dashboard | Backend Days 46–47 |
| 22 | **Reward Points**: balance, ledger, apply-points-at-checkout | Backend Days 48–49 |
| 23 | **Membership**: tier badge, progress bar to next tier, benefits matrix screen | Backend Days 50–51 |
| 24 | **Offers**: Home offers/deals section, auto-applied best coupon banner at cart, tier-exclusive offer badges | Backend Day 52 |
| 25 | Notifications center (push via Firebase Cloud Messaging + in-app), Account Settings screen, legal pages (T&C, privacy, shipping, return/refund, cancellation, payment, cookie policy, disclaimers, grievance officer) | Backend Day 63 (content) |
| 26 | Customer Support entry point: ticket creation form, live chat widget (WebSocket, native chat UI) | Backend Days 60–61 |
| 27 | Accessibility pass (screen-reader labels, tap-target sizing), performance pass (list virtualization, image caching/lazy-load), crash-reporting setup | — |
| 28 | Device QA (iOS + Android, range of screen sizes/OS versions), Fastlane lanes to TestFlight + Play Internal Testing, staging sign-off | All above |

**Platform-specific notes not present in the web plan:**
- Push notifications (Firebase Cloud Messaging) and native share sheets are app-only; the web app uses browser notifications/web-share as a lighter equivalent — both call the same backend `push_notifications` table (Backend Day 25/62).
- Secure token storage uses iOS Keychain / Android Keystore instead of the web's httpOnly-cookie or memory-based token handling — coordinate token-refresh contract with the backend Auth module (Day 10) so both clients use the same refresh-token rotation rules.
- App builds go through `deploy-app.yml` (Fastlane → TestFlight/Play Internal) per `GIT_SETUP_AND_WORKFLOW.md` §7, not the S3/CloudFront pipeline used for web.

**Definition of done:** every FR-# in the PRD sections 4–6 (Core Shopping + Loyalty + Membership) has a corresponding native screen wired to a real, non-mocked endpoint, on both iOS and Android.
