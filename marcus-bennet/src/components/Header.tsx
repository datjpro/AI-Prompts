import React from 'react';

interface HeaderProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

const NAV_LINKS = [
  { label: 'Story', delay: 1000 },
  { label: 'Jobs', delay: 1080 },
  { label: 'Message', delay: 1160 },
];

const SOCIAL_LINKS = [
  { label: 'Instagram', delay: 1150 },
  { label: 'TikTok', delay: 1230 },
  { label: 'YouTube', delay: 1310 },
];

export const Header: React.FC<HeaderProps> = ({
  mobileMenuOpen,
  setMobileMenuOpen,
}) => {
  return (
    <header className="absolute inset-x-0 top-0 z-30 flex items-start justify-between px-6 pt-6 sm:px-10 sm:pt-8 text-cream">
      {/* Brand / Logo (Left) */}
      <a
        href="#"
        className="font-hn text-lg tracking-wide text-cream anim-fade-up cursor-pointer hover:opacity-80 transition-opacity"
        style={{ animationDelay: '800ms' }}
      >
        Marcus
      </a>

      {/* Desktop Cluster (Right, hidden on mobile) */}
      <div className="hidden sm:flex items-start gap-16 lg:gap-24 font-hn">
        {/* Year */}
        <span
          className="text-sm anim-fade-up text-cream/90 select-none"
          style={{ animationDelay: '900ms' }}
        >
          2025
        </span>

        {/* Nav Column */}
        <nav className="flex flex-col gap-0.5 text-sm" aria-label="Site navigation">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href="#"
              className="anim-fade-up text-cream hover:opacity-60 transition-opacity duration-300 cursor-pointer"
              style={{ animationDelay: `${link.delay}ms` }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Social Column */}
        <div className="flex flex-col gap-0.5 text-sm" aria-label="Social channels">
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.label}
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="anim-fade-up text-cream hover:opacity-60 transition-opacity duration-300 cursor-pointer"
              style={{ animationDelay: `${link.delay}ms` }}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>

      {/* Mobile Hamburger (Visible on mobile only) */}
      <button
        type="button"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="sm:hidden z-50 h-10 w-10 flex flex-col items-center justify-center anim-fade-up cursor-pointer focus:outline-none"
        style={{ animationDelay: '900ms' }}
        aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={mobileMenuOpen}
      >
        <div className="w-6 h-4 flex flex-col justify-between items-center relative">
          <span
            className={`w-6 h-[2px] bg-cream transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
              mobileMenuOpen ? 'rotate-45 translate-y-[7px]' : ''
            }`}
          />
          <span
            className={`w-6 h-[2px] bg-cream transition-opacity duration-300 ${
              mobileMenuOpen ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <span
            className={`w-6 h-[2px] bg-cream transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
              mobileMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''
            }`}
          />
        </div>
      </button>
    </header>
  );
};
