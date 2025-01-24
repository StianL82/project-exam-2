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

export const ModalContent = styled.div`
  background: ${(props) => props.theme.color.white};
  padding: 24px;
  margin: 10px;
  border-radius: 10px;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
  position: relative;

  h2 {
    text-align: center;
    margin-bottom: 24px;
  }

  .close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
  }

  .link {
    color: ${(props) => props.theme.color.primaryColor};
    cursor: pointer;
    text-decoration: underline;
  }
`;

export const FormBackground = styled.div`
  background: ${(props) => props.theme.color.lightYellow};
  padding: 20px 20px 40px 20px;
        border: 1px solid ${(props) => props.theme.color.stroke};
      border-radius: 5px;
`;

export const FormContainer = styled.div`
  form {
    display: flex;
    flex-direction: column;

    label {
      font-family: 'Nunito', Arial, sans-serif;
      margin-top: 12px;
      font-weight: bold;
    }

    input {
      padding: 8px;
      margin-top: 8px;
      border: 1px solid ${(props) => props.theme.color.mediumGray};
      border-radius: 4px;
      font-size: 1rem;
    }

    input[type='checkbox'] {
      width: auto;
      margin-right: 8px;
    }

    .alert-danger {
      color: ${(props) => props.theme.color.buttonHoverRed};
      font-size: 0.875rem;
      margin-top: 4px;
    }

    .success-message {
      color: ${(props) => props.theme.color.success};
      font-size: 1rem;
      margin-top: 12px;
      text-align: center;
    }
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 16px;
`;

export const RegisterButton = styled.button`
  background-color: ${(props) => props.theme.color.secondaryColor};
  color: ${(props) => props.theme.color.white};
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  width: 100%;

  &:hover {
    background-color: ${(props) => props.theme.color.buttonHoverOrange};
  }
`;

