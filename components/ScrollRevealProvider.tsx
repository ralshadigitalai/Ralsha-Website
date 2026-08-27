'use client';

import React, { useEffect } from 'react';

export const ScrollRevealProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const revealEls = document.querySelectorAll('.reveal');

    if (prefersReduced) {
      revealEls.forEach((el) => el.classList.add('in'));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    revealEls.forEach((el) => io.observe(el));

    return () => {
      io.disconnect();
    };
  }, []);

  return <>{children}</>;
};
