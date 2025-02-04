import { registerUser } from '../auth/register';

/**
 * Setter event listener på registreringsskjemaet.
 */
export function setRegisterFormListener() {
  const form = document.querySelector('#registerForm');

  if (form) {
    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      const formData = new FormData(form);
      const profile = Object.fromEntries(formData.entries());

      // ✅ Sikrer at venueManager alltid er en boolean (true/false)
      profile.venueManager = profile.venueManager === 'on';

      // ✅ Fjerner avatar hvis ingen URL er oppgitt
      if (profile.avatar_url?.trim()) {
        profile.avatar = {
          url: profile.avatar_url.trim(),
          alt: profile.avatar_alt?.trim() || '',
        };
      } else {
        profile.avatar = null; // API-et godtar null for avatar
      }

      delete profile.avatar_url;
      delete profile.avatar_alt;

      try {
        await registerUser(profile);
      } catch (error) {
        console.error('❌ Registrering feilet:', error);
      }
    });
  }
}
