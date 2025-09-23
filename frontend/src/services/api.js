import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 
  (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
    ? 'http://localhost:5001/api' 
    : `http://${window.location.hostname}:5001/api`);

// Debug logs removed for production

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('Response error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const gameAPI = {
  // Start a new game
  startGame: async (playerName) => {
    try {
      const response = await api.post('/game/start', { playerName });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to start game');
    }
  },

  // Submit an answer
  submitAnswer: async (gameId, answer) => {
    try {
      const response = await api.post('/game/answer', { gameId, answer });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to submit answer');
    }
  },

  // Get game status
  getGameStatus: async (gameId) => {
    try {
      const response = await api.get(`/game/${gameId}/status`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to get game status');
    }
  },

  // Get leaderboard
  getLeaderboard: async () => {
    try {
      const response = await api.get('/leaderboard');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to get leaderboard');
    }
  },

  // Health check
  healthCheck: async () => {
    try {
      const response = await api.get('/health');
      return response.data;
    } catch (error) {
      console.error('Health check error:', error);
      throw new Error(error.response?.data?.error || 'Health check failed');
    }
  },
};

export default api;
