import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, CornerUpLeft, Menu, X, ArrowUpRight, FlaskConical, Leaf, Droplets, Sun } from 'lucide-react';

const CAROUSEL_CARDS = [
  {
    icon: FlaskConical,
    bgColor: 'bg-black',
    text: 'Experience our newly enhanced natural formula'
  },
  {
    icon: Leaf,
    bgColor: 'bg-emerald-800',
    text: 'Pure organic ingredients sourced sustainably'
  },
  {
    icon: Droplets,
    bgColor: 'bg-cyan-800',
    text: 'Advanced bioavailability for maximum absorption'
  },
  {
    icon: Sun,
    bgColor: 'bg-amber-700',
    text: 'Clinically tested for daily energy & vitality'
  }
];

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveCardIndex((prev) => (prev + 1) % CAROUSEL_CARDS.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div 
      className="min-h-screen flex flex-col relative overflow-hidden bg-cover bg-center bg-no-repeat font-sans"
      style={{
        backgroundImage: `url('https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260624_110248_b62f758d-f68c-4045-a7b4-91771d6d0a0f.png&w=1280&q=85')`
      }}
    >
      {/* Overlay to ensure contrast */}
      <div className="absolute inset-0 bg-black/20 z-0 pointer-events-none" />

      {/* NAVBAR */}
      <nav className="relative z-20 flex items-center justify-between px-5 sm:px-8 lg:px-10 py-4 lg:py-5 animate-fade-in">
        {/* Left: Brand */}
        <a href="#" className="font-dm font-medium text-[30px] text-white tracking-[-0.05em] animate-slide-left delay-200">
          TerraElix
        </a>

        {/* Center: Nav links (Desktop only) */}
        <div className="hidden lg:flex items-center gap-10 font-dm font-medium text-[18px] text-white/90 animate-fade-in delay-400">
          <a href="#about" className="hover:text-white transition-colors">About</a>
          <a href="#products" className="hover:text-white transition-colors">Products</a>
          <a href="#promotions" className="hover:text-white transition-colors">Promotions</a>
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
        </div>

        {/* Right: Icon Buttons + Avatar + Mobile Toggle */}
        <div className="flex items-center gap-3 sm:gap-4 animate-slide-right delay-300">
          <button aria-label="Search" className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-all">
            <Search size={20} strokeWidth={1.5} />
          </button>
          <button aria-label="Shopping Bag" className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-all">
            <ShoppingBag size={20} strokeWidth={1.5} />
          </button>
          <button aria-label="Return" className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-all">
            <CornerUpLeft size={20} strokeWidth={1.5} />
          </button>
          
          {/* Avatar */}
          <img 
            src="https://polo-pecan-73837341.figma.site/_assets/v11/ca8093996e970200cbcf8bde8744175e52da5a79.png" 
            alt="User Avatar" 
            className="w-8 h-8 lg:w-10 lg:h-10 rounded-full object-cover border border-white/20"
          />

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-9 h-9 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white ml-1"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* MOBILE OVERLAY MENU */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/90 z-30 flex flex-col items-center justify-center gap-8 md:hidden animate-fade-in">
          <button 
            onClick={() => setMobileMenuOpen(false)}
            className="absolute top-5 right-5 text-white/80 hover:text-white p-2"
          >
            <X size={28} />
          </button>
          <a href="#about" onClick={() => setMobileMenuOpen(false)} className="font-dm text-2xl text-white font-medium hover:text-white/80">About</a>
          <a href="#products" onClick={() => setMobileMenuOpen(false)} className="font-dm text-2xl text-white font-medium hover:text-white/80">Products</a>
          <a href="#promotions" onClick={() => setMobileMenuOpen(false)} className="font-dm text-2xl text-white font-medium hover:text-white/80">Promotions</a>
          <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="font-dm text-2xl text-white font-medium hover:text-white/80">Contact</a>
        </div>
      )}

      {/* HERO CONTENT */}
      <section className="relative z-10 flex-1 flex flex-col justify-center px-5 sm:px-8 lg:px-10 py-8 lg:py-12">
        <div className="max-w-[1400px] w-full mx-auto">
          {/* HERO HEADLINE */}
          <h1 className="font-dm font-normal tracking-[-0.05em] text-white text-[48px] leading-[50px] sm:text-[80px] sm:leading-[72px] md:text-[110px] md:leading-[95px] lg:text-[130px] lg:leading-[110px] xl:text-[155px] xl:leading-[125px]">
            {/* Line 1 */}
            <div className="flex flex-wrap items-center">
              <span className="overflow-hidden inline-block mr-[0.25em] animate-word-reveal"><span className="delay-300 text-white">The</span></span>
              <span className="overflow-hidden inline-block mr-[0.25em] animate-word-reveal"><span className="delay-400 text-white">Power</span></span>
              <span className="overflow-hidden inline-block animate-word-reveal"><span className="delay-500 text-white/45">of</span></span>
            </div>
            {/* Line 2 */}
            <div className="flex flex-wrap items-center">
              <span className="overflow-hidden inline-block mr-[0.25em] animate-word-reveal"><span className="delay-600 text-white/45">Nature</span></span>
              <span className="overflow-hidden inline-block mr-[0.25em] animate-word-reveal"><span className="delay-700 text-white/45">in</span></span>
              <span className="overflow-hidden inline-block animate-word-reveal"><span className="delay-800 text-white">Every</span></span>
            </div>
            {/* Line 3 */}
            <div className="flex flex-wrap items-center">
              <span className="overflow-hidden inline-block mr-[0.25em] animate-word-reveal"><span className="delay-900 text-white">Capsule</span></span>
              <img 
                src="https://polo-pecan-73837341.figma.site/_assets/v11/6a7de4fbe9c9e2315040607320a9ff5e93117bf4.png" 
                alt="Capsule Pill" 
                className="hidden sm:inline-block align-middle ml-2 lg:ml-4 animate-scale-in delay-1000 h-[clamp(60px,10vw,160px)] w-auto object-contain"
              />
            </div>
          </h1>

          {/* CTA SECTION */}
          <div className="mt-8 sm:mt-12 lg:mt-[75px] flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-8 lg:gap-[50px] animate-fade-up delay-600">
            {/* Button */}
            <button className="w-full sm:w-[240px] md:w-[280px] lg:w-[310px] h-14 sm:h-16 lg:h-[72px] bg-black text-white rounded-md flex items-center justify-between px-6 lg:px-8 font-medium tracking-[-0.03em] text-base sm:text-lg md:text-xl lg:text-2xl hover:bg-neutral-900 transition-all cursor-pointer group">
              <span>Explore Now</span>
              <ArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>

            {/* Paragraph */}
            <p className="text-white max-w-[310px] font-normal text-sm sm:text-base lg:text-lg leading-[1.45] tracking-[-0.03em]">
              Discover our new plant-based supplements for daily balance and clean energy.
            </p>
          </div>
        </div>
      </section>

      {/* MOBILE / TABLET PRODUCT IMAGE (lg:hidden) */}
      <div className="lg:hidden relative z-10 w-full overflow-hidden mt-4">
        <img 
          src="https://polo-pecan-73837341.figma.site/_assets/v11/50ad042b3cd48a2e120ea3ba17c8cfeaf3cc334c.png" 
          alt="TerraElix Product Bottle" 
          className="w-[180%] sm:w-[151%] max-w-[1296px] object-contain mx-auto drop-shadow-2xl animate-scale-in delay-800 -mb-[180px] sm:-mb-[220px]"
        />
      </div>

      {/* DESKTOP FLOATING PRODUCT IMAGE (lg+ only) */}
      <img 
        src="https://polo-pecan-73837341.figma.site/_assets/v11/50ad042b3cd48a2e120ea3ba17c8cfeaf3cc334c.png" 
        alt="TerraElix Product Bottle" 
        className="absolute z-0 hidden lg:block w-[clamp(600px,80vw,1412px)] h-auto -bottom-[10%] -right-[clamp(-400px,-20vw,-100px)] pointer-events-none drop-shadow-2xl animate-scale-in delay-700"
      />

      {/* BOTTOM 3-PANEL GRID FOOTER */}
      <footer className="relative z-10 grid grid-cols-1 md:grid-cols-[2fr_1fr_2fr] w-full text-black">
        {/* Panel 1 */}
        <div className="bg-[#ECEDEC] p-6 sm:p-8 lg:p-10 relative overflow-hidden flex flex-col justify-between min-h-[180px] sm:min-h-[220px] animate-fade-up delay-900">
          <div className="relative z-10">
            <h2 className="font-dm font-normal text-2xl sm:text-[28px] lg:text-[35px] leading-[1.1] tracking-[-0.05em] max-w-[350px] text-black">
              Start your personalized path to natural balance
            </h2>
          </div>
          <div className="relative z-10 mt-6 sm:mt-8">
            <a href="#assessment" className="font-normal text-base lg:text-lg tracking-[-0.03em] underline text-black hover:opacity-75 transition-opacity">
              Personal Assessment
            </a>
          </div>
          {/* Decorative image */}
          <img 
            src="https://polo-pecan-73837341.figma.site/_assets/v11/6736cbe6e26afa2cd7c04a91892a79f7640785b5.png" 
            alt="Decorative leaves" 
            className="absolute right-0 bottom-0 h-full w-auto object-cover mix-blend-multiply opacity-80 pointer-events-none z-0"
          />
        </div>

        {/* Panel 2: Carousel */}
        <div className="bg-[#FEFDF9] p-6 sm:p-8 lg:p-10 flex flex-col justify-between relative min-h-[180px] sm:min-h-[220px] animate-fade-up delay-1000">
          <div className="relative flex-1">
            {CAROUSEL_CARDS.map((card, idx) => {
              const IconComp = card.icon;
              const isActive = idx === activeCardIndex;
              return (
                <div 
                  key={idx}
                  className={`flex items-center gap-4 transition-all duration-500 ease-in-out ${
                    isActive 
                      ? 'opacity-100 translate-y-0 relative z-10' 
                      : 'opacity-0 translate-y-4 absolute inset-0 pointer-events-none'
                  }`}
                >
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full ${card.bgColor} flex items-center justify-center text-white flex-shrink-0`}>
                    <IconComp className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <p className="font-normal text-sm sm:text-base lg:text-lg text-black/80 leading-[1.2] tracking-[-0.03em]">
                    {card.text}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Carousel dots */}
          <div className="flex gap-2 mt-6">
            {CAROUSEL_CARDS.map((_, idx) => (
              <button 
                key={idx}
                onClick={() => setActiveCardIndex(idx)}
                className={`h-0.5 flex-1 rounded-full transition-all duration-300 ${
                  idx === activeCardIndex ? 'bg-black' : 'bg-black/20'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Panel 3 */}
        <div className="bg-black p-6 sm:p-8 lg:p-10 text-white flex items-center justify-between min-h-[180px] sm:min-h-[220px] animate-fade-up delay-1100">
          {/* Left: Product image */}
          <div className="flex-shrink-0">
            <img 
              src="https://polo-pecan-73837341.figma.site/_assets/v11/30e8f38d1f993c357a3be2721557fc899d5640fc.png" 
              alt="TerraElix Box" 
              className="w-[120px] h-[82px] sm:w-[160px] sm:h-[110px] lg:w-[208px] lg:h-[142px] object-contain"
            />
          </div>

          {/* Right: Text */}
          <div className="flex flex-col gap-1 sm:gap-2 max-w-[220px] sm:max-w-[260px]">
            <span className="font-normal text-2xl sm:text-3xl lg:text-[35px] tracking-[-0.05em] text-white">
              +14K
            </span>
            <p className="font-normal text-xs sm:text-sm lg:text-base text-white/60 leading-[1.2]">
              People have already optimized their wellness
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
