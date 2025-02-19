import styled from 'styled-components';

export const HeroSection = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: ${(props) => `url(${props.bannerUrl})`};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  overflow: hidden;
`;

export const HeroText = styled.h1`
  position: relative;
  z-index: 2;
  font-size: clamp(1.2rem, 6vw, 2rem);
  font-family: 'Montserrat', cursive;
  color: ${(props) => props.theme.color.white};
  text-align: center;
  padding: 10px;
  border-radius: 8px;
  background-color: ${(props) => props.theme.color.darkGray};
`;

export const PersonalContainer = styled.div`
  background: ${(props) => props.theme.color.beige};
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  padding: 20px;
  width: 80%;
  max-width: 1200px;
  margin: auto;
  margin-top: 40px;
  text-align: center;
  overflow: hidden;
`;

export const ProfileTitle = styled.h2`
  text-align: center;
  font-size: clamp(1.2rem, 5vw, 2rem);
  width: 100%;
  margin-bottom: 15px;
  word-break: break-word;
  overflow-wrap: break-word;
`;

export const ProfileGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 20px;
  align-items: center;
  width: 100%;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 10px;
  }
`;

export const ProfileImageContainer = styled.div`
  display: flex;
  justify-content: end;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

export const ProfileImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  max-width: 100%;
  display: block;

  @media (max-width: 768px) {
    width: 90%;
    height: auto;
    max-width: 150px;
    aspect-ratio: 1 / 1;
  }
`;

export const ProfileDetails = styled.div`
  text-align: left;
  font-size: 1.1rem;
  word-break: break-word;
  overflow-wrap: break-word;

  @media (max-width: 768px) {
    text-align: center;
  }
`;

export const ContactHeading = styled.h2`
  text-align: center;
  color: ${(props) => props.theme.color.darkTurquoise};
  font-size: clamp(1.2rem, 5vw, 2rem);
  margin: 20px 0;
`;

export const CenteredButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

export const DividerContainer = styled.div`
  width: 40%;
  min-height: clamp(70px, 8vw, 300px);
  background-image: url('/images/tropical-divider.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  margin: 0 auto;
  margin-bottom: 30px;
  margin-top: 30px;

  @media (max-width: 1158px) {
    width: 50%;
  }

  @media (max-width: 768px) {
    width: 65%;
  }
`;

export const Container = styled.div`
  margin: 20px auto;
  max-width: 1400px;
`;

export const VenueGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }

  @media (max-width: 360px) {
    padding: 16px 0px;
  }
`;
