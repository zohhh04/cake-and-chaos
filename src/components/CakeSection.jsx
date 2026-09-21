import { useState } from 'react';
import { Star, Wind, UtensilsCrossed, RotateCcw, Volume2, VolumeX, PartyPopper, Hand } from 'lucide-react';
import { bigCelebration, fireworksShow, popperBurst } from '../lib/celebrate.js';
import { playCelebrationSound, playPop, setMuted, isMuted } from '../lib/sound.js';

function CakeArt({ name, candlesOut, cut, showMark, onMarkCut }) {
  const flames = [0, 1, 2, 3, 4];
  const markActive = showMark && !cut;
  return (
    <div
      onClick={markActive ? onMarkCut : undefined}
      onKeyDown={markActive ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onMarkCut(); } } : undefined}
      role={markActive ? 'button' : undefined}
      tabIndex={markActive ? 0 : undefined}
      aria-label={markActive ? `Cut the cake on the dotted mark for ${name}` : undefined}
      style={{ cursor: markActive ? 'pointer' : 'default' }}
    >
      <svg className="cake-svg" viewBox="0 0 340 300" role="img" aria-label={candlesOut ? 'Birthday cake with candles blown out' : 'Birthday cake with lit candles'}>
        {/* plate */}
        <ellipse cx="170" cy="272" rx="140" ry="18" fill="#0b1330" stroke="#5eeaff" strokeOpacity="0.4" />
        {/* layers */}
        <g className={`cake-split${cut ? ' cut-left' : ''}`}>
          <rect x="70" y="200" width="100" height="60" rx="10" fill="#3b5bff" />
          <rect x="70" y="214" width="100" height="12" fill="#f2c94c" opacity="0.85" />
          <rect x="70" y="236" width="100" height="10" fill="#ff6fa5" opacity="0.8" />
        </g>
        <g className={`cake-split${cut ? ' cut-right' : ''}`}>
          <rect x="170" y="200" width="100" height="60" rx="10" fill="#3b5bff" />
          <rect x="170" y="214" width="100" height="12" fill="#f2c94c" opacity="0.85" />
          <rect x="170" y="236" width="100" height="10" fill="#ff6fa5" opacity="0.8" />
        </g>
        <g className={`cake-split${cut ? ' cut-left' : ''}`}>
          <rect x="90" y="140" width="80" height="62" rx="10" fill="#7c6bff" />
          <rect x="90" y="154" width="80" height="10" fill="#fff" opacity="0.7" />
        </g>
        <g className={`cake-split${cut ? ' cut-right' : ''}`}>
          <rect x="170" y="140" width="80" height="62" rx="10" fill="#7c6bff" />
          <rect x="170" y="154" width="80" height="10" fill="#fff" opacity="0.7" />
        </g>
        {/* frosting drips */}
        <path d="M90 140 q10 18 20 0 q10 22 20 0 q10 18 20 0 q10 22 20 0 q10 18 20 0 q10 22 20 0 q10 18 20 0 q10 20 20 0 l0 -14 -160 0 z" fill="#fff" opacity="0.92" />
        <path d="M70 200 q12 20 24 0 q12 24 24 0 q12 20 24 0 q12 24 24 0 q12 20 24 0 q12 24 24 0 q12 20 24 0 q12 22 24 0 l0 -14 -200 0 z" fill="#ffe9a8" opacity="0.95" />
        {/* decorations */}
        <circle cx="100" cy="228" r="7" fill="#ff6fa5" />
        <circle cx="240" cy="228" r="7" fill="#5eeaff" />
        <circle cx="170" cy="228" r="7" fill="#f2c94c" />
        <text x="118" y="178" fontSize="20">🍒</text>
        <text x="200" y="178" fontSize="20">🍫</text>
        {/* cutting mark */}
        {markActive && (
          <g className="cut-mark" aria-hidden="true">
            <line x1="70" y1="168" x2="270" y2="168" stroke="#f2c94c" strokeWidth="4" strokeDasharray="10 8" strokeLinecap="round" />
            <text x="170" y="156" textAnchor="middle" fontSize="15" fontWeight="900" fill="#f2c94c">✂️ CUT HERE ✂️</text>
          </g>
        )}
        {cut && (
          <g aria-hidden="true">
            <line x1="170" y1="140" x2="170" y2="262" stroke="#fff" strokeWidth="3" strokeDasharray="6 6" opacity="0.8" />
          </g>
        )}
        {/* candles */}
        {flames.map((i) => {
          const x = 110 + i * 30;
          return (
            <g key={i}>
              <rect x={x} y="92" width="12" height="50" rx="5" fill={i % 2 ? '#f2c94c' : '#5eeaff'} stroke="#fff" strokeOpacity="0.5" />
              <rect x={x} y="100" width="12" height="6" fill="#fff" opacity="0.5" />
              <text x={x - 4} y="88" fontSize="14" className={`smoke${candlesOut ? ' show' : ''}`} style={{ animationDelay: `${i * 0.25}s` }}>💨</text>
              <g className={`flame${candlesOut ? ' out' : ''}`} style={{ animationDelay: `${i * 0.07}s` }}>
                <ellipse cx={x + 6} cy="76" rx="9" ry="14" fill="#ff9d2e" />
                <ellipse cx={x + 6} cy="78" rx="5" ry="9" fill="#ffd23e" />
                <ellipse cx={x + 6} cy="80" rx="2.5" ry="5" fill="#fff" />
              </g>
            </g>
          );
        })}
        <text x="170" y="252" textAnchor="middle" fontSize="20" fontWeight="900" fill="#fff">{name.toUpperCase()} 🎂</text>
      </svg>
    </div>
  );
}

