import React, { useEffect, useState } from 'react';
import logo from '../assets/logo.png';

export const LoadingScreen: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 700);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`app-loader ${!loading ? 'fade-out' : ''}`}>
      <div className="loader-content">
        <div className="loader-logo-wrapper">
          <img src={logo} alt="Ralsha logo" className="loader-logo" />
          <div className="loader-pulse-ring"></div>
        </div>
        <span className="loader-brand">RALSHA</span>
        <div className="loader-bar">
          <div className="loader-progress"></div>
        </div>
      </div>
    </div>
  );
};
