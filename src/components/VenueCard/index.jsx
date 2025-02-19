import React, { useState } from 'react';
import * as S from './index.styles';
import { Link } from 'react-router-dom';
import DeleteConfirmationModal from '../DeleteConfirmationModal';
import CreateVenue from '../CreateVenue';

/**
 * VenueCard Component
 *
 * Displays a venue card with an image, title, price, rating, and available amenities.
 * Users can view venue details, and if `showEditDelete` is true, they can edit or delete the venue.
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {Object} props.venue - Venue data object.
 * @param {string} props.venue.id - Unique identifier for the venue.
 * @param {string} props.venue.name - Name of the venue.
 * @param {Array<Object>} props.venue.media - Media array containing venue images.
 * @param {number} props.venue.price - Price per night in NOK.
 * @param {number} props.venue.rating - Venue rating (0-5).
 * @param {Object} props.venue.meta - Venue amenities.
 * @param {boolean} props.venue.meta.wifi - Whether the venue has WiFi.
 * @param {boolean} props.venue.meta.parking - Whether the venue has parking.
 * @param {boolean} props.venue.meta.breakfast - Whether breakfast is included.
 * @param {boolean} props.venue.meta.pets - Whether pets are allowed.
 * @param {boolean} props.showEditDelete - Determines if edit/delete buttons are shown.
 * @param {Function} props.onVenueUpdated - Callback function when a venue is updated.
 * @param {Function} props.onDelete - Callback function when a venue is deleted.
 *
 * @returns {JSX.Element} A styled card displaying venue details, with optional edit and delete functionality.
 */

const VenueCard = ({ venue, showEditDelete, onVenueUpdated, onDelete }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [venueData, setVenueData] = useState(venue);

  const { id, name, media, price, rating, meta } = venueData;
  const defaultImage = '/images/contact-section.png';

  const isBlockedDomain = (url) => {
    const blockedDomains = ['theaureview.com', 'example.com'];
    return blockedDomains.some((domain) => url?.includes(domain));
  };

  const validImage = media?.find((img) => img.url && !isBlockedDomain(img.url));

  const imageUrl = validImage ? validImage.url : defaultImage;

  const icons = {
    wifi: meta?.wifi ? '/images/icons/wifi.svg' : null,
    parking: meta?.parking ? '/images/icons/parking.svg' : null,
    breakfast: meta?.breakfast ? '/images/icons/breakfast.svg' : null,
    pets: meta?.pets ? '/images/icons/pets.svg' : null,
  };

  const handleVenueUpdated = (updatedVenue) => {
    setVenueData((prev) => ({ ...prev, ...updatedVenue.data }));
    setShowEditModal(false);
    if (onVenueUpdated) {
      onVenueUpdated(updatedVenue);
    }
  };

  return (
    <>
      <S.Card>
        <Link
          to={`/venue/${id}`}
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <S.ImageContainer>
            <S.Image
              src={imageUrl}
              alt={validImage?.alt || `Default image for ${name}`}
              onError={(e) => {
                e.target.src = defaultImage;
              }}
            />
            {rating > 0 && (
              <S.Rating>
                {[...Array(Math.round(rating || 0))].map((_, i) => (
                  <S.StarIcon key={i} src="/images/icons/star.svg" alt="" />
                ))}
              </S.Rating>
            )}
          </S.ImageContainer>
          <S.InfoContainer>
            <S.Title>{name}</S.Title>
            <S.Price>{price} NOK,- / night</S.Price>
            <S.IconContainer>
              {Object.entries(icons).map(([key, icon], index) =>
                icon ? <S.Icon key={index} src={icon} alt="" /> : null
              )}
            </S.IconContainer>
          </S.InfoContainer>
        </Link>

        <S.ButtonContainer>
          <S.ViewButton as={Link} to={`/venue/${id}`}>
            View Venue
          </S.ViewButton>
          {showEditDelete && (
            <>
              <S.EditButton as="button" onClick={() => setShowEditModal(true)}>
                Edit Venue
              </S.EditButton>
              <S.DeleteButton
                as="button"
                onClick={() => setShowDeleteModal(true)}
              >
                Delete Venue
              </S.DeleteButton>
            </>
          )}
        </S.ButtonContainer>
      </S.Card>

      <DeleteConfirmationModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={() => {
          onDelete(id);
          setShowDeleteModal(false);
        }}
        title="Delete Venue"
        message="Are you sure you want to delete this venue?"
      />

      {showEditModal && (
        <CreateVenue
          showModal={showEditModal}
          closeModal={() => setShowEditModal(false)}
          onVenueCreated={handleVenueUpdated}
          initialData={venueData}
        />
      )}
    </>
  );
};

export default VenueCard;
