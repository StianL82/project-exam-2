import { loginUser } from '../auth/login';

/**
 * Initializes the event listener for the login form submission.
 * This function prevents the default form submission behavior,
 * extracts user credentials, and attempts to log in.
 */
export function setLoginFormListener() {
  const form = document.querySelector('#loginForm');

  if (!form) {
    console.error('Login form not found.');
    return;
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const profile = Object.fromEntries(formData.entries());

    try {
      await loginUser(profile);
    } catch (error) {
      console.error('Login error:', error);
    }
  });
}
