import React from 'react';

export const Marquee: React.FC = () => {
  return (
    <div
      className="absolute inset-x-0 top-[16vh] sm:top-[14vh] z-10 overflow-hidden select-none pointer-events-none anim-fade-up"
      style={{ animationDelay: '500ms' }}
      aria-hidden="true"
    >
      <div className="marquee-track flex w-max whitespace-nowrap font-hn text-[16vh] sm:text-[26vh] leading-none text-cream tracking-tight font-normal">
        <span className="inline-block pr-[6vw]">
          Marcus &mdash; Bennet&nbsp;
        </span>
        <span className="inline-block pr-[6vw]">
          Marcus &mdash; Bennet&nbsp;
        </span>
      </div>
    </div>
  );
};
