import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../../App.css';
import * as S from './index.styles';
import * as B from '../../styles/GlobalStyle';
import { API_HOLIDAZE_URL } from '../../auth/constants';
import { useAuth } from '../../auth/AuthContext';
import Login from '../../components/Login';
import Register from '../../components/Register';

function Venue() {
  const { id } = useParams();
  const { isLoggedIn } = useAuth();
  const [venueData, setVenueData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    requestAnimationFrame(() => {
      window.scrollTo(0, 0);
    });
  }, []);

  const openLogin = (prefillEmail = '') => {
    setEmail(prefillEmail);
    setShowLogin(true);
    setShowRegister(false);
  };

  const openRegister = () => {
    setShowRegister(true);
    setShowLogin(false);
  };

  const closeModal = () => {
    setShowLogin(false);
    setShowRegister(false);
    setEmail('');
  };

  useEffect(() => {
    async function fetchVenue() {
      try {
        const response = await fetch(`${API_HOLIDAZE_URL}/venues/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch venue details');
        }
        const data = await response.json();
        setVenueData(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    if (id) {
      fetchVenue();
    } else {
      setError('Invalid venue ID');
      setIsLoading(false);
    }
  }, [id]);

  if (isLoading) {
    return (
      <S.LoadingContainer>
        <B.LoadingSpinner />
        <p>Loading venue details...</p>
      </S.LoadingContainer>
    );
  }

  if (error) {
    return (
      <div className="error">
        <p>Error: {error}</p>
      </div>
    );
  }

  if (venueData) {
    const {
      name,
      location,
      rating,
      meta,
      price,
      maxGuests,
      updated,
      created,
      media,
    } = venueData;

    const renderStars = (rating) => {
      const stars = Math.min(Math.floor(rating), 5);
      return Array.from({ length: stars }, (_, i) => (
        <img
          key={i}
          src="/images/icons/star.svg"
          alt="star"
          className="star-icon"
        />
      ));
    };

    return (
      <div>
        <S.HeroSection
          style={{ backgroundImage: `url(${venueData.media[0]?.url || ''})` }}
        ></S.HeroSection>

        <S.OverlayContainer>
          <S.InfoSection>
            <div className="info-left">
              <div className="name-stars">
                <h1>{name}</h1>
                <div className="stars">
                  {rating > 0 ? renderStars(rating) : <p>(Not yet rated)</p>}
                </div>
              </div>
              <p>
                Location:{' '}
                <strong>
                  {location.address && location.city && location.country
                    ? `${location.address}, ${location.city}, ${location.country}`
                    : 'A Location has not been provided'}
                </strong>
              </p>
            </div>
            <div className="info-right">
              {isLoggedIn ? (
                <B.BlueButton onClick={() => console.log('Open Booking Modal')}>
                  Book your stay
                </B.BlueButton>
              ) : (
                <B.OrangeButton onClick={() => openLogin()}>
                  Log in to Book your stay
                </B.OrangeButton>
              )}
            </div>
          </S.InfoSection>
          <S.AmenitiesSection>
            <h2>Amenities:</h2>
            <div className="amenities-grid">
              <div>
                <img src="/images/icons/wifi.svg" alt="WiFi Icon" />
                <p>
                  WiFi:{' '}
                  <img
                    src={
                      meta.wifi
                        ? '/images/icons/yes.svg'
                        : '/images/icons/no.svg'
                    }
                    alt={meta.wifi ? 'Yes' : 'No'}
                  />
                </p>
              </div>
              <div>
                <img src="/images/icons/breakfast.svg" alt="Breakfast Icon" />
                <p>
                  Breakfast:{' '}
                  <img
                    src={
                      meta.breakfast
                        ? '/images/icons/yes.svg'
                        : '/images/icons/no.svg'
                    }
                    alt={meta.breakfast ? 'Yes' : 'No'}
                  />
                </p>
              </div>
              <div>
                <img src="/images/icons/parking.svg" alt="Parking Icon" />
                <p>
                  Free Parking:{' '}
                  <img
                    src={
                      meta.parking
                        ? '/images/icons/yes.svg'
                        : '/images/icons/no.svg'
                    }
                    alt={meta.parking ? 'Yes' : 'No'}
                  />
                </p>
              </div>
              <div>
                <img src="/images/icons/pets.svg" alt="Pets Icon" />
                <p>
                  Pets allowed:{' '}
                  <img
                    src={
                      meta.pets
                        ? '/images/icons/yes.svg'
                        : '/images/icons/no.svg'
                    }
                    alt={meta.pets ? 'Yes' : 'No'}
                  />
                </p>
              </div>
            </div>
          </S.AmenitiesSection>
        </S.OverlayContainer>
        <S.DetailsSection>
          <div className="grid-container">
            <div className="description-details">
              <div className="description">
                <h3>Venue Description:</h3>
                <p>{venueData.description || 'No description available.'}</p>
              </div>
              <div className="details">
                <h3>Venue Details:</h3>
                <p>
                  Price: <strong>{price} NOK per night</strong>
                </p>
                <p>
                  Max Guests: <strong>{maxGuests}</strong>
                </p>
                <p>
                  Created:{' '}
                  <strong>
                    {new Date(created).toLocaleDateString('nb-NO')}
                  </strong>
                </p>
                <p>
                  Last Updated:{' '}
                  <strong>{new Date(updated).toLocaleDateString()}</strong>
                </p>
              </div>
            </div>
            <div className="carousel">
              {/* Placeholder for the carousel */}
              <img
                src={media[0]?.url || '/images/placeholder.jpg'}
                alt="Venue Media"
                className="carousel-image"
              />
            </div>
          </div>
          <h3>View the calendar for information about available dates</h3>
          <div className="calendar">
            {/* Placeholder for the calendar component */}
            <p>Calendar will be displayed here.</p>
          </div>
          <div className="centered-button">
            {isLoggedIn ? (
              <B.BlueButton onClick={() => console.log('Open Booking Modal')}>
                Book your stay
              </B.BlueButton>
            ) : (
              <B.OrangeButton onClick={() => openLogin()}>
                Log in to Book your stay
              </B.OrangeButton>
            )}
          </div>
        </S.DetailsSection>

        {/* Login Modal */}
        <Login
          showModal={showLogin}
          closeModal={closeModal}
          openRegister={openRegister}
          prefillEmail={email}
        />

        {/* Register Modal */}
        <Register
          showModal={showRegister}
          closeModal={closeModal}
          openLogin={openLogin}
        />
      </div>
    );
  }

  return null;
}

export default Venue;
