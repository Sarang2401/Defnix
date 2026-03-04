# Defnix — Project Context Document

> **Generated from source code only. No assumptions or inferences beyond explicit code.**

---

## 1. Project Overview

**Defnix** is an engineering studio web platform with:
- A **Next.js 14 (App Router)** frontend serving public marketing pages and a protected admin dashboard.
- A **NestJS** REST API backend with PostgreSQL (via TypeORM) and rate limiting.
- Docker Compose for local development (PostgreSQL + Redis containers).
- JWT-based authentication for the admin area.

**Tech stack confirmed from code:**
- Frontend: Next.js 14, TypeScript, Tailwind CSS, Framer Motion, Lucide React
- Backend: NestJS, TypeORM, Passport JWT, bcrypt, slugify, Multer
- Database: PostgreSQL 16
- Infrastructure: Docker Compose (postgres, redis), deployable to Render/Neon

---

## 2. Folder Structure

```
Defnix/
├── backend/
│   ├── src/
│   │   ├── main.ts                    # Bootstrap: CORS, Helmet, global prefix, ValidationPipe
│   │   ├── app.module.ts              # Root module: TypeORM, Throttler, all feature modules
│   │   ├── common/
│   │   │   └── guards/
│   │   │       ├── index.ts
│   │   │       └── jwt-auth.guard.ts  # Passport 'jwt' strategy guard
│   │   └── modules/
│   │       ├── auth/                  # Admin login, JWT strategy
│   │       ├── blog/                  # Blog posts, tags, categories, authors
│   │       ├── leads/                 # Contact form submissions (CRM)
│   │       ├── case-studies/          # Case study CMS
│   │       ├── newsletter/            # Email subscriber management
│   │       ├── analytics/             # Custom event tracking
│   │       ├── media/                 # File upload management
│   │       └── seo/                   # Sitemap + robots.txt generation
│   ├── .env.example
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── app/                       # Next.js App Router pages
│   │   │   ├── layout.tsx             # Root layout (fonts, metadata)
│   │   │   ├── page.tsx               # Home page
│   │   │   ├── about/page.tsx
│   │   │   ├── blog/page.tsx          # Blog listing (SSR with static fallback)
│   │   │   ├── blog/[slug]/page.tsx   # Individual blog post
│   │   │   ├── case-studies/page.tsx
│   │   │   ├── contact/page.tsx
│   │   │   ├── solutions/page.tsx
│   │   │   ├── solutions/soc2-failure-prevention/page.tsx
│   │   │   ├── solutions/cloud-insurance/page.tsx
│   │   │   ├── solutions/ai-soc-analyst/page.tsx
│   │   │   ├── privacy-policy/page.tsx
│   │   │   ├── terms-of-service/page.tsx
│   │   │   ├── disclaimer/page.tsx
│   │   │   └── admin/                 # Protected admin dashboard
│   │   │       ├── layout.tsx         # AuthProvider + AdminShell (sidebar nav)
│   │   │       ├── page.tsx           # Dashboard overview
│   │   │       ├── login/page.tsx
│   │   │       ├── blog/page.tsx      # Blog post list + CRUD
│   │   │       ├── blog/new/page.tsx
│   │   │       ├── blog/[id]/edit/page.tsx
│   │   │       ├── leads/page.tsx
│   │   │       ├── case-studies/page.tsx
│   │   │       ├── newsletter/page.tsx
│   │   │       ├── analytics/page.tsx
│   │   │       └── media/page.tsx
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── Header.tsx         # Sticky, scroll-animated header + mobile nav
│   │   │   │   ├── Footer.tsx         # Footer with newsletter subscribe form
│   │   │   │   ├── LayoutContent.tsx  # Wraps header/footer around children
│   │   │   │   └── MobileNav.tsx      # Mobile navigation overlay
│   │   │   ├── sections/
│   │   │   │   ├── HeroSection.tsx
│   │   │   │   ├── SolutionsSection.tsx
│   │   │   │   ├── MetricsBar.tsx
│   │   │   │   ├── BlogPreviewSection.tsx
│   │   │   │   ├── TestimonialSection.tsx
│   │   │   │   ├── CTASection.tsx
│   │   │   │   ├── ContactForm.tsx    # Lead submission form (POST /leads)
│   │   │   │   └── SolutionPageLayout.tsx
│   │   │   └── ui/
│   │   │       ├── Button.tsx
│   │   │       └── PageTransition.tsx # Framer Motion wrappers
│   │   └── lib/
│   │       ├── api.ts                 # fetchApi, fetchApiAuth, uploadFile helpers
│   │       └── auth.tsx               # AuthContext, AuthProvider, useAuth hook
│   └── package.json
├── database/
│   └── migrations/                    # SQL init scripts (mounted into Docker)
├── docker-compose.yml                 # PostgreSQL 16 + Redis 7 services
└── .gitignore
```

