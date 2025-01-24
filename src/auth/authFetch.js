import { API_KEY } from './constants';
import { load } from '../storage/load';

/**
 * Generates headers for API requests, including content type, authorization, and API key.
 *
 * @returns {Object} Headers object for API requests.
 */
export function headers() {
  const token = load('token');

  return {
    'Content-Type': 'application/json',
    Authorization: token ? `Bearer ${token}` : '',
    'X-Noroff-API-Key': API_KEY,
  };
}

/**
 * A wrapper function for the Fetch API that includes default headers and handles errors.
 *
 * @async
 * @param {string} url - The URL to fetch.
 * @param {Object} [options={}] - Additional options for the fetch request (e.g., method, body, headers).
 * @returns {Promise<Object>} - The parsed JSON response from the API.
 * @throws {Error} Throws an error if the response is not ok, including status and error message.
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
        `Error: ${response.status} ${response.statusText} - ${errorData.message}`
      );
    }

    return response.json();
  } catch (error) {
    console.error('authFetch error:', error);
    throw error;
  }
}

