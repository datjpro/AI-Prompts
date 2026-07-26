import React, { useState } from 'react';
import { Search, Star, ArrowUpRight, Play, ArrowRight, Plus, ShoppingBag } from 'lucide-react';

const ASSETS = {
  logo: 'https://polo-pecan-73837341.figma.site/_assets/v11/0ae29d6d9628bede667f90d57bebe81b8f1ec2bf.svg',
  avatar: 'https://polo-pecan-73837341.figma.site/_assets/v11/e62173d41f91350a59628e8a9a55ae078a886fb9.png?w=128',
  productCard: 'https://polo-pecan-73837341.figma.site/_assets/v11/3e5158dad63d392ade022e81890edc9f54d750bc.png',
  videoCard: 'https://polo-pecan-73837341.figma.site/_assets/v11/76be6ec3a93a703b15e9cc01e764a4e3f9d7d2c0.png',
  bottomLeft: 'https://polo-pecan-73837341.figma.site/_assets/v11/8d44b25186ef45a5789c74668fb781cea4e1ff49.png',
  bottomCenter: 'https://polo-pecan-73837341.figma.site/_assets/v11/96745c4e72ad5c5208e53a885df797fd82cd854a.png?h=1024',
  bottomRight: 'https://polo-pecan-73837341.figma.site/_assets/v11/81bd2e7a66b58f3d8f3ad78fd1ebf01af8dfdee1.png',
};

