import { Fragment, useState } from 'react';

const LINKS = ['Labs', 'Studio', 'Openings', 'Shop'];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 z-10 flex w-full items-center justify-between px-5 py-4 text-black sm:px-8 sm:py-5">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3">
          <span
            className="text-[21px] tracking-tight text-black sm:text-[26px]"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Mainframe®
          </span>
          <span
            className="text-[25px] text-black select-none sm:text-[30px]"
            style={{ letterSpacing: '-0.02em' }}
            aria-hidden="true"
          >
            ✳︎
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden text-[23px] text-black md:flex">
          {LINKS.map((link, i) => (
            <Fragment key={link}>
              <a href="#" className="transition-opacity hover:opacity-60">
                {link}
              </a>
              {i < LINKS.length - 1 && <span className="whitespace-pre">, </span>}
            </Fragment>
          ))}
        </div>

        {/* Desktop CTA */}
        <a
          href="#"
          className="hidden text-[23px] text-black underline underline-offset-2 transition-opacity hover:opacity-60 md:inline"
        >
          Get in touch
        </a>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex flex-col gap-[5px] p-1 md:hidden"
        >
          <span
            className={`block h-[2px] w-6 bg-black transition-transform duration-300 ${
              open ? 'translate-y-[7px] rotate-45' : ''
            }`}
          />
          <span
            className={`block h-[2px] w-6 bg-black transition-opacity duration-300 ${
              open ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <span
            className={`block h-[2px] w-6 bg-black transition-transform duration-300 ${
              open ? '-translate-y-[7px] -rotate-45' : ''
            }`}
          />
        </button>
      </nav>

      {/* Mobile overlay (sibling of nav so the hamburger stays above it) */}
      <div
        className="fixed inset-0 z-[9] flex flex-col items-start justify-center gap-8 bg-white/95 px-8 text-black backdrop-blur-sm transition-opacity duration-300 md:hidden"
        style={{ opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none' }}
        aria-hidden={!open}
      >
        {LINKS.map((link) => (
          <a
            key={link}
            href="#"
            onClick={() => setOpen(false)}
            className="text-[32px] font-medium transition-opacity hover:opacity-60"
          >
            {link}
          </a>
        ))}
        <a
          href="#"
          onClick={() => setOpen(false)}
          className="text-[32px] font-medium underline underline-offset-2 transition-opacity hover:opacity-60"
        >
          Get in touch
        </a>
      </div>
    </>
  );
}
