import { API_KEY } from './constants';

/**
 * Provides headers for API requests, including authentication and API key.
 * @returns {Object} Headers for API requests.
 */
export function headers() {
  const token = localStorage.getItem('accessToken');

  return {
    'Content-Type': 'application/json',
    Authorization: token ? `Bearer ${token}` : '',
    'X-Noroff-API-Key': API_KEY,
  };
}

/**
 * Performs an authenticated fetch request with error handling.
 * @param {string} url - The API endpoint.
 * @param {Object} [options={}] - Fetch configuration.
 * @returns {Promise<Object|null>} JSON response from the API or null if no content.
 */
export async function authFetch(url, options = {}) {
  const token = localStorage.getItem('accessToken');
  if (!token) return { errors: [{ message: 'Unauthorized' }] };

  const response = await fetch(url, { ...options, headers: headers() });

  if (!response.ok) {
    return { errors: [{ message: response.statusText }] };
  }

  if (response.status === 204) return null;

  try {
    return await response.json();
  } catch {
    return { errors: [{ message: 'JSON parsing failed' }] };
  }
}
