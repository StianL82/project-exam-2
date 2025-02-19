import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../../App.css';
import * as S from './index.styles';
import * as B from '../../styles/GlobalStyle';
import { API_HOLIDAZE_URL } from '../../auth/constants';
import { useAuth } from '../../auth/AuthContext';
import Login from '../../components/Login';
import Register from '../../components/Register';
import VenueCarousel from '../../components/Carousel';
import BookingModal from '../../components/BookingModal';
import BookingCalendar from '../../components/Calendar';

/**
 * Venue Page Component
 *
 * Displays detailed information about a venue, including its amenities, location, price,
 * maximum guests, and availability. Users can log in to book a stay.
 *
 * @component
 * @returns {JSX.Element|null} The venue details page or `null` if the venue is not found.
 *
 * @dependencies
 * - React useState, useEffect
 * - useParams from react-router-dom for dynamic URL handling
 * - useAuth for authentication status
 * - Components: Login, Register, VenueCarousel, BookingModal, BookingCalendar
 * - API_HOLIDAZE_URL constant for fetching venue data
 *
 * @state {Object|null} venueData - Stores the venue details.
 * @state {boolean} isLoading - Tracks if data is being fetched.
 * @state {string|null} error - Stores error messages if fetching fails.
 * @state {boolean} showLogin - Controls login modal visibility.
 * @state {boolean} showRegister - Controls register modal visibility.
 * @state {boolean} showBookingModal - Controls booking modal visibility.
 * @state {string} email - Stores prefilled email when opening login.
 * @state {Array} bookedDates - Stores unavailable dates for the venue.
 *
 * @effect Fetches venue details from the API on component mount.
 * @effect Scrolls to the top when the page is loaded.
 *
 * @function openLogin - Opens the login modal.
 * @function openRegister - Opens the register modal.
 * @function closeModal - Closes login/register modals and resets email state.
 * @function openBookingModal - Opens the booking modal.
 * @function closeBookingModal - Closes the booking modal.
 */

function Venue() {
  const { id } = useParams();
  const { isLoggedIn } = useAuth();
  const [venueData, setVenueData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [email, setEmail] = useState('');
  const [bookedDates, setBookedDates] = useState([]);

  useEffect(() => {
    requestAnimationFrame(() => {
      window.scrollTo(0, 0);
    });
  }, []);

  const openLogin = (prefillEmail = '') => {
    if (prefillEmail) {
      setEmail(prefillEmail);
    } else {
      setEmail('');
    }
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

  const openBookingModal = () => {
    setShowBookingModal(true);
  };

  const closeBookingModal = () => {
    setShowBookingModal(false);
  };

  useEffect(() => {
    async function fetchVenue() {
      try {
        const response = await fetch(
          `${API_HOLIDAZE_URL}/venues/${id}?_bookings=true`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch venue details');
        }
        const data = await response.json();
        setVenueData(data.data);

        if (data.data.bookings) {
          const unavailableDates = [];
          data.data.bookings.forEach((booking) => {
            const start = new Date(booking.dateFrom);
            const end = new Date(booking.dateTo);

            let currentDate = new Date(start);
            while (currentDate <= end) {
              unavailableDates.push(currentDate.toISOString().split('T')[0]);
              currentDate.setDate(currentDate.getDate() + 1);
            }
          });
          setBookedDates(unavailableDates);
        }
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
    const defaultImage = '/images/contact-section.png';

    const isBlockedDomain = (url) => {
      const blockedDomains = ['theaureview.com', 'example.com'];
      return blockedDomains.some((domain) => url?.includes(domain));
    };

    const validImage = venueData?.media?.find(
      (img) => img.url && !isBlockedDomain(img.url)
    );

    const imageUrl = validImage ? validImage.url : defaultImage;

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
          style={{ backgroundImage: `url(${imageUrl})` }}
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
                <B.BlueButton onClick={openBookingModal}>
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
              <VenueCarousel
                media={
                  media?.length > 0
                    ? media.filter(
                        (img) => img.url && !isBlockedDomain(img.url)
                      )
                    : [{ url: defaultImage, alt: 'Default venue image' }]
                }
              />
            </div>
          </div>
          <h3>View the calendar for information about available dates</h3>
          <div className="calendar">
            <BookingCalendar
              disabledDates={bookedDates}
              onDateChange={() => {}}
            />
          </div>
          <div className="centered-button">
            {isLoggedIn ? (
              <B.BlueButton onClick={openBookingModal}>
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

        {/* Booking Modal */}
        <BookingModal
          show={showBookingModal}
          onClose={closeBookingModal}
          unavailableDates={bookedDates}
          price={venueData.price}
          maxGuests={venueData.maxGuests}
          venueId={id}
        />
      </div>
    );
  }

  return null;
}

export default Venue;
