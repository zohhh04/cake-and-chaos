// Tiny WebAudio tunes — only plays after user interaction, with mute support.
let muted = false;
export function setMuted(m) { muted = m; }
export function isMuted() { return muted; }

// Real "Happy Birthday" melody (G G A G C B | G G A G D C | G G G' E C B A | F F E C D C)
const HB = [
  ['G4', 0.75], ['G4', 0.25], ['A4', 1], ['G4', 1], ['C5', 1], ['B4', 1.75],
  ['G4', 0.75], ['G4', 0.25], ['A4', 1], ['G4', 1], ['D5', 1], ['C5', 1.75],
  ['G4', 0.75], ['G4', 0.25], ['G5', 1], ['E5', 1], ['C5', 1], ['B4', 1], ['A4', 1.75],
  ['F5', 0.75], ['F5', 0.25], ['E5', 1], ['C5', 1], ['D5', 1], ['C5', 2],
];
const FREQ = { G4: 392.0, A4: 440.0, B4: 493.88, C5: 523.25, D5: 587.33, E5: 659.25, F5: 698.46, G5: 783.99 };

export function playHappyBirthday() {
  if (muted) return;
  try {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return;
    const ctx = new Ctx();
    const beat = 0.34;
    let t = ctx.currentTime + 0.05;
    HB.forEach(([note, len]) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.value = FREQ[note];
      const dur = len * beat;
      gain.gain.setValueAtTime(0.0001, t);
      gain.gain.exponentialRampToValueAtTime(0.22, t + 0.03);
      gain.gain.setValueAtTime(0.22, t + Math.max(0.03, dur - 0.06));
      gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      osc.connect(gain).connect(ctx.destination);
      osc.start(t);
      osc.stop(t + dur + 0.02);
      t += dur + 0.02;
    });
    setTimeout(() => { try { ctx.close(); } catch { /* noop */ } }, (t - ctx.currentTime) * 1000 + 400);
  } catch { /* ignore */ }
}

// Celebration = the Happy Birthday song!
export function playCelebrationSound() {
  playHappyBirthday();
}

export function playPop() {
  if (muted) return;
  try {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return;
    const ctx = new Ctx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.08);
    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.12);
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.13);
    setTimeout(() => { try { ctx.close(); } catch { /* noop */ } }, 300);
  } catch { /* ignore */ }
}
