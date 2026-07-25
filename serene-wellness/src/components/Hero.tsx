import { useState } from 'react';
import { Button } from './Button';

export function Hero() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = ['About', 'Services', 'Journal', 'Contact'];

  return (
    <section className="relative w-full h-screen overflow-hidden bg-[#0a0608] select-none">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260613_180732_a54afbf6-b30d-470e-861f-669871f09f67.mp4"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/20 z-0 pointer-events-none" />

      {/* Fixed Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-5">
        {/* Left Brand Logo */}
        <a href="/" className="font-dancing text-2xl md:text-3xl text-white tracking-wide">
          Serene
        </a>

        {/* Center Desktop Links */}
        <nav className="hidden md:flex items-center gap-12">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-white/80 hover:text-white text-sm tracking-wide transition-colors font-inter"
            >
              {link}
            </a>
          ))}
        </nav>

        {/* Right Desktop Button */}
        <div className="hidden md:block">
          <Button>Book a consultation</Button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Navigation Menu"
          className="md:hidden z-50 relative w-8 h-6 flex flex-col justify-between items-center cursor-pointer"
        >
          <span
            className="w-full h-0.5 bg-white rounded-full transition-transform duration-500"
            style={{
              transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
              transform: isMobileMenuOpen
                ? 'rotate(45deg) translateY(9px)'
                : 'rotate(0deg) translateY(0px)',
            }}
          />
          <span
            className="w-full h-0.5 bg-white rounded-full transition-all duration-300"
            style={{
              transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
              opacity: isMobileMenuOpen ? 0 : 1,
              transform: isMobileMenuOpen ? 'scale(0)' : 'scale(1)',
            }}
          />
          <span
            className="w-full h-0.5 bg-white rounded-full transition-transform duration-500"
            style={{
              transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
              transform: isMobileMenuOpen
                ? 'rotate(-45deg) translateY(-9px)'
                : 'rotate(0deg) translateY(0px)',
            }}
          />
        </button>
      </header>

      {/* Mobile Slide-in Panel */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-40 w-[85%] max-w-[340px] bg-[#0a0608]/95 backdrop-blur-xl border-l border-white/10 p-8 flex flex-col justify-between transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="pt-20 flex flex-col gap-6">
          {navLinks.map((link, i) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-white text-2xl font-instrument hover:text-white/80 transition-all duration-400"
              style={{
                opacity: isMobileMenuOpen ? 1 : 0,
                transform: isMobileMenuOpen ? 'translateX(0)' : 'translateX(20px)',
                transitionDelay: isMobileMenuOpen ? `${150 + i * 75}ms` : '0ms',
              }}
            >
              {link}
            </a>
          ))}
        </div>

        <div
          className="transition-all duration-400"
          style={{
            opacity: isMobileMenuOpen ? 1 : 0,
            transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
            transitionDelay: isMobileMenuOpen ? '450ms' : '0ms',
          }}
        >
          <Button onClick={() => setIsMobileMenuOpen(false)} className="w-full">
            Book a consultation
          </Button>
        </div>
      </div>

      {/* Center Hero Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-10 -mt-[120px] pointer-events-none">
        <h1 className="font-instrument text-white text-[36px] md:text-7xl lg:text-[110px] leading-[0.9] tracking-tight text-center text-glow max-w-6xl">
          Gentle touch. Radiant presence.
        </h1>

        <p className="text-white/70 text-sm md:text-base text-center mt-5 md:mt-7 max-w-xl font-inter">
          Expert beauty and holistic wellness, delivered with warmth and intention.
        </p>

        <div className="pointer-events-auto">
          <Button className="mt-6 md:mt-9">Begin your renewal</Button>
        </div>
      </div>

      {/* Sound Indicator (Desktop only) */}
      <div className="hidden md:flex absolute bottom-8 left-8 z-10 items-center gap-3">
        <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center">
          <div className="w-3 h-0.5 bg-white/70 rounded-full" />
        </div>
        <div className="text-white/60 text-xs leading-tight font-inter">
          <div>Experience</div>
          <div>with sound</div>
        </div>
      </div>
    </section>
  );
}
