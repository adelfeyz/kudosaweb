# Docker Deployment Guide

This guide explains how to deploy the application using Docker on an on-premise Linux server.

## Prerequisites

- Linux server (Ubuntu 20.04/22.04 recommended)
- Docker Engine 20.10+
- Docker Compose 2.0+
- At least 2GB RAM (4GB recommended)
- Domain name(s) pointing to your server IP

## Quick Start

### 1. Single Instance Deployment

```bash
# Clone the repository
git clone <your-repo-url>
cd pointerwebsite

# Copy environment template
cp docker/.env.example docker/.env

# Edit environment variables
nano docker/.env

# Build and start containers
cd docker
docker-compose up -d

# Check logs
docker-compose logs -f
```

### 2. Multi-Instance Deployment

For hosting multiple isolated instances:

```bash
# Create a new instance
cd scripts/docker
./create-instance.sh client1 example.com 3000 3001

# Start the instance
./start-instance.sh client1

# Or manually
cd instances/client1
./start.sh
```

## Architecture

The Docker deployment consists of two containers:

1. **Website Container**: Next.js application
   - Port: 3000 (configurable)
   - Build: Standalone Next.js output
   - Environment: Production

2. **API Container**: Hono-based API server with SQLite
   - Port: 3001 (configurable)
   - Database: SQLite (persisted in volume)
   - Environment: Production

## Environment Variables

### Website Container

- `NEXT_PUBLIC_API_BASE_URL`: API server URL (default: `http://api:3001`)
- `NEXT_PUBLIC_SITE_URL`: Public site URL
- `PORT`: Internal port (default: 3000)
- `NODE_ENV`: Environment (default: `production`)

### API Container

- `PORT`: API server port (default: 3001)
- `DB_PATH`: SQLite database path (default: `/app/data/database.db`)
- `JWT_SECRET`: JWT signing secret (required)
- `BREVO_API_KEY`: Brevo email service API key (optional)
- `TURNSTILE_SECRET_KEY`: Cloudflare Turnstile secret (optional)
- `OPENAI_API_KEY`: OpenAI API key for AI features (optional)

## Database Initialization

The database is automatically initialized on first start using the schema file:

```bash
# Manual initialization (if needed)
./scripts/docker/init-database.sh /app/data/database.db database/schema.sql
```

## Building Images

### Build website image:

```bash
docker build -f docker/website/Dockerfile -t pointer-website:latest .
```

### Build API image:

```bash
docker build -f docker/api/Dockerfile -t pointer-api:latest .
```

## Managing Instances

### List instances:

```bash
ls -la scripts/docker/instances/
```

### Start instance:

```bash
./scripts/docker/start-instance.sh <instance-name>
```

### Stop instance:

```bash
./scripts/docker/stop-instance.sh <instance-name>
```

### Remove instance:

```bash
./scripts/docker/remove-instance.sh <instance-name>
```

## Reverse Proxy Setup (Nginx)

Example Nginx configuration for a single instance:

```nginx
server {
    listen 80;
    server_name example.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /api {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

For multiple instances, use different ports and configure accordingly.

## SSL/TLS Setup

Use Let's Encrypt with Certbot:

```bash
sudo apt-get update
sudo apt-get install certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d example.com

# Auto-renewal is set up automatically
```

## Monitoring

### Check container status:

```bash
docker ps
docker-compose ps
```

### View logs:

```bash
# All containers
docker-compose logs -f

# Specific container
docker-compose logs -f website
docker-compose logs -f api
```

### Health checks:

```bash
# Website health
curl http://localhost:3000/api/health

# API health
curl http://localhost:3001/health
```

## Troubleshooting

### Containers won't start:

1. Check logs: `docker-compose logs`
2. Verify environment variables in `.env`
3. Check port conflicts: `netstat -tulpn | grep :3000`

### Database issues:

1. Check database file permissions
2. Verify schema file exists
3. Check volume mounts: `docker volume ls`

### API connection issues:

1. Verify `NEXT_PUBLIC_API_BASE_URL` is correct
2. Check network connectivity between containers
3. Verify API container is running: `docker ps | grep api`

## Backup and Restore

### Backup database:

```bash
docker exec <api-container> sqlite3 /app/data/database.db ".backup /app/data/backup.db"
docker cp <api-container>:/app/data/backup.db ./backup-$(date +%Y%m%d).db
```

### Restore database:

```bash
docker cp ./backup-20240101.db <api-container>:/app/data/database.db
docker restart <api-container>
```

## Updates

### Update application:

```bash
# Pull latest code
git pull

# Rebuild and restart
cd docker
docker-compose build
docker-compose up -d
```

## Security Considerations

1. **Change default secrets**: Always set strong `JWT_SECRET`
2. **Use HTTPS**: Configure SSL/TLS certificates
3. **Firewall**: Only expose necessary ports
4. **Regular updates**: Keep Docker and images updated
5. **Backup**: Regular database backups

## Performance Tuning

- **Memory limits**: Set appropriate limits in docker-compose.yml
- **CPU limits**: Configure CPU shares if needed
- **Database optimization**: SQLite works well for small-medium traffic
- **Caching**: Consider adding Redis for caching (future enhancement)

## Support

For issues or questions, please refer to:
- [Multi-Instance Guide](./MULTI-INSTANCE-GUIDE.md)
- [Cloudflare Deployment](./CLOUDFLARE-DEPLOYMENT.md)

