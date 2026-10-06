import { useEffect, useState } from 'react';
import { randomChar } from './scramble';

type ScrambleInProps = {
  text: string;
  delay: number;
  triggered: boolean;
};

/** Entrance reveal: characters resolve left to right out of a short band of noise. */
export default function ScrambleIn({ text, delay, triggered }: ScrambleInProps) {
  const [output, setOutput] = useState<string | null>(null);

  useEffect(() => {
    if (!triggered) return;
    let interval: number | undefined;

    const timeout = window.setTimeout(() => {
      let cursor = 0;
      interval = window.setInterval(() => {
        cursor += 0.5;
        const revealed = Math.floor(cursor);
        let next = '';
        for (let i = 0; i < text.length; i++) {
          const ch = text[i];
          if (ch === ' ') next += ' ';
          else if (i < revealed) next += ch;
          else if (i < revealed + 3) next += randomChar();
        }
        if (revealed >= text.length) {
          window.clearInterval(interval);
          next = text;
        }
        setOutput(next);
      }, 25);
    }, delay);

    return () => {
      window.clearTimeout(timeout);
      if (interval) window.clearInterval(interval);
    };
  }, [triggered, text, delay]);

  if (!triggered || output === null) return <>&nbsp;</>;
  return <>{output}</>;
}
