import React, { useState } from 'react';
import { Twitter, Circle, Instagram, Linkedin } from 'lucide-react';

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
  icon: React.ElementType;
  className: string;
  href?: string;
  label: string;
}

const SocialBtn: React.FC<SocialBtnProps> = ({ icon: Icon, className, href = "#", label }) => {
  return (
    <a
      href={href}
      aria-label={label}
      className={`w-8 h-8 rounded-xl flex items-center justify-center hover:opacity-80 transition-opacity ${className}`}
    >
      <Icon size={13} />
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
              <button className="bg-black text-white text-sm font-medium px-4 sm:px-5 py-2 rounded-xl hover:bg-gray-800 transition-colors ml-auto sm:ml-0 whitespace-nowrap">
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
                    <SocialBtn icon={Twitter} className="bg-gray-100 text-gray-800" label="Twitter" />
                    <SocialBtn icon={Circle} className="bg-pink-100 text-pink-500" label="Circle" />
                    <SocialBtn icon={Instagram} className="bg-orange-100 text-orange-400" label="Instagram" />
                    <SocialBtn icon={Linkedin} className="bg-blue-100 text-blue-600" label="LinkedIn" />
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
                              className={`text-xs font-medium px-3 py-2 rounded-lg border transition-all ${
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
