import React from 'react';
import * as S from './index.styles';

const MyVenueBookingCard = ({ venue }) => {
  const { name, media, bookings } = venue;
  const defaultImage = '/images/contact-section.png';

  return (
    <S.Card>
      <S.ImageContainer>
        <S.Image
          src={media?.[0]?.url || defaultImage}
          alt={media?.[0]?.alt || 'Venue image'}
        />
      </S.ImageContainer>
      <S.Content>
        <S.Title>Bookings for: {name}</S.Title>
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <S.BookingInfo key={booking.id}>
              <S.Row>
                <S.Label>Customer:</S.Label>
                <S.Value>{booking.customer.name}</S.Value>
              </S.Row>
              <S.Row>
                <S.Label>Booking Dates:</S.Label>
                <S.Value>
                  {new Date(booking.dateFrom).toLocaleDateString('en-GB')} -{' '}
                  {new Date(booking.dateTo).toLocaleDateString('en-GB')}
                </S.Value>
              </S.Row>
              <S.Row>
                <S.Label>Guests:</S.Label>
                <S.Value>{booking.guests}</S.Value>
              </S.Row>
            </S.BookingInfo>
          ))
        ) : (
          <S.NoBookings>No bookings for this venue yet.</S.NoBookings>
        )}
      </S.Content>
    </S.Card>
  );
};

export default MyVenueBookingCard;
