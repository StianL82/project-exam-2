import React from 'react';
import HeaderNav from '../Header';
import Footer from '../Footer';
import * as S from './index.styles';

/**
 * Layout Component
 *
 * Wraps the application with a consistent layout structure, including
 * a header, main content area, and footer.
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {React.ReactNode} props.children - The content to be displayed inside the layout.
 * @returns {JSX.Element} The rendered layout component.
 */

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
