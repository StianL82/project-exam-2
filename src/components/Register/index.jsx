import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import registerUser from '../../auth/handlers/register';
import * as S from './index.styles';

const schema = yup.object({
  name: yup
    .string()
    .min(3, 'Name must be at least 3 characters.')
    .matches(
      /^[a-zA-Z0-9_]+$/,
      'Username must only contain letters, numbers, and underscores (_).'
    )
    .required('Username is required.'),
  email: yup
    .string()
    .email('Must be a valid email address.')
    .matches(/@stud\.noroff\.no$/, 'Email must be a @stud.noroff.no address.')
    .required('Email is required.'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters.')
    .required('Password is required.'),
  avatar: yup.string().url('Avatar must be a valid URL.').nullable(),
  avatarAlt: yup
    .string()
    .max(120, 'Alt text must be less than 120 characters.')
    .nullable(),
  venueManager: yup.boolean(),
});

/**
 * Register component for handling user registration.
 * Displays a modal where users can register a new account by providing
 * their username, email, password, and optional avatar details.
 *
 * @param {boolean} showModal - Whether the modal is visible.
 * @param {function} closeModal - Function to close the modal.
 * @param {function} openLogin - Function to open the login modal.
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
      await registerUser(data);

      setMessage('Registration successful! You can now log in.');
      setShowAlert(true);

      reset();

      setTimeout(() => {
        setShowAlert(false);
        closeModal();
        openLogin(data.email);
      }, 2000);
    } catch (error) {
      console.error('Error registering user:', error);

      if (error.message === 'Email already registered') {
        setMessage('This email is already registered. Please log in.');
      } else if (error.message === 'Invalid username') {
        setMessage('The username is invalid. Please try a different one.');
      } else {
        setMessage('Registration failed. Please try again.');
      }
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
              <label>Name:</label>
              <input type="text" {...register('name')} />
              {errors.name && (
                <p className="alert-danger">{errors.name.message}</p>
              )}
              <label>Email:</label>
              <input type="email" {...register('email')} />
              {errors.email && (
                <p className="alert-danger">{errors.email.message}</p>
              )}
              <label>Password:</label>
              <input type="password" {...register('password')} />
              {errors.password && (
                <p className="alert-danger">{errors.password.message}</p>
              )}
              <label>Avatar URL (optional):</label>
              <input type="url" {...register('avatar')} />
              {errors.avatar && (
                <p className="alert-danger">{errors.avatar.message}</p>
              )}
              <label>Avatar Alt Text (optional):</label>
              <input type="text" {...register('avatarAlt')} />
              {errors.avatarAlt && (
                <p className="alert-danger">{errors.avatarAlt.message}</p>
              )}
              <label>
                <input type="checkbox" {...register('venueManager')} />
                Are you a Venue Manager?
              </label>
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
        <p>
          or{' '}
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
          </span>{' '}
          if you already have an account
        </p>
      </S.ModalContent>
    </S.ModalBackdrop>
  );
};

export default Register;
