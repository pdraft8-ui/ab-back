#!/bin/bash

echo "🔧 Fixing 504 Gateway Timeout Issues..."
echo "======================================"

# Stop current containers
echo "🛑 Stopping current containers..."
docker compose -f docker-compose.prod.yml down

# Pull latest changes
echo "📥 Pulling latest changes..."
git pull origin test

# Check if backend container is running and healthy
echo "🔍 Checking backend container health..."
if docker ps | grep -q "ab-back-app"; then
    echo "✅ Backend container is running"
    echo "📊 Backend container logs (last 10 lines):"
    docker logs $(docker ps -q --filter "name=ab-back-app") --tail 10
else
    echo "❌ Backend container is not running"
fi

# Check if frontend container is running
echo "🔍 Checking frontend container health..."
if docker ps | grep -q "ab-front-frontend"; then
    echo "✅ Frontend container is running"
    echo "📊 Frontend container logs (last 10 lines):"
    docker logs $(docker ps -q --filter "name=ab-front-frontend") --tail 10
else
    echo "❌ Frontend container is not running"
fi

# Check if nginx container is running
echo "🔍 Checking nginx container health..."
if docker ps | grep -q "ab-front-nginx"; then
    echo "✅ Nginx container is running"
    echo "📊 Nginx container logs (last 10 lines):"
    docker logs $(docker ps -q --filter "name=ab-front-nginx") --tail 10
else
    echo "❌ Nginx container is not running"
fi

# Rebuild and restart containers with timeout fixes
echo "🔨 Rebuilding containers with timeout fixes..."
docker compose -f docker-compose.prod.yml up -d --build

# Wait for containers to be ready
echo "⏳ Waiting for containers to be ready..."
sleep 30

# Check container status
echo "📊 Container status:"
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"

# Test backend health
echo "🧪 Testing backend health..."
curl -s -w "\nHTTP Status: %{http_code}\nResponse Time: %{time_total}s\n" \
  -X GET "http://52.21.181.107:3002/api/v1/health" || echo "❌ Backend health check failed"

# Test login endpoint with increased timeout
echo "🧪 Testing login endpoint with increased timeout..."
curl -s -w "\nHTTP Status: %{http_code}\nResponse Time: %{time_total}s\n" \
  -X POST "http://52.21.181.107/api/v1/user/signin" \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@admin.com","password":"admin123"}' \
  --max-time 180 || echo "❌ Login test failed"

# Test through nginx proxy
echo "🧪 Testing through nginx proxy..."
curl -s -w "\nHTTP Status: %{http_code}\nResponse Time: %{time_total}s\n" \
  -X GET "http://52.21.181.107/api/v1/health" || echo "❌ Nginx proxy test failed"

echo ""
echo "🎉 504 Timeout Fix Applied!"
echo "🌐 Your application should now be available at:"
echo "   - IP: http://52.21.181.107"
echo "   - Domain: http://daraghmeh.online"
echo ""
echo "🔧 Fixes applied:"
echo "   ✅ Increased Nginx timeout settings (120-180s)"
echo "   ✅ Disabled proxy buffering for faster responses"
echo "   ✅ Added domain to CORS allowed origins"
echo "   ✅ Enhanced error handling and logging"
echo ""
echo "💡 If you still get 504 errors:"
echo "   1. Check if backend container is running: docker ps"
echo "   2. Check backend logs: docker logs <backend-container-id>"
echo "   3. Check nginx logs: docker logs <nginx-container-id>"
echo "   4. Verify database connection is working"
