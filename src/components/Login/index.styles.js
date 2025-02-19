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
  overflow-y: auto;
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
    padding-bottom: 20px;
  }

  button {
    background: none;
    border: none;
    font-size: 2rem;
    cursor: pointer;
  }
`;

export const ModalContent = styled.div`
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
  max-width: 500px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  .link {
    color: ${(props) => props.theme.color.primaryColor};
    cursor: pointer;
    text-decoration: underline;
  }

  @media (max-width: 480px) {
    width: 95%;
    padding: 0px 10px 10px 10px;
  }

  @media (max-width: 360px) {
    padding: 0px 5px 5px 5px;
  }
`;

export const FormBackground = styled.div`
  background: ${(props) => props.theme.color.lightYellow};
  padding: 20px 20px 40px 20px;
  border: 1px solid ${(props) => props.theme.color.stroke};
  border-radius: 5px;
`;

export const ModalLink = styled.div`
  .link {
    font-size: 20px;
    text-decoration: none;
    color: ${(props) => props.theme.color.success};
  }
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

    .alert-danger {
      color: ${(props) => props.theme.color.buttonHoverRed};
      font-size: 0.875rem;
      margin-top: 4px;
    }
  }

  .success-message {
    border: 1px solid ${(props) => props.theme.color.success};
    color: ${(props) => props.theme.color.success};
    background: rgba(40, 167, 69, 0.1);
    max-width: 500px;
    margin: 20px auto;
    text-align: center;
    padding: 20px;
    border-radius: 8px;
    font-size: 1rem;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 16px;
`;

export const LoginButton = styled.button`
  font-family: 'Montserrat', sans-serif;
  font-weight: bold;
  background-color: ${(props) => props.theme.color.secondaryColor};
  color: ${(props) => props.theme.color.black};
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
  width: 100%;

  &:hover {
    background-color: ${(props) => props.theme.color.buttonHoverOrange};
  }
`;

export const CloseButton = styled.button`
  display: block;
  text-align: right;
  margin-top: 10px;
  font-size: 1rem;
  color: ${(props) => props.theme.color.darkGray};
  cursor: pointer;
  background: none;
  border: none;

  &:hover {
    font-weight: bold;
  }
`;
