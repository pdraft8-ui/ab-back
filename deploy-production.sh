#!/bin/bash

# Production Deployment Script for Insurance Backend
set -e

echo "🚀 Starting Production Deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if running as root
if [[ $EUID -eq 0 ]]; then
   print_error "This script should not be run as root"
   exit 1
fi

# Check if required tools are installed
check_dependencies() {
    print_status "Checking dependencies..."
    
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed"
        exit 1
    fi
    
    if ! command -v npm &> /dev/null; then
        print_error "npm is not installed"
        exit 1
    fi
    
    if ! command -v docker &> /dev/null; then
        print_warning "Docker is not installed. Container deployment will be skipped."
        DOCKER_AVAILABLE=false
    else
        DOCKER_AVAILABLE=true
    fi
    
    print_status "Dependencies check completed"
}

# Run security audit
security_audit() {
    print_status "Running security audit..."
    
    if npm audit --audit-level=moderate; then
        print_status "Security audit passed"
    else
        print_warning "Security audit found issues. Please review and fix before production deployment."
        read -p "Continue with deployment? (y/N): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            print_error "Deployment aborted due to security issues"
            exit 1
        fi
    fi
}

# Run tests
run_tests() {
    print_status "Running tests..."
    
    if npm test; then
        print_status "All tests passed"
    else
        print_error "Tests failed. Please fix before production deployment."
        exit 1
    fi
}

# Build for production
build_production() {
    print_status "Building for production..."
    
    # Clean previous builds
    if [ -d "dist" ]; then
        rm -rf dist
    fi
    
    # Set production environment and build
    export NODE_ENV=production
    if npm run build:prod; then
        print_status "Production build completed successfully"
    else
        print_error "Production build failed"
        exit 1
    fi
}

# Deploy with Docker
deploy_docker() {
    if [ "$DOCKER_AVAILABLE" = false ]; then
        print_warning "Skipping Docker deployment"
        return
    fi
    
    print_status "Deploying with Docker..."
    
    # Stop existing containers
    if docker-compose -f docker-compose.prod.yml down; then
        print_status "Stopped existing containers"
    fi
    
    # Build and start containers
    if docker-compose -f docker-compose.prod.yml up -d --build; then
        print_status "Docker deployment completed successfully"
    else
        print_error "Docker deployment failed"
        exit 1
    fi
    
    # Wait for services to be ready
    print_status "Waiting for services to be ready..."
    sleep 30
    
    # Health check
    if curl -f http://localhost:3002/api/v1/health; then
        print_status "Health check passed"
    else
        print_error "Health check failed"
        exit 1
    fi
}

# Deploy without Docker
deploy_standalone() {
    print_status "Deploying standalone application..."
    
    # Create production directories
    mkdir -p logs uploads
    
    # Set production environment
    export NODE_ENV=production
    export PORT=3002
    
    # Start the application
    print_status "Starting production server..."
    nohup npm run start:prod > logs/app.log 2>&1 &
    
    # Wait for startup
    sleep 10
    
    # Health check
    if curl -f http://localhost:3002/api/v1/health; then
        print_status "Standalone deployment completed successfully"
        print_status "Application is running on port 3002"
        print_status "Logs are available in logs/app.log"
    else
        print_error "Standalone deployment failed"
        exit 1
    fi
}

# Main deployment function
main() {
    print_status "Starting production deployment process..."
    
    # Check dependencies
    check_dependencies
    
    # Security audit
    security_audit
    
    # Run tests
    run_tests
    
    # Build for production
    build_production
    
    # Choose deployment method
    if [ "$DOCKER_AVAILABLE" = true ]; then
        read -p "Deploy with Docker? (Y/n): " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Nn]$ ]]; then
            deploy_standalone
        else
            deploy_docker
        fi
    else
        deploy_standalone
    fi
    
    print_status "Production deployment completed successfully! 🎉"
    
    # Display final information
    echo
    echo "📋 Deployment Summary:"
    echo "======================"
    echo "Environment: Production"
    echo "Port: 3002"
    echo "Health Check: http://localhost:3002/api/v1/health"
    echo "Logs: logs/app.log"
    
    if [ "$DOCKER_AVAILABLE" = true ]; then
        echo "Docker Status: docker-compose -f docker-compose.prod.yml ps"
        echo "Docker Logs: docker-compose -f docker-compose.prod.yml logs -f"
    fi
    
    echo
    echo "🔒 Security Notes:"
    echo "- Update JWT secrets in production.config.js"
    echo "- Configure proper CORS origins"
    echo "- Set up SSL certificates for HTTPS"
    echo "- Configure firewall rules"
    echo "- Set up monitoring and alerting"
}

# Run main function
main "$@"
