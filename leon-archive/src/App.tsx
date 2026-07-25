import { useEffect, useRef, useState } from 'react';
import { CustomCursor } from './components/CustomCursor';
import { Logo } from './components/Logo';
import { HeaderNav } from './components/HeaderNav';
import { Caption } from './components/Caption';
import { ProductInfo } from './components/ProductInfo';
import { OutroBuyButton } from './components/OutroBuyButton';
import { OutroFooter } from './components/OutroFooter';
import { GalleryGrid } from './components/GalleryGrid';

const LEFT_VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_39ca84eAE1ODL9hbR5VhoEj8tBf/hf_20260625_154433_532a85d3-dabf-4265-b8bd-19ac6af31842.mp4';
const RIGHT_VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_39ca84eAE1ODL9hbR5VhoEj8tBf/hf_20260625_154401_a664f076-b971-4557-8728-40ef9ea4c49b.mp4';

const SYMBOLS = ['8', '$', '^^', '%', '/'];

export default function App() {
  const [cols, setCols] = useState(4);
  const [videosLoaded, setVideosLoaded] = useState(false);
  const [circleSymbol, setCircleSymbol] = useState('8');
  const [spacerHeight, setSpacerHeight] = useState('500vh');

  const leftVideoRef = useRef<HTMLVideoElement>(null);
  const rightVideoRef = useRef<HTMLVideoElement>(null);
  const leftLoadedRef = useRef(false);
  const rightLoadedRef = useRef(false);
  const activeSideRef = useRef<'left' | 'right'>('right');

  const innerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const mousePosRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const isTouchRef = useRef(false);
  const lastSymbolTimeRef = useRef(0);

  // Detect responsive cols
  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 640) setCols(2);
      else if (w < 1024) setCols(3);
      else setCols(4);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Detect touch device
  useEffect(() => {
    isTouchRef.current = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  }, []);

  // Video load tracking
  const checkLoaded = () => {
    if (leftLoadedRef.current && rightLoadedRef.current) {
      setVideosLoaded(true);
    }
  };

  // Mouse movement tracking for video scrubbing
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Calculate spacer height once layout mounts / resizes
  useEffect(() => {
    const calcSpacer = () => {
      if (innerRef.current) {
        const vh = window.innerHeight;
        const wrapHeight = innerRef.current.scrollHeight;
        const maxScroll = Math.max(0, wrapHeight - vh);
        const total = vh + maxScroll + (vh - 100) + vh;
        setSpacerHeight(`${total}px`);
      }
    };
    calcSpacer();
    window.addEventListener('resize', calcSpacer);
    const timer = setTimeout(calcSpacer, 300);
    return () => {
      window.removeEventListener('resize', calcSpacer);
      clearTimeout(timer);
    };
  }, [cols]);

  // Touch video auto-play alternate logic
  useEffect(() => {
    if (!isTouchRef.current) return;

    const left = leftVideoRef.current;
    const right = rightVideoRef.current;
    if (!left || !right) return;

    left.play().catch(() => {});

    const handleLeftEnded = () => {
      left.style.display = 'none';
      right.style.display = 'block';
      right.currentTime = 0;
      right.play().catch(() => {});
    };

    const handleRightEnded = () => {
      right.style.display = 'none';
      left.style.display = 'block';
      left.currentTime = 0;
      left.play().catch(() => {});
    };

    left.addEventListener('ended', handleLeftEnded);
    right.addEventListener('ended', handleRightEnded);

    return () => {
      left.removeEventListener('ended', handleLeftEnded);
      right.removeEventListener('ended', handleRightEnded);
    };
  }, []);

  // Main RAF Loop for video scrubbing, scroll panel positioning, card scaling, and outro progress
  useEffect(() => {
    let animId: number;

    const loop = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      const vw = window.innerWidth;

      // 1. Video scrubbing (Desktop non-touch)
      if (!isTouchRef.current && scrollY <= vh) {
        const leftVid = leftVideoRef.current;
        const rightVid = rightVideoRef.current;

        if (leftVid && rightVid) {
          const mouseX = mousePosRef.current.x;
          const centerX = vw / 2;
          const deadZone = Math.max(50, vw * 0.05);

          if (Math.abs(mouseX - centerX) <= deadZone) {
            // Dead zone: show last active video, keep both at 0
            if (activeSideRef.current === 'right') {
              rightVid.style.display = 'block';
              leftVid.style.display = 'none';
              if (!rightVid.seeking && rightVid.duration) rightVid.currentTime = 0;
            } else {
              leftVid.style.display = 'block';
              rightVid.style.display = 'none';
              if (!leftVid.seeking && leftVid.duration) leftVid.currentTime = 0;
            }
          } else if (mouseX < centerX - deadZone) {
            // Left side cursor -> show RIGHT video
            activeSideRef.current = 'right';
            rightVid.style.display = 'block';
            leftVid.style.display = 'none';

            const dist = centerX - deadZone - mouseX;
            const range = centerX - deadZone;
            const progress = Math.max(0, Math.min(1, dist / range));

            if (!rightVid.seeking && rightVid.duration) {
              rightVid.currentTime = progress * rightVid.duration;
            }
          } else {
            // Right side cursor -> show LEFT video
            activeSideRef.current = 'left';
            leftVid.style.display = 'block';
            rightVid.style.display = 'none';

            const dist = mouseX - (centerX + deadZone);
            const range = vw - (centerX + deadZone);
            const progress = Math.max(0, Math.min(1, dist / range));

            if (!leftVid.seeking && leftVid.duration) {
              leftVid.currentTime = progress * leftVid.duration;
            }
          }
        }
      }

      // Hide videos when scroll passed first viewport height
      const canvasEl = document.getElementById('main-canvas');
      if (canvasEl) {
        canvasEl.style.visibility = scrollY > vh ? 'hidden' : 'visible';
      }

      // 2. Scroll Phases & Black Panel / Inner Wrapper position
      const wrapHeight = innerRef.current ? innerRef.current.scrollHeight : 0;
      const maxScroll = Math.max(0, wrapHeight - vh);

      if (panelRef.current) {
        if (scrollY <= vh) {
          // Phase 1: Panel slides up from translateY(100vh) to translateY(0)
          panelRef.current.style.transform = `translateY(${vh - scrollY}px)`;
        } else {
          // Phase 2 & 3: Panel fixed at top
          panelRef.current.style.transform = 'translateY(0px)';
        }
      }

      if (innerRef.current) {
        if (scrollY <= vh) {
          innerRef.current.style.transform = 'translateY(0px)';
        } else if (scrollY <= vh + maxScroll) {
          // Phase 2: Inner wrapper translates up
          innerRef.current.style.transform = `translateY(${-(scrollY - vh)}px)`;
        } else {
          // Phase 3: Fixed at maxScroll
          innerRef.current.style.transform = `translateY(${-maxScroll}px)`;
        }
      }

      // 3. Outro Animations (scrollY > vh + maxScroll)
      const outroRange = vh - 100;
      const outroProgress =
        scrollY > vh + maxScroll
          ? Math.max(0, Math.min(1, (scrollY - (vh + maxScroll)) / outroRange))
          : 0;

      // Outro Overlay
      const outroOverlay = document.getElementById('outro-overlay');
      if (outroOverlay) {
        outroOverlay.style.opacity = `${outroProgress}`;
      }

      // Outro Product Info
      const outroInfo = document.getElementById('outro-info');
      if (outroInfo) {
        const offset = vw >= 1024 ? 166 : 132;
        outroInfo.style.transform = `translateY(${-outroProgress * offset}px)`;
      }

      // Outro Buy Button ("view")
      const outroBuy = document.getElementById('outro-buy');
      if (outroBuy) {
        outroBuy.style.transform = `scale(${outroProgress})`;
      }

      // Outro Footer
      const outroFooter = document.getElementById('outro-footer');
      if (outroFooter) {
        outroFooter.style.opacity = `${outroProgress}`;
      }

      // 4. Card Scaling Logic
      const cards = document.querySelectorAll<HTMLElement>('.bp-card');
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        if (rect.bottom <= 0 || rect.top >= vh) {
          card.style.transform = 'scale(0)';
        } else {
          const enter = Math.min(1, (vh - rect.top) / (vh * 0.6));
          const exit = Math.min(1, rect.bottom / (vh * 0.4));
          const scale = Math.max(0, Math.min(enter, exit));
          card.style.transform = `scale(${scale})`;
        }
      });

      // 5. Circle Symbol Randomizer on Scroll (Throttled to 80ms)
      const now = Date.now();
      if (now - lastSymbolTimeRef.current > 80) {
        lastSymbolTimeRef.current = now;
        const randomSym = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
        setCircleSymbol(randomSym);
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div
      id="scroll-spacer"
      style={{ height: spacerHeight }}
      className="relative select-none bg-white lg:cursor-none"
    >
      {/* Custom Cursor (Desktop Only) */}
      <CustomCursor />

      {/* Hero UI Overlays */}
      <Logo />
      <HeaderNav />
      <Caption />
      <ProductInfo symbol={circleSymbol} />
      <OutroBuyButton />
      <OutroFooter />

      {/* Outro White Overlay */}
      <div
        id="outro-overlay"
        style={{ opacity: 0 }}
        className="fixed inset-0 pointer-events-none z-12 bg-white transition-none"
      />

      {/* SECTION 1: Video Background Container */}
      <div
        id="main-canvas"
        style={{ opacity: videosLoaded ? 1 : 0 }}
        className="fixed z-0 pointer-events-none overflow-hidden transition-opacity duration-300 inset-0 w-full h-full lg:inset-0 lg:w-full lg:h-full top-[220px] h-[calc(100vh-220px)] lg:top-0 lg:h-full"
      >
        <video
          ref={leftVideoRef}
          src={LEFT_VIDEO_URL}
          muted
          playsInline
          preload="auto"
          onCanPlayThrough={() => {
            leftLoadedRef.current = true;
            checkLoaded();
          }}
          className="absolute inset-0 w-full h-full object-cover hidden"
        />
        <video
          ref={rightVideoRef}
          src={RIGHT_VIDEO_URL}
          muted
          playsInline
          preload="auto"
          onCanPlayThrough={() => {
            rightLoadedRef.current = true;
            checkLoaded();
          }}
          className="absolute inset-0 w-full h-full object-cover block"
        />
      </div>

      {/* SECTION 2: Black Panel (Gallery Phase) */}
      <div
        ref={panelRef}
        id="black-panel"
        style={{ transform: 'translateY(100vh)' }}
        className="fixed inset-0 z-10 bg-black overflow-hidden"
      >
        <GalleryGrid cols={cols} innerRef={innerRef} />
      </div>
    </div>
  );
}
