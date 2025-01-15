import React from 'react';
import * as S from "./index.styles";

function Footer() {
  return (
    <S.FooterContainer>
      <S.FooterText>&copy; {new Date().getFullYear()} PE2 by Stian Lilleng</S.FooterText>
    </S.FooterContainer>
  );
}

export default Footer;