import { authFetch } from '../authFetch';
import { API_AUTH_URL } from '../constants';

/**
 * Registers a new user by sending their data to the API.
 * @param {Object} userData - The user data to register.
 * @param {string} userData.name - The user's name.
 * @param {string} userData.email - The user's email address.
 * @param {string} userData.password - The user's password.
 * @param {string} [userData.avatar] - The URL of the user's avatar (optional).
 * @param {string} [userData.avatarAlt] - Alt text for the avatar (optional).
 * @param {boolean} [userData.venueManager] - Indicates if the user is a venue manager.
 * @returns {Promise<Object>} The registered user data.
 * @throws Will throw an error if the registration fails or the email is already registered.
 */
const registerUser = async (userData) => {
  try {
    if (userData.avatar) {
      userData.avatar = {
        url: userData.avatar || null,
        alt: userData.avatarAlt || '',
      };
    } else {
      delete userData.avatar;
    }
    delete userData.avatarAlt;

    const result = await authFetch(`${API_AUTH_URL}/register`, {
      method: 'POST',
      body: JSON.stringify(userData),
    });

    return result;
  } catch (error) {
    if (error.message.includes('already exists')) {
      throw new Error('The email address is already registered.');
    }
    throw error;
  }
};

export default registerUser;
