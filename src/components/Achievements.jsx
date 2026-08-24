import React, { useState, useEffect } from 'react';
import { db, collection, getDocs, orderBy, query } from '../firebase';

const Achievements = () => {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const q = query(collection(db, 'achievements'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const fetched = [];
        querySnapshot.forEach((doc) => {
          fetched.push({ id: doc.id, ...doc.data() });
        });
        setAchievements(fetched);
      } catch (error) {
        console.error("Error fetching achievements (Firebase might not be configured yet):", error);
        // Fallback placeholder data if Firebase is not connected yet
        setAchievements([
          {
            id: 'placeholder',
            studentName: 'D. Selvakumar & F.A. Adam Ahamed',
            tournamentName: 'SDAT / Khelo India Under-17',
            description: 'Knocked out seeded players from top Chennai academies to bring the state trophy to Mayiladuthurai.',
            imageUrl: null
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchAchievements();
  }, []);

  return (
    <section id="achievements">
      <div className="container">
        <h2>Champions & Achievements</h2>
        
        {loading ? (
          <p style={{ textAlign: 'center', color: 'var(--color-text-muted)' }}>Loading champions...</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {achievements.map((item) => (
              <div key={item.id} className="glass-panel" style={{ overflow: 'hidden' }}>
                {item.imageUrl ? (
                  <img src={item.imageUrl} alt={item.studentName} style={{ width: '100%', height: '250px', objectFit: 'cover' }} />
                ) : (
                  <div style={{ width: '100%', height: '250px', background: 'rgba(212, 175, 55, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ color: 'var(--color-primary)' }}>Image Placeholder</span>
                  </div>
                )}
                <div style={{ padding: '1.5rem' }}>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{item.studentName}</h3>
                  <p style={{ color: 'var(--color-primary)', fontWeight: 'bold', marginBottom: '1rem' }}>{item.tournamentName}</p>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Achievements;
