import React, { useState } from 'react';
import * as S from './index.styles';
import * as B from '../../styles/GlobalStyle';
import { API_HOLIDAZE_URL } from '../../auth/constants';
import { authFetch } from '../../auth/authFetch';
import DeleteConfirmationModal from '../DeleteConfirmationModal';
import BookingModal from '../BookingModal';

const BookingCard = ({ booking, onBookingDeleted }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [bookingData, setBookingData] = useState(booking); // Oppdatert state for bookingdata

  if (!bookingData || !bookingData.venue) {
    console.log('❌ Booking or venue data is missing:', bookingData);
    return null;
  }

  const { id, dateFrom, dateTo, guests, venue } = bookingData;
  const defaultImage = '/images/contact-section.png';

  const handleBookingUpdated = (updatedBooking) => {
    console.log('Updating booking data:', updatedBooking);
    setBookingData((prev) => ({
      ...prev,
      ...updatedBooking,
      venue: prev.venue, // Sørg for at venue-data beholdes
    }));
  };

  const handleDelete = async () => {
    console.log(`🗑 Attempting to delete booking with ID: ${id}`);
    try {
      const response = await authFetch(`${API_HOLIDAZE_URL}/bookings/${id}`, {
        method: 'DELETE',
      });

      if (response === null) {
        console.log('✅ Booking deleted successfully.');
        onBookingDeleted(id); // Oppdater bookings
        setShowDeleteModal(false);
      } else {
        console.error('❌ Failed to delete booking. Response:', response);
      }
    } catch (error) {
      console.error('❌ Error deleting booking:', error);
    }
  };

  return (
    <>
      <S.CardContainer>
        <S.Image
          src={venue.media?.[0]?.url || defaultImage}
          alt={venue.media?.[0]?.alt || 'Venue image'}
        />
        <S.CardContent>
          <S.Title>{venue.name}</S.Title>
          <S.Text>
            <strong>Booking Dates:</strong>{' '}
            {new Date(dateFrom).toLocaleDateString('en-GB')} -{' '}
            {new Date(dateTo).toLocaleDateString('en-GB')}
          </S.Text>
          <S.Text>
            <strong>Number of guests:</strong> {guests}
          </S.Text>
          <S.ButtonContainer>
            <B.OrangeButton as="a" href={`/venue/${venue.id}`}>
              View Venue
            </B.OrangeButton>
            <B.BlueButton onClick={() => setShowUpdateModal(true)}>
              Update Booking
            </B.BlueButton>
            <S.DeleteButton onClick={() => setShowDeleteModal(true)}>
              <S.IconImage
                src={`${process.env.PUBLIC_URL}/images/icons/trash.svg`}
                alt="Delete icon"
              />
            </S.DeleteButton>
          </S.ButtonContainer>
        </S.CardContent>
      </S.CardContainer>

      {/* DELETE CONFIRMATION MODAL */}
      <DeleteConfirmationModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        title="Delete Booking"
        message="Are you sure you want to delete this booking?"
      />

      {/* UPDATE BOOKING MODAL */}
      <BookingModal
        show={showUpdateModal}
        onClose={() => setShowUpdateModal(false)}
        price={venue.price}
        maxGuests={venue.maxGuests}
        venueId={venue.id}
        initialData={{ id, dateFrom, dateTo, guests }} // Send eksisterende bookingdata til modalen
        title="Update Booking"
        onBookingUpdated={handleBookingUpdated} // Oppdater kortet når bookingdata endres
      />
    </>
  );
};

export default BookingCard;
