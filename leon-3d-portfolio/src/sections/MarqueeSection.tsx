import React, { useEffect, useRef, useState } from 'react';

const marqueeImages = [
  "https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif",
  "https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif",
  "https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif",
  "https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif",
  "https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif",
  "https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif",
  "https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif",
  "https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif",
  "https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif",
  "https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif",
  "https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif",
  "https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif",
  "https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif",
  "https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif",
  "https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif",
  "https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif",
  "https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif",
  "https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif",
  "https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif",
  "https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif",
  "https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif"
];

const row1Images = marqueeImages.slice(0, 11);
const row2Images = marqueeImages.slice(11);

// Tripled lists for continuous infinite scrolling aesthetic
const row1Tripled = [...row1Images, ...row1Images, ...row1Images];
const row2Tripled = [...row2Images, ...row2Images, ...row2Images];

export const MarqueeSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollOffset, setScrollOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionTop = rect.top + window.scrollY;
      const offset = (window.scrollY - sectionTop + window.innerHeight) * 0.3;
      setScrollOffset(offset);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const row1Transform = scrollOffset - 200;
  const row2Transform = -(scrollOffset - 200);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#0C0C0C] pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden flex flex-col gap-3"
    >
      {/* Row 1 - Moves RIGHT on scroll */}
      <div className="w-full overflow-hidden">
        <div
          className="flex gap-3 w-max"
          style={{
            transform: `translateX(${row1Transform}px)`,
            willChange: 'transform',
          }}
        >
          {row1Tripled.map((url, idx) => (
            <div
              key={`row1-${idx}`}
              className="w-[320px] sm:w-[380px] md:w-[420px] h-[200px] sm:h-[240px] md:h-[270px] flex-shrink-0 rounded-2xl overflow-hidden bg-[#181818] border border-[#ffffff0a]"
            >
              <img
                src={url}
                alt={`3D Work ${idx + 1}`}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Row 2 - Moves LEFT on scroll */}
      <div className="w-full overflow-hidden">
        <div
          className="flex gap-3 w-max"
          style={{
            transform: `translateX(${row2Transform}px)`,
            willChange: 'transform',
          }}
        >
          {row2Tripled.map((url, idx) => (
            <div
              key={`row2-${idx}`}
              className="w-[320px] sm:w-[380px] md:w-[420px] h-[200px] sm:h-[240px] md:h-[270px] flex-shrink-0 rounded-2xl overflow-hidden bg-[#181818] border border-[#ffffff0a]"
            >
              <img
                src={url}
                alt={`3D Showcase ${idx + 1}`}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
