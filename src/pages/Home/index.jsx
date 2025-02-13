import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../App.css';
import * as S from './index.styles';
import * as B from '../../styles/GlobalStyle';
import useAPI from '../../hooks/useAPI';
import VenueGrid from '../../components/VenueGrid';
import { API_HOLIDAZE_URL } from '../../auth/constants';

function Home() {
  const { data, isLoading, isError } = useAPI(`${API_HOLIDAZE_URL}/venues`);

  const [filteredVenues, setFilteredVenues] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (data.length > 0) {
      console.log('Fetched data:', data);

      const ratedFive = data.filter((venue) => venue.rating === 5);

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
        <S.TopDestinations>Our Newest Top-Rated Venues</S.TopDestinations>
        {isLoading ? (
          <B.LoadingSpinner />
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
          <S.DividerContainer />
        </div>
        <div>
          <S.DiscoverVenuesContainer>
            <h2>Find your next dream vacation</h2>
            <p>Book a trip to one of our most beautiful destinations</p>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <B.OrangeButton
                onClick={() => {
                  navigate('/venues');
                  setTimeout(() => window.scrollTo(0, 0), 100);
                }}
              >
                Discover more venues
              </B.OrangeButton>
            </div>
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
              <B.OrangeButton
                onClick={() => {
                  navigate('/contact');
                  setTimeout(() => window.scrollTo(0, 0), 100);
                }}
              >
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
