import React from 'react';
import * as S from './index.styles';

/**
 * DeleteConfirmationModal Component
 * @param {Object} props
 * @param {boolean} show - Whether the modal is visible
 * @param {Function} onClose - Function to close the modal
 * @param {Function} onConfirm - Function to confirm deletion
 * @param {string} title - Title for the modal
 * @param {string} message - Message for the modal
 */
const DeleteConfirmationModal = ({
  show,
  onClose,
  onConfirm,
  title,
  message,
}) => {
  if (!show) return null;

  return (
    <S.ModalBackdrop>
      <S.ModalContent>
        <S.ModalHeader>
          <h2>{title}</h2>
          <button onClick={onClose} className="close-button">
          ×
        </button>
        </S.ModalHeader>
        <S.ModalBody>
          <p>{message}</p>
          <S.ModalButtonContainer>
            <S.CancelButton onClick={onClose}>Cancel</S.CancelButton>
            <S.DeleteButton onClick={onConfirm}>Delete</S.DeleteButton>
          </S.ModalButtonContainer>
        </S.ModalBody>
      </S.ModalContent>
    </S.ModalBackdrop>
  );
};

export default DeleteConfirmationModal;
