# Defnix — Backend API

The REST API powering the Defnix website, built with **NestJS 11** and **PostgreSQL**.

---

## Tech Stack

| Technology      | Version  | Purpose                               |
|-----------------|----------|---------------------------------------|
| NestJS          | 11       | Node.js framework                     |
| TypeScript      | 5        | Type safety                           |
| TypeORM         | 0.3      | ORM for PostgreSQL                    |
| PostgreSQL       | 16       | Primary database                      |
| JWT + Passport  | —        | Authentication                        |
| bcrypt          | 5        | Password hashing                      |
| Helmet          | 8        | HTTP security headers                 |
| NestJS Throttler| 6        | Rate limiting                         |

---

## API Modules

| Module         | Description                                          |
|----------------|------------------------------------------------------|
| `auth`         | JWT-based authentication (login, token validation)   |
| `blog`         | Blog post management (CRUD)                          |
| `case-studies` | Case study management (CRUD)                         |
| `leads`        | Contact form submissions and lead capture            |
| `newsletter`   | Newsletter subscriber management                     |
| `media`        | File/media upload handling                           |
| `analytics`    | Basic website analytics tracking                     |
| `seo`          | Sitemap and SEO-related endpoints                    |

---

## Getting Started

### Prerequisites

- Node.js v20+
- npm
- PostgreSQL 16 (or use the provided Docker Compose setup from the project root)

### Installation

```bash
cd backend
npm install
```

### Environment Variables

Copy the example environment file and fill in your values:

```bash
cp .env.example .env
```

Open `.env` and configure the following:

```env
NODE_ENV=development

# Database
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=defnix

# JWT — use a long, random string in production
JWT_SECRET=your-secure-jwt-secret
JWT_EXPIRES_IN=7d

# CORS — set to your frontend URL
CORS_ORIGIN=http://localhost:3000

# Server
PORT=3001

# Site URL
SITE_URL=https://defnix.com
```

> **Security:** Never commit your `.env` file. It is already listed in `.gitignore`.

### Database Setup

If using Docker Compose from the project root:

```bash
# From the project root
docker-compose up -d
```

This starts PostgreSQL on port `5432`. The backend connects using the credentials in your `.env` file.

TypeORM is configured with `synchronize: true` in development — it will create tables automatically on first run. In production, use migrations.

### Running Locally

```bash
# Development (with file watching)
npm run start:dev

# Production
npm run build
npm run start:prod
```

The API will be available at [http://localhost:3001](http://localhost:3001).

---

## Available Scripts

| Command               | Description                          |
|-----------------------|--------------------------------------|
| `npm run start:dev`   | Start with hot-reload (development)  |
| `npm run build`       | Compile TypeScript to `dist/`        |
| `npm run start:prod`  | Start compiled production build      |
| `npm run lint`        | Run ESLint with auto-fix             |
| `npm run format`      | Format code with Prettier            |

---

## Project Structure

```
backend/src/
├── main.ts               # Application entry point
├── app.module.ts         # Root module
├── common/               # Shared guards, decorators, pipes
└── modules/
    ├── auth/             # Authentication module
    ├── blog/             # Blog module
    ├── case-studies/     # Case studies module
    ├── leads/            # Contact/leads module
    ├── newsletter/       # Newsletter module
    ├── media/            # Media upload module
    ├── analytics/        # Analytics module
    └── seo/              # SEO/sitemap module
```

---

## Security

- All endpoints requiring authentication are protected with JWT Bearer tokens
- Passwords are hashed using **bcrypt** before storage
- HTTP headers are secured with **Helmet**
- Rate limiting is enforced on public endpoints via **NestJS Throttler**
- Never expose `.env` values or admin credentials publicly

---

## Deployment

The backend can be deployed to any Node.js-compatible host (e.g. Render, Railway):

1. Set all required environment variables in your hosting platform's dashboard
2. Set `NODE_ENV=production`
3. Run `npm run build` then `npm run start:prod`
4. Ensure your PostgreSQL database is accessible from the host environment
5. Set `CORS_ORIGIN` to your production frontend URL
