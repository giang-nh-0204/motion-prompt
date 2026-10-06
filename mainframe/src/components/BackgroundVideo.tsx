import { useEffect, useRef } from 'react';

// Original: https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260530_042513_df96a13b-6155-4f6e-8b93-c9dee66fba08.mp4
// Re-encoded to 1920px with a keyframe on every frame (ffmpeg -g 1) so any seek decodes a single frame.
const VIDEO_SRC = '/videos/hero-scrub.mp4';

const SENSITIVITY = 0.8;
// Fraction of the remaining distance covered per animation frame; lower = smoother, laggier.
const EASE = 0.18;

export default function BackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let prevX: number | null = null;
    let targetTime = 0;
    let smoothTime = 0;
    let isSeeking = false;
    let rafId = 0;
    let objectUrl: string | null = null;
    let cancelled = false;

    // Load the whole file into memory so seeks never wait on network range requests.
    fetch(VIDEO_SRC)
      .then((res) => res.blob())
      .then((blob) => {
        if (cancelled) return;
        objectUrl = URL.createObjectURL(blob);
        video.src = objectUrl;
      })
      .catch(() => {
        if (!cancelled) video.src = VIDEO_SRC;
      });

    const seek = (time: number) => {
      isSeeking = true;
      video.currentTime = time;
    };

    // The next seek is only issued once the previous one has landed, preventing seek-flooding.
    const onSeeked = () => {
      isSeeking = false;
    };

    const tick = () => {
      const duration = video.duration;
      if (duration && !Number.isNaN(duration)) {
        smoothTime += (targetTime - smoothTime) * EASE;
        const frameGap = 1 / 48; // half a frame at 24fps
        if (!isSeeking && Math.abs(smoothTime - video.currentTime) > frameGap) {
          seek(smoothTime);
        }
      }
      rafId = requestAnimationFrame(tick);
    };

    const onMouseMove = (e: MouseEvent) => {
      const currentX = e.clientX;
      if (prevX === null) {
        prevX = currentX;
        return;
      }
      const delta = currentX - prevX;
      prevX = currentX;

      const duration = video.duration;
      if (!duration || Number.isNaN(duration)) return;

      const offset = (delta / window.innerWidth) * SENSITIVITY * duration;
      targetTime = Math.min(Math.max(targetTime + offset, 0), duration);
    };

    video.addEventListener('seeked', onSeeked);
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
      video.removeEventListener('seeked', onSeeked);
      window.removeEventListener('mousemove', onMouseMove);
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      muted
      playsInline
      preload="auto"
      className="fixed inset-0 z-0 h-full w-full object-cover"
      style={{ objectPosition: '70% center' }}
    />
  );
}
