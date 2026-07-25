import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MacMenuBar } from './components/MacMenuBar';
import { InboxMockup } from './components/InboxMockup';
import { FeatureTriage } from './components/FeatureTriage';
import { LogoCloud } from './components/LogoCloud';
import { Testimonials } from './components/Testimonials';
import { Pricing } from './components/Pricing';
import { FinalCTA } from './components/FinalCTA';
import { LogoMark } from './components/Primitives';

export default function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#0c0c0c] text-white selection:bg-[#3D81E3]/30">
      {/* Global Root SVG Noise Filter */}
      <svg className="absolute w-0 h-0 pointer-events-none">
        <filter id="c3-noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="2"
            stitchTiles="stitch"
          />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.35 0"
          />
          <feComposite in2="SourceGraphic" operator="in" result="noise" />
          <feBlend in="SourceGraphic" in2="noise" mode="multiply" />
        </filter>
      </svg>

      {/* Global Fixed Background Video */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover pointer-events-none"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_064122_c4750c0e-7476-4b44-94a2-a85a65c63bf2.mp4"
        />
      </div>

      {/* Fixed Vertical Container Guide Lines */}
      <div className="hidden md:block pointer-events-none fixed inset-y-0 left-1/2 -translate-x-[calc(50%+36rem)] w-px bg-white/10 z-[5]" />
      <div className="hidden md:block pointer-events-none fixed inset-y-0 left-1/2 translate-x-[calc(-50%+36rem)] w-px bg-white/10 z-[5]" />

      {/* Page Sections */}
      <Navbar />
      <Hero />
      <MacMenuBar />
      <InboxMockup />
      <FeatureTriage />
      <LogoCloud />
      <Testimonials />
      <Pricing />
      <FinalCTA />

      {/* Global Footer */}
      <footer className="relative z-10 border-t border-white/10 py-12 px-6 max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between text-xs text-white/50 gap-4">
        <div className="flex items-center gap-3">
          <LogoMark className="w-5 h-5" />
          <span>© 2026 Aura Inc. All rights reserved.</span>
        </div>
        <div className="flex items-center gap-6">
          <a href="#privacy" className="hover:text-white transition-colors">
            Privacy Policy
          </a>
          <a href="#terms" className="hover:text-white transition-colors">
            Terms of Service
          </a>
          <a href="#security" className="hover:text-white transition-colors">
            Security
          </a>
        </div>
      </footer>
    </div>
  );
}
