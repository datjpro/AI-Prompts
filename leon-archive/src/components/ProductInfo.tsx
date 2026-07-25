import { motion } from 'motion/react';

interface ProductInfoProps {
  symbol: string;
}

export function ProductInfo({ symbol }: ProductInfoProps) {
  return (
    <motion.div
      id="outro-info"
      data-outro-offset="166"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
      className="fixed z-20 pointer-events-none mix-blend-exclusion flex flex-col items-center bottom-12 left-0 right-0 lg:bottom-[80px] lg:left-auto lg:right-8 lg:w-[330px]"
    >
      {/* Top block */}
      <div className="flex flex-col items-center lg:items-start w-[252px] lg:w-full mb-3 lg:mb-8">
        {/* Circle icon */}
        <div className="relative w-5 h-5 lg:w-[30px] lg:h-[30px] mb-2 lg:mb-4 flex items-center justify-center">
          <svg viewBox="0 0 40 40" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="20" cy="20" r="18.75" stroke="white" strokeWidth="2.5" />
          </svg>
          <span
            id="circle-symbol"
            className="absolute inset-0 flex items-center justify-center text-white text-[10px] lg:text-[15px] font-medium tracking-[-0.04em] uppercase"
          >
            {symbol}
          </span>
        </div>

        {/* Collection label */}
        <div className="text-white text-[20px] lg:text-[30px] leading-[100%] text-center lg:text-left font-medium tracking-[-0.04em] uppercase">
          ARCHIVE COLLECTION
          <br />
          "PROMPT"
        </div>
      </div>

      {/* Price */}
      <div className="text-white text-[60px] lg:text-[80px] leading-[100%] text-center font-medium tracking-[-0.04em]">
        $97,33
      </div>
    </motion.div>
  );
}
