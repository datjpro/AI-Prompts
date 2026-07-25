import { motion } from 'motion/react';

export function Logo() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0, ease: [0.25, 0.1, 0.25, 1] }}
      className="fixed z-20 pointer-events-none mix-blend-exclusion top-4 left-4 sm:top-8 sm:left-8 w-[124px] sm:w-[266px] lg:w-[355px]"
    >
      <svg
        viewBox="0 0 355 110"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
      >
        {/* LEON Wordmark */}
        {/* L */}
        <path d="M10 10V90H50V75H26V10H10Z" fill="white" />
        {/* E */}
        <path d="M60 10V90H105V75H76V55H100V40H76V25H105V10H60Z" fill="white" />
        {/* O */}
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M115 50C115 27.9086 132.909 10 155 10C177.091 10 195 27.9086 195 50C195 72.0914 177.091 90 155 90C132.909 90 115 72.0914 115 50ZM131 50C131 63.2548 141.745 74 155 74C168.255 74 179 63.2548 179 50C179 36.7452 168.255 26 155 26C141.745 26 131 36.7452 131 50Z"
          fill="white"
        />
        {/* N */}
        <path d="M205 10V90H220L250 40V90H265V10H250L220 60V10H205Z" fill="white" />

        {/* Circled R Registered Trademark Symbol */}
        <circle cx="310" cy="30" r="18" stroke="white" strokeWidth="3" fill="none" />
        <text
          x="310"
          y="36"
          fill="white"
          fontSize="20"
          fontWeight="bold"
          fontFamily="Inter Tight, sans-serif"
          textAnchor="middle"
        >
          R
        </text>
      </svg>
    </motion.div>
  );
}
