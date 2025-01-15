import styled, { createGlobalStyle } from 'styled-components';

export const ButtonBase = styled.button`
  font-family: 'Montserrat', sans-serif;
  font-weight: bold;
  padding: 10px 20px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
  color: ${(props) => props.theme.color.white}
;

`;

const GlobalStyle = createGlobalStyle`

  html {
    --color-bodyBg: #fffBF8;
    --color-darkGray: #333333;
    --color-white: #fff;
    --color-primary: #0056B3;
    --color-secondary: #ff6347;
    --color-danger: #dc3545;
    --color-lightGray: #E3DDDD;
    --color-mediumGray: #AAAAAA;
    --color-cardBg: #f8f9fa;
    --color-formBg: #f8f1e4;
    --color-orangeButton: #ffc107;
    --color-orangeButtonHover: #e0a800;
    --color-buttonHoverBg: #003F7A;
    --color-linkHover: #0056b3;
    --color-success: #28a745;

    height: 100%;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: 'Open Sans', Arial, sans-serif;
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

  h1, h2, h3, h4, h5, h6 {
    margin: 0;
    padding: 10px 0;
    font-weight: 700;
    font-family: 'Lobster', cursive;
    color: ${(props) => props.theme.color.primaryColor};
  }

  p {
    line-height: 1.6;
    margin: 10px 0;
    font-family: 'Open Sans', sans-serif;
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
    color: ${(props) => props.theme.color.primaryColor};
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

export default GlobalStyle;