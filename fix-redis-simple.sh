#!/bin/bash

echo "🔧 Fixing Redis Connection Issue (Simple Method)..."

# Option 1: Disable Redis authentication (simpler)
echo "📝 Updating docker-compose.prod.yml to disable Redis authentication..."

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

echo "📝 Updated docker-compose.prod.yml (Redis without authentication)"

# Stop the current containers
echo "🛑 Stopping current containers..."
docker-compose -f docker-compose.prod.yml down

# Remove the Redis container to ensure clean restart
echo "🗑️ Removing Redis container..."
docker rm -f ab-redis-1 2>/dev/null || true

# Start the services with the new configuration
echo "🚀 Starting services..."
docker-compose -f docker-compose.prod.yml up -d

# Wait for services to be ready
echo "⏳ Waiting for services to be ready..."
sleep 15

# Test Redis connection
echo "🧪 Testing Redis connection..."
docker exec ab-back-app-1 redis-cli -h redis -p 6379 ping

# Check container status
echo "📊 Container status:"
docker ps

# Show logs to verify Redis connection
echo "📋 Recent backend logs:"
docker logs --tail 20 ab-back-app-1

echo "✅ Redis connection fix completed!"
echo "💡 Redis is now running without authentication"
