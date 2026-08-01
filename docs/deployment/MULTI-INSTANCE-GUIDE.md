# Multi-Instance Deployment Guide

This guide explains how to manage multiple isolated instances of the application on a single server.

## Overview

Each instance is completely isolated with:
- Separate Docker containers
- Separate SQLite database
- Separate network
- Separate ports
- Separate environment variables

## Creating a New Instance

### Using the Script (Recommended)

```bash
cd scripts/docker
./create-instance.sh <instance-name> <domain> [website-port] [api-port]
```

Example:

```bash
./create-instance.sh client1 example.com 3000 3001
./create-instance.sh client2 anotherexample.com 3002 3003
```

This will:
1. Create instance directory structure
2. Generate environment file with unique JWT secret
3. Create Docker Compose override file
4. Create management scripts (start, stop, remove)

### Manual Creation

1. Create instance directory:
```bash
mkdir -p instances/client1
cd instances/client1
```

2. Create `.env` file (see template in `docker/.env.example`)

3. Create `docker-compose.override.yml`:
```yaml
version: '3.8'
services:
  website:
    container_name: client1-website
    ports:
      - "3000:3000"
  api:
    container_name: client1-api
    ports:
      - "3001:3001"
    volumes:
      - client1-db-data:/app/data
volumes:
  client1-db-data:
```

## Instance Management

### Start Instance

```bash
# Using script
./scripts/docker/start-instance.sh client1

# Or manually
cd instances/client1
docker-compose -f ../../docker/docker-compose.multi-instance.yml \
  -f docker-compose.override.yml \
  --env-file .env up -d
```

### Stop Instance

```bash
./scripts/docker/stop-instance.sh client1
```

### Remove Instance

```bash
./scripts/docker/remove-instance.sh client1
```

**Warning**: This will delete all data including the database!

## Port Allocation

Each instance needs unique ports. Recommended allocation:

| Instance | Website Port | API Port |
|----------|-------------|----------|
| client1  | 3000        | 3001     |
| client2  | 3002        | 3003     |
| client3  | 3004        | 3005     |
| ...      | ...         | ...      |

## Domain Configuration

### Nginx Configuration

For each instance, create an Nginx server block:

```nginx
# /etc/nginx/sites-available/client1.example.com
server {
    listen 80;
    server_name client1.example.com;

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

Enable the site:

```bash
sudo ln -s /etc/nginx/sites-available/client1.example.com /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### SSL Certificates

Get SSL certificate for each domain:

```bash
sudo certbot --nginx -d client1.example.com
sudo certbot --nginx -d client2.example.com
```

## Resource Allocation

### Memory Limits

Set memory limits in `docker-compose.override.yml`:

```yaml
services:
  website:
    deploy:
      resources:
        limits:
          memory: 512M
  api:
    deploy:
      resources:
        limits:
          memory: 256M
```

### CPU Limits

```yaml
services:
  website:
    deploy:
      resources:
        limits:
          cpus: '0.5'
```

## Monitoring Multiple Instances

### List All Instances

```bash
docker ps --filter "name=-website" --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
docker ps --filter "name=-api" --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
```

### Check Instance Health

```bash
# Website
curl http://localhost:3000/api/health

# API
curl http://localhost:3001/health
```

### View Logs

```bash
# Specific instance
docker logs client1-website -f
docker logs client1-api -f

# All instances
docker ps -q --filter "name=-website" | xargs docker logs -f
```

## Backup Strategy

### Automated Backup Script

Create `/usr/local/bin/backup-instances.sh`:

```bash
#!/bin/bash
BACKUP_DIR="/backups/instances"
DATE=$(date +%Y%m%d)

mkdir -p "$BACKUP_DIR"

for instance in instances/*/; do
    instance_name=$(basename "$instance")
    echo "Backing up $instance_name..."
    
    # Backup database
    docker exec "${instance_name}-api" sqlite3 /app/data/database.db \
        ".backup /app/data/backup.db"
    
    docker cp "${instance_name}-api:/app/data/backup.db" \
        "$BACKUP_DIR/${instance_name}-${DATE}.db"
    
    # Backup environment
    cp "$instance/.env" "$BACKUP_DIR/${instance_name}-${DATE}.env"
done

# Keep only last 7 days
find "$BACKUP_DIR" -name "*.db" -mtime +7 -delete
find "$BACKUP_DIR" -name "*.env" -mtime +7 -delete
```

Add to crontab:

```bash
0 2 * * * /usr/local/bin/backup-instances.sh
```

## Scaling Considerations

### When to Scale

- **Single instance**: < 1000 daily visitors
- **Multiple instances**: Each instance handles < 1000 daily visitors
- **Database size**: SQLite works well up to ~100GB

### Migration to PostgreSQL

For larger scale, consider migrating to PostgreSQL:

1. Export SQLite data
2. Import to PostgreSQL
3. Update API container to use PostgreSQL
4. Update docker-compose configuration

## Troubleshooting

### Port Conflicts

```bash
# Check what's using a port
sudo netstat -tulpn | grep :3000

# Find and stop conflicting service
docker ps | grep 3000
```

### Instance Won't Start

1. Check logs: `docker logs <container-name>`
2. Verify environment variables
3. Check disk space: `df -h`
4. Check Docker resources: `docker system df`

### Database Issues

```bash
# Check database file
docker exec <api-container> ls -la /app/data/

# Verify database integrity
docker exec <api-container> sqlite3 /app/data/database.db "PRAGMA integrity_check;"
```

## Best Practices

1. **Naming convention**: Use descriptive instance names
2. **Port allocation**: Document port assignments
3. **Backup regularly**: Automated daily backups
4. **Monitor resources**: Watch memory and CPU usage
5. **Update regularly**: Keep images and dependencies updated
6. **Documentation**: Document each instance's configuration
7. **Security**: Use strong secrets, enable HTTPS

## Example: Setting Up 3 Instances

```bash
# Create instances
./scripts/docker/create-instance.sh client1 client1.com 3000 3001
./scripts/docker/create-instance.sh client2 client2.com 3002 3003
./scripts/docker/create-instance.sh client3 client3.com 3004 3005

# Start all instances
./scripts/docker/start-instance.sh client1
./scripts/docker/start-instance.sh client2
./scripts/docker/start-instance.sh client3

# Configure Nginx for each domain
# (see Domain Configuration section)

# Get SSL certificates
sudo certbot --nginx -d client1.com -d client2.com -d client3.com
```

## Support

For issues, refer to:
- [Docker Deployment Guide](./DOCKER-DEPLOYMENT.md)
- [Cloudflare Deployment](./CLOUDFLARE-DEPLOYMENT.md)

