import { Gift } from 'lucide-react';
import { popperBurst } from '../lib/celebrate.js';
import { playPop } from '../lib/sound.js';

export default function WelcomeScreen({ name = 'Talha', onUnlock }) {
  const handleUnlock = (e) => {
    const stage = e.currentTarget.closest('.gate-card')?.querySelector('.gift-stage');
    stage?.classList.add('opening');
    playPop();
    popperBurst(0.5, 0.5);
    setTimeout(onUnlock, 850);
  };

  return (
    <header className="gate" id="home">
      <div className="gate-card">
        <span className="eyebrow">🎮 Birthday Mission · Level 1</span>
        <div className="gift-stage" role="img" aria-label="Animated gift box">🎁</div>
        <h1>HEY {name.toUpperCase()}, YOUR BIRTHDAY MISSION <span className="glow">STARTS NOW! 🎮</span></h1>
        <p>One special day. One very special person. A whole lot of surprises.</p>
        <div className="gate-badges">
          <span className="pill">💌 Letter</span>
          <span className="pill">🎂 Cake</span>
          <span className="pill">🎁 Wishes</span>
          <span className="pill">🎮 Games</span>
          <span className="pill">❤️ Finale</span>
        </div>
        <button className="btn" onClick={handleUnlock} aria-label="Unlock your surprise">
          <Gift size={20} aria-hidden="true" /> UNLOCK YOUR SURPRISE 🎁
        </button>
        <p style={{ marginTop: 14, fontSize: '0.9rem' }}>From your bestest friend, Zeba ❤️</p>
      </div>
    </header>
  );
}
