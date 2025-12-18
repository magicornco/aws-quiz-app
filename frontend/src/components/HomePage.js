import React, { useState } from 'react';
import styled from 'styled-components';
import magicornLogo from '../assets/magicorn-logo.png';
// Cloud Provider Partners
import awsLogo from '../assets/aws-logo.png';
import azureLogo from '../assets/microsoft-azure.png';
import googleLogo from '../assets/google-logo.png';
import ovhLogo from '../assets/ovhcloud-logo.png';
import huaweiLogo from '../assets/huawei-logo.png';
import hetznerLogo from '../assets/hetzner-logo.png';
import digitalOceanLogo from '../assets/dijital-ocean.png';

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
  
  @media (max-width: 1024px) and (orientation: landscape) {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    padding: 15px;
    min-height: 100vh;
  }
  
  @media (max-width: 1024px) and (orientation: portrait) {
    justify-content: flex-start;
    padding: 20px;
  }
`;

const MiddleSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  
  @media (max-width: 1024px) and (orientation: landscape) {
    flex: 0.7;
    margin-right: 15px;
    justify-content: flex-start;
    padding-top: 20px;
  }
  
  @media (max-width: 1024px) and (orientation: portrait) {
    flex: 0.7;
    margin-bottom: 20px;
  }
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
  
  @media (max-width: 1366px) {
    width: 250px;
    height: 250px;
  }
  
  @media (max-width: 1024px) and (orientation: landscape) {
    width: 120px;
    height: 120px;
  }
  
  @media (max-width: 1024px) and (orientation: portrait) {
    width: 180px;
    height: 180px;
  }
  
  @media (max-width: 768px) {
    width: 160px;
    height: 160px;
  }
`;

const Title = styled.h1`
  color: white;
  font-size: 2.5rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 5px;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
  
  @media (max-width: 1366px) {
    font-size: 2.2rem;
  }
  
  @media (max-width: 1024px) and (orientation: landscape) {
    font-size: 1.3rem;
    margin-bottom: 2px;
  }
  
  @media (max-width: 1024px) and (orientation: portrait) {
    font-size: 1.8rem;
  }
  
  @media (max-width: 768px) {
    font-size: 1.6rem;
  }
`;

const Subtitle = styled.h2`
  color: #FFD700;
  font-size: 1.3rem;
  text-align: center;
  margin-bottom: 5px;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
  
  @media (max-width: 1366px) {
    font-size: 1.2rem;
  }
  
  @media (max-width: 1024px) and (orientation: landscape) {
    font-size: 0.8rem;
    margin-bottom: 2px;
  }
  
  @media (max-width: 1024px) and (orientation: portrait) {
    font-size: 1rem;
  }
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const TimeInfo = styled.div`
  color: #64B5F6;
  font-size: 1rem;
  font-weight: 500;
  text-align: center;
  margin-bottom: 10px;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
  
  @media (max-width: 1366px) {
    font-size: 0.95rem;
  }
  
  @media (max-width: 1024px) and (orientation: landscape) {
    font-size: 0.7rem;
    margin-bottom: 3px;
  }
  
  @media (max-width: 1024px) and (orientation: portrait) {
    font-size: 0.85rem;
  }
  
  @media (max-width: 768px) {
    font-size: 0.8rem;
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
  
  @media (max-width: 1366px) {
    max-width: 450px;
    padding: 18px;
  }
  
  @media (max-width: 1024px) and (orientation: landscape) {
    max-width: 280px;
    padding: 10px;
  }
  
  @media (max-width: 1024px) and (orientation: portrait) {
    max-width: 350px;
    padding: 15px;
  }
  
  @media (max-width: 768px) {
    max-width: 320px;
    padding: 12px;
  }
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
  
  @media (max-width: 1366px) {
    padding: 9px 13px;
    font-size: 0.95rem;
  }
  
  @media (max-width: 1024px) {
    padding: 8px 12px;
    font-size: 0.9rem;
  }
  
  @media (max-width: 768px) {
    padding: 7px 10px;
    font-size: 0.85rem;
  }
  
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
  padding: 15px;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(255, 107, 53, 0.3);
  backdrop-filter: blur(10px);
  max-width: 300px;
  width: 100%;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  z-index: 100;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 25px rgba(255, 107, 53, 0.4);
  }
  
  @media (max-width: 1200px) {
    max-width: 280px;
    padding: 12px;
  }
  
  @media (max-width: 1024px) and (orientation: landscape) {
    max-width: 250px;
    padding: 10px;
    top: 15px;
    right: 15px;
  }
  
  @media (max-width: 1024px) and (orientation: portrait) {
    display: none;
  }
  
  @media (max-width: 768px) {
    position: relative;
    top: auto;
    right: auto;
    margin: 15px auto;
    max-width: 100%;
    display: block;
    transform: none;
    
    &:hover {
      transform: none;
    }
  }
  
  @media (max-width: 480px) {
    margin: 10px;
    padding: 12px;
    border-radius: 10px;
  }
