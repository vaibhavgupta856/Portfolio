# Vaibhav Gupta — Portfolio

Lusion-inspired animated portfolio with 3D sections, scroll tunnel, universe video background, and ambient music.

**Live site:** https://portfolio-pink-delta-48.vercel.app

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Build

```bash
npm run build
npm run preview
```

## Documentation

For a full technical write-up — architecture, features, assets, performance, and deployment — see:

**[docs/HOW_IT_WAS_BUILT.md](docs/HOW_IT_WAS_BUILT.md)**

## Tech Stack

- React 18 + TypeScript + Vite
- Tailwind CSS + Framer Motion + Lenis
- React Three Fiber / Three.js (connectors, tunnel, globe)
- Rive (hero CTA spaceship)

## Customize

Edit `src/data/portfolio.ts` for personal info, projects, experience, and skills.

## Deploy

```bash
# Vercel (production)
npx vercel deploy --prod --yes

# GitHub Pages — push to main triggers .github/workflows/deploy.yml
```
