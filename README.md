# Xiaoling Cui Portfolio Website

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
pnpm optimize-images       # Optimize images in public/
pnpm run preview          # Vercel preview deploy
pnpm run deploy           # Vercel production deploy
```

## Project Structure
- `app/` Next.js routes, layout, globals
- `components/` UI + page sections
- `public/` static assets (images, PDFs)
- `lib/` shared utilities
- `scripts/` build utilities (e.g. image optimization)

## Deployment
See `DEPLOYMENT.md` for Vercel deployment steps, optimization notes, and troubleshooting.

## License
This repository is provided for portfolio use. If you’d like to reuse parts of it, please reach out first.
