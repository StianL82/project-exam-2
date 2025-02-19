import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { authFetch } from '../../auth/authFetch';
import '../../App.css';
import * as S from './index.styles';
import * as B from '../../styles/GlobalStyle';
import UpdateProfile from '../../components/UpdateProfile';
import CreateVenue from '../../components/CreateVenue';
import Accordion from 'react-bootstrap/Accordion';
import BookingCard from '../../components/BookingCard';
import VenueCard from '../../components/VenueCard';
import MyVenueBookingCard from '../../components/MyVenueBookingCard';
import { API_HOLIDAZE_URL } from '../../auth/constants';

/**
 * Profile Page Component
 *
 * Displays the user's profile information, including their avatar, email, bio, and account type.
 * If the user is a Venue Manager, they can create venues, view their own venues, and see bookings on their venues.
 * Users can also view their personal bookings and update their profile details.
 *
 * @component
 * @returns {JSX.Element} The profile page with user details, bookings, venues, and profile update functionality.
 *
 * @dependencies
 * - React useState, useEffect, useRef, useLocation
 * - authFetch for API requests
 * - UpdateProfile, CreateVenue, BookingCard, VenueCard, MyVenueBookingCard components
 * - react-bootstrap Accordion
 * - API_HOLIDAZE_URL constant
 *
 * @state {Object} profile - Stores the user's profile information.
 * @state {boolean} loading - Indicates if the profile is still being fetched.
 * @state {string} error - Stores any error messages encountered during data fetching.
 * @state {boolean} showUpdateModal - Controls the visibility of the update profile modal.
 * @state {boolean} showCreateVenueModal - Controls the visibility of the create venue modal.
 * @state {Array} venuesWithBookings - Stores the venues owned by the user that have bookings.
 *
 * @effect Fetches user profile details on mount and updates localStorage.
 * @effect Scrolls to "My Bookings" section if the user was redirected from another page.
 *
 * @function handleProfileUpdate - Updates the profile state and re-fetches data after an update.
 * @function handleBookingDeleted - Removes a deleted booking from the profile.
 * @function fetchUpdatedVenuesWithBookings - Fetches updated venue data after a booking/venue change.
 * @function handleDeleteVenue - Deletes a venue and updates the profile state.
 * @function handleVenueCreated - Adds a newly created venue to the profile.
 */

