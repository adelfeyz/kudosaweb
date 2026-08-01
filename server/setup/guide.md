Outlining the next steps to deploy on your Linux server:


[2 tools called]


Next steps to deploy on your Linux server:

## Next steps

### Step 1: Prepare your codebase (local)

1. Commit and push your changes:
   ```bash
   git add .
   git commit -m "Add Docker multi-instance deployment support"
   git push
   ```

2. Verify Docker files are ready:
   - `docker/website/Dockerfile` ✓
   - `docker/api/Dockerfile` ✓
   - `docker/docker-compose.multi-instance.yml` ✓
   - `api-worker/server.ts` ✓
   - `api-worker/app.ts` ✓

### Step 2: Set up your Linux server

1. SSH into your server:
   ```bash
   ssh user@your-server-ip
   ```

2. Clone the repository:
   ```bash
   cd /opt
   sudo git clone <your-repo-url> pointerwebsite
   cd pointerwebsite
   ```

3. Run the server setup script:
   ```bash
   cd server
   sudo chmod +x scripts/*.sh
   sudo ./scripts/server-setup.sh
   ```
   
   This installs:
   - Docker Engine
   - Docker Compose
   - Nginx
   - Certbot (SSL)
   - SQLite3

### Step 3: Build Docker images

On your server:
```bash
cd /opt/pointerwebsite
sudo docker compose -f docker/docker-compose.multi-instance.yml build
```

### Step 4: Create your first instance

```bash
cd /opt/pointerwebsite/server
sudo ./scripts/create-docker-instance.sh client1 yourdomain.com 3000 3001
```

This will:
- Create instance directory
- Generate environment file
- Set up Nginx configuration
- Create management scripts

### Step 5: Start the instance

```bash
cd /opt/docker-instances/instances/client1
./start.sh
```

### Step 6: Verify deployment

1. Check containers are running:
   ```bash
   docker ps | grep client1
   ```

2. Check logs:
   ```bash
   cd /opt/docker-instances/instances/client1
   ./logs.sh
   ```

3. Test endpoints:
   ```bash
   curl http://localhost:3001/health
   curl http://localhost:3000
   ```

### Step 7: Configure DNS

Point your domain to your server IP:
- A record: `yourdomain.com` → `your-server-ip`
- A record: `www.yourdomain.com` → `your-server-ip`

### Step 8: SSL certificate

The script should handle this automatically, but if needed:
```bash
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

## Quick reference

**Instance management:**
```bash
cd /opt/docker-instances/instances/<instance-name>
./start.sh    # Start
./stop.sh     # Stop
./restart.sh  # Restart
./logs.sh     # View logs
./remove.sh   # Remove (WARNING: deletes data)
```

**View all instances:**
```bash
ls -la /opt/docker-instances/instances/
```

**View running containers:**
```bash
docker ps
```

## Important notes

1. Environment variables: Edit `/opt/docker-instances/instances/<instance-name>/.env` to add API keys (BREVO, OpenAI, etc.)
2. Database: Each instance has its own SQLite database in a Docker volume
3. Ports: Each instance needs unique ports (3000/3001, 3002/3003, etc.)
4. Firewall: Ensure ports 80, 443, and your instance ports are open

## Troubleshooting

If you encounter issues:
- Check logs: `./logs.sh` in the instance directory
- Verify Docker: `docker ps` and `docker logs <container-name>`
- Check Nginx: `sudo nginx -t` and `sudo systemctl status nginx`
- Review documentation: `docs/deployment/DOCKER-DEPLOYMENT.md`

Start with Step 1 (preparing and pushing your code), then proceed to server setup.