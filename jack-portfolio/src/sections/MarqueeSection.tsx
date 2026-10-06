import { useEffect, useRef } from 'react';

const IMAGES = [
  'https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif',
  'https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif',
  'https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif',
  'https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif',
  'https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif',
  'https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif',
  'https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif',
  'https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif',
  'https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif',
  'https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif',
  'https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif',
  'https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif',
  'https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif',
  'https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif',
  'https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif',
  'https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif',
  'https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif',
  'https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif',
  'https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif',
  'https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif',
  // hero-celestia-preview-0yO3jXO8.gif is listed in the brief but returns 404;
  // a tile that fails while on screen would yank the whole strip by one tile width.
];

const ROW_1 = [...IMAGES.slice(0, 11), ...IMAGES.slice(0, 11), ...IMAGES.slice(0, 11)];
const ROW_2 = [...IMAGES.slice(11), ...IMAGES.slice(11), ...IMAGES.slice(11)];

function Tile({ src }: { src: string }) {
  return (
    <img
      src={src}
      alt=""
      loading="lazy"
      decoding="async"
      className="w-[420px] h-[270px] flex-none rounded-2xl object-cover"
      // A dead source should leave no broken-image icon in the strip.
      onError={(event) => {
        event.currentTarget.style.display = 'none';
      }}
    />
  );
}

export default function MarqueeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let sectionTop = 0;
    let frame = 0;

    const measure = () => {
      const section = sectionRef.current;
      if (section) sectionTop = section.getBoundingClientRect().top + window.scrollY;
    };

    // Written straight to the DOM once per frame: storing the offset in React state
    // would re-render ~60 GIF tiles on every scroll event.
    const apply = () => {
      frame = 0;
      const offset = (window.scrollY - sectionTop + window.innerHeight) * 0.3;
      if (row1Ref.current) row1Ref.current.style.transform = `translateX(${offset - 200}px)`;
      if (row2Ref.current) row2Ref.current.style.transform = `translateX(${-(offset - 200)}px)`;
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(apply);
    };
    const onResize = () => {
      measure();
      onScroll();
    };

    measure();
    apply();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    window.addEventListener('load', onResize);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('load', onResize);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="flex flex-col gap-3 pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden"
      style={{ background: '#0C0C0C' }}
    >
      {/* Both strips are centred: the tripled row overhangs the viewport by several
          thousand pixels on each side, so neither the early negative offset
          (offset - 200 < 0) nor a long scroll can uncover an empty edge. */}
      <div className="flex justify-center">
        <div ref={row1Ref} className="flex gap-3 w-max" style={{ willChange: 'transform' }}>
          {ROW_1.map((src, i) => (
            <Tile key={`r1-${i}`} src={src} />
          ))}
        </div>
      </div>
      <div className="flex justify-center">
        <div ref={row2Ref} className="flex gap-3 w-max" style={{ willChange: 'transform' }}>
          {ROW_2.map((src, i) => (
            <Tile key={`r2-${i}`} src={src} />
          ))}
        </div>
      </div>
    </section>
  );
}
