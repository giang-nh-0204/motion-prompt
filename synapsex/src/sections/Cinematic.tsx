import { useRef } from 'react';
import { motion, useMotionTemplate, useScroll, useSpring, useTransform } from 'framer-motion';
import AutoplayVideo from '../components/AutoplayVideo';

const VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_092455_089c54f8-3b03-4966-9df1-e9746063d0ef.mp4';

export default function Cinematic() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const smooth = useSpring(scrollYProgress, { stiffness: 15, damping: 32, mass: 1.8 });
  const yScaleValue = useTransform(smooth, [0, 1], [60, -120]);
  const opacity = useTransform(smooth, [0.3, 0.5], [0, 1]);
  const transform = useMotionTemplate`rotateX(24deg) translateY(${yScaleValue}px) translateZ(15px)`;

  return (
    <section ref={sectionRef} className="relative h-screen overflow-hidden" style={{ height: '100dvh' }}>
      <AutoplayVideo src={VIDEO} className="absolute inset-0 h-full w-full object-cover" />
      <div
        className="absolute top-0 inset-x-0 z-10 h-[180px] pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, #010103, transparent)' }}
      />
      <div className="relative z-20 flex h-full items-center justify-center">
        <div className="max-w-5xl" style={{ perspective: '400px' }}>
          <motion.p
            style={{ transform, opacity }}
            className="font-sans font-normal text-[22px] sm:text-[30px] md:text-[36px] lg:text-[42px] text-white leading-[1.35] tracking-[-0.02em] select-none px-6 sm:px-12 text-center"
          >
            A neural-AI interface built on the architecture of the human nervous system. SynapseX translates synaptic
            activity into computational intelligence. Every signal becomes measurable, structured, and visible. It
            continuously reconstructs internal state as a dynamic neural map. Biological noise is filtered into
            actionable cognitive patterns.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