---

## 3. Navigation / Routing Flow

### Public Routes (Next.js App Router)

| URL | Page File | Notes |
|-----|-----------|-------|
| `/` | `app/page.tsx` | Hero, Solutions, Metrics, Blog preview, Testimonial, CTA |
| `/solutions` | `app/solutions/page.tsx` | 3 solution cards |
| `/solutions/soc2-failure-prevention` | `app/solutions/soc2-failure-prevention/page.tsx` | |
| `/solutions/cloud-insurance` | `app/solutions/cloud-insurance/page.tsx` | |
| `/solutions/ai-soc-analyst` | `app/solutions/ai-soc-analyst/page.tsx` | |
| `/blog` | `app/blog/page.tsx` | SSR; fetches `GET /blog/posts`; falls back to static data |
| `/blog/[slug]` | `app/blog/[slug]/page.tsx` | SSR; fetches `GET /blog/posts/:slug` |
| `/case-studies` | `app/case-studies/page.tsx` | |
| `/about` | `app/about/page.tsx` | |
| `/contact` | `app/contact/page.tsx` | Renders `<ContactForm />` |
| `/privacy-policy` | `app/privacy-policy/page.tsx` | Legal page |
| `/terms-of-service` | `app/terms-of-service/page.tsx` | Legal page |
| `/disclaimer` | `app/disclaimer/page.tsx` | Legal page |

### Admin Routes (Protected via `AuthProvider`)

| URL | Page File |
|-----|-----------|
| `/admin/login` | `app/admin/login/page.tsx` |
| `/admin` | `app/admin/page.tsx` (Dashboard) |
| `/admin/blog` | `app/admin/blog/page.tsx` |
| `/admin/blog/new` | `app/admin/blog/new/page.tsx` |
| `/admin/blog/[id]/edit` | `app/admin/blog/[id]/edit/page.tsx` |
| `/admin/leads` | `app/admin/leads/page.tsx` |
| `/admin/case-studies` | `app/admin/case-studies/page.tsx` |
| `/admin/newsletter` | `app/admin/newsletter/page.tsx` |
| `/admin/analytics` | `app/admin/analytics/page.tsx` |
| `/admin/media` | `app/admin/media/page.tsx` |

**Admin navigation guard:** `AuthProvider` reads `defnix_token` from `localStorage`. If not found and pathname ≠ `/admin/login`, it calls `router.replace("/admin/login")`.

---

## 4. Backend Architecture

### Global Configuration (from `main.ts`)
- **Global API prefix:** `api/v1` → all routes are `/api/v1/...`
- **CORS origin:** `process.env.CORS_ORIGIN || 'http://localhost:3000'`
- **Rate limit:** 60 requests per 60,000ms per IP (`ThrottlerModule`)
- **Security headers:** `helmet` with `crossOriginResourcePolicy: 'cross-origin'`
- **Validation:** Global `ValidationPipe` with `whitelist: true`, `forbidNonWhitelisted: true`, `transform: true`
- **Port:** `process.env.PORT || 4000`

### API Endpoints

#### Auth Module — `/api/v1/auth`
| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| POST | `/auth/login` | ❌ Public | Returns `{ accessToken: string }` |

#### Blog Module — `/api/v1/blog`
| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| GET | `/blog/posts` | ❌ Public | Paginated published posts. Query: `page`, `limit` |
| GET | `/blog/posts/:slug` | ❌ Public | Single post by slug |
| GET | `/blog/search` | ❌ Public | Full-text search. Query: `q` |
| GET | `/blog/tags` | ❌ Public | All tags |
| GET | `/blog/categories` | ❌ Public | All categories |
| GET | `/blog/admin/posts` | ✅ JWT | All posts (any status). Query: `page`, `limit` |
| POST | `/blog/posts` | ✅ JWT | Create post |
| PUT | `/blog/posts/:id` | ✅ JWT | Update post |
| DELETE | `/blog/posts/:id` | ✅ JWT | Delete post |

