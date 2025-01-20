import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const LoadingSpinner = styled.div`
  border: 4px solid var(--color-lightGray);
  border-top: 4px solid var(--color-turquoise);
  border-radius: 50%;
  width: 80px;
  height: 80px;
  animation: ${spin} 1s linear infinite;
  margin: 20px auto;
`;

export const HeroSection = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url('/images/venues-hero.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  overflow: hidden;
`;

export const HeroText = styled.h1`
  position: relative;
  z-index: 2;
  font-size: clamp(2rem, 7vw, 3rem);
  color: ${(props) => props.theme.color.white};
  text-align: center;
  padding: 20px;
  border-radius: 8px;
  background-color: rgba(0, 0, 0, 0.01);
`;

export const SearchHeading = styled.h2`
  text-align: center;
  color: ${(props) => props.theme.color.darkTurquoise};
  font-size: clamp(1.5rem, 7vw, 2rem);
  margin: 20px 0;
`;

export const VenuesContainer = styled.div`
  width: 100%;
  padding: 50px 20px;
  background: linear-gradient(
    to bottom,
    rgba(64, 224, 208, 0.5),
    rgba(255, 255, 102, 0.5)
  );
  text-align: center;
  color: ${(props) => props.theme.color.darkGray};

  h2 {
    margin-bottom: 10px;
  }

  p {
    margin-bottom: 20px;
  }
`;

export const SearchBarContainer = styled.div`
  padding: 16px;
`;
