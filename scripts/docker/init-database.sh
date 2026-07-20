#!/bin/bash

# Script to initialize SQLite database from schema
# Usage: ./init-database.sh <database-path> [schema-path]

set -e

if [ "$#" -lt 1 ]; then
    echo "Usage: $0 <database-path> [schema-path]"
    echo "Example: $0 /app/data/database.db /app/database/schema.sql"
    exit 1
fi

DB_PATH=$1
SCHEMA_PATH=${2:-database/schema.sql}

# Check if sqlite3 is available
if ! command -v sqlite3 &> /dev/null; then
    echo "Error: sqlite3 is not installed. Please install it first."
    exit 1
fi

# Create directory if it doesn't exist
mkdir -p "$(dirname "$DB_PATH")"

# Check if database already exists
if [ -f "$DB_PATH" ]; then
    echo "Warning: Database already exists at $DB_PATH"
    read -p "Do you want to recreate it? This will delete all existing data. (yes/no): " confirm
    if [ "$confirm" = "yes" ]; then
        rm "$DB_PATH"
    else
        echo "Aborted."
        exit 0
    fi
fi

# Check if schema file exists
if [ ! -f "$SCHEMA_PATH" ]; then
    echo "Error: Schema file not found: $SCHEMA_PATH"
    exit 1
fi

echo "Initializing database at $DB_PATH..."
echo "Using schema: $SCHEMA_PATH"

# Initialize database with schema
sqlite3 "$DB_PATH" < "$SCHEMA_PATH"

if [ $? -eq 0 ]; then
    echo "Database initialized successfully!"
    echo "Database path: $DB_PATH"
else
    echo "Error: Failed to initialize database"
    exit 1
fi

