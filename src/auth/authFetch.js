import { API_KEY } from './constants';
import { load } from '../storage/load';

export function headers() {
  const token = load('token');

  return {
    'Content-Type': 'application/json',
    Authorization: token ? `Bearer ${token}` : '',
    'X-Noroff-API-Key': API_KEY,
  };
}

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
