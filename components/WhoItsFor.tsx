import React from 'react';

export const WhoItsFor: React.FC = () => {
  return (
    <section className="who" id="who">
      <div className="wrap">
        <div className="section-head reveal">
          <span className="eyebrow">Who it&apos;s for</span>
          <h2>
            Built for teams that are <span className="accent">ready to scale.</span>
          </h2>
          <p>
            We work with any business that has a real offer and is serious about growth — regardless of industry.
          </p>
        </div>
        <div className="who-grid">
          <div
            className="who-tile reveal"
            style={{
              backgroundImage:
                "linear-gradient(180deg, rgba(6,13,32,0.15), rgba(6,13,32,0.85)), url('https://images.unsplash.com/photo-1758691737182-d42aefd6dee8?q=80&w=800&auto=format&fit=crop')",
            }}
          >
            <span>Coaches</span>
          </div>
          <div
            className="who-tile reveal"
            style={{
              backgroundImage:
                "linear-gradient(180deg, rgba(6,13,32,0.15), rgba(6,13,32,0.85)), url('https://images.unsplash.com/photo-1664455340023-214c33a9d0bd?q=80&w=800&auto=format&fit=crop')",
            }}
          >
            <span>E-commerce</span>
          </div>
          <div
            className="who-tile reveal"
            style={{
              backgroundImage:
                "linear-gradient(180deg, rgba(6,13,32,0.15), rgba(6,13,32,0.85)), url('https://images.unsplash.com/photo-1758691462878-6edc3d3da1be?q=80&w=800&auto=format&fit=crop')",
            }}
          >
            <span>Healthcare</span>
          </div>
          <div
            className="who-tile reveal"
            style={{
              backgroundImage:
                "linear-gradient(180deg, rgba(6,13,32,0.15), rgba(6,13,32,0.85)), url('https://images.unsplash.com/photo-1630673559640-000a51b4dd28?q=80&w=800&auto=format&fit=crop')",
            }}
          >
            <span>Tech &amp; SaaS</span>
          </div>
        </div>

        <div className="who-cols">
          <div className="who-col reveal">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 21v-1a8 8 0 0116 0v1" />
            </svg>
            <h4>Coaches &amp; course creators</h4>
            <p>
              You sell expertise and outcomes. We turn that into ads people trust enough to click, and funnels that turn clicks into paying students.
            </p>
          </div>
          <div className="who-col reveal">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M3 3h2l2.4 12.4a2 2 0 002 1.6h8.4a2 2 0 002-1.6L21 8H6" />
              <circle cx="9" cy="20" r="1.4" />
              <circle cx="17" cy="20" r="1.4" />
            </svg>
            <h4>D2C &amp; e-commerce brands</h4>
            <p>
              Product-led ads, tight CPAs, and creative that gets refreshed before fatigue sets in — built for catalogs that need to move.
            </p>
          </div>
          <div className="who-col reveal">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M3 10l9-7 9 7" />
              <path d="M5 9v11h14V9" />
            </svg>
            <h4>Service-based businesses</h4>
            <p>
              Clinics, consultants, law firms, studios, agencies — we fill pipelines with qualified leads and cut the cost of acquiring every one.
            </p>
          </div>
          <div className="who-col reveal">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M4 19l5-5 4 4 7-7" />
              <path d="M15 11h5v5" />
            </svg>
            <h4>SaaS &amp; tech brands</h4>
            <p>
              Subscription growth, free-to-paid conversion, or enterprise pipeline — we engineer paid acquisition that compounds month on month.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
