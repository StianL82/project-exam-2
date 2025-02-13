import React, { useState, useEffect, useCallback } from 'react';
import * as Yup from 'yup';
import { authFetch } from '../../auth/authFetch';
import * as S from './index.styles';
import { API_HOLIDAZE_URL } from '../../auth/constants';

const validationSchema = Yup.object().shape({
  avatar: Yup.string().url('Avatar must be a valid URL').nullable(),
  avatarAlt: Yup.string().max(100, 'Alt text cannot exceed 100 characters'),
  banner: Yup.string().url('Banner must be a valid URL').nullable(),
  bannerAlt: Yup.string().max(100, 'Alt text cannot exceed 100 characters'),
  bio: Yup.string().max(800, 'Bio cannot exceed 800 characters'),
});

const UpdateProfile = ({ showModal, closeModal, onProfileUpdate }) => {
  // ✅ Lagre profilnavnet i state for å unngå endeløs looping
  const storedProfile = localStorage.getItem('profile');
  const profileData = storedProfile ? JSON.parse(storedProfile) : null;
  const profileName = profileData?.name || '';

  const [avatar, setAvatar] = useState(profileData?.avatar?.url || '');
  const [avatarAlt, setAvatarAlt] = useState(profileData?.avatar?.alt || '');
  const [banner, setBanner] = useState(profileData?.banner?.url || '');
  const [bannerAlt, setBannerAlt] = useState(profileData?.banner?.alt || '');
  const [bio, setBio] = useState(profileData?.bio || '');
  const [venueManager, setVenueManager] = useState(
    profileData?.venueManager || false
  );
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleBlur = async (e) => {
    const { name, value } = e.target;
    try {
      await validationSchema.validateAt(name, { [name]: value });
      setError((prev) => ({ ...prev, [name]: '' }));
    } catch (err) {
      setError((prev) => ({ ...prev, [name]: err.message }));
    }
  };

  /** 🔍 Henter brukerprofil fra API */
  const fetchProfile = useCallback(async () => {
    if (!profileName) {
      setError('❌ Profile name is missing.');
      console.error('⚠️ Profile name is missing:', profileName);
      return;
    }

    const encodedName = encodeURIComponent(profileName);
    const profileUrl = `${API_HOLIDAZE_URL}/profiles/${encodedName}?_bookings=true&_venues=true`;

    console.log('🔍 Henter profil fra API:', profileUrl);

    try {
      const response = await authFetch(profileUrl);

      if (response.errors) {
        console.error('❌ API Feil:', response.errors);
        setError('Profile not found in API.');
        return;
      }

      console.log('✅ Profil hentet fra API:', response);

      setAvatar(response.data.avatar?.url || '');
      setAvatarAlt(response.data.avatar?.alt || '');
      setBanner(response.data.banner?.url || '');
      setBannerAlt(response.data.banner?.alt || '');
      setBio(response.data.bio || '');
      setVenueManager(response.data.venueManager || false);

      localStorage.setItem('profile', JSON.stringify(response.data));
    } catch (error) {
      console.error('❌ Feil ved henting av profil:', error);
      setError('Failed to load profile.');
    }
  }, [profileName]); // ❗ Bruker profileName, ikke profileData, for å unngå loop

  /** 🚀 Kjører kun hvis `profileName` endres */
  useEffect(() => {
    if (!profileName) {
      console.error('⚠️ Ingen profil funnet i localStorage!');
      setError('No profile data found. Please log in again.');
      return;
    }
    fetchProfile();
  }, [profileName, fetchProfile]); // ✅ Bruker profileName som dependency, ikke hele profileData

  /** 🚀 Oppdaterer brukerprofil */
  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      await validationSchema.validate(
        { avatar, avatarAlt, banner, bannerAlt, bio },
        { abortEarly: false }
      );

      setLoading(true);
      setError('');

      const encodedName = encodeURIComponent(profileName);
      const updateUrl = `${API_HOLIDAZE_URL}/profiles/${encodedName}`;

      const updatedProfile = {
        bio,
        avatar: { url: avatar, alt: avatarAlt },
        banner: { url: banner, alt: bannerAlt },
        venueManager,
      };

      const response = await authFetch(updateUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify(updatedProfile),
      });

      if (response.errors) {
        throw new Error('Profile update failed.');
      }

      localStorage.setItem('profile', JSON.stringify(response.data));
      setMessage('Profile updated successfully!');
      onProfileUpdate(response.data);
      setTimeout(() => closeModal(), 2000);
    } catch (err) {
      if (err.inner) {
        const validationErrors = {};
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        setError(validationErrors);
      } else {
        setError('Profile update failed. Please try again.');
      }
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
            <form onSubmit={handleUpdate}>
              <label htmlFor="avatar">Avatar URL:</label>
              <input
                id="avatar"
                type="text"
                value={avatar}
                onChange={(e) => setAvatar(e.target.value)}
                onBlur={handleBlur}
              />
              {error.avatar && <p className="alert-danger">{error.avatar}</p>}

              <label htmlFor="avatarAlt">Avatar Alt Text:</label>
              <input
                id="avatarAlt"
                type="text"
                value={avatarAlt}
                onChange={(e) => setAvatarAlt(e.target.value)}
              />

              <label htmlFor="banner">Banner URL:</label>
              <input
                id="banner"
                type="text"
                value={banner}
                onChange={(e) => setBanner(e.target.value)}
              />

              <label htmlFor="bannerAlt">Banner Alt Text:</label>
              <input
                id="bannerAlt"
                type="text"
                value={bannerAlt}
                onChange={(e) => setBannerAlt(e.target.value)}
              />

              <label htmlFor="bio">Bio:</label>
              <textarea
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />

              {!profileData?.venueManager && (
                <label htmlFor="venueManager">
                  <input
                    id="venueManager"
                    type="checkbox"
                    checked={venueManager}
                    onChange={() => setVenueManager(!venueManager)}
                  />
                  Are you a Venue Manager?
                </label>
              )}

              <S.ButtonContainer>
                <S.UpdateButton type="submit" disabled={loading}>
                  {loading ? 'Updating...' : 'Update Profile'}
                </S.UpdateButton>
              </S.ButtonContainer>

              {message && <p className="alert-success">{message}</p>}
              {error && <p className="alert-danger">{error}</p>}
            </form>
          </S.FormContainer>
        </S.FormBackground>
        <S.CloseLink onClick={closeModal}>Close</S.CloseLink>
      </S.ModalContent>
    </S.ModalBackdrop>
  );
};

export default UpdateProfile;
