import { useState } from 'react';
import { Menu, X, Cake, Palette } from 'lucide-react';

const LINKS = [
  { href: '#home', label: 'Home' },
  { href: '#letter', label: 'Birthday Letter' },
  { href: '#cake', label: 'Cake & Celebration' },
  { href: '#wishes', label: 'Birthday Wishes' },
  { href: '#games', label: 'Mini-Games' },
  { href: '#terms', label: 'Friendship Terms' },
  { href: '#finale', label: 'Final Surprise' },
];

const THEMES = [
  { id: 'sky', label: 'Light Blue', swatch: 'linear-gradient(135deg,#7cc0ff,#e8f4ff)' },
  { id: 'pink', label: 'Pink Party', swatch: 'linear-gradient(135deg,#ff6fa5,#ffe4ef)' },
  { id: 'mint', label: 'Mint Fresh', swatch: 'linear-gradient(135deg,#34d399,#e6fff5)' },
  { id: 'midnight', label: 'Midnight Blue', swatch: 'linear-gradient(135deg,#0a1430,#2f7bff)' },
];

export default function Navbar({ name = 'Talha', theme = 'sky', onTheme }) {
  const [open, setOpen] = useState(false);
  return (
    <nav className="nav" aria-label="Main navigation">
      <div className="nav-inner">
        <a className="brand" href="#home">
          <span className="brand-badge"><Cake size={20} aria-hidden="true" /></span>
          <span>{name.toUpperCase()}&apos;S MISSION<small>by Zeba ❤️</small></span>
        </a>
        <div className="theme-picker" role="group" aria-label="Choose a color theme">
          <Palette size={15} aria-hidden="true" />
          {THEMES.map((t) => (
            <button
              key={t.id}
              className={`swatch${theme === t.id ? ' active' : ''}`}
              style={{ background: t.swatch }}
              onClick={() => onTheme(t.id)}
              aria-label={`${t.label} theme`}
              aria-pressed={theme === t.id}
              title={t.label}
            />
          ))}
        </div>
        <button className="nav-toggle" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen((v) => !v)}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
        <div className={`nav-links${open ? ' open' : ''}`}>
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>{l.label}</a>
          ))}
        </div>
      </div>
    </nav>
  );
}
