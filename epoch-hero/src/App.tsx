import React from 'react'
import { ChevronRight } from 'lucide-react'
import { motion } from 'motion/react'

interface LogoItem {
  name: string
  src: string
  gradient: string
  fallbackSvg?: React.ReactNode
}

const logos: LogoItem[] = [
  {
    name: 'Procure',
    src: 'https://svgl.app/library/procure.svg',
    gradient: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
  },
  {
    name: 'Shopify',
    src: 'https://svgl.app/library/shopify.svg',
    gradient: 'linear-gradient(135deg, #96bf48 0%, #eab308 100%)',
  },
  {
    name: 'Blender',
    src: 'https://svgl.app/library/blender.svg',
    gradient: 'linear-gradient(135deg, #f5792a 0%, #2251a2 100%)',
  },
  {
    name: 'Figma',
    src: 'https://svgl.app/library/figma.svg',
    gradient: 'linear-gradient(135deg, #a259ff 0%, #f24e1e 100%)',
  },
  {
    name: 'Spotify',
    src: 'https://svgl.app/library/spotify.svg',
    gradient: 'linear-gradient(135deg, #ec4899 0%, #ef4444 100%)',
  },
  {
    name: 'Lottielab',
    src: 'https://svgl.app/library/lottielab.svg',
    gradient: 'linear-gradient(135deg, #84cc16 0%, #eab308 100%)',
  },
  {
    name: 'Google Cloud',
    src: 'https://svgl.app/library/google_cloud.svg',
    gradient: 'linear-gradient(135deg, #38bdf8 0%, #0284c7 100%)',
  },
  {
    name: 'Bing',
    src: 'https://svgl.app/library/bing.svg',
    gradient: 'linear-gradient(135deg, #06b6d4 0%, #0f766e 100%)',
  },
]

