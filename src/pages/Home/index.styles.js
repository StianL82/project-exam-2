import styled from 'styled-components';

// Hero section container
export const HeroSection = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url('/images/homepage-hero.png');
  background-size: cover; 
  background-position: center;
  background-repeat: no-repeat;
  overflow: hidden;
`;

// Hero text
export const HeroText = styled.h1`
  position: relative;
  z-index: 2;
  font-size: clamp(2rem, 7vw, 3rem);
  color: ${(props) => props.theme.color.darkgray};
  text-align: center;
  padding: 20px;
  border-radius: 8px;
`;

export const TopDestinations = styled.h2`
  text-align: center;
  color: ${(props) => props.theme.color.darkTurquoise};
  font-size: clamp(1.5rem, 7vw, 2rem);
  margin: 20px 0;
`;

export const Paragraph = styled.p`
  font-size: ${(props) => props.theme.fontSizes.medium};
  margin-bottom: ${(props) => props.theme.spacing.medium};
  text-align: center;
`;

export const LoadMoreButton = styled.button`
  margin: 20px auto;
  display: block;
  padding: 10px 20px;
  font-size: 1rem;
  background-color: ${(props) => props.theme.color.primaryColor};
  color: ${(props) => props.theme.color.white};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => props.theme.color.buttonHoverBg};
  }

  &:disabled {
    background-color: ${(props) => props.theme.color.lightGray};
    cursor: not-allowed;
  }
`;
