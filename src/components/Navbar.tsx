import React, { useEffect, useState } from 'react';
import { REPO_URL } from '../lib/links';
import { Terminal, Github } from 'lucide-react';
import { LogoMark, Wordmark } from './Logo';

interface NavbarProps {
  onOpenRunLocally: () => void;
  onScrollToSection?: (sectionId: string) => void;
}

const LINKS = [
  { href: '#top', label: 'Agents' },
  { href: '#capabilities', label: 'Capabilities' },
  { href: '#run', label: 'Run it' },
];

export const Navbar: React.FC<NavbarProps> = ({ onOpenRunLocally }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-[background-color,border-color] duration-500 border-b ${
        scrolled ? 'bg-ink/[0.97] border-line' : 'bg-transparent border-transparent'
      }`}
    >
      <div className="max-w-[1480px] mx-auto px-4 sm:px-8 h-16 sm:h-[72px] flex items-center justify-between gap-4">
        <a href="#top" className="flex items-center gap-2.5 rounded-xl" aria-label="SourceBots home">
          <LogoMark size={34} alive />
          <Wordmark className="text-[19px] text-fg" />
        </a>

        <nav className="hidden md:flex items-center gap-1 p-1 rounded-full bg-white/[0.03] border border-line" aria-label="Sections">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="h-8 px-4 inline-flex items-center rounded-full text-[13.5px] text-fg-2 hover:text-fg hover:bg-white/[0.06] transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1 sm:gap-1.5">
          <a
            href={REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex w-10 h-10 items-center justify-center rounded-full text-fg-2 hover:text-fg hover:bg-white/[0.06] transition-colors"
            aria-label="GitHub"
          >
            <Github className="w-[18px] h-[18px]" />
          </a>
          <button
            onClick={onOpenRunLocally}
            className="ml-1 inline-flex items-center gap-2 h-10 px-3 sm:pl-3.5 sm:pr-4 rounded-full bg-fg text-ink text-[13.5px] font-semibold hover:bg-white transition-colors"
            aria-label="Run locally"
          >
            <Terminal className="w-4 h-4" />
            <span className="hidden sm:inline">Run locally</span>
          </button>
        </div>
      </div>
    </header>
  );
};
