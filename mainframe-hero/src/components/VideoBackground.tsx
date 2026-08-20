import React, { useEffect, useRef } from 'react';

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260530_042513_df96a13b-6155-4f6e-8b93-c9dee66fba08.mp4';
const SENSITIVITY = 0.8;

export const VideoBackground: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const prevXRef = useRef<number | null>(null);
  const targetTimeRef = useRef<number>(0);
  const isSeekingRef = useRef<boolean>(false);
  const pendingTargetTimeRef = useRef<number | null>(null);

  const performSeek = (time: number) => {
    const video = videoRef.current;
    if (!video || !video.duration) return;

    const clampedTime = Math.max(0, Math.min(time, video.duration));
    targetTimeRef.current = clampedTime;

    if (isSeekingRef.current) {
      pendingTargetTimeRef.current = clampedTime;
    } else {
      isSeekingRef.current = true;
      video.currentTime = clampedTime;
    }
  };

  const handleSeeked = () => {
    const video = videoRef.current;
    if (!video) return;

    if (pendingTargetTimeRef.current !== null) {
      const nextTime = pendingTargetTimeRef.current;
      pendingTargetTimeRef.current = null;
      video.currentTime = nextTime;
    } else {
      isSeekingRef.current = false;
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const video = videoRef.current;
      if (!video || !video.duration) return;

      const currentX = e.clientX;
      if (prevXRef.current === null) {
        prevXRef.current = currentX;
        targetTimeRef.current = video.currentTime || 0;
        return;
      }

      const delta = currentX - prevXRef.current;
      prevXRef.current = currentX;

      const timeOffset =
        (delta / window.innerWidth) * SENSITIVITY * video.duration;
      const newTarget = targetTimeRef.current + timeOffset;

      performSeek(newTarget);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      const video = videoRef.current;
      if (!video || !video.duration) return;

      const currentX = e.touches[0].clientX;
      if (prevXRef.current === null) {
        prevXRef.current = currentX;
        targetTimeRef.current = video.currentTime || 0;
        return;
      }

      const delta = currentX - prevXRef.current;
      prevXRef.current = currentX;

      const timeOffset =
        (delta / window.innerWidth) * SENSITIVITY * video.duration;
      const newTarget = targetTimeRef.current + timeOffset;

      performSeek(newTarget);
    };

    const handleTouchEnd = () => {
      prevXRef.current = null;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (video) {
      video.currentTime = 0.001;
      targetTimeRef.current = 0.001;
    }
  };

  return (
    <video
      ref={videoRef}
      src={VIDEO_URL}
      muted
      playsInline
      preload="auto"
      onLoadedMetadata={handleLoadedMetadata}
      onSeeked={handleSeeked}
      className="fixed inset-0 z-0 w-full h-full object-cover pointer-events-none"
      style={{
        objectPosition: '70% center',
      }}
    />
  );
};
