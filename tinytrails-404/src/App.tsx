import { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowLeft } from 'lucide-react';

export default function App() {
  const [scaleY, setScaleY] = useState<number>(1);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const calculateScale = () => {
      if (textRef.current) {
        const offsetHeight = textRef.current.offsetHeight;
        if (offsetHeight > 0) {
          setScaleY(window.innerHeight / offsetHeight);
        }
      }
    };

    calculateScale();
    window.addEventListener('resize', calculateScale);
    return () => window.removeEventListener('resize', calculateScale);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const navLinks = ['About Us', 'Programs', 'Reviews', 'FAQ', 'Contacts'];

  return (
    <div className="w-full h-screen overflow-hidden flex flex-col relative bg-gradient-to-b from-[#FF8233] to-[#FDAC55]">
      {/* BACKGROUND "404" TEXT EFFECT */}
      <div
        className="absolute inset-0 pointer-events-none opacity-80 flex items-center justify-center overflow-hidden"
        style={{
          WebkitMaskImage: 'linear-gradient(to bottom, black 40%, transparent 95%)',
          maskImage: 'linear-gradient(to bottom, black 40%, transparent 95%)',
        }}
      >
        <div className="relative flex items-center justify-center">
          {/* "404" Text */}
          <div
            ref={textRef}
            className="text-white font-black leading-none tracking-tighter whitespace-nowrap select-none"
            style={{
              fontSize: 'clamp(200px, 48vw, 800px)',
              transform: `scale(1.15, ${scaleY * 1.4})`,
              transformOrigin: 'center',
            }}
          >
            404
          </div>

          {/* White Oval */}
          <div
            className="absolute rounded-full bg-white h-[22vh] sm:h-[26vh] md:h-[50vh] w-[clamp(120px,20vw,400px)]"
            style={{
              transform: `scaleY(${scaleY})`,
              transformOrigin: 'center',
            }}
          />
        </div>
      </div>

      {/* NAVIGATION BAR */}
      <nav className="relative z-20 flex flex-row items-center justify-between px-4 sm:px-6 md:px-12 py-4 sm:py-5">
        {/* Logo (left) */}
        <a href="/" className="flex items-center gap-2 text-white font-bold text-lg sm:text-xl">
          <div className="grid grid-cols-2 gap-0.5">
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-white rounded-full" />
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-white rounded-full" />
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-white rounded-full" />
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-white rounded-full" />
          </div>
          <span className="ml-1">TinyTrails</span>
        </a>

        {/* Desktop nav links (center/right) */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
              className="px-4 py-1.5 text-sm font-medium rounded-full bg-white text-[#F16524] hover:opacity-90 transition-colors"
            >
              {link}
            </a>
          ))}
        </div>

        {/* Menu button (right) */}
        <button
          onClick={() => setIsMenuOpen(true)}
          aria-label="Open Menu"
          className="flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-white bg-[#F16524] hover:opacity-90 transition-colors"
        >
          <Menu className="w-4 h-4" />
          <span className="text-sm font-medium hidden sm:inline">Menu</span>
        </button>
      </nav>

      {/* CENTER VIDEO */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ marginTop: 'calc(-6vh - 40px)' }}
      >
        <div className="w-[120vw] h-[85vh] sm:w-[70vw] sm:h-[70vh] md:w-[62vw] md:h-[78vh]">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-contain pointer-events-none mix-blend-darken"
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260713_234424_b1332b69-2e69-4302-8dbc-40f86846afbd.mp4"
          />
        </div>
      </div>

      {/* BOTTOM CONTENT */}
      <div className="relative z-30 mt-auto pb-8 sm:pb-16 flex flex-col items-center text-center px-4">
        <h1 className="text-white text-lg sm:text-xl md:text-2xl font-medium mb-3 sm:mb-4">
          Oops, something went wrong!
        </h1>
        <a
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 sm:px-8 sm:py-4 rounded-full text-white font-semibold text-sm sm:text-base bg-[#F16524] hover:scale-105 hover:shadow-lg transition-all"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          <span>Back to Home</span>
        </a>
      </div>

      {/* MOBILE MENU OVERLAY */}
      <div
        className={`fixed inset-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          onClick={() => setIsMenuOpen(false)}
          className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-500 ${
            isMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Panel */}
        <div
          className={`absolute top-0 right-0 h-full w-full sm:w-[380px] bg-gradient-to-br from-[#FF6B1A] to-[#FF9642] p-6 flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Panel Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2 text-white font-bold text-lg sm:text-xl">
              <div className="grid grid-cols-2 gap-0.5">
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-white rounded-full" />
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-white rounded-full" />
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-white rounded-full" />
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-white rounded-full" />
              </div>
              <span className="ml-1">TinyTrails</span>
            </div>
            <button
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close Menu"
              className="w-10 h-10 rounded-full bg-white/20 text-white hover:bg-white/30 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Menu items */}
          <div className="flex flex-col gap-3">
            {navLinks.map((link, i) => (
              <a
                key={link}
                href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => setIsMenuOpen(false)}
                className={`px-6 py-4 text-lg font-semibold text-white rounded-2xl bg-white/10 hover:bg-white/20 transition-all duration-300 ${
                  isMenuOpen
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-4'
                }`}
                style={{
                  transitionDelay: isMenuOpen ? `${150 + i * 60}ms` : '0ms',
                }}
              >
                {link}
              </a>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <a
              href="/"
              onClick={() => setIsMenuOpen(false)}
              className={`w-full py-4 rounded-full bg-white font-semibold text-base text-[#F16524] hover:scale-[1.02] transition-all flex items-center justify-center gap-2 ${
                isMenuOpen
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4'
              }`}
              style={{
                transitionDelay: isMenuOpen ? '450ms' : '0ms',
              }}
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
