import { API_AUTH_URL } from './constants';

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

    // 🔥 Bruk vanlig fetch, IKKE authFetch
    const response = await fetch(`${API_AUTH_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Noroff-API-Key': '499331ba-2fa7-4908-bf07-4280374f9f87', // 🔑 API-nøkkel kreves for registrering
      },
      body: JSON.stringify(cleanProfile),
    });

    const data = await response.json();

    console.log('✅ Registrering fullført:', data);

    if (!response.ok) {
      throw new Error(data.errors?.[0]?.message || 'Registrering feilet');
    }

    return data;
  } catch (error) {
    console.error('❌ Feil ved registrering:', error);
    throw error;
  }
}
