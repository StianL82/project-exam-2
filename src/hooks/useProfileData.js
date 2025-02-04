import { useState, useEffect } from 'react';
import { authFetch } from '../auth/authFetch';

/**
 * Custom hook for fetching profile data from Holidaze API.
 * @param {string} name - The username (profile name) to fetch profile data for.
 * @returns {object} An object containing profile data, loading state, and errors.
 */
export default function useProfileData(name) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchProfile() {
      if (!name) {
        setError('Username is missing.');
        setLoading(false);
        return;
      }

      try {
        const encodedName = encodeURIComponent(name.trim());
        const url = `https://api.noroff.dev/api/v1/holidaze/profiles/${encodedName}?_holidaze=true`;

        console.log('🔍 Fetching profile from API:', url);

        const data = await authFetch(url, {
          method: 'GET',
        });

        console.log('🔥 Profile data received:', data);

        if (data.errors) {
          throw new Error(data.errors[0].message || 'Profile not found.');
        }

        setProfile(data);
      } catch (err) {
        console.error('❌ Error fetching profile:', err.message);
        setError(err.message || 'Failed to load profile.');
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, [name]);

  return { profile, loading, error, setProfile };
}

