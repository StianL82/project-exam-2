import React, { createContext, useState, useEffect, useContext } from 'react';

/**
 * Authentication context for managing user login state.
 */
const AuthContext = createContext();

/**
 * Custom hook to access authentication state.
 */
export const useAuth = () => useContext(AuthContext);

/**
 * Provides authentication state and functions to child components.
 */
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState(null);

  /** Checks if the user is logged in and updates state accordingly. */
  const updateLoggedInStatus = () => {
    const token = localStorage.getItem('accessToken');
    const profile = JSON.parse(localStorage.getItem('profile')) || {};
    setIsLoggedIn(Boolean(token));
    setUsername(profile?.name || null);
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
