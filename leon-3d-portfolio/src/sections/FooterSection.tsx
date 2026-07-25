import React from 'react';
import { FadeIn } from '../components/FadeIn';
import { ContactButton } from '../components/ContactButton';
import { Mail, Globe, Share2, MessageSquare, ArrowUp } from 'lucide-react';

export const FooterSection: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      id="contact"
      className="relative z-30 w-full bg-[#0C0C0C] text-[#D7E2EA] px-6 md:px-12 pt-20 pb-12 border-t border-[#D7E2EA]/10 flex flex-col justify-between min-h-[60vh]"
    >
      <div className="max-w-6xl mx-auto w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-12 mb-16">
        <FadeIn delay={0.1} y={30} className="flex flex-col gap-4">
          <span className="text-xs uppercase tracking-widest text-[#D7E2EA]/60 font-light">
            Got a project in mind?
          </span>
          <h2 className="hero-heading font-black uppercase text-4xl sm:text-6xl md:text-7xl tracking-tight leading-none">
            Let&apos;s Create Together
          </h2>
          <p className="font-light text-[#D7E2EA]/80 max-w-md text-base sm:text-lg pt-2">
            Available for freelance projects, 3D art direction, and collaborative opportunities.
          </p>
        </FadeIn>

        <FadeIn delay={0.25} y={30} className="flex flex-col items-start gap-6">
          <ContactButton
            onClick={() => {
              window.location.href = 'mailto:leon@example.com';
            }}
          />
          <div className="flex items-center gap-4 text-[#D7E2EA]/70">
            <Mail className="w-5 h-5 text-[#B600A8]" />
            <a
              href="mailto:leon@example.com"
              className="hover:text-white transition-colors duration-200 font-medium"
            >
              leon.3dcreator@example.com
            </a>
          </div>
        </FadeIn>
      </div>

      <div className="max-w-6xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-[#D7E2EA]/10">
        <div className="flex items-center gap-6">
          {[
            { icon: Globe, href: '#', label: 'Website' },
            { icon: Share2, href: '#', label: 'Share' },
            { icon: MessageSquare, href: '#', label: 'Chat' },
            { icon: Mail, href: '#', label: 'Email' },
          ].map((social) => {
            const Icon = social.icon;
            return (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="w-10 h-10 rounded-full border border-[#D7E2EA]/20 flex items-center justify-center text-[#D7E2EA] hover:border-white hover:text-white hover:bg-white/5 transition-all duration-300"
              >
                <Icon className="w-4 h-4" />
              </a>
            );
          })}
        </div>

        <p className="text-xs uppercase tracking-wider text-[#D7E2EA]/50">
          &copy; {new Date().getFullYear()} Leon -- 3D Creator. All rights reserved.
        </p>

        <button
          onClick={scrollToTop}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#D7E2EA]/70 hover:text-white transition-colors cursor-pointer"
        >
          <span>Back to top</span>
          <div className="w-8 h-8 rounded-full border border-[#D7E2EA]/20 flex items-center justify-center">
            <ArrowUp className="w-4 h-4" />
          </div>
        </button>
      </div>
    </footer>
  );
};
