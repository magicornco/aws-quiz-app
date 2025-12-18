# AWS Cloud & AI Summit Sorularını Yükleme

Bu kılavuz, AWS Cloud & AI Summit etkinliği için hazırlanan 100 soruyu admin panelden nasıl yükleyeceğinizi gösterir.

## 📋 Hazırlanan Dosya

- **Dosya Adı**: `aws-cloud-ai-summit-questions.json`
- **Soru Sayısı**: 100 soru
- **Konular**: AWS Cloud Services, AI/ML Services, Compute, Storage, Database, Networking, Security, ve daha fazlası

## 🚀 Admin Panelden Yükleme Adımları

### 1. Admin Panele Giriş Yapın

1. Uygulamayı açın: `http://quiz.magicorn.org` (veya localhost)
2. Admin paneline gidin: `/admin` route'una gidin
3. Admin credentials ile giriş yapın

### 2. JSON Dosyasını Yükleyin

#### Yöntem 1: Dosyadan Kopyala-Yapıştır (Önerilen)

1. `aws-cloud-ai-summit-questions.json` dosyasını açın
2. Tüm içeriği kopyalayın (Ctrl+A, Ctrl+C veya Cmd+A, Cmd+C)
3. Admin panelde "Questions" bölümüne gidin
4. "Paste JSON questions here..." textarea'sına yapıştırın
5. "Load from JSON" butonuna tıklayın

#### Yöntem 2: Tek Tek Ekleme

1. Admin panelde "Add New Question" butonuna tıklayın
2. Her soru için:
   - Question text'i girin
   - 4 seçeneği girin
   - Correct answer'ı girin
3. "Add Question" butonuna tıklayın

## 📊 Soru Kategorileri

100 soru şu kategorilere ayrılmıştır:

### Cloud Services (40 soru)
- Compute: EC2, Lambda, ECS, EKS, Fargate, App Runner
- Storage: S3, EBS, EFS, FSx, Glacier
- Database: RDS, DynamoDB, Redshift, DocumentDB, Neptune, Keyspaces, Timestream
- Networking: VPC, CloudFront, Route 53, API Gateway, AppSync

### AI/ML Services (25 soru)
- SageMaker, Bedrock, Q, Q Developer
- Rekognition, Comprehend, Polly, Transcribe, Lex
- Textract, Forecast, Personalize, Kendra
- Lookout for Vision, Lookout for Equipment, Lookout for Metrics
- Augmented AI (A2I), Fraud Detector, CodeWhisperer, CodeGuru

### Analytics & Big Data (15 soru)
- Athena, Glue, Kinesis, EMR, Redshift
- QuickSight, OpenSearch, MSK
- Managed services: Apache Spark, Kafka, Flink, Hive, Presto

### Security & Compliance (10 soru)
- IAM, KMS, Shield, WAF, GuardDuty
- Macie, Detective, Security Hub, Config, Artifact

### DevOps & Management (10 soru)
- CloudFormation, CloudWatch, Systems Manager
- CodePipeline, CodeBuild, CodeDeploy
- Control Tower, Proton, Backup

## ✅ Yükleme Sonrası Kontrol

1. Admin panelde "Questions" bölümüne gidin
2. Toplam soru sayısını kontrol edin (100 soru olmalı)
3. Birkaç soruyu rastgele açıp kontrol edin
4. Test quiz'i çalıştırın

## 🔧 Sorun Giderme

### JSON Format Hatası

Eğer "Invalid JSON format" hatası alırsanız:

1. JSON dosyasının geçerli JSON formatında olduğundan emin olun
2. Tüm tırnak işaretlerinin doğru olduğunu kontrol edin
3. Son satırda virgül olmamalı
4. JSON validator kullanın: https://jsonlint.com/

### Soru Eklenmedi

1. Browser console'u kontrol edin (F12)
2. Network tab'ında API isteklerini kontrol edin
3. Backend loglarını kontrol edin
4. DynamoDB tablosunun erişilebilir olduğundan emin olun

### Duplicate Sorular

Eğer sorular zaten varsa:

1. Mevcut soruları silin (isteğe bağlı)
2. Veya yeni sorular farklı ID'lerle eklenecektir

## 📝 Soru Formatı

Her soru şu formatta olmalıdır:

```json
{
  "id": 1,
  "question": "What does AWS stand for?",
  "options": [
    "Amazon Web Services",
    "Amazon Workflow System",
    "Advanced Web Solutions",
    "Amazon Workspace Services"
  ],
  "answer": "Amazon Web Services"
}
```

## 🎯 Özellikler

- ✅ 100 adet AWS Cloud & AI Summit soruları
- ✅ Çoktan seçmeli format (4 seçenek)
- ✅ AWS servisleri, AI/ML, Security, Analytics konuları
- ✅ Admin panelden kolay yükleme
- ✅ JSON formatında hazır

## 💡 İpuçları

1. **Toplu Yükleme**: Tüm 100 soruyu bir seferde yükleyebilirsiniz
2. **ID'ler**: Sorular otomatik olarak ID alacaktır (mevcut max ID'den sonra)
3. **Düzenleme**: Yükledikten sonra admin panelden düzenleyebilirsiniz
4. **Silme**: İstenmeyen soruları admin panelden silebilirsiniz

## 📚 Ek Kaynaklar

- [AWS Documentation](https://docs.aws.amazon.com/)
- [AWS AI/ML Services](https://aws.amazon.com/machine-learning/)
- [AWS Cloud Services](https://aws.amazon.com/products/)

---

**Hazırlayan**: Quiz App Admin Panel  
**Tarih**: 2024  
**Etkinlik**: AWS Cloud & AI Summit
