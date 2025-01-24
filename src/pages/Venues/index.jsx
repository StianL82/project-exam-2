import React, { useState, useEffect } from 'react';
import '../../App.css';
import * as S from './index.styles';
import * as B from '../../styles/GlobalStyle';
import useAPI from '../../hooks/useAPI';
import SearchBar from '../../components/SearchBar';
import VenueGrid from '../../components/VenueGrid';
import NavigationButtons from '../../components/NavigationButtons';
import { API_HOLIDAZE_URL } from '../../auth/constants';

function Venues() {
  const venuesPerPage = 20;
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredVenues, setFilteredVenues] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const {
    data: allVenues,
    isLoading,
    isError,
  } = useAPI(`${API_HOLIDAZE_URL}/venues`, 'created:desc');

  useEffect(() => {
    if (allVenues) {
      let venues = allVenues;

      if (searchTerm) {
        venues = allVenues.filter((venue) =>
          venue.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      setFilteredVenues(venues);
      setCurrentPage(1);
    }
  }, [allVenues, searchTerm]);

  const startIndex = (currentPage - 1) * venuesPerPage;
  const currentVenues = filteredVenues.slice(
    startIndex,
    startIndex + venuesPerPage
  );

  const totalPages = Math.ceil(filteredVenues.length / venuesPerPage);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleNavigation = (direction) => {
    if (direction === 'previous' && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    } else if (direction === 'next' && currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  return (
    <div>
      <div>
        <S.HeroSection>
          <S.HeroText>Book your dream destination</S.HeroText>
        </S.HeroSection>
      </div>
      <div className="container">
        <S.SearchHeading>Some of our Top Destinations</S.SearchHeading>
        <S.SearchBarContainer>
          <SearchBar onSearch={handleSearch} />
        </S.SearchBarContainer>
      </div>
      <S.VenuesContainer>
        <div className="container">
          {isLoading ? (
            <B.LoadingSpinner />
          ) : isError ? (
            <div className="error">
              <p>
                We encountered an error while loading the venues. Please try
                again later.
              </p>
            </div>
          ) : (
            <>
              <NavigationButtons
                currentPage={currentPage}
                totalPages={totalPages}
                onNavigate={handleNavigation}
              />
              <VenueGrid venues={currentVenues} />
              <NavigationButtons
                currentPage={currentPage}
                totalPages={totalPages}
                onNavigate={handleNavigation}
              />
            </>
          )}
        </div>
      </S.VenuesContainer>
    </div>
  );
}

export default Venues;
