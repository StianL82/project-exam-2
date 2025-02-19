import styled from 'styled-components';

export const FooterContainer = styled.footer`
  background-color: ${(props) => props.theme.color.beige};
  text-align: center;
  padding: 40px 20px;
  margin-top: 40px;
  border-top: 1px solid ${(props) => props.theme.color.darkGray};

  .container {
    max-width: 1400px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
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
