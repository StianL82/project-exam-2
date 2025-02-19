import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import PropTypes from 'prop-types';
import * as S from './index.styles';

/**
 * BookingCalendar Component
 *
 * A reusable calendar component for selecting booking dates.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Date|null} props.selectedDate - The currently selected date.
 * @param {Function} props.onDateChange - Callback function triggered when the user selects a date.
 * @param {string[]} [props.disabledDates=[]] - An array of dates in `YYYY-MM-DD` format (ISO 8601) that are disabled for selection.
 * @param {Date} [props.minDate] - The earliest selectable date.
 * @param {Function} [props.tileClassName] - Function to apply custom CSS class names to specific dates.
 * @returns {JSX.Element} The rendered calendar component.
 */

const BookingCalendar = ({
  selectedDate,
  onDateChange,
  disabledDates = [],
  minDate,
  tileClassName,
}) => {
  const isDateDisabled = (date) => {
    if (!(date instanceof Date)) return false;

    const formattedDate = date.toISOString().split('T')[0];

    return disabledDates.includes(formattedDate);
  };

  const modifiedTileClassName = ({ date }) => {
    if (!(date instanceof Date)) return '';

    const booked = isDateDisabled(date);

    if (booked) {
      return 'booked-date';
    }

    if (tileClassName) {
      return tileClassName({ date });
    }

    return '';
  };

  return (
    <S.CalendarContainer>
      <Calendar
        value={selectedDate}
        onChange={onDateChange}
        tileDisabled={({ date }) => isDateDisabled(date)}
        minDate={minDate}
        tileClassName={modifiedTileClassName}
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
