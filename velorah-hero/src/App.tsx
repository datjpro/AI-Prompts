export default function App() {
  const navLinks = [
    { name: 'Home', active: true },
    { name: 'Studio', active: false },
    { name: 'About', active: false },
    { name: 'Journal', active: false },
    { name: 'Reach Us', active: false },
  ];

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background text-foreground flex flex-col justify-between select-none">
      {/* Fullscreen Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4"
      />

      {/* Glassmorphic Navigation Bar */}
      <header className="relative z-10 w-full">
        <nav className="flex flex-row items-center justify-between px-8 py-6 max-w-7xl mx-auto">
          {/* Logo */}
          <a
            href="/"
            className="text-3xl tracking-tight text-foreground select-none"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Velorah<sup className="text-xs ml-0.5">®</sup>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={`#${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                className={`text-sm transition-colors ${
                  link.active
                    ? 'text-foreground font-medium'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Nav CTA Button */}
          <button className="liquid-glass rounded-full px-6 py-2.5 text-sm text-foreground hover:scale-[1.03] transition-transform cursor-pointer">
            Begin Journey
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-32 pb-40 py-[90px] min-h-[calc(100vh-88px)] max-w-7xl mx-auto my-auto">
        <h1
          className="text-5xl sm:text-7xl md:text-8xl leading-[0.95] tracking-[-2.46px] max-w-7xl font-normal text-foreground animate-fade-rise"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Where <em className="not-italic text-[#a1a1aa]">dreams</em> rise{' '}
          <em className="not-italic text-[#a1a1aa]">through the silence.</em>
        </h1>

        <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mt-8 leading-relaxed animate-fade-rise-delay">
          We're designing tools for deep thinkers, bold creators, and quiet rebels.
          Amid the chaos, we build digital spaces for sharp focus and inspired work.
        </p>

        <button className="liquid-glass rounded-full px-14 py-5 text-base text-foreground mt-12 hover:scale-[1.03] transition-transform cursor-pointer animate-fade-rise-delay-2">
          Begin Journey
        </button>
      </main>
    </div>
  );
}
