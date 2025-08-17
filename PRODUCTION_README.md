# Production Deployment Guide

This guide covers the production deployment of the Insurance Backend application.

## 🚀 Quick Start

### 1. Automated Deployment

```bash
# Make the deployment script executable
chmod +x deploy-production.sh

# Run the deployment script
./deploy-production.sh
```

### 2. Manual Deployment

```bash
# Build for production
npm run build:prod

# Start production server
npm run start:prod
```

## 📋 Prerequisites

- Node.js 18+ and npm
- MongoDB 6.0+
- Redis 7.0+
- SSL certificates (for HTTPS)
- Firewall configuration

## 🔧 Configuration

### Environment Variables

Create a `.env` file or set environment variables:

```bash
# Required
NODE_ENV=production
JWT_SECRET=your_secure_jwt_secret_key_here
TokenSignIn=your_secure_token_signing_key_here
DBURL=mongodb://localhost:27017/AB_insurance_production

# Optional (with defaults)
PORT=3002
LOG_LEVEL=warn
REDIS_URL=redis://localhost:6379
ALLOWED_ORIGINS=https://yourdomain.com
```

### Security Configuration

Update `production.config.js` with your production values:

```javascript
// Update these values for production
JWT_SECRET: 'your_actual_secure_key',
ALLOWED_ORIGINS: ['https://yourdomain.com'],
FRONTEND_URL: 'https://yourdomain.com'
```

## 🐳 Docker Deployment

### Using Docker Compose

```bash
# Build and start all services
docker-compose -f docker-compose.prod.yml up -d --build

# View logs
docker-compose -f docker-compose.prod.yml logs -f

# Stop services
docker-compose -f docker-compose.prod.yml down
```

### Using Dockerfile

```bash
# Build image
docker build -f Dockerfile.prod -t insurance-backend:prod .

# Run container
docker run -d \
  --name insurance-backend \
     -p 3002:3002 \
  -e NODE_ENV=production \
  -e DBURL=mongodb://host.docker.internal:27017/AB_insurance_production \
  insurance-backend:prod
```

## 🌐 Nginx Configuration

### SSL Setup

1. Place your SSL certificates in the `ssl/` directory:

   - `ssl/cert.pem` - SSL certificate
   - `ssl/key.pem` - Private key

2. Update `nginx.conf` with your domain name

3. Start nginx with the configuration:

```bash
docker run -d \
  --name nginx \
  -p 80:80 -p 443:443 \
  -v $(pwd)/nginx.conf:/etc/nginx/nginx.conf:ro \
  -v $(pwd)/ssl:/etc/nginx/ssl:ro \
  nginx:alpine
```

## 🔒 Security Considerations

### 1. JWT Secrets

- Use strong, unique secrets for JWT signing
- Rotate secrets regularly
- Never commit secrets to version control

### 2. CORS Configuration

- Restrict CORS origins to your frontend domains only
- Avoid using `*` in production

### 3. Rate Limiting

- API endpoints: 10 requests/second
- Login endpoint: 5 requests/minute
- Adjust limits based on your traffic patterns

### 4. Database Security

- Use authentication for MongoDB
- Restrict database access to application servers only
- Regular backups and monitoring

### 5. Network Security

- Configure firewall rules
- Use HTTPS only in production
- Implement proper logging and monitoring

## 📊 Monitoring

### Health Checks

```bash
# Application health
curl http://localhost:3002/api/v1/health

# Metrics endpoint
curl http://localhost:3002/metrics
```

### Logs

```bash
# Application logs
tail -f logs/app.log

# Docker logs
docker-compose -f docker-compose.prod.yml logs -f app

# Nginx logs
docker logs nginx
```

### Performance Monitoring

```bash
# Start monitoring
npm run monitor:start

# Cache statistics
npm run cache:stats

# Database optimization
npm run db:optimize
```

## 🚨 Troubleshooting

### Common Issues

#### 1. Port Already in Use

```bash
# Check what's using the port
lsof -i :3002

# Kill the process
kill -9 <PID>
```

#### 2. Database Connection Issues

```bash
# Check MongoDB status
systemctl status mongod

# Test connection
mongo --host localhost --port 27017
```

#### 3. Redis Connection Issues

```bash
# Check Redis status
systemctl status redis

# Test connection
redis-cli ping
```

#### 4. Build Failures

```bash
# Clean and rebuild
rm -rf dist node_modules
npm install
npm run build:prod
```

## 📈 Scaling

### Horizontal Scaling

1. Deploy multiple application instances
2. Use a load balancer (nginx, HAProxy)
3. Configure session sharing (Redis)
4. Database read replicas

### Vertical Scaling

1. Increase server resources
2. Optimize database queries
3. Implement caching strategies
4. Use connection pooling

## 🔄 Updates and Maintenance

### Rolling Updates

```bash
# Build new version
npm run build:prod

# Deploy with zero downtime
docker-compose -f docker-compose.prod.yml up -d --no-deps app
```

### Database Migrations

```bash
# Run database optimizations
npm run db:optimize

# Add database indexes
npm run db:indexes
```

### Cache Management

```bash
# Warm caches
npm run cache:warm

# Clear caches
npm run cache:clear
```

## 📞 Support

For production support:

1. Check application logs first
2. Verify environment configuration
3. Test database connectivity
4. Check system resources
5. Review security settings

## 📚 Additional Resources

- [Node.js Production Best Practices](https://nodejs.org/en/docs/guides/nodejs-docker-webapp/)
- [MongoDB Production Checklist](https://docs.mongodb.com/manual/administration/production-checklist/)
- [Redis Production Best Practices](https://redis.io/topics/admin)
- [Nginx Security Headers](https://www.nginx.com/resources/wiki/start/topics/examples/security_headers/)
