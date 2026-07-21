# Kudosa

Marketing site and CRM for **کادوسا (Kudosa)** — a gamification platform for team performance improvement.

Built with Next.js 15 and a Node.js API server.

## Project Overview

Kudosa includes a customer-facing website and a built-in admin CRM dashboard featuring:
- **Next.js 15** with App Router and Turbopack
- **React 19** + **TypeScript 5**
- **Tailwind CSS 4**
- **Hono** API on Node.js
- **SQLite** database
- **JWT magic-link** authentication for CRM

Production domain: [https://kudosa.ir/](https://kudosa.ir/)

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

### 3. Start the app

```powershell
npm run dev:all
```

- Web: http://localhost:3050
- API: http://localhost:3051

Or use the PowerShell helper:

```powershell
npm run start:local
```

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Next.js on port 3050 |
| `npm run dev:api` | API server on port 3051 |
| `npm run dev:all` | Web + API together |
| `npm run build` | Production build |
| `npm run check:brand` | Guard against legacy brand strings |

## Repository

https://github.com/adelfeyz/kudosaweb
