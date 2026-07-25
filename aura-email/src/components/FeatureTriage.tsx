import { motion } from 'motion/react';
import { SectionEyebrow } from './Primitives';

export function FeatureTriage() {
  const chips = [
    'Auto-categorize',
    'Snooze for later',
    'Silent newsletters',
    'One-tap unsubscribe',
  ];

  const subCards = [
    {
      title: 'Priority (4)',
      color: '#ffffff',
      items: ['Sophia Chen — Q3 review', 'David Lim — contract signoff'],
    },
    {
      title: 'Follow-up (7)',
      color: '#e5e5e5',
      items: ['Marcus — design review', 'Figma — comment thread'],
    },
    {
      title: 'Updates (18)',
      color: '#a3a3a3',
      items: ['Vercel — deploy ready', 'GitHub — PR #482 merged'],
    },
    {
      title: 'Archived (13)',
      color: '#525252',
      items: ['Stripe payout · Newsletter · Receipts'],
    },
  ];

  return (
    <section className="relative z-10 max-w-6xl mx-auto px-6 py-20 md:py-28">
      <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
        {/* Left Column */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <SectionEyebrow label="Triage" tag="AI-native" />
          <h2 className="mt-5 text-3xl md:text-5xl font-semibold tracking-tight leading-[1.02]">
            Clear your inbox <br />
            in a single pass.
          </h2>
          <p className="mt-6 text-white/60 text-base leading-[1.6] max-w-md">
            Aura reads every message, understands intent, and routes the noise away from the signal. Focus on what moves your day forward — the rest handles itself.
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            {chips.map((chip) => (
              <span
                key={chip}
                className="text-xs text-white/70 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03]"
              >
                {chip}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Right Column */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
          className="liquid-glass rounded-2xl p-5"
        >
          <div className="text-xs text-white/50 uppercase tracking-wider mb-4 font-semibold">
            Today · 42 messages triaged
          </div>

          <div className="space-y-3">
            {subCards.map((card) => (
              <div key={card.title} className="liquid-glass rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: card.color }}
                  />
                  <span className="text-xs font-semibold text-white">
                    {card.title}
                  </span>
                </div>
                <div className="space-y-1">
                  {card.items.map((item) => (
                    <div key={item} className="text-xs text-white/60 pl-4">
                      • {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
