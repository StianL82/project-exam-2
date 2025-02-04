import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { loginUser } from '../../auth/login';
import * as S from './index.styles';
import { useAuth } from '../../auth/AuthContext';

/**
 * Skjema for innlogging.
 */
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

const Login = ({ showModal, closeModal, openRegister }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const { updateLoggedInStatus } = useAuth();
  const [message, setMessage] = useState('');

  const onSubmit = async (data) => {
    try {
      console.log('🔑 Prøver å logge inn:', data);

      // 🔥 Logg inn brukeren
      const result = await loginUser(data);

      console.log('✅ Innlogging vellykket:', result);

      if (!result || !result.accessToken) {
        throw new Error('❌ Mangler accessToken i API-respons.');
      }

      // 🔥 Oppdater localStorage
      localStorage.setItem('accessToken', result.accessToken);
      localStorage.setItem('profile', JSON.stringify(result));

      // 🔥 Sjekk om token er lagret riktig
      console.log('🔍 Lagret token:', localStorage.getItem('accessToken'));

      updateLoggedInStatus();
      setMessage('Login successful!');

      setTimeout(() => {
        reset();
        setMessage('');
        closeModal();
      }, 1000);
    } catch (error) {
      console.error('❌ Feil under innlogging:', error.message);
      setMessage('Login failed. Please try again.');
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
              </span>
            </strong>{' '}
            if you don't have an account
          </p>
        </S.ModalLink>
      </S.ModalContent>
    </S.ModalBackdrop>
  );
};

export default Login;
