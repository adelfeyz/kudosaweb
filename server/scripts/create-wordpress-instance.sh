#!/bin/bash

# Script to create a new WordPress site
# Usage: ./create-wordpress-instance.sh <domain> <site-name>

set -e

if [ "$#" -ne 2 ]; then
    echo "Usage: $0 <domain> <site-name>"
    echo "Example: $0 example.com mysite"
    exit 1
fi

DOMAIN=$1
SITE_NAME=$2

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
BASE_DIR="/var/www/wordpress"
SITE_DIR="${BASE_DIR}/${DOMAIN}"
DB_NAME="${SITE_NAME//-/_}"  # Replace hyphens with underscores for DB name
DB_USER="${DB_NAME}_user"
DB_PASSWORD=$(openssl rand -base64 32 | tr -d "=+/" | cut -c1-25)

echo -e "${GREEN}Creating WordPress site: ${SITE_NAME}${NC}"
echo -e "${YELLOW}Domain: ${DOMAIN}${NC}"

# Create directory structure
echo -e "${YELLOW}Creating directory structure...${NC}"
mkdir -p "${SITE_DIR}"

# Create MySQL database
echo -e "${YELLOW}Creating MySQL database...${NC}"
read -sp "Enter MySQL root password: " MYSQL_PASSWORD
echo ""

mysql -u root -p"${MYSQL_PASSWORD}" <<EOF
CREATE DATABASE IF NOT EXISTS ${DB_NAME};
CREATE USER IF NOT EXISTS '${DB_USER}'@'localhost' IDENTIFIED BY '${DB_PASSWORD}';
GRANT ALL PRIVILEGES ON ${DB_NAME}.* TO '${DB_USER}'@'localhost';
FLUSH PRIVILEGES;
EOF

# Download WordPress
echo -e "${YELLOW}Downloading WordPress...${NC}"
cd /tmp
wget -q https://wordpress.org/latest.tar.gz
tar -xzf latest.tar.gz
mv wordpress/* "${SITE_DIR}/"
rm -rf wordpress latest.tar.gz

# Set up WordPress configuration
echo -e "${YELLOW}Configuring WordPress...${NC}"
cd "${SITE_DIR}"
cp wp-config-sample.php wp-config.php

# Generate WordPress keys
WP_KEYS=$(curl -s https://api.wordpress.org/secret-key/1.1/salt/)

# Update wp-config.php
sed -i "s/database_name_here/${DB_NAME}/" wp-config.php
sed -i "s/username_here/${DB_USER}/" wp-config.php
sed -i "s/password_here/${DB_PASSWORD}/" wp-config.php
sed -i "s/localhost/localhost/" wp-config.php

# Add WordPress keys
sed -i "/put your unique phrase here/d" wp-config.php
sed -i "/AUTH_KEY/a\\${WP_KEYS}" wp-config.php

# Set permissions
echo -e "${YELLOW}Setting permissions...${NC}"
chown -R www-data:www-data "${SITE_DIR}"
find "${SITE_DIR}" -type d -exec chmod 755 {} \;
find "${SITE_DIR}" -type f -exec chmod 644 {} \;

# Set up Nginx configuration
echo -e "${YELLOW}Setting up Nginx configuration...${NC}"
"${SCRIPT_DIR}/setup-nginx-site.sh" "${DOMAIN}" "wordpress"

# Generate SSL certificate
echo -e "${YELLOW}Generating SSL certificate...${NC}"
certbot --nginx -d "${DOMAIN}" -d "www.${DOMAIN}" --non-interactive --agree-tos --email "admin@${DOMAIN}" || {
    echo -e "${YELLOW}SSL certificate generation failed. You can run certbot manually later.${NC}"
}

echo ""
echo -e "${GREEN}=========================================="
echo "WordPress site created successfully!"
echo "==========================================${NC}"
echo ""
echo "Site Details:"
echo "  Domain: ${DOMAIN}"
echo "  Site Name: ${SITE_NAME}"
echo "  Directory: ${SITE_DIR}"
echo "  Database: ${DB_NAME}"
echo "  Database User: ${DB_USER}"
echo "  Database Password: ${DB_PASSWORD}"
echo ""
echo "Next steps:"
echo "1. Visit https://${DOMAIN} to complete WordPress installation"
echo "2. Use the database credentials above when prompted"
echo ""

