import { useEffect, useRef, useState } from 'react';
import { MailOpen, RotateCcw, Heart } from 'lucide-react';

export const LETTER_BODY = `Happiest birthday to one of the most special people in my life! ❤️

I don't think you realize how much you mean to me. You've been there for me during some of my hardest times, especially when it felt like everyone else had left. You stayed, supported me, listened to me, helped me out, and made things feel a little less difficult.

Thank you for always taking care of me like I'm some chinni baby who can't do anything on her own. From helping me whenever I need something to buying me whatever I ask for, you really do treat me like a little kid. And honestly? I love it. 😂

And meri tareef karne ke liye toh special thanks! I know, I know… mai hu hi achi. But seriously, you have no idea how happy your compliments make me. Every time I used to flex and you hyped me up, I secretly enjoyed every single second of it. Keep doing that, please. My self-esteem has a subscription to your tareef service. 🤌🏻

I know I'm not always the easiest person to deal with. Kabhi kabhi beech mein sahi nahi hoti, and I might have hurt you or annoyed you without realizing it. But yaar, mai sudhar gayi! 😭 So, if I've ever hurt you, I'm genuinely sorry. Maaf kar dena, okay?

And listen, B.Tech ke baad mai apko bhul jaungi… BUT AP MEKO MAT BHULNA. 😂

Jokes apart, I really hope we stay friends even when life gets busy and everything starts changing. Please hamesha mujhe prioritize karna, kyunki mai tumhari friend hoon, koi aur nahi. I know I can be dramatic, but that's part of the package. No returns, no exchanges. 🤝

Thank you for being my safe place, my biggest supporter, and one of the best people life has given me.

And obviously, never stop doing meri tareef. That's a lifelong responsibility now. 😌

With lots of love, endless drama, and unlimited tareef demands,

Your bestest friend, Zeba ❤️`;

export default function LetterSection({ name = 'Talha' }) {
  const [opened, setOpened] = useState(false);
  const [typed, setTyped] = useState('');
  const [typing, setTyping] = useState(false);
  const timer = useRef(null);
  const reduced = useRef(false);
  const LETTER_TEXT = `Dear ${name},\n\n${LETTER_BODY}`;

  useEffect(() => {
    reduced.current = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    return () => clearInterval(timer.current);
  }, []);

  const startTyping = () => {
    clearInterval(timer.current);
    if (reduced.current) {
      setTyped(LETTER_TEXT);
      setTyping(false);
      return;
    }
    setTyping(true);
    setTyped('');
    let i = 0;
    timer.current = setInterval(() => {
      i += 3;
      setTyped(LETTER_TEXT.slice(0, i));
      if (i >= LETTER_TEXT.length) {
        clearInterval(timer.current);
        setTyping(false);
      }
    }, 18);
  };

  const openLetter = () => {
    setOpened(true);
    setTimeout(startTyping, 500);
  };

  return (
    <section className="block reveal" id="letter" aria-labelledby="letter-title">
      <div className="wrap">
        <div className="center">
          <span className="eyebrow">💌 Section 01 · Separate Letter Card</span>
          <h2 className="h2" id="letter-title">A LITTLE LETTER FOR <span className="gold">MY BESTEST FRIEND</span></h2>
          <p className="sub">Sealed with love, drama, and unlimited tareef demands. Open it slowly, birthday boy.</p>
        </div>
        <div className="letter-shell">
          <div className={`envelope${opened ? ' open' : ''}`}>
            <div className="envelope-flap" aria-hidden="true">💌</div>
            <div className="wax-seal" aria-hidden="true">Z</div>
            <p style={{ textAlign: 'center', color: 'var(--gold-soft)', fontWeight: 800, letterSpacing: '0.08em', margin: '14px 0 18px' }}>
              FOR {name.toUpperCase()} · FROM ZEBA <span className="heart-beat">❤️</span>
            </p>
            {!opened ? (
              <div className="row center">
                <button className="btn btn-gold" onClick={openLetter} aria-label="Open the birthday letter">
                  <MailOpen size={19} aria-hidden="true" /> OPEN THE LETTER 💌
                </button>
              </div>
            ) : (
              <>
                <div
                  className={`letter-paper${typing ? ' type-caret' : ''}`}
                  role="article"
                  aria-label={`Birthday letter from Zeba to ${name}`}
                  aria-live="polite"
                  tabIndex={0}
                >
                  {typed}
                  <span className="heart-beat" aria-hidden="true"> {typed.length >= LETTER_TEXT.length ? '💖' : ''}</span>
                </div>
                <div className="row center" style={{ marginTop: 18 }}>
                  <button className="btn btn-sm" onClick={startTyping} aria-label="Replay the letter animation">
                    <RotateCcw size={17} aria-hidden="true" /> REPLAY LETTER <Heart size={16} aria-hidden="true" />
                  </button>
                  <a className="btn btn-sm btn-gold" href="#cake">GO TO THE CAKE 🎂</a>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
