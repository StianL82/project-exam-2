import '../../App.css';
import { NavLink } from 'react-router-dom';

function Venue() {
  return (
    <div className="container">
      <h1>Venue Page</h1>
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
    </div>
  );
}

export default Venue;
