export default function Process() {
  const steps = [
    {
      num: '01',
      title: 'Audit',
      desc: 'We dig into your offer, funnel, and past data to find exactly where profit is leaking.',
    },
    {
      num: '02',
      title: 'Strategy',
      desc: 'A media plan and creative roadmap built around your numbers, never a template.',
    },
    {
      num: '03',
      title: 'Launch',
      desc: 'Campaigns, creative, and automations go live within your first week — tracking validated first.',
    },
    {
      num: '04',
      title: 'Scale',
      desc: "We double down on what's profitable and cut what isn't — every single week.",
    },
  ];

  return (
    <section className="process" id="process">
      <div className="wrap">
        <div className="section-head reveal">
          <span className="eyebrow">How we work</span>
          <h2>
            From first call to{' '}
            <span className="accent">compounding scale.</span>
          </h2>
          <p>
            A straight line from audit to growth — no months-long onboarding.
          </p>
        </div>
        <div className="process-grid">
          {steps.map((step) => (
            <div key={step.num} className="process-card reveal">
              <div className="process-num">{step.num}</div>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
