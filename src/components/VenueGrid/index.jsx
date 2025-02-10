import React from 'react';
import VenueCard from '../VenueCard';
import * as S from './index.styles';

function VenueGrid({ venues }) {
  const uniqueVenues = venues.filter(
    (venue, index, self) => index === self.findIndex((v) => v.id === venue.id)
  );

  return (
    <S.GridContainer>
      {uniqueVenues.map((venue) => (
        <VenueCard key={venue.id} venue={venue} />
      ))}
    </S.GridContainer>
  );
}

export default VenueGrid;
