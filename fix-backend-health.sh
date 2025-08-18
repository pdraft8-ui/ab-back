#!/bin/bash

echo "🔧 Fixing Backend Health Issues..."

# Check if we're in the right directory
if [ ! -f "docker-compose.prod.yml" ]; then
    echo "❌ Error: docker-compose.prod.yml not found"
    echo "Please run this script from the backend directory"
    exit 1
fi

echo "📊 Current Status:"
docker ps | grep ab-back-app-1

echo ""
echo "🛑 Stopping backend container..."
docker-compose -f docker-compose.prod.yml stop app

echo ""
echo "🔧 Updating docker-compose.prod.yml with improved health check..."

# Create updated docker-compose with better health check
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
      test: ["CMD-SHELL", "curl -f http://localhost:3002/api/v1/health || exit 1"]
      interval: 30s
      timeout: 10s
      retries: 5
      start_period: 60s

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

echo "🚀 Starting backend with improved health check..."
docker-compose -f docker-compose.prod.yml up -d app

echo "⏳ Waiting for backend to start..."
sleep 30

echo "🧪 Testing health endpoint..."
for i in {1..10}; do
    echo "Attempt $i/10:"
    if curl -f http://localhost:3002/api/v1/health >/dev/null 2>&1; then
        echo "✅ Health endpoint is responding!"
        break
    else
        echo "⏳ Health endpoint not ready yet..."
        sleep 10
    fi
done

echo ""
echo "📊 Container Status:"
docker ps | grep ab-back-app-1

echo ""
echo "📋 Recent Logs:"
docker logs --tail 20 ab-back-app-1

echo ""
echo "🔍 Health Check Details:"
docker inspect ab-back-app-1 --format='{{json .State.Health}}' | jq '.' 2>/dev/null || echo "Health check not available"

echo ""
echo "✅ Backend health fix completed!"
echo "💡 If still unhealthy, run: ./diagnose-backend-health.sh"
