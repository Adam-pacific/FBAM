import React from 'react';

const Legacy = () => {
  return (
    <section id="legacy" style={{ background: 'var(--color-surface)' }}>
      <div className="container">
        <h2>The Real History of Mayiladuthurai Badminton</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '3rem' }}>
          
          <div className="glass-panel" style={{ padding: '2rem', gridColumn: '1 / -1', borderRight: '4px solid var(--color-primary)' }}>
            <h3 style={{ color: 'var(--color-primary)', marginBottom: '1rem' }}>The Revolution of Mayiladuthurai</h3>
            <p>Coach Fazal is the <strong>only coach</strong> who was a former ranking player from Mayiladuthurai. More importantly, he single-handedly introduced the kids coaching system to the region. Before his entry, there were only a few badminton indoor stadiums. Today, the infrastructure is rapidly expanding—a direct result of the intense student coaching culture he pioneered. He didn't just teach the sport; he started a badminton revolution for the students of Mayiladuthurai.</p>
          </div>

          <div className="glass-panel" style={{ padding: '2rem', gridColumn: '1 / -1', borderLeft: '4px solid var(--color-primary)' }}>
            <h3 style={{ color: 'var(--color-primary)', marginBottom: '1rem' }}>The Player Before The Coach: A Legacy of Enduring Worth</h3>
            <p>Coach Fazal's roots in the sport run deep. In the early 90s (1990, 1991, and 1993), he was a prominent ranking player alongside his late partner, Vel Murugan. After a major gap away from the professional circuit, he made a triumphant return in 2015. Proving that class is permanent and his worth remains undeniable, he went on to become a <strong>2018 State Veteran Semi-Finalist in Madurai</strong>. Even today, he continues to actively participate in several tournaments, leading by example on the court.</p>
          </div>

          <div className="glass-panel" style={{ padding: '2rem', gridColumn: '1 / -1' }}>
            <h3 style={{ color: 'var(--color-primary)', marginBottom: '1rem' }}>Against All Odds: The Nagapattinam Route</h3>
            <p>Coach Fazal sent players to participate in the TamilNadu Badminton Association ranking tournaments via Nagapattinam from 2015. By facing and overcoming immense obstacles without official local backing, he forged a path for his students when no one else would.</p>
          </div>

          <div className="glass-panel" style={{ padding: '2rem' }}>
            <h3 style={{ color: 'var(--color-primary)', marginBottom: '1rem' }}>Breaking the Metric</h3>
            <p>From 2015 to 2025, Coach Fazal spent a decade grinding to build a powerhouse in the Nagapattinam belt. Before his students competed, the district circuit was heavily dominated by metropolitan regions like Chennai and Coimbatore.</p>
          </div>
          
          <div className="glass-panel" style={{ padding: '2rem' }}>
            <h3 style={{ color: 'var(--color-primary)', marginBottom: '1rem' }}>The Giant Killers</h3>
            <p>Under his guidance, his trainees consistently brought home trophies from SDAT state meets. In TNBA state-level draws, his players became known as "giant killers"—underdogs from a small town knocking out seeded players.</p>
          </div>
          
          <div className="glass-panel" style={{ padding: '2rem' }}>
            <h3 style={{ color: 'var(--color-primary)', marginBottom: '1rem' }}>Certified Athletes Pipeline</h3>
            <p> He transitioned players from unorganized recreational play into nationally recognized athletes registered under the Badminton Association of India (BAI).</p>
          </div>
        </div>

        <div style={{ marginTop: '4rem', textAlign: 'center' }}>
          <p style={{ fontSize: '1.2rem', fontStyle: 'italic', color: 'var(--color-text-muted)' }}>
            "Every kid who learned to smash, every trophy won, and the entire baseline of badminton culture here came from his sweat."
          </p>
        </div>
      </div>
    </section>
  );
};

export default Legacy;
