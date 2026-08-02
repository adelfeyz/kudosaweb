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
    [string]$SiteName = "kudosa"
)

$ErrorActionPreference = "Stop"
# Resolve real path casing (Windows pnpm bugs on lowercase paths).
$Root = (Get-Item -LiteralPath (Split-Path -Parent $PSScriptRoot)).FullName
Set-Location -LiteralPath $Root

function Write-CrmLog {
    param([string]$Message)
    Write-Host ("[{0}/crm] {1}" -f $SiteName, $Message)
}

function Test-IsWindowsNativeBinary {
    param([string]$Path)
    if (-not (Test-Path -LiteralPath $Path)) { return $false }
    try {
        $bytes = [System.IO.File]::ReadAllBytes((Resolve-Path -LiteralPath $Path).Path)
        if ($bytes.Length -lt 2) { return $false }
        return ($bytes[0] -eq 0x4D -and $bytes[1] -eq 0x5A)
    }
    catch {
        return $false
    }
}

function Get-BetterSqlite3PackageDirs {
    param([string]$SearchRoot)

    $pkgDirs = @()
    $pnpmRoot = Join-Path $SearchRoot "node_modules\.pnpm"
    if (Test-Path -LiteralPath $pnpmRoot) {
        Get-ChildItem -Path $pnpmRoot -Directory -Filter "better-sqlite3@*" -ErrorAction SilentlyContinue | ForEach-Object {
            $pkg = Join-Path $_.FullName "node_modules\better-sqlite3"
            if (Test-Path -LiteralPath (Join-Path $pkg "package.json")) { $pkgDirs += $pkg }
        }
    }

    $hoisted = Join-Path $SearchRoot "node_modules\better-sqlite3"
    if (Test-Path -LiteralPath $hoisted) {
        $item = Get-Item -LiteralPath $hoisted -Force
        $target = $hoisted
        if ($item.LinkType -and $item.Target) {
            $t = @($item.Target)[0]
            if ($t) { $target = [string]$t }
        }
        if (Test-Path -LiteralPath (Join-Path $target "package.json")) {
            $pkgDirs += $target
        }
        elseif (-not (Test-Path -LiteralPath (Join-Path $hoisted "package.json"))) {
            # Broken stub left by mixed installs — remove so Node resolves the .pnpm copy.
            Remove-Item -LiteralPath $hoisted -Recurse -Force -ErrorAction SilentlyContinue
        }
    }

    return @($pkgDirs | Where-Object { $_ } | Select-Object -Unique)
}

