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
  background-image: url('/images/homepage-hero.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  overflow: hidden;
`;

export const HeroText = styled.h1`
  position: relative;
  z-index: 2;
  font-size: clamp(2rem, 7vw, 3rem);
  color: ${(props) => props.theme.color.black};
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

export const dividerContainer = styled.div`
  width: 50%;
  min-height: 75px;
  background-image: url('/images/home-divider.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  margin: 0 auto;
  margin-bottom: 50px;
  margin-top: 30px;

  @media (max-width: 1158px) {
    width: 65%;
  }

  @media (max-width: 768px) {
    width: 75%;
  }
`;

export const DiscoverVenuesContainer = styled.div`
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

export const FlexSection = styled.div`
  display: flex;
  width: 100%;
  height: 300px;
  margin: 40px 0;
  margin-top: 60px;
  margin-bottom: 10px;
  border: 1px solid var(--color-stroke);

  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
  }
`;

export const ImageContainer = styled.div`
  flex: 1;
  height: 100%;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const TextContainer = styled.div`
  flex: 1;
  background-color: var(--color-lightYellow);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 20px;

  h2 {
    margin-bottom: 20px;
    font-weight: bold;
  }

  p {
    margin-bottom: 20px;
  }
`;
