# Update @adelfeyz CRM packages from GitHub Packages, then optionally restart local servers.
#
# One-time GitHub setup:
#   1. https://github.com/settings/tokens -> Generate new token (classic)
#   2. Enable scope: read:packages
#   3. In this terminal:
#        $env:NODE_AUTH_TOKEN = "ghp_..."
#      Or permanently (then open a NEW terminal):
#        [Environment]::SetEnvironmentVariable("NODE_AUTH_TOKEN", "ghp_...", "User")
#
# Usage:
#   .\scripts\update-crm.ps1
#   .\scripts\update-crm.ps1 -Restart
#   npm run update:crm
#   npm run update:crm:restart

param(
    [switch]$Restart,
    [string]$SiteName = "pointer"
)

$ErrorActionPreference = "Stop"
$Root = Split-Path -Parent $PSScriptRoot
Set-Location $Root

function Write-CrmLog {
    param([string]$Message)
    Write-Host ("[{0}/crm] {1}" -f $SiteName, $Message)
}

if (-not $env:NODE_AUTH_TOKEN -or [string]::IsNullOrWhiteSpace($env:NODE_AUTH_TOKEN)) {
    Write-CrmLog "NODE_AUTH_TOKEN is not set."
    Write-Host ""
    Write-Host "GitHub Packages needs a classic PAT with read:packages."
    Write-Host "  1. Create token: https://github.com/settings/tokens"
    Write-Host "  2. Then in this terminal:"
    Write-Host '       $env:NODE_AUTH_TOKEN = "ghp_your_token_here"'
    Write-Host "  3. Re-run: .\scripts\update-crm.ps1"
    Write-Host ""
    exit 1
}

$npmrc = Join-Path $Root ".npmrc"
if (-not (Test-Path $npmrc)) {
    Write-CrmLog "Missing .npmrc (expected GitHub Packages registry for the CRM scope)."
    exit 1
}

$usePnpm = $null -ne (Get-Command pnpm -ErrorAction SilentlyContinue)
$useNpm = $null -ne (Get-Command npm -ErrorAction SilentlyContinue)

# Package names must be quoted: bare @name is PowerShell splat syntax.
$crmPackages = @('@adelfeyz/ui', '@adelfeyz/sdk', '@adelfeyz/api')
Write-CrmLog ("Updating {0} from GitHub Packages..." -f ($crmPackages -join ' '))

if ($usePnpm) {
    & pnpm update @crmPackages
    if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
}
elseif ($useNpm) {
    & npm update @crmPackages
    if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
}
else {
    Write-CrmLog "Neither pnpm nor npm found in PATH."
    exit 1
}

Write-CrmLog "Packages updated."

# better-sqlite3 ships without a prebuilt for some Node versions; rebuild native bindings.
Write-CrmLog "Rebuilding better-sqlite3 native bindings..."
if ($usePnpm) {
    & pnpm rebuild better-sqlite3 2>$null
    $bs3Dirs = Get-ChildItem -Path (Join-Path $Root "node_modules\.pnpm") -Directory -Filter "better-sqlite3@*" -ErrorAction SilentlyContinue
    foreach ($dir in $bs3Dirs) {
        $pkg = Join-Path $dir.FullName "node_modules\better-sqlite3"
        $node = Join-Path $pkg "build\Release\better_sqlite3.node"
        if ((Test-Path $pkg) -and -not (Test-Path $node)) {
            Write-CrmLog ("Building {0}..." -f $dir.Name)
            Push-Location $pkg
            try {
                & npm run build-release
                if ($LASTEXITCODE -ne 0) { throw "better-sqlite3 build-release failed" }
            }
            finally {
                Pop-Location
            }
        }
    }
}
elseif ($useNpm) {
    & npm rebuild better-sqlite3
    if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
}

if ($Restart) {
    $startLocal = Join-Path $Root "scripts\start-local.ps1"
    if (Test-Path $startLocal) {
        Write-CrmLog "Restarting local servers..."
        & $startLocal -Restart
    }
    else {
        Write-CrmLog "No scripts/start-local.ps1 - restart web + API yourself."
    }
}
else {
    Write-CrmLog "Done. Restart servers when ready: .\scripts\start-local.ps1 -Restart"
}
