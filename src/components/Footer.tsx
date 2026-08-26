import React from 'react';
import logo from '../assets/logo.png';

export const Footer: React.FC = () => {
  return (
    <footer>
      <div className="wrap">
        <div className="footer-top">
          <div className="footer-brand">
            <a href="#top" className="brand">
              <img src={logo} alt="Ralsha logo" style={{ height: '36px', width: '36px' }} />
              <b>RALSHA</b>
            </a>
            <p>AI-driven growth for ambitious businesses that grow on conviction, not guesswork.</p>
            <div className="socials" style={{ marginTop: '20px' }}>
              <a href="#" aria-label="LinkedIn">
                in
              </a>
              <a href="#" aria-label="Instagram">
                ◎
              </a>
            </div>
          </div>
          <div className="footer-col">
            <h4>Studio</h4>
            <a href="#services">Services</a>
            <a href="#process">Process</a>
            <a href="#who">Who it's for</a>
          </div>
          <div className="footer-col">
            <h4>Contact</h4>
            <a href="mailto:ralshadigitalai@gmail.com">ralshadigitalai@gmail.com</a>
            <a href="#">Hyderabad, India</a>
          </div>
          <div className="footer-col">
            <h4>Legal</h4>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Ralsha Digital &amp; AI Solutions. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
};
