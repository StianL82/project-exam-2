import styled from 'styled-components';

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

export const dividerContainer = styled.div`
  width: 40%;
  min-height: clamp(70px, 8vw, 300px);
  background-image: url('/images/city-divider.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  margin: 0 auto;
  margin-bottom: 70px;
  margin-top: 50px;

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
  border: 1px solid ${(props) => props.theme.color.stroke};

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
  background-color: ${(props) => props.theme.color.lightYellow};
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
