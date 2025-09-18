import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

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
    console.log(`Making ${config.method?.toUpperCase()} request to ${config.url}`);
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
    console.log(`Response from ${response.config.url}:`, response.data);
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
      throw new Error(error.response?.data?.error || 'Health check failed');
    }
  },
};

export default api;
