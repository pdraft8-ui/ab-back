#!/bin/bash

echo "🔍 Diagnosing Domain-Related Issues..."
echo "======================================"

# Test IP access vs Domain access
echo "🧪 Testing IP vs Domain Access..."

echo "1. Testing IP access (should work):"
curl -s -w "\nHTTP Status: %{http_code}\nResponse Time: %{time_total}s\n" \
  -X GET "http://52.21.181.107/api/v1/health" --max-time 30

echo ""
echo "2. Testing domain access (might fail):"
curl -s -w "\nHTTP Status: %{http_code}\nResponse Time: %{time_total}s\n" \
  -X GET "http://daraghmeh.online/api/v1/health" --max-time 30

echo ""
echo "3. Testing www subdomain:"
curl -s -w "\nHTTP Status: %{http_code}\nResponse Time: %{time_total}s\n" \
  -X GET "http://www.daraghmeh.online/api/v1/health" --max-time 30

# Check DNS resolution
echo ""
echo "🔍 DNS Resolution Check:"
echo "IP for daraghmeh.online:"
nslookup daraghmeh.online || echo "❌ DNS lookup failed"

echo ""
echo "IP for www.daraghmeh.online:"
nslookup www.daraghmeh.online || echo "❌ DNS lookup failed"

# Check if domain points to correct IP
echo ""
echo "🔍 Domain IP Check:"
DOMAIN_IP=$(nslookup daraghmeh.online | grep "Address:" | tail -1 | awk '{print $2}')
EXPECTED_IP="52.21.181.107"

echo "Domain resolves to: $DOMAIN_IP"
echo "Expected IP: $EXPECTED_IP"

if [ "$DOMAIN_IP" = "$EXPECTED_IP" ]; then
    echo "✅ Domain points to correct IP"
else
    echo "❌ Domain points to wrong IP: $DOMAIN_IP"
    echo "💡 This could cause routing issues"
fi

# Check container logs for domain-related errors
echo ""
echo "🔍 Checking container logs for domain issues..."

echo "Nginx logs (last 20 lines):"
docker logs $(docker ps -q --filter "name=nginx") --tail 20 2>/dev/null || echo "❌ Nginx container not found"

echo ""
echo "Frontend logs (last 20 lines):"
docker logs $(docker ps -q --filter "name=frontend") --tail 20 2>/dev/null || echo "❌ Frontend container not found"

echo ""
echo "Backend logs (last 20 lines):"
docker logs $(docker ps -q --filter "name=app") --tail 20 2>/dev/null || echo "❌ Backend container not found"

# Test different request patterns
echo ""
echo "🧪 Testing Different Request Patterns..."

echo "1. Direct backend access:"
curl -s -w "\nHTTP Status: %{http_code}\nResponse Time: %{time_total}s\n" \
  -X GET "http://52.21.181.107:3002/api/v1/health" --max-time 30

echo ""
echo "2. Through Nginx with IP:"
curl -s -w "\nHTTP Status: %{http_code}\nResponse Time: %{time_total}s\n" \
  -X GET "http://52.21.181.107/api/v1/health" --max-time 30

echo ""
echo "3. Through Nginx with domain:"
curl -s -w "\nHTTP Status: %{http_code}\nResponse Time: %{time_total}s\n" \
  -X GET "http://daraghmeh.online/api/v1/health" --max-time 30

# Check if it's a Vite development server issue
echo ""
echo "🔍 Checking if it's a Vite development server issue..."

echo "Testing Vite dev server directly:"
curl -s -w "\nHTTP Status: %{http_code}\nResponse Time: %{time_total}s\n" \
  -X GET "http://52.21.181.107:8080" --max-time 30

echo ""
echo "Testing Vite dev server through domain:"
curl -s -w "\nHTTP Status: %{http_code}\nResponse Time: %{time_total}s\n" \
  -X GET "http://daraghmeh.online" --max-time 30

echo ""
echo "📋 Summary:"
echo "If IP access works but domain access fails, the issue is likely:"
echo "1. DNS configuration (domain not pointing to correct IP)"
echo "2. Nginx configuration (not handling domain properly)"
echo "3. Vite development server (not configured for domain)"
echo "4. CORS configuration (domain not in allowed origins)"
echo ""
echo "💡 Quick Fix Options:"
echo "1. Use IP address instead of domain temporarily"
echo "2. Check DNS settings in your domain provider"
echo "3. Update Vite configuration for domain"
echo "4. Check if domain is properly configured in Nginx"
