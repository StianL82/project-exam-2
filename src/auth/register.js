import { API_AUTH_URL, API_KEY } from './constants';

/**
 * Registers a new user via the API.
 * @param {Object} profile - User registration data.
 * @returns {Promise<Object>} API response with user details.
 * @throws {Error} If registration fails.
 */
export async function registerUser(profile) {
  try {
    const cleanProfile = {
      name: profile.name.trim(),
      email: profile.email.trim(),
      password: profile.password,
      venueManager: profile.venueManager ?? false,
    };

    if (profile.avatar?.trim()) {
      cleanProfile.avatar = {
        url: profile.avatar.trim(),
        alt: profile.avatarAlt?.trim() || '',
      };
    }

    const response = await fetch(`${API_AUTH_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Noroff-API-Key': API_KEY,
      },
      body: JSON.stringify(cleanProfile),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.errors?.[0]?.message || 'Registration failed');
    }

    return data;
  } catch (error) {
    throw new Error(`Registration failed: ${error.message}`);
  }
}
