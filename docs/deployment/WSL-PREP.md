# WSL Preparation Guide (No Docker, SQLite)

Prepare a **dedicated third WSL distro** on `F:\wsl\` to host Raveshmand (and other sites) with **PM2 + Caddy**, one **SQLite file per site**, no Docker.

**Assumes:** WSL2 is already installed with **two existing distros**. This guide adds a **third** distro used only for web hosting.

---

## Overview

| Component | Role |
|-----------|------|
| WSL2 distro `RaveshmandHost` | Dedicated Linux VM for production web stack |
| Location | `F:\wsl\RaveshmandHost\` (ext4.vhdx) |
| Node.js 20 | Next.js website + Hono API |
| Caddy | HTTPS on 443, reverse proxy for all domains |
| PM2 | Always-on process manager (no open terminal) |
| SQLite | One `database.db` file per site instance |

**Important:** Only this hosting distro should bind ports **80** and **443**. Your other two WSL distros stay unchanged for dev/other work.

---

## Part 0 — Inspect your current WSL setup

PowerShell (normal or Admin):

```powershell
wsl --list --verbose
```

Example output:

```text
  NAME              STATE           VERSION
* Ubuntu            Running         2
  Debian            Stopped         2
```

Note the names — do **not** modify those distros. You will add a third.

Check existing VHDX files under your WSL storage:

```powershell
Get-ChildItem F:\wsl\ -Recurse -Filter *.vhdx
```

---

## Part 1 — Windows: Global WSL settings

Edit **`C:\Users\<YourWindowsUser>\.wslconfig`** (applies to **all** distros):

```ini
[wsl2]
systemd=true
networkingMode=mirrored
vmIdleTimeout=-1
```

| Setting | Purpose |
|---------|---------|
| `systemd=true` | Caddy + PM2 start on boot inside the hosting distro |
| `networkingMode=mirrored` | WSL shares Windows network; hosting distro can bind 443 |
| `vmIdleTimeout=-1` | WSL VMs stay running (no idle shutdown) |

Apply to every distro:

```powershell
wsl --shutdown
```

Wait 5–10 seconds before starting any distro again.

> If `networkingMode=mirrored` is unsupported on your Windows build, remove that line and use port forwarding (Part 5, Option B). Only the **hosting** distro should receive forwards for 80/443.

---

## Part 2 — Create the third distro at `F:\wsl\`

WSL does not support `wsl --install --location`. To place the distro on `F:\wsl\`, use **import**.

### 2.1 Choose a name

Use a dedicated name, e.g. **`RaveshmandHost`** (used throughout this guide).

### 2.2 Prepare the folder

PowerShell (Admin):

```powershell
New-Item -ItemType Directory -Force -Path F:\wsl\RaveshmandHost
New-Item -ItemType Directory -Force -Path F:\wsl\exports
```

### 2.3 Option A — Import Ubuntu rootfs (recommended, cleanest)

Download an Ubuntu WSL rootfs (e.g. [Ubuntu 22.04 rootfs](https://cloud-images.ubuntu.com/wsl/jammy/current/ubuntu-jammy-wsl-amd64-wsl.rootfs.tar.gz)) to `F:\wsl\exports\`, then:

```powershell
wsl --import RaveshmandHost F:\wsl\RaveshmandHost F:\wsl\exports\ubuntu-jammy-wsl-amd64-wsl.rootfs.tar.gz --version 2
```

### 2.3 Option B — Clone from an existing distro

If you want the same base packages as an existing Ubuntu:

```powershell
wsl --export Ubuntu F:\wsl\exports\Ubuntu-base.tar
wsl --import RaveshmandHost F:\wsl\RaveshmandHost F:\wsl\exports\Ubuntu-base.tar --version 2
```

This copies your first distro's state — only use if you want a duplicate, not a fresh OS.

### 2.4 Option C — Install via Store, then move to `F:\wsl\`

```powershell
wsl --install -d Ubuntu-22.04 --name RaveshmandHost --no-launch
wsl --export RaveshmandHost F:\wsl\exports\RaveshmandHost.tar
wsl --unregister RaveshmandHost
wsl --import RaveshmandHost F:\wsl\RaveshmandHost F:\wsl\exports\RaveshmandHost.tar --version 2
```

### 2.5 Set default user (imported distros start as root)

Find your uid after first login, or create a user:

```powershell
wsl -d RaveshmandHost
```

Inside WSL (as root):

```bash
# Create user (replace 'adel' with your username)
useradd -m -s /bin/bash adel
passwd adel
usermod -aG sudo adel
```

PowerShell — set default user (replace `1000` with `id -u adel` output):

```powershell
ubuntu2204 config --default-user adel
# If that command doesn't exist for imported distros, create /etc/wsl.conf inside the distro:
```

Inside `RaveshmandHost`, create **`/etc/wsl.conf`**:

```ini
[user]
default=adel
```

Then from PowerShell:

```powershell
wsl --shutdown
wsl -d RaveshmandHost
# You should land as adel, not root
```

### 2.6 Verify the third distro

```powershell
wsl --list --verbose
```

Expected:

```text
  NAME              STATE           VERSION
  Ubuntu            Stopped         2
  Debian            Stopped         2
