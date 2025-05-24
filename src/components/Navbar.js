import React, { useState } from 'react';
import './landingpage.css';
import { Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <>
      <nav>
        <div className="nav-container">
          <Link to="/" className="logo">
            <span className="logo-icon">
              <i className="fas fa-atom"></i>
            </span>
            TRANSPOLYMER
          </Link>

          <ul className="nav-links">
            <li><Link to="/#features">Features</Link></li>
            <li><Link to="/#how-it-works">How It Works</Link></li>
            <li><Link to="/#use-cases">Use Cases</Link></li>
            <li><Link to="/login" className="nav-cta">Get Started</Link></li>
          </ul>

          <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
            <i className="fas fa-bars"></i>
          </button>
        </div>
      </nav>

      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <button className="mobile-menu-close" onClick={toggleMobileMenu}>
          <i className="fas fa-times"></i>
        </button>
        <ul className="mobile-links">
          <li><Link to="/#features" onClick={toggleMobileMenu}>Features</Link></li>
          <li><Link to="/#how-it-works" onClick={toggleMobileMenu}>How It Works</Link></li>
          <li><Link to="/#use-cases" onClick={toggleMobileMenu}>Use Cases</Link></li>
          <li><Link to="/login" className="nav-cta" onClick={toggleMobileMenu}>Get Started</Link></li>
        </ul>
      </div>

      <div className={`overlay ${isMobileMenuOpen ? 'active' : ''}`} onClick={toggleMobileMenu}></div>
    </>
  );
};

export default Navbar;
