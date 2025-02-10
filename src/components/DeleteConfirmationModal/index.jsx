import React from 'react';
import * as S from './index.styles';

/**
 * DeleteConfirmationModal Component
 * @param {Object} props
 * @param {boolean} show - Whether the modal is visible
 * @param {Function} onClose - Function to close the modal
 * @param {Function} onConfirm - Function to confirm deletion
 */
const DeleteConfirmationModal = ({ show, onClose, onConfirm }) => {
  if (!show) return null;

  return (
    <S.ModalBackdrop>
      <S.ModalContent>
        <S.ModalHeader>
          <h2>Delete Booking</h2>
          <button onClick={onClose}>×</button>
        </S.ModalHeader>
        <S.ModalBody>
          <p>Are you sure you want to delete this booking?</p>
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
