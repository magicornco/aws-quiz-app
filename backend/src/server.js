const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const database = require('./database');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: true, // Tüm origin'lere izin ver
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(bodyParser.json());

// Helper function to shuffle array
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Helper function to get random 5 questions
async function getRandomQuestions() {
  const questions = await database.getQuestions();
  const shuffled = shuffleArray(questions);
  return shuffled.slice(0, 5);
}

// Initialize database connection
async function initializeDatabase() {
  try {
    await database.connect();
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Failed to initialize database:', error);
    process.exit(1);
  }
}

// Admin credentials
const ADMIN_USERNAME = 'magicorn';
const ADMIN_PASSWORD = 'magicorn2025';

// Admin authentication middleware
const authenticateAdmin = (req, res, next) => {
  const { username, password } = req.body;
  
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    req.isAdmin = true;
    next();
  } else {
    res.status(401).json({ error: 'Invalid admin credentials' });
  }
};

// Admin authentication middleware for GET requests (using headers)
const authenticateAdminHeader = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return res.status(401).json({ error: 'Missing or invalid authorization header' });
  }
  
  const base64Credentials = authHeader.split(' ')[1];
  const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
  const [username, password] = credentials.split(':');
  
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    req.isAdmin = true;
    next();
  } else {
    res.status(401).json({ error: 'Invalid admin credentials' });
  }
};

// Routes

// Admin login
app.post('/api/admin/login', authenticateAdmin, (req, res) => {
  res.json({ 
    success: true, 
    message: 'Admin login successful',
    username: ADMIN_USERNAME
  });
});

