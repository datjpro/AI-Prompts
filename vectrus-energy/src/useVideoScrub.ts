import { useEffect, useRef, useState, useCallback } from 'react';
import MP4Box, { MP4File, MP4Sample } from 'mp4box';

interface FrameEntry {
  ts: number; // in microseconds
  blob: Blob;
}

interface UseVideoScrubOptions {
  videoSrc: string;
  containerRef: React.RefObject<HTMLElement>;
  videoRef: React.RefObject<HTMLVideoElement>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
}

const LERP_TAU = 8;
const SNAP = 0.002;
const LRU_MAX = 24;
const LEAD = 24;
const WATCHDOG = 60000;

export function useVideoScrub({
  videoSrc,
  containerRef,
  videoRef,
  canvasRef,
}: UseVideoScrubOptions) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [canvasLive, setCanvasLive] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [isBuilding, setIsBuilding] = useState(false);

  // References for scrub loop
  const bankRef = useRef<FrameEntry[]>([]);
  const lruRef = useRef<Map<number, ImageBitmap>>(new Map());
  const pendingBitmapRef = useRef<Set<number>>(new Set());
  const currentTimeRef = useRef<number>(0);
  const targetTimeRef = useRef<number>(0);
  const durationRef = useRef<number>(0);
  const isReadyRef = useRef<boolean>(false);
  const isRevertedRef = useRef<boolean>(false);
  const hasPaintedRef = useRef<boolean>(false);

  // Binary search for closest timestamp
  const findNearestIndex = useCallback((targetTsMicro: number) => {
    const bank = bankRef.current;
    if (bank.length === 0) return -1;
    if (bank.length === 1) return 0;

    let low = 0;
    let high = bank.length - 1;

    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      if (bank[mid].ts === targetTsMicro) {
        return mid;
      }
      if (bank[mid].ts < targetTsMicro) {
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }

    if (low >= bank.length) return bank.length - 1;
    if (high < 0) return 0;

    return Math.abs(bank[low].ts - targetTsMicro) < Math.abs(bank[high].ts - targetTsMicro)
      ? low
      : high;
  }, []);

  // Warm up nearby frames into LRU cache
  const warmLRU = useCallback((targetIndex: number) => {
    const bank = bankRef.current;
    const lru = lruRef.current;
    const pending = pendingBitmapRef.current;
    if (bank.length === 0) return;

    const start = Math.max(0, targetIndex - 1);
    const end = Math.min(bank.length - 1, targetIndex + 2);

    for (let i = start; i <= end; i++) {
      if (!lru.has(i) && !pending.has(i)) {
        pending.add(i);
        createImageBitmap(bank[i].blob)
          .then((bmp) => {
            pending.delete(i);
            lru.set(i, bmp);

            // Evict oldest if exceeding LRU_MAX
            if (lru.size > LRU_MAX) {
              const keys = Array.from(lru.keys());
              // Evict the key farthest from targetIndex
              let farthestKey = keys[0];
              let maxDist = Math.abs(keys[0] - targetIndex);
              for (const k of keys) {
                const dist = Math.abs(k - targetIndex);
                if (dist > maxDist) {
                  maxDist = dist;
                  farthestKey = k;
                }
              }
              const oldBmp = lru.get(farthestKey);
              if (oldBmp) oldBmp.close();
              lru.delete(farthestKey);
            }
          })
          .catch(() => {
            pending.delete(i);
          });
      }
    }
  }, []);

  // Frame bank builder using WebCodecs + MP4Box
  useEffect(() => {
    let active = true;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion || typeof window.VideoDecoder === 'undefined') {
      return;
    }

    const buildBank = async () => {
      setIsBuilding(true);

      const watchdogTimer = setTimeout(() => {
        if (!isReadyRef.current && active) {
          console.warn('Video scrub watchdog triggered, reverting to video seeking fallback');
          isRevertedRef.current = true;
          setCanvasLive(false);
        }
      }, WATCHDOG);

      try {
        const response = await fetch(videoSrc, { mode: 'cors' });
        if (!response.ok) throw new Error(`Fetch failed with status ${response.status}`);
        const buffer = await response.arrayBuffer();
        if (!active) return;

        const mp4boxfile: MP4File = MP4Box.createFile();

        let videoDecoder: VideoDecoder | null = null;
        const decodedFrames: FrameEntry[] = [];
        let totalSamples = 0;
        let processedSamples = 0;
        let resolveExtraction: (() => void) | null = null;
        const extractionPromise = new Promise<void>((resolve) => {
          resolveExtraction = resolve;
        });

        const initDecoder = (codec: string, description?: Uint8Array, hardwarePreference: HardwareAcceleration = 'no-preference') => {
          videoDecoder = new VideoDecoder({
            output: async (frame: VideoFrame) => {
              const ts = frame.timestamp;
              const width = frame.displayWidth;
              const height = frame.displayHeight;

              try {
                let blob: Blob | null = null;
                if (typeof OffscreenCanvas !== 'undefined') {
                  const offscreen = new OffscreenCanvas(width, height);
                  const ctx = offscreen.getContext('2d');
                  if (ctx) {
                    ctx.drawImage(frame, 0, 0);
                    blob = await offscreen.convertToBlob({ type: 'image/webp', quality: 0.82 });
                  }
                } else {
                  const canvas = document.createElement('canvas');
                  canvas.width = width;
                  canvas.height = height;
                  const ctx = canvas.getContext('2d');
                  if (ctx) {
                    ctx.drawImage(frame, 0, 0);
                    blob = await new Promise<Blob | null>((res) =>
                      canvas.toBlob(res, 'image/webp', 0.82)
                    );
                  }
                }

                if (blob && active) {
                  decodedFrames.push({ ts, blob });
                }
              } catch (err) {
                console.error('Frame conversion error', err);
              } finally {
                frame.close();
                processedSamples++;
                if (processedSamples >= totalSamples && resolveExtraction) {
                  resolveExtraction();
                }
              }
            },
            error: (e: any) => {
              console.error('VideoDecoder error:', e);
              if (hardwarePreference !== 'prefer-software') {
                console.log('Retrying with prefer-software');
                initDecoder(codec, description, 'prefer-software');
              }
            },
          });

          videoDecoder.configure({
            codec,
            description,
            hardwareAcceleration: hardwarePreference,
          });
        };

        mp4boxfile.onReady = (info) => {
          const videoTrack = info.videoTracks[0];
          if (!videoTrack) {
            throw new Error('No video track found');
          }

          if (videoTrack.duration && videoTrack.timescale) {
            const trackDur = videoTrack.duration / videoTrack.timescale;
            if (trackDur > 0) {
              durationRef.current = trackDur;
            }
          }

          totalSamples = videoTrack.nb_samples;

          // Helper to extract avcC/hvcC/vpcC/av1C extradata
          let description: Uint8Array | undefined;
          try {
            const trak = (mp4boxfile as any).getTrackById(videoTrack.id);
            for (const entry of trak.mdia.minf.stbl.stsd.entries) {
              const box = entry.avcC || entry.hvcC || entry.vpcC || entry.av1C;
              if (box) {
                const stream = new (MP4Box as any).DataStream(undefined, 0, (MP4Box as any).DataStream.BIG_ENDIAN);
                box.write(stream);
                description = new Uint8Array(stream.buffer, 8);
                break;
              }
            }
          } catch (e) {
            console.warn('Could not extract decoder description buffer', e);
          }

          initDecoder(videoTrack.codec, description);

          mp4boxfile.setExtractionOptions(videoTrack.id, null, { nbSamples: 1000 });
          mp4boxfile.start();
        };

        mp4boxfile.onSamples = async (_id, _user, samples: MP4Sample[]) => {
          for (const sample of samples) {
            if (!videoDecoder || videoDecoder.state !== 'configured') break;

            // Flow control: throttle if decode leads blob encoding by > LEAD
            while (videoDecoder.decodeQueueSize > LEAD && active) {
              await new Promise((r) => setTimeout(r, 10));
            }

            const chunk = new EncodedVideoChunk({
              type: sample.is_sync ? 'key' : 'delta',
              timestamp: (1e6 * sample.cts) / sample.timescale,
              duration: (1e6 * sample.duration) / sample.timescale,
              data: sample.data,
            });

            videoDecoder.decode(chunk);
          }
        };

        const fileBuffer = buffer as ArrayBuffer & { fileStart?: number };
        fileBuffer.fileStart = 0;
        mp4boxfile.appendBuffer(fileBuffer);
        mp4boxfile.flush();

        await extractionPromise;
        if (videoDecoder && (videoDecoder as VideoDecoder).state === 'configured') {
          await (videoDecoder as VideoDecoder).flush();
        }

        if (active && decodedFrames.length > 0) {
          decodedFrames.sort((a, b) => a.ts - b.ts);
          bankRef.current = decodedFrames;
          isReadyRef.current = true;
          setIsReady(true);
          setIsBuilding(false);
          clearTimeout(watchdogTimer);
        }
      } catch (err) {
        console.warn('WebCodecs frame extraction failed or skipped, falling back to video element seeking:', err);
        setIsBuilding(false);
      }
    };

    const handleWindowLoad = () => {
      buildBank();
    };

    if (document.readyState === 'complete') {
      buildBank();
    } else {
      window.addEventListener('load', handleWindowLoad);
    }

    return () => {
      active = false;
      window.removeEventListener('load', handleWindowLoad);
      // Clean up LRU bitmaps
      lruRef.current.forEach((bmp) => bmp.close());
      lruRef.current.clear();
    };
  }, [videoSrc]);

  // Main rAF scrub and render loop
  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const container = containerRef.current;
    const ctx = canvas?.getContext('2d');

    const handleLoadedMetadata = () => {
      if (video && video.duration && !durationRef.current) {
        durationRef.current = video.duration;
      }
    };

    if (video) {
      if (video.duration) {
        durationRef.current = video.duration;
      }
      video.addEventListener('loadedmetadata', handleLoadedMetadata);
    }

    const loop = (now: number) => {
      const deltaSeconds = Math.max(0.001, (now - lastTime) / 1000);
      lastTime = now;
      const dt = Math.min(0.1, deltaSeconds);

      // Compute scroll progress p
      let p = 0;
      if (container) {
        const totalScroll = container.offsetHeight - window.innerHeight;
        if (totalScroll > 0) {
          p = Math.min(1, Math.max(0, window.scrollY / totalScroll));
        }
      }
      setScrollProgress(p);

      const dur = durationRef.current;
      if (dur > 0) {
        const target = p * dur;
        targetTimeRef.current = target;

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) {
          currentTimeRef.current = target;
        } else {
          currentTimeRef.current += (target - currentTimeRef.current) * (1 - Math.exp(-dt * LERP_TAU));
          if (Math.abs(target - currentTimeRef.current) < SNAP) {
            currentTimeRef.current = target;
          }
        }

        const currentSec = currentTimeRef.current;

        // Draw with Frame bank if ready and not reverted
        if (isReadyRef.current && !isRevertedRef.current && bankRef.current.length > 0 && canvas && ctx) {
          const targetTsMicro = currentSec * 1e6;
          const nearestIdx = findNearestIndex(targetTsMicro);

          if (nearestIdx >= 0 && nearestIdx < bankRef.current.length) {
            warmLRU(nearestIdx);

            const cachedBmp = lruRef.current.get(nearestIdx);
            if (cachedBmp) {
              ctx.drawImage(cachedBmp, 0, 0, canvas.width, canvas.height);
              if (!hasPaintedRef.current) {
                hasPaintedRef.current = true;
                setCanvasLive(true);
              }
            } else {
              // Immediately load bitmap if missing
              createImageBitmap(bankRef.current[nearestIdx].blob)
                .then((bmp) => {
                  lruRef.current.set(nearestIdx, bmp);
                  ctx.drawImage(bmp, 0, 0, canvas.width, canvas.height);
                  if (!hasPaintedRef.current) {
                    hasPaintedRef.current = true;
                    setCanvasLive(true);
                  }
                })
                .catch(() => {});
            }
          }
        } else if (video) {
          // Fallback to video element currentTime seeking
          if (!video.seeking && Math.abs(video.currentTime - currentSec) > 0.01) {
            video.currentTime = currentSec;
          }
        }
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      if (video) {
        video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      }
    };
  }, [canvasRef, containerRef, findNearestIndex, videoRef, warmLRU]);

  return {
    scrollProgress,
    canvasLive,
    isReady,
    isBuilding,
  };
}
