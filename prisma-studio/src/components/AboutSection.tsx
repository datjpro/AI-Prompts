import { useRef } from 'react';
import { useScroll } from 'framer-motion';
import { WordsPullUpMultiStyle } from './WordsPullUpMultiStyle';
import type { TextSegment } from './WordsPullUpMultiStyle';
import { AnimatedLetter } from './AnimatedLetter';

export function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.2'],
  });

  const headingSegments: TextSegment[] = [
    { text: "I am Marcus Chen,", className: "font-normal" },
    { text: "a self-taught director.", className: "italic font-serif" },
    { text: "I have skills in color grading, visual effects, and narrative design.", className: "font-normal" },
  ];

  const bodyText = "Over the last seven years, I have worked with Parallax, a Berlin-based production house that crafts cinema, series, and Noir Studio in Paris. Together, we have created work that has earned international acclaim at several major festivals.";
  const chars = Array.from(bodyText);

  return (
    <section className="bg-black py-24 sm:py-32 px-4 sm:px-6 md:px-12">
      <div
        ref={containerRef}
        className="bg-[#101010] rounded-3xl p-8 sm:p-12 md:p-16 lg:p-20 text-center max-w-6xl mx-auto flex flex-col items-center gap-8 sm:gap-12 border border-white/5 shadow-2xl"
      >
        {/* Top small label */}
        <span className="text-primary text-[10px] sm:text-xs uppercase tracking-widest font-medium">
          Visual arts
        </span>

        {/* Main heading */}
        <WordsPullUpMultiStyle
          segments={headingSegments}
          containerClassName="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl max-w-3xl mx-auto leading-[0.95] sm:leading-[0.9] text-[#E1E0CC]"
        />

        {/* Body paragraph with scroll-linked character opacity */}
        <p className="text-[#DEDBC8] text-xs sm:text-sm md:text-base max-w-xl mx-auto leading-relaxed">
          {chars.map((char, i) => (
            <AnimatedLetter
              key={i}
              char={char}
              index={i}
              totalChars={chars.length}
              progress={scrollYProgress}
            />
          ))}
        </p>
      </div>
    </section>
  );
}
