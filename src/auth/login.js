import { API_AUTH_URL } from './constants';

/**
 * Logger inn en bruker i API-et.
 * @param {Object} credentials - Brukerdata for innlogging (email, password).
 * @returns {Promise<Object>} API-respons med brukerdata og token.
 */
export async function loginUser(credentials) {
  try {
    console.log('🔑 Prøver å logge inn med:', credentials);

    const response = await fetch(`${API_AUTH_URL}/login?_holidaze=true`, {
      // 🔥 Bruker query param
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Noroff-API-Key': '499331ba-2fa7-4908-bf07-4280374f9f87',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error(
        `❌ Feil under innlogging: ${response.status} ${response.statusText}`
      );
    }

    const responseData = await response.json();
    console.log('✅ Innlogging vellykket:', responseData);

    // 🔥 Hent riktig accessToken
    const userData = responseData.data; // <--- Henter riktig data med _holidaze=true
    if (!userData || !userData.accessToken) {
      throw new Error('❌ Login response mangler `accessToken`.');
    }

    const { accessToken, ...user } = userData;

    // 🔥 Lagre accessToken riktig
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('profile', JSON.stringify(user));

    return userData;
  } catch (error) {
    console.error('❌ Feil ved innlogging:', error);
    throw error;
  }
}
