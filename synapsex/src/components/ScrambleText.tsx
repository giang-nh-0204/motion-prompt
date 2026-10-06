import { useEffect, useState } from 'react';
import { randomChar } from './scramble';

type ScrambleTextProps = {
  text: string;
  isHovered: boolean;
  className?: string;
};

/** Hover scramble: every character turns to noise, then resolves left to right. */
export default function ScrambleText({ text, isHovered, className }: ScrambleTextProps) {
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    if (!isHovered) {
      setDisplay(text);
      return;
    }
    let frame = 0;
    const interval = window.setInterval(() => {
      frame++;
      const revealed = Math.floor(frame / 4);
      let next = '';
      for (let i = 0; i < text.length; i++) {
        const ch = text[i];
        next += ch === ' ' ? ' ' : i < revealed ? ch : randomChar();
      }
      if (revealed >= text.length) {
        window.clearInterval(interval);
        next = text;
      }
      setDisplay(next);
    }, 25);
    return () => window.clearInterval(interval);
  }, [isHovered, text]);

  return <span className={className}>{display}</span>;
}
