import React, { useState, useEffect } from 'react';
import { db, collection, getDocs } from '../firebase';

const staticTestimonials = [
  {
    id: 1,
    name: "D. Selvakumar",
    role: "TNBA Ranking Under-17 Doubles Semi Finalist",
    quote: "Coach Fazal didn't just teach us how to hold a racket; he built us into giant killers. When we stepped onto the court against the big city academies, his intense conditioning and belief in us made all the difference. We owe our state titles to his sweat and dedication."
  },
  {
    id: 2,
    name: "Ram Prasath",
    role: "District Champion",
    quote: "Every smash I hit and every tournament I survived was built on the foundation Coach Fazal laid for me. He brought the kids coaching culture to Mayiladuthurai when there was nothing. He is the ultimate reason we have a badminton baseline here today."
  },
  {
    id: 3,
    name: "Ibrahim",
    role: "State Ranking Player",
    quote: "While others were busy claiming paper titles, Coach Fazal was on the ground with us every single day. His motto, 'With God's grace, without headweight,' keeps us grounded no matter how many matches we win. He is a true pioneer."
  },
  {
    id: 4,
    name: "Hizhor",
    role: "State Player",
    quote: "Coach Fazal is more than a coach; he is a mentor and a visionary. He saw the potential in Mayiladuthurai's youth when no one else did. His relentless pursuit of excellence has transformed our town into a hub for badminton talent."
  },
  {
    id: 5,
    name: "Naveen",
    role: "All India South Zone Player",
    quote: "Coach Fazal's training is not just about winning matches; it's about building character. He instilled discipline, resilience, and a love for the game in all of us. The values he taught us will stay with us long after we leave the court."
  },
  {
    id: 6,
    name: "Prasanika",
    role: "State Level Player",
    quote: "Under Coach Fazal’s guidance, I significantly improved my badminton skills, discipline, and personal confidence. His constant encouragement and unwavering dedication motivated me to work harder and achieve memorable victories up to the state level. I remains deeply grateful for his impactful coaching, effort, and support, which played a vital role in my athletic development and helped me reach my goals."
  }
];

const Testimonials = () => {
  const [dynamicTestimonials, setDynamicTestimonials] = useState([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'testimonials'));
        const tests = [];
        querySnapshot.forEach((doc) => {
          tests.push({ id: doc.id, ...doc.data() });
        });
        setDynamicTestimonials(tests);
      } catch (error) {
        console.error("Error fetching testimonials: ", error);
      }
    };
    fetchTestimonials();
  }, []);

  const allTestimonials = [...staticTestimonials, ...dynamicTestimonials];

  return (
    <section id="testimonials" style={{ background: 'var(--color-bg)' }}>
      <div className="container">
        <h2>Words from the Champions</h2>
        <p style={{ textAlign: 'center', color: 'var(--color-text-muted)', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem auto' }}>
          Real legacy isn't written on any letterhead—it is spoken by the players whose lives were changed on the court.
        </p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {allTestimonials.map((t) => (
            <div key={t.id} className="glass-panel" style={{ padding: '2rem', position: 'relative' }}>
              <span style={{ position: 'absolute', top: '10px', right: '20px', fontSize: '4rem', color: 'var(--color-primary)', opacity: '0.2', fontFamily: 'serif' }}>"</span>
              <p style={{ fontStyle: 'italic', marginBottom: '1.5rem', position: 'relative', zIndex: 1 }}>"{t.quote}"</p>
              <div>
                <h4 style={{ color: 'var(--color-primary)', marginBottom: '0.2rem' }}>{t.name}</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