export default function App() {
  const [favoritesCount] = useState(4);
  const [cartCount] = useState(1);

  return (
    <div className="h-screen w-full flex flex-col overflow-hidden bg-[#EFFDF0] font-sans relative select-none">
      
      {/* ── HEADER ── */}
      <header className="shrink-0 w-full px-4 sm:px-8 lg:px-12 py-4 relative z-30 flex items-center justify-between animate-fade-in delay-100">
        {/* Left: Logo */}
        <div className="flex items-center">
          <img 
            src={ASSETS.logo} 
            alt="CozyPaws Logo" 
            className="w-[130px] h-[33px] lg:w-[205px] lg:h-[52px] object-contain cursor-pointer"
          />
        </div>

        {/* Center Nav (Hidden below md) */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium">
          <a href="#" className="text-gray-900 font-semibold hover:text-[#1a3d1a] transition-colors">Home</a>
          <a href="#" className="text-gray-600 hover:text-[#1a3d1a] transition-colors">Shop</a>
          <a href="#" className="text-gray-600 hover:text-[#1a3d1a] transition-colors">Delivery and payment</a>
          <a href="#" className="text-gray-600 hover:text-[#1a3d1a] transition-colors">Brands</a>
          <a href="#" className="text-gray-600 hover:text-[#1a3d1a] transition-colors">Blog</a>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Search Button (hidden below sm) */}
          <button aria-label="Search" className="hidden sm:flex w-10 h-10 rounded-full border border-gray-300 items-center justify-center text-gray-700 hover:border-[#1a3d1a] hover:text-[#1a3d1a] transition-all bg-white/50 backdrop-blur-sm">
            <Search size={18} />
          </button>

          {/* Favorites Button */}
          <div className="relative">
            <button aria-label="Favorites" className="w-10 h-10 rounded-full bg-[#E86A10] hover:bg-[#d45e0d] text-white flex items-center justify-center transition-colors shadow-sm">
              <Star size={18} fill="currentColor" />
            </button>
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#E86A10] border-2 border-[#EFFDF0] text-white text-[10px] font-bold flex items-center justify-center">
              {favoritesCount}
            </span>
          </div>

          {/* Cart Button */}
          <div className="relative">
            <button aria-label="Shopping Cart" className="w-10 h-10 rounded-full border border-gray-300 bg-white/50 backdrop-blur-sm hover:border-[#1a3d1a] text-gray-700 flex items-center justify-center transition-all">
              <ShoppingBag size={18} />
            </button>
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#E86A10] border-2 border-[#EFFDF0] text-white text-[10px] font-bold flex items-center justify-center">
              {cartCount}
            </span>
          </div>

          {/* Avatar */}
          <img 
            src={ASSETS.avatar} 
            alt="User Avatar" 
            className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm cursor-pointer ml-1"
          />
        </div>
      </header>


      {/* ── HERO SECTION ── */}
      <main className="flex-1 flex flex-col overflow-hidden relative">

        {/* ════════════════════════════════════════════════════════════════
            DESKTOP LAYOUT (lg+)
           ════════════════════════════════════════════════════════════════ */}
        <div className="hidden lg:block w-full h-full relative">
          
          {/* Centered Heading */}
          <div className="relative z-5 text-center px-12 pt-[5.4rem]">
            <h1 className="font-serif-display text-[#1a3d1a] text-[clamp(60px,7.5vw,110px)] leading-[0.95] tracking-tight">
              <div>
                <span className="inline-block animate-word-pop delay-200 mr-4">Everything</span>
              </div>
              <div className="mt-1">
                <span className="inline-block animate-word-pop delay-400 mr-4">Your</span>
                <span className="inline-block animate-word-pop delay-500 mr-4">Pets</span>
                <span className="inline-block animate-word-pop delay-600">Love</span>
              </div>
            </h1>
          </div>

          {/* Left Product Card */}
          <div className="absolute top-[50px] left-12 z-20 w-[clamp(160px,14vw,260px)] animate-slide-in-left delay-600">
            <div className="relative rounded-2xl overflow-hidden shadow-lg bg-white/40 backdrop-blur-sm p-1.5 group cursor-pointer">
              <div className="aspect-[260/257] rounded-xl overflow-hidden relative">
                <img src={ASSETS.productCard} alt="Cozy Cat House" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <button aria-label="View Product" className="absolute bottom-2.5 right-2.5 w-9 h-9 rounded-full bg-[#1a3d1a] hover:bg-[#2a5a2a] text-white flex items-center justify-center shadow-md transition-colors">
                  <ArrowUpRight size={18} />
                </button>
              </div>
            </div>
            <div className="mt-2 px-1">
              <p className="text-gray-700 text-[clamp(12px,1vw,14px)] font-medium">Cozy Cat House</p>
              <p className="text-[#1a3d1a] text-[clamp(14px,1.2vw,16px)] font-bold">$49.99</p>
            </div>
          </div>

          {/* Right Video Card */}
          <div className="absolute top-[50px] right-12 z-20 w-[clamp(120px,10vw,177px)] animate-slide-in-right delay-700">
            <div className="relative rounded-2xl overflow-hidden shadow-lg bg-white/40 backdrop-blur-sm p-1.5 group cursor-pointer">
              <div className="aspect-[177/287] rounded-xl overflow-hidden relative">
                <img src={ASSETS.videoCard} alt="Product Video Reviews" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/15 flex flex-col justify-end p-3">
                  <div className="flex flex-col items-center gap-2 mb-1">
                    <button aria-label="Play video reviews" className="w-10 h-10 rounded-full bg-[#1a3d1a] hover:bg-[#2a5a2a] text-white flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
                      <Play size={18} fill="currentColor" className="ml-0.5" />
                    </button>
                    <p className="text-white text-[11px] font-medium text-center leading-tight drop-shadow-md">
                      Watch Product Reviews on TikTok and YouTube
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom 3 Images Strip */}
          <div className="absolute bottom-0 left-0 right-0 z-10 flex items-end w-full">
            {/* Left Image */}
            <div className="flex-1 relative overflow-hidden animate-photo-reveal delay-800">
              <img 
                src={ASSETS.bottomLeft} 
                alt="Cat in house" 
                className="w-full h-auto block max-h-[min(70vh,55vw)] object-cover object-bottom"
              />
              {/* Overlay Stat Left */}
              <div className="absolute bottom-[clamp(20px,4vh,50px)] left-8 sm:left-12 z-20 flex items-center gap-3 bg-white/80 backdrop-blur-md px-4 py-2.5 rounded-full shadow-lg border border-white/40 animate-fade-up delay-1000">
                <div className="flex items-center -space-x-2">
                  <img src={ASSETS.avatar} alt="User avatar" className="w-7 h-7 rounded-full border-2 border-white object-cover" />
                  <div className="w-7 h-7 rounded-full bg-[#1a3d1a] border-2 border-white flex items-center justify-center text-white">
                    <Plus size={14} />
                  </div>
                </div>
                <span className="text-[#1a3d1a] font-bold text-base sm:text-lg tracking-tight">98K+</span>
              </div>
            </div>

            {/* Center Image */}
            <div className="flex-[1.265] relative overflow-hidden animate-photo-reveal delay-600">
              <img 
                src={ASSETS.bottomCenter} 
                alt="Main pet hero" 
                className="w-full h-auto block max-h-[min(85vh,70vw)] object-cover object-bottom"
              />
              {/* Overlay Content Center */}
              <div className="absolute bottom-[clamp(20px,4vh,50px)] left-0 right-0 z-20 flex flex-col items-center gap-3 px-4 text-center animate-fade-up delay-1100">
                <h2 className="text-white text-xl sm:text-2xl lg:text-3xl font-semibold drop-shadow-md">
                  Best Products for Your Pet
                </h2>
                <button className="bg-[#E86A10] hover:bg-[#d45e0d] text-white px-6 py-3 rounded-full font-medium text-sm lg:text-base flex items-center gap-2 shadow-xl hover:shadow-2xl transition-all hover:scale-105 cursor-pointer">
                  <span>Explore Products</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>

            {/* Right Image */}
            <div className="flex-1 relative overflow-hidden animate-photo-reveal delay-900">
              <img 
                src={ASSETS.bottomRight} 
                alt="Dog playing" 
                className="w-full h-auto block max-h-[min(70vh,55vw)] object-cover object-bottom"
              />
              {/* Overlay Rating Right */}
              <div className="absolute bottom-[clamp(20px,4vh,50px)] right-8 sm:right-12 z-20 flex items-center gap-2 bg-white/80 backdrop-blur-md px-4 py-2.5 rounded-full shadow-lg border border-white/40 animate-fade-up delay-1200">
                <span className="text-[#1a3d1a] font-bold text-base sm:text-lg">4.6</span>
                <Star size={18} fill="#E86A10" className="text-[#E86A10]" />
              </div>
            </div>
          </div>

        </div>


        {/* ════════════════════════════════════════════════════════════════
            TABLET LAYOUT (md to lg)
           ════════════════════════════════════════════════════════════════ */}
        <div className="hidden md:flex lg:hidden flex-col w-full h-full relative">
          
          {/* Centered Heading */}
          <div className="relative z-5 text-center px-6 pt-10">
            <h1 className="font-serif-display text-[#1a3d1a] text-7xl leading-none tracking-tight">
              <div>
                <span className="inline-block animate-word-pop delay-200 mr-3">Everything</span>
              </div>
              <div className="mt-1">
                <span className="inline-block animate-word-pop delay-400 mr-3">Your</span>
                <span className="inline-block animate-word-pop delay-500 mr-3">Pets</span>
                <span className="inline-block animate-word-pop delay-600">Love</span>
              </div>
            </h1>
          </div>

          {/* Left Product Card */}
          <div className="absolute top-[80px] left-4 z-20 w-[160px] animate-slide-in-left delay-600">
            <div className="rounded-xl overflow-hidden shadow-md bg-white/40 p-1.5">
              <div className="aspect-square rounded-lg overflow-hidden relative">
                <img src={ASSETS.productCard} alt="Cozy Cat House" className="w-full h-full object-cover" />
                <button aria-label="View Product" className="absolute bottom-2 right-2 w-7 h-7 rounded-full bg-[#1a3d1a] text-white flex items-center justify-center">
                  <ArrowUpRight size={14} />
                </button>
              </div>
            </div>
            <p className="text-gray-700 text-xs font-medium mt-1">Cozy Cat House</p>
            <p className="text-[#1a3d1a] text-sm font-bold">$49.99</p>
          </div>

          {/* Right Video Card */}
          <div className="absolute top-[80px] right-4 z-20 w-[120px] animate-slide-in-right delay-700">
            <div className="rounded-xl overflow-hidden shadow-md bg-white/40 p-1.5">
              <div className="aspect-[3/4] rounded-lg overflow-hidden relative">
                <img src={ASSETS.videoCard} alt="Video Reviews" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/20 flex flex-col justify-end p-2 items-center">
                  <button aria-label="Play video reviews" className="w-8 h-8 rounded-full bg-[#1a3d1a] text-white flex items-center justify-center mb-1">
                    <Play size={14} fill="currentColor" className="ml-0.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom 3 Images Strip */}
          <div className="absolute bottom-0 left-0 right-0 z-10 flex items-end w-full">
            <div className="flex-1 relative overflow-hidden animate-photo-reveal delay-800">
              <img src={ASSETS.bottomLeft} alt="Cat" className="w-full h-auto block max-h-[60vh] object-cover object-bottom" />
              <div className="absolute bottom-6 left-4 z-20 flex items-center gap-2 bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-full shadow-md">
                <span className="text-[#1a3d1a] font-bold text-sm">98K+</span>
              </div>
            </div>

            <div className="flex-[1.265] relative overflow-hidden animate-photo-reveal delay-600">
              <img src={ASSETS.bottomCenter} alt="Pet Hero" className="w-full h-auto block max-h-[75vh] object-cover object-bottom" />
              <div className="absolute bottom-6 inset-x-0 z-20 flex flex-col items-center gap-2 px-2 text-center">
                <button className="bg-[#E86A10] text-white px-5 py-2.5 rounded-full font-medium text-sm flex items-center gap-2 shadow-lg">
                  <span>Explore Products</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>

            <div className="flex-1 relative overflow-hidden animate-photo-reveal delay-900">
              <img src={ASSETS.bottomRight} alt="Dog" className="w-full h-auto block max-h-[60vh] object-cover object-bottom" />
              <div className="absolute bottom-6 right-4 z-20 flex items-center gap-1 bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-full shadow-md">
                <span className="text-[#1a3d1a] font-bold text-sm">4.6</span>
                <Star size={14} fill="#E86A10" className="text-[#E86A10]" />
              </div>
            </div>
          </div>

        </div>


        {/* ════════════════════════════════════════════════════════════════
            MOBILE LAYOUT (below md)
           ════════════════════════════════════════════════════════════════ */}
        <div className="flex md:hidden flex-col w-full h-full justify-between pt-2 pb-0 px-4 relative z-10">
          
          {/* Top Header Text & CTA */}
          <div className="flex flex-col items-center text-center gap-3 z-20">
            <h1 className="font-serif-display text-[#1a3d1a] text-[36px] leading-[1.05] tracking-tight animate-word-pop delay-200">
              Everything Your Pets Love
            </h1>
            <p className="text-gray-600 text-xs max-w-[280px] animate-fade-in delay-400">
              High quality products & food for your beloved friends
            </p>
            <button className="bg-[#E86A10] hover:bg-[#d45e0d] text-white px-5 py-2.5 rounded-full text-xs font-semibold flex items-center gap-2 shadow-md animate-fade-up delay-500">
              <span>Explore Products</span>
              <ArrowRight size={14} />
            </button>
          </div>

          {/* Cards Row */}
          <div className="flex items-center justify-center gap-3 my-2 z-20 px-2">
            {/* Product Card */}
            <div className="w-[120px] rounded-lg overflow-hidden bg-white/60 p-1 shadow-sm border border-white/50 animate-slide-in-left delay-600">
              <div className="aspect-square rounded overflow-hidden relative">
                <img src={ASSETS.productCard} alt="Cozy Cat House" className="w-full h-full object-cover" />
              </div>
              <div className="mt-1 px-1">
                <p className="text-gray-700 text-[10px] truncate font-medium">Cozy Cat House</p>
                <p className="text-[#1a3d1a] text-xs font-bold">$49.99</p>
              </div>
            </div>

            {/* Video Card */}
            <div className="w-[100px] rounded-lg overflow-hidden bg-white/60 p-1 shadow-sm border border-white/50 animate-slide-in-right delay-700">
              <div className="aspect-[3/4] rounded overflow-hidden relative">
                <img src={ASSETS.videoCard} alt="Video Reviews" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <div className="w-7 h-7 rounded-full bg-[#1a3d1a] text-white flex items-center justify-center">
                    <Play size={12} fill="currentColor" className="ml-0.5" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Bar Mobile */}
          <div className="flex items-center justify-center gap-4 py-1.5 px-4 bg-white/80 backdrop-blur-md rounded-full border border-white/50 shadow-sm mx-auto z-20 mb-2 animate-fade-up delay-900">
            <div className="flex items-center gap-1.5">
              <div className="flex items-center -space-x-1.5">
                <img src={ASSETS.avatar} alt="User" className="w-5 h-5 rounded-full border border-white object-cover" />
                <div className="w-5 h-5 rounded-full bg-[#1a3d1a] border border-white flex items-center justify-center text-white">
                  <Plus size={10} />
                </div>
              </div>
              <span className="text-[#1a3d1a] font-bold text-xs">98K+</span>
            </div>
            <div className="h-3 w-[1px] bg-gray-300" />
            <div className="flex items-center gap-1">
              <span className="text-[#1a3d1a] font-bold text-xs">4.6</span>
              <Star size={12} fill="#E86A10" className="text-[#E86A10]" />
            </div>
          </div>

          {/* Bottom Images Strip Mobile */}
          <div className="flex items-end w-full relative z-10 -mx-4 w-[calc(100%+2rem)]">
            <div className="flex-1 overflow-hidden animate-photo-reveal delay-800">
              <img src={ASSETS.bottomLeft} alt="Cat" className="w-full h-auto block object-cover" />
            </div>
            <div className="flex-[1.2] overflow-hidden animate-photo-reveal delay-600">
              <img src={ASSETS.bottomCenter} alt="Pet Hero" className="w-full h-auto block object-cover" />
            </div>
            <div className="flex-1 overflow-hidden animate-photo-reveal delay-900">
              <img src={ASSETS.bottomRight} alt="Dog" className="w-full h-auto block object-cover" />
            </div>
          </div>

        </div>

      </main>
    </div>
  );
}
