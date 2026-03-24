# Defnix — Frontend

The public-facing website for [Defnix](https://defnix.com), built with **Next.js 16** and **React 19**.

---

## Tech Stack

| Technology        | Version  | Purpose                              |
|-------------------|----------|--------------------------------------|
| Next.js           | 16.1.6   | React framework with App Router      |
| React             | 19       | UI library                           |
| TypeScript        | 5        | Type safety                          |
| Tailwind CSS      | 4        | Utility-first styling                |
| Framer Motion     | 12       | Page transitions and animations      |
| Lucide React      | 0.575    | Icon library                         |
| Radix UI          | —        | Accessible UI primitives             |
| Recharts          | 3        | Charts (admin dashboard)             |

---

## Pages

| Route                  | Description                              |
|------------------------|------------------------------------------|
| `/`                    | Homepage                                 |
| `/about`               | About Defnix                             |
| `/solutions`           | Solutions overview                       |
| `/solutions/soc2-failure-prevention` | SOC2 Compliance Readiness  |
| `/solutions/cloud-insurance`         | Cloud Risk Reduction       |
| `/solutions/ai-soc-analyst`          | AI-Driven Security Ops     |
| `/case-studies`        | Engineering case studies                 |
| `/blog`                | Technical blog                           |
| `/contact`             | Contact form                             |
| `/disclaimer`          | Disclaimer                               |
| `/privacy-policy`      | Privacy Policy                           |
| `/terms-of-service`    | Terms of Service                         |
| `/admin`               | Admin dashboard (protected)              |

---

## Getting Started

### Prerequisites

- Node.js v20+
- npm

### Installation

```bash
cd frontend
npm install
```

### Environment Variables

The frontend reads the backend API URL from an environment variable. Create a `.env.local` file in the `frontend/` directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

For production, set this to your deployed backend URL.

### Running Locally

```bash
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

---

## Available Scripts

| Command         | Description                          |
|-----------------|--------------------------------------|
| `npm run dev`   | Start development server (Turbopack) |
| `npm run build` | Build for production                 |
| `npm run start` | Start production server              |
| `npm run lint`  | Run ESLint                           |

---

## Project Structure

```
frontend/src/
├── app/                  # Next.js App Router pages
│   ├── page.tsx          # Homepage
│   ├── layout.tsx        # Root layout
│   ├── about/
│   ├── blog/
│   ├── case-studies/
│   ├── contact/
│   ├── solutions/
│   ├── admin/            # Admin area (authenticated)
│   └── ...               # Legal pages
├── components/
│   ├── sections/         # Page-level sections (Hero, Metrics, etc.)
│   ├── ui/               # Reusable UI components
│   └── layout/           # Header, Footer, Navigation
└── lib/                  # Utility functions and API clients
```

---

## Deployment

The frontend is designed for deployment on **Vercel**:

1. Connect your GitHub repository to Vercel
2. Set `NEXT_PUBLIC_API_URL` in Vercel environment variables
3. Vercel handles builds automatically on every push to `main`

---

## Notes

- The admin section at `/admin` requires valid credentials managed through the backend API. Do not expose admin credentials in any client-side code.
- The frontend supports static fallback data for pages like Case Studies if the backend API is unavailable.
