import { useState, useEffect } from 'react';
import { ChevronDown, ArrowRight, Triangle } from 'lucide-react';

const VIDEO_URL = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260820_010308_b1636845-4c15-4ab6-b0c9-9a29bfb0c6e3.mp4';

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <div className="min-h-screen bg-brand-cream text-brand-dark font-helvetica-neue">
      {/* 1) NAVBAR */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-brand-cream/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="relative flex items-center h-16 md:h-20">
            {/* Desktop Left Links */}
            <div className="hidden md:flex items-center gap-8 animate-fade-down stagger-1">
              <button
                type="button"
                className="text-sm text-brand-dark tracking-wide uppercase hover:opacity-70 transition-opacity flex items-center gap-1 cursor-pointer focus:outline-none"
              >
                Solutions
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
              <a
                href="#plans"
                onClick={(e) => e.preventDefault()}
                className="text-sm text-brand-dark tracking-wide uppercase hover:opacity-70 transition-opacity"
              >
                Plans
              </a>
              <a
                href="#news"
                onClick={(e) => e.preventDefault()}
                className="text-sm text-brand-dark tracking-wide uppercase hover:opacity-70 transition-opacity"
              >
                News
              </a>
            </div>

            {/* Center Logo */}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 animate-fade-down stagger-2 cursor-pointer focus:outline-none"
            >
              <Triangle className="w-5 h-5 text-brand-dark fill-brand-dark" />
              <span className="text-xl text-brand-dark tracking-tight font-helvetica-neue">
                Palomar
              </span>
            </a>

            {/* Desktop Right CTA */}
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="hidden md:inline-flex items-center ml-auto px-5 py-2.5 bg-brand-dark text-white text-sm tracking-wide uppercase rounded-full hover:bg-brand-green transition-colors animate-fade-down stagger-3 cursor-pointer"
            >
              Try It Free
            </a>

            {/* Mobile Hamburger */}
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden ml-auto z-50 w-10 h-10 relative flex items-center justify-center cursor-pointer focus:outline-none"
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-5">
                <span
                  className={`w-6 h-[2px] bg-brand-dark rounded absolute left-0 top-[6px] transition-all duration-300 ease-[cubic-bezier(0.68,-0.6,0.32,1.6)] ${
                    menuOpen ? 'rotate-45 translate-y-[5px]' : ''
                  }`}
                />
                <span
                  className={`w-6 h-[2px] bg-brand-dark rounded absolute left-0 top-[13px] transition-all duration-300 ease-[cubic-bezier(0.68,-0.6,0.32,1.6)] ${
                    menuOpen ? '-rotate-45 -translate-y-[2px]' : ''
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU OVERLAY */}
      <div
        className={`md:hidden fixed inset-0 bg-brand-cream z-40 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className={`flex flex-col items-center justify-center h-full gap-8 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] delay-100 ${
            menuOpen ? 'translate-y-0 opacity-100' : '-translate-y-8 opacity-0'
          }`}
        >
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setMenuOpen(false);
            }}
            className="text-3xl text-brand-dark tracking-tight hover:opacity-70 transition-opacity"
          >
            Solutions
          </a>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setMenuOpen(false);
            }}
            className="text-3xl text-brand-dark tracking-tight hover:opacity-70 transition-opacity"
          >
            Plans
          </a>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setMenuOpen(false);
            }}
            className="text-3xl text-brand-dark tracking-tight hover:opacity-70 transition-opacity"
          >
            News
          </a>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setMenuOpen(false);
            }}
            className="mt-4 inline-flex items-center px-8 py-3.5 bg-brand-dark text-white text-lg tracking-wide rounded-full hover:bg-brand-green transition-colors"
          >
            Try It Free
          </a>
        </div>
      </div>

      {/* 2) HERO SECTION */}
      <section className="relative w-full h-screen min-h-[700px] overflow-hidden bg-brand-cream">
        {/* Video Layer */}
        <div className="absolute inset-0">
          <video
            src={VIDEO_URL}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover object-bottom"
          />
        </div>

        {/* Content Column */}
        <div className="relative z-10 flex flex-col items-start max-w-7xl mx-auto pt-28 md:pt-36 px-6 lg:px-8">
          {/* Announcement Pill */}
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-dark/15 bg-white/60 backdrop-blur-sm hover:bg-white/80 transition-colors mb-5 md:mb-6 animate-fade-up stagger-3 cursor-pointer"
          >
            <span className="text-sm text-brand-dark font-normal">
              Live for everyone today! Offering $1MM in credits.
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-brand-dark" />
          </a>

          {/* Headline */}
          <h1 className="text-left text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-brand-dark leading-[1.05] tracking-tight max-w-4xl font-helvetica-neue animate-fade-up stagger-4">
            One unified system to build,
            <br className="hidden sm:block" /> test, ship, and observe LLMs
          </h1>

          {/* 3) TRUSTED BY */}
          <div className="w-full mt-8 md:mt-10 animate-fade-up stagger-5">
            <p className="text-left text-xs tracking-[0.25em] uppercase text-brand-dark/50 mb-6 md:mb-8 font-helvetica-neue">
              Backed by
            </p>
            <div className="flex flex-wrap items-center justify-start gap-6 md:gap-12 lg:gap-16 animate-fade-up stagger-6">
              <span className="font-playfair text-lg md:text-xl lg:text-2xl text-brand-dark/80 whitespace-nowrap">
                Meridian
              </span>
              <span className="font-oswald uppercase text-lg md:text-xl lg:text-2xl text-brand-dark/80 whitespace-nowrap">
                STELLEX
              </span>
              <span className="font-montserrat text-lg md:text-xl lg:text-2xl text-brand-dark/80 whitespace-nowrap">
                Luminar
              </span>
              <span className="font-roboto-slab uppercase text-lg md:text-xl lg:text-2xl text-brand-dark/80 whitespace-nowrap">
                OVERLAND
              </span>
              <span className="font-raleway text-lg md:text-xl lg:text-2xl text-brand-dark/80 whitespace-nowrap">
                Kinetic
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
