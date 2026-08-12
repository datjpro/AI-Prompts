import React, { useState } from 'react';

const VIDEO_URL = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260602_150901_c45b90ec-18d7-42ff-90e2-b95d7109e330.mp4";

const SERVICES = [
  'Website',
  'Mobile App',
  'Web App',
  'E-Commerce',
  'Visual Identity',
  '3D & Motion',
  'Digital Marketing',
  'Growth & Consulting',
  'Other'
];

interface SocialBtnProps {
  type: 'twitter' | 'circle' | 'instagram' | 'linkedin';
  className: string;
  href?: string;
  label: string;
}

const SocialBtn: React.FC<SocialBtnProps> = ({ type, className, href = "#", label }) => {
  const renderIcon = () => {
    switch (type) {
      case 'twitter':
        return (
          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.936 9.936 0 0024 4.59z"/>
          </svg>
        );
      case 'circle':
        return (
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="9"/>
          </svg>
        );
      case 'instagram':
        return (
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
          </svg>
        );
      case 'linkedin':
        return (
          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
          </svg>
        );
    }
  };

  return (
    <a
      href={href}
      aria-label={label}
      className={`w-8 h-8 rounded-xl flex items-center justify-center hover:opacity-80 transition-opacity ${className}`}
    >
      {renderIcon()}
    </a>
  );
};

