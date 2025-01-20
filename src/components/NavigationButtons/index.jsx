import React from 'react';
import PropTypes from 'prop-types';
import * as S from './index.styles';

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


