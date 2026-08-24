import React, { useState, useEffect } from 'react';
import { db, collection, getDocs, orderBy, query } from '../firebase';

const staticPlayers = [
  { id: 'static-1', name: 'Placeholder Name', category: "Men's Singles", year: '2023', university: 'Bharathidasan University' },
];

const UniversityAchievers = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUniversityAchievers = async () => {
      try {
        const q = query(collection(db, 'universityAchievers'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const fetched = [];
        querySnapshot.forEach((doc) => {
          fetched.push({ id: doc.id, ...doc.data() });
        });
        // Combine Firestore data with static placeholders (Firestore first)
        setPlayers(fetched.length > 0 ? fetched : staticPlayers);
      } catch (error) {
        console.error("Error fetching university achievers:", error);
        setPlayers(staticPlayers);
      } finally {
        setLoading(false);
      }
    };

    fetchUniversityAchievers();
  }, []);

  return (
    <section id="university-achievers" style={{ background: 'var(--color-bg)' }}>
      <div className="container">
        <h2>University Tournament Achievers</h2>
        <p style={{ textAlign: 'center', color: 'var(--color-text-muted)', maxWidth: '640px', margin: '0 auto 3rem auto' }}>
          Celebrating our academy players who have represented and excelled in inter-university and all-India university badminton tournaments.
        </p>

        {loading ? (
          <p style={{ textAlign: 'center', color: 'var(--color-text-muted)' }}>Loading achievers...</p>
        ) : (
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2rem' }}>
            {players.map((p, index) => (
              <div key={p.id} className="glass-panel" style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column', flex: '1 1 320px', maxWidth: '400px' }}>
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
                    height: '120px',
                    background: 'linear-gradient(135deg, rgba(212,175,55,0.15), rgba(212,175,55,0.05))',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <span style={{
                      fontSize: '3rem',
                      fontWeight: '900',
                      color: 'var(--color-primary)',
                      opacity: '0.25',
                      fontFamily: 'monospace'
                    }}>#{String(index + 1).padStart(2, '0')}</span>
                  </div>
                )}
                {/* Info Section */}
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
                    {p.university} · {p.year}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default UniversityAchievers;
