import { authFetch } from '../authFetch';
import { API_AUTH_URL } from '../constants';
import { save } from '../../storage/save';

/**
 * Authenticates a user by sending their credentials to the login endpoint.
 * @async
 * @function loginUser
 * @param {Object} credentials - The user's login details.
 * @param {string} credentials.email - The user's email address.
 * @param {string} credentials.password - The user's password.
 * @returns {Promise<Object>} The user data returned from the API.
 * @throws {Error} If the login fails or if the credentials are incorrect.
 */
const loginUser = async (credentials, updateLoggedInStatus) => {
  try {
    const result = await authFetch(`${API_AUTH_URL}/login?_holidaze=true`, {
      method: 'POST',
      body: JSON.stringify(credentials),
    });

    console.log('Login result with _holidaze:', result); // Debug log

    if (result.data && result.data.accessToken) {
      save('accessToken', result.data.accessToken);
      save('profile', result.data);

      if (updateLoggedInStatus) {
        updateLoggedInStatus();
      }
    }

    return result;
  } catch (error) {
    if (error.message.includes('Invalid email or password')) {
      throw new Error('Incorrect email or password. Please try again.');
    }
    throw error;
  }
};

export default loginUser;