export default function App() {
  return (
    <div className="min-h-screen w-full bg-[#f9fafb] py-8 px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
      {/* 2. Main Hero Container & Video Background */}
      <section className="relative w-full max-w-[1400px] mx-auto rounded-[48px] bg-white border border-slate-200/50 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.03)] overflow-hidden h-[600px] flex flex-col">
        {/* Absolutely positioned underlying video layer */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover scale-105 transition-transform duration-1000"
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260505_101331_74f9b798-3f00-4e86-8a01-377aa16ffeaa.mp4"
          />
        </div>

        {/* 3. Hero Text Content */}
        <div className="relative z-20 flex-1 px-8 md:px-16 pt-12 md:pt-16 flex flex-col items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-start max-w-2xl"
          >
            {/* Headline */}
            <h1
              className="text-[42px] md:text-[56px] font-medium tracking-tight text-[#0a1b33] leading-[1.1]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Foundation of the
              <br />
              new digital epoch
            </h1>

            {/* Subheadline */}
            <p
              className="text-[14px] md:text-[15px] text-[#64748b] mt-4 leading-relaxed max-w-xl"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              Designing products, powering ecosystems and laying the foundation of
              a decentralized web for enterprises, builders and communities alike.
            </p>

            {/* Contact Button */}
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
              className="mt-6 md:mt-8 px-7 py-3 rounded-full bg-[#0a152d] text-white text-sm font-medium shadow-md shadow-[#0a152d]/10 hover:bg-[#112348] transition-colors cursor-pointer"
            >
              Contact Us
            </motion.button>
          </motion.div>
        </div>

        {/* 4. Floating Bottom Navbar */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 w-auto max-w-[90%]">
          <motion.nav
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center bg-white/90 backdrop-blur-2xl px-1.5 py-1.5 rounded-full shadow-[0_12px_40px_rgba(0,0,0,0.08)] border border-slate-200/40 gap-1 sm:gap-2"
          >
            {/* Logo placeholder */}
            <div className="w-9 h-9 rounded-full bg-white border border-slate-100 shadow-sm flex items-center justify-center text-[#0a1b33] font-bold text-sm select-none flex-shrink-0">
              ✦
            </div>

            {/* Nav text links */}
            <a
              href="#products"
              className="px-3 py-1.5 text-[12px] font-semibold text-slate-500 hover:text-[#0a1b33] transition-colors rounded-full"
            >
              Products
            </a>
            <a
              href="#docs"
              className="px-3 py-1.5 text-[12px] font-semibold text-slate-500 hover:text-[#0a1b33] transition-colors rounded-full"
            >
              Docs
            </a>

            {/* Get in touch button */}
            <a
              href="#contact"
              className="flex items-center gap-1 bg-white px-5 py-2 rounded-full text-[12px] font-semibold text-[#0a1b33] border border-slate-200/60 shadow-sm hover:border-slate-300 transition-all cursor-pointer flex-shrink-0"
            >
              <span>Get in touch</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </a>
          </motion.nav>
        </div>
      </section>

      {/* 5. Seamless Marquee Logo Scroller Component */}
      <div className="mt-10 w-full max-w-[1400px] mx-auto overflow-hidden relative marquee-mask">
        <div className="animate-marquee flex items-center gap-4 py-2">
          {/* First loop */}
          {logos.map((logo, index) => (
            <div
              key={`logo-1-${index}`}
              className="group relative h-24 w-40 shrink-0 flex items-center justify-center rounded-full bg-white border border-slate-200/60 shadow-sm hover:border-slate-300 transition-all overflow-hidden cursor-pointer"
            >
              {/* Hover gradient background */}
              <div
                className="absolute inset-0 transition-all duration-500 scale-150 opacity-0 group-hover:scale-100 group-hover:opacity-100 rounded-full"
                style={{ background: logo.gradient }}
              />

              {/* Logo image */}
              <img
                src={logo.src}
                alt={logo.name}
                className="relative z-10 h-8 w-auto max-w-[84px] object-contain transition-all duration-300 group-hover:brightness-0 group-hover:invert"
                onError={(e) => {
                  // Fallback to text if svgl network is blocked
                  const target = e.currentTarget
                  target.style.display = 'none'
                  const parent = target.parentElement
                  if (parent && !parent.querySelector('.logo-fallback')) {
                    const fallback = document.createElement('span')
                    fallback.className =
                      'logo-fallback relative z-10 text-xs font-bold tracking-tight text-slate-700 transition-colors duration-300 group-hover:text-white'
                    fallback.textContent = logo.name
                    parent.appendChild(fallback)
                  }
                }}
              />
            </div>
          ))}

          {/* Second loop (seamless loop) */}
          {logos.map((logo, index) => (
            <div
              key={`logo-2-${index}`}
              className="group relative h-24 w-40 shrink-0 flex items-center justify-center rounded-full bg-white border border-slate-200/60 shadow-sm hover:border-slate-300 transition-all overflow-hidden cursor-pointer"
            >
              {/* Hover gradient background */}
              <div
                className="absolute inset-0 transition-all duration-500 scale-150 opacity-0 group-hover:scale-100 group-hover:opacity-100 rounded-full"
                style={{ background: logo.gradient }}
              />

              {/* Logo image */}
              <img
                src={logo.src}
                alt={logo.name}
                className="relative z-10 h-8 w-auto max-w-[84px] object-contain transition-all duration-300 group-hover:brightness-0 group-hover:invert"
                onError={(e) => {
                  const target = e.currentTarget
                  target.style.display = 'none'
                  const parent = target.parentElement
                  if (parent && !parent.querySelector('.logo-fallback')) {
                    const fallback = document.createElement('span')
                    fallback.className =
                      'logo-fallback relative z-10 text-xs font-bold tracking-tight text-slate-700 transition-colors duration-300 group-hover:text-white'
                    fallback.textContent = logo.name
                    parent.appendChild(fallback)
                  }
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
