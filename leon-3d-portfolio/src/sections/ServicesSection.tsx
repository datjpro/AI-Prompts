import React from 'react';
import { FadeIn } from '../components/FadeIn';

interface ServiceItem {
  number: string;
  title: string;
  description: string;
}

const servicesData: ServiceItem[] = [
  {
    number: '01',
    title: '3D Modeling',
    description:
      'Creation of detailed objects, characters, or environments tailored to specific client needs, ideal for games, products, and visualizations.',
  },
  {
    number: '02',
    title: 'Rendering',
    description:
      'High-quality, photorealistic renders that showcase designs with custom lighting, textures, and materials to bring concepts to life.',
  },
  {
    number: '03',
    title: 'Motion Design',
    description:
      'Dynamic animations and motion graphics that add energy and storytelling to brands, products, and digital experiences.',
  },
  {
    number: '04',
    title: 'Branding',
    description:
      'Crafting cohesive visual identities -- from logos to full brand systems -- that communicate a clear and memorable presence.',
  },
  {
    number: '05',
    title: 'Web Design',
    description:
      'Designing clean, modern, and conversion-focused websites with attention to layout, typography, and user experience.',
  },
];

export const ServicesSection: React.FC = () => {
  return (
    <section
      id="services"
      className="relative z-10 w-full bg-[#FFFFFF] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 text-[#0C0C0C]"
    >
      {/* Heading */}
      <FadeIn delay={0} y={40} className="w-full text-center">
        <h2 className="font-black uppercase text-center text-[#0C0C0C] leading-none tracking-tight text-[clamp(3rem,12vw,160px)] mb-16 sm:mb-20 md:mb-28">
          Services
        </h2>
      </FadeIn>

      {/* Services List */}
      <div className="max-w-5xl mx-auto flex flex-col">
        {servicesData.map((item, i) => (
          <FadeIn
            key={item.number}
            delay={i * 0.1}
            y={30}
            className={`border-t border-[#0C0C0C]/15 py-8 sm:py-10 md:py-12 ${
              i === servicesData.length - 1 ? 'border-b border-[#0C0C0C]/15' : ''
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 sm:gap-8 md:gap-12 group">
              {/* Number Left */}
              <span className="font-black text-[#0C0C0C] leading-none text-[clamp(3rem,10vw,140px)] select-none shrink-0 transition-transform duration-300 group-hover:scale-105 origin-left">
                {item.number}
              </span>

              {/* Title + Description Stacked Right */}
              <div className="flex flex-col flex-1 gap-2 sm:gap-3 pt-2">
                <h3 className="font-medium uppercase text-[#0C0C0C] text-[clamp(1rem,2.2vw,2.1rem)]">
                  {item.title}
                </h3>
                <p className="font-light leading-relaxed max-w-2xl text-[#0C0C0C] opacity-60 text-[clamp(0.85rem,1.6vw,1.25rem)]">
                  {item.description}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
};
