import { useEffect, useRef, useState } from 'react';

export function QuoteSection() {
  const sectionRef = useRef<HTMLElement>(null);

  // Animated layer state (interpolated lerp values)
  const [rainbowY, setRainbowY] = useState(120);

  const [leftCloudX, setLeftCloudX] = useState(-200);
  const [leftCloudY, setLeftCloudY] = useState(0);
  const [leftCloudOpacity, setLeftCloudOpacity] = useState(0);

  const [rightCloudX, setRightCloudX] = useState(200);
  const [rightCloudY, setRightCloudY] = useState(0);
  const [rightCloudOpacity, setRightCloudOpacity] = useState(0);

  // Refs for current lerp state
  const currentRef = useRef({
    rainbowY: 120,

    leftCloudX: -200,
    leftCloudY: 0,
    leftCloudOpacity: 0,

    rightCloudX: 200,
    rightCloudY: 0,
    rightCloudOpacity: 0,
  });

  useEffect(() => {
    let animId: number;

    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor;
    };

    const updateParallax = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Progress formula: 0 when top enters bottom of window, 1 when bottom leaves top of window
        const rawProgress = (windowHeight - rect.top) / (windowHeight + rect.height);
        const progress = Math.max(0, Math.min(1, rawProgress));

        // 1. Rainbow target Y: moves from +120px to -160px
        const targetRainbowY = 120 - progress * 280;
        currentRef.current.rainbowY = lerp(currentRef.current.rainbowY, targetRainbowY, 0.06);

        // 2. Cloud target values (in view when progress between 0.12 and 0.92)
        const inView = progress >= 0.12 && progress <= 0.92;

        const targetLeftX = inView ? 0 : -200;
        const targetRightX = inView ? 0 : 200;

        const targetCloudY = progress * -50;

        const targetLeftOpacity = Math.max(0, 1 - Math.abs(currentRef.current.leftCloudX) / 200);
        const targetRightOpacity = Math.max(0, 1 - Math.abs(currentRef.current.rightCloudX) / 200);

        // Lerp left cloud
        currentRef.current.leftCloudX = lerp(currentRef.current.leftCloudX, targetLeftX, 0.04);
        currentRef.current.leftCloudY = lerp(currentRef.current.leftCloudY, targetCloudY, 0.04);
        currentRef.current.leftCloudOpacity = lerp(currentRef.current.leftCloudOpacity, targetLeftOpacity, 0.04);

        // Lerp right cloud
        currentRef.current.rightCloudX = lerp(currentRef.current.rightCloudX, targetRightX, 0.04);
        currentRef.current.rightCloudY = lerp(currentRef.current.rightCloudY, targetCloudY, 0.04);
        currentRef.current.rightCloudOpacity = lerp(currentRef.current.rightCloudOpacity, targetRightOpacity, 0.04);

        // Update React states for DOM rendering
        setRainbowY(currentRef.current.rainbowY);

        setLeftCloudX(currentRef.current.leftCloudX);
        setLeftCloudY(currentRef.current.leftCloudY);
        setLeftCloudOpacity(currentRef.current.leftCloudOpacity);

        setRightCloudX(currentRef.current.rightCloudX);
        setRightCloudY(currentRef.current.rightCloudY);
        setRightCloudOpacity(currentRef.current.rightCloudOpacity);
      }

      animId = requestAnimationFrame(updateParallax);
    };

    animId = requestAnimationFrame(updateParallax);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        background: 'linear-gradient(to bottom, #010A17 0%, #0A4267 30%, #20658E 60%, #6BADC4 100%)',
      }}
      className="relative w-full h-screen overflow-hidden flex items-center justify-center select-none"
    >
      {/* 1. Rainbow image layer */}
      <img
        src="https://soft-zoom-63098134.figma.site/_assets/v11/8d520a7515d06cbfc403d0125e3d05b1a7ccd29c.png"
        alt="Rainbow Accent"
        className="absolute inset-x-0 top-0 z-30 w-full pointer-events-none"
        style={{
          willChange: 'transform',
          transform: `translate3d(0, ${rainbowY}px, 0)`,
        }}
      />

      {/* 2. Left cloud layer */}
      <img
        src="https://soft-zoom-63098134.figma.site/_assets/v11/0d6dfd3f90b930f21726f2ed56a3320d79b7a797.png"
        alt="Left Atmosphere Cloud"
        className="absolute left-0 bottom-[10%] z-10 hidden sm:block w-[500px] md:w-[650px] pointer-events-none"
        style={{
          marginLeft: '-50%',
          willChange: 'transform, opacity',
          transform: `translate3d(${leftCloudX}px, ${leftCloudY}px, 0)`,
          opacity: leftCloudOpacity,
        }}
      />

      {/* 3. Right cloud layer (flipped horizontally) */}
      <img
        src="https://soft-zoom-63098134.figma.site/_assets/v11/0d6dfd3f90b930f21726f2ed56a3320d79b7a797.png"
        alt="Right Atmosphere Cloud"
        className="absolute right-0 bottom-[15%] z-10 hidden sm:block w-[500px] md:w-[650px] pointer-events-none"
        style={{
          marginRight: '-75%',
          willChange: 'transform, opacity',
          transform: `scaleX(-1) translate3d(${-rightCloudX}px, ${rightCloudY}px, 0)`,
          opacity: rightCloudOpacity,
        }}
      />

      {/* 4. Quote content layer */}
      <div className="relative z-20 max-w-4xl px-6 text-center">
        <blockquote className="font-instrument text-white text-xl sm:text-2xl md:text-4xl lg:text-[42px] leading-[1.45] md:leading-[1.5] text-glow">
          “Serene was founded on a belief in beauty that honors your nature. We pursue refined outcomes, considered approaches, and lasting vitality. We spend time learning what matters to you before deciding what serves you best. No rushing, no excess -- just support that lets you feel radiant.”
        </blockquote>

        <div className="mt-6 md:mt-8 text-white/80 text-sm md:text-base tracking-wide font-inter">
          Dr. Mia Callahan -- Founder
        </div>
      </div>
    </section>
  );
}
