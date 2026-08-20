import React, { useState } from 'react';

const NAV_LINKS = ['Labs', 'Studio', 'Openings', 'Shop'];

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-10 w-full px-5 sm:px-8 py-4 sm:py-5 flex justify-between items-center">
        {/* Logo (Left) */}
        <a href="#top" className="flex items-center gap-3 select-none group">
          <span
            className="text-[21px] sm:text-[26px] tracking-tight text-black font-medium"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Mainframe®
          </span>
          <span
            className="text-[25px] sm:text-[30px] text-black select-none leading-none -mt-1"
            style={{ letterSpacing: '-0.02em' }}
            aria-hidden="true"
          >
            ✳︎
          </span>
        </a>

        {/* Desktop Nav Links (Center, hidden below md) */}
        <nav
          className="hidden md:flex items-center text-[23px] text-black"
          aria-label="Primary"
        >
          {NAV_LINKS.map((link, index) => (
            <React.Fragment key={link}>
              <a
                href={`#${link.toLowerCase()}`}
                className="hover:opacity-60 transition-opacity"
              >
                {link}
              </a>
              {index < NAV_LINKS.length - 1 && <span>,&nbsp;</span>}
            </React.Fragment>
          ))}
        </nav>

        {/* Desktop CTA (Right, hidden below md) */}
        <div className="hidden md:block">
          <a
            href="#contact"
            className="text-[23px] text-black underline underline-offset-2 hover:opacity-60 transition-opacity"
          >
            Get in touch
          </a>
        </div>

        {/* Mobile Hamburger (Visible below md) */}
        <button
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className="md:hidden z-20 flex flex-col justify-center items-center gap-[5px] p-2 focus:outline-none cursor-pointer"
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileMenuOpen}
        >
          <span
            className={`w-6 h-[2px] bg-black transition-all duration-300 transform ${
              mobileMenuOpen ? 'rotate-45 translate-y-[7px]' : ''
            }`}
          />
          <span
            className={`w-6 h-[2px] bg-black transition-opacity duration-300 ${
              mobileMenuOpen ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <span
            className={`w-6 h-[2px] bg-black transition-all duration-300 transform ${
              mobileMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''
            }`}
          />
        </button>
      </header>

      {/* Mobile Overlay (z-index: 9) */}
      <div
        className={`fixed inset-0 bg-white/95 backdrop-blur-sm z-[9] flex flex-col justify-center px-8 gap-8 transition-opacity duration-300 md:hidden ${
          mobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col gap-6 text-left">
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              onClick={() => setMobileMenuOpen(false)}
              className="text-[32px] font-medium text-black hover:opacity-60 transition-opacity"
            >
              {link}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="text-[32px] font-medium text-black underline underline-offset-2 hover:opacity-60 transition-opacity mt-4"
          >
            Get in touch
          </a>
        </div>
      </div>
    </>
  );
};
