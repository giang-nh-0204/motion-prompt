import { motion } from 'framer-motion';

const SPRING = { type: 'spring', stiffness: 300, damping: 20 } as const;

export default function SquashHamburger({ open, mobile = false }: { open: boolean; mobile?: boolean }) {
  const width = mobile ? 15 : 18;
  const height = mobile ? 10 : 12;
  const bar = mobile ? 1.2 : 1.5;
  const centre = (height - bar) / 2;

  return (
    <span className="relative block" style={{ width, height }}>
      <motion.span
        className="absolute left-0 w-full rounded-full bg-white"
        style={{ height: bar, top: 0 }}
        animate={open ? { y: centre, rotate: 45 } : { y: 0, rotate: 0 }}
        transition={SPRING}
      />
      <motion.span
        className="absolute left-0 w-full rounded-full bg-white"
        style={{ height: bar, top: centre }}
        animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
        transition={SPRING}
      />
      <motion.span
        className="absolute left-0 w-full rounded-full bg-white"
        style={{ height: bar, top: height - bar }}
        animate={open ? { y: -centre, rotate: -45 } : { y: 0, rotate: 0 }}
        transition={SPRING}
      />
    </span>
  );
}
