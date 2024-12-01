import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/donor-dashboard">Donor Dashboard</Link>
        </li>
        <li>
          <Link to="/seeker-dashboard">Seeker Dashboard</Link>
        </li>
        <li>
          <Link to="/admin-panel">Admin Panel</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
