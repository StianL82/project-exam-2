import { remove } from '../../storage/remove';

/**
 * Logs out the user by clearing authentication data and navigating to the home page.
 * @param {Function} setIsLoggedIn - Updates the logged-in state.
 * @param {Function} navigate - Navigates to a specified route.
 * @param {Function} setError - Updates the error state with the message.
 */
const logOutUser = (setIsLoggedIn, navigate, setError) => {
  try {
    remove('accessToken');
    remove('profile');
    setIsLoggedIn(false);
    navigate('/');
  } catch (error) {
    setError('An error occurred during logout. Please try again.');
  }
};

export default logOutUser;