export default function CakeSection({ name = 'Talha' }) {
  const [wished, setWished] = useState(false);
  const [candlesOut, setCandlesOut] = useState(false);
  const [knifeTaken, setKnifeTaken] = useState(false);
  const [cut, setCut] = useState(false);
  const [muted, setM] = useState(isMuted());
  const [listening] = useState(false);

  const toggleMute = () => {
    const next = !muted;
    setM(next);
    setMuted(next);
  };

  const blowOut = () => {
    if (candlesOut) return;
    setCandlesOut(true);
    playPop();
    popperBurst(0.5, 0.4);
  };

  const takeKnife = () => {
    if (!candlesOut || knifeTaken) return;
    setKnifeTaken(true);
    playPop();
  };

  const cutCake = () => {
    if (!candlesOut || !knifeTaken || cut) return;
    setCut(true);
    playCelebrationSound();
    bigCelebration();
    fireworksShow(3000);
  };

  const replay = () => {
    setWished(false);
    setCandlesOut(false);
    setKnifeTaken(false);
    setCut(false);
  };

  return (
    <section className="block reveal" id="cake" aria-labelledby="cake-title">
      <div className="wrap">
        <div className="center">
          <span className="eyebrow">🎂 Section 02 · Interactive Cake</span>
          <h2 className="h2" id="cake-title">MAKE A WISH, <span className="gold">{name.toUpperCase()}!</span></h2>
          <p className="sub">A layered CSS birthday cake, lit candles, one wish, and a very dramatic knife entrance.</p>
        </div>
        <div className="cake-layout">
          <div className="cake-stage">
            <button className="btn btn-sm btn-ghost mute-btn" onClick={toggleMute} aria-label={muted ? 'Unmute celebration sound' : 'Mute celebration sound'}>
              {muted ? <VolumeX size={17} /> : <Volume2 size={17} />} {muted ? 'MUTED' : 'SOUND'}
            </button>
            <div className="glow-halo" aria-hidden="true" />
            <CakeArt name={name} candlesOut={candlesOut} cut={cut} showMark={knifeTaken} onMarkCut={cutCake} />
            <div className={`knife${cut ? ' cut' : ''}${knifeTaken && !cut ? ' held' : ''}`} aria-hidden="true">
              {knifeTaken ? '🔪' : '🍽️'}
            </div>
            {knifeTaken && !cut && (
              <p className="mark-hint" role="status">👆 Knife in hand! Now tap the golden dotted <strong>CUT HERE</strong> line on the cake!</p>
            )}
            {cut && (
              <div className="celebrate-msg" role="status">
                <h3>YAYYY! HAPPY BIRTHDAY {name.toUpperCase()}! 🎉</h3>
                <p>May all your wishes come true. Now save me a piece of cake!</p>
                <div className="row center">
                  <button className="btn btn-sm btn-gold" onClick={() => { bigCelebration(); fireworksShow(2000); playCelebrationSound(); }}>
                    <PartyPopper size={17} /> MORE CONFETTI
                  </button>
                  <button className="btn btn-sm btn-ghost" onClick={replay}>
                    <RotateCcw size={16} /> REPLAY CAKE
                  </button>
                </div>
              </div>
            )}
            <div aria-hidden="true" style={{ fontSize: '1.6rem', marginTop: 10 }}>🎈 🎉 ⭐ 🎈 🎉</div>
          </div>
          <div className="step-list">
            <div className={`step${!wished ? ' active' : ' done'}`}>
              <h3>Step 1 — Make a Wish ✨</h3>
              <p>Close your eyes, make a wish, and don&apos;t tell me what it is! ✨</p>
              <button className="btn btn-sm" disabled={wished} onClick={() => { setWished(true); playPop(); }} aria-label="I made a wish">
                <Star size={17} /> {wished ? 'WISH LOCKED IN 🌟' : 'I MADE A WISH 🌟'}
              </button>
            </div>
            <div className={`step${wished && !candlesOut ? ' active' : ''}${candlesOut ? ' done' : ''}`}>
              <h3>Step 2 — Blow Out the Candles 💨</h3>
              <p>Okay, now blow out your candles! {listening ? '' : '(Button works every time — no mic needed.)'}</p>
              <button className="btn btn-sm" disabled={!wished || candlesOut} onClick={blowOut} aria-label="Blow out candles">
                <Wind size={17} /> {candlesOut ? 'CANDLES OUT! 💨' : 'BLOW OUT CANDLES 💨'}
              </button>
            </div>
            <div className={`step${candlesOut && !cut ? ' active' : ''}${cut ? ' done' : ''}`}>
              <h3>Step 3 — Take the Knife &amp; Cut on the Mark 🔪</h3>
              <p>First grab the knife, then slice exactly on the golden dotted line!</p>
              <div className="row">
                <button className="btn btn-sm" disabled={!candlesOut || knifeTaken} onClick={takeKnife} aria-label="Take the knife">
                  <Hand size={17} /> {knifeTaken ? 'KNIFE IN HAND! 🔪' : 'TAKE THE KNIFE 🔪'}
                </button>
                <button className="btn btn-sm btn-gold" disabled={!knifeTaken || cut} onClick={cutCake} aria-label="Cut the cake on the mark">
                  <UtensilsCrossed size={17} /> {cut ? 'CAKE CUT! 🎉' : 'CUT ON THE MARK 🔪'}
                </button>
              </div>
            </div>
            <div className="step">
              <h3>Step 4 — Celebration 🎉</h3>
              <p>Party poppers, confetti, balloons, fireworks and the Happy Birthday song — sound plays only after you tap.</p>
              <div className="row">
                <button className="btn btn-sm btn-ghost" onClick={replay}><RotateCcw size={16} /> RESET</button>
                <a className="btn btn-sm btn-ghost" href="#wishes">SEE WISHES ❤️</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
