import React from 'react';

export const Footer: React.FC = () => {
  return (
    <>
      {/* Horizontal Cream Rule */}
      <div
        className="absolute inset-x-6 sm:inset-x-10 bottom-[5.5rem] sm:bottom-28 z-10 h-0.5 bg-cream anim-line pointer-events-none"
        aria-hidden="true"
      />

      {/* Footer Copy */}
      <footer className="absolute inset-x-0 bottom-0 z-30 sm:z-10 flex items-end justify-between px-6 pb-5 sm:px-10 sm:pb-8 text-xs sm:text-sm leading-relaxed font-hn text-cream select-none">
        {/* Footer Left */}
        <div
          className="anim-fade-up flex flex-col"
          style={{ animationDelay: '1400ms' }}
        >
          <span>Visuals Composer</span>
          <span>Digital Crafter</span>
          <span>Obsessed by The Office</span>
        </div>

        {/* Footer Right */}
        <div
          className="anim-fade-up flex flex-col text-right"
          style={{ animationDelay: '1550ms' }}
        >
          <span>A homage to</span>
          <span>Marcus Holloway</span>
        </div>
      </footer>
    </>
  );
};