* RaveshmandHost    Running         2
```

Confirm VHDX location:

```powershell
Get-ChildItem F:\wsl\RaveshmandHost\
# ext4.vhdx should be here
```

**Optional** — make hosting distro the default when you run plain `wsl`:

```powershell
wsl --set-default RaveshmandHost
```

Your other distros remain available via `wsl -d Ubuntu` and `wsl -d Debian`.

---

## Part 3 — Inside `RaveshmandHost` only

All remaining steps run in the **third distro**, not your other two:

```powershell
wsl -d RaveshmandHost
```

### 3.1 Update packages

```bash
sudo apt update && sudo apt upgrade -y
```

### 3.2 Build tools (required for `better-sqlite3`)

```bash
sudo apt install -y curl git build-essential python3
```

### 3.3 Node.js 20 + PM2

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
node -v   # v20.x
sudo npm install -g pm2
pm2 -v
```

### 3.4 Caddy (HTTPS reverse proxy)

```bash
sudo apt install -y debian-keyring debian-archive-keyring apt-transport-https curl
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | sudo gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | sudo tee /etc/apt/sources.list.d/caddy-stable.list
sudo apt update
sudo apt install -y caddy
sudo systemctl enable caddy
```

Do **not** start Caddy yet — configure `/etc/caddy/Caddyfile` after your first site build.

### 3.5 Verify systemd

```bash
ps -p 1 -o comm=
# should print: systemd
```

If you see `init`, fix `.wslconfig` → `systemd=true`, then `wsl --shutdown` from Windows.

---

## Part 4 — Project access from `RaveshmandHost`

Repo on Windows: `F:\code\Raveshmand`  
Inside this WSL distro: `/mnt/f/code/Raveshmand`

```bash
cd /mnt/f/code/Raveshmand
npm install
cd api-worker && npm install && cd ..
```

Verify SQLite native module:

```bash
cd /mnt/f/code/Raveshmand/api-worker
npm run build
node -e "require('better-sqlite3'); console.log('sqlite ok')"
```

**Performance tip:** `/mnt/f/` is slower than the WSL disk. For production you may later clone to `~/apps/Raveshmand` on `F:\wsl\RaveshmandHost\ext4.vhdx` — optional.

Store per-site SQLite files on the WSL disk (fast, persistent):

```bash
mkdir -p ~/instances/raveshmand/data
# DB_PATH=~/instances/raveshmand/data/database.db
```

---

## Part 5 — Windows: Firewall, ports, multi-WSL caution

### Only one distro owns 443

| Distro | Port 443 |
|--------|----------|
| `RaveshmandHost` | Yes — Caddy runs here |
| Your other 2 WSL distros | No — do not run Caddy/nginx on 443 there |

If another distro already uses 443, stop it or change its port before starting Caddy in `RaveshmandHost`.

### Firewall rules (once on Windows)

PowerShell (Admin):

```powershell
New-NetFirewallRule -DisplayName "WSL HTTPS 443" -Direction Inbound -LocalPort 443 -Protocol TCP -Action Allow
New-NetFirewallRule -DisplayName "WSL HTTP 80" -Direction Inbound -LocalPort 80 -Protocol TCP -Action Allow
```

### Mirrored networking (preferred)

With `networkingMode=mirrored`, Caddy in `RaveshmandHost` binds 443 directly.

### Port proxy fallback (no mirrored mode)

Target **only** the hosting distro:

```powershell
$wslIp = wsl -d RaveshmandHost hostname -I
$wslIp = $wslIp.Trim().Split(" ")[0]
netsh interface portproxy add v4tov4 listenport=443 listenaddress=0.0.0.0 connectport=443 connectaddress=$wslIp
netsh interface portproxy add v4tov4 listenport=80 listenaddress=0.0.0.0 connectport=80 connectaddress=$wslIp
```

