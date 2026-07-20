#!/bin/bash

# Script to create a new isolated Docker instance
# Usage: ./create-instance.sh <instance-name> <domain> [website-port] [api-port]

set -e

if [ "$#" -lt 2 ]; then
    echo "Usage: $0 <instance-name> <domain> [website-port] [api-port]"
    echo "Example: $0 client1 example.com 3000 3001"
    exit 1
fi

INSTANCE_NAME=$1
DOMAIN=$2
WEBSITE_PORT=${3:-3000}
API_PORT=${4:-3001}

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${GREEN}Creating Docker instance: ${INSTANCE_NAME}${NC}"

# Create instance directory
INSTANCE_DIR="instances/${INSTANCE_NAME}"
mkdir -p "$INSTANCE_DIR"

# Generate random JWT secret
JWT_SECRET=$(openssl rand -base64 32 | tr -d "=+/" | cut -c1-32)

# Create .env file for this instance
cat > "$INSTANCE_DIR/.env" <<EOF
# Instance Configuration
INSTANCE_NAME=${INSTANCE_NAME}
DOMAIN=${DOMAIN}

# Website Configuration
WEBSITE_PORT=${WEBSITE_PORT}
SITE_URL=https://${DOMAIN}

# API Configuration
API_PORT=${API_PORT}
API_BASE_URL=http://api:3001

# Database Configuration
DB_PATH=/app/data/database.db

# Security
JWT_SECRET=${JWT_SECRET}
TURNSTILE_SECRET_KEY=\${TURNSTILE_SECRET_KEY:-}

# External Services
BREVO_API_KEY=\${BREVO_API_KEY:-}
OPENAI_API_KEY=\${OPENAI_API_KEY:-}

# Cloudflare (optional)
CLOUDFLARE_ACCOUNT_ID=\${CLOUDFLARE_ACCOUNT_ID:-}
CLOUDFLARE_IMAGES_TOKEN=\${CLOUDFLARE_IMAGES_TOKEN:-}
CLOUDFLARE_ACCOUNT_HASH=\${CLOUDFLARE_ACCOUNT_HASH:-}
CLOUDFLARE_ACCESS_AUD=\${CLOUDFLARE_ACCESS_AUD:-}
CLOUDFLARE_ACCESS_TEAM_DOMAIN=\${CLOUDFLARE_ACCESS_TEAM_DOMAIN:-}

# Build Configuration
DOCKER_BUILD=true
EOF

# Create docker-compose override
cat > "$INSTANCE_DIR/docker-compose.override.yml" <<EOF
version: '3.8'

services:
  website:
    container_name: ${INSTANCE_NAME}-website
    ports:
      - "${WEBSITE_PORT}:3000"
    environment:
      - NEXT_PUBLIC_API_BASE_URL=http://api:3001
      - NEXT_PUBLIC_SITE_URL=https://${DOMAIN}

  api:
    container_name: ${INSTANCE_NAME}-api
    ports:
      - "${API_PORT}:3001"
    volumes:
      - ${INSTANCE_NAME}-db-data:/app/data

volumes:
  ${INSTANCE_NAME}-db-data:
    driver: local
EOF

# Create start script
cat > "$INSTANCE_DIR/start.sh" <<'SCRIPT'
#!/bin/bash
cd "$(dirname "$0")"
docker-compose -f ../../docker/docker-compose.multi-instance.yml -f docker-compose.override.yml --env-file .env up -d
SCRIPT

# Create stop script
cat > "$INSTANCE_DIR/stop.sh" <<'SCRIPT'
#!/bin/bash
cd "$(dirname "$0")"
docker-compose -f ../../docker/docker-compose.multi-instance.yml -f docker-compose.override.yml --env-file .env down
SCRIPT

# Create remove script
cat > "$INSTANCE_DIR/remove.sh" <<'SCRIPT'
#!/bin/bash
cd "$(dirname "$0")"
docker-compose -f ../../docker/docker-compose.multi-instance.yml -f docker-compose.override.yml --env-file .env down -v
rm -rf "$(dirname "$0")"
SCRIPT

# Make scripts executable
chmod +x "$INSTANCE_DIR"/*.sh

echo -e "${GREEN}Instance created successfully!${NC}"
echo -e "${YELLOW}Instance directory: ${INSTANCE_DIR}${NC}"
echo -e "${YELLOW}To start: cd ${INSTANCE_DIR} && ./start.sh${NC}"
echo -e "${YELLOW}To stop: cd ${INSTANCE_DIR} && ./stop.sh${NC}"
echo -e "${YELLOW}To remove: cd ${INSTANCE_DIR} && ./remove.sh${NC}"

