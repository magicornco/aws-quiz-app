import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import magicornLogo from '../assets/magicorn-logo.png';
import { playGameStartSound, playCorrectAnswerSound, playWrongAnswerSound, playTimeUpSound, playWarningSound } from '../utils/soundUtils';

const Container = styled.div`
  min-height: 100vh;
  background: ${props => props.$isWarning ? '#ff0000' : '#020722'};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  font-family: 'Arial', sans-serif;
  transition: background-color 0.5s ease;
  animation: ${props => props.$isWarning ? 'flashWarning 0.5s infinite alternate' : 'none'};
  
  @keyframes flashWarning {
    0% { background-color: #ff0000; }
    100% { background-color: #cc0000; }
  }
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
  background: ${props => props.$isWarning ? 'rgba(255, 255, 255, 0.98)' : 'rgba(255, 255, 255, 0.95)'};
  padding: 20px 40px;
  border-radius: 15px;
  margin-bottom: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 800px;
  box-shadow: ${props => props.$isWarning ? '0 10px 20px rgba(255,0,0,0.4)' : '0 10px 20px rgba(0,0,0,0.2)'};
  border: ${props => props.$isWarning ? '2px solid #ff0000' : 'none'};
  transition: all 0.3s ease;
`;

const PlayerInfo = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
`;

const Timer = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${props => props.$timeLeft < 10 ? '#FFFFFF' : props.$timeLeft < 30 ? '#FF6B35' : '#667eea'};
  text-align: center;
  text-shadow: ${props => props.$timeLeft < 10 ? '2px 2px 4px rgba(0,0,0,0.8)' : 'none'};
  animation: ${props => props.$timeLeft < 10 ? 'pulseWarning 0.5s infinite alternate' : 'none'};
  
  @keyframes pulseWarning {
    0% { transform: scale(1); }
    100% { transform: scale(1.1); }
  }
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
  background: ${props => props.$isWarning ? 'rgba(255, 255, 255, 0.98)' : 'rgba(255, 255, 255, 0.95)'};
  padding: 40px;
  border-radius: 20px;
  box-shadow: ${props => props.$isWarning ? '0 20px 40px rgba(255,0,0,0.5)' : '0 20px 40px rgba(0,0,0,0.3)'};
  backdrop-filter: blur(10px);
  max-width: 800px;
  width: 100%;
  border: ${props => props.$isWarning ? '3px solid #ff0000' : 'none'};
  transition: all 0.3s ease;
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
  // Initialize hooks first, before any early returns
  const [timeLeft, setTimeLeft] = useState(gameData?.timeLimit ? gameData.timeLimit / 1000 : 60);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [feedback, setFeedback] = useState(null);
  
  // Warning state for last 10 seconds
  const isWarning = timeLeft <= 10;

  // Add null check for gameData and currentQuestion after hooks
  if (!gameData || !gameData.currentQuestion) {
    return (
      <Container $isWarning={false}>
        <QuizContainer $isWarning={false}>
          <Question>Loading quiz...</Question>
        </QuizContainer>
      </Container>
    );
  }

  useEffect(() => {
    // Play game start sound when quiz begins
    playGameStartSound();
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          playTimeUpSound();
          onTimeUp();
          return 0;
        }
        // Play warning sound when reaching 10 seconds
        if (prev === 10) {
          playWarningSound();
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
    <Container $isWarning={isWarning}>
      <LogoSection>
        <Logo src={magicornLogo} alt="Magicorn Logo" />
      </LogoSection>
      
      <Header $isWarning={isWarning}>
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

      <QuizContainer $isWarning={isWarning}>
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
