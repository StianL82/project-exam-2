import { API_KEY } from './constants';
import { load } from '../storage/load';

/**
 * Generates headers for API requests, including content type, authorization (if available), and API key.
 *
 * @returns {Object} An object containing HTTP headers for API requests.
 */
export function headers() {
  const token = load('accessToken');
  const envApiKey = process.env.REACT_APP_API_KEY;
  const finalApiKey = API_KEY || envApiKey;

  return {
    'Content-Type': 'application/json',
    Authorization: token ? `Bearer ${token}` : '',
    'X-Noroff-API-Key': finalApiKey,
  };
}

/**
 * Performs a fetch request with authentication headers and error handling.
 *
 * @async
 * @param {string} url - The API endpoint to send the request to.
 * @param {Object} [options={}] - Optional configuration for the fetch request, including method, body, and additional headers.
 * @returns {Promise<Object>} The parsed JSON response from the API.
 * @throws {Error} If the response is not successful, throws an error including the status code, status text, and error message.
 */
export async function authFetch(url, options = {}) {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...headers(),
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Error: ${response.status} ${response.statusText} - ${errorData.message || 'Unknown error'}`
      );
    }

    return response.json();
  } catch (error) {
    console.error('authFetch error:', error);
    throw error;
  }
}
