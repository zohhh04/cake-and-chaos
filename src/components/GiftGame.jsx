import { useState } from 'react';
import { RotateCcw, Gift } from 'lucide-react';
import { popperBurst } from '../lib/celebrate.js';
import { playPop } from '../lib/sound.js';

const OPTIONS = ['My confidence', 'My attitude', 'Both, obviously 😌'];

export default function GiftGame({ name = 'Talha' }) {
  const [opened, setOpened] = useState([]);
  const [riddle, setRiddle] = useState(null); // null | index | 'correct'
  const [solved, setSolved] = useState(false);
  const GIFTS = [
    { id: 0, emoji: '💌', title: 'A heartfelt birthday message', body: `${name}, thank you for staying when things got hard. You are the kind of friend people pray for. Happiest birthday to my safe place, my supporter, my bestest friend. — Zeba ❤️` },
    { id: 1, emoji: '😂', title: 'A funny friendship joke', body: `Why did Zeba bring a ladder to the friendship? Because ${name} keeps raising the bar with encouragement! And why does ${name} never lose arguments? Because Zeba declared herself right by default. She is just that good! 😌` },
    { id: 2, emoji: '🏆', title: 'A virtual birthday trophy', body: `🏆 OFFICIAL CERTIFICATE 🏆 This trophy is awarded to ${name.toUpperCase()} for being the Best Friend, Best Hype Partner, and Best Birthday Star of the Year. Signed: Zeba (CEO of Drama).` },
  ];

  const openGift = (id) => {
    if (!opened.includes(id)) {
      setOpened((o) => [...o, id]);
      playPop();
      popperBurst(0.3 + id * 0.2, 0.6);
    }
  };

  const answer = (i) => {
    if (solved) return;
    if (OPTIONS[i].startsWith('Both')) {
      setRiddle('correct');
      setSolved(true);
      playPop();
      popperBurst(0.5, 0.5);
    } else {
      setRiddle(i);
    }
  };

  const reset = () => { setOpened([]); setRiddle(null); setSolved(false); };

  return (
    <div>
      <h3 style={{ margin: '4px 0 6px' }}>🎁 Unlock Your Birthday Gifts</h3>
      <p style={{ color: 'var(--text-dim)', margin: 0 }}>Tap each mystery box to reveal its surprise. Then solve the riddle!</p>
      <div className="gift-row">
        {GIFTS.map((g) => {
          const isOpen = opened.includes(g.id);
          return (
            <div key={g.id} className={`mystery-gift${isOpen ? ' open' : ''}`} role="button" tabIndex={0}
              aria-expanded={isOpen} aria-label={`${g.title} — activate to open`}
              onClick={() => openGift(g.id)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openGift(g.id); } }}>
              <span className="emoji" aria-hidden="true">{isOpen ? g.emoji : '🎁'}</span>
              <h4 style={{ margin: '10px 0 6px' }}>{isOpen ? g.title : `Mystery Box ${g.id + 1}`}</h4>
              {isOpen ? <p className="gift-body">{g.body}</p>
                : <p className="tap-open">TAP TO OPEN ✨</p>}
            </div>
          );
        })}
      </div>
      <div className="card" style={{ marginTop: 18 }}>
        <h4 style={{ margin: '0 0 4px' }}>🧩 Riddle: What gets better every time you hype me up?</h4>
        <div className="riddle-options">
          {OPTIONS.map((o, i) => (
            <button
              key={o}
              className={solved && o.startsWith('Both') ? 'correct' : riddle === i ? 'wrong' : ''}
              onClick={() => answer(i)}
              aria-label={`Riddle answer: ${o}`}
            >
              {o}
            </button>
          ))}
        </div>
        {riddle !== null && !solved && <p style={{ color: '#ff8fa5', fontWeight: 700 }}>Nope! Try again, birthday star 😂</p>}
        {solved && <p style={{ color: '#34d399', fontWeight: 800, fontSize: '1.05rem' }}>Correct! Obviously BOTH. Mai hu hi achi! 😌🎉</p>}
        <div className="row" style={{ marginTop: 12 }}>
          <button className="btn btn-sm btn-ghost" onClick={reset}><RotateCcw size={15} /> REPLAY GIFTS</button>
          <span style={{ alignSelf: 'center', color: 'var(--text-dim)', fontSize: '0.9rem' }}><Gift size={14} /> {opened.length}/3 opened</span>
        </div>
      </div>
    </div>
  );
}
