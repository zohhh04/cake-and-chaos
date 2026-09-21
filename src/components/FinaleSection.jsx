import { useState } from 'react';
import { Sparkles, RotateCcw, ArrowUp, Gift, Newspaper } from 'lucide-react';
import { bigCelebration, fireworksShow } from '../lib/celebrate.js';
import { playCelebrationSound } from '../lib/sound.js';

function messageFor(name) {
  return `${name}, thank you for being there when I needed someone the most. Thank you for every little thing you've done for me, every time you've made me smile, and every time you've made me feel supported.

I may not say it perfectly every time, but I'm genuinely grateful to have you in my life.

I hope this new year brings you everything your heart wishes for.

Stay blessed, birthday star. And don't forget your favorite dramatic friend, Zeba. 😂❤️`;
}

export default function FinaleSection({ name = 'Talha', onReplayAll }) {
  const [surprise, setSurprise] = useState(false);
  const hearts = Array.from({ length: 14 }, (_, i) => ({ id: i, left: `${(i * 23) % 100}%`, delay: `${(i % 7) * 0.9}s`, dur: `${5 + (i % 5)}s`, emoji: i % 3 === 0 ? '⭐' : i % 3 === 1 ? '❤️' : '💙' }));

  const celebrate = () => {
    playCelebrationSound();
    bigCelebration();
    fireworksShow(3000);
  };

  return (
    <section className="block reveal" id="finale" aria-labelledby="finale-title">
      <div className="wrap">
        <div className="finale">
          {hearts.map((h) => (
            <span key={h.id} className="float-heart" aria-hidden="true" style={{ left: h.left, animationDelay: h.delay, animationDuration: h.dur, fontSize: '1.4rem' }}>{h.emoji}</span>
          ))}
          <span className="eyebrow">❤️ Final Surprise · Full Screen Feelings</span>
          <div className="trophy" role="img" aria-label="Birthday trophy">🏆</div>
          <h2 id="finale-title">HAPPY BIRTHDAY, <span className="gold">MY BESTEST FRIEND!</span></h2>
          <p className="finale-message">{messageFor(name)}</p>
          <div className="row center" style={{ marginTop: 24 }}>
            <button className="btn btn-gold" onClick={celebrate} aria-label="Launch final celebration"><Sparkles size={19} /> CELEBRATE ONE MORE TIME 🎉</button>
          </div>
          <div className="row center" style={{ marginTop: 12 }}>
            <button className="btn btn-sm" onClick={() => { setSurprise((s) => !s); if (!surprise) celebrate(); }} aria-label="One last surprise" aria-expanded={surprise}>
              <Gift size={17} /> ONE LAST SURPRISE 🤫
            </button>
            <button className="btn btn-sm btn-ghost" onClick={onReplayAll} aria-label="Play everything again"><RotateCcw size={16} /> PLAY EVERYTHING AGAIN</button>
            <button className="btn btn-sm btn-ghost" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Scroll to top"><ArrowUp size={16} /> TOP</button>
          </div>
          {surprise && (
            <div className="surprise-box" role="status">
              <p style={{ margin: 0, fontSize: '1.02rem', lineHeight: 1.7 }}>
                <Newspaper size={18} style={{ verticalAlign: '-3px' }} /> <strong>BREAKING NEWS 📰</strong><br />
                Local legend <strong>{name.toUpperCase()}</strong> has been promoted to <strong>Chief Hype Officer</strong> of Zeba&apos;s fan club! 🎖️<br />
                Perks include: unlimited cake (imaginary), a lifetime supply of compliments, and one dramatic best friend who will NEVER let you forget her. Side effects may include excessive smiling and spontaneous dance breaks. 🕺❤️
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
