import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { authFetch } from '../../auth/authFetch';
import '../../App.css';
import * as S from './index.styles';
import * as B from '../../styles/GlobalStyle';
import UpdateProfile from '../../components/UpdateProfile';

function Profile() {
  const { username } = useParams(); // 🚨 Brukernavn fra URL
  const navigate = useNavigate();
  const storedProfile = localStorage.getItem('profile');

  // ✅ Sikrer at `parsedProfile` alltid er et objekt (ikke null)
  const parsedProfile = storedProfile ? JSON.parse(storedProfile) : {};
  const storedName = parsedProfile?.name || ''; // ✅ Sikrer at storedName aldri blir null

  const [profile, setProfile] = useState(parsedProfile);
  const [loading, setLoading] = useState(!storedProfile);
  const [error, setError] = useState('');
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  useEffect(() => {
    async function fetchProfile() {
      if (!username) {
        console.error('🚨 Feil: Ingen username i URL!');
        setError('Missing username in URL.');
        setLoading(false);
        return;
      }

      if (!storedName) {
        console.error('⚠️ Ingen profil funnet i localStorage.');
        setError('No profile data found. Please log in again.');
        setLoading(false);
        return;
      }

      const actualUsername = storedName || username;
      const url = `https://api.noroff.dev/api/v1/holidaze/profiles/${encodeURIComponent(actualUsername)}`;

      console.log('🔍 Fetching profile from API:', url);

      try {
        const data = await authFetch(url);
        if (data.errors) {
          throw new Error(data.errors[0]?.message || 'Profile not found.');
        }

        console.log('✅ Profile data received:', data);
        setProfile(data);
        localStorage.setItem('profile', JSON.stringify(data));
      } catch (err) {
        console.error('❌ Error fetching profile:', err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    if (!storedName || username.toLowerCase() !== storedName.toLowerCase()) {
      fetchProfile();
    }
  }, [username, storedName, navigate]); // 🔥 Ikke lenger avhengig av profile?.name

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p className="alert-danger">{error}</p>;
  if (!profile || !profile.name) return <p>No profile found.</p>;

  const { name, email, avatar, banner, venueManager } = profile;
  const bannerUrl = banner?.url || '/images/default-banner.png';
  const avatarUrl = avatar?.url || '/images/default-avatar.png';

  return (
    <div>
      <S.HeroSection bannerUrl={bannerUrl}>
        <S.HeroText>{profile.name}'s Profile</S.HeroText>
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

        <S.ContactHeading>Do you want to create a new Venue?</S.ContactHeading>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <B.BlueButton>Create New Venue</B.BlueButton>
        </div>
      </div>

      {showUpdateModal && (
        <UpdateProfile
          showModal={showUpdateModal}
          closeModal={() => setShowUpdateModal(false)}
          onProfileUpdate={(updatedProfile) => {
            setProfile(updatedProfile);
            localStorage.setItem('profile', JSON.stringify(updatedProfile));
          }}
        />
      )}
    </div>
  );
}

export default Profile;
