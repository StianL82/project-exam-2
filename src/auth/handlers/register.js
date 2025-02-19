import { registerUser } from '../auth/register';

/**
 * Adds an event listener to the registration form and handles user registration.
 */
export function setRegisterFormListener(setError) {
  const form = document.querySelector('#registerForm');

  if (form) {
    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      const formData = new FormData(form);
      const profile = Object.fromEntries(formData.entries());

      profile.venueManager = profile.venueManager === 'on';

      if (profile.avatar_url?.trim()) {
        profile.avatar = {
          url: profile.avatar_url.trim(),
          alt: profile.avatar_alt?.trim() || '',
        };
      } else {
        profile.avatar = null;
      }

      delete profile.avatar_url;
      delete profile.avatar_alt;

      try {
        await registerUser(profile);
      } catch (error) {
        setError(
          'Registration failed due to a server error. Please try again later.'
        );
      }
    });
  }
}
