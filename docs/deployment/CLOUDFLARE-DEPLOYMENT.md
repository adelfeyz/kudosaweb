# Cloudflare Deployment Guide

This guide explains how to deploy the application on Cloudflare Pages and Workers.

## Overview

The application can be deployed on Cloudflare with:
- **Cloudflare Pages**: Next.js website
- **Cloudflare Workers**: API server with D1 database

## Prerequisites

- Cloudflare account
- Wrangler CLI installed: `npm install -g wrangler`
- Cloudflare API token with appropriate permissions

## API Worker Deployment

### 1. Configure Wrangler

The API worker is configured in `api-worker/wrangler.toml`:

```toml
name = "unified-api"
compatibility_date = "2024-01-01"
main = "index.ts"

[[d1_databases]]
binding = "DB"
database_name = "pointer-database"
database_id = "your-database-id"

[[kv_namespaces]]
binding = "BLOG_API_KEYS"
id = "your-kv-namespace-id"
```

### 2. Set Environment Variables

Set secrets using Wrangler:

```bash
cd api-worker

# Set secrets
wrangler secret put BREVO_API_KEY
wrangler secret put JWT_SECRET
wrangler secret put TURNSTILE_SECRET_KEY
wrangler secret put OPENAI_API_KEY
wrangler secret put CLOUDFLARE_ACCOUNT_ID
wrangler secret put CLOUDFLARE_IMAGES_TOKEN
wrangler secret put CLOUDFLARE_ACCOUNT_HASH
```

### 3. Deploy Worker

```bash
cd api-worker
wrangler deploy
```

### 4. Initialize D1 Database

```bash
# Create database (if not exists)
wrangler d1 create pointer-database

# Run schema
wrangler d1 execute pointer-database --file=../database/schema.sql
```

## Next.js Pages Deployment

### 1. Build Configuration

The application uses `@opennextjs/cloudflare` adapter. Build with:

```bash
npm run build
```

### 2. Deploy to Cloudflare Pages

#### Using Wrangler:

```bash
wrangler pages deploy .next
```

#### Using Cloudflare Dashboard:

1. Go to Cloudflare Dashboard > Pages
2. Create new project
3. Connect your Git repository
4. Build settings:
   - Build command: `npm run build`
   - Build output directory: `.next`
   - Root directory: `/`

### 3. Environment Variables

Set in Cloudflare Pages dashboard:

- `NEXT_PUBLIC_API_BASE_URL`: Your Worker URL (e.g., `https://unified-api.your-subdomain.workers.dev`)
- `NEXT_PUBLIC_SITE_URL`: Your Pages URL

## Environment Variables

### Cloudflare Worker (API)

Set via `wrangler secret put` or in `wrangler.toml`:

- `BREVO_API_KEY`: Brevo email service
- `JWT_SECRET`: JWT signing secret
- `TURNSTILE_SECRET_KEY`: Cloudflare Turnstile
- `OPENAI_API_KEY`: OpenAI API key
- `CLOUDFLARE_ACCOUNT_ID`: Cloudflare account ID
- `CLOUDFLARE_IMAGES_TOKEN`: Cloudflare Images token
- `CLOUDFLARE_ACCOUNT_HASH`: Cloudflare account hash
- `CLOUDFLARE_ACCESS_AUD`: Cloudflare Access audience
- `CLOUDFLARE_ACCESS_TEAM_DOMAIN`: Cloudflare Access team domain
- `APP_BASE_URL`: Base URL of your application

### Cloudflare Pages (Website)

Set in Pages dashboard:

- `NEXT_PUBLIC_API_BASE_URL`: API Worker URL
- `NEXT_PUBLIC_SITE_URL`: Site URL
- `NODE_ENV`: `production`

## Custom Domain

### 1. Add Domain in Cloudflare

1. Go to Pages project > Custom domains
2. Add your domain
3. Follow DNS setup instructions

### 2. Update API Base URL

Update `NEXT_PUBLIC_API_BASE_URL` in Pages environment variables to use your custom domain:

```
https://api.yourdomain.com
```

## Differences from Docker Deployment

| Feature | Cloudflare | Docker |
|---------|-----------|--------|
| Database | D1 (SQLite) | SQLite file |
| API Server | Cloudflare Workers | Node.js/Hono |
| Website | Cloudflare Pages | Next.js standalone |
| KV Store | Cloudflare KV | In-memory Map |
| Scaling | Automatic | Manual |

## Monitoring

### Worker Logs

```bash
wrangler tail
```

### Pages Analytics

View in Cloudflare Dashboard > Pages > Analytics

### D1 Database

```bash
# Query database
wrangler d1 execute pointer-database --command="SELECT * FROM blog_posts LIMIT 10"

# Export data
wrangler d1 export pointer-database --output=backup.sql
```

## Updates

### Update Worker

```bash
cd api-worker
wrangler deploy
```

### Update Pages

- Automatic on Git push (if connected)
- Or manual: `wrangler pages deploy .next`

## Troubleshooting

### Worker Errors

1. Check logs: `wrangler tail`
2. Verify environment variables
3. Check D1 database bindings
4. Verify KV namespace bindings

### Pages Build Failures

1. Check build logs in dashboard
2. Verify `next.config.ts` Cloudflare adapter
3. Check environment variables
4. Verify build output directory

### Database Issues

```bash
# Check database
wrangler d1 execute pointer-database --command="SELECT COUNT(*) FROM blog_posts"

# Reset database (WARNING: deletes all data)
wrangler d1 execute pointer-database --file=../database/schema.sql
```

## Migration from Docker to Cloudflare

1. Export SQLite data from Docker
2. Import to D1 database
3. Update API URLs in environment variables
4. Deploy to Cloudflare
5. Update DNS records

## Best Practices

1. **Use secrets**: Never commit secrets to repository
2. **Environment variables**: Use Pages env vars for public config
3. **Database backups**: Regular D1 exports
4. **Monitoring**: Set up alerts in Cloudflare dashboard
5. **Rate limiting**: Configure in Workers
6. **Caching**: Leverage Cloudflare's CDN

## Support

For issues, refer to:
- [Docker Deployment Guide](./DOCKER-DEPLOYMENT.md)
- [Multi-Instance Guide](./MULTI-INSTANCE-GUIDE.md)
- [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/)
- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)

