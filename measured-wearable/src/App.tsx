import React, { useState, useEffect, useRef } from 'react';

const BG_IMAGE_1 =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260713_140344_79e1296a-86d7-43fd-9b5f-63ffe560f291.png&w=1280&q=85';
const FRONT_VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260713_162101_0d7498c5-29bb-47bf-a99f-2773c0a880a9.mp4';
const OVERLAY_IMAGE =
  'https://soft-zoom-63098134.figma.site/_assets/v11/3f10f1876e118f72a396e05a6c2d099569478272.png';

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Cursor coordinates for lerp smoothing
  const targetPos = useRef({ x: window.innerWidth / 2, y: window.innerHeight * 0.7 });
  const smoothPos = useRef({ x: window.innerWidth / 2, y: window.innerHeight * 0.7 });

  // Grid parallax offsets
  const targetGridOffset = useRef({ x: 0, y: 0 });
  const smoothGridOffset = useRef({ x: 0, y: 0 });

  const [maskStyle, setMaskStyle] = useState<React.CSSProperties>({});
  const [gridTransform, setGridTransform] = useState<string>('translate3d(0px, 0px, 0px)');

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      targetPos.current = { x: e.clientX, y: e.clientY };

      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const normX = (e.clientX - centerX) / centerX;
      const normY = (e.clientY - centerY) / centerY;

      targetGridOffset.current = {
        x: normX * 16,
        y: normY * 16,
      };
    };

    window.addEventListener('mousemove', handleMouseMove);

    let animId: number;

    const animateSpotlight = () => {
      // Lerp cursor position
      smoothPos.current.x += (targetPos.current.x - smoothPos.current.x) * 0.1;
      smoothPos.current.y += (targetPos.current.y - smoothPos.current.y) * 0.1;

      // Lerp grid parallax position
      smoothGridOffset.current.x += (targetGridOffset.current.x - smoothGridOffset.current.x) * 0.06;
      smoothGridOffset.current.y += (targetGridOffset.current.y - smoothGridOffset.current.y) * 0.06;

      const radialGradient = `radial-gradient(circle 260px at ${smoothPos.current.x}px ${smoothPos.current.y}px, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 40%, rgba(255,255,255,0.75) 60%, rgba(255,255,255,0.4) 75%, rgba(255,255,255,0.12) 88%, rgba(255,255,255,0) 100%)`;

      setMaskStyle({
        WebkitMaskImage: radialGradient,
        maskImage: radialGradient,
      });

      setGridTransform(`translate3d(${smoothGridOffset.current.x}px, ${smoothGridOffset.current.y}px, 0px)`);

      animId = requestAnimationFrame(animateSpotlight);
    };

    animId = requestAnimationFrame(animateSpotlight);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  const navItems = ['Device', 'Real Stories', 'Science', 'Plans', 'Reach Us'];

  return (
    <div className="bg-white text-white min-h-screen overflow-hidden select-none font-helvetica-neue">
      {/* Navigation (z-50, fixed) */}
      {/* Top-Left Logo */}
      <div className="fixed top-6 left-6 md:left-12 z-50">
        <a href="/" className="block">
          <svg className="w-7 h-7" viewBox="0 0 256 256" fill="white">
            <path d="M 256 64 L 256 128 L 192.5 128 L 160 95 L 128 64 L 96 95 L 63.5 128 L 64 128 L 128 192 L 128 256 L 64.5 256 L 32 223 L 0 192 L 0 64 L 64 0 L 192 0 Z M 256 192 L 256 256 L 192.5 256 L 160 223 L 128 192 L 128 128 L 192 128 Z" />
          </svg>
        </a>
      </div>

      {/* Desktop Center Pill Nav (hidden on mobile) */}
      <nav className="hidden md:flex fixed top-6 left-1/2 -translate-x-1/2 z-50 liquid-glass rounded-full px-2 py-1.5 items-center gap-1">
        {navItems.map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
            className="text-white/70 hover:text-white text-sm font-medium px-4 py-2 rounded-full transition-colors font-sans"
          >
            {item}
          </a>
        ))}
      </nav>

      {/* Desktop CTA (top-right, hidden on mobile) */}
      <div className="hidden md:flex fixed top-6 right-6 md:right-12 z-50">
        <button className="liquid-glass rounded-full px-5 py-2.5 flex items-center gap-2 text-white text-sm font-medium hover:bg-white/10 transition-colors cursor-pointer font-sans">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span>Reserve Yours</span>
        </button>
      </div>

      {/* Mobile Hamburger (top-right, hidden md+) */}
      <button
        onClick={() => setIsMobileMenuOpen(true)}
        aria-label="Open mobile menu"
        className="md:hidden fixed top-6 right-6 z-50 liquid-glass rounded-full w-10 h-10 flex flex-col items-center justify-center gap-1.5 cursor-pointer"
      >
        <span className="w-5 h-[1.5px] bg-white rounded-full" />
        <span className="w-3.5 h-[1.5px] bg-white rounded-full" />
      </button>

      {/* Mobile Fullscreen Menu (z-55) */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-55 bg-[#0a0a0a] flex flex-col justify-between p-8 md:hidden">
          {/* Close Button */}
          <div className="w-full flex justify-end">
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close mobile menu"
              className="liquid-glass rounded-full w-10 h-10 flex items-center justify-center text-white cursor-pointer relative"
              style={{
                animation: 'spinIn 400ms cubic-bezier(0.77, 0, 0.18, 1) both',
              }}
            >
              <span className="absolute w-5 h-[1.5px] bg-white rotate-45" />
              <span className="absolute w-5 h-[1.5px] bg-white -rotate-45" />
            </button>
          </div>

          {/* Staggered Vertical Nav Items */}
          <div className="flex flex-col items-center gap-6 my-auto">
            {navItems.map((item, idx) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-3xl sm:text-4xl font-medium text-white/90 hover:text-white transition-colors tracking-tight"
                style={{
                  animation: `slideUp 500ms cubic-bezier(0.77, 0, 0.18, 1) ${
                    100 + idx * 60
                  }ms both`,
                }}
              >
                {item}
              </a>
            ))}
          </div>

          {/* Mobile Reserve Yours CTA */}
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="w-full liquid-glass rounded-full py-4 flex items-center justify-center gap-2 text-white text-lg font-medium cursor-pointer"
            style={{
              animation: `slideUp 500ms cubic-bezier(0.77, 0, 0.18, 1) ${
                100 + navItems.length * 60
              }ms both`,
            }}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
            <span>Reserve Yours</span>
          </button>
        </div>
      )}

      {/* Hero Section (100vh, overflow hidden) */}
      <section className="relative w-full h-screen overflow-hidden bg-black">
        {/* Layer 1 — Grid Background (z-0, opacity 0.1) */}
        <div
          className="absolute inset-0 z-0 opacity-10 pointer-events-none transition-transform duration-75"
          style={{ transform: gridTransform }}
        >
          <svg className="w-full h-full" width="100%" height="100%">
            <defs>
              <pattern
                id="measured-grid"
                width="48"
                height="48"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 48 0 L 0 0 0 48"
                  fill="none"
                  stroke="#64748b"
                  strokeWidth="0.6"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#measured-grid)" />
          </svg>
        </div>

        {/* Layer 2 — Background Image (z-10) */}
        <div
          className="absolute inset-0 z-10 bg-center bg-cover bg-no-repeat pointer-events-none"
          style={{ backgroundImage: `url('${BG_IMAGE_1}')` }}
        />

        {/* Layer 3 — Hero Text (z-20) */}
        <h1 className="font-instrument text-white text-center leading-[0.9] tracking-tight absolute left-1/2 -translate-x-1/2 top-20 sm:top-28 md:top-32 z-20 pointer-events-none text-[4.5rem] xs:text-[5.5rem] sm:text-[10rem] md:text-[13rem] lg:text-[16rem]">
          MEASURED
        </h1>

        {/* Layer 4 — Overlay Image (z-25) */}
        <img
          src={OVERLAY_IMAGE}
          alt="Atmospheric Overlay"
          className="absolute inset-0 w-full h-full object-cover z-25 pointer-events-none"
        />

        {/* Layer 5 — Spotlight Reveal (z-30) */}
        <div
          className="absolute inset-0 z-30 pointer-events-none"
          style={maskStyle}
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            src={FRONT_VIDEO}
            className="w-full h-full object-cover"
            style={{ clipPath: 'inset(40% 0 0 0)' }}
          />
        </div>
      </section>

      {/* Keyframe Animations inline */}
      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes spinIn {
          from {
            opacity: 0;
            transform: rotate(-90deg) scale(0.8);
          }
          to {
            opacity: 1;
            transform: rotate(0deg) scale(1);
          }
        }
      `}</style>
    </div>
  );
}
