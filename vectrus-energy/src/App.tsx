import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, ArrowDown, ChevronUp, Info, X } from 'lucide-react';
import { useVideoScrub } from './useVideoScrub';

const VIDEO_URL = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260821_114821_a8ca298f-be2c-4613-a4dd-51b69e16bbde.mp4';
const DARK = '#1D3045';

const NAV_LINKS = [
  { name: 'VECTRUS ENERGY', active: true },
  { name: 'VECTRUS UPSTREAM', active: false },
  { name: 'VECTRUS MARKETS', active: false },
  { name: 'VECTRUS SYSTEMS', active: false },
  { name: 'VECTRUS+', active: false },
];

interface StaggerProps {
  visible: boolean;
  delay?: number;
  className?: string;
  children: React.ReactNode;
}

function Stagger({ visible, delay = 0, className = '', children }: StaggerProps) {
  return (
    <div
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0px)' : 'translateY(24px)',
        transition: `opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [menuOpen, setMenuOpen] = useState(false);
  const [navEntered, setNavEntered] = useState(false);

  const { scrollProgress: p, canvasLive } = useVideoScrub({
    videoSrc: VIDEO_URL,
    containerRef,
    videoRef,
    canvasRef,
  });

  // Nav entrance after 200ms
  useEffect(() => {
    const timer = setTimeout(() => {
      setNavEntered(true);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  // Lock body overflow when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [menuOpen]);

  // Color flips at p > 0.55: DARK -> white
  const isNavWhite = p > 0.55;

  // Section Opacities
  // s1Opacity: p < 0.20 -> 1, else -> max(0, 1 - (p - 0.20) / 0.08)
  const s1Opacity = p < 0.20 ? 1 : Math.max(0, 1 - (p - 0.20) / 0.08);

  // s2Opacity: p < 0.32 -> 0, p < 0.40 -> (p - 0.32) / 0.08, p < 0.55 -> 1, else -> max(0, 1 - (p - 0.55) / 0.08)
  let s2Opacity = 0;
  if (p < 0.32) {
    s2Opacity = 0;
  } else if (p < 0.40) {
    s2Opacity = (p - 0.32) / 0.08;
  } else if (p < 0.55) {
    s2Opacity = 1;
  } else {
    s2Opacity = Math.max(0, 1 - (p - 0.55) / 0.08);
  }

  // s3Opacity: p < 0.67 -> 0, p < 0.75 -> (p - 0.67) / 0.08, else -> 1
  const s3Opacity = p < 0.67 ? 0 : p < 0.75 ? (p - 0.67) / 0.08 : 1;

  const s1Visible = s1Opacity > 0.3;
  const s2Visible = s2Opacity > 0.3;
  const s3Visible = s3Opacity > 0.3;

  return (
    <div ref={containerRef} className="relative h-[500vh] bg-[#1D3045]">
      {/* Sticky Fullscreen Scene */}
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        {/* 1) Video Full Cover */}
        <video
          ref={videoRef}
          src={VIDEO_URL}
          className="absolute inset-0 w-full h-full object-cover"
          muted
          playsInline
          preload="auto"
        />

        {/* 2) Canvas 1920x1080 for WebCodecs Scrubbing */}
        <canvas
          ref={canvasRef}
          width={1920}
          height={1080}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 pointer-events-none ${
            canvasLive ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* 3) Overlay containing Navbar + Sequential Sections */}
        <div className="absolute inset-0 pointer-events-none flex flex-col justify-between">
          {/* NAVBAR */}
          <header className="absolute top-0 left-0 right-0 z-50 pointer-events-auto px-6 sm:px-8 md:px-12 pt-8 sm:pt-12 pb-6 flex items-center justify-between">
            {/* Desktop lg+: Left Cluster */}
            <nav className="hidden lg:flex items-center gap-8 xl:gap-10">
              {NAV_LINKS.map((link, idx) => {
                const delay = idx * 80 + 100;
                return (
                  <a
                    key={link.name}
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    style={{
                      opacity: navEntered ? 1 : 0,
                      transform: navEntered ? 'translateY(0px)' : 'translateY(-12px)',
                      transition: `opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, color 0.5s ease`,
                      color: isNavWhite ? '#FFFFFF' : DARK,
                    }}
                    className="relative text-xs tracking-[0.15em] uppercase font-medium hover:opacity-70"
                  >
                    {link.name}
                    {link.active && (
                      <span
                        style={{
                          backgroundColor: isNavWhite ? '#FFFFFF' : DARK,
                          transition: 'background-color 0.5s ease',
                        }}
                        className="absolute left-0 -bottom-3 w-full h-[2px]"
                      />
                    )}
                  </a>
                );
              })}
            </nav>

            {/* Mobile <lg: Hamburger */}
            <button
              onClick={() => setMenuOpen(true)}
              className="lg:hidden flex flex-col gap-[5px] cursor-pointer p-2 -ml-2 focus:outline-none"
              aria-label="Open Menu"
            >
              <span
                style={{
                  backgroundColor: isNavWhite ? '#FFFFFF' : DARK,
                  transition: 'background-color 0.5s ease',
                }}
                className="w-[24px] h-[2px] block rounded-full"
              />
              <span
                style={{
                  backgroundColor: isNavWhite ? '#FFFFFF' : DARK,
                  transition: 'background-color 0.5s ease',
                }}
                className="w-[24px] h-[2px] block rounded-full"
              />
              <span
                style={{
                  backgroundColor: isNavWhite ? '#FFFFFF' : DARK,
                  transition: 'background-color 0.5s ease',
                }}
                className="w-[16px] h-[2px] block rounded-full"
              />
            </button>

            {/* Right Cluster */}
            <div
              style={{
                opacity: navEntered ? 1 : 0,
                transform: navEntered ? 'translateY(0px)' : 'translateY(-12px)',
                transition:
                  'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) 500ms, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) 500ms',
              }}
              className="hidden sm:flex items-center gap-6"
            >
              {/* NEWS */}
              <div
                style={{
                  color: isNavWhite ? '#FFFFFF' : DARK,
                  transition: 'color 0.5s ease',
                }}
                className="flex items-center gap-2 cursor-pointer hover:opacity-70 transition-opacity"
              >
                <span className="text-xs tracking-[0.2em] uppercase font-medium">NEWS</span>
                <span
                  style={{
                    backgroundColor: isNavWhite ? '#FFFFFF' : DARK,
                    color: isNavWhite ? DARK : '#FFFFFF',
                    transition: 'background-color 0.5s ease, color 0.5s ease',
                  }}
                  className="w-[20px] h-[20px] rounded-full flex items-center justify-center"
                >
                  <Info size={10} strokeWidth={2.5} />
                </span>
              </div>

              {/* MENU Label */}
              <button
                onClick={() => setMenuOpen(true)}
                style={{
                  color: isNavWhite ? '#FFFFFF' : DARK,
                  transition: 'color 0.5s ease',
                }}
                className="lg:hidden text-xs tracking-[0.2em] uppercase font-medium hover:opacity-70 cursor-pointer"
              >
                MENU
              </button>
              <span
                style={{
                  color: isNavWhite ? '#FFFFFF' : DARK,
                  transition: 'color 0.5s ease',
                }}
                className="hidden lg:inline text-xs tracking-[0.2em] uppercase font-medium"
              >
                MENU
              </span>
            </div>
          </header>

          {/* SEQUENTIAL SECTIONS */}

          {/* SECTION 1: Hero, Left Aligned, Vertically Centered */}
          <section
            style={{
              opacity: s1Opacity,
              transition: 'opacity 0.1s ease-out',
              pointerEvents: s1Opacity > 0.3 ? 'auto' : 'none',
            }}
            className="absolute inset-0 px-6 sm:px-8 md:px-20 lg:px-32 flex flex-col justify-center"
          >
            <div className="max-w-4xl">
              <Stagger visible={s1Visible} delay={0}>
                <h1
                  style={{ color: DARK }}
                  className="text-[clamp(2rem,5vw,5rem)] font-light uppercase leading-[1.2] tracking-normal"
                >
                  Advancing resources for a cleaner future
                </h1>
              </Stagger>

              <Stagger visible={s1Visible} delay={150}>
                <p
                  style={{ color: `${DARK}E6` }} // 90% alpha
                  className="mt-6 text-sm tracking-[0.3em] uppercase font-normal"
                >
                  Sustainable power with purpose
                </p>
              </Stagger>
            </div>

            {/* Bottom-right Circle Arrow */}
            <div className="absolute bottom-12 right-6 sm:right-8 md:right-12">
              <Stagger visible={s1Visible} delay={300}>
                <button
                  style={{
                    borderColor: `${DARK}80`, // 50% alpha
                    color: DARK,
                  }}
                  className="w-12 h-12 rounded-full border flex items-center justify-center hover:opacity-70 transition-opacity cursor-pointer"
                  aria-label="Next"
                >
                  <ArrowRight size={18} />
                </button>
              </Stagger>
            </div>
          </section>

          {/* SECTION 2: Center */}
          <section
            style={{
              opacity: s2Opacity,
              transition: 'opacity 0.1s ease-out',
              pointerEvents: s2Opacity > 0.3 ? 'auto' : 'none',
            }}
            className="absolute inset-0 px-6 sm:px-8 flex items-center justify-center"
          >
            <div className="max-w-[900px] mx-auto text-center">
              <Stagger visible={s2Visible} delay={0}>
                <h2
                  style={{ color: DARK }}
                  className="text-[clamp(1.5rem,4.5vw,4.5rem)] font-extralight tracking-wide leading-[1.3] uppercase"
                >
                  We build lasting partnerships with vision{' '}
                  <span style={{ color: `${DARK}CC` }}>and precision</span>{' '}
                  <span style={{ color: `${DARK}80` }}>across every frontier</span>
                </h2>
              </Stagger>
            </div>

            {/* Right Column Controls */}
            <div className="absolute bottom-16 right-6 sm:right-8 md:right-12 flex flex-col items-center gap-4">
              <Stagger visible={s2Visible} delay={200}>
                <button
                  style={{
                    borderColor: `${DARK}66`, // 40% alpha
                    color: DARK,
                  }}
                  className="w-12 h-12 rounded-full border flex items-center justify-center hover:opacity-70 transition-opacity cursor-pointer"
                  aria-label="Scroll Down"
                >
                  <ArrowDown size={18} />
                </button>
              </Stagger>

              {/* Three dots */}
              <Stagger visible={s2Visible} delay={350} className="flex flex-col items-center gap-2 mt-4">
                <span
                  style={{ backgroundColor: DARK }}
                  className="w-2 h-2 rounded-full"
                />
                <span
                  style={{ backgroundColor: `${DARK}66` }}
                  className="w-1.5 h-1.5 rounded-full"
                />
                <span
                  style={{ backgroundColor: `${DARK}66` }}
                  className="w-1.5 h-1.5 rounded-full"
                />
              </Stagger>

              {/* Top Chevron */}
              <Stagger visible={s2Visible} delay={500}>
                <button
                  style={{
                    borderColor: `${DARK}4D`, // 30% alpha
                    color: `${DARK}CC`, // 80% alpha
                  }}
                  className="w-10 h-10 rounded-full border flex items-center justify-center hover:opacity-70 transition-opacity cursor-pointer mt-2"
                  aria-label="Scroll Up"
                >
                  <ChevronUp size={16} />
                </button>
              </Stagger>
            </div>
          </section>

          {/* SECTION 3: Right Aligned, White Type */}
          <section
            style={{
              opacity: s3Opacity,
              transition: 'opacity 0.1s ease-out',
              pointerEvents: s3Opacity > 0.3 ? 'auto' : 'none',
            }}
            className="absolute inset-0 flex items-center justify-end px-6 sm:px-8 md:px-20 lg:px-32"
          >
            <div className="max-w-2xl text-left">
              <Stagger visible={s3Visible} delay={0}>
                <p className="text-white/60 text-lg tracking-wide mb-4 font-normal">
                  Halder | Nordvik
                </p>
              </Stagger>

              <Stagger visible={s3Visible} delay={150}>
                <h2 className="text-[clamp(2rem,4vw,4rem)] font-light text-white leading-[1.2] uppercase tracking-wide mb-8">
                  Fueling ambition,
                  <br />
                  shaping tomorrow.
                </h2>
              </Stagger>

              <Stagger visible={s3Visible} delay={300}>
                <div className="flex items-center gap-4">
                  <span className="text-sm tracking-[0.3em] text-white/80 uppercase font-medium">
                    Contact Nordvik
                  </span>
                  <button
                    className="w-10 h-10 bg-white text-gray-800 rounded-full flex items-center justify-center hover:scale-110 duration-300 transition-transform cursor-pointer"
                    aria-label="Contact Nordvik"
                  >
                    <ArrowRight size={16} />
                  </button>
                </div>
              </Stagger>
            </div>
          </section>
        </div>
      </div>

      {/* MOBILE MENU OVERLAY */}
      <div
        style={{
          backgroundColor: DARK,
          transition: 'opacity 500ms cubic-bezier(0.4, 0, 0.2, 1), visibility 500ms cubic-bezier(0.4, 0, 0.2, 1)',
        }}
        className={`fixed inset-0 z-[100] flex flex-col justify-between ${
          menuOpen ? 'opacity-100 visible pointer-events-auto' : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        {/* Top bar with Close button */}
        <div className="flex justify-end px-6 sm:px-8 pt-8 sm:pt-12">
          <button
            onClick={() => setMenuOpen(false)}
            className="w-10 h-10 rounded-full border border-white/30 text-white flex items-center justify-center hover:border-white transition-colors cursor-pointer"
            aria-label="Close Menu"
          >
            <X size={18} />
          </button>
        </div>

        {/* Links Panel */}
        <div
          style={{
            transform: menuOpen ? 'translateY(0px)' : 'translateY(-32px)',
            transition: 'transform 500ms cubic-bezier(0.4, 0, 0.2, 1)',
          }}
          className="flex flex-col justify-center px-8 sm:px-12 space-y-4"
        >
          {NAV_LINKS.map((link, idx) => (
            <div
              key={link.name}
              style={{
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? 'translateY(0px)' : 'translateY(20px)',
                transition: `opacity 0.5s ease ${idx * 60}ms, transform 0.5s ease ${idx * 60}ms`,
              }}
              className="py-3"
            >
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setMenuOpen(false);
                }}
                className={`text-2xl sm:text-3xl font-light tracking-wide uppercase ${
                  link.active ? 'text-white' : 'text-white/60 hover:text-white'
                } transition-colors`}
              >
                {link.name}
              </a>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center gap-8 px-8 sm:px-12 pb-10">
          <span className="text-xs tracking-[0.2em] uppercase text-white/60 font-medium cursor-pointer hover:text-white transition-colors">
            NEWS
          </span>
          <span className="text-xs tracking-[0.2em] uppercase text-white/60 font-medium cursor-pointer hover:text-white transition-colors">
            CONTACT
          </span>
        </div>
      </div>
    </div>
  );
}
