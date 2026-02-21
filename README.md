# Xiaoling Cui Portfolio Website

[![CI](https://github.com/xl-c111/xiaoling-cui-portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/xl-c111/xiaoling-cui-portfolio/actions/workflows/ci.yml)

Personal portfolio website built with Next.js (App Router), showcasing projects, experience, education, and contact details with a clean, responsive UI.

Live: https://xiaoling-cui-portfolio.vercel.app/

## Highlights
- Single-page section navigation + dedicated routes
- Project portfolio with detail pages
- Responsive design (desktop + mobile)
- Optimized images (WebP) and performance-focused UI

## Tech Stack
- Next.js 16, React 19, TypeScript
- Tailwind CSS 4
- Radix UI + shadcn/ui
- Framer Motion
- Vercel Analytics

## Local Development
Recommended: use `pnpm` (the repo includes `pnpm-lock.yaml`).

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000`.

If you prefer npm:

```bash
npm install --legacy-peer-deps
npm run dev
```

## Scripts

```bash
pnpm dev                  # Start dev server
pnpm build                # Build for production
pnpm start                # Start production server
pnpm lint                 # Lint
pnpm smoke                # Smoke-test key routes on production server
pnpm test                 # Alias for smoke tests
pnpm check                # Lint + build + smoke
pnpm optimize-images      # Optimize images in public/
pnpm run preview          # Vercel preview deploy
pnpm run deploy           # Vercel production deploy
```

## Testing and CI
- Smoke tests are defined in `scripts/smoke-test.mjs`.
- The smoke suite checks core routes: `/`, `/portfolio`, and `/project/flora`.
- GitHub Actions workflow is in `.github/workflows/ci.yml` and runs on push to `main` and on pull requests:
  - `pnpm lint`
  - `pnpm build`
  - `pnpm smoke`

## Project Structure
- `app/` Next.js routes, layout, globals
- `components/ui/` shared shadcn/ui primitives
- `components/sections/` page section components
- `public/` static assets (images, PDFs)
- `lib/` shared utilities and structured data (`lib/data/projects.ts`)
- `scripts/` build and smoke-test utilities
- `tests/` reserved for broader automated test suites

### Route Layout (App Router)
```text
app/
  layout.tsx
  globals.css
  (public)/
    page.tsx                 -> /
    about/page.tsx           -> /about
    portfolio/page.tsx       -> /portfolio
    experience/page.tsx      -> /experience
    education/page.tsx       -> /education
    additional/page.tsx      -> /additional
    contact/page.tsx         -> /contact
  project/
    [slug]/page.tsx          -> /project/:slug
```

`(public)` is a route group for organization only. It does not appear in the URL.

## Deployment
See `DEPLOYMENT.md` for Vercel deployment steps, optimization notes, and troubleshooting.

## License
This repository is provided for portfolio use. If you’d like to reuse parts of it, please reach out first.
