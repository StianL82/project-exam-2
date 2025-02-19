import React, { useState, useEffect } from 'react';
import * as S from './index.styles';

/**
 * ScrollToTop Component
 *
 * A button that appears when the user scrolls down a certain distance
 * and allows them to smoothly scroll back to the top of the page.
 *
 * @component
 * @returns {JSX.Element} A scroll-to-top button that becomes visible on scroll.
 */

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 200) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <S.ScrollButton onClick={scrollToTop} isVisible={isVisible}>
      <img
        src={`${process.env.PUBLIC_URL}/images/icons/back-arrow.svg`}
        alt="Back arrow icon"
      />
      <span className="tooltip">Back to Top</span>
    </S.ScrollButton>
  );
};

export default ScrollToTop;
