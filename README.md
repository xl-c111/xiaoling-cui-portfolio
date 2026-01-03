# Xiaoling Cui Portfolio Website

Modern, performance-optimized personal portfolio built with Next.js and Tailwind CSS. The site showcases projects, experience, education, certifications, and contact details with a clean, responsive UI.

Live Site: https://xiaoling-cui-portfolio.vercel.app/

## Features
- Project portfolio with detailed project pages
- Experience, education, and certifications sections
- Optimized media assets for fast load times
- Responsive layout across desktop and mobile
- Vercel-ready deployment configuration

## Tech Stack
- Next.js 16 (App Router)
- React 19
- Tailwind CSS 4
- TypeScript
- Radix UI + shadcn/ui components
- Framer Motion

## Getting Started
Recommended: use `pnpm` (the repo includes a `pnpm-lock.yaml`).

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000` to view the site.

If you prefer npm:
```bash
npm install --legacy-peer-deps
npm run dev
```

## Scripts
```bash
pnpm dev         # Start dev server
pnpm build       # Build for production
pnpm start       # Start production server
pnpm lint        # Lint
pnpm optimize-images  # Optimize images in public/
pnpm preview     # Vercel preview deploy
pnpm deploy      # Vercel production deploy
```

## Project Structure
- `app/` Next.js routes and pages
- `components/` UI and section components
- `public/` static assets (images, PDFs)
- `lib/` shared utilities
- `hooks/` custom hooks

## Deployment
See `DEPLOYMENT.md` for Vercel deployment steps, optimization notes, and troubleshooting.
