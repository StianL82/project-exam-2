import React, { useState } from 'react';
import * as S from './index.styles';
import { Link } from 'react-router-dom';
import DeleteConfirmationModal from '../DeleteConfirmationModal';
import CreateVenue from '../CreateVenue';

const VenueCard = ({ venue, showEditDelete, onVenueUpdated, onDelete }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [venueData, setVenueData] = useState(venue); // Lokal state for oppdatert venue

  const { id, name, media, price, rating, meta } = venueData;
  const defaultImage = '/images/contact-section.png';

  const icons = {
    wifi: meta?.wifi ? '/images/icons/wifi.svg' : null,
    parking: meta?.parking ? '/images/icons/parking.svg' : null,
    breakfast: meta?.breakfast ? '/images/icons/breakfast.svg' : null,
    pets: meta?.pets ? '/images/icons/pets.svg' : null,
  };

  const handleVenueUpdated = (updatedVenue) => {
    console.log('Venue updated:', updatedVenue);
    setVenueData((prev) => ({ ...prev, ...updatedVenue.data })); // ✅ Bruk API-responsen
    setShowEditModal(false);
    if (onVenueUpdated) {
      onVenueUpdated(updatedVenue); // Send tilbake til parent hvis nødvendig
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
              src={media?.[0]?.url || defaultImage}
              alt={media?.[0]?.alt || `This is the venue image for ${name}`}
              onError={(e) => (e.target.src = defaultImage)}
            />
            <S.Rating>
              {[...Array(Math.round(rating || 0))].map((_, i) => (
                <S.StarIcon key={i} src="/images/icons/star.svg" alt="" />
              ))}
            </S.Rating>
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
