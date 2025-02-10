import { useState, useEffect } from 'react';
import { authFetch } from '../../auth/authFetch';
import '../../App.css';
import * as S from './index.styles';
import * as B from '../../styles/GlobalStyle';
import UpdateProfile from '../../components/UpdateProfile';
import CreateVenue from '../../components/CreateVenue';
import BookingCard from '../../components/BookingCard';
import { API_HOLIDAZE_URL } from '../../auth/constants';

function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showCreateVenueModal, setShowCreateVenueModal] = useState(false);

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
      } catch (err) {
        console.error('❌ Error fetching profile:', err.message);
        setError('Failed to load profile. Please try again.');
      } finally {
        setLoading(false);
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

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p className="alert-danger">{error}</p>;
  if (!profile) return <p>No profile found.</p>;

  const { name, email, avatar, banner, venueManager, bookings } = profile;
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
      </div>

      {/* Bare vis disse hvis brukeren er Venue Manager */}
      {profile.venueManager && (
        <>
          {/* My Venues */}
          <S.Container>
            <S.SectionHeader>My Venues</S.SectionHeader>
            <S.ContentBox>
              <h1>Her kommer det info</h1>
            </S.ContentBox>
          </S.Container>

          {/* Bookings on my Venues */}
          <S.Container>
            <S.SectionHeader>Bookings on my Venues</S.SectionHeader>
            <S.ContentBox>
              <h1>Her kommer det info</h1>
            </S.ContentBox>
          </S.Container>
        </>
      )}

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
        />
      )}
    </div>
  );
}

export default Profile;
