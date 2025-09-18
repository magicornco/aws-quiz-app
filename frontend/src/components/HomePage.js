import React, { useState } from 'react';
import styled from 'styled-components';
import magicornLogo from '../assets/magicorn-logo.png';
import advancedTierLogo from '../assets/aws-adventedtier-delivery-partner.png';
import wellArchitectedLogo from '../assets/aws-well-delivery-partner.png';
import ecsLogo from '../assets/aws-ecs-delivery-partner.png';
import rdsLogo from '../assets/aws-rds-delivery-partner.png';
import eksLogo from '../assets/aws-eks-delivery-partner.png';
import cloudfrontLogo from '../assets/aws-cloudfront-delivery-partner.png';

const Container = styled.div`
  min-height: 100vh;
  background: #020722;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  font-family: 'Arial', sans-serif;
  position: relative;
`;

const MiddleSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const LogoContainer = styled.div`
  margin-bottom: 10px;
  animation: float 3s ease-in-out infinite;
  
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }
`;

const Logo = styled.img`
  width: 300px;
  height: 300px;
  object-fit: contain;
  filter: drop-shadow(0 10px 20px rgba(0,0,0,0.3));
`;

const Title = styled.h1`
  color: white;
  font-size: 2.5rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 5px;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
  
  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const Subtitle = styled.h2`
  color: #FFD700;
  font-size: 1.3rem;
  text-align: center;
  margin-bottom: 5px;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const TimeInfo = styled.div`
  color: #64B5F6;
  font-size: 1rem;
  font-weight: 500;
  text-align: center;
  margin-bottom: 10px;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const FormContainer = styled.div`
  background: rgba(255, 255, 255, 0.95);
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.3);
  backdrop-filter: blur(10px);
  max-width: 500px;
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 15px;
  font-size: 1rem;
  border: 2px solid #ddd;
  border-radius: 10px;
  margin-bottom: 10px;
  box-sizing: border-box;
  transition: border-color 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 10px rgba(102, 126, 234, 0.3);
  }
`;


const InputContainer = styled.div`
  flex: 1;
`;

const Button = styled.button`
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
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const LeaderboardContainer = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  background: linear-gradient(135deg, rgba(255, 107, 53, 0.95), rgba(247, 147, 30, 0.95));
  padding: 25px;
  border-radius: 15px;
  box-shadow: 0 10px 20px rgba(255, 107, 53, 0.3);
  backdrop-filter: blur(10px);
  max-width: 350px;
  width: 100%;
  border: 2px solid rgba(255, 255, 255, 0.2);
  
  @media (max-width: 768px) {
    position: relative;
    top: auto;
    right: auto;
    margin-top: 30px;
    max-width: 100%;
  }
`;

const LeaderboardTitle = styled.h3`
  color: white;
  font-size: 1.4rem;
  font-weight: bold;
  margin-bottom: 8px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
`;

const LeaderboardSubtitle = styled.p`
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 18px;
  text-align: center;
  text-shadow: 0 1px 2px rgba(0,0,0,0.3);
`;

const LeaderboardList = styled.div`
  max-height: 400px;
  overflow-y: auto;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

const LeaderboardItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 15px;
  margin: 5px 0;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateX(5px);
  }
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const PlayerName = styled.span`
  font-weight: bold;
  color: white;
  font-size: 1rem;
  text-shadow: 0 1px 2px rgba(0,0,0,0.3);
`;

const PlayerScore = styled.span`
  color: #FFFFFF;
  font-weight: bold;
  font-size: 1rem;
  text-shadow: 0 1px 2px rgba(0,0,0,0.3);
  background: rgba(255, 255, 255, 0.2);
  padding: 4px 8px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.3);
`;

const RankIcon = styled.span`
  margin-right: 8px;
  font-size: 1rem;
  filter: drop-shadow(0 1px 2px rgba(0,0,0,0.3));
`;

const EmptyLeaderboard = styled.div`
  text-align: center;
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
  padding: 20px 0;
  text-shadow: 0 1px 2px rgba(0,0,0,0.3);
`;


const PartnerLogos = styled.div`
  margin-top: auto;
  padding: 60px 0 70px 0;
  width: 100%;
`;

const LogosRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  flex-wrap: wrap;
  max-width: 1400px;
  margin: 0 auto;
  
  @media (max-width: 1200px) {
    gap: 12px;
  }
  
  @media (max-width: 768px) {
    gap: 10px;
  }
  
  @media (max-width: 480px) {
    gap: 8px;
  }
`;

const PartnerLogo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 5px;
  text-align: center;
  transition: all 0.3s ease;
  width: 220px;
  height: 240px;
  
  @media (max-width: 1200px) {
    width: 200px;
    height: 220px;
  }
  
  @media (max-width: 768px) {
    width: 180px;
    height: 200px;
  }
  
  @media (max-width: 480px) {
    width: 250px;
    height: 270px;
  }
  
  &:hover {
    transform: translateY(-3px);
  }
`;

