#!/bin/bash

echo "🔄 Reverting to IP-Only Access (Temporary Fix)..."
echo "================================================"

echo "This will temporarily disable domain access to confirm the issue is domain-related."
echo "IP access (http://52.21.181.107) will continue to work normally."
echo ""

# Stop current containers
echo "🛑 Stopping current containers..."
docker compose -f docker-compose.prod.yml down

# Update CORS to only allow IP access
echo "🔧 Updating CORS to IP-only access..."
sed -i 's/ALLOWED_ORIGINS=.*/ALLOWED_ORIGINS=http:\/\/52.21.181.107,http:\/\/52.21.181.107:8080,http:\/\/localhost:3002,https:\/\/localhost:3002,http:\/\/localhost:5173,https:\/\/localhost:5173,http:\/\/127.0.0.1:5173,https:\/\/127.0.0.1:5173,http:\/\/host.docker.internal:5173,https:\/\/host.docker.internal:5173/' docker-compose.prod.yml

# Restart containers
echo "🔨 Restarting containers with IP-only configuration..."
docker compose -f docker-compose.prod.yml up -d

# Wait for containers to be ready
echo "⏳ Waiting for containers to be ready..."
sleep 15

# Test IP access
echo "🧪 Testing IP access (should work):"
curl -s -w "\nHTTP Status: %{http_code}\nResponse Time: %{time_total}s\n" \
  -X GET "http://52.21.181.107/api/v1/health" --max-time 30

echo ""
echo "🧪 Testing login with IP:"
curl -s -w "\nHTTP Status: %{http_code}\nResponse Time: %{time_total}s\n" \
  -X POST "http://52.21.181.107/api/v1/user/signin" \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@admin.com","password":"admin123"}' \
  --max-time 30

echo ""
echo "🎉 IP-Only Configuration Applied!"
echo ""
echo "✅ IP access should work normally: http://52.21.181.107"
echo "❌ Domain access will be blocked: http://daraghmeh.online"
echo ""
echo "💡 To restore domain access later:"
echo "   1. Run: ./fix-504-timeout.sh"
echo "   2. Or manually add domain back to ALLOWED_ORIGINS"
echo ""
echo "🔍 If IP access works perfectly now, the issue is definitely domain-related."
