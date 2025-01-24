import { remove } from '../../storage/remove';

/**
 * Logs out the user by clearing authentication data and navigating to the home page.
 * @param {Function} setIsLoggedIn - Updates the logged-in state.
 * @param {Function} navigate - Navigates to a specified route.
 */
const logOutUser = (setIsLoggedIn, navigate) => {
  try {
    remove('accessToken');
    remove('profile');
    setIsLoggedIn(false);
    navigate('/');
  } catch (error) {
    console.error('Error during logout:', error);
  }
};

export default logOutUser;
