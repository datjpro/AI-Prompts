import { useState } from 'react';

export function Pricing() {
  const [yearly, setYearly] = useState(false);

  const plans = [
    {
      tier: 'Free',
      price: 'Free',
      desc: 'For creators taking their first steps with Forma.',
      features: [
        'Up to 3 projects in the cloud',
        'Image export up to 1080p',
        'Basic editing tools',
        'Free templates and icons',
        'Access via web and mobile app',
      ],
      isPro: false,
    },
    {
      tier: 'Standard',
      price: yearly ? '$99,99/y' : '$9,99/m',
      desc: 'For freelancers and small teams who need more freedom and flexibility.',
      features: [
        'Up to 50 projects in the cloud',
        'Export up to 4K',
        'Advanced editing toolkit',
        'Team collaboration (up to 5 members)',
        'Access to premium template library',
      ],
      isPro: false,
    },
    {
      tier: 'Pro',
      price: yearly ? '$199,99/y' : '$19,99/m',
      desc: 'For studios, agencies, and professional creators working with brands.',
      features: [
        'Unlimited projects',
        'Export up to 8K + animations',
        'AI-powered content generation tools',
        'Unlimited team members',
        'Brand customization',
      ],
      isPro: true,
    },
  ];

  return (
    <section className="c3-pricing-section relative z-10" id="pricing">
      {/* SVG Noise Filter Definition */}
      <svg className="absolute w-0 h-0 pointer-events-none">
        <filter id="c3-noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.5"
            numOctaves="2"
            stitchTiles="stitch"
          />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.075" />
          </feComponentTransfer>
          <feComposite in2="SourceGraphic" operator="in" result="noise" />
          <feBlend in="SourceGraphic" in2="noise" mode="overlay" />
        </filter>
      </svg>

      {/* Watermark Background */}
      <div className="c3-watermark-container">
        <div className="c3-watermark-main">
          <span className="c3-watermark-line-1">Your email.</span>
          <span className="c3-watermark-line-2">Revitalized</span>
        </div>
      </div>

      {/* 3 Pricing Cards */}
      <div className="c3-grid">
        {plans.map((plan) => (
          <div
            key={plan.tier}
            className={`c3-card ${plan.isPro ? 'c3-card-pro' : ''}`}
          >
            <div className="c3-tier-small">{plan.tier}</div>
            <div className="c3-tier-large">{plan.price}</div>
            <div className="c3-desc">{plan.desc}</div>

            <ul className="c3-list flex-1">
              {plan.features.map((feature, i) => (
                <li key={i}>
                  <span className="c3-check">
                    <svg
                      className="w-3.5 h-3.5 text-white"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <button className="c3-btn">Choose Plan</button>
          </div>
        ))}
      </div>

      {/* Toggle */}
      <div className="c3-toggle-wrap">
        <span className="text-sm font-medium text-white/70">Yearly</span>
        <button
          type="button"
          aria-label="Toggle yearly billing"
          className={`c3-toggle ${yearly ? 'active' : ''}`}
          onClick={() => setYearly(!yearly)}
        >
          <div className="c3-toggle-knob" />
        </button>
      </div>
    </section>
  );
}
