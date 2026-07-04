# Git & GitHub Setup — From Zero

This is the exact sequence to go from "nothing exists" to "team is pushing code into one shared repository with 13+ people/panels working without stepping on each other."

## 1. Create the GitHub repository

1. On GitHub: **New repository** → name `coskinn` → Private → do **not** initialise with a README (we'll push our own structure) → Create.
2. On your machine:
```bash
mkdir coskinn && cd coskinn
git init
git branch -M main
git remote add origin https://github.com/<your-org>/coskinn.git
```
3. Add a `.gitignore` (Node + React Native + NestJS):
```
node_modules/
dist/
build/
.env
.env.*
!.env.example
*.log
.DS_Store
ios/Pods/
android/app/build/
coverage/
.turbo/
```
4. Scaffold the folder structure from the README (`apps/`, `backend/`, `packages/`, `infra/`, `docs/`), add a placeholder `.gitkeep` in empty folders, then:
```bash
git add .
git commit -m "chore: initial monorepo scaffold"
git push -u origin main
```

## 2. Monorepo tooling

Use **npm/yarn workspaces + Turborepo** (all JS/TS, no need for Nx's extra complexity):

`package.json` (root):
```json
{
  "private": true,
  "workspaces": ["apps/*", "backend", "packages/*"],
  "scripts": {
    "dev": "turbo run dev",
    "build": "turbo run build",
    "lint": "turbo run lint",
    "test": "turbo run test"
  },
  "devDependencies": { "turbo": "^2.0.0" }
}
```
This lets `packages/ui` and `packages/types` be imported directly by `apps/customer-web` and `apps/internal-panel` without publishing to npm, and lets CI run `turbo run build` once and only rebuild what changed.

## 3. Branching model

**Trunk-based with short-lived feature branches** (simplest model that scales to a team of 8–10 without release-train overhead):

- `main` — always deployable. Protected: no direct pushes, requires 1 PR approval + passing CI.
- `develop` — optional integration branch if you want a staging environment ahead of `main`. If the team is small, skip it and deploy `main` straight to staging on every merge.
- Feature branches: `feature/<panel-or-app>/<short-desc>` e.g. `feature/inventory-panel/low-stock-alerts`, `feature/backend/wallet-ledger-api`.
- Fix branches: `fix/<area>/<short-desc>`.
- One PR per feature branch, squash-merged into `main`.

## 4. Folder ownership → who commits where (avoids merge conflicts)

| Folder | Owner(s) | Notes |
|---|---|---|
| `backend/src/modules/*` | Backend devs | Split further by domain module (auth, product, order, payment, wallet, etc.) |
| `apps/customer-web` | React dev(s) | |
| `apps/customer-app` | React Native dev | |
| `apps/internal-panel/src/modules/<panel>` | One dev per panel where possible | Each panel build-plan doc names its exact module path |
| `packages/ui`, `packages/types` | Whoever touches shared components/types, PR-reviewed by design lead | Breaking changes here affect every app — treat with care |
| `infra/` | DevOps | |
| `docs/` | PM/BA, updated by whoever changes scope | |

Because every internal panel has its **own subfolder** (`apps/internal-panel/src/modules/<panel-name>/`) with its own routes/components/api-hooks, two developers working on, say, Inventory and Warehouse rarely touch the same file — the only shared files are the route registry and the shared `packages/ui` components.

## 5. Commit convention

Use **Conventional Commits** so changelogs and CI can key off them:
```
feat(inventory): add low-stock alert widget
fix(backend/orders): correct GST rounding on invoice
docs(build-plan): update warehouse panel day 34-36 tasks
chore(ci): add lint step for customer-app
```
Format: `<type>(<scope>): <description>` — scope = app/panel/module name.

## 6. Pull Request checklist (put this in `.github/pull_request_template.md`)

```markdown
## What changed
## Which panel/app/module
## Backend API dependency (if any) — endpoint + status (ready/mocked)
## Screenshots (for UI changes)
## Checklist
- [ ] Linked to a task in the relevant build-plan doc (Day #)
- [ ] Lint + tests pass locally
- [ ] No secrets/env values committed
- [ ] RBAC/role guard added for new internal-panel routes (if applicable)
```

## 7. CI/CD (GitHub Actions, in `.github/workflows/`)

- `ci.yml` — on every PR: install → lint → typecheck → test → build, scoped per-package via Turborepo so only changed apps rebuild.
- `deploy-backend.yml` — on merge to `main`, build Docker image → push to ECR → deploy to ECS Fargate (via CodePipeline or Actions).
- `deploy-web.yml` — build `customer-web` → sync to S3 → invalidate CloudFront.
- `deploy-internal-panel.yml` — same pattern as web, separate S3/CloudFront distribution behind IP allow-list/VPN if required.
- `deploy-app.yml` — Fastlane lanes triggered from Actions for TestFlight/Play internal testing tracks.

## 8. Secrets

- Local dev: `.env` files (gitignored), `.env.example` committed with dummy values so new devs know what's required.
- CI/CD & production: **AWS Secrets Manager**, injected into ECS task definitions and GitHub Actions via OIDC (no long-lived AWS keys stored in GitHub).

## 9. Environments

| Env | Backend | Web | App | Internal Panel | DB |
|---|---|---|---|---|---|
| Local | `localhost:3000` (NestJS) via Docker Compose (Postgres+Redis) | `localhost:5173` | Metro bundler, dev build | `localhost:5174` | Local Postgres container |
| Staging | ECS (staging cluster) | S3+CloudFront (staging) | TestFlight / Play Internal | S3+CloudFront (staging, VPN-gated) | RDS staging |
| Production | ECS (prod, auto-scaled) | S3+CloudFront (prod) | App Store / Play Store | S3+CloudFront (prod, VPN/IP-gated) | RDS Multi-AZ prod |

Add a root `docker-compose.yml` bringing up Postgres + Redis + backend locally so every dev can `docker compose up` on Day 1 without installing Postgres natively.

## 10. Day-1 team onboarding steps

```bash
git clone https://github.com/<your-org>/coskinn.git
cd coskinn
cp backend/.env.example backend/.env      # fill in local secrets
docker compose up -d                      # postgres + redis
npm install                               # installs all workspaces
npm run dev --workspace=backend           # or: turbo run dev --filter=backend
```

This document, together with `00-BACKEND-BUILD-PLAN.md`, is what a new developer should read before writing any code.
