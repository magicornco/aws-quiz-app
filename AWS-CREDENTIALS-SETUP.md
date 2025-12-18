# AWS Credentials Yapılandırma Kılavuzu

Bu kılavuz, DynamoDB bağlantısı için AWS credentials'larını nasıl yapılandıracağınızı gösterir.

## 🔴 Hata: "Resolved credential object is not valid"

Bu hata, AWS credentials'larının eksik veya yanlış yapılandırıldığını gösterir.

## ✅ Çözüm Adımları

### 1. AWS IAM Kullanıcısı Oluşturma

1. AWS Console'a giriş yapın: https://console.aws.amazon.com
2. IAM servisine gidin
3. "Users" → "Add users" tıklayın
4. Kullanıcı adı girin (örn: `quiz-app-dynamodb-user`)
5. "Access type" → "Programmatic access" seçin
6. "Next: Permissions" tıklayın

### 2. IAM Permissions (İzinler)

DynamoDB için gerekli izinler:

**Seçenek 1: Managed Policy (Önerilen)**
- `AmazonDynamoDBFullAccess` policy'sini ekleyin

**Seçenek 2: Custom Policy (Daha Güvenli)**
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "dynamodb:PutItem",
        "dynamodb:GetItem",
        "dynamodb:UpdateItem",
        "dynamodb:DeleteItem",
        "dynamodb:Query",
        "dynamodb:Scan",
        "dynamodb:BatchGetItem",
        "dynamodb:BatchWriteItem"
      ],
      "Resource": [
        "arn:aws:dynamodb:*:*:table/aws-quiz-questions",
        "arn:aws:dynamodb:*:*:table/aws-quiz-game-sessions",
        "arn:aws:dynamodb:*:*:table/aws-quiz-leaderboard",
        "arn:aws:dynamodb:*:*:table/aws-quiz-*/index/*"
      ]
    }
  ]
}
```

### 3. Access Keys Oluşturma

1. IAM kullanıcısını oluşturduktan sonra
2. "Access key ID" ve "Secret access key" değerlerini kopyalayın
3. ⚠️ **ÖNEMLİ**: Secret access key sadece bir kez gösterilir, kaydedin!

### 4. Environment Variables Yapılandırma

#### Yöntem 1: .env Dosyası (Önerilen)

1. `backend/.env.example` dosyasını `backend/.env` olarak kopyalayın:
   ```bash
   cp backend/.env.example backend/.env
   ```

2. `.env` dosyasını düzenleyin:
   ```bash
   # AWS DynamoDB Configuration
   AWS_REGION=us-east-2
   AWS_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE
   AWS_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
   
   # DynamoDB Table Names
   DYNAMODB_QUESTIONS_TABLE=aws-quiz-questions
   DYNAMODB_GAME_SESSIONS_TABLE=aws-quiz-game-sessions
   DYNAMODB_LEADERBOARD_TABLE=aws-quiz-leaderboard
   
   # Admin Panel
   ADMIN_USERNAME=admin
   ADMIN_PASSWORD=your-secure-password
   ```

3. Gerçek değerlerinizi girin

#### Yöntem 2: Docker Compose Environment Variables

`docker-compose.simple.yml` dosyasının bulunduğu dizinde `.env` dosyası oluşturun:

```bash
# Root directory'de .env dosyası
AWS_REGION=us-east-2
AWS_ACCESS_KEY_ID=your-access-key-id
AWS_SECRET_ACCESS_KEY=your-secret-access-key
```

#### Yöntem 3: System Environment Variables

```bash
export AWS_REGION=us-east-2
export AWS_ACCESS_KEY_ID=your-access-key-id
export AWS_SECRET_ACCESS_KEY=your-secret-access-key
```

### 5. Docker Container'ı Yeniden Başlatma

Credentials'ları ekledikten sonra:

```bash
# Container'ları durdur
docker compose -f docker-compose.simple.yml down

# Yeniden başlat
docker compose -f docker-compose.simple.yml up -d

# Logları kontrol et
docker compose -f docker-compose.simple.yml logs -f backend
```

## 🔍 Credentials Kontrolü

### Backend Container İçinde Kontrol

```bash
# Container'a gir
docker exec -it quiz-backend sh

# Environment variables'ları kontrol et
env | grep AWS

# Çıkış
exit
```

### Test Komutu

```bash
# AWS CLI ile test (eğer yüklüyse)
aws dynamodb list-tables \
  --region us-east-2 \
  --aws-access-key-id YOUR_ACCESS_KEY \
  --aws-secret-access-key YOUR_SECRET_KEY
```

## 🛡️ Güvenlik İpuçları

1. **`.env` dosyasını Git'e eklemeyin!**
   - `.gitignore` dosyasına `.env` ekleyin
   - `.env.example` dosyasını kullanın (gerçek değerler olmadan)

2. **IAM Kullanıcısı için Minimum Permissions**
   - Sadece gerekli DynamoDB izinlerini verin
   - Full access vermeyin

3. **Access Keys Rotation**
   - Düzenli olarak access keys'leri değiştirin
   - Eski keys'leri devre dışı bırakın

4. **Production'da Secrets Manager Kullanın**
   - AWS Secrets Manager veya Parameter Store kullanın
   - Environment variables yerine

## ❌ Yaygın Hatalar

### 1. Credentials Boş
```
Error: AWS credentials cannot be empty
```
**Çözüm**: `.env` dosyasında değerlerin doğru girildiğinden emin olun

### 2. Yanlış Region
```
Error: The security token included in the request is invalid
```
**Çözüm**: Region'ın doğru olduğundan emin olun (örn: us-east-2)

### 3. IAM Permissions Eksik
```
Error: User is not authorized to perform: dynamodb:Scan
```
**Çözüm**: IAM kullanıcısına DynamoDB izinleri verin

### 4. Access Key Geçersiz
```
Error: The AWS Access Key Id you provided does not exist
```
**Çözüm**: Access key ID'yi kontrol edin

## 📝 Örnek .env Dosyası

```bash
# AWS Configuration
AWS_REGION=us-east-2
AWS_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE
AWS_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY

# DynamoDB Tables
DYNAMODB_QUESTIONS_TABLE=aws-quiz-questions
DYNAMODB_GAME_SESSIONS_TABLE=aws-quiz-game-sessions
DYNAMODB_LEADERBOARD_TABLE=aws-quiz-leaderboard

# Admin Panel
ADMIN_USERNAME=admin
ADMIN_PASSWORD=ChangeThisPassword123!
```

## 🔗 Faydalı Linkler

- [AWS IAM Console](https://console.aws.amazon.com/iam/)
- [DynamoDB Console](https://console.aws.amazon.com/dynamodb/)
- [AWS Credentials Best Practices](https://docs.aws.amazon.com/general/latest/gr/aws-access-keys-best-practices.html)

---

**Not**: Bu kılavuzu takip ettikten sonra hala sorun yaşıyorsanız, backend loglarını kontrol edin:
```bash
docker compose -f docker-compose.simple.yml logs backend
```
