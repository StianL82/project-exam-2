import '../../App.css';
import { NavLink } from 'react-router-dom';
import * as S from '../../styles/GlobalStyle';

function Home() {
  return (
    <div className="container">
      <h1>Homepage</h1>
      <h2>Dette er en h2</h2>
      <p>Dette er en liten paragraf</p>

      <ul>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            Home Page
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/venues"
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            Venues Page
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/venue/:id"
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            Single Venue Page
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/profile"
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            Profile Page
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/contact"
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            Contact Page
          </NavLink>
        </li>
      </ul>
      <S.OrangeButton>Orange Button</S.OrangeButton>
      <S.BlueButton>Blue Button</S.BlueButton>
      <S.RedButton>Red Button</S.RedButton>
    </div>
  );
}

export default Home;
