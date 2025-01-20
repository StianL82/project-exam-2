import styled from 'styled-components';

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
