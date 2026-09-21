const TERMS = [
  'Meri tareef karne ke liye shukriya. Mai hu hi achi. 😌',
  'B.Tech ke baad mai apku bhul jaungi, but ap meko mat bhulna!',
  'Meko hamesha prioritize karna, kyunki mai tumhari friend hoon, koi aur nahi.',
  'I know mai beech mein sahi nahi thi, but mai sudhargayi yaar. Maaf kar dena!',
  'Your lifetime subscription to my drama has officially renewed.',
  "Buying me things is not mandatory… but I won't stop you. 😂",
  'Complimenting me is a full-time job. No salary, only friendship.',
  'Birthday boy must stay happy, healthy, and successful. No excuses.',
];

export default function TermsSection({ name = 'Talha' }) {
  return (
    <section className="block reveal" id="terms" aria-labelledby="terms-title">
      <div className="wrap">
        <div className="center">
          <span className="eyebrow">📜 Section 05 · Legally Binding (Not Really)</span>
          <h2 className="h2" id="terms-title">OFFICIAL TERMS &amp; CONDITIONS <span className="gold">OF BEING MY BEST FRIEND</span></h2>
          <p className="sub">By reading this website, {name} automatically agrees to all of the following. No returns, no exchanges. 🤝</p>
        </div>
        <div className="terms-grid">
          {TERMS.map((t, i) => (
            <div key={i} className="term-card">
              <span className="term-num">{String(i + 1).padStart(2, '0')}</span>
              <p>{t}</p>
            </div>
          ))}
        </div>
        <div className="center">
          <span className="stamp">✔️ SIGNED: {name.toUpperCase()} (BIRTHDAY STAR) · WITNESS: ZEBA 😌</span>
        </div>
      </div>
    </section>
  );
}