`;

const LeaderboardTitle = styled.h3`
  color: white;
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 8px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
  letter-spacing: 0.3px;
  
  @media (max-width: 1200px) {
    font-size: 1.1rem;
  }
  
  @media (max-width: 768px) {
    font-size: 1.15rem;
    margin-bottom: 6px;
  }
  
  @media (max-width: 480px) {
    font-size: 1rem;
    gap: 4px;
  }
`;

const LeaderboardSubtitle = styled.p`
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.85rem;
  font-weight: 500;
  margin-bottom: 12px;
  text-align: center;
  text-shadow: 0 1px 2px rgba(0,0,0,0.3);
  letter-spacing: 0.2px;
  
  @media (max-width: 1200px) {
    font-size: 0.8rem;
    margin-bottom: 10px;
  }
  
  @media (max-width: 768px) {
    font-size: 0.85rem;
    margin-bottom: 8px;
  }
  
  @media (max-width: 480px) {
    font-size: 0.75rem;
    margin-bottom: 6px;
  }
`;

const LeaderboardList = styled.div`
  max-height: 300px;
  overflow-y: auto;
  padding-right: 3px;
  
  &::-webkit-scrollbar {
    width: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 2px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 2px;
    transition: background 0.3s ease;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.5);
  }
  
  @media (max-width: 768px) {
    max-height: 250px;
  }
  
  @media (max-width: 480px) {
    max-height: 200px;
  }
`;

const LeaderboardItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  margin: 4px 0;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateX(3px);
  }
  
  &:last-child {
    margin-bottom: 0;
  }
  
  @media (max-width: 768px) {
    padding: 6px 10px;
    margin: 3px 0;
    
    &:hover {
      transform: translateX(2px);
    }
  }
  
  @media (max-width: 480px) {
    padding: 5px 8px;
    margin: 2px 0;
    border-radius: 6px;
    
    &:hover {
      transform: translateX(1px);
    }
  }
`;

const PlayerName = styled.span`
  font-weight: 600;
  color: white;
  font-size: 0.9rem;
  text-shadow: 0 1px 2px rgba(0,0,0,0.3);
  letter-spacing: 0.2px;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
  position: relative;
  transition: all 0.2s ease;
  
  &:hover {
    color: #FFD700;
    transform: scale(1.02);
  }
  
  @media (max-width: 768px) {
    font-size: 0.85rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const PlayerScore = styled.span`
  color: #FFFFFF;
  font-weight: 700;
  font-size: 0.85rem;
  text-shadow: 0 1px 2px rgba(0,0,0,0.3);
  background: rgba(255, 255, 255, 0.2);
  padding: 3px 8px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: all 0.2s ease;
  white-space: nowrap;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
  
  @media (max-width: 768px) {
    font-size: 0.8rem;
    padding: 2px 6px;
  }
  
  @media (max-width: 480px) {
    font-size: 0.75rem;
    padding: 2px 5px;
    border-radius: 8px;
  }
`;

const TimeScore = styled.span`
  color: #FFD700;
  font-weight: 600;
  font-size: 0.75rem;
  text-shadow: 0 1px 2px rgba(0,0,0,0.3);
  background: rgba(255, 215, 0, 0.2);
  padding: 2px 6px;
  border-radius: 8px;
  border: 1px solid rgba(255, 215, 0, 0.3);
  margin-left: 4px;
  display: inline-block;
  transition: all 0.2s ease;
  white-space: nowrap;
  
  &:hover {
    background: rgba(255, 215, 0, 0.3);
  }
  
  @media (max-width: 768px) {
    font-size: 0.7rem;
    padding: 1px 4px;
    margin-left: 3px;
  }
  
  @media (max-width: 480px) {
    font-size: 0.65rem;
    padding: 1px 3px;
    border-radius: 6px;
  }
