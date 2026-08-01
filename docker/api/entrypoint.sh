#!/bin/sh
set -e

# Database initialization script
DB_PATH=${DB_PATH:-/app/data/database.db}
SCHEMA_PATH=${SCHEMA_PATH:-/app/database/schema.sql}

echo "Initializing database at $DB_PATH..."

# Check if database exists, if not create it and run schema
if [ ! -f "$DB_PATH" ]; then
  echo "Database not found. Creating new database..."
  
  # Create directory if it doesn't exist
  mkdir -p "$(dirname "$DB_PATH")"
  
  # Initialize database with schema if schema file exists
  if [ -f "$SCHEMA_PATH" ]; then
    echo "Running schema initialization..."
    sqlite3 "$DB_PATH" < "$SCHEMA_PATH" || {
      echo "Warning: Schema initialization failed. Database will be created empty."
      touch "$DB_PATH"
    }
  else
    echo "Warning: Schema file not found at $SCHEMA_PATH. Creating empty database."
    touch "$DB_PATH"
  fi
  
  echo "Database initialized successfully."
else
  echo "Database already exists. Skipping initialization."
fi

# Run migrations if any
if [ -d "/app/migrations" ]; then
  echo "Running migrations..."
  for migration in /app/migrations/*.sql; do
    if [ -f "$migration" ]; then
      echo "Running migration: $migration"
      sqlite3 "$DB_PATH" < "$migration" || echo "Warning: Migration $migration failed"
    fi
  done
fi

# Start the server
echo "Starting API server..."
exec "$@"

