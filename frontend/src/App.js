import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import HomePage from './components/HomePage';
import QuizPage from './components/QuizPage';
import ResultPage from './components/ResultPage';
import LeaderboardPage from './components/LeaderboardPage';
import QuizReview from './components/QuizReview';
import AdminPanel from './components/AdminPanel';
import { gameAPI } from './services/api';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Arial', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  #root {
    min-height: 100vh;
  }
`;

const AppContainer = styled.div`
  min-height: 100vh;
  transform: scale(0.8);
  transform-origin: top left;
  width: 125%; /* Compensate for scale */
`;

const ErrorMessage = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  background: #ff4757;
  color: white;
  padding: 15px 20px;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0,0,0,0.3);
  z-index: 1000;
  max-width: 400px;
  animation: slideIn 0.3s ease;
  
  @keyframes slideIn {
    from { transform: translateX(100%); }
    to { transform: translateX(0); }
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  margin-left: 10px;
  float: right;
`;

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [gameData, setGameData] = useState(null);
  const [result, setResult] = useState(null);
  const [quizAnswers, setQuizAnswers] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Game states
  const GAME_STATES = {
    HOME: 'home',
    QUIZ: 'quiz',
    RESULT: 'result',
    REVIEW: 'review',
    LEADERBOARD: 'leaderboard'
  };

  useEffect(() => {
    // Check API health on app start
    checkAPIHealth();
    // Load leaderboard on app start
    loadLeaderboard();
  }, []);

  const loadLeaderboard = async () => {
    try {
      const response = await gameAPI.getLeaderboard();
      setLeaderboard(response);
    } catch (error) {
      console.error('Failed to load leaderboard:', error);
    }
  };

  const checkAPIHealth = async () => {
    try {
      await gameAPI.healthCheck();
      console.log('API is healthy');
    } catch (error) {
      console.error('API health check failed:', error);
      setError('Backend API is not available. Please check if the server is running.');
    }
  };

  const showError = (message) => {
    setError(message);
    setTimeout(() => setError(null), 5000);
  };

  const startGame = async (playerName) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await gameAPI.startGame(playerName);
      setGameData({
        ...response,
        currentQuestionIndex: 0,
        score: 0,
        attempts: 3
      });
      setCurrentPage(GAME_STATES.QUIZ);
    } catch (error) {
      showError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const submitAnswer = async (answer) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await gameAPI.submitAnswer(gameData.gameId, answer);
      
      if (response.gameCompleted) {
        setResult({
          score: response.score,
          totalQuestions: response.totalQuestions
        });
        setQuizAnswers(response.answers || []);
        setCurrentPage(GAME_STATES.RESULT);
      } else if (response.timeUp) {
        setResult({
          score: response.score,
          totalQuestions: response.totalQuestions
        });
        setQuizAnswers([]);
        setCurrentPage(GAME_STATES.RESULT);
      } else {
        // Update game data with next question
        console.log('Response:', response);
        console.log('Next question:', response.nextQuestion);
        setGameData(prev => ({
          ...prev,
          currentQuestionIndex: response.currentQuestionIndex !== undefined ? response.currentQuestionIndex : prev.currentQuestionIndex + 1,
          score: response.score,
          currentQuestion: response.nextQuestion
        }));
      }
    } catch (error) {
      showError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleTimeUp = async () => {
    try {
      // Submit time up to backend to get final answers
      const response = await gameAPI.submitAnswer(gameData.gameId, 'TIME_UP');
      setResult({
        score: response.score,
        totalQuestions: response.totalQuestions
      });
      setQuizAnswers(response.answers || []);
      setCurrentPage(GAME_STATES.RESULT);
    } catch (error) {
      // Fallback if API call fails
      setResult({
        score: gameData.score,
        totalQuestions: gameData.totalQuestions
      });
      setQuizAnswers([]);
      setCurrentPage(GAME_STATES.RESULT);
    }
  };

  const playAgain = () => {
    setGameData(null);
    setResult(null);
    setQuizAnswers([]);
    setCurrentPage(GAME_STATES.HOME);
  };

  const viewReview = () => {
    setCurrentPage(GAME_STATES.REVIEW);
  };

  const viewLeaderboard = async () => {
    try {
      setLoading(true);
      setError(null);
      
      await loadLeaderboard();
      setCurrentPage(GAME_STATES.LEADERBOARD);
    } catch (error) {
      showError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const goHome = async () => {
    setCurrentPage(GAME_STATES.HOME);
    await loadLeaderboard();
  };

  // Check for admin panel route
  useEffect(() => {
    if (window.location.pathname === '/panel') {
      setCurrentPage('admin');
    }
  }, []);

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'admin':
        return <AdminPanel />;
        
      case GAME_STATES.HOME:
        return <HomePage onStartGame={startGame} leaderboard={leaderboard} />;
      
      case GAME_STATES.QUIZ:
        return (
          <QuizPage
            gameData={gameData}
            onAnswer={submitAnswer}
            onTimeUp={handleTimeUp}
          />
        );
      
      case GAME_STATES.RESULT:
        return (
          <ResultPage
            result={result}
            onPlayAgain={playAgain}
            onViewLeaderboard={viewLeaderboard}
            onViewReview={viewReview}
            hasAnswers={quizAnswers.length > 0}
          />
        );
      
      case GAME_STATES.REVIEW:
        return (
          <QuizReview
            answers={quizAnswers}
            score={result.score}
            totalQuestions={result.totalQuestions}
            onPlayAgain={playAgain}
            onGoHome={() => setCurrentPage(GAME_STATES.HOME)}
          />
        );
      
      case GAME_STATES.LEADERBOARD:
        return (
          <LeaderboardPage
            leaderboard={leaderboard}
            onPlayAgain={playAgain}
            onGoHome={goHome}
            loading={loading}
          />
        );
      
      default:
        return <HomePage onStartGame={startGame} />;
    }
  };

  return (
    <AppContainer>
      <GlobalStyle />
      
      {error && (
        <ErrorMessage>
          {error}
          <CloseButton onClick={() => setError(null)}>×</CloseButton>
        </ErrorMessage>
      )}
      
      {renderCurrentPage()}
    </AppContainer>
  );
}

export default App;
