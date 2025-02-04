import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { authFetch } from '../../auth/authFetch';
import '../../App.css';
import * as S from './index.styles';
import * as B from '../../styles/GlobalStyle';
import UpdateProfile from '../../components/UpdateProfile'; // 🔥 Importerer modalen

function Profile() {
  const { username } = useParams();
  const storedProfile = localStorage.getItem('profile');
  const [profile, setProfile] = useState(
    storedProfile ? JSON.parse(storedProfile) : null
  );
  const [loading, setLoading] = useState(!storedProfile);
  const [error, setError] = useState('');
  const [showUpdateModal, setShowUpdateModal] = useState(false); // ✅ Legger til state for modalen

  useEffect(() => {
    if (!storedProfile && username) {
      async function fetchProfile() {
        try {
          const url = `https://api.noroff.dev/api/v1/holidaze/profiles/${encodeURIComponent(username)}`;
          console.log('🔍 Fetching profile from API:', url);

          const data = await authFetch(url);
          if (data.errors) {
            throw new Error(data.errors[0].message || 'Profile not found.');
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

      fetchProfile();
    }
  }, [username, storedProfile]);

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p className="alert-danger">{error}</p>;
  if (!profile) return <p>No profile found.</p>;

  const { name, email, avatar, banner, venueManager } = profile;
  const bannerUrl = banner?.url || '/images/default-banner.png';
  const avatarUrl = avatar?.url || '/images/default-avatar.png';

  return (
    <div>
      <S.HeroSection bannerUrl={bannerUrl}>
        <S.HeroText>{name}'s Profile</S.HeroText>
      </S.HeroSection>

      <div className="container">
        <S.PersonalContainer>
          <h2>Profile Information</h2>
          <S.ProfileGrid>
            <div>
              <img
                src={avatarUrl}
                alt={avatar?.alt || 'Profile Avatar'}
                width="150"
                height="150"
                style={{ borderRadius: '50%', objectFit: 'cover' }}
              />
            </div>
            <S.ProfileDetails>
              <p>
                <strong>Account Type:</strong>{' '}
                {venueManager ? 'Manager' : 'Private User'}
              </p>
              <p>
                <strong>Username:</strong> {name}
              </p>
              <p>
                <strong>Email:</strong> {email}
              </p>
            </S.ProfileDetails>
          </S.ProfileGrid>

          {/* 🔥 Knapp for å åpne modalen */}
          <B.OrangeButton onClick={() => setShowUpdateModal(true)}>
            Update Profile
          </B.OrangeButton>
        </S.PersonalContainer>

        <S.ContactHeading>Do you want to create a new Venue?</S.ContactHeading>
        <B.BlueButton>Create New Venue</B.BlueButton>
      </div>

      {/* 🔥 UpdateProfile-modalen */}
      {showUpdateModal && (
        <UpdateProfile
          showModal={showUpdateModal}
          closeModal={() => setShowUpdateModal(false)}
        />
      )}
    </div>
  );
}

export default Profile;
