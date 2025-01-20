import React from 'react';
import HeaderNav from '../Header';
import Footer from '../Footer';
import * as S from './index.styles';

function Layout({ children }) {
  return (
    <S.LayoutContainer id="top">
      <HeaderNav />
      <S.Main>{children}</S.Main>
      <Footer />
    </S.LayoutContainer>
  );
}

export default Layout;
