import React from 'react';
import * as S from './index.styles';
import { Link } from 'react-router-dom';

function VenueCard({ venue }) {
  const { name, media, price, rating, meta } = venue;

  const defaultImage = '/images/contact-section.png';

  const icons = {
    wifi: meta?.wifi ? '/images/icons/wifi.svg' : null,
    parking: meta?.parking ? '/images/icons/parking.svg' : null,
    breakfast: meta?.breakfast ? '/images/icons/breakfast.svg' : null,
    pets: meta?.pets ? '/images/icons/pets.svg' : null,
  };

  return (
    <S.Card as={Link} to={`/venue/${venue.id}`}>
      <S.ImageContainer>
        <S.Image
          src={media?.[0]?.url || defaultImage}
          alt={media?.[0]?.alt || `this is the venue image for ${name}`}
          onError={(e) => (e.target.src = defaultImage)}
        />
        <S.Rating>
          {[...Array(Math.round(rating || 0))].map((_, i) => (
            <S.StarIcon key={i} src="/images/icons/star.svg" alt="" />
          ))}
        </S.Rating>
      </S.ImageContainer>
      <S.InfoContainer>
        <S.Title>{name}</S.Title>
        <S.Price>{price} NOK,- / night</S.Price>
        <S.IconContainer>
          {Object.entries(icons).map(([key, icon], index) =>
            icon ? (
              <S.Icon
                key={index}
                src={icon}
                alt=""
              />
            ) : null
          )}
        </S.IconContainer>
      </S.InfoContainer>
      <S.Button>View Venue</S.Button>
    </S.Card>
  );
}

export default VenueCard;
