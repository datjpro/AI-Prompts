import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export default function App() {
  const [activeNav, setActiveNav] = useState('About');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = ['About', 'Our cases', 'Services', 'Prices'];

  const avatarUrls = [
    'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100',
    'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
    'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=100',
    'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100',
  ];

  return (
    <div className="relative" style={{ backgroundColor: '#0A061A' }}>
      {/* BACKGROUND VIDEO (sticky, scrolls behind content) */}
      <div className="relative z-0">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260721_194026_53c6f9fd-f0d7-4d7d-be62-cdd53b253fb3.mp4"
          />
          <div
            className="absolute inset-x-0 bottom-0 h-[40%] pointer-events-none"
            style={{ background: 'linear-gradient(to bottom, transparent, #0A061A)' }}
          />
        </div>
      </div>

      {/* FOREGROUND CONTENT LAYER */}
      <div className="relative z-10 -mt-[100vh]">
        {/* NAV (fixed, z-50) */}
        <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 sm:px-8 md:px-12 py-5 md:py-6">
          {/* Logo */}
          <a href="#" className="text-white font-light text-lg tracking-wide select-none">
            DE&lt;/<span className="font-normal">HELPERS</span>
          </a>

          {/* Desktop Links */}
          <nav className="hidden md:flex items-center gap-2">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => setActiveNav(item)}
                className={`text-sm px-4 py-2 rounded-full transition-all duration-300 ${
                  activeNav === item
                    ? 'border border-white/60 text-white'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {item}
              </a>
            ))}
            <button className="bg-white text-black text-sm font-medium px-5 py-2 rounded-full hover:bg-white/90 ml-4 transition-colors cursor-pointer">
              Hire us
            </button>
          </nav>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden z-[60] w-10 h-10 flex items-center justify-center text-white focus:outline-none cursor-pointer"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={24} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </header>

        {/* Mobile Navigation Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[55] flex flex-col items-center justify-center bg-black/95 backdrop-blur-xl px-6"
            >
              {/* Close Button Top Right */}
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="absolute top-6 right-6 text-white p-2 focus:outline-none cursor-pointer"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>

              <div className="flex flex-col items-center gap-4">
                {navItems.map((item, i) => (
                  <motion.a
                    key={item}
                    href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ delay: 0.15 + i * 0.05, duration: 0.3 }}
                    onClick={() => {
                      setActiveNav(item);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`text-2xl font-light transition-colors ${
                      activeNav === item ? 'text-white border-b border-white/60 pb-1' : 'text-white/70 hover:text-white'
                    }`}
                  >
                    {item}
                  </motion.a>
                ))}

                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ delay: 0.4, duration: 0.3 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg px-8 py-3 bg-white text-black font-medium rounded-full hover:bg-white/90 mt-6 transition-colors cursor-pointer"
                >
                  Hire us
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* HERO CONTENT */}
        <section className="px-6 sm:px-8 md:px-12 pt-24 md:pt-32 pb-20 md:pb-40 min-h-screen flex items-center">
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            {/* Left Column */}
            <div>
              <h1 className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light leading-[1.1] tracking-tight">
                Outsourced
                <br />
                development
                <br />
                team
              </h1>
              <p className="text-white/50 text-sm mt-6 font-light">
                Built off-site. Feels in-house.
              </p>
            </div>

            {/* Right Column */}
            <div className="flex flex-col items-start md:items-end gap-4">
              {/* Avatar Row */}
              <div className="flex -space-x-2 mb-2">
                {avatarUrls.map((url, idx) => (
                  <img
                    key={idx}
                    src={url}
                    alt={`Team member ${idx + 1}`}
                    className="w-8 h-8 rounded-full border-2 border-black/50 object-cover"
                  />
                ))}
              </div>

              {/* Testimonial Card */}
              <div className="max-w-sm w-full rounded-2xl liquid-glass p-5">
                <p className="text-white/90 text-sm font-light leading-relaxed">
                  Working with this team felt like unlocking a cheat code. I sent them a Figma + a wild idea, and a week later I had a working prototype with pixel-perfect animations. Fully remote, yet fully in sync.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