const PartnerLogoImage = styled.img`
  height: 220px;
  width: 220px;
  object-fit: contain;
  transition: all 0.3s ease;
  margin-bottom: 8px;
  background: transparent;
  
  @media (max-width: 1200px) {
    height: 200px;
    width: 200px;
  }
  
  @media (max-width: 768px) {
    height: 200px;
    width: 200px;
  }
  
  @media (max-width: 480px) {
    height: 180px;
    width: 180px;
  }
  
  &:hover {
    transform: scale(1.1);
  }
`;

const LogoText = styled.span`
  color: white;
  font-size: 0.8rem;
  font-weight: 500;
  text-shadow: 0 1px 2px rgba(0,0,0,0.3);
  display: none;
  line-height: 1.2;
`;

function HomePage({ onStartGame, leaderboard = [] }) {
  const [playerName, setPlayerName] = useState('');
  const [companyName, setCompanyName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (playerName.trim()) {
      const fullName = companyName.trim() 
        ? `${playerName.trim()} (${companyName.trim()})` 
        : playerName.trim();
      onStartGame(fullName);
    }
  };

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1: return '🏆';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return `#${rank}`;
    }
  };

  return (
    <Container>
      <LeaderboardContainer>
        <LeaderboardTitle>
          🏆 Leaderboard
        </LeaderboardTitle>
        <LeaderboardSubtitle>
          Top AWS Quiz Champions
        </LeaderboardSubtitle>
        <LeaderboardList>
          {leaderboard.length === 0 ? (
            <EmptyLeaderboard>
              No scores yet. Be the first!
            </EmptyLeaderboard>
          ) : (
            leaderboard.slice(0, 10).map((entry, index) => (
              <LeaderboardItem key={index}>
                <div>
                  <RankIcon>{getRankIcon(index + 1)}</RankIcon>
                  <PlayerName>{entry.playerName}</PlayerName>
                </div>
                <PlayerScore>{entry.score}/{entry.totalQuestions}</PlayerScore>
              </LeaderboardItem>
            ))
          )}
        </LeaderboardList>
      </LeaderboardContainer>

      <MiddleSection>
        <LogoContainer>
          <Logo src={magicornLogo} alt="Magicorn Logo" />
        </LogoContainer>
        
        <Title>AWS Quiz Challenge</Title>
        <Subtitle>Test Your AWS Knowledge!</Subtitle>
        <TimeInfo>⏱️ 1 minute to answer 5 questions</TimeInfo>
        
        <FormContainer>
          <form onSubmit={handleSubmit}>
            <InputContainer>
              <Input
                type="text"
                placeholder="Enter your name..."
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                maxLength={30}
                required
              />
            </InputContainer>
            <InputContainer>
              <Input
                type="text"
                placeholder="Company name (optional)..."
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                maxLength={30}
              />
            </InputContainer>
            <Button type="submit" disabled={!playerName.trim()}>
              Start Quiz
            </Button>
          </form>
        </FormContainer>
      </MiddleSection>
      
      <PartnerLogos>
        <LogosRow>
          <PartnerLogo>
            <PartnerLogoImage 
              src={advancedTierLogo} 
              alt="Amazon Advanced Tier Services"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            />
            <LogoText>Amazon Advanced Tier Services</LogoText>
          </PartnerLogo>
          <PartnerLogo>
            <PartnerLogoImage 
              src={wellArchitectedLogo} 
              alt="AWS Well-Architected"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            />
            <LogoText>AWS Well-Architected</LogoText>
          </PartnerLogo>
          <PartnerLogo>
            <PartnerLogoImage 
              src={ecsLogo} 
              alt="Amazon ECS Delivery"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            />
            <LogoText>Amazon ECS Delivery</LogoText>
          </PartnerLogo>
          <PartnerLogo>
            <PartnerLogoImage 
              src={rdsLogo} 
              alt="Amazon RDS Service Delivery"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            />
            <LogoText>Amazon RDS Service Delivery</LogoText>
          </PartnerLogo>
          <PartnerLogo>
            <PartnerLogoImage 
              src={eksLogo} 
              alt="Amazon EKS Service Delivery"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            />
            <LogoText>Amazon EKS Service Delivery</LogoText>
          </PartnerLogo>
          <PartnerLogo>
            <PartnerLogoImage 
              src={cloudfrontLogo} 
              alt="Amazon CloudFront Delivery"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            />
            <LogoText>Amazon CloudFront Delivery</LogoText>
          </PartnerLogo>
        </LogosRow>
      </PartnerLogos>
    </Container>
  );
}

export default HomePage;
