import { useEffect, useState } from 'react';
import { ArrowUp, Ticket, PartyPopper } from 'lucide-react';
import Starfield from './components/Starfield.jsx';
import Navbar from './components/Navbar.jsx';
import WelcomeScreen from './components/WelcomeScreen.jsx';
import LetterSection from './components/LetterSection.jsx';
import CakeSection from './components/CakeSection.jsx';
import WishesSection from './components/WishesSection.jsx';
import GamesSection from './components/GamesSection.jsx';
import TermsSection from './components/TermsSection.jsx';
import FinaleSection from './components/FinaleSection.jsx';
import { fireworksShow } from './lib/celebrate.js';
import { playPop } from './lib/sound.js';

function NameGate({ onEnter }) {
  const [value, setValue] = useState('');

  const submit = (e) => {
    e.preventDefault();
    const clean = value.trim().slice(0, 24) || 'Talha';
    playPop();
    onEnter(clean);
  };

  return (
    <header className="gate" id="home">
      <div className="gate-card">
        <span className="eyebrow">🎟️ VIP Invite Only</span>
        <div className="gift-stage" role="img" aria-label="Party invite">🎟️</div>
        <h1>WHO&apos;S THE <span className="glow">BIRTHDAY STAR?</span></h1>
        <p>Enter the invite name to open your surprise website.</p>
        <form onSubmit={submit} className="name-form">
          <label className="sr-only" htmlFor="invite-name">Invite name</label>
          <input
            id="invite-name"
            className="name-input"
            type="text"
            maxLength={24}
            autoComplete="off"
            placeholder=""
            value={value}
            onChange={(e) => setValue(e.target.value)}
            aria-describedby="invite-hint"
          />
          <small id="invite-hint" className="name-hint">ur name for entering the website ✨</small>
          <button className="btn" type="submit" aria-label="Enter the birthday website">
            <PartyPopper size={19} aria-hidden="true" /> ENTER THE PARTY 🎉
          </button>
        </form>
        <p style={{ marginTop: 14, fontSize: '0.9rem' }}><Ticket size={14} style={{ verticalAlign: '-2px' }} /> One name. One mission. Endless surprises.</p>
      </div>
    </header>
  );
}

export default function App() {
  const [name, setName] = useState(() => {
    try { return localStorage.getItem('birthday-name') || ''; } catch { return ''; }
  });
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem('birthday-theme') || 'sky'; } catch { return 'sky'; }
  });
  const [unlocked, setUnlocked] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const displayName = name || 'Talha';

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem('birthday-theme', theme); } catch { /* noop */ }
  }, [theme]);

  useEffect(() => {
    document.title = `Hey ${displayName}, Your Birthday Mission Starts Now! 🎮🎂`;
  }, [displayName]);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 700);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!unlocked) return;
    const els = document.querySelectorAll('.reveal');
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.1 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [unlocked]);

  const enterSite = (n) => {
    setName(n);
    try { localStorage.setItem('birthday-name', n); } catch { /* noop */ }
  };

  const unlock = () => {
    setUnlocked(true);
    setTimeout(() => {
      document.getElementById('letter')?.scrollIntoView({ behavior: 'smooth' });
      fireworksShow(1800);
    }, 150);
  };

  const replayAll = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => window.location.reload(), 600);
  };

  return (
    <div className="app">
      <Starfield />
      {!name ? (
        <NameGate onEnter={enterSite} />
      ) : !unlocked ? (
        <WelcomeScreen name={displayName} onUnlock={unlock} />
      ) : (
        <>
          <Navbar name={displayName} theme={theme} onTheme={setTheme} />
          <main style={{ paddingTop: 64 }}>
            <div className="wrap" id="home" style={{ paddingTop: 30 }}>
              <div className="card center" style={{ background: 'linear-gradient(135deg, rgba(47,123,255,0.16), rgba(255,111,165,0.12))' }}>
                <p style={{ fontWeight: 900, fontSize: 'clamp(1.2rem, 3vw, 1.7rem)', margin: 0 }}>
                  🎮 Mission Unlocked! Welcome to {displayName}&apos;s Birthday Adventure, by Zeba ❤️
                </p>
                <p style={{ color: 'var(--text-dim)', margin: '8px 0 0' }}>Scroll down for letter → cake → wishes → games → terms → finale!</p>
              </div>
            </div>
            <LetterSection name={displayName} />
            <CakeSection name={displayName} />
            <WishesSection name={displayName} />
            <GamesSection name={displayName} />
            <TermsSection name={displayName} />
            <FinaleSection name={displayName} onReplayAll={replayAll} />
            <footer className="footer">
              <p>Made with ❤️, drama &amp; endless hype by <strong>Zeba</strong> for <strong>{displayName}</strong> 🎂</p>
            </footer>
          </main>
        </>
      )}
      {showTop && unlocked && (
        <button className="top-btn" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Scroll to top">
          <ArrowUp size={20} />
        </button>
      )}
    </div>
  );
}
