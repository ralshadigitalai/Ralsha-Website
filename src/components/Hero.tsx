import React from 'react';
import { HeroCanvas } from './HeroCanvas';

export const Hero: React.FC = () => {
  return (
    <section className="hero" id="top">
      <HeroCanvas />
      <div className="wrap hero-inner">
        <span className="eyebrow">AI-driven growth for ambitious brands</span>
        <h1>
          Your growth,<br />
          <span className="accent">engineered.</span>
        </h1>
        <p className="lead">
          Ralsha runs your media buying, builds your creative, and automates your funnels — every dollar tracked from click to close. Built for teams serious about scaling with AI.
        </p>
        <div className="hero-cta">
          <a href="#contact" className="btn btn-primary">
            Book a strategy call →
          </a>
          <a href="#services" className="btn btn-ghost">
            See what we do
          </a>
        </div>
        <div className="hero-tags">
          <span>AI Ad Automation</span>
          <span>Meta &amp; Google Ads</span>
          <span>Creative &amp; Copy</span>
          <span>Video Production</span>
        </div>
      </div>
    </section>
  );
};
