import React, { useState, useEffect } from 'react';
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
  unavailableDates = [],
  onClose,
  price,
  maxGuests,
  show,
  venueId,
  initialData = null,
  onBookingUpdated,
}) => {
  const navigate = useNavigate();
  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(null);
  const [guests, setGuests] = useState(1);
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    if (initialData) {
      const [fromYear, fromMonth, fromDay] = initialData.dateFrom
        .split('T')[0]
        .split('-');
      const [toYear, toMonth, toDay] = initialData.dateTo
        .split('T')[0]
        .split('-');

      const fromDate = new Date(fromYear, fromMonth - 1, fromDay);
      const toDate = new Date(toYear, toMonth - 1, toDay);

      setDateFrom(fromDate);
      setDateTo(toDate);
      setGuests(initialData.guests);
    }
  }, [initialData]);

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

    const formatDateWithoutTimeZone = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}T00:00:00`;
    };

    const bookingData = {
      dateFrom: formatDateWithoutTimeZone(new Date(dateFrom)),
      dateTo: formatDateWithoutTimeZone(new Date(dateTo)),
      guests: guests,
      venueId: venueId,
    };

    console.log('Sending bookingData:', bookingData);

    const method = initialData ? 'PUT' : 'POST';
    const endpoint = initialData
      ? `${API_HOLIDAZE_URL}/bookings/${initialData.id}`
      : `${API_HOLIDAZE_URL}/bookings`;

    try {
      const data = await authFetch(endpoint, {
        method: method,
        body: JSON.stringify(bookingData),
      });

      if (initialData) {
        showAlert('Booking updated successfully!', data);
        setTimeout(() => {
          setAlertMessage('');
          onClose(); // Lukk modalen
        }, 2000);

        if (onBookingUpdated) {
          const updatedBooking = {
            id: initialData.id,
            dateFrom: bookingData.dateFrom,
            dateTo: bookingData.dateTo,
            guests: bookingData.guests,
            venue: initialData.venue,
          };
          onBookingUpdated(updatedBooking);
        }
      } else {
        showAlert('Booking successful! Redirecting to your profile page.');
        setTimeout(() => {
          console.log('Navigating with state:', { scrollTo: 'my-bookings' });
          navigate('/profile/:username', {
            state: { scrollTo: 'my-bookings' },
          });
        }, 2000);
      }
    } catch (error) {
      console.error('Error creating booking:', error);
      alert('An error occurred while making the booking.');
    } finally {
      setLoading(false);
    }
  };

  const normalizeDate = (date) => {
    const newDate = new Date(date);
    newDate.setHours(0, 0, 0, 0); // Fjern klokkeslett, sett til midnatt
    return newDate;
  };

  const tileClassName = ({ date }) => {
    if (!dateFrom || !dateTo) return '';

    const formattedDate = normalizeDate(date).toISOString().split('T')[0];
    const formattedDateFrom = normalizeDate(dateFrom)
      .toISOString()
      .split('T')[0];
    const formattedDateTo = normalizeDate(dateTo).toISOString().split('T')[0];

    if (
      formattedDate === formattedDateFrom ||
      formattedDate === formattedDateTo
    ) {
      return 'selected-range';
    }

    if (formattedDate > formattedDateFrom && formattedDate < formattedDateTo) {
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
          <h2>{initialData ? 'Update Booking' : 'New Booking'}</h2>

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
                disabledDates={unavailableDates
                  .filter(
                    (date) =>
                      date !== initialData?.dateFrom &&
                      date !== initialData?.dateTo
                  )
                  .map((date) => new Date(date).toISOString().split('T')[0])}
                minDate={new Date()} // Alltid sett minDate til dagens dato
                tileClassName={tileClassName}
              />
            </div>
            <div>
              <h3>Date To:</h3>
              <BookingCalendar
                selectedDate={dateTo}
                onDateChange={handleDateToChange}
                disabledDates={unavailableDates
                  .filter(
                    (date) =>
                      date !== initialData?.dateFrom &&
                      date !== initialData?.dateTo
                  )
                  .map((date) => new Date(date).toISOString().split('T')[0])}
                minDate={dateFrom || new Date()} // Setter minDate til valgt Date From eller dagens dato
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
              {loading
                ? 'Processing...'
                : initialData
                  ? 'Update Booking'
                  : 'Confirm Booking'}
            </S.ConfirmButton>
          </S.ButtonContainer>
          <S.CloseLink onClick={onClose}>Close</S.CloseLink>
        </S.ModalBody>
      </S.ModalContainer>
      {alertMessage && (
        <div className="custom-alert">
          <p>{alertMessage}</p>
        </div>
      )}
    </S.ModalBackdrop>
  );
};

export default BookingModal;
