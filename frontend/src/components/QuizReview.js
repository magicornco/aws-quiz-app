import React from 'react';
import styled from 'styled-components';

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

const ReviewContainer = styled.div`
  background: rgba(255, 255, 255, 0.95);
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.3);
  backdrop-filter: blur(10px);
  max-width: 800px;
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
`;

const Title = styled.h1`
  color: #333;
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 30px;
`;

const QuestionContainer = styled.div`
  margin-bottom: 30px;
  padding: 20px;
  border-radius: 15px;
  border: 2px solid ${props => props.isCorrect ? '#28a745' : '#dc3545'};
  background: ${props => props.isCorrect ? '#d4edda' : '#f8d7da'};
`;

const QuestionNumber = styled.div`
  font-size: 1.1rem;
  color: #666;
  font-weight: bold;
  margin-bottom: 15px;
`;

const Question = styled.h3`
  font-size: 1.3rem;
  color: #333;
  margin-bottom: 20px;
  line-height: 1.4;
`;

const AnswerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const AnswerRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border-radius: 8px;
  background: ${props => props.isCorrect ? '#d4edda' : props.isUserAnswer ? '#f8d7da' : '#f8f9fa'};
  border: 1px solid ${props => props.isCorrect ? '#28a745' : props.isUserAnswer ? '#dc3545' : '#dee2e6'};
`;

const AnswerLabel = styled.span`
  font-weight: bold;
  color: #333;
  min-width: 80px;
`;

const AnswerText = styled.span`
  color: #333;
  font-size: 1rem;
`;

const StatusIcon = styled.span`
  font-size: 1.2rem;
  margin-left: auto;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-top: 30px;
  flex-wrap: wrap;
  
  @media (max-width: 1024px) {
    gap: 15px;
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 12px;
    align-items: center;
  }
  
  @media (max-width: 480px) {
    gap: 10px;
    padding: 0 10px;
  }
`;

const Button = styled.button`
  padding: 15px 30px;
  font-size: 1.1rem;
  font-weight: bold;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  min-width: 150px;
  flex: 1;
  max-width: 200px;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(0,0,0,0.2);
  }
  
  @media (max-width: 1024px) {
    padding: 12px 25px;
    font-size: 1rem;
    min-width: 140px;
  }
  
  @media (max-width: 768px) {
    padding: 12px 20px;
    font-size: 0.95rem;
    min-width: 200px;
    max-width: 250px;
  }
  
  @media (max-width: 480px) {
    padding: 10px 15px;
    font-size: 0.9rem;
    min-width: 180px;
    max-width: 220px;
  }
`;

const PlayAgainButton = styled(Button)`
  background: linear-gradient(45deg, #FF6B35, #F7931E);
  
  &:hover {
    box-shadow: 0 10px 20px rgba(255, 107, 53, 0.4);
  }
`;

const LeaderboardButton = styled(Button)`
  background: linear-gradient(45deg, #28a745, #20c997);
  
  &:hover {
    box-shadow: 0 10px 20px rgba(40, 167, 69, 0.4);
  }
`;

const HomeButton = styled(Button)`
  background: linear-gradient(45deg, #667eea, #764ba2);
  
  &:hover {
    box-shadow: 0 10px 20px rgba(102, 126, 234, 0.4);
  }
`;

const SummaryContainer = styled.div`
  background: rgba(102, 126, 234, 0.1);
  padding: 20px;
  border-radius: 15px;
  margin-bottom: 30px;
  text-align: center;
`;

const SummaryTitle = styled.h2`
  color: #667eea;
  font-size: 1.5rem;
  margin-bottom: 15px;
`;

const SummaryStats = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

const StatItem = styled.div`
  background: white;
  padding: 15px;
  border-radius: 10px;
  border: 2px solid rgba(102, 126, 234, 0.2);
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: #667eea;
  margin-bottom: 5px;
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

function QuizReview({ answers = [], score, totalQuestions, completionTime, onPlayAgain, onGoHome, onViewLeaderboard }) {
  const correctAnswers = answers.filter(answer => answer.isCorrect).length;
  const incorrectAnswers = totalQuestions - correctAnswers;

  return (
    <Container>
      <ReviewContainer>
        <Title>📋 Quiz Review</Title>
        
        <SummaryContainer>
          <SummaryTitle>Your Performance</SummaryTitle>
          <SummaryStats>
            <StatItem>
              <StatValue>{score}</StatValue>
              <StatLabel>Correct</StatLabel>
            </StatItem>
            <StatItem>
              <StatValue>{incorrectAnswers}</StatValue>
              <StatLabel>Incorrect</StatLabel>
            </StatItem>
            <StatItem>
              <StatValue>{Math.round((score / totalQuestions) * 100)}%</StatValue>
              <StatLabel>Success Rate</StatLabel>
            </StatItem>
            {completionTime && (
              <StatItem>
                <StatValue>{completionTime}s</StatValue>
                <StatLabel>Completion Time</StatLabel>
              </StatItem>
            )}
          </SummaryStats>
        </SummaryContainer>

        {answers.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
            <p>📝 Detailed answers are not available for this quiz session.</p>
            <p>Your final score: <strong>{score}/{totalQuestions}</strong></p>
          </div>
        ) : (
          answers.map((answer, index) => (
            <QuestionContainer key={index} isCorrect={answer.isCorrect}>
              <QuestionNumber>
                Question {answer.questionIndex + 1}
              </QuestionNumber>
              
              <Question>
                {answer.question}
              </Question>
              
              <AnswerContainer>
                <AnswerRow isUserAnswer={!answer.isCorrect}>
                  <AnswerLabel>Your Answer:</AnswerLabel>
                  <AnswerText>{answer.userAnswer}</AnswerText>
                  <StatusIcon>
                    {answer.isCorrect ? '✅' : '❌'}
                  </StatusIcon>
                </AnswerRow>
                
                {!answer.isCorrect && (
                  <AnswerRow isCorrect={true}>
                    <AnswerLabel>Correct Answer:</AnswerLabel>
                    <AnswerText>{answer.correctAnswer}</AnswerText>
                    <StatusIcon>✅</StatusIcon>
                  </AnswerRow>
                )}
              </AnswerContainer>
            </QuestionContainer>
          ))
        )}
        
        <ButtonContainer>
          <PlayAgainButton onClick={onPlayAgain}>
            Play Again
          </PlayAgainButton>
          <LeaderboardButton onClick={onViewLeaderboard}>
            View Leaderboard
          </LeaderboardButton>
          <HomeButton onClick={onGoHome}>
            Go Home
          </HomeButton>
        </ButtonContainer>
      </ReviewContainer>
    </Container>
  );
}

export default QuizReview;