#### Leads Module — `/api/v1/leads`
| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| POST | `/leads` | ❌ Public | Submit contact form lead |
| GET | `/leads` | ✅ JWT | Paginated leads. Query: `page`, `limit` |
| PATCH | `/leads/:id/status` | ✅ JWT | Update lead status. Body: `{ status }` |

#### Case Studies Module — `/api/v1/case-studies`
| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| GET | `/case-studies` | ❌ Public | All case studies |
| GET | `/case-studies/:slug` | ❌ Public | Single case study by slug |
| POST | `/case-studies` | ✅ JWT | Create case study |
| PUT | `/case-studies/:id` | ✅ JWT | Update case study |
| DELETE | `/case-studies/:id` | ✅ JWT | Delete case study |

#### Newsletter Module — `/api/v1/newsletter`
| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| POST | `/newsletter/subscribe` | ❌ Public | Subscribe email. Body: `{ email }` |
| DELETE | `/newsletter/unsubscribe` | ❌ Public | Unsubscribe email. Body: `{ email }` |
| GET | `/newsletter/subscribers` | ✅ JWT | All subscribers |

#### Analytics Module — `/api/v1/analytics`
| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| POST | `/analytics/events` | ❌ Public | Track event. Body: `{ eventType, payload?, sessionId? }` |
| GET | `/analytics/events` | ✅ JWT | Events by type. Query: `type` |
| GET | `/analytics/summary` | ✅ JWT | `{ totalEvents, eventTypes: Record<string, number> }` |

#### Media Module — `/api/v1/media` (ALL routes require JWT)
| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| POST | `/media/upload` | ✅ JWT | Upload file (multipart `file` field) |
| GET | `/media` | ✅ JWT | All media assets |
| DELETE | `/media/:id` | ✅ JWT | Delete media asset |

#### SEO Module — `/api/v1/seo`
| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| GET | `/seo/sitemap.xml` | ❌ Public | XML sitemap (static routes + published blog posts + case studies) |
| GET | `/seo/robots.txt` | ❌ Public | `robots.txt` pointing to sitemap |

---

### Controllers / Services

Each module follows the same pattern: `controller.ts` → `service.ts` → TypeORM `Repository`.

#### AuthService (`auth.service.ts`)
- `validateUser(email, password)` — finds `AdminUser` by email, compares bcrypt hash.
- `login(email, password)` — calls `validateUser`, signs JWT payload `{ sub, email, role }`.
- `findById(id)` — used by `JwtStrategy.validate()`.

#### BlogService (`blog.service.ts`)
- `findAll(page, limit)` — published posts only, ordered by `publishedAt DESC`.
- `findAllAdmin(page, limit)` — all posts, ordered by `createdAt DESC`.
- `findBySlug(slug)` — throws `NotFoundException` if not found.
- `search(query)` — `ILike` on `title` OR `content`, published only, max 20 results.
- `create(dto)` — auto-generates  `slug` (via `slugify`), calculates `readingTime` (words/200), sets `publishedAt` if status is `PUBLISHED`.
- `update(id, dto)` — re-slugifies if title changes, recalculates `readingTime`, sets `publishedAt` on first publish.
- `remove(id)` — fetches then deletes.
- `getAllTags()` / `getAllCategories()` — order by `name ASC`.

#### LeadsService (`leads.service.ts`)
- `create(dto)` — saves new lead.
- `findAll(page, limit)` — ordered by `createdAt DESC`.
- `updateStatus(id, status)` — partial update then re-fetch.

#### CaseStudiesService (`case-studies.service.ts`)
- `findAll()` — ordered by `createdAt DESC`.
- `findBySlug(slug)` — throws `NotFoundException` if not found.
- `create(data)` — auto-generates `slug` via `slugify`.
- `update(id, data)` — re-slugifies if title changes.
- `remove(id)` — fetches then removes.

