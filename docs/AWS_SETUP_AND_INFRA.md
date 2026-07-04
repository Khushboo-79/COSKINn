# AWS Setup & Infrastructure — From Zero

This is the exact sequence to go from "no AWS account resources exist" to "staging and production environments are live and every build plan's AWS dependency (RDS, S3, CloudFront, ECS, Secrets Manager, SES, Lambda, CloudWatch) is real." Read this alongside `GIT_SETUP_AND_WORKFLOW.md` — GitHub Actions in that doc deploy *into* the infrastructure created here.

**Owner:** DevOps Engineer. **When to run this:** in parallel with Backend Phase 1 (Days 1–12), so staging infra exists before Backend Phase 2 needs to deploy anything real.

---

## 1. Account & IAM foundation

1. Create (or use) one AWS account for the org. For a team this size, **two environments in one account, separated by naming/tags** (`coskinn-staging-*`, `coskinn-prod-*`) is simpler than separate accounts — revisit AWS Organizations/multi-account only if compliance later requires it.
2. Enable **MFA on the root user**, then never use the root user again for day-to-day work.
3. Create an IAM Identity Center (or IAM) user per DevOps team member with least-privilege policies; no shared logins.
4. Create IAM roles (not long-lived keys) for automation:
   - `coskinn-github-actions-oidc` — trusted via GitHub's OIDC provider (Step 9), scoped to only the actions each workflow needs (ECR push, ECS deploy, S3 sync, CloudFront invalidate).
   - `coskinn-ecs-task-execution-role` — pulls images from ECR, reads secrets from Secrets Manager, writes logs to CloudWatch.
   - `coskinn-ecs-task-role` — the backend app's own runtime permissions (S3 read/write for media, SES send, Lambda invoke).
5. Set an AWS Budget with alerts (e.g. 50%/80%/100% of a monthly threshold) so cost surprises surface early.

## 2. Networking (VPC)

1. Create one VPC per environment (`coskinn-staging-vpc`, `coskinn-prod-vpc`), or one VPC with staging/prod subnets if keeping it simple — CIDR e.g. `10.0.0.0/16`.
2. Create public subnets (2 AZs, for ALB/NAT) and private subnets (2 AZs, for ECS tasks + RDS + ElastiCache).
3. Internet Gateway on the public subnets; NAT Gateway (1 per environment is fine to start) so private-subnet ECS tasks can reach the internet (Razorpay/ShadowFox/FCM APIs) without being publicly reachable themselves.
4. Security groups:
   - `alb-sg` — inbound 443 from `0.0.0.0/0`.
   - `ecs-backend-sg` — inbound only from `alb-sg` on the app port (3000).
   - `rds-sg` — inbound only from `ecs-backend-sg` on 5432.
   - `redis-sg` — inbound only from `ecs-backend-sg` on 6379.

## 3. Database — RDS PostgreSQL

1. Create an RDS PostgreSQL instance per environment:
   - Staging: single-AZ, smallest instance class that fits (e.g. `db.t4g.micro`/`small`) — matches the "RDS staging" row in the environments table.
   - Production: **Multi-AZ**, `db.t4g.medium` or larger depending on load-test results (Backend Day 66), automated backups (7–35 day retention), storage autoscaling on.
2. Place both in the private subnets, `rds-sg` only.
3. Enable encryption at rest (KMS) — matches the AES-256-at-rest non-functional target in the backend plan.
4. Store the connection string in Secrets Manager (Step 7), never in `.env` for staging/prod.
5. This is what Backend Day 1–2 (`docker-compose.yml` locally, Prisma migrations against a real DB in staging) connects to once deployed.

## 4. Cache/Queue — ElastiCache Redis

1. Create one ElastiCache Redis cluster per environment (used for OTP storage, cart cache, and BullMQ job queues per the backend plan).
2. Private subnets, `redis-sg` only, encryption in transit + at rest enabled.

## 5. Container registry & compute — ECR + ECS Fargate

1. Create one ECR repository: `coskinn-backend`.
2. Create an ECS Cluster per environment (`coskinn-staging`, `coskinn-prod`), Fargate launch type (no EC2 to manage).
3. Write the backend `Dockerfile` (Backend Day 1) and confirm it builds locally before wiring CI.
4. Create an ECS Task Definition referencing the ECR image, `coskinn-ecs-task-execution-role`, `coskinn-ecs-task-role`, and injecting environment variables **from Secrets Manager** (not plaintext) for DB URL, Redis URL, JWT secret, Razorpay keys, ShadowFox keys, AWS SES/S3 config, FCM server key.
5. Create an Application Load Balancer + target group in front of the ECS service, HTTPS listener (cert from Step 8).
6. Create the ECS Service (staging: 1 task; prod: 2+ tasks across AZs, auto-scaling policy on CPU/memory — matches "ECS (prod, auto-scaled)" in the environments table).
7. This is the target of `deploy-backend.yml` in `GIT_SETUP_AND_WORKFLOW.md` §7.

## 6. Static hosting — S3 + CloudFront

Create **three** separate S3 bucket + CloudFront distribution pairs (one per static frontend), per environment:

| Bucket | Fronts | CloudFront notes |
|---|---|---|
| `coskinn-web-{env}` | `apps/customer-web` build output | Public, standard CDN caching |
| `coskinn-internal-panel-{env}` | `apps/internal-panel` build output | Restrict via CloudFront + WAF IP allow-list or a VPN-gated origin, per the environments table ("VPN/IP-gated") |
| `coskinn-media-{env}` | Product images/videos, review media, return-proof uploads (S3 presigned upload target from Backend Day 8) | Public-read for product media (via CloudFront), private/signed-URL for sensitive uploads (return proof, HR/employee documents) |

