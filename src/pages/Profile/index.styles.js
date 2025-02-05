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
  font-size: clamp(2rem, 7vw, 3rem);
  color: ${(props) => props.theme.color.white};
  text-align: center;
  padding: 20px;
  border-radius: 8px;
  background-color: rgba(0, 0, 0, 0.01);
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
  overflow: hidden; /* Sørger for at ingenting går ut av containeren */
`;

export const ProfileTitle = styled.h2`
  text-align: center;
  font-size: clamp(1.2rem, 5vw, 2rem);
  width: 100%;
  margin-bottom: 15px;
  word-break: break-word; /* Sikrer at lange ord brytes */
  overflow-wrap: break-word; /* Hindrer at tekst går utenfor container */
`;

export const ProfileGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 20px;
  align-items: center;
  width: 100%; /* Hindrer grid fra å gå ut av container */

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
  height: 150px; /* 🔥 Sørger for at høyden alltid matcher bredden */
  border-radius: 50%;
  object-fit: cover;
  max-width: 100%; /* Hindrer at bildet blir for stort */
  display: block; /* Hindrer ekstra mellomrom under bildet */

  @media (max-width: 768px) {
    width: 90%;
    height: auto; /* Dette er ok siden max-width sikrer at bildet ikke strekkes */
    max-width: 150px;
    aspect-ratio: 1 / 1; /* 🔥 Bevarer kvadratisk form på små skjermer */
  }
`;


export const ProfileDetails = styled.div`
  text-align: left;
  font-size: 1.1rem;
  word-break: break-word; /* Sikrer at lange ord brytes */
  overflow-wrap: break-word; /* Forhindrer at lange e-poster kuttes */

  @media (max-width: 768px) {
    text-align: center;
  }
`;

export const ContactHeading = styled.h2`
  text-align: center;
  color: ${(props) => props.theme.color.darkTurquoise};
  font-size: clamp(1.5rem, 7vw, 2rem);
  margin: 20px 0;
`;

export const UpdateProfileButton = styled.button`
  background-color: orange;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  border-radius: 5px;
  transition: background-color 0.3s;

  &:hover {
    background-color: darkorange;
  }
`;

export const DividerContainer = styled.div`
  width: 40%;
  min-height: clamp(70px, 8vw, 300px);
  background-image: url('/images/tropical-divider.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  margin: 0 auto;
  margin-bottom: 50px;
  margin-top: 30px;

  @media (max-width: 1158px) {
    width: 50%;
  }

  @media (max-width: 768px) {
    width: 65%;
  }
`;
