import { useState } from 'react';
import { Gamepad2, Gift, Brain } from 'lucide-react';
import ComplimentGame from './ComplimentGame.jsx';
import GiftGame from './GiftGame.jsx';
import QuizGame from './QuizGame.jsx';

export default function GamesSection({ name = 'Talha' }) {
  const [tab, setTab] = useState('catch');
  return (
    <section className="block reveal" id="games" aria-labelledby="games-title">
      <div className="wrap">
        <div className="center">
          <span className="eyebrow">🎮 Section 04 · Mini-Games Arcade</span>
          <h2 className="h2" id="games-title">BIRTHDAY <span className="gold">GAMES ARCADE</span></h2>
          <p className="sub">Three missions. Zero pressure. Maximum drama. Good luck, birthday boy!</p>
        </div>
        <div className="games-tabs" role="tablist" aria-label="Mini games">
          <button role="tab" aria-selected={tab === 'catch'} className={`tab${tab === 'catch' ? ' active' : ''}`} onClick={() => setTab('catch')}><Gamepad2 size={16} /> Catch the Compliments</button>
          <button role="tab" aria-selected={tab === 'gifts'} className={`tab${tab === 'gifts' ? ' active' : ''}`} onClick={() => setTab('gifts')}><Gift size={16} /> Unlock Gifts</button>
          <button role="tab" aria-selected={tab === 'quiz'} className={`tab${tab === 'quiz' ? ' active' : ''}`} onClick={() => setTab('quiz')}><Brain size={16} /> Best Friend Quiz</button>
        </div>
        <div className="game-box" role="tabpanel">
          {tab === 'catch' && <ComplimentGame name={name} />}
          {tab === 'gifts' && <GiftGame name={name} />}
          {tab === 'quiz' && <QuizGame name={name} />}
        </div>
      </div>
    </section>
  );
}
