import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { registerUser } from '../../auth/register';
import * as S from './index.styles';

/**
 * Register Component
 *
 * A modal for user registration. This component provides form fields for
 * name, email, password, optional avatar, and the ability to register as a Venue Manager.
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {boolean} props.showModal - Determines if the modal is visible.
 * @param {Function} props.closeModal - Function to close the modal.
 * @param {Function} props.openLogin - Function to open the login modal after successful registration.
 * @returns {JSX.Element|null} The rendered Register modal or `null` if `showModal` is `false`.
 */

const Register = ({ showModal, closeModal, openLogin }) => {
  const schema = yup.object({
    name: yup.string().min(3, 'At least 3 characters.').required(),
    email: yup
      .string()
      .email('Invalid email address.')
      .matches(/@stud\.noroff\.no$/, 'Must be @stud.noroff.no')
      .required(),
    password: yup.string().min(8, 'At least 8 characters.').required(),
    avatar: yup.string().url('Must be a valid URL.').nullable(),
    avatarAlt: yup.string().max(120, 'Maximum 120 characters.').nullable(),
    venueManager: yup.boolean(),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const onSubmit = async (data) => {
    try {
      const formattedData = {
        name: data.name.trim().toLowerCase(),
        email: data.email.trim(),
        password: data.password,
        venueManager: data.venueManager || false,
        avatar: data.avatar
          ? { url: data.avatar, alt: data.avatarAlt || '' }
          : null,
        banner: null,
      };

      await registerUser(formattedData);

      setIsError(false);
      setMessage('Registration successful! You can now log in.');

      setTimeout(() => {
        reset();
        setMessage('');
        closeModal();
        openLogin(data.email);
      }, 2000);
    } catch (error) {
      setIsError(true);
      setMessage('Registration failed. Please try again.');
    }
  };

  if (!showModal) return null;

  return (
    <S.ModalBackdrop>
      <S.ModalContent>
        <S.ModalHeader>
          <h2>Register a new account</h2>
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
        </S.ModalHeader>
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

              {message && (
                <p className={isError ? 'error' : 'success-message'}>
                  {message}
                </p>
              )}
              <S.ButtonContainer>
                <S.RegisterButton type="submit">Register</S.RegisterButton>
              </S.ButtonContainer>
            </form>
          </S.FormContainer>
        </S.FormBackground>

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

        <S.CloseButton
          onClick={() => {
            reset();
            setMessage('');
            closeModal();
          }}
        >
          Close
        </S.CloseButton>
      </S.ModalContent>
    </S.ModalBackdrop>
  );
};

export default Register;
