#!/bin/bash

# Script to remove a Docker instance and cleanup
# Usage: ./remove-instance.sh <instance-name>

set -e

if [ "$#" -lt 1 ]; then
    echo "Usage: $0 <instance-name>"
    exit 1
fi

INSTANCE_NAME=$1
INSTANCE_DIR="instances/${INSTANCE_NAME}"

if [ ! -d "$INSTANCE_DIR" ]; then
    echo "Error: Instance directory not found: $INSTANCE_DIR"
    exit 1
fi

echo "Warning: This will remove the instance and all its data (including database)."
read -p "Are you sure you want to continue? (yes/no): " confirm

if [ "$confirm" != "yes" ]; then
    echo "Aborted."
    exit 0
fi

cd "$INSTANCE_DIR"
./remove.sh

echo "Instance ${INSTANCE_NAME} removed successfully!"