`;

const RankIcon = styled.span`
  margin-right: 6px;
  font-size: 1rem;
  filter: drop-shadow(0 1px 2px rgba(0,0,0,0.3));
  transition: all 0.2s ease;
  
  &:hover {
    transform: scale(1.05);
  }
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
    margin-right: 5px;
  }
  
  @media (max-width: 480px) {
    font-size: 0.8rem;
    margin-right: 4px;
  }
`;

const EmptyLeaderboard = styled.div`
  text-align: center;
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.85rem;
  font-weight: 500;
  padding: 20px 15px;
  text-shadow: 0 1px 2px rgba(0,0,0,0.3);
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  
  @media (max-width: 768px) {
    font-size: 0.8rem;
    padding: 15px 10px;
  }
  
  @media (max-width: 480px) {
    font-size: 0.75rem;
    padding: 12px 8px;
  }
`;

const Tooltip = styled.div`
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.9);
  color: white;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 500;
  white-space: nowrap;
  z-index: 1000;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(5px);
  margin-bottom: 5px;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  
  &::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 4px solid transparent;
    border-top-color: rgba(0, 0, 0, 0.9);
  }
  
  @media (max-width: 768px) {
    font-size: 0.75rem;
    padding: 6px 10px;
  }
  
  @media (max-width: 480px) {
    font-size: 0.7rem;
    padding: 5px 8px;
  }
`;

const TooltipTrigger = styled.div`
  position: relative;
  
  &:hover ${Tooltip} {
    opacity: 1;
    visibility: visible;
  }
`;


const PartnerLogos = styled.div`
  margin-top: auto;
  padding: 60px 0 70px 0;
  width: 100%;
  
  @media (max-width: 1024px) and (orientation: landscape) {
    padding: 20px 0 30px 0;
    margin-top: 10px;
  }
`;

const LogosRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  flex-wrap: nowrap;
  max-width: 100%;
  margin: 0 auto;
  overflow-x: auto;
  padding: 10px 0;
  
  &::-webkit-scrollbar {
    height: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 2px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 2px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.5);
  }
  
  @media (max-width: 1024px) and (orientation: landscape) {
    gap: 8px;
  }
  
  @media (max-width: 1200px) {
    gap: 10px;
  }
  
  @media (max-width: 768px) {
    gap: 8px;
    padding: 8px 0;
  }
  
  @media (max-width: 480px) {
    gap: 6px;
    padding: 5px 0;
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
  width: 180px;
  height: 200px;
  flex-shrink: 0;
  
  @media (max-width: 1024px) and (orientation: landscape) {
    width: 120px;
    height: 140px;
    padding: 3px;
  }
  
  @media (max-width: 1200px) {
    width: 160px;
    height: 180px;
  }
  
  @media (max-width: 768px) {
    width: 100px;
    height: 120px;
  }
  
  @media (max-width: 480px) {
    width: 80px;
    height: 100px;
  }
  
  &:hover {
    transform: translateY(-3px);
  }
`;

const PartnerLogoImage = styled.img`
  height: 120px;
  width: 120px;
  object-fit: contain;
  transition: all 0.3s ease;
  margin-bottom: 8px;
  background: transparent;
  
  @media (max-width: 1200px) {
    height: 110px;
    width: 110px;
  }
  
  @media (max-width: 768px) {
    height: 80px;
    width: 80px;
  }
  
  @media (max-width: 480px) {
    height: 60px;
    width: 60px;
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
  text-align: center;
  
  @media (max-width: 1024px) and (orientation: landscape) {
    font-size: 0.7rem;
  }
  
  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

// Tablet için collapsible leaderboard butonu
const LeaderboardToggle = styled.button`
  display: none;
  position: fixed;
  top: 20px;
  right: 20px;
  background: linear-gradient(135deg, rgba(255, 107, 53, 0.95), rgba(247, 147, 30, 0.95));
  color: white;
  border: none;
  border-radius: 50px;
  padding: 12px 20px;
  font-size: 0.9rem;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(0,0,0,0.3);
  z-index: 1000;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0,0,0,0.4);
  }
  
  @media (max-width: 1024px) and (min-width: 769px) {
    display: block;
  }
  
  @media (max-width: 768px) {
    display: none;
  }
`;

// Tablet için collapsible leaderboard container
const CollapsibleLeaderboard = styled.div`
  display: none;
  position: fixed;
  top: 80px;
  right: 20px;
  width: 300px;
  max-height: 60vh;
  overflow-y: auto;
  background: linear-gradient(135deg, rgba(255, 107, 53, 0.95), rgba(247, 147, 30, 0.95));
  border-radius: 15px;
  padding: 15px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
  z-index: 999;
  transform: ${props => props.$isOpen ? 'translateX(0)' : 'translateX(100%)'};
  transition: transform 0.3s ease;
  
  @media (max-width: 1024px) and (min-width: 769px) {
    display: block;
  }
  
  @media (max-width: 768px) {
    display: none;
  }