function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showCreateVenueModal, setShowCreateVenueModal] = useState(false);
  const [venuesWithBookings, setVenuesWithBookings] = useState([]);

  const location = useLocation();
  const bookingsRef = useRef(null);

  useEffect(() => {
    if (location.state?.scrollTo === 'my-bookings') {
      const timer = setTimeout(() => {
        if (bookingsRef.current) {
          bookingsRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [location]);

  useEffect(() => {
    async function fetchProfile() {
      const storedProfile = localStorage.getItem('profile');
      const profileData = storedProfile ? JSON.parse(storedProfile) : null;
      const profileName = profileData?.name;

      if (!profileName) {
        setError('No profile data found. Please log in again.');
        setLoading(false);
        return;
      }

      const profileUrl = `${API_HOLIDAZE_URL}/profiles/${encodeURIComponent(profileName)}?_bookings=true&_venues=true`;

      try {
        const response = await authFetch(profileUrl);
        if (!response || response.errors) {
          throw new Error(
            response.errors?.[0]?.message || 'Profile not found.'
          );
        }

        setProfile(response.data);
        localStorage.setItem('profile', JSON.stringify(response.data));

        fetchVenuesWithBookings(response.data.name);
      } catch (err) {
        setError(
          'Failed to retrieve profile data from the server. This may be due to a temporary issue with the API. Please check your internet connection or try again later.'
        );
      } finally {
        setLoading(false);
      }
    }

    async function fetchVenuesWithBookings(profileName) {
      const venuesUrl = `${API_HOLIDAZE_URL}/profiles/${encodeURIComponent(profileName)}/venues?_bookings=true&_owner=true`;

      try {
        const response = await authFetch(venuesUrl);
        if (!response || response.errors) {
          setError('No venues found.');
          return;
        }

        setVenuesWithBookings(response.data);
      } catch (err) {
        setError('Failed to fetch venues with bookings.');
      }
    }

    fetchProfile();
  }, []);

  const handleProfileUpdate = async (updatedProfile) => {
    setProfile(updatedProfile);
    localStorage.setItem('profile', JSON.stringify(updatedProfile));

    const profileName = updatedProfile.name;
    const profileUrl = `${API_HOLIDAZE_URL}/profiles/${encodeURIComponent(profileName)}?_bookings=true&_venues=true`;

    try {
      const response = await authFetch(profileUrl);
      if (!response || response.errors) {
        setError('Error fetching updated profile.');
        return;
      }
      setProfile(response.data);
    } catch {
      setError('Failed to fetch updated profile.');
    }
  };

  const handleBookingDeleted = async () => {
    const storedProfile = localStorage.getItem('profile');
    const profileData = storedProfile ? JSON.parse(storedProfile) : null;
    const profileName = profileData?.name;
    const profileUrl = `${API_HOLIDAZE_URL}/profiles/${encodeURIComponent(profileName)}?_bookings=true&_venues=true`;

    try {
      const response = await authFetch(profileUrl);
      if (!response || response.errors) {
        setError('Failed to fetch updated profile. Please try again.');
        return;
      }
      setProfile(response.data);
    } catch (err) {
      setError('Failed to fetch updated profile. Please try again.');
    }
  };

  const fetchUpdatedVenuesWithBookings = async (profileName) => {
    const venuesUrl = `${API_HOLIDAZE_URL}/profiles/${encodeURIComponent(profileName)}/venues?_bookings=true&_owner=true`;

    try {
      const venuesResponse = await authFetch(venuesUrl);
      if (!venuesResponse || venuesResponse.errors) {
        setError(
          'Error fetching updated venues with bookings. Please try again.'
        );
        return;
      }
      setVenuesWithBookings(venuesResponse.data);
    } catch (err) {
      setError(
        'Failed to fetch updated venues with bookings. Please try again.'
      );
    }
  };

  const handleDeleteVenue = async (venueId) => {
    try {
      const response = await authFetch(
        `${API_HOLIDAZE_URL}/venues/${venueId}`,
        { method: 'DELETE' }
      );

      if (response && response.errors) {
        setError('Failed to delete venue. Please try again.');
        return;
      }

      const updatedProfile = {
        ...profile,
        venues: profile.venues.filter((venue) => venue.id !== venueId),
      };

      const updatedBookings = profile.bookings.filter(
        (booking) => booking.venue.id !== venueId
      );

      setProfile({
        ...updatedProfile,
        bookings: updatedBookings,
      });

      localStorage.setItem(
        'profile',
        JSON.stringify({ ...updatedProfile, bookings: updatedBookings })
      );

      await fetchUpdatedVenuesWithBookings(updatedProfile.name);
    } catch (error) {
      setError(`Error deleting venue: ${error.message}`);
    }
  };

  const handleVenueCreated = async (newVenue) => {
    const updatedProfile = {
      ...profile,
      venues: [...profile.venues, newVenue],
    };

    setProfile(updatedProfile);
    localStorage.setItem('profile', JSON.stringify(updatedProfile));

    const profileName = updatedProfile.name;
    const profileUrl = `${API_HOLIDAZE_URL}/profiles/${encodeURIComponent(profileName)}?_bookings=true&_venues=true`;

    try {
      const response = await authFetch(profileUrl);
      if (!response || response.errors) {
        setError('Error fetching updated profile.');
        return;
      }

      setProfile(response.data);
      await fetchUpdatedVenuesWithBookings(profileName);
    } catch (err) {
      setError('Error fetching updated profile. Please try again.');
    }
  };

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
        }}
      >
        <B.LoadingSpinner />
        <p style={{ marginTop: '1rem', fontSize: '1.2rem' }}>
          Loading profile...
        </p>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="error">
        <p>{error ? error : 'No profile found. Please try again later.'}</p>
      </div>
    );
  }

  const { name, email, bio, avatar, banner, venueManager, bookings } =
    profile || {};
  const venues = profile?.venues || [];

  return (
    <div>
      <S.HeroSection bannerUrl={banner?.url}>
        <S.HeroText>{name}'s Profile</S.HeroText>
      </S.HeroSection>

      <div className="container">
        <S.PersonalContainer>
          <S.ProfileTitle>Profile Information</S.ProfileTitle>
          <S.ProfileGrid>
            <S.ProfileImageContainer>
              <S.ProfileImage src={avatar?.url} alt="Profile Avatar" />
            </S.ProfileImageContainer>
            <S.ProfileDetails>
              <p>
                <strong>Account Type:</strong>{' '}
                {venueManager ? 'Venue Manager' : 'Private User'}
              </p>
              <p>
                <strong>Username:</strong> {name}
              </p>
              <p>
                <strong>Email:</strong> {email}
              </p>
              <p>
                <strong>Bio:</strong> {bio}
              </p>
            </S.ProfileDetails>
          </S.ProfileGrid>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <B.OrangeButton onClick={() => setShowUpdateModal(true)}>
              Update Profile
            </B.OrangeButton>
          </div>
        </S.PersonalContainer>

        <S.DividerContainer />
        {profile.venueManager ? (
          <>
            <S.ContactHeading>
              Do you want to create a new Venue?
            </S.ContactHeading>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <S.CenteredButtonContainer>
                <B.BlueButton onClick={() => setShowCreateVenueModal(true)}>
                  Create New Venue
                </B.BlueButton>
              </S.CenteredButtonContainer>
            </div>
          </>
        ) : (
          <S.ContactHeading>
            Do you want to create your own venues? Update your profile to become
            a Venue Manager and start creating your own venues today!
          </S.ContactHeading>
        )}

        <S.Container ref={bookingsRef}>
          <Accordion defaultActiveKey={['0']} alwaysOpen>
            <Accordion.Item eventKey="0">
              <Accordion.Header>My Bookings</Accordion.Header>
              <Accordion.Body>
                {bookings && bookings.length > 0 ? (
                  [...bookings]
                    .sort((a, b) => new Date(b.created) - new Date(a.created))
                    .map((booking) => (
                      <BookingCard
                        key={booking.id || `booking-${Math.random()}`}
                        booking={booking}
                        onBookingDeleted={handleBookingDeleted}
                      />
                    ))
                ) : (
                  <p>No bookings found.</p>
                )}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </S.Container>

        {profile.venueManager && (
          <>
            <S.Container>
              <Accordion defaultActiveKey={['0']} alwaysOpen>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>My Venues</Accordion.Header>
                  <Accordion.Body>
                    <S.VenueGridContainer>
                      {venues.length > 0 ? (
                        venues.map((venue) => (
                          <VenueCard
                            key={venue.id || `venue-${Math.random()}`}
                            venue={venue}
                            showEditDelete
                            onEdit={() => {}}
                            onDelete={(id) => handleDeleteVenue(id)}
                          />
                        ))
                      ) : (
                        <p>No venues available.</p>
                      )}
                    </S.VenueGridContainer>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </S.Container>

            <S.Container>
              <Accordion defaultActiveKey={['0']} alwaysOpen>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Bookings on my Venues</Accordion.Header>
                  <Accordion.Body>
                    {venuesWithBookings?.length > 0 ? (
                      venuesWithBookings.map((venue) => (
                        <MyVenueBookingCard key={venue.id} venue={venue} />
                      ))
                    ) : (
                      <p>No bookings found on your venues.</p>
                    )}
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </S.Container>
          </>
        )}
      </div>

      {/* Update Profile Modal */}
      {showUpdateModal && (
        <UpdateProfile
          showModal={showUpdateModal}
          closeModal={() => setShowUpdateModal(false)}
          onProfileUpdate={handleProfileUpdate}
        />
      )}

      {/* Create Venue Modal */}
      {showCreateVenueModal && (
        <CreateVenue
          showModal={showCreateVenueModal}
          closeModal={() => setShowCreateVenueModal(false)}
          onVenueCreated={handleVenueCreated}
        />
      )}
    </div>
  );
}

export default Profile;
