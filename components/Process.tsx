import React from 'react';

export const Process: React.FC = () => {
  return (
    <section className="process" id="process">
      <div className="wrap">
        <div className="section-head reveal">
          <span className="eyebrow">How we work</span>
          <h2>
            From first call to <span className="accent">compounding scale.</span>
          </h2>
          <p>A straight line from audit to growth — no months-long onboarding.</p>
        </div>
        <div className="process-grid">
          <div className="process-card reveal">
            <div className="process-num">01</div>
            <h3>Audit</h3>
            <p>We dig into your offer, funnel, and past data to find exactly where profit is leaking.</p>
          </div>
          <div className="process-card reveal">
            <div className="process-num">02</div>
            <h3>Strategy</h3>
            <p>A media plan and creative roadmap built around your numbers, never a template.</p>
          </div>
          <div className="process-card reveal">
            <div className="process-num">03</div>
            <h3>Launch</h3>
            <p>Campaigns, creative, and automations go live within your first week — tracking validated first.</p>
          </div>
          <div className="process-card reveal">
            <div className="process-num">04</div>
            <h3>Scale</h3>
            <p>We double down on what&apos;s profitable and cut what isn&apos;t — every single week.</p>
          </div>
        </div>
      </div>
    </section>
  );
};
