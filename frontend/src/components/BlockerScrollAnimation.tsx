"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const DESKTOP_TOTAL_FRAMES = 193;
const MOBILE_TOTAL_FRAMES = 191;
const BG_COLOR = "#0A0C0C";

export default function BlockerScrollAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef<number>(1);
  const targetProgressRef = useRef<number>(0);
  const currentProgressRef = useRef<number>(0);
  const animFrameIdRef = useRef<number | null>(null);

  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Detect mobile on mount & resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const totalFrames = isMobile ? MOBILE_TOTAL_FRAMES : DESKTOP_TOTAL_FRAMES;

  const getFrameUrl = useCallback(
    (index: number) => {
      const padded = String(index).padStart(4, "0");
      const folder = isMobile ? "mobile" : "desktop";
      return `/blocker-animation/${folder}/frame_${padded}.webp`;
    },
    [isMobile]
  );

  // Canvas drawing routine
  const drawFrame = useCallback(
    (frameNumber: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d", { alpha: false });
      if (!ctx) return;

      let img = imagesRef.current[frameNumber];
      if (!img || !img.complete) {
        for (let offset = 1; offset < 25; offset++) {
          const before = imagesRef.current[Math.max(1, frameNumber - offset)];
          if (before && before.complete) {
            img = before;
            break;
          }
          const after = imagesRef.current[Math.min(totalFrames, frameNumber + offset)];
          if (after && after.complete) {
            img = after;
            break;
          }
        }
      }

      if (!img || !img.complete) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      const targetWidth = Math.round(rect.width * dpr);
      const targetHeight = Math.round(rect.height * dpr);

      if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
        canvas.width = targetWidth;
        canvas.height = targetHeight;
      }

      ctx.fillStyle = BG_COLOR;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (isMobile) {
        // Mobile: Vertical 960x1080 portrait frame fitted with safe padding
        const imgAspect = 960 / 1080;
        const topBuffer = 12 * dpr;
        const bottomBuffer = 16 * dpr;
        const usableHeight = canvas.height - topBuffer - bottomBuffer;
        const usableWidth = canvas.width - 20 * dpr;

        let renderH = usableHeight;
        let renderW = renderH * imgAspect;

        if (renderW > usableWidth) {
          renderW = usableWidth;
          renderH = renderW / imgAspect;
        }

        const offsetX = (canvas.width - renderW) / 2;
        const offsetY = topBuffer + (usableHeight - renderH) / 2;

        ctx.drawImage(img, offsetX, offsetY, renderW, renderH);
      } else {
        // Desktop: 1920x1080 horizontal frame with safe buffers for top navbar and bottom text
        const imgAspect = 1920 / 1080;
        const topBuffer = 72 * dpr;
        const bottomBuffer = 36 * dpr;
        const usableHeight = canvas.height - topBuffer - bottomBuffer;
        const usableWidth = canvas.width - 48 * dpr;

        let renderH = usableHeight;
        let renderW = renderH * imgAspect;

        if (renderW > usableWidth) {
          renderW = usableWidth;
          renderH = renderW / imgAspect;
        }

        const offsetX = (canvas.width - renderW) / 2;
        const offsetY = topBuffer + (usableHeight - renderH) / 2;

        ctx.drawImage(img, offsetX, offsetY, renderW, renderH);
      }
    },
    [isMobile, totalFrames]
  );

  // Preload images
  useEffect(() => {
    let isCancelled = false;
    const images: HTMLImageElement[] = new Array(totalFrames + 1);
    imagesRef.current = images;

    // Load first frame immediately
    const firstImg = new Image();
    firstImg.src = getFrameUrl(1);
    firstImg.onload = () => {
      if (isCancelled) return;
      images[1] = firstImg;
      drawFrame(1);
    };

    // Load remaining frames in batches
    const batchSize = 12;
    let nextIndex = 2;

    function loadNextBatch() {
      if (isCancelled || nextIndex > totalFrames) return;

      const limit = Math.min(nextIndex + batchSize, totalFrames + 1);
      for (let i = nextIndex; i < limit; i++) {
        const img = new Image();
        img.src = getFrameUrl(i);
        const onDone = () => {
          if (isCancelled) return;
          images[i] = img;
        };
        img.onload = onDone;
        img.onerror = onDone;
      }
      nextIndex = limit;

      if (nextIndex <= totalFrames) {
        if ("requestIdleCallback" in window) {
          (window as any).requestIdleCallback(loadNextBatch);
        } else {
          setTimeout(loadNextBatch, 15);
        }
      }
    }

    loadNextBatch();

    return () => {
      isCancelled = true;
    };
  }, [getFrameUrl, totalFrames, drawFrame]);

  // Smooth Lerp Loop & Sticky Scroll Tracking
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const containerRect = container.getBoundingClientRect();
      const windowH = window.innerHeight;

      const totalScrollable = containerRect.height - windowH;
      let raw = 0;

      if (!isMobile) {
        if (totalScrollable > 0) {
          raw = -containerRect.top / totalScrollable;
        }
      } else {
        const stickyTop = 64; // top-16 on mobile
        if (totalScrollable > 0) {
          raw = (stickyTop - containerRect.top) / totalScrollable;
        }
      }

      targetProgressRef.current = Math.max(0, Math.min(1, raw));
    };

    const loop = () => {
      const target = targetProgressRef.current;
      const current = currentProgressRef.current;
      const diff = target - current;

      if (Math.abs(diff) > 0.0001) {
        // Proportional smooth damping (GSAP style):
        // Responsive enough that fast scrolling NEVER skips or cuts off the animation,
        // while providing buttery smooth inertia on every scroll tick.
        currentProgressRef.current += diff * 0.16;

        // Map animation to complete at 78% of the scroll track:
        // This gives a 22% buffer where the fully resolved state is guaranteed to be reached
        // and held, so even on rapid scrolling it CANNOT be skipped or cut off!
        const animProgress = Math.min(1, currentProgressRef.current / 0.78);
        const targetFrame = Math.min(
          totalFrames,
          Math.max(1, Math.round(animProgress * (totalFrames - 1)) + 1)
        );

        if (targetFrame !== currentFrameRef.current) {
          currentFrameRef.current = targetFrame;
          drawFrame(targetFrame);
        }
      }

      animFrameIdRef.current = requestAnimationFrame(loop);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();

    animFrameIdRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [drawFrame, isMobile, totalFrames]);

  return (
    <section
      id="demo-animation"
      ref={containerRef}
      className="relative w-full bg-[#FAF7E8] md:bg-[#0A0C0C]"
      style={{ minHeight: isMobile ? "380vh" : "450vh" }}
      aria-label="Interactive Booking Flow demonstration"
    >
      {/* 
        Sticky Viewport:
        - Mobile: Sticks at top-16 below header. Above the arched curve, the previous section remains visible.
        - Desktop: Full bleed screen.
      */}
      <div
        ref={stickyRef}
        className="sticky top-16 sm:top-20 md:top-0 w-full h-[calc(100vh-4rem)] md:h-screen flex flex-col items-center bg-[#FAF7E8] md:bg-[#0A0C0C] overflow-hidden"
      >
        {/* Parabolic Arched Top Curve matching user's red line */}
        <div className="w-full overflow-hidden leading-none md:hidden shrink-0 select-none -mb-[1px]">
          <svg
            viewBox="0 0 1000 90"
            preserveAspectRatio="none"
            className="w-full h-9 sm:h-12 fill-[#0A0C0C] block"
            aria-hidden="true"
          >
            <path d="M0,90 Q500,0 1000,90 L1000,90 L0,90 Z" />
          </svg>
        </div>

        {/* Dark Container for Canvas Animation */}
        <div className="relative w-full flex-1 bg-[#0A0C0C] flex items-center justify-center overflow-hidden">
          <canvas
            ref={canvasRef}
            className="w-full h-full block"
          />
        </div>
      </div>
    </section>
  );
}
