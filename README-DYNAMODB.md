# AWS Quiz App - DynamoDB Setup

Bu uygulama artık AWS DynamoDB kullanıyor. MongoDB yerine DynamoDB kullanarak daha profesyonel ve AWS ekosistemi ile uyumlu bir yapıya geçtik.

## 🚀 Kurulum Adımları

### 1. AWS Credentials Ayarlama

Backend klasöründe `.env` dosyası oluşturun:

```bash
cd backend
cp .env.example .env
```

`.env` dosyasını düzenleyin:

```env
# AWS DynamoDB Configuration
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_access_key_here
AWS_SECRET_ACCESS_KEY=your_secret_key_here

# DynamoDB Table Names
DYNAMODB_QUESTIONS_TABLE=aws-quiz-questions
DYNAMODB_GAME_SESSIONS_TABLE=aws-quiz-game-sessions
DYNAMODB_LEADERBOARD_TABLE=aws-quiz-leaderboard

# Server Configuration
PORT=5000
NODE_ENV=development
```

### 2. AWS IAM Kullanıcısı Oluşturma

AWS Console'da yeni bir IAM kullanıcısı oluşturun ve aşağıdaki policy'yi ekleyin:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "dynamodb:CreateTable",
                "dynamodb:DescribeTable",
                "dynamodb:PutItem",
                "dynamodb:GetItem",
                "dynamodb:UpdateItem",
                "dynamodb:DeleteItem",
                "dynamodb:Query",
                "dynamodb:Scan"
            ],
            "Resource": [
                "arn:aws:dynamodb:*:*:table/aws-quiz-*"
            ]
        }
    ]
}
```

### 3. DynamoDB Tablolarını Oluşturma

```bash
# Backend dependencies'leri yükle
cd backend
npm install

# DynamoDB tablolarını oluştur
npm run create-tables
```

### 4. Soruları DynamoDB'ye Yükleme

```bash
# 200 soruyu DynamoDB'ye yükle
npm run init-questions
```

### 5. Uygulamayı Başlatma

```bash
# Ana dizinde
docker-compose up -d
```

## 📊 DynamoDB Tabloları

### 1. aws-quiz-questions
- **Primary Key**: id (Number)
- **İçerik**: Quiz soruları
- **TTL**: Yok

### 2. aws-quiz-game-sessions
- **Primary Key**: id (String)
- **İçerik**: Oyun oturumları
- **TTL**: 24 saat

### 3. aws-quiz-leaderboard
- **Primary Key**: id (String)
- **Global Secondary Index**: ScoreIndex (score, completedAt)
- **İçerik**: Liderlik tablosu
- **TTL**: Yok

## 🔧 Komutlar

```bash
# Tabloları oluştur
npm run create-tables

# Soruları yükle
npm run init-questions

# Backend'i başlat
npm start

# Development mode
npm run dev
```

## 🌐 Erişim

- **Frontend**: http://localhost:3001
- **Backend API**: http://localhost:5001/api
- **Health Check**: http://localhost:5001/api/health

## 📝 Notlar

- DynamoDB pay-per-request billing kullanıyor
- Game sessions 24 saat sonra otomatik silinir (TTL)
- Leaderboard'da score'larına göre sıralama yapılır
- AWS credentials'ları güvenli bir şekilde saklayın

## 🚨 Sorun Giderme

### DynamoDB Bağlantı Hatası
- AWS credentials'ları kontrol edin
- AWS region'ın doğru olduğundan emin olun
- IAM policy'sinin yeterli izinlere sahip olduğunu kontrol edin

### Tablo Bulunamadı Hatası
```bash
npm run create-tables
```

### Sorular Yüklenmedi
```bash
npm run init-questions
```

