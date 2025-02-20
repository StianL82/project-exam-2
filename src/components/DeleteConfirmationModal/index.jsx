import React, { useEffect } from 'react';
import * as S from './index.styles';

/**
 * DeleteConfirmationModal
 * A simple confirmation modal for deletions.
 *
 * @param {Object} props
 * @param {boolean} props.show - Controls modal visibility.
 * @param {Function} props.onClose - Handles modal close.
 * @param {Function} props.onConfirm - Handles delete confirmation.
 * @param {string} props.title - Modal title.
 * @param {string} props.message - Modal message.
 */

const DeleteConfirmationModal = ({
  show,
  onClose,
  onConfirm,
  title,
  message,
}) => {
  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [show]);

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
