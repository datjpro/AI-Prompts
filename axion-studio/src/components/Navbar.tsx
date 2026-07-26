import { useState, useEffect } from 'react'
import { ArrowRight, Clock, Menu, X } from 'lucide-react'

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [londonTime, setLondonTime] = useState('')

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const time = now.toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Europe/London',
        hour12: false,
      })
      setLondonTime(time)
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

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

  const navLinks = ['Projects', 'Studio', 'Journal', 'Connect']

  return (
    <>
      <nav className="relative z-20 w-full">
        <div className="max-w-[1440px] mx-auto p-2 sm:p-3">
          <div className="bg-white rounded-full p-[5px] flex items-center justify-between">
            {/* Left side */}
            <div className="flex items-center gap-6">
              {/* Logo */}
              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gray-900 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-[10px] sm:text-[11px] font-bold tracking-tight">AX</span>
              </div>

              {/* Desktop Nav Links */}
              <div className="hidden md:flex items-center gap-6">
                {navLinks.map((link) => (
                  <a
                    key={link}
                    href="#"
                    className="text-[14px] text-gray-900 hover:text-gray-500 transition-colors duration-300"
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>

            {/* Right side - Desktop */}
            <div className="hidden md:flex items-center gap-4">
              {/* Taking on projects text */}
              <span className="hidden lg:block text-[13px] text-gray-600">
                Taking on projects for Q1 2026
              </span>

              {/* London time */}
              <div className="flex items-center gap-1.5">
                <Clock size={14} className="text-gray-600" />
                <span className="text-[13px] text-gray-600">
                  {londonTime} in London
                </span>
              </div>

              {/* CTA Button */}
              <button className="group bg-gray-900 text-white rounded-full pl-5 pr-2 py-2 flex items-center gap-2.5">
                <span className="overflow-hidden h-[20px]">
                  <span className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-translate-y-1/2">
                    <span className="text-[13px] font-medium h-[20px] flex items-center">Book a strategy call</span>
                    <span className="text-[13px] font-medium h-[20px] flex items-center">Book a strategy call</span>
                  </span>
                </span>
                <span className="w-6 h-6 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                  <ArrowRight className="w-3.5 h-3.5 text-gray-900 transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-rotate-45" />
                </span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden bg-gray-900 rounded-full p-2.5 flex items-center justify-center"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X size={18} className="text-white" />
              ) : (
                <Menu size={18} className="text-white" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Bottom Sheet */}
          <div className="absolute bottom-0 left-0 right-0 mx-3 mb-3">
            <div
              className="bg-white rounded-2xl p-6 animate-slide-up"
              style={{
                animation: 'slideUp 0.5s cubic-bezier(0.32, 0.72, 0, 1) forwards',
              }}
            >
              {/* Time badge */}
              <div className="flex items-center gap-1.5 mb-6">
                <Clock size={14} className="text-gray-600" />
                <span className="text-[13px] text-gray-600">
                  {londonTime} in London
                </span>
              </div>

              {/* Nav links */}
              <div className="flex flex-col gap-4 mb-8">
                {navLinks.map((link) => (
                  <a
                    key={link}
                    href="#"
                    className="text-[28px] sm:text-[32px] font-medium text-gray-900"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link}
                  </a>
                ))}
              </div>

              {/* Start a project button */}
              <button className="group w-full bg-gray-900 text-white rounded-full pl-5 pr-2 py-3 flex items-center justify-between">
                <span className="text-[14px] font-medium">Start a project</span>
                <span className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <ArrowRight className="w-4 h-4 text-gray-900" />
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideUp {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  )
}

export default Navbar
