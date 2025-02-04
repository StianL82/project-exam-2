import React, { useState, useEffect } from 'react';
import { authFetch } from '../../auth/authFetch';
import * as S from './index.styles';

const UpdateProfile = ({ showModal, closeModal }) => {
  const storedProfile = localStorage.getItem('profile');
  const profileData = storedProfile ? JSON.parse(storedProfile) : {};

  const [avatar, setAvatar] = useState(profileData.avatar?.url || '');
  const [avatarAlt, setAvatarAlt] = useState(profileData.avatar?.alt || '');
  const [banner, setBanner] = useState(profileData.banner?.url || '');
  const [bannerAlt, setBannerAlt] = useState(profileData.banner?.alt || '');
  const [bio, setBio] = useState(profileData.bio || '');
  const [venueManager, setVenueManager] = useState(
    profileData.venueManager || false
  );
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!profileData.name) {
      console.error('❌ Profile name is missing.');
      return;
    }
    fetchProfile();
  }, []);

  /** 🔍 Henter brukerprofil fra API */
  const fetchProfile = async () => {
    if (!profileData.name) {
      setError('❌ Profile name is missing.');
      console.error('⚠️ profileData.name er undefined eller tom:', profileData);
      return;
    }

    const encodedName = encodeURIComponent(profileData.name);
    const profileUrl = `https://api.noroff.dev/api/v1/holidaze/profiles/${encodedName}?_bookings=true&_venues=true`;

    console.log('🔍 Prøver å hente profilen med URL:', profileUrl);
    console.log('📌 Bruker token:', localStorage.getItem('accessToken'));

    try {
      const response = await authFetch(profileUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          'X-Noroff-API-Key': '499331ba-2fa7-4908-bf07-4280374f9f87',
        },
      });

      if (response.errors) {
        console.error('❌ API svarte med feil:', response.errors);
        setError('Profile not found in API.');
        return;
      }

      console.log('✅ Profile data mottatt fra API:', response);

      setAvatar(response.avatar?.url || '');
      setAvatarAlt(response.avatar?.alt || '');
      setBanner(response.banner?.url || '');
      setBannerAlt(response.banner?.alt || '');
      setBio(response.bio || '');
      setVenueManager(response.venueManager || false);

      localStorage.setItem('profile', JSON.stringify(response));
    } catch (error) {
      console.error('❌ Feil ved henting av profil:', error);
      setError('Failed to load profile.');
    }
  };

  /** 🚀 Oppdaterer brukerprofil */
  const handleUpdate = async () => {
    if (!profileData.name) {
      setMessage('Profile update failed. Missing profile name.');
      return;
    }

    setLoading(true);
    setError('');

    const encodedName = encodeURIComponent(profileData.name);
    const updateUrl = `https://api.noroff.dev/api/v1/holidaze/profiles/${encodedName}`;

    const updatedProfile = {
      bio,
      avatar: { url: avatar, alt: avatarAlt },
      banner: { url: banner, alt: bannerAlt },
      venueManager,
    };

    console.log('🚀 Updating profile:', updatedProfile);

    try {
      const response = await authFetch(updateUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          'X-Noroff-API-Key': '499331ba-2fa7-4908-bf07-4280374f9f87',
        },
        body: JSON.stringify(updatedProfile),
      });

      console.log('✅ Profile update response:', response);

      if (response.errors) {
        setError('Profile update failed.');
        console.error('❌ Update error:', response.errors);
        return;
      }

      localStorage.setItem('profile', JSON.stringify(response)); // Lagre ny data
      setMessage('Profile updated successfully!');
      setTimeout(() => closeModal(), 2000);
    } catch (error) {
      console.error('❌ Error updating profile:', error);
      setError('Profile update failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!showModal) return null;

  return (
    <S.ModalBackdrop>
      <S.ModalContent>
        <button onClick={closeModal} className="close-button">
          ×
        </button>
        <h2>Update Profile</h2>
        <S.FormBackground>
          <S.FormContainer>
            <label>Avatar URL:</label>
            <input
              type="text"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
            />

            <label>Avatar Alt Text:</label>
            <input
              type="text"
              value={avatarAlt}
              onChange={(e) => setAvatarAlt(e.target.value)}
            />

            <label>Banner URL:</label>
            <input
              type="text"
              value={banner}
              onChange={(e) => setBanner(e.target.value)}
            />

            <label>Banner Alt Text:</label>
            <input
              type="text"
              value={bannerAlt}
              onChange={(e) => setBannerAlt(e.target.value)}
            />

            <label>Bio:</label>
            <textarea value={bio} onChange={(e) => setBio(e.target.value)} />

            <label>
              <input
                type="checkbox"
                checked={venueManager}
                onChange={() => setVenueManager(!venueManager)}
              />
              Are you a Venue Manager?
            </label>

            <S.UpdateButton onClick={handleUpdate} disabled={loading}>
              {loading ? 'Updating...' : 'Update Profile'}
            </S.UpdateButton>

            {message && <p className="alert-success">{message}</p>}
            {error && <p className="alert-danger">{error}</p>}
          </S.FormContainer>
        </S.FormBackground>
      </S.ModalContent>
    </S.ModalBackdrop>
  );
};

export default UpdateProfile;
