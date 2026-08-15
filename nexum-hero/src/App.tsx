import { useState, useEffect } from 'react'
import { ChevronDown, Menu, X } from 'lucide-react'

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [email, setEmail] = useState('')

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  const navLinks = [
    { label: 'Modules', href: '#modules' },
    { label: 'Clientele', href: '#clientele' },
    { label: 'Solutions', href: '#solutions', hasDropdown: true },
    { label: 'Billing', href: '#billing' },
  ]

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      alert(`Thanks for signing up with ${email}!`)
      setEmail('')
    }
  }

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black font-['Geist',sans-serif] antialiased select-none">
      {/* Background Video */}
      <video
        className="absolute inset-0 h-full w-full object-cover pointer-events-none z-0"
        autoPlay
        loop
        muted
        playsInline
      >
        <source
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260803_192301_9231ed6b-c55c-4a48-909c-4ebe11cf2e11.mp4"
          type="video/mp4"
        />
      </video>

      {/* Main Container */}
      <div className="relative z-10 flex flex-col h-full justify-between">
        {/* Top Navigation Bar */}
        <header className="flex items-center justify-between px-5 py-5 sm:px-8 sm:py-6 lg:px-12 w-full">
          {/* Logo */}
          <a
            href="#"
            className="flex items-center gap-2 text-[#010101] lg:text-white transition-colors group cursor-pointer"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 256 256"
              className="fill-[#010101] lg:fill-white transition-colors"
            >
              <path d="M 128 128 C 128 198.692 70.692 256 0 256 C 0 185.308 57.308 128 128 128 Z M 128 128 C 198.692 128 256 185.308 256 256 C 185.308 256 128 198.692 128 128 Z M 0 0 C 70.692 0 128 57.308 128 128 C 57.308 128 0 70.692 0 0 Z M 256 0 C 256 70.692 198.692 128 128 128 C 128 57.308 185.308 0 256 0 Z" />
            </svg>
            <span className="text-lg font-semibold tracking-tight">nexum</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-3">
            {/* Glass Pill Cluster */}
            <div className="flex items-center gap-1 rounded-full bg-white/10 px-1.5 py-1.5 backdrop-blur-lg">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="flex items-center rounded-full px-4 py-1.5 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <span>{link.label}</span>
                  {link.hasDropdown && (
                    <ChevronDown className="w-3.5 h-3.5 ml-1 opacity-70" />
                  )}
                </a>
              ))}
            </div>

            {/* Separate CTA Pill */}
            <a
              href="#get-started"
              className="flex items-center justify-center rounded-full px-5 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 self-stretch [background:linear-gradient(to_bottom,#2B2B2B,#101010)]"
            >
              Get started
            </a>
          </nav>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex md:hidden h-10 w-10 rounded-full bg-white/10 backdrop-blur-lg items-center justify-center relative z-50 text-[#010101] lg:text-white cursor-pointer focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            <Menu
              className={`w-5 h-5 transition-all duration-300 ${
                mobileMenuOpen ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'
              }`}
            />
            <X
              className={`w-5 h-5 absolute transition-all duration-300 ${
                mobileMenuOpen ? 'rotate-0 scale-100 opacity-100 text-white' : '-rotate-90 scale-0 opacity-0'
              }`}
            />
          </button>
        </header>

        {/* Mobile Menu Glass Overlay + Drawer */}
        {/* Backdrop */}
        <div
          onClick={() => setMobileMenuOpen(false)}
          className={`fixed inset-0 z-40 bg-black/80 backdrop-blur-md transition-opacity duration-300 md:hidden ${
            mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        />

        {/* Drawer Panel */}
        <div
          className={`fixed right-0 top-0 z-40 h-full w-72 bg-black/90 backdrop-blur-xl flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:hidden ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Links */}
          <div className="px-6 pt-24 flex flex-col gap-2">
            {navLinks.map((link, idx) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between rounded-xl px-4 py-3.5 text-base font-medium text-white/80 transition-all hover:bg-white/10 hover:text-white"
                style={{
                  transitionDelay: mobileMenuOpen ? `${(idx + 1) * 60}ms` : '0ms',
                  transform: mobileMenuOpen ? 'translateX(0)' : 'translateX(24px)',
                  opacity: mobileMenuOpen ? 1 : 0,
                  transitionProperty: 'transform, opacity, background-color, color',
                  transitionDuration: '500ms',
                }}
              >
                <span>{link.label}</span>
                {link.hasDropdown && <ChevronDown className="w-4 h-4 opacity-70" />}
              </a>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-auto px-6 pb-10">
            <a
              href="#get-started"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center w-full rounded-full py-3.5 text-center text-sm font-medium text-white transition-all hover:opacity-90 [background:linear-gradient(to_bottom,#2B2B2B,#101010)]"
              style={{
                transitionDelay: mobileMenuOpen ? '300ms' : '0ms',
                transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(16px)',
                opacity: mobileMenuOpen ? 1 : 0,
                transitionProperty: 'transform, opacity',
                transitionDuration: '400ms',
              }}
            >
              Get started
            </a>
          </div>
        </div>

        {/* Main Content (Bottom-Anchored) */}
        <main className="mt-auto flex flex-col lg:flex-row lg:items-end lg:justify-between px-5 pb-8 sm:px-8 sm:pb-12 lg:px-12 lg:pb-16 gap-6 sm:gap-8">
          {/* Left Block: Headline + Email CTA */}
          <div className="max-w-xl">
            <h1 className="text-3xl sm:text-4xl lg:text-[3.5rem] font-semibold leading-[1.1] tracking-tight text-[#010101] lg:text-white">
              Ship AI workers that grind while you rest
            </h1>

            {/* Email CTA */}
            <div className="mt-6 sm:mt-8">
              <form
                onSubmit={handleFormSubmit}
                className="flex flex-col gap-3 sm:flex-row sm:items-center sm:inline-flex sm:rounded-full sm:bg-white sm:p-1.5 shadow-lg shadow-black/10"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Type your email"
                  className="rounded-full bg-white px-5 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none w-full sm:w-64 sm:rounded-none sm:bg-transparent sm:px-4 sm:py-2"
                />
                <button
                  type="submit"
                  className="rounded-full px-6 py-3 sm:py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90 whitespace-nowrap cursor-pointer [background:linear-gradient(to_bottom,#2B2B2B,#101010)]"
                >
                  Get started
                </button>
              </form>
            </div>
          </div>

          {/* Right Block: Two Glass Cards */}
          <div className="flex flex-col gap-4 sm:flex-row lg:w-auto lg:gap-5">
            {/* Stats Card */}
            <div className="flex flex-col justify-between rounded-2xl bg-white/10 backdrop-blur-lg p-5 sm:p-6 sm:w-64 shadow-xl">
              <div
                className="text-3xl sm:text-4xl font-normal tracking-tight text-[#010101] lg:text-white"
                style={{ fontFamily: "'Silkscreen', cursive" }}
              >
                42,500+
              </div>
              <p className="text-sm leading-relaxed mt-3 sm:mt-4 text-[#010101]/70 lg:text-white/70">
                Teams run Nexum to handle recurring ops daily.
              </p>
            </div>

            {/* Testimonial Card */}
            <div className="flex flex-col justify-between rounded-2xl bg-white/10 backdrop-blur-lg p-5 sm:p-6 sm:w-64 shadow-xl">
              <div>
                <div className="flex items-center gap-2 mb-3 sm:mb-4">
                  <div className="h-6 w-6 rounded-md bg-black flex items-center justify-center text-white font-bold text-xs">
                    S
                  </div>
                  <span className="text-sm font-semibold text-[#010101] lg:text-white">Stratify</span>
                </div>
                <p className="text-sm leading-relaxed text-[#010101]/80 lg:text-white/80">
                  "With Nexum we went from managing tedious operational work to having AI agents that handle everything."
                </p>
              </div>

              <div className="flex items-center gap-3 mt-4 sm:mt-5">
                <img
                  src="https://i.pravatar.cc/72?img=12"
                  alt="Sara Klein"
                  className="h-9 w-9 rounded-full object-cover bg-white/20 flex-shrink-0"
                />
                <div>
                  <div className="text-sm font-semibold text-[#010101] lg:text-white leading-tight">
                    Sara Klein
                  </div>
                  <div className="text-xs text-[#010101]/60 lg:text-white/60 leading-tight">
                    Dir of Operations
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </section>
  )
}
