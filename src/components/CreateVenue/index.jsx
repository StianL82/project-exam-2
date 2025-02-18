import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { API_HOLIDAZE_URL } from '../../auth/constants';
import { authFetch } from '../../auth/authFetch';
import * as S from './index.styles';
import * as B from '../../styles/GlobalStyle';

// ✅ Yup skjema for validering
const schema = Yup.object().shape({
  name: Yup.string().required('Venue name is required'),
  rating: Yup.number()
    .min(0, 'Rating must be at least 0')
    .max(5, 'Rating must be at most 5')
    .required('Rating is required'),
  description: Yup.string()
    .max(800, 'Max 800 characters')
    .required('Description is required'),
  price: Yup.number()
    .typeError('Price must be at least 1 per night')
    .min(0, 'Price must be at least 1 per night')
    .required('Price per night is required'),

  maxGuests: Yup.number()
    .typeError('Must allow at least 1 guest')
    .min(1, 'Must allow at least 1 guest')
    .required('Max guests is required'),

  media: Yup.array().of(
    Yup.object().shape({
      url: Yup.string().url('Must be a valid URL').notRequired().nullable(), // Tillater tomt felt
      alt: Yup.string().notRequired().nullable(), // Tillater tomt felt
    })
  ),
});

const CreateVenue = ({
  showModal,
  closeModal,
  onVenueCreated,
  initialData = null,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    rating: 0,
    description: '',
    price: '',
    maxGuests: '',
    location: { address: '', city: '', country: '' },
    media: [{ url: '', alt: '' }],
    meta: { wifi: false, parking: false, breakfast: false, pets: false },
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    if (initialData) {
      // Fyller ut skjema med eksisterende venue-data ved redigering
      setFormData({
        ...initialData,
        price: String(initialData.price),
        maxGuests: String(initialData.maxGuests),
      });
    }
  }, [initialData]);

  const showAlert = (message) => {
    setAlertMessage(message); // Sett meldingen
  };

  const validateField = async (name, value) => {
    try {
      await Yup.reach(schema, name).validate(value);
      setErrors((prevErrors) => {
        const { [name]: _, ...rest } = prevErrors; // Fjern feilmeldingen for dette feltet
        return rest;
      });
    } catch (error) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: error.message, // Legg til feilmeldingen
      }));
    }
  };

  const handleChange = async (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      setFormData((prev) => ({
        ...prev,
        meta: { ...prev.meta, [name]: checked },
      }));
    } else if (name.includes('location.')) {
      const field = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        location: { ...prev.location, [field]: value },
      }));
      await validateField(`location.${field}`, value); // Valider lokasjonsfeltet
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
      await validateField(name, value); // Valider feltet
    }
  };

  const handleMediaChange = (index, field, value) => {
    const updatedMedia = [...formData.media];
    updatedMedia[index][field] = value;
    setFormData((prev) => ({ ...prev, media: updatedMedia }));
  };

  const addMediaField = () => {
    setFormData((prev) => ({
      ...prev,
      media: [...prev.media, { url: '', alt: '' }],
    }));
  };

  const removeMediaField = (index) => {
    if (formData.media.length > 1) {
      setFormData((prev) => ({
        ...prev,
        media: prev.media.filter((_, i) => i !== index),
      }));
    }
  };

  const handleSubmit = async () => {
    try {
      await schema.validate(formData, { abortEarly: false });

      const cleanedMedia = formData.media.filter(
        (item) => item.url.trim() !== ''
      );

      const requestData = {
        ...formData,
        media: cleanedMedia,
        price: Number(formData.price),
        maxGuests: Number(formData.maxGuests),
        rating: Number(formData.rating),
      };

      setLoading(true);

      const method = initialData ? 'PUT' : 'POST';
      const endpoint = initialData
        ? `${API_HOLIDAZE_URL}/venues/${initialData.id}`
        : `${API_HOLIDAZE_URL}/venues`;

      const response = await authFetch(endpoint, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify(requestData),
      });

      if (response.errors) {
        throw new Error(
          response.errors[0]?.message || 'Failed to process venue'
        );
      }

      if (initialData) {
        showAlert('Venue updated successfully!');
        setTimeout(() => {
          setAlertMessage('');
          closeModal();
          if (onVenueCreated) {
            onVenueCreated(response);
          }
        }, 2000);
      } else {
        showAlert('Venue created successfully!');
        setTimeout(() => {
          setAlertMessage('');
          closeModal();
          if (onVenueCreated) {
            onVenueCreated(response);
          }

          // 🔹 Hent ID-en til den nye venuen fra API-responsen
          const newVenueId = response.data?.id;
          console.log('✅ New venue ID:', newVenueId);

          // 🔹 Naviger til den nye venue-siden hvis ID-en finnes
          if (newVenueId) {
            navigate(`/venue/${response.data.id}`);
            setTimeout(() => {
              window.scrollTo(0, 0);
            }, 100);
          } else {
            console.error('❌ Venue ID is missing from API response.');
          }
        }, 2000);
      }
    } catch (err) {
      if (err.inner) {
        const validationErrors = {};
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        setErrors(validationErrors);
      } else {
        console.error('API Error:', err);
        setMessage('❌ Something went wrong, please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (!showModal) return null;

  return (
    <S.ModalBackdrop>
      <S.ModalContent>
        <S.ModalHeader>
          <h2>{initialData ? 'Edit Venue' : 'Create New Venue'}</h2>
          <button onClick={closeModal} className="close-button">
            ×
          </button>
        </S.ModalHeader>

        <S.FormBackground>
          <S.FormContainer>
            <label htmlFor="name">Venue Name:</label>
            <input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onBlur={(e) => validateField(e.target.name, e.target.value)}
            />
            {errors.name && <p className="alert-danger">{errors.name}</p>}

            <label htmlFor="rating" id="rating-label">
              Rating:
            </label>
            <input
              id="rating"
              name="rating"
              type="number"
              value={formData.rating || 0}
              onChange={handleChange}
              min="0"
              max="5"
              step="1"
              aria-labelledby="rating-label"
            />
            {errors.rating && <p className="alert-danger">{errors.rating}</p>}

            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              onBlur={(e) => validateField(e.target.name, e.target.value)}
            />
            {errors.description && (
              <p className="alert-danger">{errors.description}</p>
            )}

            <label htmlFor="price">Price per night:</label>
            <input
              id="price"
              name="price"
              type="number"
              min="0"
              value={formData.price}
              onChange={handleChange}
            />
            {errors.price && <p className="alert-danger">{errors.price}</p>}

            <label htmlFor="maxGuests">Max Guests:</label>
            <input
              id="maxGuests"
              name="maxGuests"
              type="number"
              min="0"
              value={formData.maxGuests}
              onChange={handleChange}
            />
            {errors.maxGuests && (
              <p className="alert-danger">{errors.maxGuests}</p>
            )}

            <label htmlFor="address">Address:</label>
            <input
              id="address"
              name="location.address"
              value={formData.location.address}
              onChange={handleChange}
            />
            {errors.location?.address && (
              <p className="alert-danger">{errors.location.address}</p>
            )}

            <label htmlFor="city">City:</label>
            <input
              id="city"
              name="location.city"
              value={formData.location.city}
              onChange={handleChange}
            />
            {errors.location?.city && (
              <p className="alert-danger">{errors.location.city}</p>
            )}

            <label htmlFor="country">Country:</label>
            <input
              id="country"
              name="location.country"
              value={formData.location.country}
              onChange={handleChange}
            />
            {errors.location?.country && (
              <p className="alert-danger">{errors.location.country}</p>
            )}

            {/* Media Fields */}
            <label htmlFor="media-0">Media:</label>
            {formData.media.map((media, index) => (
              <S.MediaWrapper key={index}>
                <S.MediaField>
                  <label htmlFor={`media-url-${index}`}>Image URL:</label>
                  <input
                    id={`media-url-${index}`}
                    name={`media-url-${index}`}
                    placeholder="Image URL"
                    value={media.url}
                    onChange={(e) =>
                      handleMediaChange(index, 'url', e.target.value)
                    }
                  />

                  <label htmlFor={`media-alt-${index}`}>Alt text:</label>
                  <input
                    id={`media-alt-${index}`}
                    name={`media-alt-${index}`}
                    placeholder="Alt text"
                    value={media.alt}
                    onChange={(e) =>
                      handleMediaChange(index, 'alt', e.target.value)
                    }
                  />
                </S.MediaField>

                {formData.media.length > 1 && (
                  <S.DeleteButton onClick={() => removeMediaField(index)}>
                    <S.IconImage
                      src={`${process.env.PUBLIC_URL}/images/icons/trash.svg`}
                      alt="Delete icon"
                    />
                  </S.DeleteButton>
                )}
              </S.MediaWrapper>
            ))}

            <S.ButtonContainer>
              <B.BlueButton type="button" onClick={addMediaField}>
                Add More Images
              </B.BlueButton>
            </S.ButtonContainer>

            <label htmlFor="amenities">Amenities:</label>
            <S.AmenitiesGrid>
              {['wifi', 'parking', 'breakfast', 'pets'].map((amenity) => (
                <label key={amenity} htmlFor={amenity}>
                  <input
                    id={amenity}
                    type="checkbox"
                    name={amenity}
                    checked={formData.meta[amenity]}
                    onChange={handleChange}
                    aria-label={`Enable ${amenity} amenity`}
                  />
                  {amenity.charAt(0).toUpperCase() + amenity.slice(1)}
                </label>
              ))}
            </S.AmenitiesGrid>

            {message && <p className="alert-success">{message}</p>}

            <S.ButtonContainer>
              <S.UpdateButton type="button" onClick={handleSubmit}>
                {loading
                  ? 'Processing...'
                  : initialData
                    ? 'Update Venue'
                    : 'Create Venue'}
              </S.UpdateButton>
            </S.ButtonContainer>
          </S.FormContainer>
        </S.FormBackground>
        <S.CloseLink onClick={closeModal}>Close</S.CloseLink>
      </S.ModalContent>
      {alertMessage && (
        <div className="custom-alert">
          <p>{alertMessage}</p>
        </div>
      )}
    </S.ModalBackdrop>
  );
};

export default CreateVenue;
