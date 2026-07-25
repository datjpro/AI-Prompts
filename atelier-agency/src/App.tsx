import { useState, useEffect } from 'react';
import { ArrowRight, Play, X } from 'lucide-react';

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isMobileMenuOpen]);

  const desktopNavLinks = ['Projects', 'Expertise', 'Studio', 'Insights'];
  const mobileNavLinks = ['Projects', 'Expertise', 'Studio', 'Insights', 'Reach Out'];

  return (
    <div className="w-full h-screen overflow-hidden relative select-none bg-black">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_204103_f607742e-09da-4cf5-bb06-4e67b0a531de.mp4"
      />

      {/* Main Relative Layer */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Navbar */}
        <header className="px-6 md:px-12 lg:px-16 py-5 md:py-6 flex items-center justify-between w-full">
          {/* Left Side */}
          <div className="flex items-center">
            <a href="/" className="text-white font-semibold text-lg tracking-tight font-sans">
              Atelier
            </a>

            <nav className="hidden md:flex items-center gap-8 lg:gap-12 ml-10 lg:ml-16">
              {desktopNavLinks.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="text-white/80 hover:text-white text-sm font-light transition-colors duration-200 font-sans"
                >
                  {link}
                </a>
              ))}
            </nav>
          </div>

          {/* Right Side */}
          <div className="flex items-center">
            <a
              href="#reach-out"
              className="hidden md:block text-white/80 hover:text-white text-sm font-light transition-colors duration-200 font-sans cursor-pointer mr-8"
            >
              Reach Out
            </a>

            <button className="hidden md:block bg-white text-black font-medium text-sm rounded-full px-5 py-2 hover:bg-white/90 transition-colors duration-200 font-sans cursor-pointer">
              Let's Talk
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
              className="md:hidden cursor-pointer relative w-7 h-5 flex flex-col justify-between items-end p-0 bg-transparent border-none outline-none"
            >
              <span
                className="w-6 h-[2px] bg-white rounded-full transition-transform duration-500"
                style={{
                  transitionTimingFunction: 'cubic-bezier(0.76, 0, 0.24, 1)',
                  transform: isMobileMenuOpen
                    ? 'rotate(45deg) translateY(9px)'
                    : 'rotate(0deg) translateY(0px)',
                }}
              />
              <span
                className="w-4 h-[2px] bg-white rounded-full transition-all duration-500"
                style={{
                  transitionTimingFunction: 'cubic-bezier(0.76, 0, 0.24, 1)',
                  opacity: isMobileMenuOpen ? 0 : 1,
                  transform: isMobileMenuOpen ? 'scaleX(0)' : 'scaleX(1)',
                }}
              />
              <span
                className="w-6 h-[2px] bg-white rounded-full transition-transform duration-500"
                style={{
                  transitionTimingFunction: 'cubic-bezier(0.76, 0, 0.24, 1)',
                  transform: isMobileMenuOpen
                    ? 'rotate(-45deg) translateY(-9px)'
                    : 'rotate(0deg) translateY(0px)',
                }}
              />
            </button>
          </div>
        </header>

        {/* Hero Content (Centered) */}
        <main className="flex-1 flex flex-col items-center justify-start pt-4 sm:pt-6 md:pt-8 lg:pt-10 px-6 text-center">
          {/* Heading (h1) */}
          <h1 className="font-instrument-serif text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[1.1] max-w-5xl font-normal">
            UX <span className="italic font-instrument-serif">and</span> APP <br />
            DESIGN <span className="italic font-instrument-serif">for</span> BOLD <br />
            VENTURES
          </h1>

          {/* Subtext (p) */}
          <p className="mt-4 md:mt-5 text-white/70 text-sm md:text-base font-light max-w-md leading-relaxed font-sans">
            We shape digital products that define brands{' '}
            <br className="hidden sm:block" />
            and unlock exponential growth.
          </p>

          {/* Buttons Row */}
          <div className="mt-5 md:mt-6 flex flex-col sm:flex-row items-center gap-4">
            <button className="bg-white text-black rounded-full px-7 py-3 text-sm font-medium hover:bg-white/90 transition-all duration-200 group flex items-center gap-2 cursor-pointer font-sans">
              <span>See Cases</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </button>

            <button className="bg-transparent border border-white/40 text-white rounded-full px-7 py-3 text-sm font-medium hover:bg-white/10 hover:border-white/60 transition-all duration-200 flex items-center gap-2 cursor-pointer font-sans">
              <Play className="w-4 h-4 fill-current" />
              <span>Watch Reel</span>
            </button>
          </div>
        </main>
      </div>

      {/* Mobile Menu Overlay (fixed inset-0 z-50, md:hidden) */}
      <div
        className={`fixed inset-0 z-50 md:hidden bg-black/90 backdrop-blur-xl transition-all duration-700 ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{ transitionTimingFunction: 'cubic-bezier(0.76, 0, 0.24, 1)' }}
      >
        <div className="flex flex-col justify-between h-full px-6 py-6 max-w-lg mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between w-full">
            <span className="text-white font-semibold text-lg tracking-tight font-sans">
              Atelier
            </span>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close mobile menu"
              className="text-white p-2 cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Staggered Vertical Links */}
          <div className="flex flex-col items-center w-full my-auto">
            {mobileNavLinks.map((link, idx) => (
              <a
                key={link}
                href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-4xl sm:text-5xl font-instrument-serif text-white border-b border-white/10 py-4 w-full text-center transition-all duration-500 hover:pl-4 cursor-pointer ${
                  isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
                style={{
                  transitionDelay: isMobileMenuOpen ? `${150 + idx * 80}ms` : '0ms',
                  transitionTimingFunction: 'cubic-bezier(0.76, 0, 0.24, 1)',
                }}
              >
                {link}
              </a>
            ))}
          </div>

          {/* Footer Button */}
          <div
            className={`w-full transition-all duration-700 ${
              isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{
              transitionDelay: isMobileMenuOpen ? '550ms' : '0ms',
              transitionTimingFunction: 'cubic-bezier(0.76, 0, 0.24, 1)',
            }}
          >
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="bg-white text-black font-medium text-base rounded-full py-4 w-full text-center hover:bg-white/90 transition-colors font-sans cursor-pointer"
            >
              Let's Talk
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
