#!/bin/bash

echo "🚀 Starting AWS Quiz App for Local Development..."

# Check if .env file exists
if [ ! -f .env ]; then
    echo "⚠️  .env file not found. Creating template..."
    cat > .env << EOF
# AWS Credentials for Local Development
AWS_ACCESS_KEY_ID=your_aws_access_key_here
AWS_SECRET_ACCESS_KEY=your_aws_secret_key_here
AWS_REGION=us-east-1
EOF
    echo "📝 Please edit .env file with your AWS credentials"
    echo "   Then run this script again."
    exit 1
fi

# Load environment variables
export $(cat .env | grep -v '^#' | xargs)

# Check if AWS credentials are set
if [ -z "$AWS_ACCESS_KEY_ID" ] || [ "$AWS_ACCESS_KEY_ID" = "your_aws_access_key_here" ]; then
    echo "❌ Please set your AWS credentials in .env file"
    exit 1
fi

echo "✅ AWS credentials found"

# Stop any existing containers
echo "🛑 Stopping existing containers..."
docker compose -f docker-compose.local.yml down

# Build and start containers
echo "🔨 Building and starting containers..."
docker compose -f docker-compose.local.yml up --build -d

# Wait for services to be ready
echo "⏳ Waiting for services to start..."
sleep 10

# Check if services are running
echo "🔍 Checking service status..."
docker compose -f docker-compose.local.yml ps

echo ""
echo "🎉 AWS Quiz App is running locally!"
echo ""
echo "📱 Frontend: http://localhost:3001"
echo "🔧 Backend:  http://localhost:5001"
echo "🏥 Health:   http://localhost:5001/health"
echo ""
echo "📊 To view logs:"
echo "   Frontend: docker compose -f docker-compose.local.yml logs -f frontend"
echo "   Backend:  docker compose -f docker-compose.local.yml logs -f backend"
echo ""
echo "🛑 To stop: docker compose -f docker-compose.local.yml down"
