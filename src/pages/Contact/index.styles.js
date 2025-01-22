import styled from 'styled-components';

export const HeroSection = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url('/images/contact-hero.png');
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

export const ContactHeading = styled.h2`
  text-align: center;
  color: ${(props) => props.theme.color.darkTurquoise};
  font-size: clamp(1.5rem, 7vw, 2rem);
  margin: 20px 0;
`;

export const dividerContainer = styled.div`
  width: 40%;
  min-height: clamp(70px, 8vw, 300px);
  background-image: url('/images/mountain-divider.png');
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

export const FormBackground = styled.div`
  width: 100%;
  padding: 50px 20px;
  background: linear-gradient(
    to bottom,
    rgba(64, 224, 208, 0.5),
    rgba(255, 255, 102, 0.5)
  );
`;

export const FormContainer = styled.div`
  background-color: #FFFBD4;
  padding: 24px;
  border-radius: 8px;
  border: 1px solid ${(props) => props.theme.color.stroke};
  max-width: 500px;
  margin: 0 auto ;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  h2 {
    text-align: center;
    margin-bottom: 24px;
  }

  form {
    display: flex;
    flex-direction: column;

    label {
      font-family: 'Nunito', Arial, sans-serif;
      margin-top: 12px;
      font-weight: bold;
    }

    input,
    textarea {
      padding: 8px;
      margin-top: 8px;
      border: 1px solid ${(props) => props.theme.color.mediumGray};
      border-radius: 4px;
      font-size: 1rem;
    }

    textarea {
      resize: none;
      height: 100px;
    }

    .alert-danger {
      color: ${(props) => props.theme.color.buttonHoverRed};
      font-size: 0.875rem;
      margin-top: 4px;
    }
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 16px;
`;

export const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;

  img {
    max-width: 100%;
    height: auto; 
    max-height: 300px; 
  }

  @media (max-width: 768px) {
    img {
      max-height: 200px;
    }
  }

  @media (max-width: 480px) {
    img {
      max-height: 150px;
    }
  }
`;

export const ContactEnding = styled.h3`
  text-align: center;
  color: ${(props) => props.theme.color.darkGray};
  font-size: clamp(1rem, 7vw, 1.5rem);
  margin: 20px 0;
  padding: 0px;
`;

