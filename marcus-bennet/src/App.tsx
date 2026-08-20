import React, { useState } from 'react';
import { Header } from './components/Header';
import { Marquee } from './components/Marquee';
import { Footer } from './components/Footer';
import { MobileDrawer } from './components/MobileDrawer';

const BG_IMAGE_URL =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260729_022513_486985a2-ac8c-4278-91a8-071dcd9fcaff.png&w=1280&q=85';

const PORTRAIT_IMAGE_URL =
  'https://stone-expand-60400629.figma.site/_assets/v11/8da570354e86aa0d44ac3e4aa335a72c8e750d68.png';

export const App: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <section className="relative h-[100dvh] w-full overflow-hidden bg-black font-hn select-none">
      {/* 1. Full-bleed Background Image (z-0) */}
      <img
        src={BG_IMAGE_URL}
        alt=""
        className="absolute inset-0 h-full w-full object-cover anim-fade-in pointer-events-none"
      />

      {/* 2. Marquee Name (z-10) */}
      <Marquee />

      {/* 3. Front Cutout Portrait (z-20) */}
      <img
        src={PORTRAIT_IMAGE_URL}
        alt="Portrait"
        className="absolute inset-0 h-full w-full object-cover z-20 pointer-events-none anim-rise-in"
      />

      {/* 4. Horizontal Cream Rule & Footers (z-10 / z-30) */}
      <Footer />

      {/* 5. Header (z-30) + Hamburger (z-50) */}
      <Header
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      {/* 6. Mobile Drawer Overlay & Panel (z-40) */}
      <MobileDrawer
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </section>
  );
};

export default App;
