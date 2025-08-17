#!/bin/bash

# Script to fix permissions for Docker container
# This script should be run on the host system before starting the Docker container

echo "Fixing permissions for Docker container..."

# Get the UID and GID of the insurance user in the container
CONTAINER_UID=1001
CONTAINER_GID=1001

# Change ownership of uploads directory to match container user
echo "Changing ownership of uploads directory..."
sudo chown -R $CONTAINER_UID:$CONTAINER_GID uploads/

# Set proper permissions
echo "Setting proper permissions..."
sudo chmod -R 755 uploads/

# Create directories if they don't exist
echo "Creating required directories..."
mkdir -p uploads/document-settings/headers
mkdir -p uploads/document-settings/footers
mkdir -p uploads/document-settings/signatures
mkdir -p uploads/general
mkdir -p uploads/cheques
mkdir -p uploads/customers
mkdir -p uploads/Customer

# Set ownership for newly created directories
sudo chown -R $CONTAINER_UID:$CONTAINER_GID uploads/

echo "Permissions fixed successfully!"
echo "You can now start your Docker container."
