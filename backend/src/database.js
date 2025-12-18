const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, PutCommand, GetCommand, UpdateCommand, QueryCommand, ScanCommand, DeleteCommand } = require('@aws-sdk/lib-dynamodb');
require('dotenv').config();

class Database {
  constructor() {
    // Validate AWS credentials
    const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
    const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
    const region = process.env.AWS_REGION || 'us-east-1';
    
    if (!accessKeyId || !secretAccessKey) {
      console.error('❌ AWS Credentials Missing!');
      console.error('Required environment variables:');
      console.error('  - AWS_ACCESS_KEY_ID');
      console.error('  - AWS_SECRET_ACCESS_KEY');
      console.error('  - AWS_REGION (optional, default: us-east-1)');
      throw new Error('AWS credentials are required. Please set AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY environment variables.');
    }
    
    // Validate credentials format
    if (accessKeyId.trim() === '' || secretAccessKey.trim() === '') {
      throw new Error('AWS credentials cannot be empty. Please provide valid AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY.');
    }
    
    console.log(`✅ AWS Credentials found for region: ${region}`);
    
    this.client = new DynamoDBClient({
      region: region,
      credentials: {
        accessKeyId: accessKeyId.trim(),
        secretAccessKey: secretAccessKey.trim(),
      },
    });
    
    this.docClient = DynamoDBDocumentClient.from(this.client);
    this.isConnected = false;
    
    // Table names
    this.QUESTIONS_TABLE = process.env.DYNAMODB_QUESTIONS_TABLE || 'aws-quiz-questions';
    this.GAME_SESSIONS_TABLE = process.env.DYNAMODB_GAME_SESSIONS_TABLE || 'aws-quiz-game-sessions';
    this.LEADERBOARD_TABLE = process.env.DYNAMODB_LEADERBOARD_TABLE || 'aws-quiz-leaderboard';
    
    console.log(`📊 DynamoDB Tables: ${this.QUESTIONS_TABLE}, ${this.GAME_SESSIONS_TABLE}, ${this.LEADERBOARD_TABLE}`);
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
          completionTime: entry.completionTime, // Time taken in seconds
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
      
      // Sort by score (descending), then by completion time (ascending - faster is better)
      items.sort((a, b) => {
        if (b.score !== a.score) {
          return b.score - a.score;
        }
        // If scores are equal, sort by completion time (lower time is better)
        const timeA = a.completionTime || 60; // Default to 60 seconds if not set
        const timeB = b.completionTime || 60;
        return timeA - timeB;
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
      
      // Get existing questions to find max ID
      const scanCommand = new ScanCommand({
        TableName: this.QUESTIONS_TABLE,
        ProjectionExpression: 'id'
      });
      
      const existingResult = await this.docClient.send(scanCommand);
      const existingQuestions = existingResult.Items || [];
      const existingIds = new Set(existingQuestions.map(q => q.id));
      const maxId = existingQuestions.length > 0 ? Math.max(...existingQuestions.map(q => q.id)) : 0;
      
      let nextId = maxId + 1;
      let loadedCount = 0;
      let skippedCount = 0;
      const errors = [];
      
      for (const question of questions) {
        try {
          // Validate question structure
          if (!question.question || !question.options || !question.answer) {
            errors.push(`Question missing required fields: ${JSON.stringify(question)}`);
            skippedCount++;
            continue;
          }
          
          if (!Array.isArray(question.options) || question.options.length !== 4) {
            errors.push(`Question ${question.id || 'unknown'}: options must be an array with 4 items`);
            skippedCount++;
            continue;
          }
          
          // Check if ID already exists, if so assign new ID
          let questionId = question.id;
          if (existingIds.has(questionId)) {
            console.log(`ID ${questionId} already exists, assigning new ID: ${nextId}`);
            questionId = nextId;
            nextId++;
          } else {
            existingIds.add(questionId);
            if (questionId > maxId) {
              nextId = questionId + 1;
            }
          }
          
          const command = new PutCommand({
            TableName: this.QUESTIONS_TABLE,
            Item: {
              id: questionId,
              question: question.question.trim(),
              options: question.options.map(opt => opt.trim()),
              answer: question.answer.trim(),
              active: true
            }
          });
          
          await this.docClient.send(command);
          loadedCount++;
        } catch (error) {
          console.error(`Error loading question ${question.id || 'unknown'}:`, error);
          errors.push(`Question ${question.id || 'unknown'}: ${error.message}`);
          skippedCount++;
        }
      }
      
      console.log(`Questions loaded: ${loadedCount} successful, ${skippedCount} skipped`);
      if (errors.length > 0) {
        console.warn('Errors encountered:', errors);
      }
      
      return {
        loaded: loadedCount,
        skipped: skippedCount,
        errors: errors,
        total: questions.length
      };
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

  // Search users in leaderboard
  async searchUsers(query) {
    try {
      const command = new ScanCommand({
        TableName: this.LEADERBOARD_TABLE,
        FilterExpression: 'contains(playerName, :query)',
        ExpressionAttributeValues: {
          ':query': query
        }
      });
      
      const result = await this.docClient.send(command);
      const items = result.Items || [];
      
      // Sort by score (descending), then by completion time (ascending)
      items.sort((a, b) => {
        if (b.score !== a.score) {
          return b.score - a.score;
        }
        const timeA = a.completionTime || 60;
        const timeB = b.completionTime || 60;
        return timeA - timeB;
      });
      
      return items;
    } catch (error) {
      console.error('Error searching users:', error);
      throw error;
    }
  }

  // Get user details with all quiz attempts
  async getUserDetails(playerName) {
    try {
      // Get all leaderboard entries for this user
      const leaderboardCommand = new ScanCommand({
        TableName: this.LEADERBOARD_TABLE,
        FilterExpression: 'playerName = :playerName',
        ExpressionAttributeValues: {
          ':playerName': playerName
        }
      });
      
      const leaderboardResult = await this.docClient.send(leaderboardCommand);
      const leaderboardEntries = leaderboardResult.Items || [];
      
      // Get all game sessions for this user
      const gameSessionsCommand = new ScanCommand({
        TableName: this.GAME_SESSIONS_TABLE,
        FilterExpression: 'playerName = :playerName',
        ExpressionAttributeValues: {
          ':playerName': playerName
        }
      });
      
      const gameSessionsResult = await this.docClient.send(gameSessionsCommand);
      const gameSessions = gameSessionsResult.Items || [];
      
      // Calculate statistics
      const totalAttempts = leaderboardEntries.length;
      const bestScore = Math.max(...leaderboardEntries.map(entry => entry.score), 0);
      const averageScore = totalAttempts > 0 ? 
        leaderboardEntries.reduce((sum, entry) => sum + entry.score, 0) / totalAttempts : 0;
      const bestTime = Math.min(...leaderboardEntries
        .filter(entry => entry.completionTime)
        .map(entry => entry.completionTime), Infinity) || null;
      
      return {
        playerName,
        totalAttempts,
        bestScore,
        averageScore: Math.round(averageScore * 100) / 100,
        bestTime,
        leaderboardEntries: leaderboardEntries.sort((a, b) => 
          new Date(b.completedAt) - new Date(a.completedAt)
        ),
        gameSessions: gameSessions.sort((a, b) => 
          new Date(b.createdAt) - new Date(a.createdAt)
        )
      };
    } catch (error) {
      console.error('Error getting user details:', error);
      throw error;
    }
  }
}

module.exports = new Database();