import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BookingCalendar from '../Calendar';
import * as S from './index.styles';
import { API_HOLIDAZE_URL } from '../../auth/constants';
import { authFetch } from '../../auth/authFetch';

/**
 * Booking Modal Component
 * @param {Object} props - Component props
 * @param {Array} unavailableDates - Dates that are unavailable
 * @param {Function} onClose - Function to close the modal
 * @param {number} price - Price per night for the venue
 * @param {number} maxGuests - Maximum number of guests allowed
 * @param {boolean} show - Controls whether the modal is visible
 * @param {string} venueId - The ID of the venue being booked
 * @returns {JSX.Element|null} The rendered booking modal or null if not visible
 */
const BookingModal = ({
  unavailableDates,
  onClose,
  price,
  maxGuests,
  show,
  venueId,
}) => {
  const navigate = useNavigate();
  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(null);
  const [guests, setGuests] = useState(1);
  const [loading, setLoading] = useState(false);

  const [alertMessage, setAlertMessage] = useState('');

  const showAlert = (message) => {
    setAlertMessage(message);
  };

  const resetForm = () => {
    setDateFrom(null);
    setDateTo(null);
    setGuests(1);
  };

  const calculatePrice = () => {
    if (!dateFrom || !dateTo) return 0;

    const nights =
      (new Date(dateTo).setHours(0, 0, 0, 0) -
        new Date(dateFrom).setHours(0, 0, 0, 0)) /
      (1000 * 60 * 60 * 24);

    return Number((nights * price * guests).toFixed(2));
  };

  const handleDateFromChange = (selectedDate) => {
    setDateFrom(selectedDate);
    const nextDay = new Date(selectedDate);
    nextDay.setDate(nextDay.getDate() + 1);
    setDateTo(nextDay);
  };

  const handleDateToChange = (selectedDate) => {
    if (!dateFrom) return;

    const toDate = new Date(selectedDate).setHours(0, 0, 0, 0);

    let currentDate = new Date(dateFrom);
    currentDate.setDate(currentDate.getDate() + 1);

    while (currentDate < toDate) {
      const formattedDate = currentDate.toISOString().split('T')[0];
      if (unavailableDates.includes(formattedDate)) {
        return;
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    setDateTo(selectedDate);
  };

  const handleConfirmBooking = async () => {
    console.log('Confirm button clicked');
    console.log('dateFrom:', dateFrom);
    console.log('dateTo:', dateTo);
    console.log('guests:', guests);
    console.log('venueId:', venueId);

    if (!dateFrom || !dateTo || !guests || !venueId) {
      showAlert('Please select valid check-in and check-out dates.');
      return;
    }

    setLoading(true);

    const adjustedDateFrom = new Date(dateFrom);
    adjustedDateFrom.setUTCHours(12, 0, 0, 0);

    const adjustedDateTo = new Date(dateTo);
    adjustedDateTo.setHours(12, 0, 0, 0);

    const bookingData = {
      dateFrom: adjustedDateFrom.toISOString(),
      dateTo: adjustedDateTo.toISOString(),
      guests: guests,
      venueId: venueId,
    };

    console.log('Sending bookingData:', bookingData);

    try {
      const data = await authFetch(`${API_HOLIDAZE_URL}/bookings`, {
        method: 'POST',
        body: JSON.stringify(bookingData),
      });

      console.log('Booking successful:', data);
      showAlert('Booking successful! Redirecting to your profile page.');

      setTimeout(() => {
        navigate('/profile/:username');
      }, 3000);
    } catch (error) {
      console.error('Error creating booking:', error);
      alert('An error occurred while making the booking.');
    } finally {
      setLoading(false);
    }
  };
  const tileClassName = ({ date }) => {
    if (!dateFrom || !dateTo) return '';

    const formattedDate = date.toISOString().split('T')[0];

    if (
      formattedDate === dateFrom.toISOString().split('T')[0] ||
      formattedDate === dateTo.toISOString().split('T')[0]
    ) {
      return 'selected-range';
    }

    if (
      formattedDate > dateFrom.toISOString().split('T')[0] &&
      formattedDate < dateTo.toISOString().split('T')[0]
    ) {
      return 'selected-in-between';
    }

    return '';
  };

  if (!show) {
    return null;
  }

  return (
    <S.ModalBackdrop>
      <S.ModalContainer>
        <S.ModalHeader>
          <h2>New Booking</h2>
          <button
            onClick={() => {
              resetForm();
              onClose();
            }}
          >
            &times;
          </button>
        </S.ModalHeader>
        <S.ModalBody>
          <div className="calendar-section">
            <div>
              <h3>Date From:</h3>
              <BookingCalendar
                selectedDate={dateFrom}
                onDateChange={handleDateFromChange}
                disabledDates={unavailableDates.map(
                  (date) => new Date(date).toISOString().split('T')[0]
                )}
                minDate={new Date()}
                tileClassName={tileClassName}
              />
            </div>
            <div>
              <h3>Date To:</h3>
              <BookingCalendar
                selectedDate={dateTo}
                onDateChange={handleDateToChange}
                disabledDates={unavailableDates.map(
                  (date) => new Date(date).toISOString().split('T')[0]
                )}
                minDate={dateFrom || new Date()}
                tileClassName={tileClassName}
              />
            </div>
          </div>
          <S.FormContainer>
            <label htmlFor="guests">Number of guests:</label>
            <div className="input-group">
              <input
                id="guests"
                type="number"
                min="1"
                max={maxGuests}
                value={guests}
                onChange={(e) =>
                  setGuests(Math.min(Math.max(e.target.value, 1), maxGuests))
                }
              />
              <p>(Max Guests: {maxGuests})</p>
            </div>
          </S.FormContainer>
          <S.SummaryContainer>
            <h4>Summary:</h4>
            <p>
              <span>Number of guests:</span> <strong>{guests}</strong>
            </p>
            <p>
              <span>Check-in:</span>{' '}
              <strong>
                {dateFrom ? new Date(dateFrom).toLocaleDateString() : '-'}
              </strong>
              - <span>Departure:</span>{' '}
              <strong>
                {dateTo ? new Date(dateTo).toLocaleDateString() : '-'}
              </strong>
            </p>
            <p>
              <span>Price:</span> <strong>{calculatePrice()} NOK</strong>
            </p>
          </S.SummaryContainer>
          <S.ButtonContainer>
            <S.ConfirmButton onClick={handleConfirmBooking} disabled={loading}>
              {loading ? 'Processing...' : 'Confirm Booking'}
            </S.ConfirmButton>
          </S.ButtonContainer>
          <S.CloseLink onClick={onClose}>Close</S.CloseLink>
        </S.ModalBody>
      </S.ModalContainer>
      {alertMessage && (
        <div className="custom-alert">
          <p>{alertMessage}</p>
          <button onClick={() => setAlertMessage('')}>OK</button>
        </div>
      )}
    </S.ModalBackdrop>
  );
};

export default BookingModal;
