# CLAUDE.md

This file gives Claude Code (claude.ai/code) the conventions and context it needs to work in this repository. `AGENTS.md` in this repo is a verbatim copy of this file for tools that read that filename instead.

## Project Overview

Defnix is a two-person freelance engineering studio. This repo is a **monorepo** with two independently deployed apps plus shared infra:

```
Defnix/
├── frontend/     Public marketing site — Next.js 16 (App Router), React 19, TypeScript (strict), Tailwind CSS v4
├── backend/      Admin API — NestJS 11, TypeORM, PostgreSQL, Passport/JWT
├── database/     Raw SQL migrations
├── docs/         Misc docs
└── .github/workflows/ci.yml   CI: lint + build for both apps
```

The public site (everything except `/admin/*`) is what the freelance clients and prospects see — it's the primary product of this repo. The `/admin/*` routes in `frontend/` (leads, blog, case studies, media, newsletter, analytics) are a separate internal tool, excluded from the public `Header`/`Footer` via `frontend/src/components/layout/LayoutContent.tsx`, and generally out of scope for the public-site design system described below.

## Commands

Run from inside `frontend/` or `backend/` respectively (not the repo root — there is no root `package.json`):

| App | dev | build | lint | test |
|---|---|---|---|---|
| `frontend/` | `npm run dev` | `npm run build` | `npm run lint` | — (none configured) |
| `backend/` | `npm run start:dev` | `npm run build` | `npm run lint` | — (none configured) |

**No test framework is configured in either app** (no Jest/Vitest/Playwright, no test files anywhere in the repo). Don't invent a `test` script or add a testing framework unprompted — if you think one is needed, say so and let the user decide.

## Mandatory workflow: lint + build after non-trivial changes

`.github/workflows/ci.yml` runs, on every push/PR to `main`, for **each** app independently (Node 20):

```
npm ci
npm run lint
npm run build
```

After any non-trivial code change (more than a one-line fix), run `npm run lint` and `npm run build` in whichever app(s) you touched **before** considering the change done. If a test runner exists by the time you read this, run tests too. Treat lint errors and build failures the same way CI would — as blocking, not optional.

## Frontend architecture

- **Routing**: Next.js App Router under `frontend/src/app/`. Public pages: `/`, `/about`, `/solutions` (+ 6 detail pages under `/solutions/*`), `/case-studies`, `/blog` (+ `/blog/[slug]`, `/blog/pillars/*`), `/contact`, legal pages. Admin pages live under `/admin/*` with their own layout.
- **Components**: `frontend/src/components/layout/` (Header, Footer, NavOverlay, LayoutContent), `frontend/src/components/sections/` (homepage/page sections — Hero, Solutions, Metrics, CTA, Blog preview, etc.), `frontend/src/components/ui/` (reusable atoms — Button, Breadcrumb, PageTransition, Marquee, SmoothScroll, TiltCard).
- **Shared data**: service/solution copy and company stats live in `frontend/src/lib/solutions-data.ts` and `frontend/src/lib/stats-data.ts` as single sources of truth — see Data conventions below.
- **State/API**: `frontend/src/lib/api.ts` (API client), `frontend/src/lib/auth.tsx` (admin auth context).

## Design system — single source of truth

`frontend/src/app/globals.css`'s `@theme inline` block is **the** place that defines the site's colors, typography, spacing, and radii — its own header comment says "CHANGE ONLY THIS FILE to update the entire theme." Brand palette (earthy green, do not introduce new hues without explicit user sign-off):

| Token | Hex | Role |
|---|---|---|
| `--color-surface` | `#2F3E46` | primary dark bg (navbar, footer, hero base) |
| `--color-secondary` | `#354F52` | cards/panels on surface |
| `--color-pine` | `#52796F` | accent: buttons, active states, dividers |
| `--color-sage` | `#84A98C` | highlight: hover states, emphasis, tags |
| `--color-mist` | `#CAD2C5` | text on dark, CTA fill, light-section bg |

Typography: headline font = Space Grotesk (`var(--font-headline)`), body/label font = Inter (`var(--font-body)` / `var(--font-label)`), both loaded once via `next/font/google` in `frontend/src/app/layout.tsx`. Don't add a second font-loading mechanism (no raw `@import` in CSS, no external `<link>` stylesheets).

Reusable classes already defined in `globals.css` — prefer these over ad-hoc styles: `.btn-primary` / `.btn-secondary`, `.card` / `.card-light`, `.neu-raised` / `.neu-flat` / `.neu-inset` / `.neu-pill` (neumorphic system), `.glass-card` / `.glass-card-dark`, `.type-display` / `.type-headline` / `.type-body` / `.type-label`, `.divider` / `.divider-gradient`, gradient utilities (`.text-gradient-sage` and related `.bg-gradient-*` / `.border-gradient-*` classes).

## Data conventions

The 6 services (SOC2 Failure Prevention, Cloud Insurance, AI Enhanced SOC Analyst, Website Development, Mobile App Development, Business Automation — grouped as **Security** / **AI** / **Engineering**) and the company stats (satisfaction rate, projects shipped, delivery time, etc.) must be read from `frontend/src/lib/solutions-data.ts` and `frontend/src/lib/stats-data.ts`. Never re-hardcode service copy, stats, or grouping per-component — every place that lists services or stats (homepage sections, `/solutions`, footer, etc.) should import from these files so copy/numbers can't drift between pages.

## Do

- Use Tailwind utility classes and the design-system CSS classes above instead of inline `style={}` objects with raw hex/rgba values.
- Use CSS `:hover`/`transition` classes or Framer Motion `whileHover`/`whileTap` variants for hover/press states, not manual `onMouseEnter`/`onMouseLeave` handlers that mutate `e.currentTarget.style`.
- Reuse existing components (`Button.tsx`, `Breadcrumb.tsx`, `PageTransition.tsx`, `StaggerContainer`, etc.) instead of writing one-off equivalents.
- Keep animations on `transform`/`opacity` where possible (compositor-friendly) rather than animating `box-shadow`/`width`/`height` directly.
- Match the existing file placement convention: layout chrome → `components/layout/`, page-specific sections → `components/sections/`, generic reusable atoms → `components/ui/`.

## Don't

- Don't hardcode hex colors or gradients outside `globals.css` — add a token/utility there instead.
- Don't duplicate service or stats data in a component — import from `lib/solutions-data.ts` / `lib/stats-data.ts`.
- Don't add a test framework or `test` script unilaterally — flag it to the user first.
- Don't skip the lint+build check after a non-trivial change.
- Don't introduce colors outside the 5-color earthy-green palette without explicit user sign-off.
- Don't use `--no-verify`, force-push, or otherwise bypass repo safety checks unless the user explicitly asks.
