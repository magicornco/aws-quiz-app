import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import magicornLogo from '../assets/magicorn-logo.png';

const Container = styled.div`
  min-height: 100vh;
  background: #020722;
  padding: 20px;
  font-family: 'Arial', sans-serif;
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  gap: 30px;
`;

const LoginLogo = styled.img`
  height: 120px;
  width: auto;
  filter: drop-shadow(0 8px 16px rgba(0,0,0,0.3));
  animation: float 3s ease-in-out infinite;
  
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }
`;

const LoginForm = styled.div`
  background: rgba(255, 255, 255, 0.95);
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.3);
  backdrop-filter: blur(10px);
  max-width: 400px;
  width: 100%;
  text-align: center;
`;

const Title = styled.h1`
  color: #333;
  font-size: 2rem;
  margin-bottom: 30px;
  font-weight: bold;
`;

const Logo = styled.img`
  height: 60px;
  width: auto;
  margin-bottom: 20px;
  filter: drop-shadow(0 4px 8px rgba(0,0,0,0.2));
`;

const AdminLogo = styled.img`
  height: 50px;
  width: auto;
  margin-right: 15px;
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
`;

const Input = styled.input`
  width: 100%;
  padding: 15px;
  font-size: 1rem;
  border: 2px solid #ddd;
  border-radius: 10px;
  margin-bottom: 20px;
  box-sizing: border-box;
  transition: border-color 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 10px rgba(102, 126, 234, 0.3);
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 15px;
  font-size: 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const Dashboard = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  color: white;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  backdrop-filter: blur(10px);
`;

const HeaderTitle = styled.div`
  display: flex;
  align-items: center;
  font-size: 2.5rem;
  margin: 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const LogoutButton = styled.button`
  padding: 10px 20px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`;

const StatCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  padding: 25px;
  border-radius: 15px;
  backdrop-filter: blur(10px);
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const StatNumber = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  color: #667eea;
  margin-bottom: 10px;
`;

const StatLabel = styled.div`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
`;

const Section = styled.div`
  background: rgba(255, 255, 255, 0.1);
  padding: 25px;
  border-radius: 15px;
  backdrop-filter: blur(10px);
  margin-bottom: 30px;
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const SectionTitle = styled.h2`
  color: white;
  margin-bottom: 20px;
  font-size: 1.5rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

const ActionButton = styled.button`
  padding: 10px 20px;
  background: ${props => props.danger ? '#e74c3c' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'};
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 200px;
  padding: 15px;
  font-size: 1rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  margin-bottom: 15px;
  resize: vertical;
  box-sizing: border-box;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }
  
  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 10px rgba(102, 126, 234, 0.3);
  }
`;

const QuestionList = styled.div`
  max-height: 400px;
  overflow-y: auto;
`;

const QuestionItem = styled.div`
  background: rgba(255, 255, 255, 0.05);
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 10px;
  border-left: 4px solid ${props => props.active ? '#27ae60' : '#e74c3c'};
`;

const QuestionText = styled.div`
  color: white;
  margin-bottom: 10px;
  font-weight: 500;
`;

const QuestionOptions = styled.div`
  margin: 10px 0;
  padding: 10px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  border-left: 3px solid #667eea;
`;

const OptionLabel = styled.div`
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
  margin-bottom: 5px;
  font-weight: 600;
`;

const OptionText = styled.div`
  color: white;
  margin-bottom: 8px;
  padding-left: 10px;
`;

const CorrectAnswerLabel = styled.div`
  color: #27ae60;
  font-size: 0.9rem;
  margin-bottom: 5px;
  font-weight: 600;
`;

const CorrectAnswerText = styled.div`
  color: #27ae60;
  padding-left: 10px;
  font-weight: 500;
`;

const QuestionMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
`;

const ToggleButton = styled.button`
  padding: 5px 10px;
  background: ${props => props.active ? '#27ae60' : '#e74c3c'};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.8rem;
  
  &:hover {
    opacity: 0.8;
  }
`;

const UserList = styled.div`
  max-height: 300px;
  overflow-y: auto;
`;

const UserItem = styled.div`
  background: rgba(255, 255, 255, 0.05);
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const UserInfo = styled.div`
  color: white;
`;

const UserScore = styled.div`
  color: #667eea;
  font-weight: bold;
`;

const Message = styled.div`
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 20px;
  background: ${props => props.success ? 'rgba(39, 174, 96, 0.2)' : 'rgba(231, 76, 60, 0.2)'};
  color: ${props => props.success ? '#27ae60' : '#e74c3c'};
  border: 1px solid ${props => props.success ? '#27ae60' : '#e74c3c'};
`;

