import React, { useState } from 'react';
import BookingCalendar from '../Calendar';
import * as S from './index.styles';

/**
 * Booking Modal Component
 * @param {Object} props - Component props
 * @param {Array} unavailableDates - Dates that are unavailable
 * @param {Function} onClose - Function to close the modal
 * @param {number} price - Price per night for the venue
 * @param {number} maxGuests - Maximum number of guests allowed
 * @param {boolean} show - Controls whether the modal is visible
 * @returns {JSX.Element|null} The rendered booking modal or null if not visible
 */
const BookingModal = ({
  unavailableDates,
  onClose,
  price,
  maxGuests,
  show,
}) => {
  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(null);
  const [guests, setGuests] = useState(1);

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
    if (new Date(selectedDate) > new Date(dateFrom)) {
      setDateTo(selectedDate);
    }
  };

  const tileClassName = ({ date }) => {
    if (!dateFrom || !dateTo) return '';

    const fromDate = new Date(dateFrom).setHours(0, 0, 0, 0);
    const toDate = new Date(dateTo).setHours(0, 0, 0, 0);
    const currentDate = new Date(date).setHours(0, 0, 0, 0);

    if (currentDate === fromDate || currentDate === toDate) {
      return 'selected-range';
    }

    if (currentDate > fromDate && currentDate < toDate) {
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
                disabledDates={unavailableDates}
                minDate={new Date()}
                tileClassName={tileClassName}
              />
            </div>
            <div>
              <h3>Date To:</h3>
              <BookingCalendar
                selectedDate={dateTo}
                onDateChange={handleDateToChange}
                disabledDates={unavailableDates}
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
              <span>Number of guests:</span> <span>{guests}</span>
            </p>
            <p>
              <span>Check-in:</span>{' '}
              <span>
                {dateFrom ? new Date(dateFrom).toLocaleDateString() : '-'}
              </span>{' '}
              - <span>Departure:</span>{' '}
              <span>
                {dateTo ? new Date(dateTo).toLocaleDateString() : '-'}
              </span>
            </p>
            <p>
              <span>Price:</span> <span>{calculatePrice()} NOK</span>
            </p>
          </S.SummaryContainer>
          <S.ButtonContainer>
            <S.ConfirmButton>Confirm Booking</S.ConfirmButton>
          </S.ButtonContainer>
          <S.CloseLink
            onClick={() => {
              resetForm();
              onClose();
            }}
          >
            Close
          </S.CloseLink>
        </S.ModalBody>
      </S.ModalContainer>
    </S.ModalBackdrop>
  );
};

export default BookingModal;
