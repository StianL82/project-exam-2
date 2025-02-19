import React from 'react';
import PropTypes from 'prop-types';
import * as S from './index.styles';

/**
 * NavigationButtons Component
 *
 * Renders pagination buttons for navigating between pages.
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {number} props.currentPage - The current active page.
 * @param {number} props.totalPages - The total number of pages.
 * @param {Function} props.onNavigate - Function to handle page navigation ('previous' or 'next').
 *
 * @returns {JSX.Element} The rendered navigation buttons.
 */

function NavigationButtons({ currentPage, totalPages, onNavigate }) {
  return (
    <S.NavigationContainer>
      <S.NavigationButton
        onClick={() => onNavigate('previous')}
        disabled={currentPage === 1}
      >
        Previous
      </S.NavigationButton>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <S.NavigationButton
        onClick={() => onNavigate('next')}
        disabled={currentPage === totalPages}
      >
        Next
      </S.NavigationButton>
    </S.NavigationContainer>
  );
}

NavigationButtons.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onNavigate: PropTypes.func.isRequired,
};

export default NavigationButtons;
