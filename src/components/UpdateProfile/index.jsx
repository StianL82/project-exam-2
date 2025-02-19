import React, { useState, useEffect, useCallback } from 'react';
import { authFetch } from '../../auth/authFetch';
import * as S from './index.styles';
import { API_HOLIDAZE_URL } from '../../auth/constants';

/**
 * UpdateProfile Component
 *
 * A modal for updating user profile details, including avatar, banner, bio,
 * and venue manager status. Fetches the latest profile data and allows users
 * to update their information.
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {boolean} props.showModal - Determines if the modal is visible.
 * @param {Function} props.closeModal - Function to close the modal.
 * @param {Function} props.onProfileUpdate - Callback function to handle profile updates.
 * @returns {JSX.Element|null} The rendered modal or `null` if `showModal` is `false`.
 */

const UpdateProfile = ({ showModal, closeModal, onProfileUpdate }) => {
  const storedProfile = localStorage.getItem('profile');
  const profileData = storedProfile ? JSON.parse(storedProfile) : null;
  const profileName = profileData?.name || '';

  const [avatar, setAvatar] = useState(profileData?.avatar?.url || '');
  const [avatarAlt, setAvatarAlt] = useState(profileData?.avatar?.alt || '');
  const [banner, setBanner] = useState(profileData?.banner?.url || '');
  const [bannerAlt, setBannerAlt] = useState(profileData?.banner?.alt || '');
  const [bio, setBio] = useState(profileData?.bio || '');
  const [bioError, setBioError] = useState('');
  const [venueManager, setVenueManager] = useState(
    profileData?.venueManager || false
  );
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleBioChange = (e) => {
    const value = e.target.value;
    setBio(value);

    if (value.length > 160) {
      setBioError('Bio cannot exceed 160 characters.');
    } else {
      setBioError('');
    }
  };

  const fetchProfile = useCallback(async () => {
    if (!profileName) {
      setError('Profile name is missing.');
      return;
    }

    const encodedName = encodeURIComponent(profileName);
    const profileUrl = `${API_HOLIDAZE_URL}/profiles/${encodedName}?_bookings=true&_venues=true`;

    try {
      const response = await authFetch(profileUrl);

      if (response.errors) {
        setError('Profile not found in API.');
        return;
      }

      setAvatar(response.data.avatar?.url || '');
      setAvatarAlt(response.data.avatar?.alt || '');
      setBanner(response.data.banner?.url || '');
      setBannerAlt(response.data.banner?.alt || '');
      setBio(response.data.bio || '');
      setVenueManager(response.data.venueManager || false);

      localStorage.setItem('profile', JSON.stringify(response.data));
    } catch (error) {
      setError('Failed to load profile.');
    }
  }, [profileName]);

  useEffect(() => {
    if (!profileName) {
      setError('No profile data found. Please log in again.');
      return;
    }
    fetchProfile();
  }, [profileName, fetchProfile]);

  const handleUpdate = async (event) => {
    event.preventDefault();

    if (!profileName) {
      setMessage('Profile update failed. Missing profile name.');
      return;
    }

    setLoading(true);
    setError('');

    const encodedName = encodeURIComponent(profileName);
    const updateUrl = `${API_HOLIDAZE_URL}/profiles/${encodedName}`;

    const updatedProfile = {
      bio: bio.trim() || 'No bio provided',
      venueManager,
      ...(avatar.trim() && {
        avatar: { url: avatar.trim(), alt: avatarAlt || 'Default Avatar' },
      }),
      ...(banner.trim() && {
        banner: { url: banner.trim(), alt: bannerAlt || 'Default Banner' },
      }),
    };

    try {
      const response = await authFetch(updateUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify(updatedProfile),
      });

      if (response.errors) {
        setError('Profile update failed.');
        return;
      }

      localStorage.setItem('profile', JSON.stringify(response.data));
      setMessage('Profile updated successfully!');
      onProfileUpdate(response.data);
      setTimeout(() => closeModal(), 2000);
    } catch (error) {
      setError('Profile update failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!showModal) return null;

  return (
    <S.ModalBackdrop>
      <S.ModalContent>
        <S.ModalHeader>
          <h2>Update Profile</h2>
          <button onClick={closeModal} className="close-button">
            ×
          </button>
        </S.ModalHeader>
        <S.FormBackground>
          <S.FormContainer>
            <form onSubmit={handleUpdate}>
              <label htmlFor="avatar">Avatar URL:</label>
              <input
                id="avatar"
                type="text"
                value={avatar}
                onChange={(e) => setAvatar(e.target.value)}
                onFocus={(e) => e.target.select()}
              />

              <label htmlFor="avatarAlt">Avatar image description:</label>
              <input
                id="avatarAlt"
                type="text"
                value={avatarAlt}
                onChange={(e) => setAvatarAlt(e.target.value)}
                onFocus={(e) => e.target.select()}
              />

              <label htmlFor="banner">Banner URL:</label>
              <input
                id="banner"
                type="text"
                value={banner}
                onChange={(e) => setBanner(e.target.value)}
                onFocus={(e) => e.target.select()}
              />

              <label htmlFor="bannerAlt">Banner image description:</label>
              <input
                id="bannerAlt"
                type="text"
                value={bannerAlt}
                onChange={(e) => setBannerAlt(e.target.value)}
                onFocus={(e) => e.target.select()}
              />

              <label htmlFor="bio">Bio:</label>
              <textarea
                id="bio"
                value={bio}
                onChange={handleBioChange}
                onFocus={(e) => e.target.select()}
              />
              {bioError && <p className="alert-danger">{bioError}</p>}

              {!profileData?.venueManager && (
                <>
                  <label htmlFor="venueManager">
                    <input
                      id="venueManager"
                      type="checkbox"
                      checked={venueManager}
                      onChange={() => setVenueManager(!venueManager)}
                    />
                    Be a Venue Manager?
                  </label>
                  <p>
                    (Becoming a Venue Manager is permanent and cannot be
                    reversed.)
                  </p>
                </>
              )}
              {error && <p className="error">{error}</p>}

              <S.ButtonContainer>
                <S.UpdateButton type="submit" disabled={loading}>
                  {loading ? 'Updating...' : 'Update Profile'}
                </S.UpdateButton>
              </S.ButtonContainer>

              {message && <S.AlertSuccess>{message}</S.AlertSuccess>}
            </form>
          </S.FormContainer>
        </S.FormBackground>
        <S.CloseButton onClick={closeModal}>Close</S.CloseButton>
      </S.ModalContent>
    </S.ModalBackdrop>
  );
};

export default UpdateProfile;
