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

const Header = styled.div`
  text-align: center;
  margin-bottom: 30px;
`;

const Title = styled.h1`
  color: white;
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 10px;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  color: #FFD700;
  font-size: 1.2rem;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
`;

const LeaderboardContainer = styled.div`
  background: rgba(255, 255, 255, 0.95);
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.3);
  backdrop-filter: blur(10px);
  max-width: 800px;
  width: 100%;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
`;

const TableHeader = styled.thead`
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
`;

const TableHeaderCell = styled.th`
  padding: 15px;
  text-align: left;
  font-weight: bold;
  font-size: 1.1rem;
  
  &:first-child {
    border-top-left-radius: 10px;
  }
  
  &:last-child {
    border-top-right-radius: 10px;
  }
`;

const TableBody = styled.tbody``;

const TableRow = styled.tr`
  border-bottom: 1px solid #eee;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #f8f9ff;
  }
  
  &:nth-child(1) {
    background: linear-gradient(45deg, #FFD700, #FFA500);
    color: #8B4513;
    font-weight: bold;
  }
  
  &:nth-child(2) {
    background: linear-gradient(45deg, #C0C0C0, #A8A8A8);
    color: #2F4F4F;
    font-weight: bold;
  }
  
  &:nth-child(3) {
    background: linear-gradient(45deg, #CD7F32, #B8860B);
    color: #8B4513;
    font-weight: bold;
  }
`;

const TableCell = styled.td`
  padding: 15px;
  font-size: 1rem;
`;

const RankCell = styled(TableCell)`
  font-weight: bold;
  text-align: center;
  width: 60px;
`;

const NameCell = styled(TableCell)`
  font-weight: bold;
`;

const ScoreCell = styled(TableCell)`
  text-align: center;
  font-weight: bold;
`;

const DateCell = styled(TableCell)`
  color: #666;
  font-size: 0.9rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
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

const PlayButton = styled(Button)`
  background: linear-gradient(45deg, #FF6B35, #F7931E);
  
  &:hover {
    box-shadow: 0 10px 20px rgba(255, 107, 53, 0.4);
  }
`;

const HomeButton = styled(Button)`
  background: linear-gradient(45deg, #667eea, #764ba2);
  
  &:hover {
    box-shadow: 0 10px 20px rgba(102, 126, 234, 0.4);
  }
`;

const LoadingMessage = styled.div`
  text-align: center;
  font-size: 1.2rem;
  color: #666;
  padding: 40px;
`;

const EmptyMessage = styled.div`
  text-align: center;
  font-size: 1.2rem;
  color: #666;
  padding: 40px;
`;

const TrophyIcon = styled.span`
  margin-right: 10px;
  font-size: 1.2rem;
`;

function LeaderboardPage({ leaderboard, onPlayAgain, onGoHome, loading }) {
  const getRankIcon = (rank) => {
    switch (rank) {
      case 1: return '🏆';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return `#${rank}`;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <Container>
        <LeaderboardContainer>
          <LoadingMessage>Loading leaderboard...</LoadingMessage>
        </LeaderboardContainer>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <Title>🏆 Leaderboard</Title>
        <Subtitle>Top AWS Quiz Champions</Subtitle>
      </Header>
      
      <LeaderboardContainer>
        {leaderboard.length === 0 ? (
          <EmptyMessage>
            No scores yet. Be the first to play and set a record!
          </EmptyMessage>
        ) : (
          <Table>
            <TableHeader>
              <tr>
                <TableHeaderCell>Rank</TableHeaderCell>
                <TableHeaderCell>Player</TableHeaderCell>
                <TableHeaderCell>Score</TableHeaderCell>
                <TableHeaderCell>Date</TableHeaderCell>
              </tr>
            </TableHeader>
            <TableBody>
              {leaderboard.map((entry, index) => (
                <TableRow key={index}>
                  <RankCell>
                    <TrophyIcon>{getRankIcon(index + 1)}</TrophyIcon>
                  </RankCell>
                  <NameCell>{entry.playerName}</NameCell>
                  <ScoreCell>{entry.score}/{entry.totalQuestions}</ScoreCell>
                  <DateCell>{formatDate(entry.completedAt)}</DateCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
        
        <ButtonContainer>
          <PlayButton onClick={onPlayAgain}>
            Play Quiz
          </PlayButton>
          <HomeButton onClick={onGoHome}>
            Go Home
          </HomeButton>
        </ButtonContainer>
      </LeaderboardContainer>
    </Container>
  );
}

export default LeaderboardPage;