#### NewsletterService (`newsletter.service.ts`)
- `subscribe(email)` — if already subscribed (no `unsubscribedAt`): throws `ConflictException`. If previously unsubscribed: re-activates. Otherwise: creates new subscriber.
- `unsubscribe(email)` — sets `unsubscribedAt = now()`.
- `findAll()` — active subscribers only (`unsubscribedAt = undefined`), ordered by `subscribedAt DESC`.

#### AnalyticsService (`analytics.service.ts`)
- `trackEvent(data)` — persists event with `eventType`, optional `payload` (JSONB), `sessionId`, `userAgent`, `ipAddress`.
- `getEventsByType(eventType)` — last 100 events for that type.
- `getSummary()` — `COUNT(*)` total + grouped `COUNT` by `event_type`.

#### MediaService (`media.service.ts`)
- `upload(file)` — generates UUID filename, sets URL as `/uploads/{uuid}.{ext}` (local placeholder). In production, comment notes S3/R2 upload should replace this.
- `findAll()` — ordered by `uploadedAt DESC`.
- `remove(id)` — deletes by id.

#### SeoService (`seo.service.ts`)
- `generateSitemap(baseUrl)` — combines 9 static page entries + dynamically fetched published blog posts + all case studies into XML sitemap.
- `getRobotsTxt(baseUrl)` — returns `"User-agent: *\nAllow: /\n\nSitemap: {baseUrl}/api/v1/seo/sitemap.xml"`.

---

## 5. Database Models (TypeORM Entities)

### `admin_users` — `AdminUser`
| Column | Type | Notes |
|--------|------|-------|
| `id` | UUID PK | Auto-generated |
| `email` | varchar | Unique |
| `password_hash` | varchar | bcrypt hash |
| `role` | varchar | Default: `'admin'` |
| `created_at` | timestamp | Auto |
| `updated_at` | timestamp | Auto |

### `blog_posts` — `BlogPost`
| Column | Type | Notes |
|--------|------|-------|
| `id` | UUID PK | |
| `title` | varchar | |
| `slug` | varchar | Unique |
| `content` | text | |
| `excerpt` | text | Nullable |
| `cover_image` | varchar | Nullable |
| `author_id` | varchar | FK → `authors.id` (nullable) |
| `status` | enum | `draft` / `published` / `archived` |
| `reading_time` | int | Computed: word count / 200 |
| `seo_title` | varchar | Nullable |
| `seo_description` | varchar | Nullable |
| `published_at` | timestamp | Nullable |
| `created_at` | timestamp | Auto |
| `updated_at` | timestamp | Auto |

**Relations:** `ManyToOne` → `Author`; `ManyToMany` → `Tag` (via `post_tags`); `ManyToMany` → `Category` (via `post_categories`).

### `authors` — `Author`
| Column | Type |
|--------|------|
| `id` | UUID PK |
| `name` | varchar |
| `bio` | text (nullable) |
| `avatar_url` | text (nullable) |

### `tags` — `Tag`
| Column | Type |
|--------|------|
| `id` | UUID PK |
| `name` | varchar (unique) |
| `slug` | varchar (unique) |

### `categories` — `Category`
| Column | Type |
|--------|------|
| `id` | UUID PK |
| `name` | varchar (unique) |
| `slug` | varchar (unique) |

### `leads` — `Lead`
| Column | Type | Notes |
|--------|------|-------|
| `id` | UUID PK | |
| `name` | varchar | |
| `email` | varchar | |
| `company` | varchar | Nullable |
| `message` | text | |
| `source` | varchar | Nullable |
| `status` | enum | `new` / `contacted` / `qualified` / `converted` / `closed` |
| `created_at` | timestamp | Auto |

### `case_studies` — `CaseStudy`
| Column | Type | Notes |
|--------|------|-------|
| `id` | UUID PK | |
| `title` | varchar | |
| `slug` | varchar | Unique |
| `client` | varchar | Nullable |
| `industry` | varchar | Nullable |
| `challenge` | text | |
| `solution` | text | |
| `results` | text | |
| `cover_image` | varchar | Nullable |
| `published_at` | timestamp | Nullable |
| `created_at` | timestamp | Auto |

