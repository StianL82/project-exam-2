import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import loginUser from '../../auth/handlers/login';
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
 * Login component for handling user login functionality.
 * Displays a modal for users to input their email and password.
 * Pre-fills email field if provided and handles specific error messages.
 *
 * @param {boolean} showModal - Whether the modal is visible.
 * @param {function} closeModal - Function to close the modal.
 * @param {function} openRegister - Function to open the register modal.
 * @param {string} prefillEmail - Email to pre-fill in the form.
 */

const Login = ({ showModal, closeModal, openRegister, prefillEmail }) => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { updateLoggedInStatus } = useAuth();

  useEffect(() => {
    if (prefillEmail) {
      setValue('email', prefillEmail);
    }
  }, [prefillEmail, setValue]);

  const [message, setMessage] = useState('');

  const onSubmit = async (data) => {
    try {
      const result = await loginUser(data);
      const { accessToken, ...profile } = result.data;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('profile', JSON.stringify(profile));

      updateLoggedInStatus();
      setMessage('Login successful!');
      reset();

      setTimeout(() => {
        setMessage('');
        closeModal();
      }, 1000);
    } catch (error) {
      if (error.message === 'Invalid email or password') {
        setMessage('Invalid email or password. Please try again.');
      } else if (error.message === 'Account not found') {
        setMessage('Account not found. Please register.');
      } else {
        setMessage('Login failed. Please try again.');
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
        <h2>Login</h2>
        <S.FormBackground>
          <S.FormContainer>
            <form onSubmit={handleSubmit(onSubmit)}>
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
              <S.ButtonContainer>
                <S.LoginButton type="submit">Login</S.LoginButton>
              </S.ButtonContainer>
            </form>
            {message && <div className="alert alert-success">{message}</div>}
          </S.FormContainer>
        </S.FormBackground>
        <S.ModalLink>
          <p>
            or{' '}
            <strong>
              <span className="link" onClick={openRegister}>
                register
              </span>{' '}
            </strong>
            if you don't have an account
          </p>
        </S.ModalLink>
      </S.ModalContent>
    </S.ModalBackdrop>
  );
};

export default Login;
