import React from 'react';
import VenueCard from '../VenueCard';
import * as S from './index.styles';

/**
 * VenueGrid Component
 *
 * Displays a grid of unique venue cards.
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {Array<Object>} props.venues - List of venue objects.
 * @param {boolean} props.showEditDelete - Determines if edit/delete buttons are shown.
 * @param {Function} props.onEdit - Callback function for editing a venue.
 * @param {Function} props.onDelete - Callback function for deleting a venue.
 *
 * @returns {JSX.Element} A grid layout containing venue cards.
 */

function VenueGrid({ venues, showEditDelete, onEdit, onDelete }) {
  const uniqueVenues = venues.filter(
    (venue, index, self) => index === self.findIndex((v) => v.id === venue.id)
  );

  return (
    <S.GridContainer>
      {uniqueVenues.map((venue) => (
        <VenueCard
          key={venue.id}
          venue={venue}
          showEditDelete={showEditDelete}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </S.GridContainer>
  );
}

export default VenueGrid;
