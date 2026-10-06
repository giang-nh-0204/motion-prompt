import { useMemo, type CSSProperties, type ElementType, type ReactNode } from 'react';
import { motion } from 'framer-motion';

type FadeInProps = {
  children?: ReactNode;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  id?: string;
};

export default function FadeIn({
  children,
  as = 'div',
  className,
  style,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  id,
}: FadeInProps) {
  // One motion component per element type, stable for the life of this instance.
  const Component = useMemo(() => motion.create(as as 'div'), [as]) as ElementType;

  return (
    <Component
      id={id}
      className={className}
      style={style}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '50px', amount: 0 }}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </Component>
  );
}
