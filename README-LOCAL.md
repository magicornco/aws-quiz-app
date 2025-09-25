# AWS Quiz App - Local Development

Bu dosya local development için gerekli adımları açıklar.

## 🚀 Hızlı Başlangıç

### 1. AWS Credentials Ayarlayın

Backend'de `.env` dosyası oluşturun:
```bash
./run-local.sh
```

Script otomatik olarak `./backend/.env` dosyası oluşturacak. Dosyayı düzenleyin:
```env
AWS_ACCESS_KEY_ID=your_actual_access_key
AWS_SECRET_ACCESS_KEY=your_actual_secret_key
AWS_REGION=us-east-2
```

### 2. Uygulamayı Başlatın

```bash
./run-local.sh
```

Veya manuel olarak:
```bash
docker compose -f docker-compose.local.yml up --build -d
```

## 📱 Erişim Adresleri

- **Frontend:** http://localhost:3001
- **Backend:** http://localhost:5001
- **Health Check:** http://localhost:5001/health

## 🔧 Geliştirme Komutları

### Logları İzleme
```bash
# Tüm servisler
docker compose -f docker-compose.local.yml logs -f

# Sadece frontend
docker compose -f docker-compose.local.yml logs -f frontend

# Sadece backend
docker compose -f docker-compose.local.yml logs -f backend
```

### Container'ları Yeniden Başlatma
```bash
docker compose -f docker-compose.local.yml restart
```

### Container'ları Durdurma
```bash
docker compose -f docker-compose.local.yml down
```

### Temiz Başlangıç
```bash
docker compose -f docker-compose.local.yml down
docker compose -f docker-compose.local.yml up --build --force-recreate -d
```

## 🗄️ Veritabanı

Local development için DynamoDB kullanılır. Tablolar otomatik olarak oluşturulur:
- `aws-quiz-local-questions` - Quiz soruları
- `aws-quiz-local-game-sessions` - Oyun oturumları
- `aws-quiz-local-leaderboard` - Liderlik tablosu

## 🔍 Sorun Giderme

### Port Çakışması
Eğer portlar kullanımdaysa, `docker-compose.local.yml` dosyasındaki port numaralarını değiştirin:
```yaml
ports:
  - "3002:3000"  # Frontend için farklı port
  - "5002:5000"  # Backend için farklı port
```

### AWS Credentials Hatası
```bash
# AWS credentials'ları kontrol edin
aws sts get-caller-identity
```

### Container Logları
```bash
# Detaylı loglar için
docker compose -f docker-compose.local.yml logs --tail=100 frontend
docker compose -f docker-compose.local.yml logs --tail=100 backend
```

## 📁 Dosya Yapısı

```
aws-quiz-app/
├── docker-compose.local.yml    # Local development compose
├── docker-compose.yml          # Production compose
├── run-local.sh               # Local development script
├── README-LOCAL.md            # Bu dosya
├── backend/                   # Backend kodu
└── frontend/                  # Frontend kodu
```

## 🆚 Production vs Local Farkları

| Özellik | Local | Production |
|---------|-------|------------|
| Port | 3001, 5001 | 80, 443 |
| Load Balancer | Yok | Nginx |
| SSL | HTTP | HTTPS (Cloudflare) |
| Backend Replica | 1 | 3 |
| Frontend Replica | 1 | 3 |
| Volume Mount | Live reload | Build |
| Environment | Development | Production |
