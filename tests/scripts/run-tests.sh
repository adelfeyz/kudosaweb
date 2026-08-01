#!/bin/bash

# Aidra API Test Runner
# This script runs all tests in the correct order

set -e  # Exit on any error

echo "🧪 Starting Aidra API Test Suite..."
echo "=================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

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

# Check if we're in the tests directory
if [ ! -f "package.json" ]; then
    print_error "Please run this script from the tests directory"
    exit 1
fi

# Check if dependencies are installed
if [ ! -d "node_modules" ]; then
    print_status "Installing dependencies..."
    npm install
fi

# Check if .env.test exists
if [ ! -f ".env.test" ]; then
    print_warning ".env.test not found. Creating from example..."
    if [ -f "env.example" ]; then
        cp env.example .env.test
        print_status "Created .env.test from env.example"
    else
        print_error "env.example not found. Please create .env.test manually"
        exit 1
    fi
fi

# Function to run tests with error handling
run_test_suite() {
    local suite_name=$1
    local command=$2
    
    print_status "Running $suite_name..."
    echo "----------------------------------------"
    
    if eval "$command"; then
        print_success "$suite_name completed successfully"
        echo ""
    else
        print_error "$suite_name failed"
        return 1
    fi
}

# Start test execution
start_time=$(date +%s)

# 1. Unit Tests
run_test_suite "Unit Tests" "npm run test:unit"

# 2. Integration Tests
run_test_suite "Integration Tests" "npm run test:integration"

# 3. E2E Tests (if Playwright is available)
if command -v npx &> /dev/null; then
    print_status "Checking Playwright installation..."
    if npx playwright --version &> /dev/null; then
        run_test_suite "E2E Tests" "npx playwright test"
    else
        print_warning "Playwright not installed. Installing now..."
        npx playwright install
        run_test_suite "E2E Tests" "npx playwright test"
    fi
else
    print_warning "npx not available. Skipping E2E tests"
fi

# Calculate total time
end_time=$(date +%s)
duration=$((end_time - start_time))

echo "=================================="
print_success "All tests completed in ${duration} seconds!"

# Generate coverage report if available
if command -v npm &> /dev/null; then
    print_status "Generating coverage report..."
    npm run test:coverage 2>/dev/null || print_warning "Coverage report generation failed"
fi

# Show test results
if [ -d "playwright-report" ]; then
    print_status "Opening Playwright report..."
    npx playwright show-report 2>/dev/null || print_warning "Could not open Playwright report"
fi

print_success "Test suite completed! 🎉"
