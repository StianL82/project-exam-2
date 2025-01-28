import styled from 'styled-components';

export const CalendarContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  width: 100%;
  max-width: 400px;
  padding: 10px;

  .react-calendar {
    width: 100%;
    border: none;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    padding: 10px;
  }

  .react-calendar__tile--active {
    background-color: ${(props) => props.theme.color.primaryColor};
    color: ${(props) => props.theme.color.white};
  }

  .react-calendar__tile--disabled {
    background-color: ${(props) => props.theme.color.danger};
    color: ${(props) => props.theme.color.white};
    cursor: not-allowed;
  }
`;
