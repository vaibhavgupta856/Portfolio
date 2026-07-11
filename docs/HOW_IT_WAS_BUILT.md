# How This Portfolio Was Built

A technical guide to the architecture, libraries, and decisions behind [Vaibhav Gupta's portfolio](https://portfolio-pink-delta-48.vercel.app).

---

## Overview

This is a single-page portfolio inspired by [Lusion](https://lusion.co) — dark space aesthetic, scroll-driven storytelling, and layered 3D visuals. The site is built as a **React SPA** with **Vite**, optimized for a cinematic first impression while keeping content editable from one data file.

**Design goals:**

- Immersive hero with scroll reveals and ambient motion
- Project cards, experience timeline, and contact in a single smooth page
- Fast perceived load via a preloader that warms critical assets
- Responsive hover and section animations without heavy WebGL
- One source of truth for resume links, projects, and experience

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | React 18 + TypeScript |
| Build tool | Vite 6 |
| Styling | Tailwind CSS 3 + custom utilities in `index.css` |
| Animation | Framer Motion |
| Smooth scroll | [Lenis](https://github.com/darkroomengineering/lenis) |
| 3D | Three.js via React Three Fiber, Drei, Rapier physics |
| Vector animation | Rive (`@rive-app/react-canvas`) — hero CTA spaceship |
| Icons | Lucide React |
| Fonts | Orbitron, Syne, Exo 2, DM Sans, JetBrains Mono (Google Fonts) |

---

## Project Structure

```
Portfolio/
├── public/                    # Static assets served as-is
│   ├── audio/ambient.mp3      # Background music
│   ├── models/connectors.glb  # Hero 3D connectors scene
│   ├── lusion-assets/         # Tunnel astronaut .buf + textures
│   ├── profile.jpg            # Hero profile photo
│   └── markers/               # (unused — globe removed)
├── src/
│   ├── App.tsx                # Page layout + loading gate
│   ├── data/
│   │   ├── portfolio.ts       # ★ All personal content (edit here)
│   │   └── tunnelCards.ts     # Tunnel section project cards
│   ├── components/            # UI sections and effects
│   ├── hooks/                 # Preloader, Lusion loaders
│   ├── lib/                   # Asset preload, Lusion parsers
│   ├── context/               # Lenis scroll context
│   └── shaders/               # Custom GLSL for astronaut
├── Stunning New Universe...webm  # Full-screen video (Vite-bundled)
├── vite.config.ts
├── vercel.json
└── .github/workflows/deploy.yml
```

---

## Page Architecture

Sections render top-to-bottom inside `SmoothScroll` (Lenis). Global layers sit behind content:

```
┌─────────────────────────────────────────┐
│  LoadingScreen (until assets ready)     │
├─────────────────────────────────────────┤
│  CustomCursor · AmbientMusic · FilmGrain│
│  ScreenPaint · ScrollProgress           │
│  ScrollVideoBackground (universe video) │
│  AnimatedBackground (gradients + stars) │
├─────────────────────────────────────────┤
│  Navbar                                 │
│  Hero (+ Connectors 3D canvas)          │
│  TechMarquee                            │
│  About · Experience · Projects · Skills │
│  Contact · Finale · Footer              │
└─────────────────────────────────────────┘
```

`ScrollReveal` wraps most sections to fade/slide them in as they enter the viewport.

---

## Key Features

### 1. Loading Experience

**Files:** `LoadingScreen.tsx`, `useAssetPreloader.ts`, `preloadAssets.ts`

On first paint, a space-themed loader shows progress while critical hero assets load in parallel:

- Google Fonts (`document.fonts.ready`)
- Profile image (`/profile.jpg`)
- Connectors GLB model (`/models/connectors.glb`)
- ConnectorsScene JS chunk (dynamic `import()`)
- Universe background video (`canplay`, 8s max timeout)

The loader enforces a **minimum ~1.4s** display so it does not flash. When complete, the main app fades in. `ConnectorsHeroBackground` skips its 600ms delay if the scene was already preloaded.

### 2. Hero Section

**Files:** `Hero.tsx`, `ConnectorsHeroBackground.tsx`, `ConnectorsScene.tsx`

- **Left:** Name, glitch title, CTAs (View Experience, Resume, Contact), social links, competitive programming stats (LeetCode / Codeforces link out)
- **Right:** Animated profile photo with orbit ring
- **Background:** Interactive **React Three Fiber** scene — physics-based connector blocks (`connectors.glb`) with mouse repulsion, transmission material, and post-processing (N8AO)

The 3D scene is **lazy-loaded** via `React.lazy` + `Suspense` to avoid blocking initial JS parse.

### 3. Universe Video Background

**File:** `ScrollVideoBackground.tsx`

A full-screen looping WebM fly-through plays behind the entire site at 5× speed, muted, with a dark gradient overlay. The video file lives at the repo root and is imported through Vite (hashed in production builds).

### 4. Spaceman Tunnel Section

**Files:** `SpacemanTunnelSection.tsx`, `TunnelAstronautCanvas.tsx`, `lib/lusionAssets.ts`

A **~700vh tall** sticky scroll section. As the user scrolls:

- Camera moves through a star field
- Lusion-style astronaut model (`.buf` geometry + textures) animates in/out
- Project detail cards (`tunnelCards.ts`) pin and transition on scroll progress

Scroll progress is driven by Framer Motion's `useScroll` + `useTransform`, not Lenis directly, so animations stay in sync with viewport position.

### 5. Ambient Music

**File:** `AmbientMusic.tsx`

Space ambient track at `public/audio/ambient.mp3`. A fixed **Sound on / off** toggle sits bottom-right.

Because browsers block autoplay with sound, the player:

1. Starts **muted autoplay** in the background
2. Unmutes on first user interaction (click, scroll via Lenis `virtual-scroll`, or the enter gate)
3. Remembers enter state in `sessionStorage`

### 6. Interaction Layer

| Component | Role |
|-----------|------|
| `SmoothScroll` | Lenis instance (`lerp: 0.09`), RAF loop, `lenis-smooth` on `<html>` |
| `CustomCursor` | Dot + ring cursor on fine pointers; instant hover detection via `elementFromPoint` |
| `Magnetic` | Subtle spring pull on buttons (low strength, stiff springs) |
| `TiltCard` | 3D tilt on project cards |
| `FilmGrain` | CSS overlay for cinematic texture |
| `ScreenPaint` | Mouse trail paint effect |
| `ScrollProgress` | Top progress bar tied to scroll |

CSS `scroll-behavior` is set to `auto` so it does not fight Lenis.

### 7. Content Data Layer

**File:** `src/data/portfolio.ts`

All editable content lives here:

- `personalInfo` — name, links, resume URL, profile image path
- `stats` — hero stat cards (supports `href` for external links)
- `experience`, `projects`, `skills`, `education`, `navLinks`

Components import from this file only. To update the live site content, edit `portfolio.ts` and redeploy.

---

## Styling & Design System

**Tailwind config** (`tailwind.config.js`):

- **Colors:** `surface` (#030014), `accent` (#4f6bff), `cyan-glow` (#38bdf8)
- **Fonts:** `font-display` (Orbitron/Syne), `font-body` (Exo 2), `font-mono` (JetBrains Mono)
- **Animations:** gradient-flow, glitch, float, pulse-glow

**Custom CSS** (`index.css`):

- `.glass`, `.space-card`, `.text-gradient` utilities
- `.space-stars` multi-layer starfield background
- `.connectors-frame` hero 3D panel styling
- Lenis compatibility rules

---

## Performance Decisions

1. **Code splitting** — Connectors scene and Rive spaceship load on demand
2. **Asset preloading** — Hero-critical assets load during the splash screen
3. **Video** — Large WebM; preloader waits for `canplay`, not full buffer
4. **Rive CTA** — Deferred 3s after mount; falls back to a styled link button
5. **Error boundaries** — `AppErrorBoundary` + per-section `ErrorBoundary` so a 3D failure does not crash the page
6. **Pointer events** — Hero text uses `pointer-events-none` on containers; interactive children opt back in

---

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

```bash
npm run build    # TypeScript check + Vite production build → dist/
npm run preview  # Serve dist/ locally
```

### Required assets (not all in git)

Place these in `public/` before deploying:

| Path | Purpose |
|------|---------|
| `public/profile.jpg` | Hero photo |
| `public/models/connectors.glb` | Hero 3D scene |
| `public/lusion-assets/**` | Tunnel astronaut models/textures |
| `public/audio/ambient.mp3` | Background music |
| Root `Stunning New Universe...webm` | Video background |

---

## Deployment

### Vercel (primary — live site)

- **URL:** https://portfolio-pink-delta-48.vercel.app
- **Config:** `vercel.json` — Vite framework, SPA rewrites
- **Base path:** `/` (set via `process.env.VERCEL` in `vite.config.ts`)

```bash
npx vercel deploy --prod --yes
```

### GitHub Pages (optional)

- **Workflow:** `.github/workflows/deploy.yml` — builds on push to `main`, deploys `dist/` to `gh-pages` branch
- **Base path:** `/Portfolio/` (when `VERCEL` env is not set during build)
- Enable Pages in repo settings → source: `gh-pages` branch

### Base path logic (`vite.config.ts`)

```ts
base: process.env.VERCEL ? '/' : command === 'build' ? '/Portfolio/' : '/'
```

- **Dev:** `/`
- **Vercel production:** `/`
- **GitHub Pages build:** `/Portfolio/`

---

## Customization Checklist

1. **Content** — Edit `src/data/portfolio.ts` and `src/data/tunnelCards.ts`
2. **Profile photo** — Replace `public/profile.jpg`
3. **Resume** — Update `personalInfo.resume` Google Drive link
4. **Projects in tunnel** — Edit `tunnelCards.ts` (names, gradients, copy)
5. **Music** — Replace `public/audio/ambient.mp3`
6. **Colors/fonts** — `tailwind.config.js` + `index.css`
7. **Section order** — Reorder components in `App.tsx`

---

## Repository Links

| Resource | URL |
|----------|-----|
| GitHub | https://github.com/vaibhavgupta856/Portfolio |
| Vercel (live) | https://portfolio-pink-delta-48.vercel.app |
| GitHub Pages | https://vaibhavgupta856.github.io/Portfolio/ (requires Pages enabled) |

---

## Summary

The portfolio combines **content-driven React architecture** with **heavy visual layers** (video, R3F, scroll shaders) while keeping the developer experience simple: one data file for content, lazy loading for 3D, a preloader for perceived performance, and dual deploy targets for Vercel and GitHub Pages.
