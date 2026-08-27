'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

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
          <Image
            src="/assets/logo.png"
            alt="Ralsha logo"
            width={44}
            height={44}
            className="loader-logo"
            priority
          />
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
