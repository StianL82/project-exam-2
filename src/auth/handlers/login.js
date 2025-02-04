import { loginUser } from '../auth/login';

/**
 * Setter event listener på innloggingsskjemaet.
 */
export function setLoginFormListener() {
  const form = document.querySelector('#loginForm');

  if (form) {
    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      const formData = new FormData(form);
      const profile = Object.fromEntries(formData.entries());

      try {
        await loginUser(profile);
      } catch (error) {
        console.error('❌ Feil under innlogging:', error);
      }
    });
  } else {
    console.error('Login form not found.');
  }
}
