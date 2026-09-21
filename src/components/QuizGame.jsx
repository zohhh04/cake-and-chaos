import { useState } from 'react';
import { RotateCcw } from 'lucide-react';
import { popperBurst } from '../lib/celebrate.js';

function questionsFor(name) {
  return [
    { q: 'Who loves getting compliments more?', options: [name, 'Zeba', 'Both'], answer: 1, funny: { right: 'Correct! Zeba runs on compliments like a phone runs on battery. 🔋', wrong: 'Wrong! Be serious — obviously ZEBA. She is just that good! 😌' } },
    { q: `What is ${name}'s superpower?`, options: ['Always being there', 'Making everyone smile', 'Unlimited hype energy', 'All of the above'], answer: 3, funny: { right: `All of the above! ${name} is basically a superhero without the cape. 🦸`, wrong: 'Wrong! The only correct answer is ALL OF THE ABOVE. Give him some credit! 😂' } },
    { q: 'What happens after B.Tech?', options: ['We become busy', `Zeba forgets ${name}`, `${name} better not forget Zeba`, 'All of the above'], answer: 3, funny: { right: `All of the above! But rule #1: ${name} better NOT forget Zeba. 😤❤️`, wrong: 'Hmm, the only safe answer is ALL OF THE ABOVE. Especially the last part! 😂' } },
    { q: "What is Zeba's official friendship demand?", options: ['Unlimited food', 'Unlimited compliments', 'Unlimited prioritization', 'All three'], answer: 3, funny: { right: 'All three! Food, praise, prioritization — the holy trinity. 🤝', wrong: 'Wrong! A queen demands ALL THREE. No discounts. 😌' } },
    { q: `What is ${name}'s birthday mission?`, options: ['Be happy', 'Stay healthy', 'Become successful', 'All of the above'], answer: 3, funny: { right: 'All of the above! Happy, healthy, successful — no excuses, birthday star! 🎂', wrong: 'All of the above! Dream bigger! 🚀' } },
  ];
}

export default function QuizGame({ name = 'Talha' }) {
  const QUESTIONS = questionsFor(name);
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const pick = (i) => {
    if (picked !== null) return;
    setPicked(i);
    if (i === QUESTIONS[idx].answer) {
      setScore((s) => s + 1);
      popperBurst(0.5, 0.6);
    }
  };

  const next = () => {
    if (idx + 1 >= QUESTIONS.length) setDone(true);
    else { setIdx((v) => v + 1); setPicked(null); }
  };

  const reset = () => { setIdx(0); setPicked(null); setScore(0); setDone(false); };

  const ending = () => {
    if (score === 5) return 'PERFECT 5/5! You really ARE my best friend. Extra hype duty unlocked! 👑❤️';
    if (score >= 3) return `${score}/5! Not bad, birthday star. Friendship approved… but compliment practice continues. 😂`;
    return `${score}/5! Okay… we need to talk. Report to Zeba for friendship re-training immediately. 😭🤝`;
  };

  if (done) {
    return (
      <div className="center" style={{ padding: '10px 4px' }}>
        <div style={{ fontSize: '3rem' }}>{score === 5 ? '👑' : score >= 3 ? '🎉' : '😭'}</div>
        <h3 style={{ fontSize: '1.7rem', margin: '8px 0' }}>Final Score: {score}/5</h3>
        <p style={{ fontWeight: 700, maxWidth: 520, margin: '0 auto' }}>{ending()}</p>
        <div className="row center" style={{ marginTop: 16 }}>
          <button className="btn" onClick={reset}><RotateCcw size={18} /> RETAKE QUIZ</button>
        </div>
      </div>
    );
  }

  const q = QUESTIONS[idx];
  return (
    <div>
      <div className="quiz-progress" aria-hidden="true"><div style={{ width: `${((idx) / QUESTIONS.length) * 100}%` }} /></div>
      <p style={{ color: 'var(--text-dim)', fontWeight: 800, fontSize: '0.9rem' }}>QUESTION {idx + 1} / {QUESTIONS.length} · SCORE: {score}</p>
      <p className="quiz-q">{q.q}</p>
      <div className="riddle-options">
        {q.options.map((o, i) => (
          <button
            key={o}
            onClick={() => pick(i)}
            disabled={picked !== null}
            className={picked === null ? '' : i === q.answer ? 'correct' : picked === i ? 'wrong' : ''}
            aria-label={`Answer: ${o}`}
          >
            {o}
          </button>
        ))}
      </div>
      {picked !== null && (
        <div className={`quiz-feedback ${picked === q.answer ? 'right' : 'wrong'}`} role="status">
          {picked === q.answer ? q.funny.right : q.funny.wrong}
          <div className="row" style={{ marginTop: 12 }}>
            <button className="btn btn-sm" onClick={next}>{idx + 1 === QUESTIONS.length ? 'SEE RESULT 🏁' : 'NEXT QUESTION →'}</button>
          </div>
        </div>
      )}
    </div>
  );
}
