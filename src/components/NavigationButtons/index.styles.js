import styled from 'styled-components';

export const NavigationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  gap: 15px;

  span {
    font-size: 1rem;
  }

  @media (max-width: 360px) {
    flex-direction: column;
    gap: 10px;
  }
`;

export const NavigationButton = styled.button`
  background-color: ${(props) => props.theme.color.primaryColor};
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;

  &:disabled {
    background-color: ${(props) => props.theme.color.mediumGray};
    color: ${(props) => props.theme.color.white};
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background-color: ${(props) => props.theme.color.buttonHoverBlue};
    color: ${(props) => props.theme.color.white};
  }
`;
