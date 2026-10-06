import { useEffect, useRef } from 'react';

type AutoplayVideoProps = {
  src: string;
  className?: string;
};

/**
 * Muted, looping background video that plays by itself — but only fetches once
 * its section is within half a viewport of the screen, and pauses when scrolled away.
 * Four 1080p clips (~46 MB) set to plain `autoplay` would all download at once and
 * starve the mouse-scrubbed hero clip of bandwidth.
 */
export default function AutoplayVideo({ src, className = '' }: AutoplayVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    video.muted = true;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!video.getAttribute('src')) {
            video.preload = 'auto';
            video.src = src;
          }
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      // Half a viewport of look-ahead: the next section starts buffering while you read
      // this one, but the clip two sections down stays off the network.
      { rootMargin: '50% 0px' },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [src]);

  return <video ref={ref} className={className} muted loop playsInline preload="none" aria-hidden="true" />;
}
