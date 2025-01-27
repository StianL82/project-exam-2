import styled from 'styled-components';

export const HeroSection = styled.div`
  position: relative;
  width: 100%;
  height: 350px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

export const OverlayContainer = styled.div`
  position: relative;
  top: -150px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  padding: 20px;
  width: 90%;
  max-width: 1400px;
  margin: auto;
`;

export const InfoSection = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px;

  .info-left {
    flex: 1;

    .name-stars {
      display: flex;
      align-items: center;
      gap: 10px;

      h1 {
        margin: 0;
        font-size: 2rem;
      }

      .stars {
        display: flex;
        gap: 5px;

        .star-icon {
          width: 20px;
          height: 20px;
        }
      }
    }

    p {
      margin: 5px 0;
    }
  }

  .info-right {
    display: flex;
    align-items: center;

    @media (min-width: 768px) {
      margin-right: 80px;
    }

    @media (max-width: 768px) {
      margin-right: 0;
      justify-content: center;
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    text-align: center;

    .info-left {
      align-items: center;
      text-align: center;

      .name-stars {
        flex-direction: column;
      }
    }

    .info-right {
      margin-top: 10px;
      justify-content: center;
    }
  }
`;

export const AmenitiesSection = styled.div`
  margin-top: 20px;
  text-align: center;

  h2 {
    font-size: 1.5rem;
    margin-bottom: 10px;
  }

  .amenities-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    text-align: center;
    max-width: 720px;
    margin: 0 auto;

    @media (max-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 480px) {
      grid-template-columns: 1fr;
    }

    div {
      display: flex;
      flex-direction: column;
      align-items: center;

      img {
        width: 32px;
        height: 32px;
        margin-bottom: 5px;
      }

      p {
        margin: 0;
      }
    }
  }
`;

export const DetailsSection = styled.div`
  background-color: ${(props) => props.theme.color.white};
  position: relative;
  top: -110px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  padding: 20px;
  width: 90%;
  max-width: 1400px;
  margin: 0px auto;
  margin-bottom: -110px;

  .grid-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  .description-details {
    display: flex;
    flex-direction: column;
    gap: 20px;

    .description {
      text-align: left;

      h3 {
        font-size: 1.5rem;
        margin-bottom: 10px;
      }

      p {
        font-size: 1rem;
        line-height: 1.5;
        margin: 0;
      }
    }

    .details {
      border: 1px solid ${(props) => props.theme.color.stroke};
      background-color: ${(props) => props.theme.color.bodyBg};
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

      h3 {
        font-size: 1.5rem;
        margin-bottom: 10px;
        color: ${(props) => props.theme.color.darkOrange};
      }

      p {
        margin: 5px 0;
        font-size: 1rem;
        line-height: 1.4;
      }
    }
  }

  .carousel {
    display: flex;
    align-items: center;
    justify-content: center;

    .carousel-image {
      width: 100%;
      height: auto;
      border-radius: 8px;
      object-fit: cover;
    }
  }

  h3 {
    font-size: 1.5rem;
    text-align: center;
    margin-top: 20px;
    color: ${(props) => props.theme.color.darkTurquoise};
  }

  .calendar {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;

    p {
      font-size: 1rem;
      color: ${(props) => props.theme.color.darkGray};
    }
  }

  .centered-button {
    display: flex;
    justify-content: center;
    margin: 0 auto;
    padding-top: 20px;
  }
`;

export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;

  p {
    margin-top: 15px;
    font-size: 1rem;
    color: ${(props) => props.theme.color.darkGray};
  }
`;
