import styled from 'styled-components';

export const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  background: ${(props) => props.theme.color.white};
  border: 1px solid ${(props) => props.theme.color.stroke};
  border-radius: 10px;
  padding: 0px 20px 20px 20px;
  max-width: 800px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  @media (max-width: 480px) {
    width: 95%;
    padding: 0px 10px 10px 10px;
  }

  @media (max-width: 360px) {
    padding: 0px 5px 5px 5px;
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 5px;
  background: ${(props) => props.theme.color.white};
  position: sticky;
  top: 0;
  z-index: 10;

  h2 {
    font-size: 1.5rem;
    margin: 0 auto;
  }

  button {
    background: none;
    border: none;
    font-size: 2rem;
    cursor: pointer;
  }
`;

export const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;

  .calendar-section {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    border: 1px solid ${(props) => props.theme.color.stroke};
    background: ${(props) => props.theme.color.bodyBg};
    border-radius: 5px;
    padding: 10px;
    justify-content: center;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      padding: 5px;
      justify-items: center;
    }

    h3 {
      font-size: 1rem;
      padding: 5px 10px;
      text-align: center;
    }
  }
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;

  label {
    font-weight: bold;
  }

  .input-group {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 5px;
    align-items: center;

    input {
      padding: 5px;
      font-size: 1rem;
      border: 1px solid ${(props) => props.theme.color.stroke};
      border-radius: 5px;
      width: 100px;
    }

    p {
      margin: 0;
      font-size: 0.9rem;
      color: ${(props) => props.theme.color.darkGray};
    }
  }
`;

export const SummaryContainer = styled.div`
  background: ${(props) => props.theme.color.bodyBg};
  border: 1px solid ${(props) => props.theme.color.stroke};
  padding: 0px 10px 5px 10px;
  border-radius: 5px;

  h4 {
    margin-bottom: 5px;
    font-size: 20px;
  }

  p {
    margin: 2px 0;
  }

  strong {
    font-weight: bold !important;
  }
`;


export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 5px;
`;

export const ConfirmButton = styled.button`
  font-family: 'Montserrat', sans-serif;
  font-weight: bold;
  background: ${(props) => props.theme.color.primaryColor};
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background: ${(props) => props.theme.color.buttonHoverBlue};
    color: ${(props) => props.theme.color.white};
  }
`;

export const CloseLink = styled.span`
  display: block;
  text-align: right;
  margin-top: 5px;
  font-size: 1rem;
  color: ${(props) => props.theme.color.darkGray};
  cursor: pointer;
  text-decoration: none;

  &:hover {
    font-weight: bold;
  }
`;
