import React, { useState, useEffect } from 'react';
import logo from '../assets/logo.png';

export const Nav: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const closeMobile = () => setMobileOpen(false);

  return (
    <header id="siteHeader" className={scrolled ? 'scrolled' : ''}>
      <div className="wrap">
        <nav>
          <a href="#top" className="brand" onClick={closeMobile}>
            <img src={logo} alt="Ralsha logo" />
            <b>RALSHA</b>
          </a>
          <div className="nav-links">
            <a href="#services">Services</a>
            <a href="#process">Process</a>
            <a href="#who">Who it's for</a>
            <a href="#contact">Contact</a>
          </div>
          <div className="nav-right">
            <a href="mailto:ralshadigitalai@gmail.com" className="nav-email">
              ralshadigitalai@gmail.com
            </a>
            <a href="#contact" className="btn btn-primary">
              Book a strategy call
            </a>
          </div>
          <button
            className="menu-btn"
            aria-label="Menu"
            onClick={() => setMobileOpen((prev) => !prev)}
          >
            {mobileOpen ? '✕' : '☰'}
          </button>
        </nav>
      </div>

      {mobileOpen && (
        <div className="mobile-nav-panel">
          <div className="mobile-nav-links">
            <a href="#services" onClick={closeMobile}>
              Services
            </a>
            <a href="#process" onClick={closeMobile}>
              Process
            </a>
            <a href="#who" onClick={closeMobile}>
              Who it's for
            </a>
            <a href="#contact" onClick={closeMobile}>
              Contact
            </a>
          </div>
          <div className="mobile-nav-right">
            <a href="mailto:ralshadigitalai@gmail.com" className="nav-email" onClick={closeMobile}>
              ralshadigitalai@gmail.com
            </a>
            <a href="#contact" className="btn btn-primary" onClick={closeMobile}>
              Book a strategy call
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
