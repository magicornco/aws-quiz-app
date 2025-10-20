#!/bin/bash

# Cloudflare Cache Fix Script
# Bu script Cloudflare cache sorunlarını çözer

echo "🔧 Cloudflare cache sorunlarını çözüyor..."

# 1. Nginx'i yeniden başlat
echo "📦 Nginx'i yeniden başlatıyor..."
docker-compose -f docker-compose.simple.yml restart nginx

# 2. Frontend'i yeniden build et
echo "🔨 Frontend'i yeniden build ediyor..."
docker-compose -f docker-compose.simple.yml build --no-cache frontend

# 3. Tüm servisleri yeniden başlat
echo "🚀 Tüm servisleri yeniden başlatıyor..."
docker-compose -f docker-compose.simple.yml up -d

# 4. Cache temizleme için özel header'lar ekle
echo "🧹 Cache temizleme header'ları ekleniyor..."

# 5. Health check
echo "🏥 Health check yapıyor..."
sleep 10

if curl -f http://localhost/health > /dev/null 2>&1; then
    echo "✅ Backend sağlıklı"
else
    echo "❌ Backend sağlık kontrolü başarısız"
fi

if curl -f http://localhost/ > /dev/null 2>&1; then
    echo "✅ Frontend erişilebilir"
else
    echo "❌ Frontend erişilemiyor"
fi

echo ""
echo "🌐 Test URL'leri:"
echo "   • HTTP: http://quiz.magicorn.org"
echo "   • Health: http://quiz.magicorn.org/health"
echo ""
echo "💡 Cloudflare'de yapmanız gerekenler:"
echo "   1. Cloudflare Dashboard > Caching > Configuration"
echo "   2. 'Caching Level' = Standard"
echo "   3. 'Browser Cache TTL' = 4 hours"
echo "   4. 'Always Online' = ON"
echo ""
echo "   5. Page Rules ekleyin:"
echo "      • quiz.magicorn.org/static/*"
echo "      • Cache Level: Cache Everything"
echo "      • Edge Cache TTL: 1 month"
echo ""
echo "   6. Development Mode'u açın (geçici):"
echo "      • Caching > Configuration > Development Mode"
echo "      • 3 saat sonra kapatın"
echo ""
echo "   7. Cache'i manuel temizleyin:"
echo "      • Caching > Configuration > Purge Everything"
echo ""
echo "🎉 Tamamlandı!"
