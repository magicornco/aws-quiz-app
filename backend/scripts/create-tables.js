const { DynamoDBClient, CreateTableCommand, DescribeTableCommand } = require('@aws-sdk/client-dynamodb');
require('dotenv').config();

const client = new DynamoDBClient({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const QUESTIONS_TABLE = process.env.DYNAMODB_QUESTIONS_TABLE || 'aws-quiz-questions';
const GAME_SESSIONS_TABLE = process.env.DYNAMODB_GAME_SESSIONS_TABLE || 'aws-quiz-game-sessions';
const LEADERBOARD_TABLE = process.env.DYNAMODB_LEADERBOARD_TABLE || 'aws-quiz-leaderboard';

async function createTable(tableName, keySchema, attributeDefinitions, globalSecondaryIndexes = []) {
  try {
    // Check if table already exists
    try {
      await client.send(new DescribeTableCommand({ TableName: tableName }));
      console.log(`Table ${tableName} already exists`);
      return;
    } catch (error) {
      if (error.name !== 'ResourceNotFoundException') {
        throw error;
      }
    }

    const params = {
      TableName: tableName,
      KeySchema: keySchema,
      AttributeDefinitions: attributeDefinitions,
      BillingMode: 'PAY_PER_REQUEST', // On-demand billing
    };

    if (globalSecondaryIndexes.length > 0) {
      params.GlobalSecondaryIndexes = globalSecondaryIndexes;
    }

    await client.send(new CreateTableCommand(params));
    console.log(`Table ${tableName} created successfully`);
  } catch (error) {
    console.error(`Error creating table ${tableName}:`, error);
    throw error;
  }
}

async function createAllTables() {
  try {
    console.log('Creating DynamoDB tables...');

    // Questions table
    await createTable(
      QUESTIONS_TABLE,
      [{ AttributeName: 'id', KeyType: 'HASH' }],
      [{ AttributeName: 'id', AttributeType: 'N' }]
    );

    // Game sessions table
    await createTable(
      GAME_SESSIONS_TABLE,
      [{ AttributeName: 'id', KeyType: 'HASH' }],
      [{ AttributeName: 'id', AttributeType: 'S' }]
    );

    // Leaderboard table
    await createTable(
      LEADERBOARD_TABLE,
      [{ AttributeName: 'id', KeyType: 'HASH' }],
      [
        { AttributeName: 'id', AttributeType: 'S' },
        { AttributeName: 'score', AttributeType: 'N' },
        { AttributeName: 'completedAt', AttributeType: 'S' }
      ],
      [
        {
          IndexName: 'ScoreIndex',
          KeySchema: [
            { AttributeName: 'score', KeyType: 'HASH' },
            { AttributeName: 'completedAt', KeyType: 'RANGE' }
          ],
          Projection: { ProjectionType: 'ALL' }
        }
      ]
    );

    console.log('All tables created successfully!');
  } catch (error) {
    console.error('Error creating tables:', error);
    process.exit(1);
  }
}

createAllTables();
