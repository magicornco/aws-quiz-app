#!/bin/bash

echo "🚀 Deploying AWS Quiz App with Load Balancing..."

# Stop existing containers
echo "📦 Stopping existing containers..."
docker-compose down

# Remove old containers and images (optional - for clean deployment)
echo "🧹 Cleaning up old containers..."
docker system prune -f

# Build and start new containers
echo "🔨 Building and starting containers..."
docker-compose up -d --build

# Wait for services to be ready
echo "⏳ Waiting for services to start..."
sleep 30

# Check container status
echo "📊 Container Status:"
docker-compose ps

# Test load balancer
echo "🔍 Testing load balancer..."
curl -I http://localhost/health || echo "Health check failed"

echo "✅ Deployment completed!"
echo "🌐 Application is available at: http://your-ec2-ip"
echo "📈 Load balancing across 3 backend and 3 frontend replicas"
