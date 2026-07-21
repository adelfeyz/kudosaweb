#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

if [ ! -f "$ROOT/.env.local" ]; then
  cp "$ROOT/.env.example" "$ROOT/.env.local"
  echo "Created .env.local from .env.example"
fi

(cd "$ROOT/api-worker" && [ -d node_modules ] || npm install)
(cd "$ROOT" && [ -d node_modules ] || npm install)

node scripts/seed-local.js

export PORT=3051
(cd "$ROOT/api-worker" && npm run start:node) &
API_PID=$!

export PORT=3050
npm run dev

kill "$API_PID" 2>/dev/null || true
