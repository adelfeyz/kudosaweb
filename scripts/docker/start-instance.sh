#!/bin/bash

# Script to start a Docker instance
# Usage: ./start-instance.sh <instance-name>

set -e

if [ "$#" -lt 1 ]; then
    echo "Usage: $0 <instance-name>"
    exit 1
fi

INSTANCE_NAME=$1
INSTANCE_DIR="instances/${INSTANCE_NAME}"

if [ ! -d "$INSTANCE_DIR" ]; then
    echo "Error: Instance directory not found: $INSTANCE_DIR"
    echo "Create the instance first using: ./create-instance.sh"
    exit 1
fi

cd "$INSTANCE_DIR"
./start.sh

echo "Instance ${INSTANCE_NAME} started successfully!"