### Router

Forward **TCP 443** and **80** from your public IP → this PC's LAN IP.

---

## Part 6 — Always-on (hosting distro only)

After PM2 apps are running (later step), **inside `RaveshmandHost`**:

```bash
pm2 save
pm2 startup systemd
# run the sudo command PM2 prints
```

### Windows Task Scheduler

Start **only** the hosting distro on login:

| Field | Value |
|-------|-------|
| Program | `C:\Windows\System32\wsl.exe` |
| Arguments | `-d RaveshmandHost -- bash -lc "pm2 resurrect"` |
| Trigger | At log on (delay 30 s) |

Optional wake-up task (runs first):

```text
wsl.exe -d RaveshmandHost -- true
```

Do **not** point this task at your other two distros.

---

## Part 7 — Verify preparation checklist

PowerShell:

```powershell
wsl -d RaveshmandHost -- bash -lc "node -v && pm2 -v && caddy version"
wsl -d RaveshmandHost -- bash -lc "ps -p 1 -o comm="
wsl -d RaveshmandHost -- bash -lc "test -d /mnt/f/code/Raveshmand && echo repo ok"
wsl -d RaveshmandHost -- bash -lc "cd /mnt/f/code/Raveshmand/api-worker && node -e \"require('better-sqlite3')\" && echo sqlite ok"
```

Confirm VHDX:

```powershell
Get-Item F:\wsl\RaveshmandHost\ext4.vhdx
```

---

## Part 8 — What comes next (first site)

Inside `RaveshmandHost`:

1. Create `~/instances/raveshmand/.env` — ports, public URLs, `JWT_SECRET`, `DB_PATH`
2. Build: `DOCKER_BUILD=true npm run build` (with env loaded)
3. Build API: `cd api-worker && npm run build`
4. PM2 start web + API for that instance
5. Edit `/etc/caddy/Caddyfile` → proxy your domain to localhost ports
6. `sudo systemctl restart caddy`
7. DNS A records → your public IP

---

## Quick reference

**Windows (Admin) — third distro at `F:\wsl\`:**

```powershell
wsl --list --verbose
New-Item -ItemType Directory -Force -Path F:\wsl\RaveshmandHost, F:\wsl\exports
# import rootfs (Part 2.3 Option A)
wsl --import RaveshmandHost F:\wsl\RaveshmandHost F:\wsl\exports\ubuntu-jammy-wsl-amd64-wsl.rootfs.tar.gz --version 2
# edit %USERPROFILE%\.wslconfig  (systemd, mirrored, vmIdleTimeout)
wsl --shutdown
wsl -d RaveshmandHost
```

**Inside `RaveshmandHost` only:**

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl git build-essential python3
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
sudo npm install -g pm2
# install Caddy (Part 3.4)
sudo systemctl enable caddy
cd /mnt/f/code/Raveshmand && npm install
cd api-worker && npm install && npm run build
mkdir -p ~/instances/raveshmand/data
```

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Third distro lands as root | Add `/etc/wsl.conf` with `[user] default=yourname`, then `wsl --shutdown` |
| `systemd` not running | `.wslconfig` → `systemd=true`, then `wsl --shutdown` |
| Port 443 already in use | Check other WSL distros and Windows IIS; only `RaveshmandHost` should use 443 |
| Wrong distro starts | Use `-d RaveshmandHost` explicitly; check `wsl --list --verbose` |
| VHDX not under `F:\wsl\` | Distro was installed to default path; export + import to `F:\wsl\RaveshmandHost` |
| `better-sqlite3` build fail | `sudo apt install build-essential python3`, then `npm rebuild` in api-worker |
| Slow npm on `/mnt/f/` | Clone repo to `~/apps/Raveshmand` inside hosting distro |
| Other WSL distros affected | Global `.wslconfig` applies to all; only install Caddy/PM2 apps in `RaveshmandHost` |

---

## Your three-WSL layout (summary)

```text
F:\wsl\
  Ubuntu\           ext4.vhdx    ← existing distro 1 (unchanged)
  Debian\           ext4.vhdx    ← existing distro 2 (unchanged)
  RaveshmandHost\   ext4.vhdx    ← new distro 3 (PM2 + Caddy + SQLite sites)
  exports\          *.tar        ← import/export backups

F:\code\Raveshmand\              ← repo (shared via /mnt/f/)
~/instances\                     ← per-site SQLite DBs (inside RaveshmandHost)
```
