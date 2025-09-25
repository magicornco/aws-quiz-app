#!/bin/bash

echo "🚀 Starting AWS Quiz App for Local Development..."

# Check if backend .env file exists
if [ ! -f ./backend/.env ]; then
    echo "⚠️  Backend .env file not found. Creating template..."
    cat > ./backend/.env << EOF
# AWS Credentials
AWS_REGION=us-east-2
AWS_ACCESS_KEY_ID=your_aws_access_key_here
AWS_SECRET_ACCESS_KEY=your_aws_secret_key_here

# DynamoDB Table Names (Local Development)
DYNAMODB_QUESTIONS_TABLE=aws-quiz-local-questions
DYNAMODB_GAME_SESSIONS_TABLE=aws-quiz-local-game-sessions
DYNAMODB_LEADERBOARD_TABLE=aws-quiz-local-leaderboard
EOF
    echo "📝 Please edit ./backend/.env file with your AWS credentials"
    echo "   Then run this script again."
    exit 1
fi

# Check if AWS credentials are set in backend .env
if grep -q "your_aws_access_key_here" ./backend/.env; then
    echo "❌ Please set your AWS credentials in ./backend/.env file"
    echo "   Edit the file and replace 'your_aws_access_key_here' with your actual credentials"
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
echo ""
echo "🔍 Container status:"
docker compose -f docker-compose.local.yml ps
