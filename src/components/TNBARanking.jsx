import React, { useState, useEffect } from 'react';
import { db, collection, getDocs, orderBy, query } from '../firebase';

const staticPlayers = [
  { id: 'static-1', name: 'F.A.Ahmed Ismael', category: 'U-10 Singles', year: '2018', tournament: 'TNBA State Ranking' },
  { id: 'static-2', name: 'D.Selvakumar', category: 'U-17 Doubles', year: '2021', tournament: 'TNBA State Ranking' },
  { id: 'static-3', name: 'Shabreen', category: 'U-17 Doubles', year: '2021', tournament: 'TNBA State Ranking' },
  { id: 'static-4', name: 'F.A.Ahmed Ibrahim', category: 'U-19 Doubles', year: '2025', tournament: 'TNBA State Ranking' },
  { id: 'static-5', name: 'Yashwanth Sami', category: 'U-13 Singles and Doubles', year: '2025', tournament: 'TNBA State Ranking' },
];

const TNBARanking = () => {
  const [players, setPlayers] = useState(staticPlayers);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTNBAPlayers = async () => {
      try {
        const q = query(collection(db, 'tnbaRanking'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const fetched = [];
        querySnapshot.forEach((doc) => {
          fetched.push({ id: doc.id, ...doc.data() });
        });
        // Show Firestore entries first, then the original static players
        setPlayers([...fetched, ...staticPlayers]);
      } catch (error) {
        console.error("Error fetching TNBA rankings:", error);
        setPlayers(staticPlayers);
      } finally {
        setLoading(false);
      }
    };

    fetchTNBAPlayers();
  }, []);

  return (
    <section id="tnba-ranking" style={{ background: 'var(--color-surface)' }}>
      <div className="container">
        <h2>TNBA Ranking Achievers</h2>
        <p style={{ textAlign: 'center', color: 'var(--color-text-muted)', maxWidth: '640px', margin: '0 auto 3rem auto' }}>
          These are the players from Fazal's Badminton Academy who earned official rankings in Tamil Nadu Badminton Association tournaments — a journey that began long before Mayiladuthurai even had a local association.
        </p>

        {/* Banner Strip */}
        <div style={{
          background: 'linear-gradient(90deg, rgba(212,175,55,0.15), rgba(212,175,55,0.05))',
          border: '1px solid var(--color-primary)',
          borderRadius: '12px',
          padding: '1rem 2rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          marginBottom: '2.5rem'
        }}>
          <span style={{ fontSize: '2rem' }}>🏸</span>
          <p style={{ margin: 0, color: 'var(--color-primary)', fontWeight: '600', fontSize: '1rem' }}>
            Coach Fazal's students were competing in TNBA Ranking tournaments via Nagapattinam — years before the Badminton Association of Mayiladuthurai was even established.
          </p>
        </div>

        {loading ? (
          <p style={{ textAlign: 'center', color: 'var(--color-text-muted)' }}>Loading players...</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {players.map((p, index) => (
              <div key={p.id} className="glass-panel" style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                {/* Photo Section */}
                {p.photoUrl ? (
                  <img
                    src={p.photoUrl}
                    alt={p.name}
                    style={{ width: '100%', height: '220px', objectFit: 'cover' }}
                  />
                ) : (
                  <div style={{
                    width: '100%',
                    height: '100px',
                    background: 'linear-gradient(135deg, rgba(212,175,55,0.15), rgba(212,175,55,0.05))',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <span style={{
                      fontSize: '3rem',
                      fontWeight: '900',
                      color: 'var(--color-primary)',
                      opacity: '0.2',
                      lineHeight: 1,
                      fontFamily: 'monospace'
                    }}>#{String(index + 1).padStart(2, '0')}</span>
                  </div>
                )}
                {/* Info */}
                <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <h3 style={{ color: 'var(--color-text)', margin: '0', fontSize: '1.2rem' }}>{p.name}</h3>
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
                    {p.tournament} · {p.year}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer Note */}
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <p style={{ color: 'var(--color-text-muted)', fontStyle: 'italic', fontSize: '0.9rem' }}>
            * Player names and categories are managed via the Admin Dashboard. Update them with the actual ranking details.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TNBARanking;
