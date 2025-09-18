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

const ResultContainer = styled.div`
  background: rgba(255, 255, 255, 0.95);
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.3);
  backdrop-filter: blur(10px);
  max-width: 600px;
  width: 100%;
  text-align: center;
`;

const Trophy = styled.div`
  font-size: 5rem;
  margin-bottom: 20px;
  animation: bounce 2s infinite;
  
  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
    40% { transform: translateY(-20px); }
    60% { transform: translateY(-10px); }
  }
`;

const Score = styled.h1`
  font-size: 3rem;
  color: #333;
  margin-bottom: 10px;
  font-weight: bold;
`;

const ScoreText = styled.p`
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 30px;
`;

const Prize = styled.div`
  background: linear-gradient(45deg, #FFD700, #FFA500);
  padding: 20px;
  border-radius: 15px;
  margin: 20px 0;
  box-shadow: 0 10px 20px rgba(255, 215, 0, 0.3);
`;

const PrizeTitle = styled.h2`
  color: #8B4513;
  font-size: 1.5rem;
  margin-bottom: 10px;
`;

const PrizeDescription = styled.p`
  color: #8B4513;
  font-size: 1.1rem;
  margin: 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-top: 30px;
  
  @media (max-width: 768px) {
    flex-direction: column;
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
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(0,0,0,0.2);
  }
`;

const PlayAgainButton = styled(Button)`
  background: linear-gradient(45deg, #FF6B35, #F7931E);
  
  &:hover {
    box-shadow: 0 10px 20px rgba(255, 107, 53, 0.4);
  }
`;

const LeaderboardButton = styled(Button)`
  background: linear-gradient(45deg, #667eea, #764ba2);
  
  &:hover {
    box-shadow: 0 10px 20px rgba(102, 126, 234, 0.4);
  }
`;

const ReviewButton = styled(Button)`
  background: linear-gradient(45deg, #28a745, #20c997);
  
  &:hover {
    box-shadow: 0 10px 20px rgba(40, 167, 69, 0.4);
  }
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 20px;
  margin: 30px 0;
`;

const StatItem = styled.div`
  background: rgba(102, 126, 234, 0.1);
  padding: 20px;
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

function ResultPage({ result, onPlayAgain, onViewLeaderboard, onViewReview, hasAnswers }) {
  const getPrize = (score, total) => {
    const percentage = (score / total) * 100;
    
    if (percentage === 100) {
      return {
        emoji: '🏆',
        title: 'Gold Medal',
        description: 'Perfect Score! You are an AWS Expert!'
      };
    } else if (percentage >= 80) {
      return {
        emoji: '🥈',
        title: 'Silver Medal',
        description: 'Excellent! You have great AWS knowledge!'
      };
    } else if (percentage >= 60) {
      return {
        emoji: '🥉',
        title: 'Bronze Medal',
        description: 'Good job! Keep learning AWS!'
      };
    } else if (percentage >= 40) {
      return {
        emoji: '🎖️',
        title: 'Participation Certificate',
        description: 'Nice try! Practice more to improve!'
      };
    } else if (percentage >= 20) {
      return {
        emoji: '📜',
        title: 'Thank You Certificate',
        description: 'Thanks for participating! Keep studying!'
      };
    } else {
      return {
        emoji: '💪',
        title: 'Try Again',
        description: 'Don\'t give up! Practice makes perfect!'
      };
    }
  };

  const prize = getPrize(result.score, result.totalQuestions);

  return (
    <Container>
      <ResultContainer>
        <Trophy>{prize.emoji}</Trophy>
        
        <Score>{result.score}/{result.totalQuestions}</Score>
        <ScoreText>Your Final Score</ScoreText>
        
        <Prize>
          <PrizeTitle>{prize.title}</PrizeTitle>
          <PrizeDescription>{prize.description}</PrizeDescription>
        </Prize>
        
        <StatsContainer>
          <StatItem>
            <StatValue>{result.score}</StatValue>
            <StatLabel>Correct Answers</StatLabel>
          </StatItem>
          <StatItem>
            <StatValue>{result.totalQuestions - result.score}</StatValue>
            <StatLabel>Incorrect Answers</StatLabel>
          </StatItem>
          <StatItem>
            <StatValue>{Math.round((result.score / result.totalQuestions) * 100)}%</StatValue>
            <StatLabel>Success Rate</StatLabel>
          </StatItem>
        </StatsContainer>
        
        <ButtonContainer>
          <PlayAgainButton onClick={onPlayAgain}>
            Play Again
          </PlayAgainButton>
          {hasAnswers && (
            <ReviewButton onClick={onViewReview}>
              📋 View Answers
            </ReviewButton>
          )}
          <LeaderboardButton onClick={onViewLeaderboard}>
            View Leaderboard
          </LeaderboardButton>
        </ButtonContainer>
      </ResultContainer>
    </Container>
  );
}

export default ResultPage;
