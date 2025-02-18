import { API_AUTH_URL, API_KEY } from './constants';

/**
 * Logs in a user via the API.
 * @param {Object} credentials - User credentials (email, password).
 * @returns {Promise<Object>} API response containing user data and access token.
 * @throws {Error} If login fails or response is invalid.
 */
export async function loginUser(credentials) {
  try {
    const response = await fetch(`${API_AUTH_URL}/login?_holidaze=true`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Noroff-API-Key': API_KEY,
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }

    const { data } = await response.json();
    if (!data?.accessToken) {
      throw new Error('Login response missing accessToken.');
    }

    const { accessToken, ...user } = data;

    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('profile', JSON.stringify(user));

    return data;
  } catch (error) {
    throw new Error(`Login failed: ${error.message}`);
  }
}
