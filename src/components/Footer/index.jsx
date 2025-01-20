import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './index.styles';

function Footer() {
  const navigate = useNavigate();
  const handleLogoClick = () => {
    navigate('/', { replace: true });
    window.scrollTo(0, 0);
  };

  return (
    <S.FooterContainer>
      <div className="container">
        <div className="back-to-top">
          <a href="#top" onClick={() => window.scrollTo(0, 0)}>
            <img
              src="/images/icons/back-arrow.svg"
              alt="Back to Top Arrow icon"
            />
            Back to top
          </a>
        </div>
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
