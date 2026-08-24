import React from 'react';

const players = [
  // Placeholder data - replace via admin panel later
  { rank: '01', name: 'Placeholder Name', category: 'Men\'s Singles', year: '2023', university: 'Bharathidasan University' },
];

const UniversityAchievers = () => {
  return (
    <section id="university-achievers" style={{ background: 'var(--color-bg)' }}>
      <div className="container">
        <h2>University Tournament Achievers</h2>
        <p style={{ textAlign: 'center', color: 'var(--color-text-muted)', maxWidth: '640px', margin: '0 auto 3rem auto' }}>
          Celebrating our academy players who have represented and excelled in inter-university and all-India university badminton tournaments.
        </p>

        {/* Player Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
          {players.map((p) => (
            <div key={p.rank} className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{
                fontSize: '3rem',
                fontWeight: '900',
                color: 'var(--color-primary)',
                opacity: '0.2',
                lineHeight: 1,
                fontFamily: 'monospace'
              }}>#{p.rank}</div>
              <h3 style={{ color: 'var(--color-text)', margin: '0.3rem 0 0.2rem', fontSize: '1.2rem' }}>{p.name}</h3>
              <span style={{
                display: 'inline-block',
                background: 'rgba(212,175,55,0.15)',
                border: '1px solid var(--color-primary)',
                color: 'var(--color-primary)',
                borderRadius: '20px',
                padding: '0.2rem 0.8rem',
                fontSize: '0.78rem',
                fontWeight: '600',
                letterSpacing: '0.5px',
                width: 'fit-content'
              }}>{p.category}</span>
              <p style={{ margin: '0.4rem 0 0', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                {p.university} · {p.year}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UniversityAchievers;
