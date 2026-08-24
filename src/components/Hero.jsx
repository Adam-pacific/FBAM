import React from 'react';

const Hero = () => {
  return (
    <section id="hero" className="hero fade-in">
      <div className="container">
        <div style={{ position: 'relative', display: 'inline-block', marginBottom: '2rem' }}>
          <div style={{
            position: 'absolute', inset: '-12px',
            borderRadius: '50%',
            border: '3px solid var(--color-primary)',
            animation: 'pulseRing 2s ease-in-out infinite',
            opacity: 0.5
          }} />
          <div style={{
            position: 'absolute', inset: '-22px',
            borderRadius: '50%',
            border: '2px solid var(--color-primary)',
            animation: 'pulseRing 2s ease-in-out infinite 0.5s',
            opacity: 0.25
          }} />
          <img 
            src="/logo.png" 
            alt="Fazal's Badminton Academy Logo" 
            style={{ 
              width: '260px', 
              height: '260px', 
              objectFit: 'cover', 
              borderRadius: '50%', 
              border: '5px solid var(--color-primary)',
              boxShadow: '0 0 60px rgba(212, 175, 55, 0.7), 0 0 120px rgba(212, 175, 55, 0.3)',
              filter: 'drop-shadow(0px 12px 20px rgba(212, 175, 55, 0.9))',
              display: 'block',
              backgroundColor: '#000000'
            }} 
          />
        </div>
        <h1>With God's Grace,<br/>Without Headweight.</h1>
        <p>A decade of grinding, traveling, and building a powerhouse of young champions. Coach Fazal Ahmed's legacy is defined by the players he produced, not the chairs he sat in.</p>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', margin: '2rem 0' }}>
          <div className="glass-panel" style={{ padding: '1rem 2rem', textAlign: 'center' }}>
            <h2 style={{ fontSize: '2.5rem', color: 'var(--color-primary)', margin: 0 }}>175+</h2>
            <p style={{ margin: 0, color: 'var(--color-text-muted)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Student Victories</p>
          </div>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <a href="#admissions" className="btn-primary" style={{ fontSize: '1.2rem', padding: '1rem 2rem' }}>
            Join The Aim Academy
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
