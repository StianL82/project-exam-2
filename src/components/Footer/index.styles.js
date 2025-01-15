import styled from 'styled-components';

export const FooterContainer = styled.footer`
  background-color: ${(props) => props.theme.color.beige};
  text-align: center;
  padding: 40px;
  margin-top: 40px;
  left: 0;
  bottom: 0;
  width: 100%;
  border-top: 1px solid ${(props) => props.theme.color.darkGray};
`;

export const FooterText = styled.p`
  margin: 0;
  font-size: 14px;
`;
