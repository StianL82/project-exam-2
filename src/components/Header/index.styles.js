import styled from 'styled-components';
import Navbar from 'react-bootstrap/Navbar';

export const Logo = styled.img`
  height: auto;
  width: 100px;
  max-width: 100%;
  object-fit: contain;
`;

export const StyledNavbar = styled(Navbar)`
  background-color: ${(props) => props.theme.color.turquoise};
  border-bottom: 1px solid ${(props) => props.theme.color.darkGray};

  .nav-link {
    color: ${(props) => props.theme.color.darkGray};
    font-size: 20px;
    font-weight: normal;
    margin-right: 5px !important;
    padding: 0;
    transition:
      color 0.3s ease,
      font-weight 0.3s ease;

    &:hover {
      font-weight: bold;
      text-decoration: none;
    }

    &.active {
      font-weight: bold;
      text-decoration: underline;
    }
  }

  .navbar-toggler {
    order: 2;
  }

  .navbar-brand {
    order: 1;
  }

  .navbar-collapse {
    order: 3;
  }

  .navbar-nav {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @media (max-width: 179px) {
    .navbar-toggler {
      order: 1 !important;
    }

    .navbar-brand {
      order: 2 !important;
      margin: 0 auto;
      display: flex;
      justify-content: center;
    }

    .navbar-collapse {
      order: 3 !important;
    }
  }
`;