export default function App() {
  const [selected, setSelected] = useState<string[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const toggleService = (service: string) => {
    setSelected(prev =>
      prev.includes(service)
        ? prev.filter(item => item !== service)
        : [...prev, service]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    await new Promise(r => setTimeout(r, 1000));
    setSending(false);
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-white p-3 sm:p-4 md:p-6">
      {/* Outer Card Container */}
      <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden min-h-[calc(100vh-24px)] sm:min-h-[calc(100vh-32px)] md:min-h-[calc(100vh-48px)] lg:h-[calc(100vh-48px)]">
        {/* Background Video */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          src={VIDEO_URL}
        />

        {/* Dark Vignette Gradient for Readability */}
        <div className="absolute inset-0 bg-black/20 pointer-events-none" />

        {/* Content Layer */}
        <div className="relative z-10 flex flex-col min-h-[calc(100vh-24px)] sm:min-h-[calc(100vh-32px)] md:min-h-[calc(100vh-48px)] lg:h-full p-4 sm:p-6 md:p-8 gap-6">
          {/* Top Navbar */}
          <header className="w-full flex items-center justify-between">
            <div className="bg-white/60 backdrop-blur-md rounded-2xl shadow-sm pl-3 sm:pl-4 pr-2 py-2 w-full sm:w-auto flex items-center gap-3 sm:gap-6">
              {/* Logo */}
              <a href="#" className="flex items-center" aria-label="Forma Home">
                <svg className="w-8 h-8" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill="black" d="M 256 256 L 128 256 L 0 128 L 128 128 Z" />
                  <path fill="black" d="M 256 128 L 128 128 L 0 0 L 128 0 Z" />
                </svg>
              </a>

              {/* Navigation Links */}
              <nav className="hidden sm:flex items-center gap-6">
                <a href="#story" className="text-gray-800 text-sm font-medium hover:opacity-60 transition-opacity whitespace-nowrap">Our story</a>
                <a href="#expertise" className="text-gray-800 text-sm font-medium hover:opacity-60 transition-opacity whitespace-nowrap">Expertise</a>
                <a href="#work" className="text-gray-800 text-sm font-medium hover:opacity-60 transition-opacity whitespace-nowrap">Our work</a>
                <a href="#journal" className="text-gray-800 text-sm font-medium hover:opacity-60 transition-opacity whitespace-nowrap">Journal</a>
              </nav>

              {/* CTA Button */}
              <button className="bg-black text-white text-sm font-medium px-4 sm:px-5 py-2 rounded-xl hover:bg-gray-800 transition-colors ml-auto sm:ml-0 whitespace-nowrap cursor-pointer">
                Start a project
              </button>
            </div>
          </header>

          {/* Spacer */}
          <div className="flex-1 min-h-[2rem]" />

          {/* Bottom Row */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            {/* Headline (Left) */}
            <p className="text-3xl sm:text-4xl xl:text-5xl font-medium leading-tight text-white drop-shadow-lg lg:max-w-lg xl:max-w-2xl shrink-0">
              We craft bold ideas<br />
              and ship them as{' '}
              <span
                style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontStyle: 'italic',
                  fontWeight: 400,
                }}
              >
                products
              </span>
            </p>

            {/* Contact Form Card (Right) */}
            <div className="w-full lg:w-[min(480px,45%)] shrink-0">
              <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden p-4 sm:p-6 flex flex-col gap-4">
                {/* Heading */}
                <h2 className="text-xl sm:text-2xl font-semibold text-black tracking-tight">
                  Say hello! 👋
                </h2>

                {/* Email + Socials Row */}
                <div className="flex flex-row items-center justify-between gap-3 bg-gray-50 rounded-2xl px-4 py-2.5">
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs text-gray-500 font-medium">Drop us a line</span>
                    <a href="mailto:hello@forma.co" className="text-blue-600 font-semibold text-sm hover:underline truncate">
                      hello@forma.co
                    </a>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <SocialBtn type="twitter" className="bg-gray-100 text-gray-800" label="Twitter" />
                    <SocialBtn type="circle" className="bg-pink-100 text-pink-500" label="Circle" />
                    <SocialBtn type="instagram" className="bg-orange-100 text-orange-400" label="Instagram" />
                    <SocialBtn type="linkedin" className="bg-blue-100 text-blue-600" label="LinkedIn" />
                  </div>
                </div>

                {/* OR Divider */}
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-px bg-gray-200" />
                  <span className="text-gray-400 font-medium text-sm">OR</span>
                  <div className="flex-1 h-px bg-gray-200" />
                </div>

                {/* Form or Success State */}
                {sent ? (
                  <div className="py-6 gap-3 flex flex-col items-center justify-center text-center">
                    <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-xl text-green-600 font-bold">
                      ✓
                    </div>
                    <h3 className="text-base font-semibold text-gray-900">You're all set!</h3>
                    <p className="text-sm text-gray-500">Expect a reply within 24 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <label className="text-sm font-medium text-black -mb-2">
                      Tell us about your vision
                    </label>

                    {/* Inputs */}
                    <div className="flex flex-col sm:flex-row gap-2">
                      <input
                        type="text"
                        required
                        placeholder="Full name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="flex-1 min-w-0 text-sm px-3 py-2.5 rounded-xl border border-gray-200 bg-transparent placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition"
                      />
                      <input
                        type="email"
                        required
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="flex-1 min-w-0 text-sm px-3 py-2.5 rounded-xl border border-gray-200 bg-transparent placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition"
                      />
                    </div>

                    {/* Textarea */}
                    <textarea
                      rows={4}
                      required
                      placeholder="What are you looking to build or improve..."
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      className="w-full text-sm px-3 py-2.5 rounded-xl border border-gray-200 bg-transparent placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition resize-none"
                    />

                    {/* Service Tags */}
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium text-black">
                        I need help with...
                      </label>
                      <div className="flex flex-wrap gap-1.5">
                        {SERVICES.map(service => {
                          const isActive = selected.includes(service);
                          return (
                            <button
                              key={service}
                              type="button"
                              onClick={() => toggleService(service)}
                              className={`text-xs font-medium px-3 py-2 rounded-lg border transition-all cursor-pointer ${
                                isActive
                                  ? 'bg-gray-100 text-black border-black'
                                  : 'bg-white text-gray-700 border-gray-200 hover:border-gray-400'
                              }`}
                            >
                              {service}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={sending}
                      className="w-full bg-black text-white text-sm font-semibold py-3 rounded-2xl hover:bg-gray-800 transition-colors disabled:opacity-60 cursor-pointer"
                    >
                      {sending ? 'Sending...' : 'Send my message'}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
