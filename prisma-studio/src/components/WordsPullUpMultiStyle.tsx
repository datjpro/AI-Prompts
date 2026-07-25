import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export interface TextSegment {
  text: string;
  className?: string;
}

interface WordsPullUpMultiStyleProps {
  segments: TextSegment[];
  containerClassName?: string;
}

export function WordsPullUpMultiStyle({ segments, containerClassName = "" }: WordsPullUpMultiStyleProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  let wordCounter = 0;

  return (
    <div ref={ref} className={`inline-flex flex-wrap justify-center ${containerClassName}`}>
      {segments.map((segment, segIdx) => {
        const words = segment.text.split(" ");
        return words.map((word, wIdx) => {
          const delayIndex = wordCounter++;
          return (
            <span key={`${segIdx}-${wIdx}`} className="inline-block overflow-hidden mr-[0.25em] last:mr-0">
              <motion.span
                className={`inline-block ${segment.className || ""}`}
                initial={{ y: 20, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                transition={{ duration: 0.6, delay: delayIndex * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                {word}
              </motion.span>
            </span>
          );
        });
      })}
    </div>
  );
}
