#!/bin/bash

echo "🔍 Backend Health Diagnostic Tool"
echo "=================================="

# Check if we're in the right directory
if [ ! -f "docker-compose.prod.yml" ]; then
    echo "❌ Error: docker-compose.prod.yml not found"
    echo "Please run this script from the backend directory"
    exit 1
fi

echo "📊 Current Container Status:"
docker ps

echo ""
echo "🔍 Backend Container Details:"
docker inspect ab-back-app-1 --format='{{.State.Health.Status}}' 2>/dev/null || echo "Container not found"

echo ""
echo "📋 Backend Logs (Last 50 lines):"
docker logs --tail 50 ab-back-app-1

echo ""
echo "🌐 Network Connectivity Test:"
echo "Testing Redis connection from backend container:"
docker exec ab-back-app-1 redis-cli -h redis -p 6379 ping 2>/dev/null || echo "❌ Redis connection failed"

echo ""
echo "Testing MongoDB connection from backend container:"
docker exec ab-back-app-1 mongosh --host mongo --port 27017 --eval "db.runCommand('ping')" 2>/dev/null || echo "❌ MongoDB connection failed"

echo ""
echo "🔧 Health Check Endpoint Test:"
curl -s http://localhost:3002/api/v1/health || echo "❌ Health endpoint not responding"

echo ""
echo "📊 Container Resource Usage:"
docker stats --no-stream ab-back-app-1

echo ""
echo "🔍 Environment Variables Check:"
docker exec ab-back-app-1 env | grep -E "(REDIS|MONGO|NODE_ENV|PORT)" | head -10

echo ""
echo "🛠️  Attempting Automatic Fix..."

# Check if Redis connection is the issue
if ! docker exec ab-back-app-1 redis-cli -h redis -p 6379 ping >/dev/null 2>&1; then
    echo "🔧 Redis connection issue detected. Applying fix..."
    
    # Stop containers
    docker-compose -f docker-compose.prod.yml down
    
    # Remove Redis container
    docker rm -f ab-redis-1 2>/dev/null || true
    
    # Update docker-compose with simple Redis config
    cat > docker-compose.prod.yml << 'EOF'
services:
  app:
    build:
      context: .
      dockerfile: Dockerfile.prod
    ports:
      - "3002:3002"
    environment:
      - NODE_ENV=production
      - PORT=3002
      - DBURL=mongodb://mongo:27017/AB_insurance_production
      - MONGODB_URI=mongodb://mongo:27017/AB_insurance_production
      - REDIS_URL=redis://redis:6379
      - REDIS_PASSWORD=
      - LOG_LEVEL=warn
      - ENABLE_MONITORING=true
      - ENABLE_CACHE=true
      - ENABLE_RATE_LIMITING=false
      - ALLOWED_ORIGINS=http://52.21.181.107,http://52.21.181.107:8080,http://daraghmeh.online,https://daraghmeh.online,http://www.daraghmeh.online,https://www.daraghmeh.online,http://localhost:3002,https://localhost:3002,http://localhost:5173,https://localhost:5173,http://127.0.0.1:5173,https://127.0.0.1:5173,http://host.docker.internal:5173,https://host.docker.internal:5173
      - TRANZILA_API_URL=https://secure5.tranzila.com
      - TRANZILA_SUPPLIER_ID=basheer
      - TRANZILA_TERMINAL_ID=basheer
      - TRANZILA_PASSWORD=ePWRQkDs
      - GMAIL_USER=basheerinsurance99@gmail.com
      - GMAIL_APP_PASSWORD=aobg elxm xxdr ejhc
      - EMAIL_FROM_NAME=AB Insurance Company
    depends_on:
      - mongo
      - redis
    restart: unless-stopped
    networks:
      - insurance-network
    volumes:
      - ./logs:/app/logs
      - ./uploads:/app/uploads
    user: "1001:1001"
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3002/api/v1/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s

  mongo:
    image: mongo:6.0
    ports:
      - "27017:27017"
    environment:
      - MONGO_INITDB_DATABASE=AB_insurance_production
    volumes:
      - mongo_data:/data/db
    restart: unless-stopped
    networks:
      - insurance-network

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    restart: unless-stopped
    networks:
      - insurance-network

volumes:
  mongo_data:
  redis_data:

networks:
  insurance-network:
    driver: bridge
EOF
    
    # Start services
    docker-compose -f docker-compose.prod.yml up -d
    
    echo "⏳ Waiting for services to start..."
    sleep 20
    
    echo "🧪 Testing connections after fix..."
    docker exec ab-back-app-1 redis-cli -h redis -p 6379 ping
    curl -s http://localhost:3002/api/v1/health
    
else
    echo "✅ Redis connection is working"
fi

echo ""
echo "📊 Final Container Status:"
docker ps

echo ""
echo "📋 Final Backend Logs (Last 20 lines):"
docker logs --tail 20 ab-back-app-1

echo ""
echo "🎯 Diagnostic Summary:"
echo "======================"
echo "1. Container Status: $(docker inspect ab-back-app-1 --format='{{.State.Health.Status}}' 2>/dev/null || echo 'Unknown')"
echo "2. Redis Connection: $(docker exec ab-back-app-1 redis-cli -h redis -p 6379 ping 2>/dev/null && echo '✅ Working' || echo '❌ Failed')"
echo "3. Health Endpoint: $(curl -s http://localhost:3002/api/v1/health >/dev/null && echo '✅ Responding' || echo '❌ Not responding')"
echo "4. Port 3002: $(netstat -tlnp 2>/dev/null | grep :3002 && echo '✅ Listening' || echo '❌ Not listening')"

echo ""
echo "💡 If still unhealthy, check:"
echo "   - Application logs for errors"
echo "   - Database connectivity"
echo "   - Environment variables"
echo "   - Port conflicts"
echo "   - Resource constraints"
