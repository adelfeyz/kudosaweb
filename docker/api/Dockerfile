# API Server Dockerfile
FROM node:20-alpine AS base

# Install dependencies
FROM base AS deps
RUN apk add --no-cache libc6-compat python3 make g++
WORKDIR /app

# Copy package files
COPY api-worker/package*.json ./
COPY api-worker/package-lock.json* ./

# Install dependencies
RUN npm ci

# Build stage
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY api-worker/ ./

# Build TypeScript (if needed)
RUN npm run build || true

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3001

# Create app user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 apiuser

# Create data directory for SQLite
RUN mkdir -p /app/data && chown -R apiuser:nodejs /app/data

# Copy necessary files
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/*.ts ./
COPY --from=builder /app/*.js ./
COPY --from=builder /app/lib ./lib
COPY --from=builder /app/package.json ./

# Copy database schema for initialization
COPY database/schema.sql /app/database/schema.sql

# Set correct permissions
RUN chown -R apiuser:nodejs /app

USER apiuser

EXPOSE 3001

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3001/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

CMD ["node", "server.js"]

