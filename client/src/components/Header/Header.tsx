import React from 'react';
import logo from '../../assets/logo.png';
import './Header.css';

const Header: React.FC = () => {
  return (
    <nav className="navbar bg-light mb-4 p-0">
      <div className="container">
        <a href="/" className="navbar-brand">
          <div className="d-flex">
            <img src={logo} id="header-image" height="30px" alt="logo" className="mr-2" />
            <span>MERN Apollo</span>
          </div>
        </a>
      </div>
    </nav>
  );
}

export default Header;
