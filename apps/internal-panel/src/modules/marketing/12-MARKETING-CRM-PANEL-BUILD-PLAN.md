# COSKINn — Marketing / CRM Panel Build Plan (React + Tailwind)

**Repo path:** `apps/internal-panel/src/modules/marketing`
**Stack:** React + Tailwind CSS · shared `packages/ui` component library · React Query · React Hook Form + Zod · shared route shell (login, nav, layout) inside `apps/internal-panel`
**Depends on backend:** `auth/RBAC` (`02-BACKEND-BUILD-PLAN.md` Day 9), `Marketing/CRM module` — banners, campaigns, push/email/SMS/WhatsApp sending, abandoned-cart recovery, influencer/affiliate tracking (Day 62), plus read access into `product` (Days 5–8), `order` (Days 22–27), `membership` (Days 50–51), `bonus`/`referral`/`rewards`/`offers` (Days 44–52) modules it configures
**Connects to panels** (per `00-PANEL-CONNECTIVITY-MAP.md` §2):
- **Sends to →** Customer Web/App (banners, offers, campaigns), Product Management Panel (which SKUs to feature)
- **Receives from ←** Product Management Panel (catalog feed), Order Management Panel (abandoned cart data), Membership module (tier-targeted campaigns)

All of the above happens only through backend APIs — this panel never calls Product Management or Order Management directly.

Per the build-order dependency chain (`00-PANEL-CONNECTIVITY-MAP.md` §4), this is Phase 5 work — it can't ship its full feature set until Backend Phase 4 (wallet/bonus/referral/rewards/offers/membership, Days 41–52) and the Day 62 Marketing/CRM module are live, since every configuration screen here writes the rules that Customer Web/App's loyalty surfaces read. It also backfills the Day 16 homepage banner stub that Customer Web/App and Customer App were built against from Day 6 onward.

| Day | Tasks | Backend dependency |
|---|---|---|
| 1 | Scaffold routed module at `apps/internal-panel/src/modules/marketing`; RBAC guard for `marketing` role; wire into shared internal-panel shell (login/nav/layout) | Backend Day 9 (RBAC) |
| 2 | Banner management screen — create/edit/schedule homepage and category banners, image upload, active-date-range, backfills the Customer Web/App Day 6/16 banner stub | Backend Day 62 |
| 3 | Homepage section management screen — reorder/toggle hero, category rail, fruit-concern rail, featured-products sections | Backend Day 62, 16 |
| 4 | Coupon creation screen — code/rules setup (percent/flat, min-order, category/product scope, usage limits, validity window) | Backend Day 21, 62 |
| 5 | Product feed / "SKUs to feature" screen — consumes Product Management Panel's product-feed endpoint, filterable by fruit/concern/category, feeds homepage/offer placements | Backend Day 62, cross-panel: Product Management Panel Day 11 |
| 6 | Campaign creation screen part 1 — campaign setup (name, goal, audience segment, date range), examples per PRD §20.2 (Fruit Glow Launch Sale, Mango Moisture Week, etc.) | Backend Day 62 |
| 7 | Campaign creation screen part 2 — link campaign to coupon/offer/bonus rules, campaign performance dashboard (reach, redemptions, revenue) | Backend Day 62, 45, 52 |
| 8 | Push notification screen — compose/schedule/send, audience targeting, Firebase Cloud Messaging delivery status | Backend Day 62, 25 |
| 9 | Email campaign screen — compose/schedule/send, template support, open/click tracking | Backend Day 62 |
| 10 | SMS campaign screen and WhatsApp campaign screen — compose/schedule/send, delivery status | Backend Day 62 |
| 11 | Abandoned-cart recovery screen — view abandoned carts pulled from Order Management, trigger recovery push/email/SMS/WhatsApp sequence, recovery-rate dashboard | Backend Day 62, cross-panel: Order Management Panel (abandoned cart data) |
| 12 | Referral program configuration screen — payout rules, welcome-discount config, one-credit-per-device/mobile fraud-check settings (read/configure; ledger itself lives in backend) | Backend Days 46–47 |
| 13 | Bonus & Reward Points campaign configuration screen — birthday multiplier, campaign multiplier events, sale-window redemption lockout config | Backend Days 45, 49 |
| 14 | Offers engine configuration screen — scope by category/product/payment-method/tier, homepage offers, best-offer auto-apply rule setup | Backend Day 52 |
| 15 | Membership-tier-targeted campaign screen — segment campaigns by membership tier, consumes Membership module tier data | Backend Days 50–51, cross-panel: Membership module |
| 16 | Influencer tracking screen — influencer profile, unique tracking code/link, referred-order attribution, payout summary | Backend Day 62 |
| 17 | Affiliate tracking screen — affiliate profile, tracking link/code, commission-rule config, payout summary | Backend Day 62 |
| 18 | Marketing performance dashboard — campaign-level and channel-level (push/email/SMS/WhatsApp) performance rollup, coupon usage report | Backend Day 62, 55 (feeds Finance/Auditor read access) |
| 19 | Accessibility pass (WCAG 2.1 AA on internal-panel forms), send-throttling/rate-limit safeguards on push/email/SMS/WhatsApp, RBAC edge-case testing | — |
| 20 | Integration test against staging backend — full pipeline banner/campaign/coupon creation → live on Customer Web/App → redemption tracked back here; bug fixes, staging sign-off | All above |

**Compliance/data-integrity note:** every loyalty-affecting configuration this panel writes (bonus multipliers, reward-points rates/caps, referral payout rules, offer stacking) must go through the same backend modules Wallet/Bonus/Referral/Rewards/Offers own (`02-BACKEND-BUILD-PLAN.md` Days 41–52) — this panel is a configuration surface for those rules, not a second source of truth, so a rule change here must never be writable directly to `wallet_ledger`/`reward_points_ledger`/`referrals` tables. Push/email/SMS/WhatsApp sends must respect consent/opt-out flags on the customer record.

**Definition of done:** every feature in PRD §20.1 (banner, homepage section, coupon, campaign, push/email/SMS/WhatsApp, referral, loyalty, abandoned-cart recovery, product-launch campaign, influencer, affiliate) is live against real backend data, banners/offers/campaigns configured here appear correctly on Customer Web/App with no manual step, the abandoned-cart and campaign-performance dashboards reflect live Order Management and loyalty-module data, and no screen in this panel can write directly to a loyalty ledger table.
