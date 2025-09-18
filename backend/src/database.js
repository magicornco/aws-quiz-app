const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, PutCommand, GetCommand, UpdateCommand, QueryCommand, ScanCommand, DeleteCommand } = require('@aws-sdk/lib-dynamodb');
require('dotenv').config();

class Database {
  constructor() {
    this.client = new DynamoDBClient({
      region: process.env.AWS_REGION || 'us-east-1',
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });
    
    this.docClient = DynamoDBDocumentClient.from(this.client);
    this.isConnected = false;
    
    // Table names
    this.QUESTIONS_TABLE = process.env.DYNAMODB_QUESTIONS_TABLE || 'aws-quiz-questions';
    this.GAME_SESSIONS_TABLE = process.env.DYNAMODB_GAME_SESSIONS_TABLE || 'aws-quiz-game-sessions';
    this.LEADERBOARD_TABLE = process.env.DYNAMODB_LEADERBOARD_TABLE || 'aws-quiz-leaderboard';
  }

  async connect() {
    try {
      // Test connection by listing tables
      const command = new ScanCommand({
        TableName: this.QUESTIONS_TABLE,
        Limit: 1
      });
      
      await this.docClient.send(command);
      this.isConnected = true;
      console.log('Connected to DynamoDB successfully');
      
    } catch (error) {
      console.error('DynamoDB connection error:', error);
      this.isConnected = false;
      throw error;
    }
  }

  async disconnect() {
    // DynamoDB client doesn't need explicit disconnection
    this.isConnected = false;
    console.log('Disconnected from DynamoDB');
  }

  async getQuestions() {
    try {
      const command = new ScanCommand({
        TableName: this.QUESTIONS_TABLE
      });
      
      const result = await this.docClient.send(command);
      return result.Items || [];
    } catch (error) {
      console.error('Error getting questions:', error);
      throw error;
    }
  }

  async saveGameSession(session) {
    try {
      const command = new PutCommand({
        TableName: this.GAME_SESSIONS_TABLE,
        Item: {
          id: session.id,
          playerName: session.playerName,
          questions: session.questions,
          currentQuestionIndex: session.currentQuestionIndex,
          score: session.score,
          startTime: session.startTime,
          timeLimit: session.timeLimit,
          completed: session.completed,
          answers: session.answers || [],
          createdAt: new Date().toISOString(),
          ttl: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // 24 hours TTL
        }
      });
      
      await this.docClient.send(command);
      return { insertedId: session.id };
    } catch (error) {
      console.error('Error saving game session:', error);
      throw error;
    }
  }

  async getGameSession(gameId) {
    try {
      const command = new GetCommand({
        TableName: this.GAME_SESSIONS_TABLE,
        Key: { id: gameId }
      });
      
      const result = await this.docClient.send(command);
      return result.Item || null;
    } catch (error) {
      console.error('Error getting game session:', error);
      throw error;
    }
  }

  async updateGameSession(gameId, update) {
    try {
      const updateExpression = [];
      const expressionAttributeNames = {};
      const expressionAttributeValues = {};
      
      // Build update expression dynamically
      Object.keys(update).forEach((key, index) => {
        updateExpression.push(`#attr${index} = :val${index}`);
        expressionAttributeNames[`#attr${index}`] = key;
        expressionAttributeValues[`:val${index}`] = update[key];
      });
      
      const command = new UpdateCommand({
        TableName: this.GAME_SESSIONS_TABLE,
        Key: { id: gameId },
        UpdateExpression: `SET ${updateExpression.join(', ')}`,
        ExpressionAttributeNames: expressionAttributeNames,
        ExpressionAttributeValues: expressionAttributeValues
      });
      
      await this.docClient.send(command);
      return { modifiedCount: 1 };
    } catch (error) {
      console.error('Error updating game session:', error);
      throw error;
    }
  }

  async addToLeaderboard(entry) {
    try {
      const command = new PutCommand({
        TableName: this.LEADERBOARD_TABLE,
        Item: {
          id: `${entry.playerName}_${Date.now()}`, // Unique ID
          playerName: entry.playerName,
          score: entry.score,
          totalQuestions: entry.totalQuestions,
          completedAt: entry.completedAt,
          createdAt: new Date().toISOString()
        }
      });
      
      await this.docClient.send(command);
      return { insertedId: entry.id };
    } catch (error) {
      console.error('Error adding to leaderboard:', error);
      throw error;
    }
  }

  async getLeaderboard(limit = 10) {
    try {
      const command = new ScanCommand({
        TableName: this.LEADERBOARD_TABLE
      });
      
      const result = await this.docClient.send(command);
      const items = result.Items || [];
      
      // Sort by score (descending) and completedAt (ascending)
      items.sort((a, b) => {
        if (b.score !== a.score) {
          return b.score - a.score;
        }
        return new Date(a.completedAt) - new Date(b.completedAt);
      });
      
      return items.slice(0, limit);
    } catch (error) {
      console.error('Error getting leaderboard:', error);
      throw error;
    }
  }

