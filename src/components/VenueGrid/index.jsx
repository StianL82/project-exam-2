import React from "react";
import VenueCard from "../VenueCard";
import * as S from "./index.styles";

function VenueGrid({ venues }) {
  return (
    <S.GridContainer>
      {venues.map((venue) => (
        <VenueCard key={venue.id} venue={venue} />
      ))}
    </S.GridContainer>
  );
}

export default VenueGrid;
