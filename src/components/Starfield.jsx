import { useEffect } from 'react';

export default function Starfield() {
  useEffect(() => {
    document.querySelectorAll('.reveal').forEach((el) => {
      const obs = new IntersectionObserver(
        (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
        { threshold: 0.12 }
      );
      obs.observe(el);
    });
  }, []);

  const stars = Array.from({ length: 70 }, (_, i) => ({
    id: i,
    left: `${(i * 37.7) % 100}%`,
    top: `${(i * 53.3) % 100}%`,
    size: 1 + ((i * 7) % 3),
    delay: `${(i % 10) * 0.3}s`,
    dur: `${2 + ((i * 13) % 4)}s`,
  }));
  const balloons = ['🎈', '🎈', '🎈', '🎈', '⭐'];
  return (
    <>
      <div className="starfield" aria-hidden="true">
        {stars.map((s) => (
          <span
            key={s.id}
            className="star"
            style={{ left: s.left, top: s.top, width: s.size, height: s.size, animationDelay: s.delay, ['--tw']: s.dur }}
          />
        ))}
      </div>
      {balloons.map((b, i) => (
        <span key={i} className="float-balloon" aria-hidden="true" style={{ left: `${8 + i * 20}%`, animationDuration: `${16 + i * 4}s`, animationDelay: `${i * 3}s`, fontSize: `${1.6 + (i % 3) * 0.5}rem` }}>
          {b}
        </span>
      ))}
    </>
  );
}