  // Admin functions
  async addQuestion(question) {
    try {
      const command = new PutCommand({
        TableName: this.QUESTIONS_TABLE,
        Item: question
      });
      
      await this.docClient.send(command);
      return { insertedId: question.id };
    } catch (error) {
      console.error('Error adding question:', error);
      throw error;
    }
  }

  async updateQuestion(questionId, update) {
    try {
      const updateExpression = [];
      const expressionAttributeNames = {};
      const expressionAttributeValues = {};
      
      Object.keys(update).forEach((key, index) => {
        updateExpression.push(`#attr${index} = :val${index}`);
        expressionAttributeNames[`#attr${index}`] = key;
        expressionAttributeValues[`:val${index}`] = update[key];
      });
      
      const command = new UpdateCommand({
        TableName: this.QUESTIONS_TABLE,
        Key: { id: parseInt(questionId) },
        UpdateExpression: `SET ${updateExpression.join(', ')}`,
        ExpressionAttributeNames: expressionAttributeNames,
        ExpressionAttributeValues: expressionAttributeValues
      });
      
      await this.docClient.send(command);
      return { modifiedCount: 1 };
    } catch (error) {
      console.error('Error updating question:', error);
      throw error;
    }
  }

  async getUsers() {
    try {
      const command = new ScanCommand({
        TableName: this.LEADERBOARD_TABLE
      });
      
      const result = await this.docClient.send(command);
      return result.Items || [];
    } catch (error) {
      console.error('Error getting users:', error);
      throw error;
    }
  }

  async getStats() {
    try {
      const [questionsResult, leaderboardResult, gameSessionsResult] = await Promise.all([
        this.docClient.send(new ScanCommand({ TableName: this.QUESTIONS_TABLE })),
        this.docClient.send(new ScanCommand({ TableName: this.LEADERBOARD_TABLE })),
        this.docClient.send(new ScanCommand({ TableName: this.GAME_SESSIONS_TABLE }))
      ]);

      const questions = questionsResult.Items || [];
      const users = leaderboardResult.Items || [];
      const gameSessions = gameSessionsResult.Items || [];

      const totalQuestions = questions.length;
      const activeQuestions = questions.filter(q => q.active !== false).length;
      const totalUsers = users.length;
      const totalGames = users.length; // Each leaderboard entry is a completed game
      const totalGameSessions = gameSessions.length;

      // Calculate total questions answered
      const totalQuestionsAnswered = gameSessions.reduce((sum, session) => {
        return sum + (session.answers ? Object.keys(session.answers).length : 0);
      }, 0);

      // Calculate unique users who played
      const uniqueUsers = new Set(gameSessions.map(session => session.userId)).size;

      const averageScore = users.length > 0 
        ? users.reduce((sum, user) => sum + user.score, 0) / users.length 
        : 0;

      return {
        totalQuestions,
        activeQuestions,
        totalUsers,
        totalGames,
        totalGameSessions,
        totalQuestionsAnswered,
        uniqueUsers,
        averageScore: Math.round(averageScore * 100) / 100
      };
    } catch (error) {
      console.error('Error getting stats:', error);
      throw error;
    }
  }

  // Initialize questions in DynamoDB (run once)
  async initializeQuestions() {
    try {
      const fs = require('fs');
      const path = require('path');
      const questionsPath = path.join(__dirname, '../data/questions.json');
      const questions = JSON.parse(fs.readFileSync(questionsPath, 'utf8'));
      
      console.log(`Initializing ${questions.length} questions in DynamoDB...`);
      
      for (const question of questions) {
        const command = new PutCommand({
          TableName: this.QUESTIONS_TABLE,
          Item: {
            id: question.id,
            question: question.question,
            options: question.options,
            answer: question.answer,
            active: true
          }
        });
        
        await this.docClient.send(command);
      }
      
      console.log('Questions initialized successfully');
    } catch (error) {
      console.error('Error initializing questions:', error);
      throw error;
    }
  }

  // Load questions from JSON file (admin function)
  async loadQuestionsFromFile() {
    try {
      const fs = require('fs');
      const path = require('path');
      const questionsPath = path.join(__dirname, '../data/questions.json');
      const questions = JSON.parse(fs.readFileSync(questionsPath, 'utf8'));
      
      console.log(`Loading ${questions.length} questions from JSON file...`);
      
      for (const question of questions) {
        const command = new PutCommand({
          TableName: this.QUESTIONS_TABLE,
          Item: {
            id: question.id,
            question: question.question,
            options: question.options,
            answer: question.answer,
            active: true
          }
        });
        
        await this.docClient.send(command);
      }
      
      console.log('Questions loaded successfully');
      return questions;
    } catch (error) {
      console.error('Error loading questions:', error);
      throw error;
    }
  }

