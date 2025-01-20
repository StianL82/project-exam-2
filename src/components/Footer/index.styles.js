import styled from 'styled-components';

export const FooterContainer = styled.footer`
  background-color: ${(props) => props.theme.color.beige};
  text-align: center;
  padding: 40px 20px;
  margin-top: 40px;
  width: 100%;
  border-top: 1px solid ${(props) => props.theme.color.darkGray};

  .container {
    max-width: 1400px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }

  .back-to-top {
    align-self: flex-center;
    display: flex;
    align-items: center;
    cursor: pointer;

    a {
      display: flex;
      align-items: center;
      gap: 2px;
      color: ${(props) => props.theme.color.darkGray};
      text-decoration: none;
      font-family: 'Nunito', sans-serif;
      font-size: 16px;
      transition: color 0.3s;

      &:hover {
        font-weight: bold;
      }
    }

    img {
      width: 20px;
      height: 20px;
      transform: rotate(90deg);
    }
  }
`;

export const Logo = styled.img`
  height: auto;
  width: 100px;
  max-width: 100%;
  object-fit: contain;
  margin: 0 auto;
`;

export const FooterText = styled.p`
  margin: 10px 0 0;
  font-size: 14px;
`;
