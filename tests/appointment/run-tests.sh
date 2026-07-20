#!/bin/bash

# Appointment System Test Runner
# This script runs all appointment-related tests with proper configuration

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Default values
API_BASE_URL="https://unified-api.adel-feiz.workers.dev"
ADMIN_TOKEN=""
BROWSER="chromium"
HEADLESS="true"
WORKERS="1"

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to show usage
show_usage() {
    echo "Usage: $0 [OPTIONS]"
    echo ""
    echo "Options:"
    echo "  -u, --api-url URL        API base URL (default: https://unified-api.adel-feiz.workers.dev)"
    echo "  -t, --admin-token TOKEN Admin JWT token for admin tests"
    echo "  -b, --browser BROWSER   Browser to use: chromium, firefox, webkit (default: chromium)"
    echo "  -w, --workers NUM       Number of test workers (default: 1)"
    echo "  -h, --headless          Run in headless mode (default: true)"
    echo "  -v, --visible           Run in visible mode (overrides headless)"
    echo "  --help                  Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 --admin-token your-token-here"
    echo "  $0 --browser firefox --visible"
    echo "  $0 --workers 2 --api-url http://localhost:3000"
}

# Parse command line arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        -u|--api-url)
            API_BASE_URL="$2"
            shift 2
            ;;
        -t|--admin-token)
            ADMIN_TOKEN="$2"
            shift 2
            ;;
        -b|--browser)
            BROWSER="$2"
            shift 2
            ;;
        -w|--workers)
            WORKERS="$2"
            shift 2
            ;;
        -h|--headless)
            HEADLESS="true"
            shift
            ;;
        -v|--visible)
            HEADLESS="false"
            shift
            ;;
        --help)
            show_usage
            exit 0
            ;;
        *)
            print_error "Unknown option: $1"
            show_usage
            exit 1
            ;;
    esac
done

# Validate browser option
if [[ ! "$BROWSER" =~ ^(chromium|firefox|webkit)$ ]]; then
    print_error "Invalid browser: $BROWSER. Must be one of: chromium, firefox, webkit"
    exit 1
fi

# Check if admin token is provided for admin tests
if [[ -z "$ADMIN_TOKEN" ]]; then
    print_warning "No admin token provided. Admin tests will be skipped."
fi

# Set environment variables
export API_BASE_URL
export ADMIN_TOKEN

print_status "Starting Appointment System Tests"
print_status "API Base URL: $API_BASE_URL"
print_status "Browser: $BROWSER"
print_status "Workers: $WORKERS"
print_status "Headless: $HEADLESS"

# Check if Playwright is installed
if ! command -v npx &> /dev/null; then
    print_error "npx not found. Please install Node.js and npm."
    exit 1
fi

# Install Playwright if not already installed
print_status "Checking Playwright installation..."
if ! npx playwright --version &> /dev/null; then
    print_status "Installing Playwright..."
    npm install @playwright/test
fi

# Install browser if needed
print_status "Installing browser: $BROWSER"
npx playwright install $BROWSER

# Create test results directory
mkdir -p test-results

# Run the tests
print_status "Running appointment tests..."

# Build the command
CMD="npx playwright test tests/appointment/ --project=$BROWSER --workers=$WORKERS"

if [[ "$HEADLESS" == "true" ]]; then
    CMD="$CMD --headed=false"
else
    CMD="$CMD --headed"
fi

# Add reporter for better output
CMD="$CMD --reporter=list"

# Run the command
if eval $CMD; then
    print_success "All tests passed!"
    
    # Generate HTML report
    print_status "Generating HTML report..."
    npx playwright test tests/appointment/ --project=$BROWSER --reporter=html --output-dir=test-results/html-report
    
    print_success "HTML report generated in test-results/html-report/index.html"
    
    # Show summary
    echo ""
    print_status "Test Summary:"
    echo "  - API Tests: Appointment creation, validation, admin operations"
    echo "  - Frontend Tests: Form validation, user interactions, responsive design"
    echo "  - Database Tests: Data persistence, schema validation, performance"
    echo ""
    print_success "All appointment system tests completed successfully!"
    
else
    print_error "Some tests failed!"
    echo ""
    print_status "Troubleshooting tips:"
    echo "  1. Check that the API is accessible at $API_BASE_URL"
    echo "  2. Verify admin token is valid (if using admin tests)"
    echo "  3. Ensure all required environment variables are set"
    echo "  4. Check network connectivity"
    echo ""
    print_status "For detailed error information, check the test output above."
    exit 1
fi
