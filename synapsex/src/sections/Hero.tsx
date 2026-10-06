import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import ScrambleIn from '../components/ScrambleIn';

const HERO_VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_083515_290e5a10-0b95-41af-a5e2-32b6389baa4d.mp4';
const SENSITIVITY = 0.8;
const HEADING = 'text-white font-light leading-[0.95] tracking-[-0.03em] text-[clamp(40px,10vw,100px)]';

/** Scrubbed by horizontal mouse movement. The whole clip is pulled into memory first
    so a seek never waits on the network; `seeked` chains the seeks. */
function useScrubbedVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    let objectUrl: string | null = null;
    let cancelled = false;

    fetch(HERO_VIDEO, { mode: 'cors' })
      .then((res) => {
        if (!res.ok) throw new Error(String(res.status));
        return res.blob();
      })
      .then((blob) => {
        if (cancelled) return;
        objectUrl = URL.createObjectURL(blob);
        video.src = objectUrl;
      })
      .catch(() => {
        if (!cancelled) video.src = HERO_VIDEO;
      });

    let prevX: number | null = null;
    let targetTime = 0;
    let requestedTime = 0;
    let seeking = false;

    const seek = () => {
      seeking = true;
      requestedTime = targetTime;
      video.currentTime = targetTime;
    };
    const onSeeked = () => {
      seeking = false;
      if (targetTime !== requestedTime) seek();
    };
    const onMove = (event: MouseEvent) => {
      if (prevX === null) {
        prevX = event.clientX;
        return;
      }
      const delta = event.clientX - prevX;
      prevX = event.clientX;
      const duration = video.duration;
      if (!duration || Number.isNaN(duration)) return;
      targetTime = Math.min(
        Math.max(targetTime + (delta / window.innerWidth) * SENSITIVITY * duration, 0),
        duration,
      );
      if (!seeking) seek();
    };

    video.addEventListener('seeked', onSeeked);
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      cancelled = true;
      video.removeEventListener('seeked', onSeeked);
      window.removeEventListener('mousemove', onMove);
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, []);

  return videoRef;
}

export default function Hero({ entranceComplete }: { entranceComplete: boolean }) {
  const videoRef = useScrubbedVideo();

  return (
    <section id="top" className="relative h-screen overflow-hidden" style={{ height: '100dvh' }}>
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          opacity: 0.05,
        }}
      />

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none" aria-hidden="true">
        <span
          className="uppercase whitespace-nowrap leading-none"
          style={{
            fontFamily: '"Anton SC", sans-serif',
            fontSize: 'clamp(120px, 30vw, 521px)',
            letterSpacing: '-4px',
            opacity: 0.1,
            transform: 'translateY(50px)',
            background: 'radial-gradient(circle, rgba(142,127,148,0) 0%, #8E7F94 70%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Transcendence
        </span>
      </div>

      <motion.div
        className="relative z-10 flex h-full flex-col px-4 sm:px-6 md:px-8 pt-20 sm:pt-24 pb-8 sm:pb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: entranceComplete ? 1 : 0 }}
        transition={{ duration: 1 }}
      >
        <div className="flex-1" />
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-4">
            <h1 className={HEADING}>
              <ScrambleIn text="Brain" delay={200} triggered={entranceComplete} />
              <br />
              <ScrambleIn text="And Body" delay={500} triggered={entranceComplete} />
            </h1>
            <motion.p
              className="max-w-sm text-[13px] sm:text-[15px] text-white/60 leading-relaxed"
              initial={{ opacity: 0, y: 25 }}
              animate={entranceComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
              transition={{ duration: 0.9, ease: [0.215, 0.61, 0.355, 1], delay: 0.2 }}
            >
              Built at the intersection of neuroscience and artificial intelligence. SynapseX continuously maps neural
              pathways, cognitive load, and physiological states into a single adaptive intelligence layer.
            </motion.p>
          </div>
          <h1 className={`${HEADING} text-left md:text-right`}>
            <ScrambleIn text="One" delay={700} triggered={entranceComplete} />
            <br />
            <ScrambleIn text="Network" delay={1000} triggered={entranceComplete} />
          </h1>
        </div>
      </motion.div>
    </section>
  );
}
