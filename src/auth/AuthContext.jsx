import React, { createContext, useState, useEffect, useContext } from 'react';

/**
 * Context for managing user authentication state.
 */
const AuthContext = createContext();

/**
 * Custom hook to access the authentication context.
 *
 * @returns {Object} Authentication state and functions.
 */
export const useAuth = () => useContext(AuthContext);

/**
 * AuthProvider component to provide authentication state and functionality to its children.
 */
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState(null); // 👈 Lagrer brukernavnet globalt

  /**
   * Updates the login status and fetches the username.
   */
  const updateLoggedInStatus = () => {
    const token = localStorage.getItem('accessToken');
    const profile = JSON.parse(localStorage.getItem('profile')) || {}; // Henter profilinfo
    setIsLoggedIn(!!token);
    setUsername(profile?.name || null); // Oppdaterer brukernavn
  };

  useEffect(() => {
    updateLoggedInStatus();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, username, updateLoggedInStatus }}
    >
      {children}
    </AuthContext.Provider>
  );
};
