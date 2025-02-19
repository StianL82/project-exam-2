import React, { useState } from 'react';
import * as S from './index.styles';
import * as B from '../../styles/GlobalStyle';
import { API_HOLIDAZE_URL } from '../../auth/constants';
import { authFetch } from '../../auth/authFetch';
import DeleteConfirmationModal from '../DeleteConfirmationModal';
import BookingModal from '../BookingModal';

/**
 * Component displaying a booking card with details, update, and delete options.
 * @param {Object} props - Component properties.
 * @param {Object} props.booking - The booking data.
 * @param {Function} props.onBookingDeleted - Callback triggered when a booking is deleted.
 * @returns {JSX.Element|null} The rendered booking card or null if data is missing.
 */
const BookingCard = ({ booking, onBookingDeleted }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [bookingData, setBookingData] = useState(booking);

  if (!bookingData || !bookingData.venue) {
    return null;
  }

  const { id, dateFrom, dateTo, guests, venue } = bookingData;
  const defaultImage = '/images/contact-section.png';

  /**
   * Updates the booking data after a successful update.
   * @param {Object} updatedBooking - The updated booking details.
   */
  const handleBookingUpdated = (updatedBooking) => {
    setBookingData((prev) => ({
      ...prev,
      ...updatedBooking,
      venue: prev.venue,
    }));
  };

  /**
   * Deletes the booking from the API and triggers the callback.
   */
  const handleDelete = async () => {
    try {
      const response = await authFetch(`${API_HOLIDAZE_URL}/bookings/${id}`, {
        method: 'DELETE',
      });

      if (response === null) {
        onBookingDeleted(id);
        setShowDeleteModal(false);
      }
    } catch (error) {
      throw new Error(`Error deleting booking: ${error.message}`);
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
        initialData={{ id, dateFrom, dateTo, guests }}
        title="Update Booking"
        onBookingUpdated={handleBookingUpdated}
      />
    </>
  );
};

export default BookingCard;
