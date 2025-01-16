import React, { useState, useEffect } from 'react';
import '../../App.css';
import { NavLink } from 'react-router-dom';
import * as B from '../../styles/GlobalStyle';
import * as S from './index.styles';
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

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error loading data. Please try again later.</p>;
  }

  return (
    <div>
      <S.HeroSection>
        <S.HeroText>Welcome to Holidaze</S.HeroText>
      </S.HeroSection>
      <div className="container">
        <S.TopDestinations>Some of our Top Destinations</S.TopDestinations>
        <VenueGrid venues={filteredVenues} />
        <p>Dette er en liten paragraf</p>

        <ul>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              Home Page
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/venues"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              Venues Page
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/venue/:id"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              Single Venue Page
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/profile"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              Profile Page
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              Contact Page
            </NavLink>
          </li>
        </ul>
        <B.OrangeButton>Orange Button</B.OrangeButton>
        <B.BlueButton>Blue Button</B.BlueButton>
        <B.RedButton>Red Button</B.RedButton>
      </div>
    </div>
  );
}

export default Home;
