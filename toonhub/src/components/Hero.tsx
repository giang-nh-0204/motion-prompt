import { useEffect, useState, type CSSProperties } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const IMAGES = [
  { src: 'https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/1.02464a56.png', bg: '#F4845F', panel: '#F79B7F' },
  { src: 'https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/2.b977faab.png', bg: '#6BBF7A', panel: '#85CC92' },
  { src: 'https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/3.4df853b4.png', bg: '#E882B4', panel: '#ED9DC4' },
  { src: 'https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/4.4457fbce.png', bg: '#6EB5FF', panel: '#8DC4FF' },
];

const EASE = 'cubic-bezier(0.4, 0, 0.2, 1)';
const DURATION = 650;

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='grain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23grain)' opacity='0.08'/%3E%3C/svg%3E\")";

type Role = 'center' | 'left' | 'right' | 'back';

function roleStyle(role: Role, isMobile: boolean): CSSProperties {
  switch (role) {
    case 'center':
      return {
        left: '50%',
        bottom: isMobile ? '22%' : 0,
        height: isMobile ? '60%' : '92%',
        transform: `translateX(-50%) scale(${isMobile ? 1.25 : 1.68})`,
        filter: 'blur(0px)',
        opacity: 1,
        zIndex: 20,
      };
    case 'left':
      return {
        left: isMobile ? '20%' : '30%',
        bottom: isMobile ? '32%' : '12%',
        height: isMobile ? '16%' : '28%',
        transform: 'translateX(-50%) scale(1)',
        filter: 'blur(2px)',
        opacity: 0.85,
        zIndex: 10,
      };
    case 'right':
      return {
        left: isMobile ? '80%' : '70%',
        bottom: isMobile ? '32%' : '12%',
        height: isMobile ? '16%' : '28%',
        transform: 'translateX(-50%) scale(1)',
        filter: 'blur(2px)',
        opacity: 0.85,
        zIndex: 10,
      };
    case 'back':
      return {
        left: '50%',
        bottom: isMobile ? '32%' : '12%',
        height: isMobile ? '13%' : '22%',
        transform: 'translateX(-50%) scale(1)',
        filter: 'blur(4px)',
        opacity: 1,
        zIndex: 5,
      };
  }
}

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 640);
  const [hovered, setHovered] = useState<'prev' | 'next' | null>(null);
  const [linkHovered, setLinkHovered] = useState(false);

  useEffect(() => {
    IMAGES.forEach((item) => {
      const img = new Image();
      img.src = item.src;
    });
  }, []);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const navigate = (direction: 'next' | 'prev') => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (direction === 'next' ? (prev + 1) % 4 : (prev + 3) % 4));
    setTimeout(() => setIsAnimating(false), DURATION);
  };

  const center = activeIndex;
  const left = (activeIndex + 3) % 4;
  const right = (activeIndex + 1) % 4;
  const back = (activeIndex + 2) % 4;

  const roles: Record<number, Role> = {
    [center]: 'center',
    [left]: 'left',
    [right]: 'right',
    [back]: 'back',
  };

  const navButtonStyle = (key: 'prev' | 'next'): CSSProperties => ({
    border: '2px solid #ffffff',
    color: '#ffffff',
    backgroundColor: hovered === key ? 'rgba(255, 255, 255, 0.12)' : 'transparent',
    transform: hovered === key ? 'scale(1.08)' : 'scale(1)',
    transition: 'transform 150ms, background-color 150ms',
  });

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        backgroundColor: IMAGES[activeIndex].bg,
        transition: `background-color ${DURATION}ms ${EASE}`,
        fontFamily: 'Inter, sans-serif',
      }}
    >
      <div className="relative w-full" style={{ height: '100vh', overflow: 'hidden' }}>
        {/* Grain */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 50,
            backgroundImage: GRAIN,
            backgroundRepeat: 'repeat',
            backgroundSize: '200px 200px',
            opacity: 0.4,
          }}
        />

        {/* Ghost display text */}
        <div
          className="absolute inset-x-0 flex items-center justify-center pointer-events-none select-none"
          style={{ zIndex: 2, top: '18%' }}
        >
          <span
            style={{
              fontFamily: 'Anton, sans-serif',
              fontSize: 'clamp(90px, 28vw, 380px)',
              fontWeight: 900,
              color: '#ffffff',
              opacity: 1,
              lineHeight: 1,
              textTransform: 'uppercase',
              letterSpacing: '-0.02em',
              whiteSpace: 'nowrap',
            }}
          >
            3D Shape
          </span>
        </div>

        {/* Brand */}
        <div
          className="absolute top-6 left-4 sm:left-8 text-xs font-semibold uppercase"
          style={{ zIndex: 60, color: '#ffffff', opacity: 0.9, letterSpacing: '0.18em' }}
        >
          TOONHUB
        </div>

        {/* Carousel */}
        <div className="absolute inset-0" style={{ zIndex: 3 }}>
          {IMAGES.map((item, index) => (
            <div
              key={item.src}
              style={{
                position: 'absolute',
                aspectRatio: '0.6 / 1',
                ...roleStyle(roles[index], isMobile),
                transition: `transform ${DURATION}ms ${EASE}, filter ${DURATION}ms ${EASE}, opacity ${DURATION}ms ${EASE}, left ${DURATION}ms ${EASE}`,
                willChange: 'transform, filter, opacity',
              }}
            >
              <img
                src={item.src}
                alt=""
                draggable={false}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  objectPosition: 'bottom center',
                }}
              />
            </div>
          ))}
        </div>

        {/* Bottom-left copy + nav */}
        <div
          className="absolute bottom-6 left-4 sm:bottom-20 sm:left-24"
          style={{ zIndex: 60, maxWidth: 320 }}
        >
          <p
            className="font-bold uppercase tracking-widest mb-2 sm:mb-3 text-base sm:text-[22px]"
            style={{ color: '#ffffff', opacity: 0.95, letterSpacing: '0.02em' }}
          >
            TOONHUB FIGURINES
          </p>
          <p
            className="hidden sm:block text-xs sm:text-sm mb-4 sm:mb-5"
            style={{ color: '#ffffff', opacity: 0.85, lineHeight: 1.6 }}
          >
            The artwork is stunning, shipped fully prepared. The finish is a vision, the 3D craft is
            flawless. Many thanks! Wishing you the win. Order now.
          </p>
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              type="button"
              aria-label="Previous"
              onClick={() => navigate('prev')}
              onMouseEnter={() => setHovered('prev')}
              onMouseLeave={() => setHovered(null)}
              className="w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center"
              style={navButtonStyle('prev')}
            >
              <ArrowLeft size={26} strokeWidth={2.25} />
            </button>
            <button
              type="button"
              aria-label="Next"
              onClick={() => navigate('next')}
              onMouseEnter={() => setHovered('next')}
              onMouseLeave={() => setHovered(null)}
              className="w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center"
              style={navButtonStyle('next')}
            >
              <ArrowRight size={26} strokeWidth={2.25} />
            </button>
          </div>
        </div>

        {/* Bottom-right link */}
        <div className="absolute bottom-6 right-4 sm:bottom-20 sm:right-10" style={{ zIndex: 60 }}>
          <a
            href="#"
            className="flex items-center"
            onMouseEnter={() => setLinkHovered(true)}
            onMouseLeave={() => setLinkHovered(false)}
            style={{
              fontFamily: 'Anton, sans-serif',
              fontSize: 'clamp(20px, 4vw, 56px)',
              fontWeight: 400,
              color: '#ffffff',
              opacity: linkHovered ? 1 : 0.95,
              transition: 'opacity 200ms',
              letterSpacing: '-0.02em',
              lineHeight: 1,
              textTransform: 'uppercase',
              textDecoration: 'none',
            }}
          >
            Discover it
            <ArrowRight className="w-5 h-5 sm:w-8 sm:h-8" strokeWidth={2.25} />
          </a>
        </div>
      </div>
    </div>
  );
}
