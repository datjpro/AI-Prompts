import { useState, useRef } from 'react';
import { Menu, X } from 'lucide-react';

const VIDEOS = [
  {
    name: 'Golden Hour',
    url: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_081127_0992a171-d3c6-4978-8213-0ec5df8b6d63.mp4',
  },
  {
    name: 'Still Water',
    url: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_092026_dd05b805-ea0f-40b2-8c52-332b88502592.mp4',
  },
  {
    name: 'Deep Woods',
    url: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_081042_df7202bf-bd80-4b2b-bbc6-1f09ba2870e9.mp4',
  },
  {
    name: 'Quiet Dawn',
    url: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_080959_4cac5234-3573-464e-a5b7-76b94b8a7d61.mp4',
  },
];

export default function App() {
  const [activeVideo, setActiveVideo] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [email, setEmail] = useState('');

  const cooldownTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleVideoSwitch = (index: number) => {
    if (index === activeVideo || isTransitioning) return;

    setActiveVideo(index);
    setIsTransitioning(true);

    if (cooldownTimerRef.current) clearTimeout(cooldownTimerRef.current);
    cooldownTimerRef.current = setTimeout(() => {
      setIsTransitioning(false);
    }, 1000);
  };

  const navLinks = ['How It Works', 'Features', 'Pricing', 'Community'];
  const stats = [
    '60+ Deep Sessions',
    '12,000+ Creators',
    '4.8 User Satisfaction',
    'Intentional-First Design',
  ];

  // Dark mode for "Deep Woods" (3rd video, index 2)
  const isDeepWoods = activeVideo === 2;
  const contentTextColorClass = isDeepWoods
    ? 'text-[#182C41]'
    : 'text-white';
  const subtextColorClass = isDeepWoods
    ? 'text-[#182C41]/80'
    : 'text-white/80';

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black select-none">
      {/* Background Video Layer */}
      {VIDEOS.map((vid, idx) => (
        <video
          key={vid.name}
          autoPlay
          loop
          muted
          playsInline
          src={vid.url}
          className={`absolute inset-0 w-full h-full object-cover z-0 pointer-events-none transition-opacity duration-1000 ease-in-out ${
            activeVideo === idx ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}

      {/* Transparent PNG Overlay (z-index 1) */}
      <img
        src="https://soft-zoom-63098134.figma.site/_assets/v11/0b4a435b2df2747593c43d7a1c9b4578f7d8d90c.png"
        alt="Atmospheric Overlay"
        className="absolute inset-0 w-full h-full object-cover z-1 pointer-events-none animate-train-bob"
      />

      {/* Content Layer (z-index 2) */}
      <div className="relative z-2 flex flex-col justify-between h-full p-4 sm:p-6 md:p-8 max-w-7xl mx-auto">
        {/* Navigation (top) */}
        <header className="flex items-center justify-between w-full">
          {/* Logo (Left) */}
          <a
            href="/"
            className="font-serif-italic text-xl sm:text-2xl text-white tracking-tight"
          >
            Lumora
          </a>

          {/* Desktop Nav (Right) */}
          <div className="hidden md:flex items-center gap-1 liquid-glass rounded-full px-3 py-1.5">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
                className="px-4 py-1.5 text-sm font-system text-white/90 hover:text-white transition-colors"
              >
                {link}
              </a>
            ))}
            <button className="bg-white text-black px-4 py-1.5 rounded-full font-system font-medium text-sm hover:bg-white/90 transition-colors cursor-pointer ml-1">
              Get Started
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
            className="md:hidden liquid-glass rounded-full p-2.5 text-white relative w-10 h-10 flex items-center justify-center cursor-pointer"
          >
            <Menu
              className="w-5 h-5 absolute transition-all duration-300 ease-in-out"
              style={{
                transform: isMobileMenuOpen
                  ? 'rotate(90deg) scale(0.75)'
                  : 'rotate(0deg) scale(1)',
                opacity: isMobileMenuOpen ? 0 : 1,
              }}
            />
            <X
              className="w-5 h-5 absolute transition-all duration-300 ease-in-out"
              style={{
                transform: isMobileMenuOpen
                  ? 'rotate(0deg) scale(1)'
                  : 'rotate(-90deg) scale(0.75)',
                opacity: isMobileMenuOpen ? 1 : 0,
              }}
            />
          </button>
        </header>

        {/* Hero Content (Centered) */}
        <div className="flex-1 flex flex-col items-center justify-center text-center px-4 my-auto">
          {/* Badge */}
          <div className={`liquid-glass rounded-full px-4 py-1.5 text-xs sm:text-sm font-system mb-6 inline-flex items-center gap-2 transition-colors duration-700 ${contentTextColorClass}`}>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Over 10,000 minds already finding their clarity</span>
          </div>

          {/* Heading */}
          <h1
            className={`font-serif-italic text-4xl sm:text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.1] max-w-4xl transition-colors duration-700 ${contentTextColorClass}`}
          >
            Clarity in an Endlessly <br />
            Noisy Universe
          </h1>

          {/* Subtext */}
          <p
            className={`max-w-xl text-sm sm:text-base leading-relaxed font-system mt-4 text-center transition-colors duration-700 ${subtextColorClass}`}
          >
            Rise above the chaos of pings, infinite scrolling, and relentless demands.
            Discover how to protect your presence and create with intention.
          </p>

          {/* Email Input */}
          <form
            onSubmit={(e) => e.preventDefault()}
            className="liquid-glass rounded-full p-1.5 mt-8 flex items-center gap-2 w-full max-w-[320px] sm:max-w-sm border border-white/10 shadow-xl"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your Best Email"
              className={`bg-transparent border-none outline-none px-4 text-xs sm:text-sm font-system flex-1 transition-colors duration-700 ${contentTextColorClass} placeholder:${subtextColorClass}`}
            />
            <button
              type="submit"
              className="bg-white text-black px-5 py-2.5 rounded-full font-system font-medium text-xs sm:text-sm hover:bg-white/90 transition-colors whitespace-nowrap cursor-pointer shadow-md"
            >
              Get Early Access
            </button>
          </form>

          {/* Video Switcher */}
          <div className="flex items-center gap-3 sm:gap-6 mt-8 flex-wrap justify-center font-system text-xs sm:text-sm">
            {VIDEOS.map((vid, i) => {
              const isActive = activeVideo === i;
              return (
                <button
                  key={vid.name}
                  onClick={() => handleVideoSwitch(i)}
                  disabled={isTransitioning}
                  className={`pb-1 transition-all duration-300 cursor-pointer ${contentTextColorClass} ${
                    isActive
                      ? 'border-b-2 border-current font-medium opacity-100'
                      : 'opacity-50 border-b-2 border-transparent hover:opacity-80'
                  }`}
                >
                  {vid.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom Stats (Always White) */}
        <footer className="w-full pt-4 pb-2">
          <div className="hidden sm:flex items-center justify-center gap-3 sm:gap-6 text-white/70 text-xs sm:text-sm font-system flex-wrap">
            {stats.map((stat, idx) => (
              <span key={stat} className="flex items-center gap-3 sm:gap-6">
                <span>{stat}</span>
                {idx < stats.length - 1 && <span className="opacity-40">|</span>}
              </span>
            ))}
          </div>
        </footer>
      </div>

      {/* Mobile Menu Overlay (fixed, z-50) */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex flex-col items-center justify-between p-8 md:hidden transition-all duration-500"
          style={{ transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)' }}
        >
          {/* Top Close Button */}
          <div className="w-full flex justify-end">
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="liquid-glass rounded-full p-2.5 text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Staggered Links */}
          <div className="flex flex-col items-center gap-6 my-auto">
            {navLinks.map((link, i) => (
              <a
                key={link}
                href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-white text-3xl font-serif-italic transform transition-all duration-500 translate-y-0 opacity-100 hover:opacity-80"
                style={{
                  transitionDelay: `${100 + i * 50}ms`,
                  transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              >
                {link}
              </a>
            ))}
          </div>

          {/* Bottom Get Started */}
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="w-full py-4 rounded-full bg-white text-black font-system font-medium text-base hover:bg-white/90 transition-transform active:scale-[0.98]"
          >
            Get Started
          </button>
        </div>
      )}
    </section>
  );
}
