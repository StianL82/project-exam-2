import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { loginUser } from '../../auth/login';
import * as S from './index.styles';
import { useAuth } from '../../auth/AuthContext';

const schema = yup.object({
  email: yup
    .string()
    .email('Must be a valid email address.')
    .matches(/@stud\.noroff\.no$/, 'Email must be a @stud.noroff.no address.')
    .required('Email is required.'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters.')
    .required('Password is required.'),
});

/**
 * Login Component
 *
 * A modal for user authentication in the Holidaze application.
 * Handles form validation, API requests, and session storage.
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {boolean} props.showModal - Controls the visibility of the login modal.
 * @param {Function} props.closeModal - Function to close the modal.
 * @param {Function} props.openRegister - Function to switch to the register modal.
 * @param {string} [props.prefillEmail=''] - Optional prefilled email for the login form.
 * @returns {JSX.Element|null} The rendered login modal, or `null` if `showModal` is `false`.
 */
const Login = ({ showModal, closeModal, openRegister, prefillEmail = '' }) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const { updateLoggedInStatus } = useAuth();
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (prefillEmail) {
      setValue('email', prefillEmail);
    }
  }, [prefillEmail, setValue]);

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showModal]);

  const onSubmit = async (data) => {
    try {
      const result = await loginUser(data);

      if (!result || !result.accessToken) {
        throw new Error('Missing access token in API response.');
      }

      localStorage.setItem('accessToken', result.accessToken);
      localStorage.setItem('profile', JSON.stringify(result));

      updateLoggedInStatus();
      setIsError(false);
      setMessage('Login successful!');

      setTimeout(() => {
        reset();
        setMessage('');
        closeModal();
      }, 1000);
    } catch (error) {
      setIsError(true);
      setMessage('Login failed. Please try again.');
    }
  };

  if (!showModal) return null;

  return (
    <S.ModalBackdrop>
      <S.ModalContent>
        <S.ModalHeader>
          <h2>Log in</h2>
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

              <S.ButtonContainer>
                <S.LoginButton type="submit">Log in</S.LoginButton>
              </S.ButtonContainer>
            </form>
            {message && (
              <p className={isError ? 'error' : 'success-message'}>{message}</p>
            )}
          </S.FormContainer>
        </S.FormBackground>
        <S.ModalLink>
          <p>
            or{' '}
            <strong>
              <span className="link" onClick={openRegister}>
                register
              </span>
            </strong>{' '}
            if you don't have an account
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

export default Login;
