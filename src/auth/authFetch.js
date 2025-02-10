import { API_KEY } from './constants';

/**
 * Genererer headers for API-forespørsler.
 * @returns {Object} Headers inkludert auth-token og API-nøkkel.
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
 * Utfører en fetch-forespørsel med autentiseringsheaders og feilbehandling.
 * @param {string} url - API-endepunktet.
 * @param {Object} [options={}] - Konfigurasjon for fetch.
 * @returns {Promise<Object>} JSON-respons fra API.
 */
export async function authFetch(url, options = {}) {
  const token = localStorage.getItem('accessToken');

  if (!token) {
    console.error('❌ authFetch error: Ingen token funnet i LocalStorage.');
    return { errors: [{ message: 'Unauthorized' }] };
  }

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
    'X-Noroff-API-Key': '499331ba-2fa7-4908-bf07-4280374f9f87',
  };

  const response = await fetch(url, { ...options, headers });

  if (!response.ok) {
    console.error(
      `❌ authFetch error: ${response.status} - ${response.statusText}`
    );
    return { errors: [{ message: response.statusText }] };
  }

  return response.json();
}
