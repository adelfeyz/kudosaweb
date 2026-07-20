#!/bin/bash

# Script to create a new Docker-based Next.js instance
# Usage: ./create-docker-instance.sh <instance-name> <domain> [website-port] [api-port]

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

# Check if running as root
if [ "$EUID" -ne 0 ]; then 
    echo -e "${RED}Please run as root (use sudo)${NC}"
    exit 1
fi

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_ROOT="$( cd "$SCRIPT_DIR/../.." && pwd )"
INSTANCE_DIR="/opt/docker-instances/instances/${INSTANCE_NAME}"

# Check if ports are available
check_port() {
    local port=$1
    if netstat -tuln 2>/dev/null | grep -q ":${port} " || ss -tuln 2>/dev/null | grep -q ":${port} "; then
        echo -e "${RED}Port ${port} is already in use${NC}"
        exit 1
    fi
}

check_port $WEBSITE_PORT
check_port $API_PORT

echo -e "${GREEN}Creating Docker instance: ${INSTANCE_NAME}${NC}"
echo -e "${YELLOW}Domain: ${DOMAIN}${NC}"
echo -e "${YELLOW}Website Port: ${WEBSITE_PORT}${NC}"
echo -e "${YELLOW}API Port: ${API_PORT}${NC}"

# Create instance directory
echo -e "${YELLOW}Creating instance directory...${NC}"
mkdir -p "${INSTANCE_DIR}"

# Generate random JWT secret
JWT_SECRET=$(openssl rand -base64 32 | tr -d "=+/" | cut -c1-32)

# Create .env file for this instance
echo -e "${YELLOW}Creating environment file...${NC}"
cat > "${INSTANCE_DIR}/.env" <<EOF
# Instance Configuration
INSTANCE_NAME=${INSTANCE_NAME}
DOMAIN=${DOMAIN}

# Website Configuration
WEBSITE_PORT=${WEBSITE_PORT}
SITE_URL=https://${DOMAIN}
NEXT_PUBLIC_API_BASE_URL=http://api:3001
NEXT_PUBLIC_SITE_URL=https://${DOMAIN}

# API Configuration
API_PORT=${API_PORT}
API_BASE_URL=http://api:3001
DB_PATH=/app/data/database.db
SCHEMA_PATH=/app/database/schema.sql

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
NODE_ENV=production
EOF

# Prompt for optional API keys
read -p "Enter BREVO_API_KEY (press Enter to skip): " BREVO_KEY
if [ -n "$BREVO_KEY" ]; then
    sed -i "s|BREVO_API_KEY=\${BREVO_API_KEY:-}|BREVO_API_KEY=${BREVO_KEY}|" "${INSTANCE_DIR}/.env"
fi

read -p "Enter OPENAI_API_KEY (press Enter to skip): " OPENAI_KEY
if [ -n "$OPENAI_KEY" ]; then
    sed -i "s|OPENAI_API_KEY=\${OPENAI_API_KEY:-}|OPENAI_API_KEY=${OPENAI_KEY}|" "${INSTANCE_DIR}/.env"
fi

read -p "Enter TURNSTILE_SECRET_KEY (press Enter to skip): " TURNSTILE_KEY
if [ -n "$TURNSTILE_KEY" ]; then
    sed -i "s|TURNSTILE_SECRET_KEY=\${TURNSTILE_SECRET_KEY:-}|TURNSTILE_SECRET_KEY=${TURNSTILE_KEY}|" "${INSTANCE_DIR}/.env"
fi

# Create docker-compose override
echo -e "${YELLOW}Creating Docker Compose override...${NC}"
cat > "${INSTANCE_DIR}/docker-compose.override.yml" <<EOF
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

# Create management scripts
echo -e "${YELLOW}Creating management scripts...${NC}"

# Start script
cat > "${INSTANCE_DIR}/start.sh" <<'SCRIPT'
#!/bin/bash
cd "$(dirname "$0")"
docker compose -f ../../docker/docker-compose.multi-instance.yml -f docker-compose.override.yml --env-file .env up -d
SCRIPT

# Stop script
cat > "${INSTANCE_DIR}/stop.sh" <<'SCRIPT'
#!/bin/bash
cd "$(dirname "$0")"
docker compose -f ../../docker/docker-compose.multi-instance.yml -f docker-compose.override.yml --env-file .env down
SCRIPT

# Restart script
cat > "${INSTANCE_DIR}/restart.sh" <<'SCRIPT'
#!/bin/bash
cd "$(dirname "$0")"
docker compose -f ../../docker/docker-compose.multi-instance.yml -f docker-compose.override.yml --env-file .env restart
SCRIPT

# Logs script
cat > "${INSTANCE_DIR}/logs.sh" <<'SCRIPT'
#!/bin/bash
cd "$(dirname "$0")"
docker compose -f ../../docker/docker-compose.multi-instance.yml -f docker-compose.override.yml --env-file .env logs -f
SCRIPT

# Remove script
cat > "${INSTANCE_DIR}/remove.sh" <<'SCRIPT'
#!/bin/bash
cd "$(dirname "$0")"
echo "Warning: This will remove the instance and all its data (including database)."
read -p "Are you sure? (yes/no): " confirm
if [ "$confirm" = "yes" ]; then
    docker compose -f ../../docker/docker-compose.multi-instance.yml -f docker-compose.override.yml --env-file .env down -v
    cd ..
    rm -rf "$(basename "$(pwd)")"
    echo "Instance removed."
else
    echo "Aborted."
fi
SCRIPT

# Make scripts executable
chmod +x "${INSTANCE_DIR}"/*.sh

# Set up Nginx configuration
echo -e "${YELLOW}Setting up Nginx configuration...${NC}"
"${SCRIPT_DIR}/setup-nginx-docker-site.sh" "${DOMAIN}" "${INSTANCE_NAME}" "${WEBSITE_PORT}" "${API_PORT}"

# Generate SSL certificate (after nginx is running)
echo -e "${YELLOW}Setting up SSL certificate...${NC}"
echo -e "${YELLOW}Note: SSL certificate will be generated after containers are running.${NC}"
echo -e "${YELLOW}Run this command after starting the instance:${NC}"
echo -e "${GREEN}  sudo certbot --nginx -d ${DOMAIN} -d www.${DOMAIN}${NC}"

# Set permissions
if [ -n "$SUDO_USER" ]; then
    chown -R $SUDO_USER:$SUDO_USER "${INSTANCE_DIR}"
fi

echo ""
echo -e "${GREEN}=========================================="
echo "Docker instance created successfully!"
echo "==========================================${NC}"
echo ""
echo "Instance Details:"
echo "  Instance Name: ${INSTANCE_NAME}"
echo "  Domain: ${DOMAIN}"
echo "  Website Port: ${WEBSITE_PORT}"
echo "  API Port: ${API_PORT}"
echo "  Instance Directory: ${INSTANCE_DIR}"
echo ""
echo "Next steps:"
echo "1. Build Docker images:"
echo "   cd ${PROJECT_ROOT}"
echo "   docker compose -f docker/docker-compose.multi-instance.yml build"
echo ""
echo "2. Start the instance:"
echo "   cd ${INSTANCE_DIR}"
echo "   ./start.sh"
echo ""
echo "3. Check logs:"
echo "   cd ${INSTANCE_DIR}"
echo "   ./logs.sh"
echo ""
echo "4. View containers:"
echo "   docker ps | grep ${INSTANCE_NAME}"
echo ""

