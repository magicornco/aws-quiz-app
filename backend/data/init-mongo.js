// MongoDB initialization script
db = db.getSiblingDB('aws_quiz');

// Create collections
db.createCollection('questions');
db.createCollection('game_sessions');
db.createCollection('leaderboard');

// Insert questions
db.questions.insertMany([
  {
    "id": 1,
    "question": "What is the most popular virtual server service in Amazon Web Services?",
    "options": ["EC2", "S3", "Lambda", "RDS"],
    "answer": "EC2"
  },
  {
    "id": 2,
    "question": "Which AWS service is used for file storage?",
    "options": ["EC2", "S3", "Lambda", "DynamoDB"],
    "answer": "S3"
  },
  {
    "id": 3,
    "question": "What is the maximum execution time for AWS Lambda?",
    "options": ["5 minutes", "15 minutes", "30 minutes", "60 minutes"],
    "answer": "15 minutes"
  },
  {
    "id": 4,
    "question": "Which AWS service provides database functionality?",
    "options": ["EC2", "S3", "RDS", "Lambda"],
    "answer": "RDS"
  },
  {
    "id": 5,
    "question": "Which AWS service provides Content Delivery Network (CDN) functionality?",
    "options": ["CloudFront", "Route 53", "API Gateway", "S3"],
    "answer": "CloudFront"
  },
  {
    "id": 6,
    "question": "Which AWS service provides DNS functionality?",
    "options": ["CloudFront", "Route 53", "API Gateway", "S3"],
    "answer": "Route 53"
  },
  {
    "id": 7,
    "question": "Which AWS service provides NoSQL database functionality?",
    "options": ["RDS", "DynamoDB", "Redshift", "ElastiCache"],
    "answer": "DynamoDB"
  },
  {
    "id": 8,
    "question": "Which AWS service is used for API management?",
    "options": ["CloudFront", "Route 53", "API Gateway", "S3"],
    "answer": "API Gateway"
  },
  {
    "id": 9,
    "question": "Which AWS service provides container orchestration?",
    "options": ["ECS", "EKS", "Fargate", "Lambda"],
    "answer": "EKS"
  },
  {
    "id": 10,
    "question": "Which AWS service provides message queuing functionality?",
    "options": ["SNS", "SQS", "Kinesis", "EventBridge"],
    "answer": "SQS"
  },
  {
    "id": 11,
    "question": "Which AWS service provides notification functionality?",
    "options": ["SNS", "SQS", "Kinesis", "EventBridge"],
    "answer": "SNS"
  },
  {
    "id": 12,
    "question": "Which AWS service is used for data analytics?",
    "options": ["Redshift", "Athena", "QuickSight", "Glue"],
    "answer": "Redshift"
  },
  {
    "id": 13,
    "question": "Which AWS service provides machine learning capabilities?",
    "options": ["SageMaker", "Rekognition", "Comprehend", "Lex"],
    "answer": "SageMaker"
  },
  {
    "id": 14,
    "question": "Which AWS service provides image recognition capabilities?",
    "options": ["SageMaker", "Rekognition", "Comprehend", "Lex"],
    "answer": "Rekognition"
  },
  {
    "id": 15,
    "question": "Which AWS service provides natural language processing?",
    "options": ["SageMaker", "Rekognition", "Comprehend", "Lex"],
    "answer": "Comprehend"
  },
  {
    "id": 16,
    "question": "Which AWS service provides chatbot functionality?",
    "options": ["SageMaker", "Rekognition", "Comprehend", "Lex"],
    "answer": "Lex"
  },
  {
    "id": 17,
    "question": "Which AWS service provides data lake functionality?",
    "options": ["S3", "Glacier", "Athena", "Lake Formation"],
    "answer": "Lake Formation"
  },
  {
    "id": 18,
    "question": "Which AWS service provides archive storage?",
    "options": ["S3", "Glacier", "Athena", "Lake Formation"],
    "answer": "Glacier"
  },
  {
    "id": 19,
    "question": "Which AWS service provides data transformation capabilities?",
    "options": ["Glue", "Athena", "EMR", "Kinesis"],
    "answer": "Glue"
  },
  {
    "id": 20,
    "question": "Which AWS service provides big data processing?",
    "options": ["Glue", "Athena", "EMR", "Kinesis"],
    "answer": "EMR"
  },
  {
    "id": 21,
    "question": "Which AWS service provides real-time data streaming?",
    "options": ["Glue", "Athena", "EMR", "Kinesis"],
    "answer": "Kinesis"
  },
  {
    "id": 22,
    "question": "Which AWS service provides data warehouse functionality?",
    "options": ["Redshift", "Athena", "QuickSight", "Glue"],
    "answer": "Redshift"
  },
  {
    "id": 23,
    "question": "Which AWS service provides data visualization?",
    "options": ["Redshift", "Athena", "QuickSight", "Glue"],
    "answer": "QuickSight"
  },
  {
    "id": 24,
    "question": "Which AWS service provides data discovery capabilities?",
    "options": ["Redshift", "Athena", "QuickSight", "Glue"],
    "answer": "Athena"
  },
  {
    "id": 25,
    "question": "Which AWS service provides container functionality?",
    "options": ["ECS", "EKS", "Fargate", "Lambda"],
    "answer": "ECS"
  },
  {
    "id": 26,
    "question": "Which AWS service provides serverless container functionality?",
    "options": ["ECS", "EKS", "Fargate", "Lambda"],
    "answer": "Fargate"
  },
  {
    "id": 27,
    "question": "Which AWS service provides database caching?",
    "options": ["RDS", "DynamoDB", "Redshift", "ElastiCache"],
    "answer": "ElastiCache"
  },
  {
    "id": 28,
    "question": "Which AWS service provides database migration?",
    "options": ["DMS", "Glue", "Athena", "EMR"],
    "answer": "DMS"
  },
  {
    "id": 29,
    "question": "Which AWS service provides database proxy functionality?",
    "options": ["RDS Proxy", "DMS", "Glue", "Athena"],
    "answer": "RDS Proxy"
  },
  {
    "id": 30,
    "question": "Which AWS service provides database clustering?",
    "options": ["Aurora", "RDS", "DynamoDB", "Redshift"],
    "answer": "Aurora"
  },
  {
    "id": 31,
    "question": "Which AWS service provides global database tables?",
    "options": ["Aurora", "RDS", "DynamoDB Global Tables", "Redshift"],
    "answer": "DynamoDB Global Tables"
  },
  {
    "id": 32,
    "question": "Which AWS service provides database backup functionality?",
    "options": ["Backup", "DMS", "Glue", "Athena"],
    "answer": "Backup"
  },
  {
    "id": 33,
    "question": "Which AWS service provides database encryption?",
    "options": ["KMS", "Secrets Manager", "Certificate Manager", "IAM"],
    "answer": "KMS"
  },
  {
    "id": 34,
    "question": "Which AWS service provides secret management?",
    "options": ["KMS", "Secrets Manager", "Certificate Manager", "IAM"],
    "answer": "Secrets Manager"
  },
  {
    "id": 35,
    "question": "Which AWS service provides certificate management?",
    "options": ["KMS", "Secrets Manager", "Certificate Manager", "IAM"],
    "answer": "Certificate Manager"
  },
  {
    "id": 36,
    "question": "Which AWS service provides identity and access management?",
    "options": ["KMS", "Secrets Manager", "Certificate Manager", "IAM"],
    "answer": "IAM"
  },
  {
    "id": 37,
    "question": "Which AWS service provides multi-factor authentication?",
    "options": ["MFA", "Cognito", "SSO", "Directory Service"],
    "answer": "MFA"
  },
  {
    "id": 38,
    "question": "Which AWS service provides user authentication?",
    "options": ["MFA", "Cognito", "SSO", "Directory Service"],
    "answer": "Cognito"
  },
  {
    "id": 39,
    "question": "Which AWS service provides single sign-on functionality?",
    "options": ["MFA", "Cognito", "SSO", "Directory Service"],
    "answer": "SSO"
  },
  {
    "id": 40,
    "question": "Which AWS service provides directory services?",
    "options": ["MFA", "Cognito", "SSO", "Directory Service"],
    "answer": "Directory Service"
  },
  {
    "id": 41,
    "question": "Which AWS service provides network security?",
    "options": ["WAF", "Shield", "GuardDuty", "Inspector"],
    "answer": "WAF"
  },
  {
    "id": 42,
    "question": "Which AWS service provides DDoS protection?",
    "options": ["WAF", "Shield", "GuardDuty", "Inspector"],
    "answer": "Shield"
  },
  {
    "id": 43,
    "question": "Which AWS service provides threat detection?",
    "options": ["WAF", "Shield", "GuardDuty", "Inspector"],
    "answer": "GuardDuty"
  },
  {
    "id": 44,
    "question": "Which AWS service provides security assessment?",
    "options": ["WAF", "Shield", "GuardDuty", "Inspector"],
    "answer": "Inspector"
  },
  {
    "id": 45,
    "question": "Which AWS service provides security center functionality?",
    "options": ["Security Hub", "Config", "CloudTrail", "CloudWatch"],
    "answer": "Security Hub"
  },
  {
    "id": 46,
    "question": "Which AWS service provides configuration management?",
    "options": ["Security Hub", "Config", "CloudTrail", "CloudWatch"],
    "answer": "Config"
  },
  {
    "id": 47,
    "question": "Which AWS service provides API call logging?",
    "options": ["Security Hub", "Config", "CloudTrail", "CloudWatch"],
    "answer": "CloudTrail"
  },
  {
    "id": 48,
    "question": "Which AWS service provides monitoring functionality?",
    "options": ["Security Hub", "Config", "CloudTrail", "CloudWatch"],
    "answer": "CloudWatch"
  },
  {
    "id": 49,
    "question": "Which AWS service provides infrastructure as code?",
    "options": ["CloudFormation", "CDK", "Terraform", "Ansible"],
    "answer": "CloudFormation"
  },
  {
    "id": 50,
    "question": "Which AWS service provides developer toolkit?",
    "options": ["CloudFormation", "CDK", "Terraform", "Ansible"],
    "answer": "CDK"
  }
]);

// Create indexes
db.questions.createIndex({ "id": 1 });
db.game_sessions.createIndex({ "id": 1 });
db.leaderboard.createIndex({ "score": -1 });
db.leaderboard.createIndex({ "completedAt": -1 });

print('MongoDB initialization completed successfully!');