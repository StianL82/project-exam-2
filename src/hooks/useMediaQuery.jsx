import { useState, useEffect } from 'react';

/**
 * useMediaQuery Hook
 *
 * A custom hook that listens for changes in a CSS media query and returns a boolean
 * indicating whether the query matches.
 *
 * @param {string} query - The CSS media query to listen for (e.g., "(max-width: 768px)").
 * @returns {boolean} `true` if the media query matches, otherwise `false`.
 */

const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(window.matchMedia(query).matches);

  useEffect(() => {
    const media = window.matchMedia(query);
    const listener = () => setMatches(media.matches);

    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [query]);

  return matches;
};

export default useMediaQuery;