const AdminPanel = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({});
  const [questions, setQuestions] = useState([]);
  const [users, setUsers] = useState([]);
  const [jsonData, setJsonData] = useState('');
  const [message, setMessage] = useState('');
  const [showAddQuestion, setShowAddQuestion] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [newQuestion, setNewQuestion] = useState({
    question: '',
    options: ['', '', '', ''],
    answer: ''
  });
  const [sessionTimeout, setSessionTimeout] = useState(null);

  // Check for existing session on component mount
  useEffect(() => {
    const savedSession = localStorage.getItem('adminSession');
    if (savedSession) {
      try {
        const sessionData = JSON.parse(savedSession);
        const now = new Date().getTime();
        
        // Check if session is still valid (24 hours)
        if (now - sessionData.timestamp < 24 * 60 * 60 * 1000) {
          setUsername(sessionData.username);
          setPassword(sessionData.password);
          setIsLoggedIn(true);
          startSessionTimer();
        } else {
          // Session expired, clear it
          localStorage.removeItem('adminSession');
        }
      } catch (error) {
        console.error('Error parsing session data:', error);
        localStorage.removeItem('adminSession');
      }
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      loadData();
      startSessionTimer();
    }
  }, [isLoggedIn]);

  // Cleanup timeout on component unmount
  useEffect(() => {
    return () => {
      if (sessionTimeout) {
        clearTimeout(sessionTimeout);
      }
    };
  }, [sessionTimeout]);

  const startSessionTimer = () => {
    // Clear existing timeout
    if (sessionTimeout) {
      clearTimeout(sessionTimeout);
    }
    
    // Set new timeout for 24 hours
    const timeout = setTimeout(() => {
      logout();
      showMessage('Session expired. Please login again.', false);
    }, 24 * 60 * 60 * 1000);
    
    setSessionTimeout(timeout);
  };

  const saveSession = (username, password) => {
    const sessionData = {
      username,
      password,
      timestamp: new Date().getTime()
    };
    localStorage.setItem('adminSession', JSON.stringify(sessionData));
  };

  const showMessage = (text, success = true) => {
    setMessage({ text, success });
    setTimeout(() => setMessage(''), 5000);
  };

  const getApiUrl = () => {
    return process.env.REACT_APP_API_URL || 
      (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
        ? 'http://localhost:5001/api' 
        : `http://${window.location.hostname}:5001/api`);
  };

  const login = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch(`${getApiUrl()}/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        setIsLoggedIn(true);
        saveSession(username, password);
        showMessage('Login successful!', true);
      } else {
        showMessage('Invalid credentials', false);
      }
    } catch (error) {
      console.error('Login error:', error);
      showMessage('Login failed', false);
    } finally {
      setLoading(false);
    }
  };

  const loadData = async () => {
    try {
      const authHeader = btoa(`${username}:${password}`);
      
      const [statsRes, questionsRes, usersRes] = await Promise.all([
        fetch(`${getApiUrl()}/admin/stats`, {
          headers: { 'Authorization': `Basic ${authHeader}` },
        }),
        fetch(`${getApiUrl()}/admin/questions`, {
          headers: { 'Authorization': `Basic ${authHeader}` },
        }),
        fetch(`${getApiUrl()}/admin/users`, {
          headers: { 'Authorization': `Basic ${authHeader}` },
        })
      ]);

      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats(statsData);
      }
      if (questionsRes.ok) {
        const questionsData = await questionsRes.json();
        setQuestions(questionsData);
      }
      if (usersRes.ok) {
        const usersData = await usersRes.json();
        setUsers(usersData);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const clearQuestions = async () => {
    if (!window.confirm('Are you sure you want to clear all questions?')) return;
    
    try {
      const response = await fetch('http://localhost:5001/api/admin/questions/clear', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        showMessage('All questions cleared!', true);
        loadData();
      } else {
        showMessage('Failed to clear questions', false);
      }
    } catch (error) {
      console.error('Error clearing questions:', error);
      showMessage('Error clearing questions', false);
    }
  };

  const syncQuestions = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/admin/questions/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const result = await response.json();
        showMessage(`Synced ${result.count} questions!`, true);
        loadData();
      } else {
        showMessage('Failed to sync questions', false);
      }
    } catch (error) {
      console.error('Error syncing questions:', error);
      showMessage('Error syncing questions', false);
    }
  };

  const loadJsonQuestions = async () => {
    try {
      const questionsData = JSON.parse(jsonData);
      
      const response = await fetch('http://localhost:5001/api/admin/questions/load-json', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, questions: questionsData }),
      });

      if (response.ok) {
        const result = await response.json();
        showMessage(`Loaded ${result.count} questions from JSON!`, true);
        setJsonData('');
        loadData();
      } else {
        showMessage('Failed to load questions from JSON', false);
      }
    } catch (error) {
      console.error('Error loading JSON questions:', error);
      showMessage('Invalid JSON format', false);
    }
  };

  const toggleQuestion = async (questionId, currentActive) => {
    try {
      const response = await fetch(`http://localhost:5001/api/admin/questions/${questionId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, active: !currentActive }),
      });

      if (response.ok) {
        showMessage('Question status updated!', true);
        loadData();
      } else {
        showMessage('Failed to update question', false);
      }
    } catch (error) {
      console.error('Error updating question:', error);
      showMessage('Error updating question', false);
    }
  };

  const clearLeaderboard = async () => {
    if (!window.confirm('Are you sure you want to clear the leaderboard?')) return;
    
    try {
      const response = await fetch('http://localhost:5001/api/admin/leaderboard/clear', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        showMessage('Leaderboard cleared!', true);
        loadData();
      } else {
        showMessage('Failed to clear leaderboard', false);
      }
    } catch (error) {
      console.error('Error clearing leaderboard:', error);
      showMessage('Error clearing leaderboard', false);
    }
  };

  const clearGameSessions = async () => {
    if (!window.confirm('Are you sure you want to clear all game sessions? This will reset the "Questions Answered" and "Total Game Sessions" statistics.')) return;
    
    try {
      const response = await fetch('http://localhost:5001/api/admin/game-sessions/clear', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        showMessage('Game sessions cleared!', true);
        loadData();
      } else {
        showMessage('Failed to clear game sessions', false);
      }
    } catch (error) {
      console.error('Error clearing game sessions:', error);
      showMessage('Error clearing game sessions', false);
    }
  };

  const deleteQuestion = async (questionId) => {
    if (!window.confirm('Are you sure you want to delete this question?')) return;
    
    try {
      const response = await fetch(`http://localhost:5001/api/admin/questions/${questionId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        showMessage('Question deleted!', true);
        loadData();
      } else {
        showMessage('Failed to delete question', false);
      }
    } catch (error) {
      console.error('Error deleting question:', error);
      showMessage('Error deleting question', false);
    }
  };

  const deleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    
    try {
      const response = await fetch(`http://localhost:5001/api/admin/users/${userId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        showMessage('User deleted!', true);
        loadData();
      } else {
        showMessage('Failed to delete user', false);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      showMessage('Error deleting user', false);
    }
  };

  const addQuestion = async (e) => {
    e.preventDefault();
    
    if (!newQuestion.question || !newQuestion.answer || newQuestion.options.some(opt => !opt.trim())) {
      showMessage('Please fill in all fields', false);
      return;
    }
    
    try {
      const response = await fetch('http://localhost:5001/api/admin/questions/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, ...newQuestion }),
      });

      if (response.ok) {
        showMessage('Question added successfully!', true);
        setNewQuestion({ question: '', options: ['', '', '', ''], answer: '' });
        setShowAddQuestion(false);
        loadData();
      } else {
        showMessage('Failed to add question', false);
      }
    } catch (error) {
      console.error('Error adding question:', error);
      showMessage('Error adding question', false);
    }
  };

  const updateQuestion = async (e) => {
    e.preventDefault();
    
    if (!editingQuestion.question || !editingQuestion.answer || editingQuestion.options.some(opt => !opt.trim())) {
      showMessage('Please fill in all fields', false);
      return;
    }
    
    try {
      const response = await fetch(`http://localhost:5001/api/admin/questions/${editingQuestion.id}/update`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, ...editingQuestion }),
      });

      if (response.ok) {
        showMessage('Question updated successfully!', true);
        setEditingQuestion(null);
        loadData();
      } else {
        showMessage('Failed to update question', false);
      }
    } catch (error) {
      console.error('Error updating question:', error);
      showMessage('Error updating question', false);
    }
  };

  const startEditingQuestion = (question) => {
    setEditingQuestion({ ...question });
  };

  const cancelEditing = () => {
    setEditingQuestion(null);
    setShowAddQuestion(false);
    setNewQuestion({ question: '', options: ['', '', '', ''], answer: '' });
  };

  const logout = () => {
    // Clear session timeout
    if (sessionTimeout) {
      clearTimeout(sessionTimeout);
      setSessionTimeout(null);
    }
    
    // Clear localStorage
    localStorage.removeItem('adminSession');
    
    // Reset state
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
    setStats({});
    setQuestions([]);
    setUsers([]);
    setJsonData('');
    setMessage('');
    setShowAddQuestion(false);
    setEditingQuestion(null);
    setNewQuestion({
      question: '',
      options: ['', '', '', ''],
      answer: ''
    });
  };

  if (!isLoggedIn) {
    return (
      <Container>
        <LoginContainer>
          <LoginLogo src={magicornLogo} alt="Magicorn Logo" />
          <LoginForm>
            <Title>AWS Quiz Challenge Panel</Title>
            {message && <Message success={message.success}>{message.text}</Message>}
            <form onSubmit={login}>
              <Input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Button type="submit" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
              </Button>
            </form>
          </LoginForm>
        </LoginContainer>
      </Container>
    );
  }

  return (
    <Container>
      <Dashboard>
        <Header>
          <HeaderTitle>
            <AdminLogo src={magicornLogo} alt="Magicorn Logo" />
            AWS Quiz Challenge Panel
          </HeaderTitle>
          <LogoutButton onClick={logout}>Logout</LogoutButton>
        </Header>

        {message && <Message success={message.success}>{message.text}</Message>}

        <StatsGrid>
          <StatCard>
            <StatNumber>{stats.totalQuestions || 0}</StatNumber>
            <StatLabel>Total Questions</StatLabel>
          </StatCard>
          <StatCard>
            <StatNumber>{stats.activeQuestions || 0}</StatNumber>
            <StatLabel>Active Questions</StatLabel>
          </StatCard>
          <StatCard>
            <StatNumber>{stats.uniqueUsers || 0}</StatNumber>
            <StatLabel>Unique Users</StatLabel>
          </StatCard>
          <StatCard>
            <StatNumber>{stats.totalGameSessions || 0}</StatNumber>
            <StatLabel>Total Game Sessions</StatLabel>
          </StatCard>
          <StatCard>
            <StatNumber>{stats.totalQuestionsAnswered || 0}</StatNumber>
            <StatLabel>Questions Answered</StatLabel>
          </StatCard>
          <StatCard>
            <StatNumber>{stats.averageScore || 0}</StatNumber>
            <StatLabel>Average Score</StatLabel>
          </StatCard>
        </StatsGrid>

        <Section>
          <SectionTitle>Statistics Management</SectionTitle>
          <ButtonGroup>
            <ActionButton onClick={clearGameSessions} danger>Clear Game Sessions</ActionButton>
            <ActionButton onClick={clearLeaderboard} danger>Clear Leaderboard</ActionButton>
            <ActionButton onClick={loadData}>Refresh Statistics</ActionButton>
          </ButtonGroup>
        </Section>

        <Section>
          <SectionTitle>Question Management</SectionTitle>
          <ButtonGroup>
            <ActionButton onClick={syncQuestions}>Sync from File</ActionButton>
            <ActionButton onClick={clearQuestions} danger>Clear All Questions</ActionButton>
            <ActionButton onClick={() => setShowAddQuestion(true)}>Add New Question</ActionButton>
            <ActionButton onClick={loadData}>Refresh Data</ActionButton>
          </ButtonGroup>
          
          <TextArea
            placeholder="Paste JSON questions here..."
            value={jsonData}
            onChange={(e) => setJsonData(e.target.value)}
          />
          <ActionButton onClick={loadJsonQuestions} disabled={!jsonData.trim()}>
            Load from JSON
          </ActionButton>
        </Section>

        {showAddQuestion && (
          <Section>
            <SectionTitle>Add New Question</SectionTitle>
            <form onSubmit={addQuestion}>
              <div style={{ marginBottom: '15px' }}>
                <OptionLabel style={{ color: 'white', marginBottom: '5px' }}>Question:</OptionLabel>
                <Input
                  type="text"
                  placeholder="Question text"
                  value={newQuestion.question}
                  onChange={(e) => setNewQuestion({...newQuestion, question: e.target.value})}
                  required
                />
              </div>
              
              {newQuestion.options.map((option, index) => (
                <div key={index} style={{ marginBottom: '15px' }}>
                  <OptionLabel style={{ color: 'white', marginBottom: '5px' }}>Option {index + 1}:</OptionLabel>
                  <Input
                    type="text"
                    placeholder={`Option ${index + 1}`}
                    value={option}
                    onChange={(e) => {
                      const newOptions = [...newQuestion.options];
                      newOptions[index] = e.target.value;
                      setNewQuestion({...newQuestion, options: newOptions});
                    }}
                    required
                  />
                </div>
              ))}
              
              <div style={{ marginBottom: '15px' }}>
                <CorrectAnswerLabel style={{ color: 'white', marginBottom: '5px' }}>Correct Answer:</CorrectAnswerLabel>
                <Input
                  type="text"
                  placeholder="Correct answer"
                  value={newQuestion.answer}
                  onChange={(e) => setNewQuestion({...newQuestion, answer: e.target.value})}
                  required
                />
              </div>
              
              <ButtonGroup>
                <ActionButton type="submit">Add Question</ActionButton>
                <ActionButton type="button" onClick={cancelEditing}>Cancel</ActionButton>
              </ButtonGroup>
            </form>
          </Section>
        )}

        {editingQuestion && (
          <Section>
            <SectionTitle>Edit Question</SectionTitle>
            <form onSubmit={updateQuestion}>
              <div style={{ marginBottom: '15px' }}>
                <OptionLabel style={{ color: 'white', marginBottom: '5px' }}>Question:</OptionLabel>
                <Input
                  type="text"
                  placeholder="Question text"
                  value={editingQuestion.question}
                  onChange={(e) => setEditingQuestion({...editingQuestion, question: e.target.value})}
                  required
                />
              </div>
              
              {editingQuestion.options.map((option, index) => (
                <div key={index} style={{ marginBottom: '15px' }}>
                  <OptionLabel style={{ color: 'white', marginBottom: '5px' }}>Option {index + 1}:</OptionLabel>
                  <Input
                    type="text"
                    placeholder={`Option ${index + 1}`}
                    value={option}
                    onChange={(e) => {
                      const newOptions = [...editingQuestion.options];
                      newOptions[index] = e.target.value;
                      setEditingQuestion({...editingQuestion, options: newOptions});
                    }}
                    required
                  />
                </div>
              ))}
              
              <div style={{ marginBottom: '15px' }}>
                <CorrectAnswerLabel style={{ color: 'white', marginBottom: '5px' }}>Correct Answer:</CorrectAnswerLabel>
                <Input
                  type="text"
                  placeholder="Correct answer"
                  value={editingQuestion.answer}
                  onChange={(e) => setEditingQuestion({...editingQuestion, answer: e.target.value})}
                  required
                />
              </div>
              
              <ButtonGroup>
                <ActionButton type="submit">Update Question</ActionButton>
                <ActionButton type="button" onClick={cancelEditing}>Cancel</ActionButton>
              </ButtonGroup>
            </form>
          </Section>
        )}

        <Section>
          <SectionTitle>Questions ({questions.length})</SectionTitle>
          <QuestionList>
            {questions.map((question) => (
              <QuestionItem key={question.id} active={question.active !== false}>
                <QuestionText>{question.question}</QuestionText>
                <QuestionMeta>
                  <span>ID: {question.id} | Answer: {question.answer}</span>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <ToggleButton
                      active={question.active !== false}
                      onClick={() => toggleQuestion(question.id, question.active !== false)}
                    >
                      {question.active !== false ? 'Active' : 'Inactive'}
                    </ToggleButton>
                    <ActionButton 
                      onClick={() => startEditingQuestion(question)}
                      style={{ padding: '5px 10px', fontSize: '0.8rem' }}
                    >
                      Edit
                    </ActionButton>
                    <ActionButton 
                      onClick={() => deleteQuestion(question.id)}
                      danger
                      style={{ padding: '5px 10px', fontSize: '0.8rem' }}
                    >
                      Delete
                    </ActionButton>
                  </div>
                </QuestionMeta>
              </QuestionItem>
            ))}
          </QuestionList>
        </Section>

        <Section>
          <SectionTitle>Users ({users.length})</SectionTitle>
          <ButtonGroup>
            <ActionButton onClick={clearLeaderboard} danger>Clear Leaderboard</ActionButton>
          </ButtonGroup>
          <UserList>
            {users.map((user, index) => (
              <UserItem key={index}>
                <UserInfo>
                  <div>{user.playerName || user.name || 'Anonymous'}</div>
                  <div style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)' }}>
                    {user.createdAt ? new Date(user.createdAt).toLocaleString() : 
                     user.completedAt ? new Date(user.completedAt).toLocaleString() :
                     user.timestamp ? new Date(user.timestamp).toLocaleString() : 'No date'}
                  </div>
                </UserInfo>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <UserScore>{user.score}/{user.totalQuestions || 5}</UserScore>
                  <ActionButton 
                    onClick={() => deleteUser(user.id)}
                    danger
                    style={{ padding: '5px 10px', fontSize: '0.8rem' }}
                  >
                    Delete
                  </ActionButton>
                </div>
              </UserItem>
            ))}
          </UserList>
        </Section>
      </Dashboard>
    </Container>
  );
};

export default AdminPanel;