import { motion } from 'motion/react';
import { Menu } from 'lucide-react';
import { LogoMark, AppleButton } from './Primitives';

export function Navbar() {
  const navLinks = ['Solutions', 'Pricing', 'Blog', 'Documentation', 'Careers'];

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="relative z-10 w-full max-w-6xl mx-auto px-6 py-6 flex items-center justify-between"
    >
      {/* Left: LogoMark only */}
      <a href="/" className="flex items-center">
        <LogoMark className="w-8 h-8" />
      </a>

      {/* Center: Desktop links */}
      <div className="hidden md:flex items-center gap-8">
        {navLinks.map((link, i) => (
          <motion.a
            key={link}
            href={`#${link.toLowerCase()}`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 + i * 0.05, ease: 'easeOut' }}
            className="text-white/70 text-sm font-medium hover:text-white transition-colors"
          >
            {link}
          </motion.a>
        ))}
      </div>

      {/* Right Desktop: AppleButton */}
      <div className="hidden md:block">
        <AppleButton label="Download Aura" />
      </div>

      {/* Mobile Right: Menu button */}
      <button
        aria-label="Open menu"
        className="md:hidden w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white/80 hover:text-white transition-colors"
      >
        <Menu className="w-5 h-5" />
      </button>
    </motion.nav>
  );
}
