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

function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showCreateVenueModal, setShowCreateVenueModal] = useState(false);
  const [venuesWithBookings, setVenuesWithBookings] = useState([]);

  // Scroll til 'My Bookings' hvis state indikerer det
  const location = useLocation();
  const bookingsRef = useRef(null);

  useEffect(() => {
    if (location.state?.scrollTo === 'my-bookings') {
      const timer = setTimeout(() => {
        if (bookingsRef.current) {
          bookingsRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      }, 500); // Vent 500 ms

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
      console.log('🔍 Fetching profile from API:', profileUrl);

      try {
        const response = await authFetch(profileUrl);
        if (!response || response.errors) {
          throw new Error(
            response.errors?.[0]?.message || 'Profile not found.'
          );
        }

        console.log('✅ Profile data received:', response.data);
        setProfile(response.data);
        localStorage.setItem('profile', JSON.stringify(response.data));

        // 🔄 Fetch detailed venue data with bookings
        fetchVenuesWithBookings(response.data.name);
      } catch (err) {
        console.error('❌ Error fetching profile:', err.message);
        setError('Failed to load profile. Please try again.');
      } finally {
        setLoading(false);
      }
    }

    async function fetchVenuesWithBookings(profileName) {
      const venuesUrl = `${API_HOLIDAZE_URL}/profiles/${encodeURIComponent(profileName)}/venues?_bookings=true&_owner=true`;
      console.log(
        '🔍 Fetching venues created by the profile with bookings:',
        venuesUrl
      );

      try {
        const response = await authFetch(venuesUrl);
        if (!response || response.errors) {
          throw new Error(response.errors?.[0]?.message || 'No venues found.');
        }

        console.log(
          '✅ Venues with bookings for this user received:',
          response.data
        );
        setVenuesWithBookings(response.data);
      } catch (err) {
        console.error('❌ Error fetching venues with bookings:', err.message);
      }
    }

    fetchProfile();
  }, []);

  const handleProfileUpdate = async (updatedProfile) => {
    console.log('🔄 Profile updated:', updatedProfile);
    setProfile(updatedProfile);
    localStorage.setItem('profile', JSON.stringify(updatedProfile));

    // Hent oppdatert profil fra API for å sikre at bookings er oppdatert
    const profileName = updatedProfile.name;
    const profileUrl = `${API_HOLIDAZE_URL}/profiles/${encodeURIComponent(profileName)}?_bookings=true&_venues=true`;

    try {
      const response = await authFetch(profileUrl);
      if (!response || response.errors) {
        console.error('❌ Error fetching updated profile:', response.errors);
        return;
      }
      console.log('✅ Updated profile with bookings fetched:', response.data);
      setProfile(response.data); // Oppdaterer profilen med de nyeste bookingene
    } catch (err) {
      console.error('❌ Error fetching updated profile:', err.message);
    }
  };

  const handleBookingDeleted = async (deletedBookingId) => {
    console.log(`🔄 Booking deleted with ID: ${deletedBookingId}`);

    const storedProfile = localStorage.getItem('profile');
    const profileData = storedProfile ? JSON.parse(storedProfile) : null;
    const profileName = profileData?.name;
    const profileUrl = `${API_HOLIDAZE_URL}/profiles/${encodeURIComponent(profileName)}?_bookings=true&_venues=true`;

    try {
      const response = await authFetch(profileUrl);
      if (!response || response.errors) {
        console.error('❌ Error fetching updated profile:', response.errors);
        return;
      }

      console.log(
        '✅ Updated profile with new bookings fetched:',
        response.data
      );
      setProfile(response.data); // Oppdaterer profilen med de nyeste bookingene
    } catch (err) {
      console.error('❌ Error fetching updated profile:', err.message);
    }
  };

  const fetchUpdatedVenuesWithBookings = async (profileName) => {
    const venuesUrl = `${API_HOLIDAZE_URL}/profiles/${encodeURIComponent(profileName)}/venues?_bookings=true&_owner=true`;

    try {
      const venuesResponse = await authFetch(venuesUrl);
      if (venuesResponse && !venuesResponse.errors) {
        console.log(
          '✅ Updated venues with bookings fetched:',
          venuesResponse.data
        );
        setVenuesWithBookings(venuesResponse.data);
      } else {
        console.error(
          '❌ Error fetching updated venues with bookings:',
          venuesResponse.errors
        );
      }
    } catch (err) {
      console.error(
        '❌ Error fetching updated venues with bookings:',
        err.message
      );
    }
  };

  const handleDeleteVenue = async (venueId) => {
    console.log(`🗑 Attempting to delete venue with ID: ${venueId}`);

    try {
      const response = await authFetch(
        `${API_HOLIDAZE_URL}/venues/${venueId}`,
        {
          method: 'DELETE',
        }
      );

      if (response === null) {
        console.log('✅ Venue deleted successfully.');

        const updatedProfile = {
          ...profile,
          venues: profile.venues.filter((venue) => venue.id !== venueId),
        };

        // ❌ Fjern bookinger knyttet til det slettede stedet
        const updatedBookings = profile.bookings.filter(
          (booking) => booking.venue.id !== venueId
        );

        setProfile({
          ...updatedProfile,
          bookings: updatedBookings, // Oppdaterer også bookingene
        });

        localStorage.setItem(
          'profile',
          JSON.stringify({ ...updatedProfile, bookings: updatedBookings })
        );

        // 🔄 Hent oppdatert data for "Bookings on My Venues"
        await fetchUpdatedVenuesWithBookings(updatedProfile.name);
      } else {
        console.error('❌ Failed to delete venue. Response:', response);
      }
    } catch (error) {
      console.error('❌ Error deleting venue:', error);
    }
  };

  const handleVenueCreated = async (newVenue) => {
    console.log('🏨 New venue created:', newVenue);

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
        console.error('❌ Error fetching updated profile:', response.errors);
        return;
      }

      console.log('✅ Updated profile fetched:', response.data);
      setProfile(response.data);

      // 🔄 Hent oppdatert data for "Bookings on My Venues"
      await fetchUpdatedVenuesWithBookings(profileName);
    } catch (err) {
      console.error('❌ Error fetching updated profile:', err.message);
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
  const venues = profile?.venues || []; // Fallback til tom array hvis venues er undefined

  const bannerUrl = banner?.url || '/images/default-banner.png';
  const avatarUrl = avatar?.url || '/images/default-avatar.png';

  return (
    <div>
      <S.HeroSection bannerUrl={bannerUrl}>
        <S.HeroText>{name}'s Profile</S.HeroText>
      </S.HeroSection>

      <div className="container">
        <S.PersonalContainer>
          <S.ProfileTitle>Profile Information</S.ProfileTitle>
          <S.ProfileGrid>
            <S.ProfileImageContainer>
              <S.ProfileImage src={avatarUrl} alt="Profile Avatar" />
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

        <S.Container>
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
                            onEdit={(venue) =>
                              console.log('Edit Venue:', venue)
                            }
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
