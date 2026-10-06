import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import SynapseXLogo from './SynapseXLogo';
import SquashHamburger from './SquashHamburger';
import ScrambleText from './ScrambleText';

const PILL_SPRING = { type: 'spring', stiffness: 350, damping: 28 } as const;
const GLASS = 'rgba(255, 255, 255, 0.15)';

const LINKS = [
  { label: 'About', target: () => window.innerHeight },
  { label: 'Metrics', target: () => window.innerHeight * 2 },
];

function scrollToTarget(getTop: () => number) {
  window.scrollTo({ top: getTop(), behavior: 'smooth' });
}

function NavLink({ label, onClick, mobile }: { label: string; onClick: () => void; mobile?: boolean }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`${mobile ? 'text-[13px]' : 'text-[16px]'} font-normal text-white/85 hover:text-white transition-colors whitespace-nowrap`}
    >
      <ScrambleText text={label} isHovered={hovered} />
    </button>
  );
}

function DownloadButton({ mobile }: { mobile?: boolean }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.a
      href="#download"
      onClick={(e) => e.preventDefault()}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ scale: 1.03, backgroundColor: '#e2e2e6' }}
      whileTap={{ scale: 0.97 }}
      style={{ backgroundColor: '#ffffff' }}
      className={`flex flex-none items-center rounded-full text-black font-medium ${
        mobile ? 'h-9 px-3.5 gap-1.5 text-[13px]' : 'h-12 px-6 gap-2 text-[15px]'
      }`}
    >
      <i className="bi bi-apple" aria-hidden="true" />
      <ScrambleText text="Download" isHovered={hovered} />
    </motion.a>
  );
}

export default function Navbar({ entranceComplete }: { entranceComplete: boolean }) {
  const [open, setOpen] = useState(false);
  const go = (getTop: () => number) => {
    scrollToTarget(getTop);
    setOpen(false);
  };

  return (
    <motion.header
      className="fixed top-0 inset-x-0 z-50 h-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: entranceComplete ? 1 : 0 }}
      transition={{ duration: 0.8 }}
      style={{ pointerEvents: entranceComplete ? 'auto' : 'none' }}
    >
      {/* ---------- desktop ---------- */}
      <div className="hidden sm:flex h-full items-center justify-between px-6 md:px-8">
        <div className="flex items-center gap-2">
          <motion.a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            whileHover={{ scale: 1.02, backgroundColor: 'rgba(255, 255, 255, 0.22)' }}
            whileTap={{ scale: 0.98 }}
            style={{ backgroundColor: GLASS }}
            className={`${open ? 'hidden md:flex' : 'flex'} h-12 px-5 items-center gap-2.5 rounded-[14px] backdrop-blur-md`}
          >
            <SynapseXLogo size={18} className="text-white" />
            <span className="text-[16px] font-medium tracking-tight text-white">SynapseX</span>
          </motion.a>

          <motion.div
            className="h-12 flex items-center overflow-hidden rounded-[14px] backdrop-blur-md"
            style={{ backgroundColor: GLASS }}
            initial={false}
            animate={{ width: open ? 290 : 48 }}
            transition={PILL_SPRING}
          >
            <button
              type="button"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className={`flex flex-none items-center justify-center transition-[width,height,border-radius,margin,background-color] duration-200 ${
                open ? 'w-9 h-9 rounded-[11px] bg-white/10 hover:bg-white/20 ml-1.5' : 'w-12 h-12 rounded-[14px]'
              }`}
            >
              <SquashHamburger open={open} />
            </button>
            <AnimatePresence>
              {open && (
                <motion.nav
                  className="flex items-center gap-6 pl-5"
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 15 }}
                  transition={{ duration: 0.25 }}
                >
                  {LINKS.map((link) => (
                    <NavLink key={link.label} label={link.label} onClick={() => go(link.target)} />
                  ))}
                </motion.nav>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        <DownloadButton />
      </div>

      {/* ---------- mobile ---------- */}
      <div className="flex sm:hidden h-full items-center gap-2 px-4">
        <div className="flex flex-1 min-w-0 items-center">
          <motion.a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="h-9 flex flex-none items-center overflow-hidden rounded-[10px] backdrop-blur-md"
            style={{ backgroundColor: GLASS }}
            initial={false}
            animate={{ width: open ? 0 : 'auto', marginRight: open ? 0 : 8, opacity: open ? 0 : 1 }}
            transition={PILL_SPRING}
          >
            <span className="flex items-center gap-2 px-3 whitespace-nowrap">
              <SynapseXLogo size={15} className="text-white" />
              <span className="text-[13px] font-medium tracking-tight text-white">SynapseX</span>
            </span>
          </motion.a>

          <motion.div
            className="h-9 flex items-center overflow-hidden rounded-[10px] backdrop-blur-md"
            style={{ backgroundColor: GLASS }}
            initial={false}
            animate={{ width: open ? '100%' : 36 }}
            transition={PILL_SPRING}
          >
            <button
              type="button"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className={`flex flex-none items-center justify-center ${
                open ? 'w-7 h-7 rounded-[8px] bg-white/10 ml-1' : 'w-9 h-9 rounded-[10px]'
              }`}
            >
              <SquashHamburger open={open} mobile />
            </button>
            <AnimatePresence>
              {open && (
                <motion.nav
                  className="flex items-center gap-5 pl-4"
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 15 }}
                  transition={{ duration: 0.25 }}
                >
                  {LINKS.map((link) => (
                    <NavLink key={link.label} label={link.label} onClick={() => go(link.target)} mobile />
                  ))}
                </motion.nav>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        <DownloadButton mobile />
      </div>
    </motion.header>
  );
}
