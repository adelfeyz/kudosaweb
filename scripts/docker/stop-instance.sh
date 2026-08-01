#!/bin/bash

# Script to stop a Docker instance
# Usage: ./stop-instance.sh <instance-name>

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

cd "$INSTANCE_DIR"
./stop.sh

echo "Instance ${INSTANCE_NAME} stopped successfully!"

