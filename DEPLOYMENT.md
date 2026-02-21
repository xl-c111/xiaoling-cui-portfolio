# Deployment Runbook (Vercel)

This document defines the standard deployment process for this portfolio project.

## 1. Deployment Model

- Platform: Vercel
- Framework: Next.js (App Router)
- CI checks (GitHub Actions): `pnpm lint`, `pnpm build`, `pnpm smoke`
- CD strategy:
  - Preview deployments for pull requests
  - Production deployment from `main`

## 2. Prerequisites

- GitHub repository connected in Vercel (`Connected Git Repository`)
- Vercel project created and linked to this repository
- Dependencies install cleanly with lockfile:
  - `pnpm install --frozen-lockfile`

## 3. Standard Release Flow (Recommended)

1. Create a branch and open a pull request.
2. Ensure CI passes in GitHub Actions:
   - `Lint`
   - `Build`
   - `Smoke tests`
3. Review the Vercel Preview deployment URL.
4. Merge to `main`.
5. Confirm automatic production deployment in Vercel.

## 4. Local Pre-Deploy Gate

Run this before opening or merging a PR:

```bash
pnpm check
```

`pnpm check` runs:
- `pnpm lint`
- `pnpm build`
- `pnpm smoke`

## 5. Manual Deployment (Fallback)

Use only if automatic Git-based deployment is unavailable.

```bash
vercel login
pnpm preview      # Preview deploy
pnpm deploy       # Production deploy
```

Equivalent commands:
- `vercel`
- `vercel --prod`

## 6. Post-Deployment Verification

After production deploy, verify:

1. Site loads at the production URL.
2. Core routes return 200:
   - `/`
   - `/portfolio`
   - `/project/flora`
3. Page metadata renders correctly (Open Graph + canonical base domain).
4. No critical errors in Vercel runtime logs.

## 7. Rollback

In Vercel:

1. Open `Deployments`
2. Select the last known good deployment
3. Redeploy (promote) that version to production

If rollback was caused by a bad merge, also revert the offending commit in GitHub.

## 8. Environment and Secrets

This project currently builds without required runtime secrets.

If secrets are added in the future:

1. Add them in Vercel Project Settings -> Environment Variables
2. Scope correctly (`Preview` / `Production`)
3. Never commit `.env*` files

## 9. Troubleshooting

### Build fails in Vercel

- Re-run locally: `pnpm build`
- Ensure lockfile is committed and up to date
- Check Next.js/TypeScript errors in Vercel build logs

### Smoke test fails

- Re-run locally: `pnpm smoke`
- Confirm app starts with `pnpm start -p 4010`
- Verify route regressions in `app/` and `lib/data/projects.ts`

### Stale route/type errors after route-group rename

- Clear build cache and retry:

```bash
rm -rf .next
pnpm build
```

## 10. Ownership Notes

- Keep CI green as a merge requirement for `main`
- Prefer Git-based deployments over manual CLI deploys
- Treat this file as the source of truth for deployment operations
