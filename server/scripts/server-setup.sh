#!/bin/bash

# Linux Server Setup Script for Docker-based Multi-Site Hosting
# Supports WordPress (MySQL) and Next.js projects (Docker with SQLite)
# Optimized for 2GB RAM servers

set -e

echo "=========================================="
echo "Linux Server Setup for Docker Deployment"
echo "=========================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if running as root
if [ "$EUID" -ne 0 ]; then 
    echo -e "${RED}Please run as root (use sudo)${NC}"
    exit 1
fi

# Update system
echo -e "${GREEN}[1/8] Updating system packages...${NC}"
export DEBIAN_FRONTEND=noninteractive
apt-get update
apt-get upgrade -y

# Install basic utilities
echo -e "${GREEN}[2/8] Installing basic utilities...${NC}"
apt-get install -y \
    curl \
    wget \
    git \
    unzip \
    software-properties-common \
    apt-transport-https \
    ca-certificates \
    gnupg \
    lsb-release \
    ufw \
    fail2ban \
    htop \
    nano \
    vim \
    sqlite3

# Install Docker
echo -e "${GREEN}[3/8] Installing Docker...${NC}"
if ! command -v docker &> /dev/null; then
    # Remove old versions
    apt-get remove -y docker docker-engine docker.io containerd runc 2>/dev/null || true
    
    # Add Docker's official GPG key
    install -m 0755 -d /etc/apt/keyrings
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
    chmod a+r /etc/apt/keyrings/docker.gpg
    
    # Set up repository
    echo \
      "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
      $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null
    
    # Install Docker Engine
    apt-get update
    apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
    
    # Start Docker
    systemctl enable docker
    systemctl start docker
else
    echo -e "${YELLOW}Docker is already installed${NC}"
fi