  // Clear all questions
  async clearAllQuestions() {
    try {
      const scanCommand = new ScanCommand({
        TableName: this.QUESTIONS_TABLE,
        ProjectionExpression: 'id'
      });
      
      const result = await this.docClient.send(scanCommand);
      const questions = result.Items || [];
      
      console.log(`Clearing ${questions.length} questions...`);
      
      for (const question of questions) {
        const deleteCommand = new DeleteCommand({
          TableName: this.QUESTIONS_TABLE,
          Key: { id: question.id }
        });
        
        await this.docClient.send(deleteCommand);
      }
      
      console.log('All questions cleared successfully');
    } catch (error) {
      console.error('Error clearing questions:', error);
      throw error;
    }
  }

  // Load questions from data array
  async loadQuestionsFromData(questions) {
    try {
      console.log(`Loading ${questions.length} questions from data...`);
      
      for (const question of questions) {
        const command = new PutCommand({
          TableName: this.QUESTIONS_TABLE,
          Item: {
            id: question.id,
            question: question.question,
            options: question.options,
            answer: question.answer,
            active: true
          }
        });
        
        await this.docClient.send(command);
      }
      
      console.log('Questions loaded from data successfully');
      return questions;
    } catch (error) {
      console.error('Error loading questions from data:', error);
      throw error;
    }
  }

  // Clear leaderboard
  async clearLeaderboard() {
    try {
      const scanCommand = new ScanCommand({
        TableName: this.LEADERBOARD_TABLE,
        ProjectionExpression: 'id'
      });
      
      const result = await this.docClient.send(scanCommand);
      const users = result.Items || [];
      
      console.log(`Clearing ${users.length} leaderboard entries...`);
      
      for (const user of users) {
        const deleteCommand = new DeleteCommand({
          TableName: this.LEADERBOARD_TABLE,
          Key: { id: user.id }
        });
        
        await this.docClient.send(deleteCommand);
      }
      
      console.log('Leaderboard cleared successfully');
    } catch (error) {
      console.error('Error clearing leaderboard:', error);
      throw error;
    }
  }

  // Delete specific question
  async deleteQuestion(questionId) {
    try {
      const command = new DeleteCommand({
        TableName: this.QUESTIONS_TABLE,
        Key: { id: parseInt(questionId) }
      });
      
      await this.docClient.send(command);
      console.log(`Question ${questionId} deleted successfully`);
    } catch (error) {
      console.error('Error deleting question:', error);
      throw error;
    }
  }

  // Add new question
  async addQuestion(questionData) {
    try {
      // Get the next available ID
      const scanCommand = new ScanCommand({
        TableName: this.QUESTIONS_TABLE,
        ProjectionExpression: 'id'
      });
      
      const result = await this.docClient.send(scanCommand);
      const questions = result.Items || [];
      const maxId = questions.length > 0 ? Math.max(...questions.map(q => q.id)) : 0;
      const newId = maxId + 1;
      
      const command = new PutCommand({
        TableName: this.QUESTIONS_TABLE,
        Item: {
          id: newId,
          question: questionData.question,
          options: questionData.options,
          answer: questionData.answer,
          active: true
        }
      });
      
      await this.docClient.send(command);
      console.log(`Question ${newId} added successfully`);
      
      return {
        id: newId,
        question: questionData.question,
        options: questionData.options,
        answer: questionData.answer,
        active: true
      };
    } catch (error) {
      console.error('Error adding question:', error);
      throw error;
    }
  }

  // Delete user
  async deleteUser(userId) {
    try {
      const command = new DeleteCommand({
        TableName: this.LEADERBOARD_TABLE,
        Key: { id: userId }
      });
      
      await this.docClient.send(command);
      console.log(`User ${userId} deleted successfully`);
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  }

  // Clear game sessions
  async clearGameSessions() {
    try {
      const scanCommand = new ScanCommand({
        TableName: this.GAME_SESSIONS_TABLE,
        ProjectionExpression: 'id'
      });
      
      const result = await this.docClient.send(scanCommand);
      const sessions = result.Items || [];
      
      console.log(`Clearing ${sessions.length} game sessions...`);
      
      for (const session of sessions) {
        const deleteCommand = new DeleteCommand({
          TableName: this.GAME_SESSIONS_TABLE,
          Key: { id: session.id }
        });
        
        await this.docClient.send(deleteCommand);
      }
      
      console.log('Game sessions cleared successfully');
    } catch (error) {
      console.error('Error clearing game sessions:', error);
      throw error;
    }
  }
}

module.exports = new Database();