import { useState, useEffect } from 'react';
import { authFetch } from '../../auth/authFetch';
import '../../App.css';
import * as S from './index.styles';
import * as B from '../../styles/GlobalStyle';
import UpdateProfile from '../../components/UpdateProfile';
import CreateVenue from '../../components/CreateVenue';
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

        // Oppdater profilen for å fjerne slettet venue
        const updatedProfile = {
          ...profile,
          venues: profile.venues.filter((venue) => venue.id !== venueId),
        };

        setProfile(updatedProfile);
        localStorage.setItem('profile', JSON.stringify(updatedProfile));
      } else {
        console.error('❌ Failed to delete venue. Response:', response);
      }
    } catch (error) {
      console.error('❌ Error deleting venue:', error);
    }
  };

  const handleVenueCreated = async (newVenue) => {
    console.log('🏨 New venue created:', newVenue);

    // Oppdater profilen lokalt ved å legge til den nye venue
    const updatedProfile = {
      ...profile,
      venues: [...profile.venues, newVenue], // Legger til den nye venue i listen
    };

    setProfile(updatedProfile);
    localStorage.setItem('profile', JSON.stringify(updatedProfile));

    // Hent den oppdaterte profilen fra API for å sikre at alt er riktig
    const profileName = profile.name;
    const profileUrl = `${API_HOLIDAZE_URL}/profiles/${encodeURIComponent(profileName)}?_bookings=true&_venues=true`;

    try {
      const response = await authFetch(profileUrl);
      if (!response || response.errors) {
        console.error('❌ Error fetching updated profile:', response.errors);
        return;
      }

      console.log('✅ Updated profile fetched:', response.data);
      setProfile(response.data);
    } catch (err) {
      console.error('❌ Error fetching updated profile:', err.message);
    }
  };

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p className="alert-danger">{error}</p>;
  if (!profile) return <p>No profile found.</p>;

  const { name, email, avatar, banner, venueManager, bookings, venues } =
    profile || {};

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
            </S.ProfileDetails>
          </S.ProfileGrid>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <B.OrangeButton onClick={() => setShowUpdateModal(true)}>
              Update Profile
            </B.OrangeButton>
          </div>
        </S.PersonalContainer>

        <S.DividerContainer />
        <S.ContactHeading>Do you want to create a new Venue?</S.ContactHeading>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <B.BlueButton onClick={() => setShowCreateVenueModal(true)}>
            Create New Venue
          </B.BlueButton>
        </div>

        <S.Container>
          <S.ContactHeading>My Bookings</S.ContactHeading>
          <S.ContentBox>
            {bookings && bookings.length > 0 ? (
              [...bookings]
                .sort((a, b) => new Date(b.created) - new Date(a.created)) // Sorter slik at nyeste kommer først
                .map((booking) => (
                  <BookingCard
                    key={booking.id}
                    booking={booking}
                    onBookingDeleted={handleBookingDeleted}
                  />
                ))
            ) : (
              <p>No bookings found.</p>
            )}
          </S.ContentBox>
        </S.Container>

        {/* Bare vis disse hvis brukeren er Venue Manager */}
        {profile.venueManager && (
          <>
            {/* My Venues */}
            <S.Container>
              <S.SectionHeader>My Venues</S.SectionHeader>
              <S.ContentBox>
                <S.VenueGridContainer>
                  {venues.map((venue) => (
                    <VenueCard
                      key={venue.id}
                      venue={venue}
                      showEditDelete
                      onEdit={(venue) => console.log('Edit Venue:', venue)}
                      onDelete={(id) => {
                        console.log('Delete Venue with ID:', id);
                        handleDeleteVenue(id);
                      }}
                    />
                  ))}
                </S.VenueGridContainer>
              </S.ContentBox>
            </S.Container>

            {/* Bookings on my Venues */}
            <S.Container>
              <S.SectionHeader>Bookings on my Venues</S.SectionHeader>
              <S.ContentBox>
                {venuesWithBookings.length > 0 ? (
                  venuesWithBookings.map((venue) => (
                    <MyVenueBookingCard key={venue.id} venue={venue} />
                  ))
                ) : (
                  <p>No bookings found on your venues.</p>
                )}
              </S.ContentBox>
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
