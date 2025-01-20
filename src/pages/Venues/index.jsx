import React, { useState, useEffect } from 'react';
import '../../App.css';
import * as S from './index.styles';
import * as B from '../../styles/GlobalStyle';
import useAPI from '../../hooks/useAPI';
import SearchBar from '../../components/SearchBar';
import VenueGrid from '../../components/VenueGrid';

function Venues() {
  const venuesPerPage = 20;
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredVenues, setFilteredVenues] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const { data: allVenues, isLoading, isError } = useAPI(
    'https://v2.api.noroff.dev/holidaze/venues',
    'created:desc'
  );

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
  const currentVenues = filteredVenues.slice(startIndex, startIndex + venuesPerPage);

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

  const navigationButtons = (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: '20px',
      }}
    >
      <B.BlueButton
        onClick={() => handleNavigation('previous')}
        disabled={currentPage === 1}
      >
        Previous
      </B.BlueButton>
      <span style={{ margin: '0 15px', alignSelf: 'center' }}>
        Page {currentPage} of {totalPages}
      </span>
      <B.BlueButton
        onClick={() => handleNavigation('next')}
        disabled={currentPage === totalPages}
      >
        Next
      </B.BlueButton>
    </div>
  );

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
            <S.LoadingSpinner />
          ) : isError ? (
            <div className="error">
              <p>
                We encountered an error while loading the venues. Please try again later.
              </p>
            </div>
          ) : (
            <>
              {navigationButtons}
              <VenueGrid venues={currentVenues} />
              {navigationButtons} 
            </>
          )}
        </div>
      </S.VenuesContainer>
    </div>
  );
}

export default Venues;




