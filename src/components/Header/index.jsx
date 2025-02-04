import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import Login from '../Login';
import Register from '../Register';
import logOutUser from '../../auth/handlers/logout';
import * as S from './index.styles';
import * as B from '../../styles/GlobalStyle';
import { useAuth } from '../../auth/AuthContext';

/**
 * HeaderNav - A navigation component for the Holidaze application.
 */
function HeaderNav() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [email, setEmail] = useState('');

  const { isLoggedIn, username, updateLoggedInStatus } = useAuth();
  const navRef = useRef(null);
  const navigate = useNavigate();

  /**
   * Opens the Login modal with an optional pre-filled email.
   */
  const openLogin = (prefillEmail = '') => {
    setEmail(prefillEmail);
    setShowLogin(true);
    setShowRegister(false);
  };

  /**
   * Opens the Register modal.
   */
  const openRegister = () => {
    setShowRegister(true);
    setShowLogin(false);
  };

  /**
   * Closes both Login and Register modals and clears the pre-filled email.
   */
  const closeModal = () => {
    setShowLogin(false);
    setShowRegister(false);
    setEmail('');
  };

  /**
   * Logs out the user by removing tokens and navigating to the homepage.
   */
  const handleLogout = () => {
    logOutUser(updateLoggedInStatus, navigate);
  };

  return (
    <S.StyledNavbar
      data-bs-theme="light"
      expand="sm"
      className="py-2"
      expanded={isExpanded}
      onToggle={() => setIsExpanded(!isExpanded)}
      ref={navRef}
    >
      <Container className="d-flex align-items-center justify-content-between">
        <Navbar.Toggle
          aria-controls="navbarResponsive"
          className="order-2 ms-auto"
          onClick={() => setIsExpanded(!isExpanded)}
        />
        <Navbar.Brand as={NavLink} to="/" className="order-1 me-auto logo">
          <S.Logo src="/images/logo.png" alt="Logo for Holidaze" />
        </Navbar.Brand>
        <Navbar.Collapse id="navbarResponsive" className="order-3 text-center">
          <Nav className="ms-auto">
            <Nav.Link
              as={NavLink}
              to="/venues"
              className="nav-link me-0 me-sm-5"
              onClick={() => setIsExpanded(false)}
            >
              Venues
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/contact"
              className="nav-link me-0 me-sm-5"
              onClick={() => setIsExpanded(false)}
            >
              Contact
            </Nav.Link>
            {isLoggedIn && username && (
              <Nav.Link
                as={NavLink}
                to={`/profile/${encodeURIComponent(username)}`} // 🔥 Riktig URL for profil
                className="nav-link me-0 me-sm-5"
                onClick={() => setIsExpanded(false)}
              >
                Profile
              </Nav.Link>
            )}
            {isLoggedIn ? (
              <B.RedButton onClick={handleLogout}>Log out</B.RedButton>
            ) : (
              <B.OrangeButton onClick={() => openLogin()}>
                Log in
              </B.OrangeButton>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>

      <Login
        showModal={showLogin}
        closeModal={closeModal}
        openRegister={openRegister}
        prefillEmail={email}
      />

      <Register
        showModal={showRegister}
        closeModal={closeModal}
        openLogin={openLogin}
      />
    </S.StyledNavbar>
  );
}

export default HeaderNav;
