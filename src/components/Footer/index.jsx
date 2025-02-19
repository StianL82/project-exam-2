import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './index.styles';

/**
 * Footer Component
 *
 * Displays the site footer with a logo and copyright text.
 * Clicking the logo navigates to the homepage and scrolls to the top.
 *
 * @component
 * @returns {JSX.Element} The rendered footer component.
 */

function Footer() {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/', { replace: true });

    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  return (
    <S.FooterContainer>
      <div className="container">
        <div onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
          <S.Logo src="/images/logo.png" alt="Logo for Holidaze" />
        </div>
        <S.FooterText>
          &copy; {new Date().getFullYear()} PE2 by Stian Lilleng
        </S.FooterText>
      </div>
    </S.FooterContainer>
  );
}

export default Footer;
