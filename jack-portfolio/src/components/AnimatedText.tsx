import { useRef, type CSSProperties } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';

type AnimatedTextProps = {
  text: string;
  className?: string;
  style?: CSSProperties;
};

export default function AnimatedText({ text, className, style }: AnimatedTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.2'] });
  const chars = Array.from(text);

  return (
    <p ref={ref} className={className} style={style}>
      {chars.map((char, i) => (
        <Char
          key={i}
          char={char}
          progress={scrollYProgress}
          range={[i / chars.length, (i + 1) / chars.length]}
        />
      ))}
    </p>
  );
}

function Char({
  char,
  progress,
  range,
}: {
  char: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.2, 1]);
  return (
    <span className="relative">
      {/* invisible placeholder keeps layout and line-breaking identical to plain text */}
      <span className="invisible">{char}</span>
      <motion.span className="absolute left-0 top-0" style={{ opacity }}>
        {char}
      </motion.span>
    </span>
  );
}
