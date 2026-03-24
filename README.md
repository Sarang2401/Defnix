# Defnix

**Defnix** is an engineering studio specializing in cloud security, SOC2 compliance readiness, and AI-driven security automation for modern startups.

This repository contains the full codebase for the Defnix public website and its supporting backend API.

---

## Project Structure

```
defnix/
├── frontend/          # Next.js 16 public website
├── backend/           # NestJS REST API
├── database/          # PostgreSQL migration scripts
├── docs/              # Project documentation
└── docker-compose.yml # Local development services (PostgreSQL, Redis)
```

---

## Tech Stack

| Layer     | Technology                                      |
|-----------|-------------------------------------------------|
| Frontend  | Next.js 16, React 19, TypeScript, Tailwind CSS  |
| Backend   | NestJS 11, TypeScript, TypeORM                  |
| Database  | PostgreSQL 16                                   |
| Cache     | Redis 7                                         |
| Auth      | JWT (Passport.js)                               |

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v20 or higher
- [Docker](https://www.docker.com/) (for local database)
- npm

### 1. Clone the repository

```bash
git clone https://github.com/Sarang2401/Defnix.git
cd Defnix
```

### 2. Start local services

Start PostgreSQL and Redis using Docker Compose:

```bash
docker-compose up -d
```

This will spin up:
- **PostgreSQL** on port `5432`
- **Redis** on port `6379`

### 3. Set up the backend

See [`backend/README.md`](./backend/README.md) for full setup instructions.

### 4. Set up the frontend

See [`frontend/README.md`](./frontend/README.md) for full setup instructions.

---

## Development

Run both services concurrently in separate terminals:

```bash
# Terminal 1 — Backend API
cd backend
npm run start:dev

# Terminal 2 — Frontend
cd frontend
npm run dev
```

The frontend will be available at `http://localhost:3000` and the backend API at `http://localhost:3001`.

---

## Deployment

The application is designed to be deployed independently:

- **Frontend** — Deployable to [Vercel](https://vercel.com) or any Node.js-capable host
- **Backend** — Deployable to [Render](https://render.com), Railway, or any Node.js host
- **Database** — Managed PostgreSQL (e.g. Render Postgres, Supabase, or Neon)

---

## Contributing

This is a private studio project. If you have questions or wish to get in touch, please email [hello@defnix.com](mailto:hello@defnix.com).

---

## License

All rights reserved. © Defnix. Unauthorized use, reproduction, or distribution of any content from this repository is prohibited.
