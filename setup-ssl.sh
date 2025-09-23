#!/bin/bash

echo "🔒 Setting up Let's Encrypt SSL for quiz.magicorn.org..."

# Create temporary nginx config for initial certificate request
cat > nginx/nginx-temp.conf << 'EOF'
events {
    worker_connections 1024;
}

http {
    upstream backend {
        server aws-quiz-backend-1:5000;
        server aws-quiz-backend-2:5000;
        server aws-quiz-backend-3:5000;
    }

    upstream frontend {
        server aws-quiz-frontend-1:3000;
        server aws-quiz-frontend-2:3000;
        server aws-quiz-frontend-3:3000;
    }

    server {
        listen 80;
        server_name quiz.magicorn.org;

        # Let's Encrypt challenge
        location /.well-known/acme-challenge/ {
            root /var/www/certbot;
        }

        # Frontend routing
        location / {
            proxy_pass http://frontend;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            
            # WebSocket support for React dev server
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgrade";
        }

        # Backend API routing
        location /api/ {
            proxy_pass http://backend;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }

        # Health check endpoint
        location /health {
            proxy_pass http://backend;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
    }
}
EOF

echo "📦 Starting containers with temporary config..."
docker compose down
cp nginx/nginx-temp.conf nginx/nginx.conf
docker compose up -d

echo "⏳ Waiting for containers to start..."
sleep 30

echo "🔐 Requesting SSL certificate..."
docker compose run --rm certbot

echo "🔄 Updating nginx config with SSL..."
cp nginx/nginx.conf nginx/nginx-ssl.conf
docker compose down
docker compose up -d

echo "✅ SSL setup complete!"
echo "🌐 Your site is now available at: https://quiz.magicorn.org"

# Cleanup
rm nginx/nginx-temp.conf