### `newsletter_subscribers` — `Subscriber`
| Column | Type | Notes |
|--------|------|-------|
| `id` | UUID PK | |
| `email` | varchar | Unique |
| `subscribed_at` | timestamp | Default: `CURRENT_TIMESTAMP` |
| `unsubscribed_at` | timestamp | Nullable |

### `analytics_events` — `AnalyticsEvent`
| Column | Type | Notes |
|--------|------|-------|
| `id` | UUID PK | |
| `event_type` | varchar | |
| `payload` | jsonb | Nullable |
| `session_id` | varchar | Nullable |
| `user_agent` | varchar | Nullable |
| `ip_address` | varchar | Nullable |
| `created_at` | timestamp | Auto |

### `media_assets` — `MediaAsset`
| Column | Type |
|--------|------|
| `id` | UUID PK |
| `filename` | varchar |
| `url` | varchar |
| `mime_type` | varchar |
| `size` | int (bytes) |
| `uploaded_at` | timestamp (auto) |

---

## 6. Frontend Architecture

### Root Layout (`app/layout.tsx`)
- Sets global `Metadata` (title template, description, OG, Twitter card, robots).
- Loads 4 Google Fonts via CSS variables: `--font-display` (Sora), `--font-heading` (DM Sans), `--font-body` (IBM Plex Sans), `--font-mono` (JetBrains Mono).
- Wraps children in `<LayoutContent>` (which applies `<Header>` and `<Footer>` for non-admin routes).

### Home Page (`app/page.tsx`)
Renders 6 sections in order:
1. `<HeroSection />`
2. `<SolutionsSection />`
3. `<MetricsBar />`
4. `<BlogPreviewSection />`
5. `<TestimonialSection />`
6. `<CTASection />`

### Blog Page (`app/blog/page.tsx`) — Server Component
- Calls `getPosts()` which does `fetch(${apiUrl}/blog/posts?limit=20, { next: { revalidate: 60 } })`.
- Falls back to hardcoded `staticPosts[]` array on API error.
- First post rendered as `<FeaturedPost>`, remaining as `<CompactPost>` in a 2-column grid.

### Solutions Page (`app/solutions/page.tsx`)
- Three hardcoded solution objects (SOC2, Cloud Insurance, AI SOC Analyst).
- Each renders a `<SolutionCard>` linking to the respective solution sub-page.

### Contact Page (`app/contact/page.tsx`)
- Static info column (email: `hello@defnix.com`, response time, location).
- Right column: `<ContactForm />` client component.

### Admin Layout (`app/admin/layout.tsx`) — Client Component
- Wraps everything in `<AuthProvider>`.
- `<AdminShell>` checks `isAuthenticated` from `useAuth()`.
- Login page (`/admin/login`) bypasses the shell.
- The sidebar contains 7 nav items: Dashboard, Blog Posts, Leads, Case Studies, Newsletter, Analytics, Media.

### Admin Dashboard (`app/admin/page.tsx`) — Client Component
On mount, fires 4 parallel `fetchApiAuth` calls:
- `blog/admin/posts?limit=1` → `totalPosts`
- `leads?limit=5` → `totalLeads` + `recentLeads[]`
- `newsletter/subscribers` → `totalSubscribers`
- `analytics/summary` → `totalEvents`

Displays 4 stat cards and a recent leads table.

### State Management Logic
- **Global auth state:** React Context via `AuthProvider` (`lib/auth.tsx`). Token stored in `localStorage` as `defnix_token`. Context exposes: `token`, `isAuthenticated`, `isLoading`, `login()`, `logout()`.
- **Per-page local state:** Each admin page uses `useState` for data arrays, loading flags, and pagination.
- **No global state library** (no Redux, Zustand, etc.) detected.

### Client-side Services (`lib/api.ts`)
Three exported functions:

| Function | Purpose | Auth Header |
|----------|---------|-------------|
| `fetchApi<T>(path, options)` | Public API calls | None |
| `fetchApiAuth<T>(path, options)` | Admin API calls | `Bearer {defnix_token}` from localStorage |
| `uploadFile<T>(path, file)` | Multipart file upload | `Bearer {defnix_token}` from localStorage |

- `fetchApiAuth` auto-redirects to `/admin/login` and removes token on `401`.
- `fetchApiAuth` returns `undefined` for `204 No Content` responses (DELETE).
- `API_BASE` = `process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"`.

---

## 7. External Integrations

