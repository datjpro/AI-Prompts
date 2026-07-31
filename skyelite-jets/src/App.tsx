import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = ['Start', 'Story', 'Rates', 'Benefits', 'FAQ'];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        {/* Background Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_091828_e240eb17-6edc-4129-ad9d-98678e3fd238.mp4"
        />

        {/* Content Wrapper */}
        <div className="relative h-full flex flex-col z-10">
          {/* Navigation Bar */}
          <header className="w-full">
            <div className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">
              {/* Brand Logo */}
              <a href="#" className="text-2xl font-semibold text-gray-900 tracking-tight transition-colors hover:opacity-80">
                SkyElite
              </a>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center gap-8">
                {navLinks.map((link) => (
                  <a
                    key={link}
                    href={`#${link.toLowerCase()}`}
                    className="text-gray-900 font-medium hover:text-gray-700 transition-colors text-base"
                  >
                    {link}
                  </a>
                ))}
              </nav>

              {/* Mobile Menu Button */}
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden text-gray-900 p-2 focus:outline-none transition-colors hover:text-gray-700"
                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              >
                {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
              </button>
            </div>

            {/* Mobile Navigation Dropdown */}
            {isMobileMenuOpen && (
              <div className="md:hidden px-8 pb-4">
                <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-gray-100 flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <a
                      key={link}
                      href={`#${link.toLowerCase()}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-gray-900 font-medium hover:text-gray-700 transition-colors text-lg py-1 border-b border-gray-100 last:border-0"
                    >
                      {link}
                    </a>
                  ))}
                  <div className="pt-2 flex flex-col gap-3">
                    <button className="w-full px-4 py-2.5 rounded-full bg-gray-300 text-gray-800 font-medium hover:bg-gray-400 transition-colors text-center">
                      Discover
                    </button>
                    <button className="w-full px-4 py-2.5 rounded-full text-white bg-[#202A36] hover:bg-[#1a2229] transition-colors text-center font-medium shadow-md">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            )}
          </header>

          {/* Main Content Area */}
          <main className="flex-1 flex items-center justify-center px-4">
            <div className="text-center flex flex-col items-center justify-center -mt-80 max-w-4xl">
              {/* Category Label */}
              <span className="text-sm font-semibold text-gray-600 tracking-wider mb-4 uppercase">
                PRIVATE JETS
              </span>

              {/* Overlapping Two-Line Heading */}
              <h1 className="flex flex-col items-center justify-center">
                <span className="text-6xl md:text-7xl lg:text-8xl font-normal text-gray-500 leading-none tracking-tighter">
                  Premium.
                </span>
                <span className="text-6xl md:text-7xl lg:text-8xl font-normal text-[#202A36] leading-none tracking-tighter -mt-[12px]">
                  Accessible.
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-lg md:text-xl text-gray-600 mt-6 mb-6 max-w-2xl font-normal leading-relaxed">
                Your dedication deserves recognition.
              </p>

              {/* CTA Buttons */}
              <div className="flex items-center justify-center gap-4">
                <button className="px-6 py-2.5 rounded-full bg-gray-300 text-gray-800 font-medium hover:bg-gray-400 transition-colors shadow-sm cursor-pointer">
                  Discover
                </button>
                <button className="px-6 py-2.5 rounded-full text-white bg-[#202A36] hover:bg-[#1a2229] font-medium transition-colors shadow-md cursor-pointer">
                  Book Now
                </button>
              </div>
            </div>
          </main>
        </div>
      </section>
    </div>
  );
}
