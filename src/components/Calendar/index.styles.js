import styled from 'styled-components';

export const CalendarContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 350px;
  padding: 5px;

  .react-calendar {
    width: 100%;
    max-width: 100%;
    border: none;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    padding: 10px;
  }

  .react-calendar__navigation {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  .react-calendar__navigation button {
    min-width: 20px;
    flex-grow: 1;
    font-size: 1rem;
    padding: 5px;
  }

  @media (max-width: 400px) {
    max-width: 90%;
    margin: 0 auto;
    justify-content: center;

    .react-calendar {
      font-size: 0.75rem;
      width: 100%;
      max-width: 100%;
    }

    .react-calendar__navigation {
      width: 100%;
      justify-content: center;
    }

    .react-calendar__navigation button {
      font-size: 0.7rem;
      padding: 4px;
      min-width: 15px;
    }

    .react-calendar__month-view__weekdays {
      font-size: 0.6rem;
    }

    .react-calendar__tile {
      font-size: 0.7rem;
      padding: 4px;
    }
  }

  @media (max-width: 300px) {
    max-width: 80%;
  }
`;
