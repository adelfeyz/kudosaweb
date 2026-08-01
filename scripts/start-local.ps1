# Start / stop / restart Kudosa locally (API + frontend)
param(
    [switch]$Restart,
    [switch]$RestartBack,
    [switch]$RestartFront,
    [switch]$Stop
)

$ErrorActionPreference = "Stop"

$Root = Split-Path -Parent $PSScriptRoot
$FrontPort = 3050
$BackPort = 3051
$ProjectPathPattern = [regex]::Escape($Root)

Set-Location $Root

function Write-PointerLog {
    param([string]$Message)
    Write-Host "[kudosa] $Message"
}

function Stop-ProcessesOnPort {
    param([int]$Port)

    $connections = Get-NetTCPConnection -LocalPort $Port -State Listen -ErrorAction SilentlyContinue
    foreach ($connection in $connections) {
        Stop-Process -Id $connection.OwningProcess -Force -ErrorAction SilentlyContinue
    }
}

function Get-PointerNodeProcesses {
    param(
        [ValidateSet('All', 'Backend', 'Frontend')]
        [string]$Target = 'All'
    )

    Get-CimInstance Win32_Process -Filter "Name='node.exe'" | Where-Object {
        $commandLine = $_.CommandLine
        if ($commandLine -notmatch $ProjectPathPattern) {
            return $false
        }

        $isBackend = $commandLine -match 'crm-api|dev:api|dev-api\.mjs|server\.ts|start:node|@adelfeyz\\api'
        $isFrontend = $commandLine -match 'next dev|next-dev|turbopack|webpack'

        switch ($Target) {
            'Backend' { return $isBackend }
            'Frontend' { return $isFrontend }
            default { return $isBackend -or $isFrontend }
        }
    }
}

function Stop-PointerServices {
    param(
        [ValidateSet('All', 'Backend', 'Frontend')]
        [string]$Target = 'All'
    )

    $processes = Get-PointerNodeProcesses -Target $Target
    foreach ($process in $processes) {
        Stop-Process -Id $process.ProcessId -Force -ErrorAction SilentlyContinue
    }

    switch ($Target) {
        'Backend' { Stop-ProcessesOnPort -Port $BackPort }
        'Frontend' { Stop-ProcessesOnPort -Port $FrontPort }
        default {
            Stop-ProcessesOnPort -Port $BackPort
            Stop-ProcessesOnPort -Port $FrontPort
        }
    }

    Start-Sleep -Milliseconds 800
}

function Test-PortListening {
    param([int]$Port)
    return [bool](Get-NetTCPConnection -LocalPort $Port -State Listen -ErrorAction SilentlyContinue)
}

function Wait-PortListening {
    param(
        [int]$Port,
        [string]$Label,
        [int]$TimeoutSeconds = 45
    )

    $deadline = (Get-Date).AddSeconds($TimeoutSeconds)
    while ((Get-Date) -lt $deadline) {
        if (Test-PortListening -Port $Port) {
            Write-PointerLog "$Label listening on http://localhost:$Port"
            return $true
        }
        Start-Sleep -Milliseconds 500
    }

    Write-PointerLog "$Label did not become ready on port $Port within ${TimeoutSeconds}s"
    return $false
}

function Ensure-PointerSetup {
    if (-not (Test-Path "$Root\.env.local")) {
        Copy-Item "$Root\.env.example" "$Root\.env.local"
        Write-PointerLog "Created .env.local from .env.example"
    }

    if (-not (Test-Path "$Root\node_modules")) {
        npm install
    }

    node scripts/seed-local.js
}

function Start-PointerBackend {
    if (Test-PortListening -Port $BackPort) {
        Write-PointerLog "Backend already listening on http://localhost:$BackPort"
        return
    }

    $dbPath = (Resolve-Path (Join-Path $Root "data\database.db") -ErrorAction SilentlyContinue)
    if (-not $dbPath) {
        $dbPath = Join-Path $Root "data\database.db"
    }

    Write-PointerLog "Starting backend on http://localhost:$BackPort"
    # Force Kudosa ports — do not inherit PORT from a prior Next session.
    Start-Process powershell -ArgumentList @(
        '-NoExit',
        '-Command',
        "cd '$Root'; `$env:PORT='$BackPort'; `$env:DB_PATH='$dbPath'; npm run dev:api"
    ) | Out-Null

    [void](Wait-PortListening -Port $BackPort -Label 'Backend' -TimeoutSeconds 45)
}

function Start-PointerFrontend {
    if (Test-PortListening -Port $FrontPort) {
        Write-PointerLog "Frontend already listening on http://localhost:$FrontPort"
        return
    }

    Write-PointerLog "Starting frontend on http://localhost:$FrontPort"
    # Next is pinned with -p 3050 in package.json; still clear PORT so it cannot leak into child tools.
    Start-Process powershell -ArgumentList @(
        '-NoExit',
        '-Command',
        "cd '$Root'; Remove-Item Env:PORT -ErrorAction SilentlyContinue; npm run dev"
    ) | Out-Null

    [void](Wait-PortListening -Port $FrontPort -Label 'Frontend' -TimeoutSeconds 90)
}

function Show-PointerStatus {
    Write-PointerLog "Frontend: http://localhost:$FrontPort $(if (Test-PortListening -Port $FrontPort) { '(running)' } else { '(stopped)' })"
    Write-PointerLog "Backend:  http://localhost:$BackPort $(if (Test-PortListening -Port $BackPort) { '(running)' } else { '(stopped)' })"
    Write-PointerLog "CRM login: http://localhost:$FrontPort/login"
}

Ensure-PointerSetup

if ($Stop) {
    Stop-PointerServices -Target All
    Write-PointerLog "Stopped Kudosa backend and frontend."
    Show-PointerStatus
    exit 0
}

if ($RestartBack) {
    Stop-PointerServices -Target Backend
    Start-PointerBackend
    Write-PointerLog "Restarted backend."
    Show-PointerStatus
    exit 0
}

if ($RestartFront) {
    Stop-PointerServices -Target Frontend
    Start-PointerFrontend
    Write-PointerLog "Restarted frontend."
    Show-PointerStatus
    exit 0
}

if ($Restart) {
    Stop-PointerServices -Target All
    Start-PointerBackend
    Start-PointerFrontend
    Write-PointerLog "Restarted backend and frontend."
    Show-PointerStatus
    exit 0
}

Start-PointerBackend
Start-PointerFrontend
Write-PointerLog "Kudosa services started."
Show-PointerStatus