`;

function HomePage({ onStartGame, leaderboard = [] }) {
  const [playerName, setPlayerName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);

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
      {/* Desktop Leaderboard */}
      <LeaderboardContainer>
        <LeaderboardTitle>
          🏆 Leaderboard
        </LeaderboardTitle>
        <LeaderboardSubtitle>
          Top Game Champions
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
                  <TooltipTrigger>
                    <PlayerName>{entry.playerName}</PlayerName>
                    <Tooltip>
                      {entry.playerName}
                    </Tooltip>
                  </TooltipTrigger>
                </div>
                <div>
                  <PlayerScore>{entry.score}/{entry.totalQuestions}</PlayerScore>
                  {entry.completionTime && (
                    <TimeScore>{entry.completionTime}s</TimeScore>
                  )}
                </div>
              </LeaderboardItem>
            ))
          )}
        </LeaderboardList>
      </LeaderboardContainer>

      {/* Tablet Collapsible Leaderboard */}
      <LeaderboardToggle onClick={() => setIsLeaderboardOpen(!isLeaderboardOpen)}>
        🏆 Leaderboard
      </LeaderboardToggle>
      
      <CollapsibleLeaderboard $isOpen={isLeaderboardOpen}>
        <LeaderboardTitle>🏆 Leaderboard</LeaderboardTitle>
        <LeaderboardSubtitle>Top Game Champions</LeaderboardSubtitle>
        <LeaderboardList>
          {leaderboard.length === 0 ? (
            <EmptyLeaderboard>No scores yet. Be the first!</EmptyLeaderboard>
          ) : (
            leaderboard.slice(0, 10).map((entry, index) => (
              <LeaderboardItem key={index}>
                <div>
                  <RankIcon>{getRankIcon(index + 1)}</RankIcon>
                  <TooltipTrigger>
                    <PlayerName>{entry.playerName}</PlayerName>
                    <Tooltip>
                      {entry.playerName}
                    </Tooltip>
                  </TooltipTrigger>
                </div>
                <div>
                  <PlayerScore>{entry.score}/{entry.totalQuestions}</PlayerScore>
                  {entry.completionTime && (
                    <TimeScore>{entry.completionTime}s</TimeScore>
                  )}
                </div>
              </LeaderboardItem>
            ))
          )}
        </LeaderboardList>
      </CollapsibleLeaderboard>

      <MiddleSection>
        <LogoContainer>
          <Logo src={magicornLogo} alt="Magicorn Logo" />
        </LogoContainer>
        
        <Title>AWS Quiz Challenge</Title>
        <Subtitle>AWS Cloud & AI Summit – Ankara</Subtitle>
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
              src={awsLogo} 
              alt="Amazon Web Services"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            />
            <LogoText>Amazon Web Services</LogoText>
          </PartnerLogo>
          <PartnerLogo>
            <PartnerLogoImage 
              src={azureLogo} 
              alt="Microsoft Azure"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            />
            <LogoText>Microsoft Azure</LogoText>
          </PartnerLogo>
          <PartnerLogo>
            <PartnerLogoImage 
              src={googleLogo} 
              alt="Google Cloud"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            />
            <LogoText>Google Cloud</LogoText>
          </PartnerLogo>
          <PartnerLogo>
            <PartnerLogoImage 
              src={ovhLogo} 
              alt="OVHcloud"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            />
            <LogoText>OVHcloud</LogoText>
          </PartnerLogo>
          <PartnerLogo>
            <PartnerLogoImage 
              src={huaweiLogo} 
              alt="Huawei Cloud"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            />
            <LogoText>Huawei Cloud</LogoText>
          </PartnerLogo>
          <PartnerLogo>
            <PartnerLogoImage 
              src={hetznerLogo} 
              alt="Hetzner"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            />
            <LogoText>Hetzner</LogoText>
          </PartnerLogo>
          <PartnerLogo>
            <PartnerLogoImage 
              src={digitalOceanLogo} 
              alt="DigitalOcean"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            />
            <LogoText>DigitalOcean</LogoText>
          </PartnerLogo>
        </LogosRow>
      </PartnerLogos>
    </Container>
  );
}

export default HomePage;
