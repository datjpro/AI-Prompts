import React, { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { SynapseXLogo } from './components/SynapseXLogo'
import { SquashHamburger } from './components/SquashHamburger'
import { ScrambleIn } from './components/ScrambleIn'
import { ScrambleText } from './components/ScrambleText'

export default function App() {
  // Navigation & Hero States
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [entranceComplete, setEntranceComplete] = useState(false)
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)
  const [isDownloadHovered, setIsDownloadHovered] = useState(false)

  // Hero Video scrubbing refs
  const heroVideoRef = useRef<HTMLVideoElement>(null)
  const isSeekingRef = useRef(false)
  const targetTimeRef = useRef(0)
  const prevMouseXRef = useRef<number | null>(null)

  // Section Refs for Scroll Effects & Navigation
  const heroSectionRef = useRef<HTMLDivElement>(null)
  const section2Ref = useRef<HTMLDivElement>(null)
  const metricsSectionRef = useRef<HTMLDivElement>(null)
  const techSectionRef = useRef<HTMLDivElement>(null)
  const archSectionRef = useRef<HTMLDivElement>(null)

  // Entrance timer (800ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      setEntranceComplete(true)
    }, 800)
    return () => clearTimeout(timer)
  }, [])

  // Mouse-scrub video logic for Hero Video #1
  useEffect(() => {
    const video = heroVideoRef.current
    if (!video) return

    const handleSeeked = () => {
      if (!video) return
      if (Math.abs(video.currentTime - targetTimeRef.current) > 0.02) {
        video.currentTime = targetTimeRef.current
      } else {
        isSeekingRef.current = false
      }
    }

    video.addEventListener('seeked', handleSeeked)

    const handleMouseMove = (e: MouseEvent) => {
      if (!video || !video.duration) return

      if (prevMouseXRef.current === null) {
        prevMouseXRef.current = e.clientX
        return
      }

      const deltaX = e.clientX - prevMouseXRef.current
      prevMouseXRef.current = e.clientX

      // Sensitivity factor 0.8
      const timeDelta = (deltaX / window.innerWidth) * video.duration * 0.8
      const nextTime = Math.max(0, Math.min(video.duration, (targetTimeRef.current || video.currentTime) + timeDelta))
      targetTimeRef.current = nextTime

      if (!isSeekingRef.current) {
        isSeekingRef.current = true
        video.currentTime = nextTime
      }
    }

    const handleMouseLeave = () => {
      prevMouseXRef.current = null
    }

    const heroEl = heroSectionRef.current
    if (heroEl) {
      heroEl.addEventListener('mousemove', handleMouseMove)
      heroEl.addEventListener('mouseleave', handleMouseLeave)
    }

    return () => {
      video.removeEventListener('seeked', handleSeeked)
      if (heroEl) {
        heroEl.removeEventListener('mousemove', handleMouseMove)
        heroEl.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
  }, [])

  // Framer Motion Scroll transformation for Section 2 Cinematic Text
  const { scrollYProgress } = useScroll({
    target: section2Ref,
    offset: ["start end", "end start"]
  })

  const springScroll = useSpring(scrollYProgress, {
    stiffness: 15,
    damping: 32,
    mass: 1.8
  })

  const yScaleValue = useTransform(springScroll, [0, 1], [60, -120])
  const opacityValue = useTransform(springScroll, [0.3, 0.5], [0, 1])

  // Scroll helpers
  const scrollToAbout = () => {
    setIsMenuOpen(false)
    if (section2Ref.current) {
      section2Ref.current.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })
    }
  }

  const scrollToMetrics = () => {
    setIsMenuOpen(false)
    if (metricsSectionRef.current) {
      metricsSectionRef.current.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.scrollTo({ top: window.innerHeight * 2, behavior: 'smooth' })
    }
  }

  return (
    <div 
      className="relative bg-black text-white selection:bg-white selection:text-black min-h-screen w-full overflow-x-hidden"
      style={{ fontFamily: '"Space Mono", monospace' }}
    >
      {/* ---------------------------------------------------- */}
      {/* NAVBAR (fixed, z-50)                                 */}
      {/* ---------------------------------------------------- */}
      <motion.nav
        className="fixed top-0 left-0 right-0 h-20 z-50 flex items-center justify-between px-4 sm:px-8 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: entranceComplete ? 1 : 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* ================= DESKTOP NAVBAR (sm and above) ================= */}
        <div className="hidden sm:flex items-center gap-2 pointer-events-auto">
          {/* Logo Pill */}
          <motion.div
            className={`h-12 px-5 bg-white/15 backdrop-blur-md rounded-[14px] items-center gap-2.5 cursor-pointer ${
              isMenuOpen ? 'hidden md:flex' : 'flex'
            }`}
            whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.22)" }}
            whileTap={{ scale: 0.98 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <SynapseXLogo className="w-[18px] h-[18px] text-white" />
            <span className="text-[16px] font-medium tracking-tight text-white select-none">
              SynapseX
            </span>
          </motion.div>

          {/* Expanding Menu Pill */}
          <motion.div
            className="h-12 rounded-[14px] bg-white/15 backdrop-blur-md flex items-center overflow-hidden"
            initial={false}
            animate={{ width: isMenuOpen ? 290 : 48 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
          >
            {/* Hamburger button */}
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`flex items-center justify-center transition-colors cursor-pointer shrink-0 ${
                isMenuOpen 
                  ? 'w-9 h-9 rounded-[11px] bg-white/10 hover:bg-white/20 ml-1.5' 
                  : 'w-12 h-12 rounded-[14px] hover:bg-white/10'
              }`}
              aria-label="Toggle Navigation Menu"
            >
              <SquashHamburger isOpen={isMenuOpen} isMobile={false} />
            </motion.button>

            {/* Nav links */}
            {isMenuOpen && (
              <motion.div
                className="flex items-center gap-6 ml-4 whitespace-nowrap"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 15 }}
                transition={{ duration: 0.25, delay: 0.1 }}
              >
                <button
                  onClick={scrollToAbout}
                  onMouseEnter={() => setHoveredLink('about')}
                  onMouseLeave={() => setHoveredLink(null)}
                  className="text-[16px] font-normal text-white/85 hover:text-white cursor-pointer transition-colors"
                >
                  <ScrambleText text="About" isHovered={hoveredLink === 'about'} />
                </button>
                <button
                  onClick={scrollToMetrics}
                  onMouseEnter={() => setHoveredLink('metrics')}
                  onMouseLeave={() => setHoveredLink(null)}
                  className="text-[16px] font-normal text-white/85 hover:text-white cursor-pointer transition-colors"
                >
                  <ScrambleText text="Metrics" isHovered={hoveredLink === 'metrics'} />
                </button>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* ================= MOBILE NAVBAR (below sm) ================= */}
        <div className="flex sm:hidden items-center gap-2 w-full justify-between pointer-events-auto">
          <div className="flex items-center gap-2 max-w-[calc(100%-110px)]">
            {/* Mobile Logo Pill */}
            <motion.div
              className="h-9 px-3.5 bg-white/15 backdrop-blur-md rounded-[10px] flex items-center gap-2 cursor-pointer overflow-hidden shrink-0"
              initial={false}
              animate={{
                width: isMenuOpen ? 0 : 'auto',
                paddingLeft: isMenuOpen ? 0 : 14,
                paddingRight: isMenuOpen ? 0 : 14,
                opacity: isMenuOpen ? 0 : 1
              }}
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <SynapseXLogo className="w-[14px] h-[14px] text-white shrink-0" />
              <span className="text-[13px] font-medium tracking-tight text-white whitespace-nowrap">
                SynapseX
              </span>
            </motion.div>

            {/* Mobile Menu Capsule */}
            <motion.div
              className="h-9 rounded-[10px] bg-white/15 backdrop-blur-md flex items-center overflow-hidden"
              initial={false}
              animate={{ width: isMenuOpen ? '100%' : 36 }}
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
            >
              <motion.button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`flex items-center justify-center transition-colors cursor-pointer shrink-0 ${
                  isMenuOpen 
                    ? 'w-7 h-7 rounded-[8px] bg-white/10 hover:bg-white/20 ml-1' 
                    : 'w-9 h-9 rounded-[10px] hover:bg-white/10'
                }`}
                aria-label="Toggle Mobile Menu"
              >
                <SquashHamburger isOpen={isMenuOpen} isMobile={true} />
              </motion.button>

              {isMenuOpen && (
                <motion.div
                  className="flex items-center gap-4 ml-3 whitespace-nowrap pr-2"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <button
                    onClick={scrollToAbout}
                    onMouseEnter={() => setHoveredLink('about-m')}
                    onMouseLeave={() => setHoveredLink(null)}
                    className="text-[13px] font-normal text-white/85 hover:text-white cursor-pointer"
                  >
                    <ScrambleText text="About" isHovered={hoveredLink === 'about-m'} />
                  </button>
                  <button
                    onClick={scrollToMetrics}
                    onMouseEnter={() => setHoveredLink('metrics-m')}
                    onMouseLeave={() => setHoveredLink(null)}
                    className="text-[13px] font-normal text-white/85 hover:text-white cursor-pointer"
                  >
                    <ScrambleText text="Metrics" isHovered={hoveredLink === 'metrics-m'} />
                  </button>
                </motion.div>
              )}
            </motion.div>
          </div>

          {/* Mobile Download button */}
          <motion.button
            onMouseEnter={() => setIsDownloadHovered(true)}
            onMouseLeave={() => setIsDownloadHovered(false)}
            whileHover={{ scale: 1.03, backgroundColor: "#e2e2e6" }}
            whileTap={{ scale: 0.97 }}
            className="h-9 px-3.5 bg-white rounded-full text-black flex items-center gap-1.5 font-medium text-[13px] cursor-pointer shrink-0"
          >
            <i className="bi bi-apple text-[14px]"></i>
            <ScrambleText text="Download" isHovered={isDownloadHovered} />
          </motion.button>
        </div>

        {/* Desktop Download button (right side) */}
        <motion.button
          onMouseEnter={() => setIsDownloadHovered(true)}
          onMouseLeave={() => setIsDownloadHovered(false)}
          whileHover={{ scale: 1.03, backgroundColor: "#e2e2e6" }}
          whileTap={{ scale: 0.97 }}
          className="hidden sm:flex h-12 px-6 bg-white rounded-full text-black items-center gap-2 font-medium text-[15px] cursor-pointer pointer-events-auto transition-colors"
        >
          <i className="bi bi-apple text-[16px]"></i>
          <ScrambleText text="Download" isHovered={isDownloadHovered} />
        </motion.button>
      </motion.nav>

      {/* ---------------------------------------------------- */}
      {/* SECTION 1: HERO (full viewport height)              */}
      {/* ---------------------------------------------------- */}
      <section 
        ref={heroSectionRef}
        className="relative w-full h-screen h-[100dvh] overflow-hidden flex flex-col bg-black"
      >
        {/* Background Video #1 (mouse-scrubbed, NOT autoplay) */}
        <video
          ref={heroVideoRef}
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_083515_290e5a10-0b95-41af-a5e2-32b6389baa4d.mp4"
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />

        {/* Dot Grid Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-5 pointer-events-none z-10" />

        {/* Large background watermark text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 overflow-hidden">
          <span 
            className="font-display uppercase tracking-[-4px] select-none text-center bg-clip-text text-transparent opacity-10 leading-none mt-[50px]"
            style={{
              fontFamily: '"Anton SC", sans-serif',
              fontSize: 'clamp(120px, 30vw, 521px)',
              backgroundImage: 'radial-gradient(circle, rgba(142,127,148,0) 0%, #8E7F94 70%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            TRANSCENDENCE
          </span>
        </div>

        {/* Content Overlay */}
        <motion.div 
          className="relative z-20 h-full flex flex-col px-4 sm:px-6 md:px-8 pt-20 sm:pt-24 pb-8 sm:pb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: entranceComplete ? 1 : 0 }}
          transition={{ duration: 1 }}
        >
          {/* Spacer pushing content to bottom */}
          <div className="flex-1" />

          {/* Bottom row */}
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between w-full">
            {/* Left Column */}
            <div className="flex flex-col gap-4">
              <h1 className="text-white font-light leading-[0.95] tracking-[-0.03em] text-[clamp(40px,10vw,100px)] select-none">
                <ScrambleIn text="Brain" delay={200} triggered={entranceComplete} />
                <br />
                <ScrambleIn text="And Body" delay={500} triggered={entranceComplete} />
              </h1>

              <motion.p
                initial={{ y: 25, opacity: 0 }}
                animate={{ y: entranceComplete ? 0 : 25, opacity: entranceComplete ? 1 : 0 }}
                transition={{
                  duration: 0.9,
                  ease: [0.215, 0.610, 0.355, 1.000],
                  delay: 0.2
                }}
                className="max-w-sm text-[13px] sm:text-[15px] text-white/60 leading-relaxed"
              >
                Built at the intersection of neuroscience and artificial intelligence. SynapseX continuously maps neural pathways, cognitive load, and physiological states into a single adaptive intelligence layer.
              </motion.p>
            </div>

            {/* Right Column h1 */}
            <h1 className="text-white font-light leading-[0.95] tracking-[-0.03em] text-[clamp(40px,10vw,100px)] text-left md:text-right select-none">
              <ScrambleIn text="One" delay={700} triggered={entranceComplete} />
              <br />
              <ScrambleIn text="Network" delay={1000} triggered={entranceComplete} />
            </h1>
          </div>
        </motion.div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* SECTION 2: CINEMATIC TEXT (full viewport height)     */}
      {/* ---------------------------------------------------- */}
      <section 
        ref={section2Ref}
        className="relative w-full h-screen h-[100dvh] overflow-hidden flex items-center justify-center bg-black"
      >
        {/* Background Video #2 (autoplay, muted, loop) */}
        <video
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_092455_089c54f8-3b03-4966-9df1-e9746063d0ef.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />

        {/* Top Gradient Overlay */}
        <div 
          className="absolute top-0 left-0 right-0 h-[180px] pointer-events-none z-10"
          style={{ background: 'linear-gradient(to bottom, #010103, transparent)' }}
        />

        {/* 3D Perspective Container */}
        <div 
          className="relative z-20 max-w-5xl px-6 sm:px-12 flex items-center justify-center"
          style={{ perspective: '400px' }}
        >
          <motion.p
            style={{
              rotateX: 24,
              y: yScaleValue,
              z: 15,
              opacity: opacityValue
            }}
            className="font-sans font-normal text-[22px] sm:text-[30px] md:text-[36px] lg:text-[42px] text-white leading-[1.35] tracking-[-0.02em] select-none text-center"
          >
            A neural-AI interface built on the architecture of the human nervous system. SynapseX translates synaptic activity into computational intelligence. Every signal becomes measurable, structured, and visible. It continuously reconstructs internal state as a dynamic neural map. Biological noise is filtered into actionable cognitive patterns.
          </motion.p>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* SECTION 3: METRICS (min-h-screen)                    */}
      {/* ---------------------------------------------------- */}
      <section 
        ref={metricsSectionRef}
        className="relative w-full min-h-screen overflow-hidden flex items-center justify-center bg-black"
      >
        {/* Background Video #3 (autoplay, muted, loop) */}
        <video
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_095810_ecea3dd2-fc5e-4e41-8696-4219290b6589.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover pointer-events-none opacity-80"
        />

        {/* Content Container */}
        <div className="relative z-20 w-full max-w-6xl pt-32 pb-32 px-6 mx-auto flex flex-col items-center">
          {/* Subtitle */}
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.2 }}
            className="text-white/40 text-[13px] sm:text-[14px] tracking-[0.2em] uppercase mb-20 text-center block"
          >
            Performance Metrics
          </motion.span>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 w-full text-center">
            {/* Metric 1 */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="flex flex-col items-center"
            >
              <span className="text-white text-[clamp(48px,10vw,96px)] font-light tracking-[-0.04em] leading-none">
                2.4ms
              </span>
              <span className="text-white/40 text-[13px] sm:text-[15px] mt-4 tracking-wide">
                Synaptic Latency
              </span>
            </motion.div>

            {/* Metric 2 */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col items-center"
            >
              <span className="text-white text-[clamp(48px,10vw,96px)] font-light tracking-[-0.04em] leading-none">
                99.7%
              </span>
              <span className="text-white/40 text-[13px] sm:text-[15px] mt-4 tracking-wide">
                Signal Accuracy
              </span>
            </motion.div>

            {/* Metric 3 */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="flex flex-col items-center"
            >
              <span className="text-white text-[clamp(48px,10vw,96px)] font-light tracking-[-0.04em] leading-none">
                140B
              </span>
              <span className="text-white/40 text-[13px] sm:text-[15px] mt-4 tracking-wide">
                Neural Parameters
              </span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* SECTION 4: TECHNOLOGY / ADAPTIVE INTELLIGENCE       */}
      {/* ---------------------------------------------------- */}
      <section 
        ref={techSectionRef}
        className="relative w-full h-screen h-[100dvh] overflow-hidden flex flex-col justify-between bg-black"
      >
        {/* Background Video #4 (autoplay, muted, loop) */}
        <video
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_095750_32a52ce0-2005-45c9-9093-41f03fde9530.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />

        <div className="relative z-20 h-full flex flex-col justify-between px-8 sm:px-12 md:px-16 py-12 sm:py-16">
          {/* Top Area */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6">
            <motion.h2
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1.0 }}
              className="text-white font-light text-[clamp(36px,8vw,72px)] leading-[0.95] tracking-[-0.03em]"
            >
              Adaptive<br />Intelligence
            </motion.h2>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.0, delay: 0.2 }}
              className="text-white/50 text-[13px] sm:text-[15px] leading-relaxed max-w-xs md:text-right md:pt-2"
            >
              The system learns your neural baseline within 72 hours. From there, every cognitive state is mapped, predicted, and optimized in real time.
            </motion.p>
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Bottom Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.0, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6 w-full"
          >
            {[
              {
                title: "Cortical Mapping",
                desc: "Real-time spatial reconstruction of active neural regions."
              },
              {
                title: "Signal Isolation",
                desc: "Separates cognitive intent from biological noise."
              },
              {
                title: "State Prediction",
                desc: "Anticipates cognitive transitions before they occur."
              },
              {
                title: "Loop Feedback",
                desc: "Closed-loop adjustment based on outcome correlation."
              }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                className="flex flex-col"
              >
                <h3 className="text-white text-[14px] sm:text-[16px] font-normal mb-2">
                  {item.title}
                </h3>
                <p className="text-white/40 text-[12px] sm:text-[14px] leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* SECTION 5: ARCHITECTURE (pure black background)     */}
      {/* ---------------------------------------------------- */}
      <section 
        ref={archSectionRef}
        className="relative w-full min-h-screen bg-black overflow-hidden flex items-center justify-center px-6 py-32"
      >
        <div className="w-full max-w-3xl mx-auto flex flex-col items-center">
          {/* Heading Block */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1.0 }}
            className="text-center w-full"
          >
            <span className="text-white/40 text-[13px] sm:text-[14px] tracking-[0.2em] uppercase mb-8 block">
              Architecture
            </span>
            <h2 className="text-white font-light text-[clamp(28px,6vw,56px)] leading-[1.15] tracking-[-0.02em] mb-10">
              Three layers. Zero friction.
            </h2>
            <p className="text-white/45 text-[15px] sm:text-[17px] leading-relaxed max-w-xl mx-auto">
              Sensor layer captures raw bioelectric signals. Processing layer isolates intent. Interface layer delivers structured output to any connected system.
            </p>
          </motion.div>

          {/* Layer Cards */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1.2, delay: 0.4 }}
            className="mt-20 flex flex-col items-center gap-4 w-full"
          >
            {[
              { layer: "Layer 1", name: "Capture" },
              { layer: "Layer 2", name: "Process" },
              { layer: "Layer 3", name: "Interface" }
            ].map((item) => (
              <div 
                key={item.layer}
                className="w-full max-w-md h-[72px] border border-white/10 rounded-lg flex items-center justify-between px-6 bg-white/[0.02] backdrop-blur-sm hover:border-white/20 transition-colors"
              >
                <span className="text-white/30 text-[12px] tracking-[0.15em] uppercase">
                  {item.layer}
                </span>
                <span className="text-white text-[16px] sm:text-[18px] font-light">
                  {item.name}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* FOOTER                                               */}
      {/* ---------------------------------------------------- */}
      <footer className="relative w-full bg-black overflow-hidden border-t border-white/10">
        <div className="flex flex-col md:flex-row min-h-[400px] w-full">
          {/* Left Column: Video #5 */}
          <div className="w-full md:w-1/2 h-[300px] md:h-auto relative overflow-hidden">
            <video
              src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_080203_fd7f4f85-3a86-4837-8192-85e7bfe68e75.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Column: Information & Copyright */}
          <div className="w-full md:w-1/2 flex flex-col justify-between p-10 sm:p-16">
            <div>
              <div className="flex items-center gap-2 mb-8 text-white/70">
                <SynapseXLogo className="w-[18px] h-[18px]" />
                <span className="text-[15px] font-medium tracking-tight">
                  SynapseX
                </span>
              </div>
              
              <p className="text-white/40 text-[14px] sm:text-[15px] leading-relaxed max-w-sm">
                The next evolution of human-machine interaction. Built for those who refuse to be limited by biology alone.
              </p>
            </div>

            <p className="text-white/25 text-[12px] mt-12">
              © 2026 SynapseX Labs. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
