import React from 'react';
import * as S from './index.styles';

/**
 * BookingCard Component
 * @param {Object} booking - The booking data to display
 * @returns {JSX.Element} - A styled booking card
 */
const BookingCard = ({ booking }) => {
  if (!booking || !booking.venue) return null;

  const { dateFrom, dateTo, guests, venue } = booking;
  const formattedDateFrom = new Date(dateFrom).toLocaleDateString('en-GB');
  const formattedDateTo = new Date(dateTo).toLocaleDateString('en-GB');

  return (
    <S.CardContainer>
      <S.Image
        src={venue.media?.[0]?.url || '/images/default-image.jpg'}
        alt={venue.media?.[0]?.alt || 'Venue image'}
      />
      <S.CardContent>
        <S.Title>{venue.name}</S.Title>
        <S.Text>
          <strong>Booking Dates:</strong> {formattedDateFrom} -{' '}
          {formattedDateTo}
        </S.Text>
        <S.Text>
          <strong>Number of guests:</strong> {guests}
        </S.Text>
        <S.ButtonContainer>
          <S.ViewButton>View Venue</S.ViewButton>
          <S.UpdateButton>Update Booking</S.UpdateButton>
          <S.DeleteButton>🗑</S.DeleteButton>
        </S.ButtonContainer>
      </S.CardContent>
    </S.CardContainer>
  );
};

export default BookingCard;