# Install Docker Compose (standalone if not included)
if ! command -v docker-compose &> /dev/null && ! docker compose version &> /dev/null; then
    echo -e "${GREEN}Installing Docker Compose standalone...${NC}"
    DOCKER_COMPOSE_VERSION=$(curl -s https://api.github.com/repos/docker/compose/releases/latest | grep 'tag_name' | cut -d\" -f4)
    curl -L "https://github.com/docker/compose/releases/download/${DOCKER_COMPOSE_VERSION}/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    chmod +x /usr/local/bin/docker-compose
fi

# Install Nginx
echo -e "${GREEN}[4/8] Installing Nginx...${NC}"
apt-get install -y nginx
systemctl enable nginx
systemctl start nginx

# Install MySQL (for WordPress only)
echo -e "${GREEN}[5/8] Installing MySQL (for WordPress)...${NC}"
read -p "Do you want to install MySQL for WordPress support? (y/n): " install_mysql
if [ "$install_mysql" = "y" ] || [ "$install_mysql" = "Y" ]; then
apt-get install -y mysql-server
systemctl enable mysql
    systemctl start mysql

# Configure MySQL for low memory
echo -e "${YELLOW}Configuring MySQL for 2GB RAM...${NC}"
    mkdir -p /etc/mysql/mysql.conf.d/
cat > /etc/mysql/mysql.conf.d/99-low-memory.cnf << 'EOF'
[mysqld]
# Low memory configuration for 2GB RAM server
innodb_buffer_pool_size = 400M
innodb_log_file_size = 64M
innodb_flush_log_at_trx_commit = 2
innodb_flush_method = O_DIRECT
key_buffer_size = 32M
max_connections = 50
thread_cache_size = 4
table_open_cache = 2000
tmp_table_size = 32M
max_heap_table_size = 32M
query_cache_type = 0
query_cache_size = 0
EOF
systemctl restart mysql

# Secure MySQL installation
echo -e "${YELLOW}Securing MySQL installation...${NC}"
mysql -e "ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '';" 2>/dev/null || true
mysql -e "DELETE FROM mysql.user WHERE User='';" 2>/dev/null || true
mysql -e "DELETE FROM mysql.user WHERE User='root' AND Host NOT IN ('localhost', '127.0.0.1', '::1');" 2>/dev/null || true
mysql -e "DROP DATABASE IF EXISTS test;" 2>/dev/null || true
mysql -e "DELETE FROM mysql.db WHERE Db='test' OR Db='test\\_%';" 2>/dev/null || true
mysql -e "FLUSH PRIVILEGES;" 2>/dev/null || true
else
    echo -e "${YELLOW}Skipping MySQL installation${NC}"
fi

# Install PHP and PHP-FPM for WordPress
echo -e "${GREEN}[6/8] Installing PHP and PHP-FPM (for WordPress)...${NC}"
read -p "Do you want to install PHP for WordPress support? (y/n): " install_php
if [ "$install_php" = "y" ] || [ "$install_php" = "Y" ]; then
    apt-get install -y \
        php8.2-fpm \
        php8.2-mysql \
        php8.2-xml \
        php8.2-mbstring \
        php8.2-curl \
        php8.2-zip \
        php8.2-gd \
        php8.2-intl
    systemctl enable php8.2-fpm
    systemctl start php8.2-fpm
else
    echo -e "${YELLOW}Skipping PHP installation${NC}"
fi

# Install Certbot for SSL
echo -e "${GREEN}[7/8] Installing Certbot...${NC}"
apt-get install -y certbot python3-certbot-nginx

# Configure firewall
echo -e "${GREEN}[8/8] Configuring firewall...${NC}"
ufw --force enable
ufw allow 22/tcp
ufw allow 80/tcp
ufw allow 443/tcp
ufw reload

# Add current user to docker group
echo -e "${YELLOW}Adding user to docker group...${NC}"
if [ -n "$SUDO_USER" ]; then
    usermod -aG docker $SUDO_USER
    echo -e "${GREEN}User $SUDO_USER added to docker group. Please log out and back in for changes to take effect.${NC}"
fi

# Create directory structure
echo -e "${YELLOW}Creating directory structure...${NC}"
mkdir -p /var/www/wordpress
mkdir -p /opt/docker-instances
mkdir -p /opt/docker-instances/instances
mkdir -p /var/log/docker-instances
mkdir -p /etc/nginx/sites-available
mkdir -p /etc/nginx/sites-enabled

# Set up swap space (2GB for 2GB RAM server)
echo -e "${YELLOW}Setting up swap space...${NC}"
if [ ! -f /swapfile ]; then
    fallocate -l 2G /swapfile
    chmod 600 /swapfile
    mkswap /swapfile
    swapon /swapfile
    echo '/swapfile none swap sw 0 0' >> /etc/fstab
    echo -e "${GREEN}Swap file created (2GB)${NC}"
else
    echo -e "${YELLOW}Swap file already exists${NC}"
fi

# Set permissions
echo -e "${YELLOW}Setting permissions...${NC}"
if [ -n "$SUDO_USER" ]; then
    chown -R $SUDO_USER:$SUDO_USER /opt/docker-instances
chown -R $SUDO_USER:$SUDO_USER /var/www
fi
chmod -R 755 /var/www
chmod -R 755 /opt/docker-instances

# Test Docker installation
echo -e "${YELLOW}Testing Docker installation...${NC}"
docker run hello-world > /dev/null 2>&1 && echo -e "${GREEN}Docker is working correctly${NC}" || echo -e "${RED}Docker test failed${NC}"

echo ""
echo -e "${GREEN}=========================================="
echo "Server setup completed successfully!"
echo "==========================================${NC}"
echo ""
echo "Installed components:"
echo "  ✓ Docker Engine"
echo "  ✓ Docker Compose"
echo "  ✓ Nginx"
if [ "$install_mysql" = "y" ] || [ "$install_mysql" = "Y" ]; then
    echo "  ✓ MySQL (for WordPress)"
fi
if [ "$install_php" = "y" ] || [ "$install_php" = "Y" ]; then
    echo "  ✓ PHP-FPM (for WordPress)"
fi
echo "  ✓ Certbot (SSL certificates)"
echo "  ✓ SQLite3"
echo ""
echo "Next steps:"
echo "1. Copy project files to /opt/docker-instances/"
echo "2. Run: ./create-docker-instance.sh <instance-name> <domain>"
echo "3. Configure Nginx reverse proxy"
echo ""
echo -e "${YELLOW}IMPORTANT:${NC}"
echo "- Log out and back in for Docker group membership to take effect"
echo "- For Docker instances, use the scripts in scripts/docker/"
echo "- For WordPress, use create-wordpress-instance.sh"
echo ""
