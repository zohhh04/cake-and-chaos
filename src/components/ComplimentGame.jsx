import { useEffect, useRef, useState } from 'react';
import { Play, RotateCcw, Timer, Trophy } from 'lucide-react';
import { popperBurst } from '../lib/celebrate.js';
import { playPop } from '../lib/sound.js';

const TIME_LIMIT = 20;
const BAD = 'EGO OVERLOAD 💀';

function goodsFor(name) {
  return [`${name} OP`, 'Best Friend', 'Legend', 'Kind Heart', 'Birthday King', 'Certified Good Human'];
}

function scoreMessage(score) {
  if (score >= 18) return 'Certified Birthday Legend! Absolutely unstoppable! 👑';
  if (score >= 12) return 'Okay superstar, leave some compliments for the rest of us! 😎';
  if (score >= 6) return 'Nice catching! Your reflexes are almost as good as your hype skills. 😂';
  if (score >= 1) return 'Cute effort. More practice needed, birthday star! 😌';
  return 'Did you even try? The compliments are shy now. 😭';
}

export default function ComplimentGame({ name = 'Talha' }) {
  const [phase, setPhase] = useState('idle'); // idle | playing | over
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(TIME_LIMIT);
  const [items, setItems] = useState([]);
  const [basketX, setBasketX] = useState(50);
  const arenaRef = useRef(null);
  const idRef = useRef(0);
  const caughtRef = useRef(new Set());

  useEffect(() => {
    if (phase !== 'playing') return;
    setScore(0);
    setTime(TIME_LIMIT);
    setItems([]);
    caughtRef.current = new Set();
    setBasketX(50);

    const tick = setInterval(() => {
      setTime((t) => {
        if (t <= 1) {
          clearInterval(tick);
          setPhase('over');
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    const spawn = setInterval(() => {
      setItems((prev) => {
        if (prev.length > 14) return prev;
        const isBad = Math.random() < 0.16;
        const goods = goodsFor(name);
        const label = isBad ? BAD : goods[Math.floor(Math.random() * goods.length)];
        const id = ++idRef.current;
        return [...prev, { id, label, bad: isBad, x: 4 + Math.random() * 88, y: -8, speed: 0.7 + Math.random() * 1.1 + (TIME_LIMIT - time) * 0.03 }];
      });
    }, 620);

    let raf;
    const fall = () => {
      setItems((prev) =>
        prev
          .map((it) => ({ ...it, y: it.y + it.speed }))
          .filter((it) => it.y < 108)
      );
      raf = requestAnimationFrame(fall);
    };
    raf = requestAnimationFrame(fall);

    return () => { clearInterval(tick); clearInterval(spawn); cancelAnimationFrame(raf); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase === 'playing']);

  const catchItem = (it, e) => {
    if (e) e.stopPropagation();
    if (phase !== 'playing' || caughtRef.current.has(it.id)) return;
    caughtRef.current.add(it.id);
    playPop();
    if (it.bad) {
      setScore((s) => Math.max(0, s - 2));
    } else {
      setScore((s) => s + 1);
      popperBurst(0.5, 0.5);
    }
    setItems((prev) => prev.filter((p) => p.id !== it.id));
  };

  const moveBasket = (clientX) => {
    const rect = arenaRef.current?.getBoundingClientRect();
    if (!rect) return;
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setBasketX(Math.min(94, Math.max(6, pct)));
    // auto-catch items near basket
    setItems((prev) => {
      const caught = prev.filter((it) => it.y > 82 && Math.abs(it.x - pct) < 9);
      caught.forEach((it) => {
        if (!caughtRef.current.has(it.id)) {
          caughtRef.current.add(it.id);
          playPop();
          setScore((s) => (it.bad ? Math.max(0, s - 2) : s + 1));
        }
      });
      return prev.filter((it) => !(it.y > 82 && Math.abs(it.x - pct) < 9));
    });
  };

  return (
    <div>
      <div className="scorebar">
        <span className="score-chip"><Trophy size={15} /> SCORE: {score}</span>
        <span className="score-chip"><Timer size={15} /> TIME: {time}s</span>
        <span className="score-chip">🧺 Move basket: mouse / touch / tap compliments</span>
      </div>
      {phase === 'idle' && (
        <div className="center" style={{ padding: '30px 10px' }}>
          <p style={{ fontSize: '1.1rem', marginBottom: 16 }}>Catch falling compliments for {TIME_LIMIT} seconds. Avoid <strong>{BAD}</strong> (−2 points)!</p>
          <button className="btn" onClick={() => setPhase('playing')} aria-label="Start compliment game"><Play size={19} /> START GAME 🎮</button>
        </div>
      )}
      {phase === 'playing' && (
        <div
          className="compliment-arena"
          ref={arenaRef}
          onMouseMove={(e) => moveBasket(e.clientX)}
          onTouchMove={(e) => moveBasket(e.touches[0].clientX)}
          onClick={(e) => moveBasket(e.clientX)}
          role="application"
          aria-label="Compliment catching game arena"
        >
          {items.map((it) => (
            <button
              key={it.id}
              className={`falling ${it.bad ? 'bad' : 'good'}`}
              style={{ left: `${it.x}%`, top: `${it.y}%` }}
              onClick={(e) => catchItem(it, e)}
              aria-label={`Catch ${it.label}`}
            >
              {it.label}
            </button>
          ))}
          <div className="basket" style={{ left: `${basketX}%` }} aria-hidden="true">🧺</div>
        </div>
      )}
      {phase === 'over' && (
        <div className="center" style={{ padding: '26px 10px' }}>
          <div style={{ fontSize: '3rem' }}>🏆</div>
          <h3 style={{ fontSize: '1.6rem', margin: '8px 0' }}>TIME UP! Score: {score}</h3>
          <p style={{ color: 'var(--text-dim)' }}>{scoreMessage(score)}</p>
          <p style={{ marginTop: 12, fontWeight: 700 }}>Look at you collecting compliments. Now you know how I feel when you shower me with praise. 😂</p>
          <div className="row center" style={{ marginTop: 16 }}>
            <button className="btn" onClick={() => setPhase('playing')} aria-label="Restart compliment game"><RotateCcw size={18} /> PLAY AGAIN</button>
          </div>
        </div>
      )}
      {phase === 'playing' && (
        <div className="row center" style={{ marginTop: 14 }}>
          <button className="btn btn-sm btn-ghost" onClick={() => setPhase('over')}>END GAME</button>
          <button className="btn btn-sm btn-ghost" onClick={() => setPhase('playing')}><RotateCcw size={15} /> RESTART</button>
        </div>
      )}
    </div>
  );
}
