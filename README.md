# AWS Quiz App

AWS servisleri hakkında bilgi yarışması uygulaması. Kullanıcılar 2 dakika içinde 5 soru cevaplayarak AWS bilgilerini test edebilirler.

## Özellikler

- 🎯 50 AWS sorusu havuzundan rastgele 5 soru
- ⏱️ 2 dakika süre sınırı
- 🎮 Her soru için 3 deneme hakkı
- 🏆 Sıralama tablosu
- 🎁 Başarıya göre hediye sistemi
- 📱 Responsive tasarım
- 🐳 Docker Compose ile kolay kurulum

## Teknolojiler

### Backend
- Node.js + Express
- MongoDB
- Docker

### Frontend
- React
- Styled Components
- Axios

## Kurulum

### Docker Compose ile (Önerilen)

1. Projeyi klonlayın:
```bash
git clone <repository-url>
cd aws-quiz-app
```

2. Docker Compose ile başlatın:
```bash
docker-compose up -d
```

3. Uygulamaya erişin:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- MongoDB: localhost:27017

### Manuel Kurulum

#### Backend
```bash
cd backend
npm install
npm start
```

#### Frontend
```bash
cd frontend
npm install
npm start
```

#### MongoDB
MongoDB'yi yerel olarak kurun ve çalıştırın.

## API Endpoints

### Oyun
- `POST /api/game/start` - Yeni oyun başlat
- `POST /api/game/answer` - Cevap gönder
- `GET /api/game/:gameId/status` - Oyun durumu

### Sıralama
- `GET /api/leaderboard` - Sıralama tablosu

### Sistem
- `GET /api/health` - Sistem durumu

## Oyun Kuralları

1. Kullanıcı adını girin
2. 2 dakika içinde 5 soru cevaplayın
3. Her soru için 3 deneme hakkınız var
4. Doğru cevap verdiğinizde bir sonraki soruya geçin
5. 3 hakkınız bittiğinde otomatik olarak bir sonraki soruya geçin
6. Süre dolduğunda veya tüm sorular bittiğinde oyun sona erer
7. Skorunuza göre hediye kazanın

## Hediye Sistemi

- 5/5: 🏆 Altın Madalya
- 4/5: 🥈 Gümüş Madalya  
- 3/5: 🥉 Bronz Madalya
- 2/5: 🎖️ Katılım Sertifikası
- 1/5: 📜 Teşekkür Belgesi
- 0/5: 💪 Tekrar Deneme

## Geliştirme

### Backend Geliştirme
```bash
cd backend
npm run dev
```

### Frontend Geliştirme
```bash
cd frontend
npm start
```

## Docker Komutları

```bash
# Servisleri başlat
docker-compose up -d

# Logları görüntüle
docker-compose logs -f

# Servisleri durdur
docker-compose down

# Volumeleri de sil
docker-compose down -v
```

## Lisans

MIT License
