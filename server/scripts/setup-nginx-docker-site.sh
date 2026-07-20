#!/bin/bash

# Script to set up Nginx configuration for Docker-based Next.js instance
# Usage: ./setup-nginx-docker-site.sh <domain> <instance-name> <website-port> <api-port>

set -e

if [ "$#" -lt 4 ]; then
    echo "Usage: $0 <domain> <instance-name> <website-port> <api-port>"
    exit 1
fi

DOMAIN=$1
INSTANCE_NAME=$2
WEBSITE_PORT=$3
API_PORT=$4

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

DOMAIN_UNDERSCORE=$(echo "$DOMAIN" | tr '.' '_')
NGINX_CONFIG="/etc/nginx/sites-available/${DOMAIN}"
NGINX_ENABLED="/etc/nginx/sites-enabled/${DOMAIN}"

echo -e "${GREEN}Creating Nginx configuration for ${DOMAIN}...${NC}"

# Create Nginx configuration (HTTP-only first, Certbot will add SSL)
cat > "${NGINX_CONFIG}" <<EOF
# Nginx configuration for ${DOMAIN}
# Docker-based Next.js instance: ${INSTANCE_NAME}
# SSL will be added by Certbot

# Upstream for Next.js website container
upstream nextjs_${INSTANCE_NAME} {
    server 127.0.0.1:${WEBSITE_PORT};
    keepalive 64;
}

# Upstream for API container
upstream api_${INSTANCE_NAME} {
    server 127.0.0.1:${API_PORT};
    keepalive 64;
}

# HTTP server (will be upgraded to HTTPS by Certbot)
server {
    listen 80;
    listen [::]:80;
    server_name ${DOMAIN} www.${DOMAIN};

    # Allow Let's Encrypt verification
    location /.well-known/acme-challenge/ {
        root /var/www/html;
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;

    # Logging
    access_log /var/log/nginx/${DOMAIN}-access.log;
    error_log /var/log/nginx/${DOMAIN}-error.log;

    # Increase body size for file uploads
    client_max_body_size 50M;

    # API routes - proxy to API container
    location /api/ {
        proxy_pass http://api_${INSTANCE_NAME}/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
        proxy_read_timeout 300s;
        proxy_connect_timeout 75s;
    }

    # Health check endpoint
    location /health {
        proxy_pass http://api_${INSTANCE_NAME}/health;
        access_log off;
    }

    # Next.js application - proxy to website container
    location / {
        proxy_pass http://nextjs_${INSTANCE_NAME};
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
        proxy_read_timeout 300s;
        proxy_connect_timeout 75s;
    }

    # Cache static files
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot|webp|avif)$ {
        proxy_pass http://nextjs_${INSTANCE_NAME};
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }
}
EOF

# Enable site
if [ ! -L "${NGINX_ENABLED}" ]; then
    ln -s "${NGINX_CONFIG}" "${NGINX_ENABLED}"
    echo -e "${GREEN}Nginx site enabled${NC}"
else
    echo -e "${YELLOW}Nginx site already enabled${NC}"
fi

# Test Nginx configuration
echo -e "${YELLOW}Testing Nginx configuration...${NC}"
if nginx -t; then
    echo -e "${GREEN}Nginx configuration is valid${NC}"
    systemctl reload nginx
    echo -e "${GREEN}Nginx reloaded${NC}"
else
    echo -e "${RED}Nginx configuration test failed${NC}"
    exit 1
fi

echo -e "${GREEN}Nginx configuration created successfully!${NC}"
echo -e "${YELLOW}Note: Run Certbot to add SSL certificates:${NC}"
echo -e "${YELLOW}  sudo certbot --nginx -d ${DOMAIN} -d www.${DOMAIN}${NC}"