| Integration | Usage | Status |
|-------------|-------|--------|
| **PostgreSQL** (via TypeORM) | All data persistence | Active |
| **Redis** | Defined in docker-compose.yml; NOT imported in any module code | Container only — not used in application code |
| **AWS S3 / R2** | Referenced in comment inside `media.service.ts` and `.env.example` | **Not implemented in code** |
| **Render / Neon (cloud DB)** | SSL config in `app.module.ts`: `ssl: { rejectUnauthorized: false }` when `DATABASE_URL` env var is set | Config-only |

---

## 8. Authentication Flow (Backend)

**Guard:** `JwtAuthGuard` extends `AuthGuard('jwt')` from `@nestjs/passport`.

**Strategy:** `JwtStrategy` (`jwt.strategy.ts`)
- Extracts JWT from `Authorization: Bearer <token>` header.
- Uses `JWT_SECRET` from config (default: `'defnix-dev-secret-change-in-production'`).
- `validate(payload)` calls `authService.findById(payload.sub)` — returns the `AdminUser` entity or throws.

**JWT Payload shape:**
```typescript
{ sub: string; email: string; role: string; }
```

---

## 9. Environment Configuration

From `backend/.env.example`:

| Variable | Default | Used In |
|----------|---------|---------|
| `NODE_ENV` | `development` | `app.module.ts` (disables sync/logging in production) |
| `DB_HOST` | `localhost` | `app.module.ts` |
| `DB_PORT` | `5433` | `app.module.ts` |
| `DB_USER` / `DB_USERNAME` | `defnix` | `app.module.ts` |
| `DB_PASSWORD` | `defnix_dev` | `app.module.ts` |
| `DB_NAME` | `defnix` | `app.module.ts` |
| `DATABASE_URL` | _(none)_ | `app.module.ts` — if set, overrides individual DB vars; enables SSL |
| `JWT_SECRET` | _(must set)_ | `jwt.strategy.ts`, `auth.module.ts` |
| `JWT_EXPIRES_IN` | `7d` | `auth.module.ts` |
| `CORS_ORIGIN` | `http://localhost:3000` | `main.ts` |
| `PORT` | `3001` (.env) / `4000` (code fallback) | `main.ts` |
| `SITE_URL` | `https://defnix.com` | `seo.controller.ts`, `seo.service.ts` |

From `frontend` (env vars):

| Variable | Default | Used In |
|----------|---------|---------|
| `NEXT_PUBLIC_API_URL` | `http://localhost:3001` | `lib/api.ts`, `ContactForm.tsx`, `Footer.tsx`, `blog/page.tsx` |

---

## 10. Client ↔ Server Communication Flow

### Public Lead Submission (Contact Form)
```
User fills ContactForm (contact/page.tsx)
  → POST ${NEXT_PUBLIC_API_URL}/api/v1/leads
  → Body: { name, email, company, message, source: "contact-page" }
  → Response: Lead entity
  → UI shows success state
```

### Newsletter Subscribe (Footer)
```
User enters email in Footer.tsx
  → POST ${NEXT_PUBLIC_API_URL}/api/v1/newsletter/subscribe
  → Body: { email }
  → Response: Subscriber entity (or ConflictException)
  → UI shows "Subscribed successfully" (errors silently ignored)
```

### Admin Login Flow
```
AdminLoginPage calls login(email, password) from useAuth()
  → fetchApi("auth/login", POST, { email, password })
  → Response: { accessToken: string }
  → Stored in localStorage as "defnix_token"
  → router.replace("/admin")
```

### Admin API Calls Pattern
```
Admin page on mount calls fetchApiAuth(endpoint)
  → Reads "defnix_token" from localStorage
  → Adds Authorization: Bearer <token> header
  → On 401: removes token + redirects to /admin/login
  → On success: sets local state (useState)
```

### Blog Page (SSR)
```
Next.js server renders blog/page.tsx
  → Server-side fetch: GET ${NEXT_PUBLIC_API_URL}/api/v1/blog/posts?limit=20
  → next: { revalidate: 60 } (ISR, 60s)
  → On failure: uses hardcoded staticPosts[] array
  → Renders HTML to client
```

---

## 11. Important Execution Flows

