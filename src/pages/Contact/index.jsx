import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import * as S from './index.styles';
import * as B from '../../styles/GlobalStyle';
import { Helmet } from 'react-helmet';

const schema = yup
  .object({
    name: yup
      .string()
      .min(2, 'Name must be at least 2 characters.')
      .required('Name is required.'),
    subject: yup
      .string()
      .min(3, 'Subject must be at least 3 characters.')
      .required('Subject is required.'),
    email: yup
      .string()
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        'Must be a valid email address'
      )
      .required('Email is required.'),
    message: yup
      .string()
      .min(3, 'Message must be at least 3 characters.')
      .required('Message is required.'),
  })
  .required();

/**
 * Contact Page
 *
 * A contact form for users to submit inquiries or feedback.
 * The form includes validation for name, email, subject, and message fields.
 * Upon successful submission, a success message is displayed for a few seconds.
 *
 * @component
 * @returns {JSX.Element} The Contact page with a form and submission handling.
 */

function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [showAlert, setShowAlert] = useState(false);

  const onSubmit = () => {
    setShowAlert(true);
    reset();
    setTimeout(() => setShowAlert(false), 3000);
  };

  return (
    <div>
      <Helmet>
        <title>Contact Page - Holidaze</title>
      </Helmet>

      <S.HeroSection>
        <S.HeroText>Contact Us</S.HeroText>
      </S.HeroSection>
      <div className="container">
        <S.ContactHeading>
          Please contact us if you have any questions or feedback
        </S.ContactHeading>
      </div>
      <div>
        <S.DividerContainer />
      </div>
      <S.FormBackground>
        <S.FormContainer>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="name">Name:</label>
            <input id="name" {...register('name')} />
            <p className="alert-danger">{errors.name?.message}</p>
            <label htmlFor="email">Email:</label>
            <input id="email" {...register('email')} />
            <p className="alert-danger">{errors.email?.message}</p>
            <label htmlFor="subject">Subject:</label>
            <input id="subject" {...register('subject')} />
            <p className="alert-danger">{errors.subject?.message}</p>
            <label htmlFor="message">Message:</label>
            <textarea id="message" {...register('message')} />
            <p className="alert-danger">{errors.message?.message}</p>
            <S.ButtonContainer>
              <B.OrangeButton type="submit">Send</B.OrangeButton>
            </S.ButtonContainer>
          </form>
          {showAlert && (
            <div className="alert alert-success mt-3" role="alert">
              Your message has been successfully sent!
            </div>
          )}
        </S.FormContainer>
      </S.FormBackground>
      <S.ImageContainer>
        <img
          src="images/contact-logo.png"
          alt="A logo for the Holidaze site."
        />
      </S.ImageContainer>
      <S.ContactEnding>Thank you for visiting us</S.ContactEnding>
    </div>
  );
}

export default Contact;
