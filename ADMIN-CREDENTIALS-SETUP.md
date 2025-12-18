# Admin Panel Credentials Yapılandırma

Bu kılavuz, admin panel için credentials'ları nasıl yapılandıracağınızı gösterir.

## 🔐 Varsayılan Credentials

Eğer environment variable'lar ayarlanmamışsa, varsayılan değerler:
- **Username**: `admin`
- **Password**: `admin123`

⚠️ **ÖNEMLİ**: Production'da mutlaka değiştirin!

## ✅ Yapılandırma Yöntemleri

### Yöntem 1: .env Dosyası (Önerilen)

1. `backend/.env` dosyasını oluşturun veya düzenleyin:

```bash
# Admin Panel Credentials
ADMIN_USERNAME=your-admin-username
ADMIN_PASSWORD=your-secure-password-here
```

2. Container'ı yeniden başlatın:
```bash
docker compose -f docker-compose.simple.yml restart backend
```

### Yöntem 2: Docker Compose Environment Variables

Root dizinde `.env` dosyası oluşturun:

```bash
# Root directory .env file
ADMIN_USERNAME=your-admin-username
ADMIN_PASSWORD=your-secure-password-here
```

Docker Compose otomatik olarak bu değerleri okuyacaktır.

### Yöntem 3: System Environment Variables

```bash
export ADMIN_USERNAME=your-admin-username
export ADMIN_PASSWORD=your-secure-password-here
```

## 🔍 Mevcut Credentials'ı Kontrol Etme

### Backend Container İçinde

```bash
# Container'a gir
docker exec -it quiz-backend sh

# Environment variables'ları kontrol et
env | grep ADMIN

# Çıkış
exit
```

### Backend Loglarında

Backend başladığında şu mesajı görmelisiniz:
```
✅ Admin credentials configured for user: your-username
```

## 🚨 Sorun Giderme

### "Invalid admin credentials" Hatası

1. **Credentials'ları kontrol edin:**
   ```bash
   docker exec -it quiz-backend env | grep ADMIN
   ```

2. **Backend loglarını kontrol edin:**
   ```bash
   docker compose -f docker-compose.simple.yml logs backend | grep Admin
   ```

3. **.env dosyasının doğru yüklendiğinden emin olun:**
   - `backend/.env` dosyası var mı?
   - Dosya formatı doğru mu? (boşluk, tırnak işareti yok mu?)

4. **Container'ı yeniden başlatın:**
   ```bash
   docker compose -f docker-compose.simple.yml restart backend
   ```

### Credentials Değişikliği Sonrası

Credentials'ları değiştirdikten sonra:

1. Backend container'ını yeniden başlatın:
   ```bash
   docker compose -f docker-compose.simple.yml restart backend
   ```

2. Browser'da admin panel'i yenileyin (hard refresh: Ctrl+Shift+R)

3. Yeni credentials ile giriş yapın

## 📝 Örnek .env Dosyası

```bash
# AWS DynamoDB Configuration
AWS_REGION=us-east-2
AWS_ACCESS_KEY_ID=your-access-key-id
AWS_SECRET_ACCESS_KEY=your-secret-access-key

# DynamoDB Table Names
DYNAMODB_QUESTIONS_TABLE=aws-quiz-questions
DYNAMODB_GAME_SESSIONS_TABLE=aws-quiz-game-sessions
DYNAMODB_LEADERBOARD_TABLE=aws-quiz-leaderboard

# Admin Panel Credentials
ADMIN_USERNAME=magicorn
ADMIN_PASSWORD=magicorn2025
```

## 🔒 Güvenlik İpuçları

1. **Güçlü Şifre Kullanın:**
   - En az 12 karakter
   - Büyük/küçük harf, sayı ve özel karakter içermeli
   - Örnek: `M@g1c0rn2025!`

2. **.env Dosyasını Git'e Eklemeyin:**
   - `.gitignore` dosyasına `.env` ekleyin
   - `.env.example` dosyası kullanın (gerçek değerler olmadan)

3. **Production'da Farklı Credentials:**
   - Development ve production için farklı credentials kullanın
   - Production credentials'ları güvenli bir şekilde saklayın

4. **Düzenli Olarak Değiştirin:**
   - Credentials'ları düzenli olarak değiştirin
   - Eski credentials'ları devre dışı bırakın

## 🎯 Hızlı Test

1. Admin panele gidin: `http://quiz.magicorn.org/admin`
2. Varsayılan credentials ile giriş yapın:
   - Username: `admin`
   - Password: `admin123`
3. Başarılı giriş yapabilmelisiniz

Eğer hala sorun yaşıyorsanız, backend loglarını kontrol edin:
```bash
docker compose -f docker-compose.simple.yml logs -f backend
```
