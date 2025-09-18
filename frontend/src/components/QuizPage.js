import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import magicornLogo from '../assets/magicorn-logo.png';

const Container = styled.div`
  min-height: 100vh;
  background: #020722;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  font-family: 'Arial', sans-serif;
`;

const LogoSection = styled.div`
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 800px;
`;

const Logo = styled.img`
  height: 120px;
  width: auto;
  
  @media (max-width: 768px) {
    height: 100px;
  }
  
  @media (max-width: 480px) {
    height: 80px;
  }
`;

const Header = styled.div`
  background: rgba(255, 255, 255, 0.95);
  padding: 20px 40px;
  border-radius: 15px;
  margin-bottom: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 800px;
  box-shadow: 0 10px 20px rgba(0,0,0,0.2);
`;

const PlayerInfo = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
`;

const Timer = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${props => props.$timeLeft < 30 ? '#FF6B35' : '#667eea'};
  text-align: center;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 4px;
  margin: 10px 0;
  overflow: hidden;
`;

const Progress = styled.div`
  height: 100%;
  background: linear-gradient(90deg, #FF6B35, #F7931E);
  width: ${props => props.$progress}%;
  transition: width 0.3s ease;
`;

const QuizContainer = styled.div`
  background: rgba(255, 255, 255, 0.95);
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.3);
  backdrop-filter: blur(10px);
  max-width: 800px;
  width: 100%;
`;

const QuestionNumber = styled.div`
  font-size: 1.1rem;
  color: #667eea;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Question = styled.h2`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 30px;
  line-height: 1.4;
  
  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`;

const OptionsContainer = styled.div`
  display: grid;
  gap: 15px;
  margin-bottom: 30px;
`;

const Option = styled.button`
  padding: 15px 20px;
  font-size: 1.1rem;
  border: 2px solid ${props => props.selected ? '#667eea' : '#ddd'};
  border-radius: 10px;
  background: ${props => props.selected ? '#f8f9ff' : 'white'};
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: left;
  
  &:hover {
    border-color: #667eea;
    background: #f8f9ff;
  }
  
  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

const AnswerInput = styled.input`
  width: 100%;
  padding: 15px 20px;
  font-size: 1.1rem;
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

const SubmitButton = styled.button`
  width: 100%;
  padding: 15px;
  font-size: 1.2rem;
  font-weight: bold;
  color: white;
  background: linear-gradient(45deg, #FF6B35, #F7931E);
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(255, 107, 53, 0.4);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;


const Feedback = styled.div`
  padding: 15px;
  border-radius: 10px;
  margin: 20px 0;
  text-align: center;
  font-weight: bold;
  background: ${props => props.correct ? '#d4edda' : '#f8d7da'};
  color: ${props => props.correct ? '#155724' : '#721c24'};
  border: 1px solid ${props => props.correct ? '#c3e6cb' : '#f5c6cb'};
`;

function QuizPage({ gameData, onAnswer, onTimeUp }) {
  // Add null check for gameData and currentQuestion before hooks
  if (!gameData || !gameData.currentQuestion) {
    return (
      <Container>
        <QuizContainer>
          <Question>Loading quiz...</Question>
        </QuizContainer>
      </Container>
    );
  }

  const [timeLeft, setTimeLeft] = useState(gameData.timeLimit / 1000);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onTimeUp]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!currentAnswer.trim()) return;

    onAnswer(currentAnswer.trim());
    setCurrentAnswer('');
    setFeedback(null);
  };

  const handleOptionClick = (option) => {
    setCurrentAnswer(option);
    // Don't auto-submit, let user click submit button
  };

  const progress = ((gameData.currentQuestionIndex + 1) / gameData.totalQuestions) * 100;

  return (
    <Container>
      <LogoSection>
        <Logo src={magicornLogo} alt="Magicorn Logo" />
      </LogoSection>
      
      <Header>
        <PlayerInfo>
          Player: {gameData.playerName}
        </PlayerInfo>
        <Timer $timeLeft={timeLeft}>
          {formatTime(timeLeft)}
        </Timer>
      </Header>

      <ProgressBar>
        <Progress $progress={progress} />
      </ProgressBar>

      <QuizContainer>
        <QuestionNumber>
          Question {gameData.currentQuestionIndex + 1} of {gameData.totalQuestions}
        </QuestionNumber>

        <Question>
          {gameData.currentQuestion.question}
        </Question>

        {gameData.currentQuestion.options ? (
          <OptionsContainer>
            {gameData.currentQuestion.options.map((option, index) => (
              <Option
                key={index}
                selected={currentAnswer === option}
                onClick={() => handleOptionClick(option)}
                disabled={feedback !== null}
              >
                {option}
              </Option>
            ))}
          </OptionsContainer>
        ) : (
          <AnswerInput
            type="text"
            placeholder="Type your answer here..."
            value={currentAnswer}
            onChange={(e) => setCurrentAnswer(e.target.value)}
            disabled={feedback !== null}
          />
        )}

        <SubmitButton
          onClick={handleSubmit}
          disabled={!currentAnswer.trim() || feedback !== null}
        >
          Submit Answer
        </SubmitButton>


        {feedback && (
          <Feedback correct={feedback.correct}>
            {feedback.message}
          </Feedback>
        )}
      </QuizContainer>
    </Container>
  );
}

export default QuizPage;
