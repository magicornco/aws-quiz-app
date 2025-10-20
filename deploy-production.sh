#!/bin/bash

# Production Deployment Script for quiz.magicorn.org
# Usage: ./deploy-production.sh

set -e

echo "🚀 Starting production deployment for quiz.magicorn.org"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if running as root
if [ "$EUID" -eq 0 ]; then
    echo -e "${RED}❌ Please don't run as root${NC}"
    exit 1
fi

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo -e "${RED}❌ Docker is not running${NC}"
    exit 1
fi

# Check if Docker Compose is available
if ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}❌ Docker Compose is not installed${NC}"
    exit 1
fi

echo -e "${BLUE}📋 Pre-deployment checks:${NC}"

# Check if .env file exists
if [ ! -f "./backend/.env" ]; then
    echo -e "${YELLOW}⚠️  Backend .env file not found. Creating template...${NC}"
    cat > ./backend/.env << EOF
# AWS Configuration
AWS_REGION=us-east-2
AWS_ACCESS_KEY_ID=your_access_key_here
AWS_SECRET_ACCESS_KEY=your_secret_key_here

# DynamoDB Tables
DYNAMODB_QUESTIONS_TABLE=aws-quiz-questions
DYNAMODB_GAME_SESSIONS_TABLE=aws-quiz-game-sessions
DYNAMODB_LEADERBOARD_TABLE=aws-quiz-leaderboard

# Admin Panel
ADMIN_PASSWORD=your_admin_password_here
EOF
    echo -e "${YELLOW}⚠️  Please update ./backend/.env with your actual values${NC}"
    exit 1
fi

# Create SSL directory if it doesn't exist
mkdir -p ./ssl

echo -e "${BLUE}🔧 Building and starting services...${NC}"

# Stop existing containers
echo -e "${YELLOW}🛑 Stopping existing containers...${NC}"
docker-compose -f docker-compose.prod.yml down --remove-orphans

# Build and start services
echo -e "${YELLOW}🔨 Building images...${NC}"
docker-compose -f docker-compose.prod.yml build --no-cache

echo -e "${YELLOW}🚀 Starting services...${NC}"
docker-compose -f docker-compose.prod.yml up -d

# Wait for services to be ready
echo -e "${YELLOW}⏳ Waiting for services to be ready...${NC}"
sleep 30

# Health check
echo -e "${BLUE}🏥 Health checking services...${NC}"

# Check if containers are running
if ! docker-compose -f docker-compose.prod.yml ps | grep -q "Up"; then
    echo -e "${RED}❌ Some containers failed to start${NC}"
    docker-compose -f docker-compose.prod.yml logs
    exit 1
fi

# Test API endpoint
if curl -f http://localhost/health > /dev/null 2>&1; then
    echo -e "${GREEN}✅ API health check passed${NC}"
else
    echo -e "${YELLOW}⚠️  API health check failed, but continuing...${NC}"
fi

# Show running containers
echo -e "${BLUE}📊 Running containers:${NC}"
docker-compose -f docker-compose.prod.yml ps

echo -e "${GREEN}🎉 Deployment completed successfully!${NC}"
echo -e "${BLUE}🌐 Your application should be available at:${NC}"
echo -e "   • HTTP:  http://quiz.magicorn.org"
echo -e "   • HTTPS: https://quiz.magicorn.org"
echo ""
echo -e "${BLUE}📝 Useful commands:${NC}"
echo -e "   • View logs: docker-compose -f docker-compose.prod.yml logs -f"
echo -e "   • Stop services: docker-compose -f docker-compose.prod.yml down"
echo -e "   • Restart services: docker-compose -f docker-compose.prod.yml restart"
echo ""
echo -e "${YELLOW}⚠️  Don't forget to:${NC}"
echo -e "   1. Configure Cloudflare SSL settings"
echo -e "   2. Set up proper DNS records"
echo -e "   3. Configure firewall rules"
echo -e "   4. Set up monitoring and backups"