function Repair-BetterSqlite3 {
    Write-CrmLog "Rebuilding better-sqlite3 native bindings..."

    $pkgDirs = @(Get-BetterSqlite3PackageDirs -SearchRoot $Root)

    # Follow linked @adelfeyz/api (e.g. kudosa -> pointer) and repair that tree too.
    $apiLink = Join-Path $Root "node_modules\@adelfeyz\api"
    if (Test-Path -LiteralPath $apiLink) {
        try {
            $apiResolved = (Resolve-Path -LiteralPath $apiLink).Path
            $cursor = $apiResolved
            while ($cursor -and (Split-Path $cursor -Leaf) -ne "node_modules") {
                $parent = Split-Path $cursor -Parent
                if (-not $parent -or $parent -eq $cursor) { break }
                $cursor = $parent
            }
            if ((Split-Path $cursor -Leaf) -eq "node_modules") {
                $linkedRoot = Split-Path $cursor -Parent
                if ($linkedRoot -and ($linkedRoot -ne $Root)) {
                    Write-CrmLog ("Also checking linked CRM install at {0}" -f $linkedRoot)
                    $pkgDirs += Get-BetterSqlite3PackageDirs -SearchRoot $linkedRoot
                }
            }
        }
        catch { }
    }

    $pkgDirs = @($pkgDirs | Where-Object { $_ } | Select-Object -Unique)
    if ($pkgDirs.Count -eq 0) {
        Write-CrmLog "No better-sqlite3 package found to rebuild."
        return
    }

    $goodBinary = $null
    foreach ($pkg in $pkgDirs) {
        $node = Join-Path $pkg "build\Release\better_sqlite3.node"
        if (Test-IsWindowsNativeBinary $node) {
            & node -e "try{require(process.argv[1]);process.exit(0)}catch(e){process.exit(1)}" $pkg 2>$null
            if ($LASTEXITCODE -eq 0) {
                $goodBinary = $node
                break
            }
        }
    }

    foreach ($pkg in $pkgDirs) {
        $node = Join-Path $pkg "build\Release\better_sqlite3.node"
        $needsBuild = -not (Test-IsWindowsNativeBinary $node)
        if (-not $needsBuild) {
            & node -e "try{require(process.argv[1]);process.exit(0)}catch(e){process.exit(1)}" $pkg 2>$null
            if ($LASTEXITCODE -ne 0) { $needsBuild = $true }
        }

        if (-not $needsBuild) {
            Write-CrmLog ("better-sqlite3 OK: {0}" -f $pkg)
            continue
        }

        Write-CrmLog ("Repairing Windows native binary for {0}..." -f $pkg)
        $releaseDir = Join-Path $pkg "build\Release"
        New-Item -ItemType Directory -Force -Path $releaseDir | Out-Null

        $built = $false
        $pkgJson = Join-Path $pkg "package.json"
        if (Test-Path -LiteralPath $pkgJson) {
            $raw = Get-Content -LiteralPath $pkgJson -Raw
            if ($raw -match '"build-release"') {
                if (Test-Path -LiteralPath $node) {
                    Remove-Item -LiteralPath $node -Force -ErrorAction SilentlyContinue
                }
                Push-Location $pkg
                try {
                    & npm run build-release
                    if ($LASTEXITCODE -eq 0 -and (Test-IsWindowsNativeBinary $node)) {
                        $built = $true
                        $goodBinary = $node
                    }
                }
                finally {
                    Pop-Location
                }
            }
        }

        if (-not $built) {
            if (-not $goodBinary -or -not (Test-Path -LiteralPath $goodBinary)) {
                throw "better-sqlite3 needs a Windows rebuild but no build-release/good binary was available for $pkg"
            }
            Copy-Item -LiteralPath $goodBinary -Destination $node -Force
            Write-CrmLog ("Copied Windows binary from {0}" -f $goodBinary)
        }

        if (-not (Test-IsWindowsNativeBinary $node)) {
            throw "better-sqlite3 repair did not produce a Windows binary: $node"
        }
        & node -e "try{require(process.argv[1]);process.exit(0)}catch(e){console.error(e);process.exit(1)}" $pkg
        if ($LASTEXITCODE -ne 0) { throw "better-sqlite3 still fails to load after rebuild: $pkg" }
        Write-CrmLog ("Rebuilt OK: {0}" -f $pkg)
    }
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
if (-not $usePnpm) {
    Write-CrmLog "pnpm is required for CRM updates (npm fallback corrupts node_modules / cannot fetch @adelfeyz)."
    exit 1
}

# Package names must be quoted: bare @name is PowerShell splat syntax.
$crmPackages = @('@adelfeyz/ui', '@adelfeyz/sdk', '@adelfeyz/api')
Write-CrmLog ("Updating {0} from GitHub Packages..." -f ($crmPackages -join ' '))
Write-CrmLog ("Working directory: {0}" -f $Root)

function Invoke-PnpmUpdateCrm {
    $out = & pnpm update @crmPackages 2>&1
    $code = $LASTEXITCODE
    $text = ($out | Out-String)
    Write-Host $text
    return @{ Code = $code; Text = $text }
}

$result = Invoke-PnpmUpdateCrm
if ($result.Code -ne 0 -and $result.Text -match 'ERR_PNPM_PUBLIC_HOIST_PATTERN_DIFF|ERR_PNPM_HOIST_PATTERN_DIFF') {
    Write-CrmLog "pnpm hoist pattern mismatch. Recreating node_modules with pnpm install..."
    & pnpm install
    if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
    $result = Invoke-PnpmUpdateCrm
}

if ($result.Code -ne 0) {
    Write-CrmLog "pnpm update failed. Ensure NODE_AUTH_TOKEN is a classic PAT with read:packages and @adelfeyz points at GitHub Packages."
    exit $result.Code
}

Write-CrmLog "Packages updated."
Repair-BetterSqlite3

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
