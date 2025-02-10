import React, { useState } from 'react';
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
    .min(0, 'Price must be at least 0')
    .required('Price per night is required'),
  maxGuests: Yup.number()
    .min(1, 'Must allow at least 1 guest')
    .required('Max guests is required'),
  media: Yup.array().of(
    Yup.object().shape({
      url: Yup.string()
        .url('Must be a valid URL')
        .required('Image URL is required'),
      alt: Yup.string().required('Image description is required'),
    })
  ),
});

const CreateVenue = ({ showModal, closeModal, onVenueCreated }) => {
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      setFormData((prev) => ({
        ...prev,
        meta: { ...prev.meta, [name]: checked },
      }));
    } else if (name === 'rating') {
      setFormData((prev) => ({
        ...prev,
        rating: Number(value),
      }));
    } else if (name.includes('location.')) {
      const field = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        location: { ...prev.location, [field]: value },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
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
    console.log('🚀 Knappen er trykket!');
    console.log('🛠 Fullstendig skjema-data før validering:', formData);

    try {
      await schema.validate(formData, { abortEarly: false });
      console.log('✅ Validering bestått!');

      const requestData = {
        ...formData,
        price: Number(formData.price),
        maxGuests: Number(formData.maxGuests),
        rating: Number(formData.rating), // ✅ Rating konverteres til number
      };

      console.log(
        '📤 Sender følgende data til API:',
        JSON.stringify(requestData)
      );

      setLoading(true);

      const response = await authFetch(`${API_HOLIDAZE_URL}/venues`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify(requestData),
      });

      console.log('📥 API-respons:', response);

      if (response.errors) {
        throw new Error(
          response.errors[0]?.message || 'Failed to create venue'
        );
      }

      if (onVenueCreated) {
        onVenueCreated(response);
      }

      setMessage('✅ Venue created successfully!');
      setTimeout(() => {
        closeModal();
      }, 2000);
    } catch (err) {
      if (err.inner) {
        console.log('❌ Valideringsfeil funnet:', err.inner);
        const validationErrors = {};
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        setErrors(validationErrors);
      } else {
        console.error('❌ API Error:', err);
        setMessage('❌ Noe gikk galt, prøv igjen.');
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
          <h2>Create New Venue</h2>
          <button onClick={closeModal} className="close-button">
            ×
          </button>
        </S.ModalHeader>

        <S.FormBackground>
          <S.FormContainer>
            <label>Venue Name:</label>
            <input name="name" value={formData.name} onChange={handleChange} />
            {errors.name && <p className="alert-danger">{errors.name}</p>}

            {/* Rating Input */}
            <label htmlFor="rating">Rating:</label>
            <input
              id="rating"
              name="rating"
              type="number"
              value={formData.rating || 0} // ✅ Sikrer at rating aldri er tom
              onChange={handleChange}
              min="0"
              max="5"
              step="1"
            />
            {errors.rating && <p className="alert-danger">{errors.rating}</p>}

            <label>Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
            {errors.description && (
              <p className="alert-danger">{errors.description}</p>
            )}

            <label>Price per night:</label>
            <input
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
            />
            {errors.price && <p className="alert-danger">{errors.price}</p>}

            <label>Max Guests:</label>
            <input
              name="maxGuests"
              type="number"
              value={formData.maxGuests}
              onChange={handleChange}
            />
            {errors.maxGuests && (
              <p className="alert-danger">{errors.maxGuests}</p>
            )}

            <label>Address:</label>
            <input
              name="location.address"
              value={formData.location.address}
              onChange={handleChange}
            />
            {errors.location?.address && (
              <p className="alert-danger">{errors.location.address}</p>
            )}

            <label>City:</label>
            <input
              name="location.city"
              value={formData.location.city}
              onChange={handleChange}
            />
            {errors.location?.city && (
              <p className="alert-danger">{errors.location.city}</p>
            )}

            <label>Country:</label>
            <input
              name="location.country"
              value={formData.location.country}
              onChange={handleChange}
            />
            {errors.location?.country && (
              <p className="alert-danger">{errors.location.country}</p>
            )}

            <label>Media:</label>
            {formData.media.map((media, index) => (
              <div key={index}>
                <input
                  placeholder="Image URL"
                  value={media.url}
                  onChange={(e) =>
                    handleMediaChange(index, 'url', e.target.value)
                  }
                />
                <input
                  placeholder="Alt text"
                  value={media.alt}
                  onChange={(e) =>
                    handleMediaChange(index, 'alt', e.target.value)
                  }
                />
                {formData.media.length > 1 && (
                  <button type="button" onClick={() => removeMediaField(index)}>
                    🗑
                  </button>
                )}
              </div>
            ))}
            <B.BlueButton type="button" onClick={addMediaField}>
              Add More Images
            </B.BlueButton>

            <label>Amenities:</label>
            <S.AmenitiesGrid>
              {['wifi', 'parking', 'breakfast', 'pets'].map((amenity) => (
                <label key={amenity}>
                  <input
                    type="checkbox"
                    name={amenity}
                    checked={formData.meta[amenity]}
                    onChange={handleChange}
                  />
                  {amenity.charAt(0).toUpperCase() + amenity.slice(1)}
                </label>
              ))}
            </S.AmenitiesGrid>

            {message && <p className="alert-success">{message}</p>}

            <S.ButtonContainer>
              <S.UpdateButton type="button" onClick={handleSubmit}>
                {loading ? 'Creating...' : 'Create Venue'}
              </S.UpdateButton>
            </S.ButtonContainer>
          </S.FormContainer>
        </S.FormBackground>
      </S.ModalContent>
    </S.ModalBackdrop>
  );
};

export default CreateVenue;
