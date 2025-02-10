import React from 'react';
import VenueCard from '../VenueCard';
import * as S from './index.styles';

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
