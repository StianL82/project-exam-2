import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { registerUser } from '../../auth/register';
import * as S from './index.styles';

const schema = yup.object({
  name: yup.string().min(3, 'At least 3 characters.').required(),
  email: yup
    .string()
    .email()
    .matches(/@stud\.noroff\.no$/, 'Must be @stud.noroff.no')
    .required(),
  password: yup.string().min(8, 'At least 8 characters.').required(),
  avatar: yup.string().url().nullable(),
  avatarAlt: yup.string().max(120).nullable(),
  venueManager: yup.boolean(),
});

/**
 * Registreringskomponent for Holidaze.
 */
const Register = ({ showModal, closeModal, openLogin }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [message, setMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const onSubmit = async (data) => {
    try {
      console.log('🚀 Registrerer bruker (før transformasjon):', data);

      // Sørger for riktig formatering av registreringsdata
      const formattedData = {
        name: data.name.trim().toLowerCase(), // Sikrer små bokstaver
        email: data.email.trim(),
        password: data.password,
        venueManager: data.venueManager || false, // Setter false som standard
        avatar: data.avatar
          ? { url: data.avatar, alt: data.avatarAlt || '' }
          : null,
        banner: null, // Placeholder for fremtidig banner-støtte
      };

      console.log('📤 Sender registreringsdata til API:', formattedData);

      const response = await registerUser(formattedData);
      console.log('✅ Registrering fullført:', response);

      setMessage('Registration successful! You can now log in.');
      setShowAlert(true);

      setTimeout(() => {
        setShowAlert(false);
        closeModal();
        openLogin(data.email);
      }, 2000);

      reset();
    } catch (error) {
      console.error('❌ Feil under registrering:', error);
      setMessage('Registration failed. Please try again.');
    }
  };

  if (!showModal) return null;

  return (
    <S.ModalBackdrop>
      <S.ModalContent>
        <button
          onClick={() => {
            reset();
            setMessage('');
            closeModal();
          }}
          className="close-button"
        >
          ×
        </button>
        <h2>Register a new account</h2>
        <S.FormBackground>
          <S.FormContainer>
            <form onSubmit={handleSubmit(onSubmit)}>
              <label htmlFor="name">Name:</label>
              <input id="name" type="text" {...register('name')} />
              {errors.name && (
                <p className="alert-danger">{errors.name.message}</p>
              )}

              <label htmlFor="email">Email:</label>
              <input id="email" type="email" {...register('email')} />
              {errors.email && (
                <p className="alert-danger">{errors.email.message}</p>
              )}

              <label htmlFor="password">Password:</label>
              <input id="password" type="password" {...register('password')} />
              {errors.password && (
                <p className="alert-danger">{errors.password.message}</p>
              )}

              <label htmlFor="avatar">Avatar URL (optional):</label>
              <input id="avatar" type="url" {...register('avatar')} />
              {errors.avatar && (
                <p className="alert-danger">{errors.avatar.message}</p>
              )}

              <label htmlFor="avatarAlt">Avatar Alt Text (optional):</label>
              <input id="avatarAlt" type="text" {...register('avatarAlt')} />
              {errors.avatarAlt && (
                <p className="alert-danger">{errors.avatarAlt.message}</p>
              )}

              <label htmlFor="venueManager">
                <input
                  id="venueManager"
                  type="checkbox"
                  {...register('venueManager')}
                />
                Are you a Venue Manager?
              </label>
              <p>
                (Becoming a Venue Manager is permanent and cannot be reversed.)
              </p>

              <S.ButtonContainer>
                <S.RegisterButton type="submit">Register</S.RegisterButton>
              </S.ButtonContainer>
            </form>
          </S.FormContainer>
        </S.FormBackground>
        {showAlert && (
          <div className="alert alert-success mt-3" role="alert">
            {message}
          </div>
        )}
        <S.ModalLink>
          <p>
            or{' '}
            <strong>
              <span
                className="link"
                onClick={() => {
                  reset();
                  setMessage('');
                  closeModal();
                  openLogin();
                }}
              >
                log in
              </span>
            </strong>{' '}
            if you already have an account
          </p>
        </S.ModalLink>
      </S.ModalContent>
    </S.ModalBackdrop>
  );
};

export default Register;
