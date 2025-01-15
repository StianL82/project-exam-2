import styled from 'styled-components';
import { ButtonBase } from '../../styles/GlobalStyle';

export const OrangeButton = styled(ButtonBase)`
  margin: 10px;
  background: ${(props) => props.theme.color.secondaryColor};
  color: ${(props) => props.theme.color.white};

  &:hover {
    background: ${(props) => props.theme.color.buttonHoverOrange};
  }
`;

export const BlueButton = styled(ButtonBase)`
  margin: 10px;
  background: ${(props) => props.theme.color.primaryColor};
  color: ${(props) => props.theme.color.white};

  &:hover {
    background: ${(props) => props.theme.color.buttonHoverBlue};
  }
`;

export const RedButton = styled(ButtonBase)`
  margin: 10px;
  background: ${(props) => props.theme.color.dangerColor};
  color: ${(props) => props.theme.color.white};

  &:hover {
    background: ${(props) => props.theme.color.buttonHoverRed};
  }
`;