// Load questions from JSON file
app.post('/api/admin/load-questions', authenticateAdmin, async (req, res) => {
  try {
    const questions = await database.loadQuestionsFromFile();
    res.json({ success: true, message: `Loaded ${questions.length} questions`, count: questions.length });
  } catch (error) {
    console.error('Error loading questions:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Clear all questions
app.delete('/api/admin/questions/clear', authenticateAdmin, async (req, res) => {
  try {
    await database.clearAllQuestions();
    res.json({ success: true, message: 'All questions cleared' });
  } catch (error) {
    console.error('Error clearing questions:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Load questions from JSON data (admin panel)
app.post('/api/admin/questions/load-json', authenticateAdmin, async (req, res) => {
  try {
    const { questions } = req.body;
    if (!questions || !Array.isArray(questions)) {
      return res.status(400).json({ error: 'Invalid questions data' });
    }
    
    const loadedQuestions = await database.loadQuestionsFromData(questions);
    res.json({ success: true, message: `Loaded ${loadedQuestions.length} questions`, count: loadedQuestions.length });
  } catch (error) {
    console.error('Error loading questions from JSON:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Sync questions (reload from file)
app.post('/api/admin/questions/sync', authenticateAdmin, async (req, res) => {
  try {
    await database.clearAllQuestions();
    const questions = await database.loadQuestionsFromFile();
    res.json({ success: true, message: `Synced ${questions.length} questions`, count: questions.length });
  } catch (error) {
    console.error('Error syncing questions:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Clear leaderboard
app.delete('/api/admin/leaderboard/clear', authenticateAdmin, async (req, res) => {
  try {
    await database.clearLeaderboard();
    res.json({ success: true, message: 'Leaderboard cleared' });
  } catch (error) {
    console.error('Error clearing leaderboard:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete specific question
app.delete('/api/admin/questions/:id', authenticateAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    await database.deleteQuestion(id);
    res.json({ success: true, message: 'Question deleted' });
  } catch (error) {
    console.error('Error deleting question:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Add new question
app.post('/api/admin/questions/add', authenticateAdmin, async (req, res) => {
  try {
    const { question, options, answer } = req.body;
    if (!question || !options || !answer) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    const newQuestion = await database.addQuestion({ question, options, answer });
    res.json({ success: true, message: 'Question added', question: newQuestion });
  } catch (error) {
    console.error('Error adding question:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update question
app.put('/api/admin/questions/:id/update', authenticateAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { question, options, answer, active } = req.body;
    
    const updateData = {};
    if (question !== undefined) updateData.question = question;
    if (options !== undefined) updateData.options = options;
    if (answer !== undefined) updateData.answer = answer;
    if (active !== undefined) updateData.active = active;
    
    await database.updateQuestion(id, updateData);
    res.json({ success: true, message: 'Question updated' });
  } catch (error) {
    console.error('Error updating question:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete user
app.delete('/api/admin/users/:id', authenticateAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    await database.deleteUser(id);
    res.json({ success: true, message: 'User deleted' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Clear game sessions
app.delete('/api/admin/game-sessions/clear', authenticateAdmin, async (req, res) => {
  try {
    await database.clearGameSessions();
    res.json({ success: true, message: 'Game sessions cleared' });
  } catch (error) {
    console.error('Error clearing game sessions:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get questions
app.get('/api/questions', async (req, res) => {
  try {
    const questions = await database.getQuestions();
    res.json(questions);
  } catch (error) {
    console.error('Error getting questions:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start new game
app.post('/api/game/start', async (req, res) => {
  try {
    const { playerName } = req.body;
    
    if (!playerName || playerName.trim().length === 0) {
      return res.status(400).json({ error: 'Player name is required' });
    }

    const gameId = uuidv4();
    const gameQuestions = await getRandomQuestions();
    console.log(`Starting game with ${gameQuestions.length} questions`);
    
    const gameSession = {
      id: gameId,
      playerName: playerName.trim(),
      questions: gameQuestions,
      currentQuestionIndex: 0,
      score: 0,
      startTime: Date.now(),
      timeLimit: 1 * 60 * 1000, // 1 minute in milliseconds
      completed: false,
      answers: [] // Store user answers for review
    };

    await database.saveGameSession(gameSession);

    res.json({
      gameId,
      playerName: gameSession.playerName,
      totalQuestions: gameQuestions.length,
      timeLimit: gameSession.timeLimit,
      currentQuestion: gameSession.questions[0]
    });
  } catch (error) {
    console.error('Error starting game:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Submit answer
app.post('/api/game/answer', async (req, res) => {
  try {
    const { gameId, answer } = req.body;

    if (!gameId || !answer) {
      return res.status(400).json({ error: 'Game ID and answer are required' });
    }

    const gameSession = await database.getGameSession(gameId);
    if (!gameSession) {
      return res.status(404).json({ error: 'Game session not found' });
    }

    if (gameSession.completed) {
      return res.status(400).json({ error: 'Game already completed' });
    }

    // Check if time is up
    const elapsedTime = Date.now() - gameSession.startTime;
    if (elapsedTime > gameSession.timeLimit) {
      // Add to leaderboard with current score
      await database.addToLeaderboard({
        playerName: gameSession.playerName,
        score: gameSession.score,
        totalQuestions: gameSession.questions.length,
        completedAt: new Date().toISOString()
      });
      
      await database.updateGameSession(gameId, { completed: true });
      return res.json({
        timeUp: true,
        score: gameSession.score,
        totalQuestions: gameSession.questions.length,
        answers: gameSession.answers || []
      });
    }

    // Handle time up case
    if (answer === 'TIME_UP') {
      // Add to leaderboard with current score
      await database.addToLeaderboard({
        playerName: gameSession.playerName,
        score: gameSession.score,
        totalQuestions: gameSession.questions.length,
        completedAt: new Date().toISOString()
      });
      
      await database.updateGameSession(gameId, { completed: true });
      return res.json({
        timeUp: true,
        score: gameSession.score,
        totalQuestions: gameSession.questions.length,
        answers: gameSession.answers || []
      });
    }

    const currentQuestion = gameSession.questions[gameSession.currentQuestionIndex];
    const isCorrect = answer.toLowerCase().trim() === currentQuestion.answer.toLowerCase().trim();

    // Store the answer for review
    const answerRecord = {
      questionId: currentQuestion.id,
      question: currentQuestion.question,
      userAnswer: answer.trim(),
      correctAnswer: currentQuestion.answer,
      isCorrect: isCorrect,
      questionIndex: gameSession.currentQuestionIndex
    };

    if (isCorrect) {
      const newScore = gameSession.score + 1;
      const newQuestionIndex = gameSession.currentQuestionIndex + 1;
      
      // Check if all questions answered
      console.log(`Current question index: ${gameSession.currentQuestionIndex}, New question index: ${newQuestionIndex}, Total questions: ${gameSession.questions.length}`);
      if (newQuestionIndex >= gameSession.questions.length) {
        console.log('Game completed - all questions answered');
        const updatedAnswers = [...gameSession.answers, answerRecord];
        await database.updateGameSession(gameId, { 
          completed: true, 
          score: newScore,
          currentQuestionIndex: newQuestionIndex,
          answers: updatedAnswers
        });
        
        // Add to leaderboard
        await database.addToLeaderboard({
          playerName: gameSession.playerName,
          score: newScore,
          totalQuestions: gameSession.questions.length,
          completedAt: new Date().toISOString()
        });
        
        return res.json({
          correct: true,
          gameCompleted: true,
          score: newScore,
          totalQuestions: gameSession.questions.length,
          nextQuestion: null,
          answers: updatedAnswers
        });
      }

      // Move to next question
      const updatedAnswers = [...gameSession.answers, answerRecord];
      await database.updateGameSession(gameId, { 
        score: newScore,
        currentQuestionIndex: newQuestionIndex,
        attempts: 3, // Reset attempts for next question
        answers: updatedAnswers
      });

      const nextQuestion = gameSession.questions[newQuestionIndex];
      console.log('Next question:', nextQuestion);
      return res.json({
        correct: true,
        gameCompleted: false,
        score: newScore,
        currentQuestionIndex: newQuestionIndex,
        nextQuestion: {
          id: nextQuestion.id,
          question: nextQuestion.question,
          options: nextQuestion.options
        }
      });
    } else {
      // Wrong answer - move to next question immediately
      const newQuestionIndex = gameSession.currentQuestionIndex + 1;
      
      // Check if all questions answered
      if (newQuestionIndex >= gameSession.questions.length) {
        const updatedAnswers = [...gameSession.answers, answerRecord];
        await database.updateGameSession(gameId, { 
          completed: true,
          currentQuestionIndex: newQuestionIndex,
          answers: updatedAnswers
        });
        
        // Add to leaderboard
        await database.addToLeaderboard({
          playerName: gameSession.playerName,
          score: gameSession.score,
          totalQuestions: gameSession.questions.length,
          completedAt: new Date().toISOString()
        });
        
        return res.json({
          correct: false,
          gameCompleted: true,
          score: gameSession.score,
          totalQuestions: gameSession.questions.length,
          nextQuestion: null,
          answers: updatedAnswers
        });
      }

      const updatedAnswers = [...gameSession.answers, answerRecord];
      await database.updateGameSession(gameId, { 
        currentQuestionIndex: newQuestionIndex,
        answers: updatedAnswers
      });

      const nextQuestion = gameSession.questions[newQuestionIndex];
      return res.json({
        correct: false,
        gameCompleted: false,
        score: gameSession.score,
        currentQuestionIndex: newQuestionIndex,
        nextQuestion: {
          id: nextQuestion.id,
          question: nextQuestion.question,
          options: nextQuestion.options
        }
      });
    }
  } catch (error) {
    console.error('Error submitting answer:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get leaderboard
app.get('/api/leaderboard', async (req, res) => {
  try {
    const leaderboard = await database.getLeaderboard(10);
    res.json(leaderboard);
  } catch (error) {
    console.error('Error getting leaderboard:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get game status
app.get('/api/game/:gameId/status', async (req, res) => {
  try {
    const { gameId } = req.params;
    const gameSession = await database.getGameSession(gameId);
    
    if (!gameSession) {
      return res.status(404).json({ error: 'Game session not found' });
    }

    const elapsedTime = Date.now() - gameSession.startTime;
    const remainingTime = Math.max(0, gameSession.timeLimit - elapsedTime);

    res.json({
      gameId: gameSession.id,
      playerName: gameSession.playerName,
      score: gameSession.score,
      currentQuestionIndex: gameSession.currentQuestionIndex,
      totalQuestions: gameSession.questions.length,
      attempts: gameSession.attempts,
      remainingTime,
      completed: gameSession.completed
    });
  } catch (error) {
    console.error('Error getting game status:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Admin routes
app.post('/api/admin/questions', authenticateAdmin, async (req, res) => {
  try {
    const { question, options, answer } = req.body;
    
    if (!question || !options || !answer) {
      return res.status(400).json({ error: 'Question, options, and answer are required' });
    }

    const newQuestion = {
      id: Date.now(), // Simple ID generation
      question,
      options,
      answer,
      active: true,
      createdAt: new Date().toISOString()
    };

    await database.addQuestion(newQuestion);
    res.json({ success: true, question: newQuestion });
  } catch (error) {
    console.error('Error adding question:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/admin/questions', authenticateAdminHeader, async (req, res) => {
  try {
    const questions = await database.getQuestions();
    res.json(questions);
  } catch (error) {
    console.error('Error getting questions:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/api/admin/questions/:id', authenticateAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { active } = req.body;
    
    await database.updateQuestion(id, { active });
    res.json({ success: true });
  } catch (error) {
    console.error('Error updating question:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/admin/users', authenticateAdminHeader, async (req, res) => {
  try {
    const users = await database.getUsers();
    res.json(users);
  } catch (error) {
    console.error('Error getting users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/admin/stats', authenticateAdminHeader, async (req, res) => {
  try {
    const stats = await database.getStats();
    res.json(stats);
  } catch (error) {
    console.error('Error getting stats:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    database: database.isConnected ? 'Connected' : 'Disconnected'
  });
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('Shutting down gracefully...');
  await database.disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('Shutting down gracefully...');
  await database.disconnect();
  process.exit(0);
});

// Start server
async function startServer() {
  await initializeDatabase();
  
  app.listen(PORT, () => {
    console.log(`AWS Quiz Backend running on port ${PORT}`);
  });
}

startServer().catch(console.error);