import { API_AUTH_URL } from './constants';
import { authFetch } from './authFetch';

/**
 * Registrerer en ny bruker i API-et.
 *
 * @param {Object} profile - Brukerdata for registrering.
 * @returns {Promise<Object>} API-respons med brukerdetaljer.
 */
export async function registerUser(profile) {
  try {
    console.log('🚀 Registrerer bruker:', profile);

    // Fjerner tomme verdier før vi sender til API-et
    const cleanProfile = {
      name: profile.name.trim(),
      email: profile.email.trim(),
      password: profile.password, // ✅ Beholder passordet
      venueManager: profile.venueManager ?? false, // ✅ Setter alltid en verdi (true/false)
    };

    // ✅ Kun legg til avatar hvis URL finnes
    if (profile.avatar?.trim()) {
      cleanProfile.avatar = {
        url: profile.avatar.trim(),
        alt: profile.avatarAlt?.trim() || '',
      };
    }

    console.log('📤 Sender registreringsdata:', cleanProfile);

    // Utfører API-kallet
    const response = await authFetch(`${API_AUTH_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cleanProfile),
    });

    console.log('✅ Registrering fullført:', response);
    return response;
  } catch (error) {
    console.error('❌ Feil ved registrering:', error);
    throw error;
  }
}
