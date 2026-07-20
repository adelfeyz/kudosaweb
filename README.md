# Raveshmand

A full-stack web application built with Next.js 15 and a Node.js API server.

## Project Overview

Raveshmand includes a customer-facing website and a built-in admin CRM dashboard featuring:
- **Next.js 15** with App Router and Turbopack
- **React 19** + **TypeScript 5**
- **Tailwind CSS 4**
- **Hono** API on Node.js
- **SQLite** database
- **JWT magic-link** authentication for CRM

## Prerequisites

- Node.js 20+
- npm
- SQLite CLI (for initial database setup), or use Docker

## Local Development

### 1. Environment

Copy the example env file and adjust as needed:

```powershell
copy .env.example .env.local
```

### 2. Initialize the database (first time only)

```powershell
cd api-worker && npm install && cd ..
npm run seed:local
```

This creates `data/database.db` and seeds the default admin user. No `sqlite3` CLI required.

**Windows note:** `better-sqlite3` needs MSVC build tools. If `npm install` fails in `api-worker`, use Docker instead.

### 3. Start both services

**Option A — convenience script:**

```powershell
.\scripts\start-local.ps1
```

**Option B — two terminals:**

```powershell
# Terminal 1 — API (port 3021)
cd api-worker
npm install
$env:PORT='3021'; npm run start:node

# Terminal 2 — Frontend (port 3020)
cd ..
npm install
npm run dev
```

**Option C — single command:**

```powershell
npm install
cd api-worker && npm install && cd ..
npm run dev:all
```

- Frontend: [http://localhost:3020](http://localhost:3020)
- API: [http://localhost:3021](http://localhost:3021)

### CRM login

Go to [http://localhost:3020/login](http://localhost:3020/login):

| Method | Details |
|--------|---------|
| **Password** | Username: `admin` — Password: value of `ADMIN_PASSWORD` in `.env.local` (default: `admin`) |
| **Magic link** | Use the Magic Link tab; without `BREVO_API_KEY`, the link is printed in the API server console |

Ensure `.env.local` includes `ADMIN_PASSWORD=admin` (included in `.env.example`).

### Build

```bash
npm run build       # Next.js production build (standalone)
npm run start       # Production server
npm run lint        # ESLint
```

## Docker Production

```powershell
cd docker
copy .env.example .env
# Edit .env — set JWT_SECRET and SITE_URL
docker compose up -d --build
```

- Website: port **3000**
- API: port **3001**
- SQLite persisted in Docker volume `pointer-db-data`
- Uploads persisted in Docker volume `pointer-uploads-data`

## Project Structure

```
raveshmand/
├── api-worker/          # Hono API (Node.js)
│   ├── app.ts           # Hono app setup
│   ├── index.ts         # Request handlers
│   ├── server.ts        # Node.js entry point
│   └── lib/             # API utilities
├── database/            # SQLite schema and seeds
├── docker/              # Docker configuration
├── scripts/             # Utility scripts
└── src/
    ├── app/             # Next.js App Router pages
    │   └── crm/         # Admin CRM dashboard
    ├── components/      # React components
    └── lib/             # Utilities and services
```

## Environment Variables

See [`.env.example`](.env.example) for the full local dev template.

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_API_BASE_URL` | Yes | API URL (default `http://localhost:3021`) |
| `NEXT_PUBLIC_SITE_URL` | Yes | Site URL (default `http://localhost:3020`) |
| `JWT_SECRET` | Yes | Secret for admin JWT tokens |
| `ADMIN_PASSWORD` | Yes (local) | CRM password for username `admin` (default `admin`) |
| `DB_PATH` | No | SQLite path (default `../data/database.db` from api-worker) |
| `BREVO_API_KEY` | No | Transactional email (magic links, forms) |
| `OPENAI_API_KEY` | No | AI blog assistant |
| `OPENROUTER_API_KEY` | No | AI model routing |

## Security

- JWT magic-link authentication for CRM
- API key authentication for external blog API
- Rate limiting
- CORS protection
- Input validation with Zod

## License

Private project — All rights reserved
