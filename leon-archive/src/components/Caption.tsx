import { motion } from 'motion/react';

export function Caption() {
  return (
    <motion.p
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      className="fixed z-20 pointer-events-none mix-blend-exclusion left-4 sm:left-8 top-[118px] sm:top-[180px] lg:top-[244px] w-[calc(100vw-32px)] sm:w-[calc(50vw-48px)] lg:w-[692px] text-white text-[12px] leading-[140%] tracking-[-0.04em] font-medium"
    >
      When switching between videos near the center, do not reset currentTime to 0 abruptly. Add a small dead zone: if cursor is within +/-50px of center, keep both videos at currentTime = 0 and show whichever was last active.
    </motion.p>
  );
}
