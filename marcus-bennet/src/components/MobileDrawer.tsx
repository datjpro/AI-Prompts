import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const NAV_ITEMS = ['Story', 'Jobs', 'Message'];
const SOCIAL_ITEMS = ['Instagram', 'TikTok', 'YouTube'];

export const MobileDrawer: React.FC<MobileDrawerProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-500 sm:hidden ${
          isOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <aside
        className={`fixed top-0 right-0 bottom-0 z-40 w-[80%] max-w-sm bg-[#141414] px-8 py-10 flex flex-col justify-between text-cream font-hn transition-transform duration-600 ease-[cubic-bezier(0.76,0,0.24,1)] sm:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-label="Mobile Navigation"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className={`absolute right-6 top-6 p-2 text-cream hover:opacity-60 transition-all duration-300 cursor-pointer ${
            isOpen ? 'rotate-0 opacity-100 delay-300' : 'rotate-90 opacity-0'
          }`}
          aria-label="Close menu"
        >
          <X size={26} strokeWidth={1.5} />
        </button>

        {/* Top: Site Index */}
        <div className="mt-12 flex flex-col gap-6">
          <span
            className={`text-xs uppercase tracking-[0.2em] text-cream/50 transition-all duration-500 ${
              isOpen
                ? 'opacity-100 translate-y-0 delay-[250ms]'
                : 'opacity-0 translate-y-4'
            }`}
          >
            Site Index
          </span>

          <nav className="flex flex-col gap-4">
            {NAV_ITEMS.map((item, i) => (
              <a
                key={item}
                href="#"
                onClick={onClose}
                className={`text-4xl font-normal text-cream hover:opacity-60 transition-all duration-500 ${
                  isOpen
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-6'
                }`}
                style={{
                  transitionDelay: isOpen ? `${300 + i * 80}ms` : '0ms',
                }}
              >
                {item}
              </a>
            ))}
          </nav>
        </div>

        {/* Bottom: Find Me */}
        <div className="flex flex-col gap-4 pb-6">
          <span
            className={`text-xs uppercase tracking-[0.2em] text-cream/50 transition-all duration-500 ${
              isOpen
                ? 'opacity-100 translate-y-0 delay-[500ms]'
                : 'opacity-0 translate-y-4'
            }`}
          >
            Find Me
          </span>

          <div className="flex flex-wrap gap-4 text-sm">
            {SOCIAL_ITEMS.map((social, i) => (
              <a
                key={social}
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                className={`text-cream hover:opacity-60 transition-all duration-500 ${
                  isOpen
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-4'
                }`}
                style={{
                  transitionDelay: isOpen ? `${550 + i * 60}ms` : '0ms',
                }}
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
};
