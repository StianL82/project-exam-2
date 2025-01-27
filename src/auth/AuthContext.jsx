import React, { createContext, useState, useEffect, useContext } from 'react';

/**
 * Context for managing user authentication state.
 */
const AuthContext = createContext();

/**
 * Custom hook to access the authentication context.
 *
 * @returns {Object} An object containing the login state (`isLoggedIn`) and the function to update it (`updateLoggedInStatus`).
 */
export const useAuth = () => useContext(AuthContext);

/**
 * AuthProvider component to provide authentication state and functionality to its children.
 *
 * @param {Object} props - Component props.
 * @param {React.ReactNode} props.children - The components that will consume the authentication context.
 * @returns {JSX.Element} The provider component that wraps its children with authentication context.
 */
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  /**
   * Updates the login status based on the presence of an access token in localStorage.
   */
  const updateLoggedInStatus = () => {
    const token = localStorage.getItem('accessToken');
    setIsLoggedIn(!!token);
  };

  useEffect(() => {
    updateLoggedInStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, updateLoggedInStatus }}>
      {children}
    </AuthContext.Provider>
  );
};
