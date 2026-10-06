import { useEffect, useRef, useState, type ReactNode } from 'react';

type MagnetProps = {
  children: ReactNode;
  padding?: number;
  strength?: number;
  activeTransition?: string;
  inactiveTransition?: string;
  wrapperClassName?: string;
  innerClassName?: string;
};

export default function Magnet({
  children,
  padding = 100,
  strength = 2,
  activeTransition = 'transform 0.3s ease-out',
  inactiveTransition = 'transform 0.6s ease-in-out',
  wrapperClassName = '',
  innerClassName = '',
}: MagnetProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (event: MouseEvent) => {
      const el = wrapperRef.current;
      if (!el) return;
      // Measure the untransformed wrapper so the pull never feeds back on itself.
      const rect = el.getBoundingClientRect();
      const dx = event.clientX - (rect.left + rect.width / 2);
      const dy = event.clientY - (rect.top + rect.height / 2);
      const inside =
        Math.abs(dx) < rect.width / 2 + padding && Math.abs(dy) < rect.height / 2 + padding;

      if (inside) {
        setActive(true);
        setOffset({ x: dx / strength, y: dy / strength });
      } else {
        setActive(false);
        setOffset((prev) => (prev.x === 0 && prev.y === 0 ? prev : { x: 0, y: 0 }));
      }
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [padding, strength]);

  return (
    <div ref={wrapperRef} className={wrapperClassName} style={{ position: 'relative' }}>
      <div
        className={innerClassName}
        style={{
          transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
          transition: active ? activeTransition : inactiveTransition,
          willChange: 'transform',
        }}
      >
        {children}
      </div>
    </div>
  );
}
