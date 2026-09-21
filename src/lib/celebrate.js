import confetti from 'canvas-confetti';

export function bigCelebration() {
  const end = Date.now() + 1600;
  (function frame() {
    confetti({ particleCount: 6, angle: 60, spread: 60, origin: { x: 0, y: 0.7 }, colors: ['#2f7bff', '#f2c94c', '#ff6fa5', '#5eeaff', '#ffffff'] });
    confetti({ particleCount: 6, angle: 120, spread: 60, origin: { x: 1, y: 0.7 }, colors: ['#2f7bff', '#f2c94c', '#ff6fa5', '#5eeaff', '#ffffff'] });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();
  confetti({ particleCount: 160, spread: 100, origin: { y: 0.6 }, colors: ['#2f7bff', '#f2c94c', '#ff6fa5', '#5eeaff', '#ffffff'] });
}

export function popperBurst(x = 0.5, y = 0.6) {
  confetti({ particleCount: 90, spread: 75, origin: { x, y }, colors: ['#f2c94c', '#ff6fa5', '#5eeaff', '#ffffff'] });
}

export function fireworksShow(durationMs = 2500) {
  const end = Date.now() + durationMs;
  (function frame() {
    confetti({ particleCount: 4, angle: 60, spread: 55, origin: { x: 0 }, colors: ['#f2c94c', '#5eeaff'] });
    confetti({ particleCount: 4, angle: 120, spread: 55, origin: { x: 1 }, colors: ['#ff6fa5', '#ffffff'] });
    confetti({ particleCount: 10, spread: 120, startVelocity: 35, origin: { x: Math.random(), y: Math.random() * 0.5 }, colors: ['#f2c94c', '#2f7bff', '#ff6fa5'] });
    if (Date.now() < end) setTimeout(frame, 250);
  })();
}