### Blog Post Creation (Admin)
1. Admin navigates to `/admin/blog/new`.
2. Frontend `POST /api/v1/blog/posts` with JWT.
3. `BlogService.create(dto)`:
   - `slug = slugify(dto.title, { lower: true, strict: true })`
   - `readingTime = Math.ceil(word_count / 200)`
   - If `dto.tagIds`: fetches and attaches `Tag[]`
   - If `dto.categoryIds`: fetches and attaches `Category[]`
   - If `status === PUBLISHED`: sets `publishedAt = new Date()`
4. Saves to `blog_posts` table.

### Blog Post Update (Admin)
1. Admin visits `/admin/blog/[id]/edit`.
2. `PUT /api/v1/blog/posts/:id` with JWT.
3. `BlogService.update(id, dto)`:
   - Re-generates `slug` if `dto.title` is present.
   - Recalculates `readingTime` if `dto.content` is present.
   - Sets `publishedAt` only on first publish (if `!post.publishedAt`).
   - Merges updates via `Object.assign(post, dto)`.

### Admin Authentication Guard Check
1. Any route decorated with `@UseGuards(JwtAuthGuard)` invokes the guard.
2. Guard calls `super.canActivate()` → Passport extracts Bearer token.
3. `JwtStrategy.validate(payload)` is called → `authService.findById(payload.sub)`.
4. If user not found → throws `Error('User not found')`.
5. If token expired → Passport rejects (ignoreExpiration: false).

### SEO Sitemap Generation
1. `GET /api/v1/seo/sitemap.xml`
2. `SeoService.generateSitemap(baseUrl)`:
   - Queries all published `BlogPost` records (slug, updatedAt).
   - Queries all `CaseStudy` records (slug, createdAt).
   - Merges with 9 hardcoded static page entries.
   - Returns XML string.
3. Response sent with `Content-Type: application/xml`.

### Media Upload (Admin)
1. Admin selects file in `/admin/media`.
2. `uploadFile("media/upload", file)` → multipart POST with JWT.
3. `MediaService.upload(file)`:
   - Generates `uuid.ext` filename.
   - Sets URL as `/uploads/{filename}` (local placeholder — no actual file saved to disk in current implementation).
   - Saves metadata to `media_assets` table.

---

## 12. Constraints / Guards Found in Code

- **Rate limiting:** 60 requests per 60 seconds per IP (global, all routes).
- **Validation:** `whitelist: true` + `forbidNonWhitelisted: true` — extra fields on request bodies are stripped/rejected.
- **Lead DTO:** `message` minimum 10 characters (`@MinLength(10)`). `name` minimum 1 character. `email` must be valid format.
- **Login DTO:** `password` minimum 8 characters. `email` must be valid format.
- **Newsletter:** Re-subscribing an active email throws `ConflictException`.
- **DB sync disabled in production:** `synchronize: !isProduction` — schema auto-sync only in development.
- **SSL enforced for cloud DB:** When `DATABASE_URL` is set, `ssl: { rejectUnauthorized: false }` is enabled.
- **Blog search cap:** Maximum 20 results returned.
- **Analytics query cap:** `getEventsByType` returns max 100 events.
- **Admin layout guard (client-side):** Unauthenticated users are redirected to `/admin/login` via `useEffect` in `AuthProvider`.
- **Media controller:** All 3 routes (`upload`, list, delete) are at controller level `@UseGuards(JwtAuthGuard)` — no public access to media endpoints.
- **Slug uniqueness:** `slug` column is unique on `blog_posts`, `case_studies`, `tags`, `categories`.

---

## 13. Confirmed Not Implemented in Codebase

- **Redis** — container defined in docker-compose.yml but no Redis client imported or used in any module.
- **AWS S3 / cloud storage** — placeholder comment in `media.service.ts`; files are not actually stored on disk or cloud.
- **Email sending** — newsletter module stores subscribers but sends no emails.
- **Password reset / registration** — only `POST /auth/login` is implemented; no register, forgot-password, or refresh token endpoints.
- **Role-based authorization** — `role` field exists on `AdminUser` but no role checks are implemented beyond the JWT guard.
- **Blog post DTO** — `blog/dto/post.dto.ts` exists but was not read; shape inferred from `BlogService` usage (title, content, status, tagIds?, categoryIds?).
