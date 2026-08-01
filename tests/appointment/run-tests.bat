@echo off
REM Appointment System Test Runner for Windows
REM This script runs all appointment-related tests with proper configuration

setlocal enabledelayedexpansion

REM Default values
set API_BASE_URL=https://unified-api.adel-feiz.workers.dev
set ADMIN_TOKEN=
set BROWSER=chromium
set HEADLESS=true
set WORKERS=1

REM Parse command line arguments
:parse_args
if "%~1"=="" goto :run_tests
if "%~1"=="-u" (
    set API_BASE_URL=%~2
    shift
    shift
    goto :parse_args
)
if "%~1"=="--api-url" (
    set API_BASE_URL=%~2
    shift
    shift
    goto :parse_args
)
if "%~1"=="-t" (
    set ADMIN_TOKEN=%~2
    shift
    shift
    goto :parse_args
)
if "%~1"=="--admin-token" (
    set ADMIN_TOKEN=%~2
    shift
    shift
    goto :parse_args
)
if "%~1"=="-b" (
    set BROWSER=%~2
    shift
    shift
    goto :parse_args
)
if "%~1"=="--browser" (
    set BROWSER=%~2
    shift
    shift
    goto :parse_args
)
if "%~1"=="-w" (
    set WORKERS=%~2
    shift
    shift
    goto :parse_args
)
if "%~1"=="--workers" (
    set WORKERS=%~2
    shift
    shift
    goto :parse_args
)
if "%~1"=="-h" (
    set HEADLESS=true
    shift
    goto :parse_args
)
if "%~1"=="--headless" (
    set HEADLESS=true
    shift
    goto :parse_args
)
if "%~1"=="-v" (
    set HEADLESS=false
    shift
    goto :parse_args
)
if "%~1"=="--visible" (
    set HEADLESS=false
    shift
    goto :parse_args
)
if "%~1"=="--help" (
    echo Usage: %0 [OPTIONS]
    echo.
    echo Options:
    echo   -u, --api-url URL        API base URL (default: https://unified-api.adel-feiz.workers.dev)
    echo   -t, --admin-token TOKEN Admin JWT token for admin tests
    echo   -b, --browser BROWSER   Browser to use: chromium, firefox, webkit (default: chromium)
    echo   -w, --workers NUM       Number of test workers (default: 1)
    echo   -h, --headless          Run in headless mode (default: true)
    echo   -v, --visible           Run in visible mode (overrides headless)
    echo   --help                  Show this help message
    echo.
    echo Examples:
    echo   %0 --admin-token your-token-here
    echo   %0 --browser firefox --visible
    echo   %0 --workers 2 --api-url http://localhost:3000
    exit /b 0
)
echo Unknown option: %1
exit /b 1

:run_tests
echo [INFO] Starting Appointment System Tests
echo [INFO] API Base URL: %API_BASE_URL%
echo [INFO] Browser: %BROWSER%
echo [INFO] Workers: %WORKERS%
echo [INFO] Headless: %HEADLESS%

REM Check if admin token is provided
if "%ADMIN_TOKEN%"=="" (
    echo [WARNING] No admin token provided. Admin tests will be skipped.
)

REM Check if Node.js is available
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Node.js not found. Please install Node.js and npm.
    exit /b 1
)

REM Check if npx is available
where npx >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] npx not found. Please install Node.js and npm.
    exit /b 1
)

REM Install Playwright if not already installed
echo [INFO] Checking Playwright installation...
npx playwright --version >nul 2>nul
if %errorlevel% neq 0 (
    echo [INFO] Installing Playwright...
    npm install @playwright/test
)

REM Install browser if needed
echo [INFO] Installing browser: %BROWSER%
npx playwright install %BROWSER%

REM Create test results directory
if not exist test-results mkdir test-results

REM Run the tests
echo [INFO] Running appointment tests...

REM Build the command
set CMD=npx playwright test tests/appointment/ --project=%BROWSER% --workers=%WORKERS%

if "%HEADLESS%"=="true" (
    set CMD=%CMD% --headed=false
) else (
    set CMD=%CMD% --headed
)

REM Add reporter for better output
set CMD=%CMD% --reporter=list

REM Set environment variables
set API_BASE_URL=%API_BASE_URL%
set ADMIN_TOKEN=%ADMIN_TOKEN%

REM Run the command
%CMD%
if %errorlevel% equ 0 (
    echo [SUCCESS] All tests passed!
    
    REM Generate HTML report
    echo [INFO] Generating HTML report...
    npx playwright test tests/appointment/ --project=%BROWSER% --reporter=html --output-dir=test-results/html-report
    
    echo [SUCCESS] HTML report generated in test-results/html-report/index.html
    
    REM Show summary
    echo.
    echo [INFO] Test Summary:
    echo   - API Tests: Appointment creation, validation, admin operations
    echo   - Frontend Tests: Form validation, user interactions, responsive design
    echo   - Database Tests: Data persistence, schema validation, performance
    echo.
    echo [SUCCESS] All appointment system tests completed successfully!
    
) else (
    echo [ERROR] Some tests failed!
    echo.
    echo [INFO] Troubleshooting tips:
    echo   1. Check that the API is accessible at %API_BASE_URL%
    echo   2. Verify admin token is valid (if using admin tests)
    echo   3. Ensure all required environment variables are set
    echo   4. Check network connectivity
    echo.
    echo [INFO] For detailed error information, check the test output above.
    exit /b 1
)
