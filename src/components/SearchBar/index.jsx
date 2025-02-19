import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import * as S from './index.styles';

/**
 * SearchBar Component
 *
 * A search input field with a debounced search functionality.
 * Calls the `onSearch` function with the search term after a short delay.
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {Function} props.onSearch - Function to handle search input updates.
 * @returns {JSX.Element} A styled search bar with an icon.
 */

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      onSearch(searchTerm);
    }, 300);

    return () => {
      clearTimeout(debounceTimeout);
    };
  }, [searchTerm, onSearch]);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <S.SearchContainer>
      <label htmlFor="search" className="sr-only">
        Search for Venue
      </label>
      <FaSearch className="search-icon" />
      <S.Input
        id="search"
        type="text"
        placeholder="Search for a specific Venue..."
        value={searchTerm}
        onChange={handleInputChange}
      />
    </S.SearchContainer>
  );
}

export default SearchBar;
