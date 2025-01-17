import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';
import * as S from './index.styles';
import * as B from '../../styles/GlobalStyle';
import useAPI from '../../hooks/useAPI';
import VenueGrid from '../../components/VenueGrid';

function Home() {
  const { data, isLoading, isError } = useAPI(
    'https://v2.api.noroff.dev/holidaze/venues'
  );

  const [filteredVenues, setFilteredVenues] = useState([]);

  useEffect(() => {
    if (data) {
      console.log('Fetched data:', data);

      const ratedFive = data.data.filter((venue) => venue.rating === 5);

      const sortedByDate = ratedFive.sort(
        (a, b) => new Date(b.created) - new Date(a.created)
      );

      setFilteredVenues(sortedByDate.slice(0, 4));
    }
  }, [data]);

  return (
    <div>
      <S.HeroSection>
        <S.HeroText>Welcome to Holidaze</S.HeroText>
      </S.HeroSection>
      <div className="container">
        <S.TopDestinations>Some of our Top Destinations</S.TopDestinations>
        {isLoading ? (
          <S.LoadingSpinner />
        ) : isError ? (
          <div className="error">
            <p>
              We encountered an error while loading the venues. Please try again
              later.
            </p>
          </div>
        ) : (
          <VenueGrid venues={filteredVenues} />
        )}
      </div>
      <div>
        <div>
          <S.dividerContainer />
        </div>
        <div>
          <S.DiscoverVenuesContainer>
            <h2>Find your next dream vacation</h2>
            <p>Book a trip to one of our most beautiful destinations</p>
            <B.OrangeButton as={Link} to="/venues">
              Discover more venues
            </B.OrangeButton>
          </S.DiscoverVenuesContainer>
        </div>
        <div className="container">
          <S.FlexSection>
            <S.ImageContainer>
              <img
                src="/images/contact-section.png"
                alt="Beach view of a sunset from one of our tropical destinations"
              />
            </S.ImageContainer>
            <S.TextContainer>
              <h2>Contact Us</h2>
              <p>
                Have any questions? Feel free to reach out to us for more
                information about your dream vacation.
              </p>
              <B.OrangeButton as={Link} to="/contact">
                Contact
              </B.OrangeButton>
            </S.TextContainer>
          </S.FlexSection>
        </div>
      </div>
    </div>
  );
}

export default Home;