1. Buckets: block all public access at the bucket level; CloudFront uses an Origin Access Control (OAC) to read from S3, so nothing is public except through CloudFront.
2. CloudFront: one distribution per bucket above, HTTPS-only, custom domain + ACM cert (Step 8), cache invalidation triggered by `deploy-web.yml` / `deploy-internal-panel.yml`.
3. Customer App (`apps/customer-app`) does **not** get an S3/CloudFront pair — it ships via TestFlight/Play Store per `deploy-app.yml`, not static hosting.

## 7. Secrets — AWS Secrets Manager

1. Create one secret per environment holding all backend runtime config as a single JSON blob (or split logically): DB URL, Redis URL, JWT signing secret, Razorpay key/secret, ShadowFox API key, AWS SES/S3 credentials scoped via IAM role instead of keys where possible, FCM server key.
2. Grant `coskinn-ecs-task-execution-role` read access to exactly these secrets, nothing else.
3. Grant the GitHub Actions OIDC role (Step 9) permission to read only what a given workflow needs — most workflows don't need secret read access at all if secrets are injected at the ECS task level, not baked into the image.
4. Rotate the JWT signing secret and Razorpay/ShadowFox keys on a schedule; document the rotation runbook here once decided.

## 8. Domains & TLS — Route 53 + ACM

1. Register or point the domain's nameservers to Route 53.
2. Create ACM certificates (in `us-east-1` if used by CloudFront, or the ALB's region for the ALB listener) for: `coskinn.com` / `www` (customer web), `api.coskinn.com` (backend ALB), `panel.coskinn.com` (internal panel, staging + prod), plus `staging.` subdomains for each.
3. Route 53 records: ALIAS records to the ALB (API) and to each CloudFront distribution (web, internal panel).

## 9. CI/CD trust — GitHub OIDC

1. Add GitHub's OIDC identity provider to IAM (one-time, per AWS account) so GitHub Actions can assume `coskinn-github-actions-oidc` **without storing any long-lived AWS access keys in GitHub Secrets** — matches `GIT_SETUP_AND_WORKFLOW.md` §8.
2. Scope the role's trust policy to this repo (`repo:<your-org>/coskinn:*`) and, ideally, per-branch/per-environment conditions (e.g. only `main` can assume the prod-deploy variant of the role).
3. Reference this role's ARN in each `.github/workflows/*.yml` file's `permissions: id-token: write` + `aws-actions/configure-aws-credentials` step.

## 10. Email & push — SES + FCM

1. Verify the sending domain in Amazon SES, move out of the SES sandbox before go-live (needed for order-confirmation emails, OTP fallback, campaign emails from Backend Day 25/62).
2. Set up SPF/DKIM/DMARC DNS records in Route 53 for deliverability.
3. Firebase Cloud Messaging is a separate Google Cloud project, not AWS — just store its server key in Secrets Manager alongside the AWS secrets (Step 7).

## 11. Background jobs — Lambda / BullMQ

1. Scheduled jobs (low-stock alerts, near-expiry alerts, wallet/points expiry, birthday bonus, membership tier recalculation) can run either as **BullMQ repeatable jobs inside the ECS backend service** (simplest, no extra infra) or as **standalone Lambda functions on EventBridge schedules** if you want them isolated from the main app's uptime.
2. Recommendation for this team size: start with BullMQ inside the backend (Redis already provisioned in Step 4); revisit Lambda only if a specific job needs to scale independently.

## 12. Observability — CloudWatch

1. ECS task logs → CloudWatch Logs (configured in the task definition, no extra setup).
2. CloudWatch Alarms: ECS CPU/memory high, RDS CPU/storage/connections high, ALB 5xx rate, ECS service task-count-below-desired.
3. Route alarms to an SNS topic → email/Slack for the DevOps on-call.
4. This is the "CloudWatch centralized logging" non-functional target referenced in the backend build plan.

## 13. Environment summary (matches `GIT_SETUP_AND_WORKFLOW.md` §9)

| Resource | Staging | Production |
|---|---|---|
| VPC | `coskinn-staging-vpc` | `coskinn-prod-vpc` (or shared VPC, separate subnets) |
| RDS | Single-AZ, small instance | Multi-AZ, load-tested instance size |
| ElastiCache | Single node | Replicated |
| ECS | 1 task, no auto-scale | 2+ tasks, auto-scaled |
| S3/CloudFront | `*-staging` buckets/distributions | `*-prod` buckets/distributions |
| Internal panel access | VPN/IP-gated | VPN/IP-gated |
| Secrets Manager | `coskinn/staging/*` | `coskinn/prod/*` |
| Domain | `staging.coskinn.com`, `staging-api.coskinn.com` | `coskinn.com`, `api.coskinn.com` |

## 14. Order of operations (map to Backend Build Plan days)

```
Before Backend Day 1  → Steps 1–2 (IAM, VPC) for staging
By Backend Day 2      → Step 3 (RDS staging) so real Prisma migrations can run against it
By Backend Day 10     → Step 4 (Redis staging) for OTP storage
By Backend Day 12     → Steps 5, 7, 9 (ECS + Secrets + OIDC) so CI can deploy staging on every merge
By Backend Day 16     → Step 6 (S3/CloudFront staging) so Customer Web/App staging builds are reachable
By Backend Day 24     → Step 10 (SES) so order-confirmation emails work in staging
By Backend Day 67     → Production variants of every step above, per PRD/backend Phase 6 (Days 64–72) hardening & go-live checklist
```

This document, together with `GIT_SETUP_AND_WORKFLOW.md` and `00-BACKEND-BUILD-PLAN.md`, is what DevOps needs before any environment beyond local Docker Compose can go live.
