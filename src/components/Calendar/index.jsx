import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import PropTypes from 'prop-types';
import * as S from './index.styles';

/**
 * Reusable Calendar Component
 * @param {Object} props - Component props
 * @param {Date} props.selectedDate - Currently selected date
 * @param {Function} props.onDateChange - Callback for date change
 * @param {Array} props.disabledDates - Dates that are unavailable (ISO date strings)
 * @param {Date} props.minDate - The earliest selectable date
 * @param {Function} props.tileClassName - Function to apply custom classNames to tiles
 * @returns {JSX.Element} The rendered calendar component
 */
const BookingCalendar = ({
  selectedDate,
  onDateChange,
  disabledDates = [],
  minDate,
  tileClassName,
}) => {
  const isDateDisabled = (date) => {
    const dateString = date.toISOString().split('T')[0];
    return disabledDates.includes(dateString);
  };

  return (
    <S.CalendarContainer>
      <Calendar
        value={selectedDate}
        onChange={onDateChange}
        tileDisabled={({ date }) => isDateDisabled(date)}
        minDate={minDate}
        tileClassName={tileClassName}
      />
    </S.CalendarContainer>
  );
};

BookingCalendar.propTypes = {
  selectedDate: PropTypes.instanceOf(Date),
  onDateChange: PropTypes.func.isRequired,
  disabledDates: PropTypes.arrayOf(PropTypes.string),
  minDate: PropTypes.instanceOf(Date),
  tileClassName: PropTypes.func,
};

export default BookingCalendar;
