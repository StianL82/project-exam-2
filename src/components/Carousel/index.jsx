import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';
import * as S from './index.styles';

/**
 * VenueCarousel Component
 *
 * This component renders a responsive carousel for displaying a collection of venue media items.
 * It includes a modal for viewing images in full size, with navigation controls for cycling
 * through the images within the modal.
 *
 * Features:
 * - Displays images from the `media` array in a carousel.
 * - Opens a modal to show a full-size preview of the clicked image.
 * - Provides "Next" and "Previous" buttons in the modal for navigation.
 * - Includes a "Close" link to close the modal.
 *
 * Props:
 * @param {Array} media - Array of media objects. Each object contains:
 *   - `url` (string): The URL of the image (required).
 *   - `alt` (string): Alternative text for the image (optional).
 *
 * Usage:
 * <VenueCarousel media={mediaArray} />
 *
 * @returns {JSX.Element} The rendered VenueCarousel component.
 */
const VenueCarousel = ({ media }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedImageIndex(0);
  };

  const handlePrev = () =>
    setSelectedImageIndex((prevIndex) =>
      prevIndex === 0 ? media.length - 1 : prevIndex - 1
    );

  const handleNext = () =>
    setSelectedImageIndex((prevIndex) =>
      prevIndex === media.length - 1 ? 0 : prevIndex + 1
    );

  const defaultImage = '/images/contact-section.png';

  return (
    <>
      <S.StyledCarousel>
        <Carousel indicators={media.length > 1} controls={media.length > 1}>
          {media.map((item, index) => (
            <Carousel.Item key={index}>
              <img
                className="d-block w-100"
                src={item.url?.trim().length > 0 ? item.url : defaultImage}
                alt={item.alt || `Image ${index + 1}`}
                onClick={() => handleImageClick(index)}
                style={{ cursor: 'pointer' }}
              />
            </Carousel.Item>
          ))}
        </Carousel>
      </S.StyledCarousel>

      <Modal show={showModal} onHide={handleClose} centered size="lg">
        <S.ModalContent>
          {media.length > 1 && (
            <button
              className="modal-control prev"
              onClick={handlePrev}
              aria-label="Previous image"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="sr-only">Previous</span>
            </button>
          )}

          <div className="image-container">
            {media[selectedImageIndex] && (
              <img
                src={
                  media[selectedImageIndex]?.url?.trim().length > 0
                    ? media[selectedImageIndex].url
                    : defaultImage
                }
                alt={media[selectedImageIndex].alt || 'Full-size preview'}
              />
            )}
          </div>

          {media.length > 1 && (
            <button
              className="modal-control next"
              onClick={handleNext}
              aria-label="Next image"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="sr-only">Next</span>
            </button>
          )}

          <span className="close-link" onClick={handleClose}>
            Close
          </span>
        </S.ModalContent>
      </Modal>
    </>
  );
};

VenueCarousel.propTypes = {
  media: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string.isRequired,
      alt: PropTypes.string,
    })
  ).isRequired,
};

export default VenueCarousel;
