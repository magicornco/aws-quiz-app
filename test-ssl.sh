#!/bin/bash

echo "🔍 Testing SSL configuration..."

# Check if certificates exist
echo "📋 Checking SSL certificates..."
docker exec aws-quiz-nginx ls -la /etc/letsencrypt/live/quiz.magicorn.org/ 2>/dev/null || echo "❌ SSL certificates not found"

# Test nginx config
echo "🔧 Testing Nginx configuration..."
docker exec aws-quiz-nginx nginx -t

# Check if nginx is listening on port 443
echo "🌐 Checking port 443..."
docker exec aws-quiz-nginx netstat -tlnp | grep :443 || echo "❌ Port 443 not listening"

# Test HTTP redirect
echo "🔄 Testing HTTP to HTTPS redirect..."
curl -I http://quiz.magicorn.org/ 2>/dev/null | head -5

# Test HTTPS
echo "🔒 Testing HTTPS connection..."
curl -I https://quiz.magicorn.org/ 2>/dev/null | head -5 || echo "❌ HTTPS connection failed"

echo "✅ SSL test complete!"
