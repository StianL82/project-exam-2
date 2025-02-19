import styled, { createGlobalStyle, keyframes } from 'styled-components';

export const ButtonBase = styled.button`
  font-family: 'Montserrat', sans-serif;
  font-weight: bold;
  padding: 10px 20px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  margin: 10px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  white-space: normal;
  overflow-wrap: break-word;
  height: auto;
  max-width: fit-content;
  transition:
    background-color 0.3s,
    border 0.3s ease;
`;

// Orange Button
export const OrangeButton = styled(ButtonBase)`
  background: ${(props) => props.theme.color.secondaryColor};
  color: ${(props) => props.theme.color.black};
  &:hover {
    background: ${(props) => props.theme.color.buttonHoverOrange};
  }
`;

// Blue Button
export const BlueButton = styled(ButtonBase)`
  background: ${(props) => props.theme.color.primaryColor};
  &:hover {
    background: ${(props) => props.theme.color.buttonHoverBlue};
    color: ${(props) => props.theme.color.white};
  }
`;

// Red Button
export const RedButton = styled(ButtonBase)`
  background: ${(props) => props.theme.color.dangerColor};
  color: ${(props) => props.theme.color.white};
  &:hover {
    background: ${(props) => props.theme.color.buttonHoverRed};
  }
`;

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const LoadingSpinner = styled.div`
  border: 4px solid ${(props) => props.theme.color.lightGray};
  border-top: 4px solid ${(props) => props.theme.color.turquoise};
  border-radius: 50%;
  width: 80px;
  height: 80px;
  animation: ${spin} 1s linear infinite;
  margin: 20px auto;
`;

const GlobalStyle = createGlobalStyle`

  html {
    --color-bodyBg: #f2f2f2;
    --color-white: #ffffff;
    --color-black: #000000;
    --color-beige: #D9D0BF;
    --color-turquoise: #3CAAB4;
    --color-darkTurquoise: #29757A;
    --color-lightYellow: #FFFBD4;
    --color-lightBlue: #cfe2ff;
    --color-primary: #397EE6;
    --color-secondary: #FF7F3F;
    --color-darkOrange: #BA470D;
    --color-danger: #dc3545;
    --color-lightGray: #E3DDDD;
    --color-mediumGray: #AAAAAA;
    --color-darkGray: #333333;
    --color-buttonHoverOrange: #F06621;
    --color-buttonHoverBlue: #0355A3;
    --color-buttonHoverRed: #B12121;
    --color-success: #318136;
    --color-lightGreen: #e6f4ea;
    --color-darkGreen: #2b542c;
    --color-stroke: #A6A6A6;

    height: 100%;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: 'Nunito', Arial, sans-serif;
    background-color: ${(props) => props.theme.color.bodyBg};
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  #root {
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  main {
    flex: 1;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  h1{
    margin: 0;
    padding: 10px 0;
    font-weight: 700;
    font-family: 'Lobster', cursive;
  }

    h2, h3, h4, h5, h6 {
    margin: 0;
    padding: 10px 0;
    font-weight: 700;
    font-family: 'Montserrat', cursive;
  }

  p {
    line-height: 1.6;
    margin: 10px 0;
    font-family: 'Nunito', sans-serif;
  }

  .sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

  a {
    text-decoration: none;
    color: ${(props) => props.theme.color.black};
    &:hover {
      text-decoration: none;
    }
  }

  .error {
    border: 1px solid ${(props) => props.theme.color.dangerColor};
    color: ${(props) => props.theme.color.dangerColor};
    background: rgba(220, 53, 69, 0.1);
    max-width: 500px;
    margin: 20px auto;
    text-align: center;
    padding: 20px;
    border-radius: 8px;
    font-size: 1rem;
  }

  .accordion .accordion-header {
  padding-bottom: 0;
}

  .accordion .accordion-item {
  border: none;
  background-color: transparent;
}

.accordion .accordion-button {
  background-color: ${(props) => props.theme.color.lightBlue};
  color: ${(props) => props.theme.color.darkGray};
  font-weight: bold;
  border-radius: 5px;
  padding: 20px 15px;
  box-shadow: none;
  margin-bottom: 0;
}

.accordion .accordion-button:not(.collapsed) {
  background-color: ${(props) => props.theme.color.lightBlue};
}

.accordion .accordion-body {
  background-color: ${(props) => props.theme.color.white};
  margin-top: 0;
  border: 1px solid ${(props) => props.theme.color.lightGray};
  border-top: none;
  padding: 15px;
  border-radius: 0 0 5px 5px;
}
`;

export default GlobalStyle;
