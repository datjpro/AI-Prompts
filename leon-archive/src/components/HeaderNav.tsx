import { motion } from 'motion/react';

export function HeaderNav() {
  return (
    <motion.header
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
      className="fixed z-20 pointer-events-none mix-blend-exclusion top-4 right-4 sm:top-8 sm:right-8 lg:w-[330px] h-[30px] flex items-center justify-between"
    >
      <span className="hidden sm:inline-block text-[15px] font-medium uppercase text-white tracking-tight">
        ABOUT
      </span>

      <div className="flex items-center gap-5 sm:gap-[50px]">
        <svg
          viewBox="0 0 40 40"
          className="w-6 h-6 sm:w-[30px] sm:h-[30px]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 14H40" stroke="white" strokeWidth="2.5" />
          <path d="M0 26H40" stroke="white" strokeWidth="2.5" />
        </svg>

        <span className="text-[13px] sm:text-[15px] font-medium uppercase text-white tracking-tight">
          [ CART ]
        </span>
      </div>
    </motion.header>
  );
}
