import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import { WordsPullUpMultiStyle } from './WordsPullUpMultiStyle';
import type { TextSegment } from './WordsPullUpMultiStyle';

export function FeaturesSection() {
  const gridRef = useRef<HTMLDivElement>(null);
  const isGridInView = useInView(gridRef, { once: true, margin: "-100px" });

  const headerSegments: TextSegment[] = [
    { text: "Studio-grade workflows for visionary creators.", className: "text-[#E1E0CC]" },
    { text: "Built for pure vision. Powered by art.", className: "text-gray-500" },
  ];

  const cardVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: i * 0.15,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  return (
    <section className="min-h-screen bg-black relative py-24 sm:py-32 px-4 sm:px-6 md:px-12 overflow-hidden">
      {/* Background noise texture */}
      <div className="bg-noise opacity-[0.15] absolute inset-0 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 flex flex-col">
        {/* Header Text */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20 max-w-3xl mx-auto">
          <WordsPullUpMultiStyle
            segments={headerSegments}
            containerClassName="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal leading-snug"
          />
        </div>

        {/* 4-Column Card Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-2 md:gap-1 lg:h-[480px]"
        >
          {/* Card 1 - Video Card */}
          <motion.div
            custom={0}
            initial="hidden"
            animate={isGridInView ? "visible" : "hidden"}
            variants={cardVariants}
            className="relative rounded-2xl sm:rounded-3xl overflow-hidden h-[400px] lg:h-full p-6 sm:p-8 flex flex-col justify-end group border border-white/5 shadow-xl"
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover absolute inset-0 pointer-events-none"
              src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_133058_0504132a-0cf3-4450-a370-8ea3b05c95d4.mp4"
            />
            <div className="bg-gradient-to-t from-black/80 via-black/30 to-transparent absolute inset-0 pointer-events-none" />
            <h3 className="text-[#E1E0CC] text-lg sm:text-xl font-medium relative z-10">
              Your creative canvas.
            </h3>
          </motion.div>

          {/* Card 2 - Project Storyboard. (01) */}
          <motion.div
            custom={1}
            initial="hidden"
            animate={isGridInView ? "visible" : "hidden"}
            variants={cardVariants}
            className="bg-[#212121] rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col justify-between h-[400px] lg:h-full group hover:bg-[#282828] transition-colors duration-300 border border-white/5 shadow-xl"
          >
            <div>
              <img
                src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171918_4a5edc79-d78f-4637-ac8b-53c43c220606.png&w=1280&q=85"
                alt="Project Storyboard Icon"
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl object-cover mb-4 border border-white/10"
              />
              <div className="flex items-baseline justify-between mb-4">
                <h3 className="text-[#E1E0CC] text-base sm:text-lg font-medium">
                  Project Storyboard.
                </h3>
                <span className="text-gray-500 text-xs font-mono">01</span>
              </div>
              <ul className="space-y-2.5 mb-6">
                {[
                  "Interactive node maps",
                  "Sequence arrangement",
                  "Live team collaboration",
                  "Auto format export",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-400">
                    <Check className="w-4 h-4 text-primary shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <a
                href="#learn-more"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-primary font-medium group/link hover:opacity-80 transition-opacity"
              >
                <span>Learn more</span>
                <ArrowRight className="w-3.5 h-3.5 -rotate-45 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </motion.div>

          {/* Card 3 - Smart Critiques. (02) */}
          <motion.div
            custom={2}
            initial="hidden"
            animate={isGridInView ? "visible" : "hidden"}
            variants={cardVariants}
            className="bg-[#212121] rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col justify-between h-[400px] lg:h-full group hover:bg-[#282828] transition-colors duration-300 border border-white/5 shadow-xl"
          >
            <div>
              <img
                src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171741_ed9845ab-f5b2-4018-8ce7-07cc01823522.png&w=1280&q=85"
                alt="Smart Critiques Icon"
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl object-cover mb-4 border border-white/10"
              />
              <div className="flex items-baseline justify-between mb-4">
                <h3 className="text-[#E1E0CC] text-base sm:text-lg font-medium">
                  Smart Critiques.
                </h3>
                <span className="text-gray-500 text-xs font-mono">02</span>
              </div>
              <ul className="space-y-2.5 mb-6">
                {[
                  "Automated frame analysis",
                  "Contextual creative notes",
                  "Seamless NLE integration",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-400">
                    <Check className="w-4 h-4 text-primary shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <a
                href="#learn-more"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-primary font-medium group/link hover:opacity-80 transition-opacity"
              >
                <span>Learn more</span>
                <ArrowRight className="w-3.5 h-3.5 -rotate-45 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </motion.div>

          {/* Card 4 - Immersion Capsule. (03) */}
          <motion.div
            custom={3}
            initial="hidden"
            animate={isGridInView ? "visible" : "hidden"}
            variants={cardVariants}
            className="bg-[#212121] rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col justify-between h-[400px] lg:h-full group hover:bg-[#282828] transition-colors duration-300 border border-white/5 shadow-xl"
          >
            <div>
              <img
                src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171809_f56666dc-c099-4778-ad82-9ad4f209567b.png&w=1280&q=85"
                alt="Immersion Capsule Icon"
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl object-cover mb-4 border border-white/10"
              />
              <div className="flex items-baseline justify-between mb-4">
                <h3 className="text-[#E1E0CC] text-base sm:text-lg font-medium">
                  Immersion Capsule.
                </h3>
                <span className="text-gray-500 text-xs font-mono">03</span>
              </div>
              <ul className="space-y-2.5 mb-6">
                {[
                  "Notification silencer",
                  "Ambient soundscapes generator",
                  "Calendar schedule sync",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-400">
                    <Check className="w-4 h-4 text-primary shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <a
                href="#learn-more"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-primary font-medium group/link hover:opacity-80 transition-opacity"
              >
                <span>Learn more</span>
                <ArrowRight className="w-3.5 h-3.5 -rotate-45 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
