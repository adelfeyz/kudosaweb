# Docker Deployment

This directory contains Docker configuration files for on-premise deployment.

## Quick Start

### Single Instance

```bash
# Copy environment template
cp .env.example .env

# Edit environment variables
nano .env

# Start containers
docker-compose up -d

# View logs
docker-compose logs -f
```

### Multiple Instances

```bash
# Create instance
cd ../scripts/docker
./create-instance.sh client1 example.com 3000 3001

# Start instance
./start-instance.sh client1
```

## Directory Structure

```
docker/
├── website/              # Website container files
│   ├── Dockerfile
│   └── .dockerignore
├── api/                  # API container files
│   ├── Dockerfile
│   ├── .dockerignore
│   └── entrypoint.sh
├── docker-compose.yml     # Single instance compose
├── docker-compose.multi-instance.yml  # Multi-instance template
└── README.md             # This file
```

## Files

- `website/Dockerfile`: Next.js website container
- `api/Dockerfile`: API server container with SQLite
- `api/entrypoint.sh`: Database initialization script
- `docker-compose.yml`: Single instance configuration
- `docker-compose.multi-instance.yml`: Multi-instance template

## Documentation

- [Docker Deployment Guide](../docs/deployment/DOCKER-DEPLOYMENT.md)
- [Multi-Instance Guide](../docs/deployment/MULTI-INSTANCE-GUIDE.md)
- [Cloudflare Deployment](../docs/deployment/CLOUDFLARE-DEPLOYMENT.md)

## Support

For issues or questions, please refer to the documentation or create an issue.

