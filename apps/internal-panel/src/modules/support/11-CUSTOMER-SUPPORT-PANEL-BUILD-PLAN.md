# COSKINn — Customer Support Panel Build Plan (React + Tailwind)

**Repo path:** `apps/internal-panel/src/modules/support`
**Stack:** React + Tailwind CSS · shared `packages/ui` component library · React Query · React Hook Form + Zod · WebSocket client (live chat) · shared route shell (login, nav, layout) inside `apps/internal-panel`
**Depends on backend:** `auth/RBAC` (`02-BACKEND-BUILD-PLAN.md` Day 9), `orders`/`returns` modules (Days 22–27, 37–39), `Customer Support schema + ticketing` module (Day 60), `live chat + SLA tracking + email/WhatsApp/call-log integration` module (Day 61)
**Connects to panels** (per `00-PANEL-CONNECTIVITY-MAP.md` §2):
- **Sends to →** Order Management Panel (status updates from resolved complaints), Returns module (return/refund actions initiated on customer's behalf)
- **Receives from ←** Order Management Panel (order lookup), Returns module (return status), Customer Web/App (ticket submissions)

All of the above happens only through backend APIs — this panel never calls Order Management directly.

Per the build-order dependency chain (`00-PANEL-CONNECTIVITY-MAP.md` §4), this panel builds after Order Management and alongside Inventory/Warehouse (Phase 3) since it needs orders and returns data to be real before ticket-to-order linking is meaningful — it does not need to wait for Phase 5.

| Day | Tasks | Backend dependency |
|---|---|---|
| 1 | Scaffold routed module at `apps/internal-panel/src/modules/support`; RBAC guard for `support` role; wire into shared internal-panel shell (login/nav/layout) | Backend Day 9 (RBAC) |
| 2 | Ticket list screen — search/filter by ticket ID, customer, status, category, priority, assigned agent, date range | Backend Day 60 |
| 3 | Ticket detail screen — full conversation thread, customer info, linked order (if any), status/priority controls | Backend Day 60 |
| 4 | Complaint category configuration and tagging — order, payment, return, refund, damaged, wrong item, expired, allergic reaction (fixed taxonomy per Build Form §6.9), category-based routing | Backend Day 60 |
| 5 | Order lookup widget on ticket screen — pulls order snapshot (items, status, payment, shipment) into the ticket view for context, read-only cross-reference | Backend Day 27, cross-panel: Order Management Panel |
| 6 | Return status widget on ticket screen — pulls linked return/refund status into the ticket view | Backend Day 38–39, cross-panel: Returns module |
| 7 | Internal notes screen — agent-only notes on a ticket, not visible to customer, timestamped and attributed | Backend Day 60 |
| 8 | Escalation workflow — escalate ticket to a senior agent/manager, escalation reason, SLA-clock behavior on escalation | Backend Day 61 |
| 9 | Live chat screen part 1 — WebSocket connection, agent-side chat UI, active-conversation queue | Backend Day 61 |
| 10 | Live chat screen part 2 — chat-to-ticket conversion, chat transcript attachment to ticket, canned-response snippets | Backend Day 61 |
| 11 | Email integration screen — inbound/outbound email threading tied to a ticket | Backend Day 61 |
| 12 | WhatsApp integration screen — inbound/outbound WhatsApp message log tied to a ticket | Backend Day 61 |
| 13 | Call log screen — manual call-log entry (call outcome, duration, notes) tied to a ticket | Backend Day 61 |
| 14 | SLA tracking dashboard — first-response and resolution SLA timers per ticket, breach flagging, team-level SLA compliance view | Backend Day 61 |
| 15 | Action-back-to-order screen — agent-initiated status update pushed to Order Management (e.g. mark resolved-and-confirmed-delivered) and return/refund actions initiated on the customer's behalf, both RBAC-gated | Backend Day 27, 38–39, cross-panel: Order Management Panel, Returns module |
| 16 | Agent performance/workload dashboard — tickets resolved, average handle time, SLA compliance per agent | Backend Day 61 (aggregate) |
| 17 | Accessibility pass (WCAG 2.1 AA on internal-panel forms), live-chat reconnect/offline handling, RBAC edge-case testing (agent vs supervisor/escalation roles) | — |
| 18 | Integration test against staging backend, bug fixes, staging sign-off | All above |

**Compliance/data-integrity note:** any action this panel takes that changes order or return state (Day 15) must go through the same backend endpoints Order Management and Returns modules expose — this panel must never write directly to `orders`/`returns` tables, so that Order Management's status-history audit trail stays the single source of truth even when the change originates from a support ticket.

**Definition of done:** every complaint category in Build Form §6.9 is supported end-to-end, live chat works with reconnect handling and converts cleanly to a persisted ticket, SLA timers are accurate and breach-flagged, email/WhatsApp/call-log integrations attach correctly to tickets, and any order/return action an agent takes from this panel is reflected in Order Management with full audit attribution back to the originating ticket.
