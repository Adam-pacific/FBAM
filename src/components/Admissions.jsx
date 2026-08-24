import React from 'react';

const Admissions = () => {
  return (
    <section id="admissions" style={{ background: 'var(--color-surface)' }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <h2>Coaching Admissions</h2>
        <p style={{ maxWidth: '600px', margin: '0 auto 3rem auto', color: 'var(--color-text-muted)' }}>
          Join the academy that builds literal champions from scratch. Train under the proven methodology of Coach Fazal Ahmed.
        </p>
        
        <div className="glass-panel" style={{ maxWidth: '500px', margin: '0 auto', padding: '3rem 2rem' }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--color-primary)' }}>Get in Touch</h3>
          <p style={{ marginBottom: '2rem' }}>For admission inquiries, training schedules, and fee details, please contact us directly.</p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ color: 'var(--color-primary)', fontWeight: 'bold' }}>Phone:</span>
              <a href="tel:+919500585445" style={{ color: 'var(--color-text)', textDecoration: 'underline' }}>9500585445</a>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ color: 'var(--color-primary)', fontWeight: 'bold' }}>Email:</span>
              <a href="mailto:fazal7067@gmail.com" style={{ color: 'var(--color-text)', textDecoration: 'underline' }}>fazal7067@gmail.com</a>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ color: 'var(--color-primary)', fontWeight: 'bold' }}>Location:</span>
              <a href="https://maps.app.goo.gl/bu7bHvD1q3anpoKB7" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-text)', textDecoration: 'underline' }}>
                Prahadeesh Feathers, Mayiladuthurai
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Admissions;
