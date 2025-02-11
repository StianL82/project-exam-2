import React, { useState } from 'react';
import * as S from './index.styles';
import { Link } from 'react-router-dom';
import DeleteConfirmationModal from '../DeleteConfirmationModal';

function VenueCard({ venue, showEditDelete, onEdit, onDelete }) {
  const { id, name, media, price, rating, meta } = venue;
  const defaultImage = '/images/contact-section.png';
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const icons = {
    wifi: meta?.wifi ? '/images/icons/wifi.svg' : null,
    parking: meta?.parking ? '/images/icons/parking.svg' : null,
    breakfast: meta?.breakfast ? '/images/icons/breakfast.svg' : null,
    pets: meta?.pets ? '/images/icons/pets.svg' : null,
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

        <S.ViewButton as={Link} to={`/venue/${id}`}>
          View Venue
        </S.ViewButton>

        {showEditDelete && (
          <>
            <S.EditButton
              as="button"
              onClick={(e) => {
                e.preventDefault();
                onEdit(venue);
              }}
            >
              Edit Venue
            </S.EditButton>
            <S.DeleteButton
              as="button"
              onClick={(e) => {
                e.preventDefault();
                setShowDeleteModal(true);
              }}
            >
              Delete Venue
            </S.DeleteButton>
          </>
        )}
      </S.Card>

      {/* DELETE MODAL: Må være utenfor <S.Card> for å fungere riktig */}
      {showDeleteModal && (
        <DeleteConfirmationModal
          show={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={() => {
            onDelete(id); // Kall slettefunksjonen
            setShowDeleteModal(false); // Lukk modalen etter sletting
          }}
          title="Delete Venue"
          message="Are you sure you want to delete this venue?"
        />
      )}
    </>
  );
}

export default VenueCard;
