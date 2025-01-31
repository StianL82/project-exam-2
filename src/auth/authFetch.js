import { API_KEY } from './constants';
import { load } from '../storage/load';

/**
 * Generates headers for API requests, including content type, authorization (if available), and API key.
 *
 * @returns {Object} An object containing HTTP headers for API requests.
 */
export function headers() {
  const token = load('accessToken');
  const envApiKey = process.env.REACT_APP_API_KEY; // Direkte fra miljøvariabler
  const finalApiKey = API_KEY || envApiKey; // Prioriterer API_KEY fra constants.js

  console.log('🔑 API Key from constants.js:', API_KEY);
  console.log('🌍 API Key from process.env:', envApiKey);
  console.log('✅ Final API Key used in headers:', finalApiKey);
  console.log('🛠 Environment variables available in runtime:', process.env);

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
    const requestHeaders = headers();
    console.log('📡 Sending request to:', url);
    console.log('📡 Request headers:', requestHeaders);

    const response = await fetch(url, {
      ...options,
      headers: {
        ...requestHeaders, // Merge default headers with any provided in options
        ...options.headers,
      },
    });

    console.log('📡 Response status:', response.status);
    console.log('📡 Response headers:', response.headers);

    if (!response.ok) {
      const errorData = await response.json();
      console.error('❌ Fetch failed with response:', errorData);
      throw new Error(
        `Error: ${response.status} ${response.statusText} - ${errorData.message || 'Unknown error'}`
      );
    }

    console.log('✅ Fetch successful:', response);
    return response.json();
  } catch (error) {
    console.error('❌ authFetch error:', error);
    throw error;
  }
}
