import { useState } from 'react';

const WISHES = [
  { icon: '💪', title: 'Good Health', text: 'May you always stay healthy, strong, peaceful, and full of energy. Take care of yourself as much as you take care of everyone else. You deserve a long, happy, and healthy life.' },
  { icon: '🚀', title: 'Career Success', text: 'May your hard work open doors to amazing opportunities. I hope you achieve all your career goals, find work that makes you happy, and become successful in everything you pursue. May your future be brighter than you ever imagined.' },
  { icon: '😊', title: 'Happiness', text: 'May your days be filled with genuine happiness, laughter, beautiful surprises, and people who truly care about you. I hope you always have a reason to smile, even on the difficult days.' },
  { icon: '🌟', title: 'Dreams & Achievements', text: "May every dream you're working towards slowly turn into reality. Keep believing in yourself, keep growing, and never stop chasing the things that make you happy. I hope this year brings you closer to everything you wish for." },
  { icon: '🕊️', title: 'Peace & Blessings', text: 'May your heart always find peace, your mind stay calm, and your life be filled with blessings. May you have the strength to overcome every challenge and the courage to embrace every new opportunity.' },
  { icon: '🤝', title: 'Our Friendship', text: 'No matter how busy life gets after B.Tech, I hope our friendship stays just as special. Thank you for always being there for me. And yes, hamesha mujhe prioritize karna. 😂 Your favorite dramatic friend is a lifetime responsibility!' },
];

export default function WishesSection({ name = 'Talha' }) {
  const [open, setOpen] = useState(Array(6).fill(false));
  const toggle = (i) => setOpen((o) => o.map((v, idx) => (idx === i ? !v : v)));

  return (
    <section className="block reveal" id="wishes" aria-labelledby="wishes-title">
      <div className="wrap">
        <div className="wishes-head">
          <span className="eyebrow">🎁 Section 03 · Fully Separate From The Letter</span>
          <h2 className="h2" id="wishes-title">MY WISHES FOR YOU, <span className="gold">{name.toUpperCase()} ❤️</span></h2>
          <p className="sub">Six little cards, six big wishes. All closed with love — tap any card to unwrap its message.</p>
        </div>
        <div className="wish-grid">
          {WISHES.map((w, i) => (
            <article
              key={w.title}
              className="wish-card"
              tabIndex={0}
              role="button"
              aria-expanded={open[i]}
              aria-label={`${w.title} wish card — activate to ${open[i] ? 'hide' : 'reveal'}`}
              onClick={() => toggle(i)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(i); } }}
            >
              <div className="wish-icon" aria-hidden="true">{w.icon}</div>
              <h3>{w.title}</h3>
              {open[i] ? (
                <p className="wish-reveal">{w.text}</p>
              ) : (
                <p className="wish-tap-hint">TAP TO REVEAL ✨</p>
              )}
              {open[i] && <div className="wish-tap-hint">TAP TO HIDE · CARD {i + 1}/6</div>}
            </article>
          ))}
        </div>
        <p className="wish-finale">YOU DESERVE ALL THE GOOD THINGS LIFE HAS TO OFFER, {name.toUpperCase()}! ❤️</p>
      </div>
    </section>
  );
}
