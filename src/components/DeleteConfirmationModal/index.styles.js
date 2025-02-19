import styled from 'styled-components';
import { ButtonBase } from '../../styles/GlobalStyle';

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
  z-index: 9999;
`;

export const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
  text-align: center;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${(props) => props.theme.color.mediumGray};
  padding-bottom: 10px;
  font-size: 1.3rem;
  margin-bottom: 20px;

  h2 {
    font-size: 1.5rem;
  }

  .close-button {
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 2rem;
    cursor: pointer;
  }
`;

export const ModalBody = styled.div`
  font-size: 16px;
  margin-bottom: 5px;
`;

export const ModalButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const CancelButton = styled(ButtonBase)`
  background: ${(props) => props.theme.color.lightGray};
  color: ${(props) => props.theme.color.darkGray};
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background: ${(props) => props.theme.color.mediumGray};
  }
`;

export const DeleteButton = styled(ButtonBase)`
  background: ${(props) => props.theme.color.dangerColor};
  color: ${(props) => props.theme.color.white};
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background: ${(props) => props.theme.color.buttonHoverRed};
  }
`;
