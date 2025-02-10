import React, { useState } from 'react';
import * as S from './index.styles';
import { API_HOLIDAZE_URL } from '../../auth/constants';
import { authFetch } from '../../auth/authFetch';
import DeleteConfirmationModal from '../DeleteConfirmationModal';

const BookingCard = ({ booking, onBookingDeleted }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  if (!booking || !booking.venue) {
    console.log('❌ Booking or venue data is missing:', booking);
    return null;
  }

  const { id, dateFrom, dateTo, guests, venue } = booking;

  const handleDelete = async () => {
    console.log(`🗑 Attempting to delete booking with ID: ${id}`);

    try {
      const response = await authFetch(`${API_HOLIDAZE_URL}/bookings/${id}`, {
        method: 'DELETE',
      });

      if (response === null) {
        // Sjekk om responsen er null
        console.log('✅ Booking deleted successfully.');
        onBookingDeleted(id); // Oppdaterer bookings
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
          src={venue.media?.[0]?.url || '/images/default-image.jpg'}
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
            <S.ViewButton>View Venue</S.ViewButton>
            <S.UpdateButton>Update Booking</S.UpdateButton>
            <S.DeleteButton onClick={() => setShowDeleteModal(true)}>
              <S.IconImage
                src={`${process.env.PUBLIC_URL}/images/icons/trash.svg`}
                alt="Delete icon"
              />
            </S.DeleteButton>
          </S.ButtonContainer>
        </S.CardContent>
      </S.CardContainer>

      <DeleteConfirmationModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
      />
    </>
  );
};

export default BookingCard;
