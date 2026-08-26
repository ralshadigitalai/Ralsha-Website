import React from 'react';

export const Services: React.FC = () => {
  return (
    <section className="services" id="services">
      <div className="wrap">
        {/* Service 01 */}
        <div className="service-row reveal">
          <div className="service-text">
            <span className="service-index">01 — AI Media Buying</span>
            <h3>Performance marketing, automated.</h3>
            <p>
              Stop guessing on spend. Our AI bidding layer reallocates budget across Meta and Google in real time, chasing profit instead of vanity metrics — daily optimization, not "set and forget."
            </p>
            <div className="service-pills">
              <span>Meta Ads</span>
              <span>Google Ads</span>
              <span>Funnel &amp; Offer Strategy</span>
              <span>Weekly Reporting</span>
            </div>
          </div>
          <div className="service-visual">
            <div className="visual-head">
              <span>01 — Media Buying</span>
              <div className="visual-badge">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="M3 17l6-6 4 4 8-8" />
                </svg>
              </div>
            </div>
            <div className="bars">
              <i style={{ height: '38%' }} />
              <i style={{ height: '62%' }} />
              <i style={{ height: '48%' }} />
              <i style={{ height: '80%' }} />
              <i style={{ height: '56%' }} />
              <i style={{ height: '92%' }} />
              <i style={{ height: '70%' }} />
              <i
                style={{
                  height: '100%',
                  background: 'linear-gradient(180deg,var(--orange),rgba(245,135,31,0.15))',
                }}
              />
            </div>
            <div className="visual-foot">
              <span>SPEND ₹1,25,000</span>
              <span>ROAS 4.6x</span>
            </div>
          </div>
        </div>

        {/* Service 02 */}
        <div className="service-row reverse reveal">
          <div className="service-text">
            <span className="service-index">02 — Creative Systems</span>
            <h3>Content &amp; creative that converts.</h3>
            <p>
              We write and design ads built to earn the click — high CTR, low CPA — then keep testing variants until they win again, every single week.
            </p>
            <div className="service-pills">
              <span>Ad Copywriting</span>
              <span>Static &amp; Carousel Design</span>
              <span>A/B Creative Testing</span>
              <span>Landing Pages</span>
            </div>
          </div>
          <div className="service-visual">
            <div className="visual-head">
              <span>02 — Creative That Converts</span>
              <div className="visual-badge">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="M12 20l9-9-4-4-9 9v4h4z" />
                </svg>
              </div>
            </div>
            {/* Note: Unsplash image hotlink placeholder - download and self-host before production */}
            <div
              className="visual-photo"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1716471330463-f475b00f0506?q=80&w=800&auto=format&fit=crop')",
              }}
            />
            <div className="visual-foot">
              <span>CTR +38%</span>
              <span>CPA −24%</span>
            </div>
          </div>
        </div>

        {/* Service 03 */}
        <div className="service-row reveal">
          <div className="service-text">
            <span className="service-index">03 — Video Production</span>
            <h3>Video, produced start to finish.</h3>
            <p>
              High-impact, scroll-stopping video — we handle scripting, shooting, and editing end to end, so every asset is built to perform, not just to look good.
            </p>
            <div className="service-pills">
              <span>Scripting</span>
              <span>Shoot Direction</span>
              <span>Editing &amp; VFX</span>
              <span>Hooks for Every Platform</span>
            </div>
          </div>
          <div className="service-visual">
            <div className="visual-head">
              <span>03 — Scroll-Stopping Video</span>
              <div className="visual-badge">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="M23 7l-7 5 7 5V7z" />
                  <rect x="1" y="5" width="15" height="14" rx="2" />
                </svg>
              </div>
            </div>
            {/* Note: Unsplash image hotlink placeholder - download and self-host before production */}
            <div
              className="video-frame"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1612894542733-219bb3476343?q=80&w=800&auto=format&fit=crop')",
              }}
            >
              <div className="play-btn" style={{ position: 'relative', zIndex: 1 }}>
                <svg viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
            <div className="visual-foot">
              <span>WATCH TIME +2.1x</span>
              <span>HOOK RATE 61%</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
