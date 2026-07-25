import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { WordsPullUp } from './WordsPullUp';

export function HeroSection() {
  const navItems = ["Our story", "Collective", "Workshops", "Programs", "Inquiries"];
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section className="h-screen w-full p-4 md:p-6 bg-black flex flex-col relative">
      <div className="rounded-2xl md:rounded-[2rem] overflow-hidden relative w-full h-full">
        {/* Background video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover absolute inset-0 pointer-events-none"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4"
        />

        {/* Noise overlay */}
        <div className="noise-overlay opacity-[0.7] mix-blend-overlay pointer-events-none absolute inset-0" />

        {/* Gradient overlay */}
        <div className="bg-gradient-to-b from-black/30 via-transparent to-black/60 absolute inset-0 pointer-events-none" />

        {/* Navbar */}
        <nav className="absolute top-0 left-1/2 -translate-x-1/2 z-20">
          <div className="bg-black rounded-b-2xl md:rounded-b-3xl px-4 py-2 md:px-8 shadow-xl flex items-center gap-3 sm:gap-6 md:gap-12 lg:gap-14 whitespace-nowrap">
            {navItems.map((item, idx) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                style={{
                  color: hoveredIdx === idx ? '#E1E0CC' : 'rgba(225, 224, 204, 0.8)',
                }}
                className="text-[10px] sm:text-xs md:text-sm font-medium transition-colors duration-200"
              >
                {item}
              </a>
            ))}
          </div>
        </nav>

        {/* Hero Content (bottom-aligned) */}
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 md:p-12 z-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-end gap-6">
            {/* Left 8 columns for Giant heading */}
            <div className="lg:col-span-8 flex items-baseline">
              <h1 className="text-[26vw] sm:text-[24vw] md:text-[22vw] lg:text-[20vw] xl:text-[19vw] 2xl:text-[20vw] font-medium leading-[0.85] tracking-[-0.07em] text-[#E1E0CC] select-none">
                <WordsPullUp text="Prisma" showAsterisk={true} />
              </h1>
            </div>

            {/* Right 4 columns for text + CTA */}
            <div className="lg:col-span-4 flex flex-col gap-6 items-start lg:items-start pb-2 sm:pb-4">
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="text-primary/70 text-xs sm:text-sm md:text-base leading-[1.2]"
              >
                Prisma is a worldwide network of visual artists, filmmakers and storytellers bound not by place, status or labels but by passion and hunger to unlock potential through our unique perspectives.
              </motion.p>

              <motion.a
                href="#collective"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="bg-primary rounded-full px-5 py-2.5 sm:px-6 sm:py-3 inline-flex items-center gap-2 group cursor-pointer transition-all duration-300 hover:gap-3 shadow-lg"
              >
                <span className="text-black font-medium text-sm sm:text-base">
                  Join the lab
                </span>
                <span className="bg-black rounded-full w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#E1E0CC]" />
                </span>
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
