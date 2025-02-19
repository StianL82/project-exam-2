import React from 'react';
import * as S from './index.styles';

/**
 * MyVenueBookingCard Component
 *
 * Displays booking information for a specific venue, including customer name,
 * booking dates, and number of guests. If no bookings exist, a fallback message is shown.
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {Object} props.venue - The venue data.
 * @param {string} props.venue.name - The name of the venue.
 * @param {Array<Object>} props.venue.media - The media associated with the venue.
 * @param {string} props.venue.media[].url - The URL of the venue image.
 * @param {string} [props.venue.media[].alt] - The alternative text for the image.
 * @param {Array<Object>} props.venue.bookings - List of bookings for the venue.
 * @param {string} props.venue.bookings[].id - The unique ID of the booking.
 * @param {Object} props.venue.bookings[].customer - Customer information.
 * @param {string} props.venue.bookings[].customer.name - The customer's name.
 * @param {string} props.venue.bookings[].dateFrom - The start date of the booking.
 * @param {string} props.venue.bookings[].dateTo - The end date of the booking.
 * @param {number} props.venue.bookings[].guests - The number of guests for the booking.
 *
 * @returns {JSX.Element} A styled card displaying booking details for the venue.
 */

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
