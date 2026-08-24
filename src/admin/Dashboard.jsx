import React, { useState, useEffect } from 'react';
import { db, collection, addDoc, getDocs, orderBy, query, deleteDoc, doc } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { compressImage, blobToBase64 } from '../utils/compressImage';

const Dashboard = () => {
  const navigate = useNavigate();

  // --- Achievement States ---
  const [studentName, setStudentName] = useState('');
  const [tournamentName, setTournamentName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [achievementStatus, setAchievementStatus] = useState('');
  const [achievements, setAchievements] = useState([]);

  // --- TNBA Ranking States ---
  const [tnbaName, setTnbaName] = useState('');
  const [tnbaCategory, setTnbaCategory] = useState('');
  const [tnbaYear, setTnbaYear] = useState('');
  const [tnbaTournament, setTnbaTournament] = useState('TNBA State Ranking');
  const [tnbaPhoto, setTnbaPhoto] = useState(null);
  const [tnbaStatus, setTnbaStatus] = useState('');
  const [tnbaPlayers, setTnbaPlayers] = useState([]);

  // --- University Achievers States ---
  const [uniName, setUniName] = useState('');
  const [uniCategory, setUniCategory] = useState('');
  const [uniYear, setUniYear] = useState('');
  const [uniNameOfUniversity, setUniNameOfUniversity] = useState('');
  const [uniPhoto, setUniPhoto] = useState(null);
  const [uniStatus, setUniStatus] = useState('');
  const [uniAchievers, setUniAchievers] = useState([]);

  // --- Testimonial States ---
  const [testName, setTestName] = useState('');
  const [testRole, setTestRole] = useState('');
  const [testQuote, setTestQuote] = useState('');
  const [testStatus, setTestStatus] = useState('');
  const [testimonials, setTestimonials] = useState([]);

  // ── Fetch all collections on mount ──
  const fetchAll = async () => {
    try {
      const achSnap = await getDocs(query(collection(db, 'achievements'), orderBy('createdAt', 'desc')));
      setAchievements(achSnap.docs.map(d => ({ id: d.id, ...d.data() })));

      const tnbaSnap = await getDocs(query(collection(db, 'tnbaRanking'), orderBy('createdAt', 'desc')));
      setTnbaPlayers(tnbaSnap.docs.map(d => ({ id: d.id, ...d.data() })));

      const uniSnap = await getDocs(query(collection(db, 'universityAchievers'), orderBy('createdAt', 'desc')));
      setUniAchievers(uniSnap.docs.map(d => ({ id: d.id, ...d.data() })));

      const testSnap = await getDocs(query(collection(db, 'testimonials'), orderBy('createdAt', 'desc')));
      setTestimonials(testSnap.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch (err) {
      console.error('Fetch error:', err);
    }
  };

  useEffect(() => { fetchAll(); }, []);

  // ── Delete helper ──
  const handleDelete = async (collectionName, id, refreshFn) => {
    if (!window.confirm('Are you sure you want to delete this entry?')) return;
    try {
      await deleteDoc(doc(db, collectionName, id));
      refreshFn(prev => prev.filter(item => item.id !== id));
    } catch (err) {
      alert('Delete failed: ' + err.message);
    }
  };

  // ── Upload handlers ──
  const handleUpload = async (e) => {
    e.preventDefault();
    setAchievementStatus('Compressing & Processing...');
    try {
      let imageUrl = null;
      if (image) {
        const compressed = await compressImage(image);
        imageUrl = await blobToBase64(compressed);
      }
      const newDoc = await addDoc(collection(db, 'achievements'), {
        studentName, tournamentName, description, imageUrl, createdAt: new Date()
      });
      setAchievements(prev => [{ id: newDoc.id, studentName, tournamentName, description, imageUrl }, ...prev]);
      setAchievementStatus('✅ Achievement added!');
      setStudentName(''); setTournamentName(''); setDescription(''); setImage(null);
      e.target.reset();
    } catch (error) {
      setAchievementStatus('❌ Error saving. Check Firebase config.');
    }
  };

  const handleTNBAUpload = async (e) => {
    e.preventDefault();
    setTnbaStatus('Compressing & Processing...');
    try {
      let photoUrl = null;
      if (tnbaPhoto) {
        const compressed = await compressImage(tnbaPhoto);
        photoUrl = await blobToBase64(compressed);
      }
      const newDoc = await addDoc(collection(db, 'tnbaRanking'), {
        name: tnbaName, category: tnbaCategory, year: tnbaYear,
        tournament: tnbaTournament, photoUrl, createdAt: new Date()
      });
      setTnbaPlayers(prev => [{ id: newDoc.id, name: tnbaName, category: tnbaCategory, year: tnbaYear, tournament: tnbaTournament, photoUrl }, ...prev]);
      setTnbaStatus('✅ TNBA player added!');
      setTnbaName(''); setTnbaCategory(''); setTnbaYear('');
      setTnbaTournament('TNBA State Ranking'); setTnbaPhoto(null);
      e.target.reset();
    } catch (error) {
      setTnbaStatus('❌ Error saving. Check Firebase config.');
    }
  };

  const handleUniUpload = async (e) => {
    e.preventDefault();
    setUniStatus('Compressing & Processing...');
    try {
      let photoUrl = null;
      if (uniPhoto) {
        const compressed = await compressImage(uniPhoto);
        photoUrl = await blobToBase64(compressed);
      }
      const newDoc = await addDoc(collection(db, 'universityAchievers'), {
        name: uniName, category: uniCategory, year: uniYear,
        university: uniNameOfUniversity, photoUrl, createdAt: new Date()
      });
      setUniAchievers(prev => [{ id: newDoc.id, name: uniName, category: uniCategory, year: uniYear, university: uniNameOfUniversity, photoUrl }, ...prev]);
      setUniStatus('✅ University Achiever added!');
      setUniName(''); setUniCategory(''); setUniYear(''); setUniNameOfUniversity(''); setUniPhoto(null);
      e.target.reset();
    } catch (error) {
      setUniStatus('❌ Error saving. Check Firebase config.');
    }
  };

  const handleTestUpload = async (e) => {
    e.preventDefault();
    setTestStatus('Uploading...');
    try {
      const newDoc = await addDoc(collection(db, 'testimonials'), {
        name: testName, role: testRole, quote: testQuote, createdAt: new Date()
      });
      setTestimonials(prev => [{ id: newDoc.id, name: testName, role: testRole, quote: testQuote }, ...prev]);
      setTestStatus('✅ Testimonial added!');
      setTestName(''); setTestRole(''); setTestQuote('');
      e.target.reset();
    } catch (error) {
      setTestStatus('❌ Error uploading. Check Firebase config.');
    }
  };

  // ── Styles ──
  const sectionStyle = {
    background: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: '16px',
    padding: '2rem',
    marginBottom: '2.5rem',
    maxWidth: '780px'
  };

  const labelStyle = {
    display: 'block', marginBottom: '0.4rem', fontWeight: '600',
    color: 'var(--color-primary)', fontSize: '0.9rem', letterSpacing: '0.5px'
  };

  const inputStyle = {
    width: '100%', padding: '0.75rem 1rem',
    background: 'var(--color-surface-light)', border: '1px solid var(--color-border)',
    borderRadius: '8px', color: 'var(--color-text)', fontFamily: 'inherit',
    fontSize: '1rem', marginBottom: '1.2rem', outline: 'none', boxSizing: 'border-box'
  };

  const statusStyle = (msg) => ({
    padding: '0.6rem 1rem', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.9rem',
    background: msg.includes('❌') ? 'rgba(255,80,80,0.1)' : 'rgba(80,200,120,0.1)',
    color: msg.includes('❌') ? '#ff6b6b' : '#4caf7d',
    border: `1px solid ${msg.includes('❌') ? '#ff6b6b' : '#4caf7d'}`
  });

  const existingListStyle = {
    marginTop: '2rem',
    borderTop: '1px solid var(--color-border)',
    paddingTop: '1.5rem'
  };

  const entryRowStyle = {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '0.75rem 1rem', borderRadius: '10px',
    background: 'var(--color-surface-light)', marginBottom: '0.6rem',
    border: '1px solid var(--color-border)', gap: '1rem'
  };

  const deleteBtnStyle = {
    background: 'rgba(255,80,80,0.15)', border: '1px solid #ff6b6b',
    color: '#ff6b6b', borderRadius: '8px', padding: '0.3rem 0.8rem',
    cursor: 'pointer', fontSize: '0.82rem', fontWeight: '600',
    whiteSpace: 'nowrap', flexShrink: 0
  };

  return (
    <div className="admin-container container" style={{ paddingBottom: '4rem' }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
        <div>
          <h2 style={{ color: 'var(--color-primary)', marginBottom: '0.25rem' }}>Admin Dashboard</h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Add or delete achievements, TNBA players, university achievers & testimonials</p>
        </div>
        <button className="btn-primary" onClick={() => navigate('/')}>← Back to Home</button>
      </div>

      {/* ══ SECTION 1: Achievements ══ */}
      <div style={sectionStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <span style={{ fontSize: '1.5rem' }}>🏆</span>
          <h3 style={{ color: 'var(--color-primary)' }}>Add Student Achievement</h3>
        </div>
        {achievementStatus && <div style={statusStyle(achievementStatus)}>{achievementStatus}</div>}
        <form onSubmit={handleUpload}>
          <label style={labelStyle}>Student Name(s)</label>
          <input style={inputStyle} type="text" value={studentName} onChange={e => setStudentName(e.target.value)} placeholder="e.g. Adam Ahamed" required />
          <label style={labelStyle}>Tournament / Trophy Name</label>
          <input style={inputStyle} type="text" value={tournamentName} onChange={e => setTournamentName(e.target.value)} placeholder="e.g. SDAT State Trophy 2024" required />
          <label style={labelStyle}>Description</label>
          <textarea rows="3" value={description} onChange={e => setDescription(e.target.value)} placeholder="e.g. Won Gold in U-17 Singles..." required style={{ ...inputStyle, resize: 'vertical' }} />
          <label style={labelStyle}>Upload Photo</label>
          <input type="file" accept="image/*" onChange={e => setImage(e.target.files[0])} style={{ ...inputStyle, padding: '0.5rem', cursor: 'pointer' }} />
          <button type="submit" className="btn-primary" style={{ marginTop: '0.5rem', width: '100%', padding: '0.9rem' }}>Upload Achievement</button>
        </form>

        {/* Existing Achievements */}
        {achievements.length > 0 && (
          <div style={existingListStyle}>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', marginBottom: '1rem', fontWeight: '600' }}>
              📋 EXISTING ACHIEVEMENTS ({achievements.length})
            </p>
            {achievements.map(item => (
              <div key={item.id} style={entryRowStyle}>
                <div style={{ overflow: 'hidden' }}>
                  <p style={{ margin: 0, fontWeight: '600', color: 'var(--color-text)', fontSize: '0.92rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.studentName}</p>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{item.tournamentName}</p>
                </div>
                <button style={deleteBtnStyle} onClick={() => handleDelete('achievements', item.id, setAchievements)}>🗑 Delete</button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ══ SECTION 2: TNBA Ranking ══ */}
      <div style={{ ...sectionStyle, borderLeft: '4px solid var(--color-primary)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <span style={{ fontSize: '1.5rem' }}>🏸</span>
          <h3 style={{ color: 'var(--color-primary)' }}>Add TNBA Ranking Player</h3>
        </div>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.88rem', marginBottom: '1.5rem' }}>
          This will appear in the <strong style={{ color: 'var(--color-text)' }}>TNBA Ranking Achievers</strong> section on the main page.
        </p>
        {tnbaStatus && <div style={statusStyle(tnbaStatus)}>{tnbaStatus}</div>}
        <form onSubmit={handleTNBAUpload}>
          <label style={labelStyle}>Player Full Name</label>
          <input style={inputStyle} type="text" value={tnbaName} onChange={e => setTnbaName(e.target.value)} placeholder="e.g. D. Selvakumar" required />
          <label style={labelStyle}>Category</label>
          <input style={inputStyle} type="text" value={tnbaCategory} onChange={e => setTnbaCategory(e.target.value)} placeholder="e.g. U-17 Singles / Senior Doubles" required />
          <label style={labelStyle}>Year of Achievement</label>
          <input style={inputStyle} type="text" value={tnbaYear} onChange={e => setTnbaYear(e.target.value)} placeholder="e.g. 2024" required />
          <label style={labelStyle}>Tournament Name</label>
          <input style={inputStyle} type="text" value={tnbaTournament} onChange={e => setTnbaTournament(e.target.value)} placeholder="e.g. TNBA State Ranking" />
          <label style={labelStyle}>Player Photo (Optional)</label>
          <input type="file" accept="image/*" onChange={e => setTnbaPhoto(e.target.files[0])} style={{ ...inputStyle, padding: '0.5rem', cursor: 'pointer' }} />
          <button type="submit" className="btn-primary" style={{ marginTop: '0.5rem', width: '100%', padding: '0.9rem' }}>Add TNBA Ranking Player</button>
        </form>

        {/* Existing TNBA Players */}
        {tnbaPlayers.length > 0 && (
          <div style={existingListStyle}>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', marginBottom: '1rem', fontWeight: '600' }}>
              📋 EXISTING TNBA PLAYERS ({tnbaPlayers.length}) — from dashboard only
            </p>
            {tnbaPlayers.map(item => (
              <div key={item.id} style={entryRowStyle}>
                <div style={{ overflow: 'hidden' }}>
                  <p style={{ margin: 0, fontWeight: '600', color: 'var(--color-text)', fontSize: '0.92rem' }}>{item.name}</p>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{item.category} · {item.year}</p>
                </div>
                <button style={deleteBtnStyle} onClick={() => handleDelete('tnbaRanking', item.id, setTnbaPlayers)}>🗑 Delete</button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ══ SECTION 3: University Achievers ══ */}
      <div style={{ ...sectionStyle, borderLeft: '4px solid var(--color-primary)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <span style={{ fontSize: '1.5rem' }}>🎓</span>
          <h3 style={{ color: 'var(--color-primary)' }}>Add University Achiever</h3>
        </div>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.88rem', marginBottom: '1.5rem' }}>
          This will appear in the <strong style={{ color: 'var(--color-text)' }}>University Tournament Achievers</strong> section on the main page.
        </p>
        {uniStatus && <div style={statusStyle(uniStatus)}>{uniStatus}</div>}
        <form onSubmit={handleUniUpload}>
          <label style={labelStyle}>Player Full Name</label>
          <input style={inputStyle} type="text" value={uniName} onChange={e => setUniName(e.target.value)} placeholder="e.g. John Doe" required />
          <label style={labelStyle}>Category</label>
          <input style={inputStyle} type="text" value={uniCategory} onChange={e => setUniCategory(e.target.value)} placeholder="e.g. Men's Singles" required />
          <label style={labelStyle}>Year of Achievement</label>
          <input style={inputStyle} type="text" value={uniYear} onChange={e => setUniYear(e.target.value)} placeholder="e.g. 2024" required />
          <label style={labelStyle}>University Name</label>
          <input style={inputStyle} type="text" value={uniNameOfUniversity} onChange={e => setUniNameOfUniversity(e.target.value)} placeholder="e.g. Bharathidasan University" required />
          <label style={labelStyle}>Player Photo (Optional)</label>
          <input type="file" accept="image/*" onChange={e => setUniPhoto(e.target.files[0])} style={{ ...inputStyle, padding: '0.5rem', cursor: 'pointer' }} />
          <button type="submit" className="btn-primary" style={{ marginTop: '0.5rem', width: '100%', padding: '0.9rem' }}>Add University Achiever</button>
        </form>

        {/* Existing University Achievers */}
        {uniAchievers.length > 0 && (
          <div style={existingListStyle}>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', marginBottom: '1rem', fontWeight: '600' }}>
              📋 EXISTING UNIVERSITY ACHIEVERS ({uniAchievers.length})
            </p>
            {uniAchievers.map(item => (
              <div key={item.id} style={entryRowStyle}>
                <div style={{ overflow: 'hidden' }}>
                  <p style={{ margin: 0, fontWeight: '600', color: 'var(--color-text)', fontSize: '0.92rem' }}>{item.name}</p>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{item.university} · {item.year}</p>
                </div>
                <button style={deleteBtnStyle} onClick={() => handleDelete('universityAchievers', item.id, setUniAchievers)}>🗑 Delete</button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ══ SECTION 4: Testimonials ══ */}
      <div style={{ ...sectionStyle, borderLeft: '4px solid var(--color-primary)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <span style={{ fontSize: '1.5rem' }}>💬</span>
          <h3 style={{ color: 'var(--color-primary)' }}>Add Testimonial</h3>
        </div>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.88rem', marginBottom: '1.5rem' }}>
          This will appear in the <strong style={{ color: 'var(--color-text)' }}>Testimonials</strong> section on the main page.
        </p>
        {testStatus && <div style={statusStyle(testStatus)}>{testStatus}</div>}
        <form onSubmit={handleTestUpload}>
          <label style={labelStyle}>Player / Person Name</label>
          <input style={inputStyle} type="text" value={testName} onChange={e => setTestName(e.target.value)} placeholder="e.g. Prasanika" required />
          <label style={labelStyle}>Role / Designation</label>
          <input style={inputStyle} type="text" value={testRole} onChange={e => setTestRole(e.target.value)} placeholder="e.g. State Level Player" required />
          <label style={labelStyle}>Quote / Testimonial</label>
          <textarea rows="5" value={testQuote} onChange={e => setTestQuote(e.target.value)} placeholder="e.g. Coach Fazal has always motivated me..." required style={{ ...inputStyle, resize: 'vertical' }} />
          <button type="submit" className="btn-primary" style={{ marginTop: '0.5rem', width: '100%', padding: '0.9rem' }}>Add Testimonial</button>
        </form>

        {/* Existing Testimonials */}
        {testimonials.length > 0 && (
          <div style={existingListStyle}>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', marginBottom: '1rem', fontWeight: '600' }}>
              📋 EXISTING TESTIMONIALS ({testimonials.length})
            </p>
            {testimonials.map(item => (
              <div key={item.id} style={entryRowStyle}>
                <div style={{ overflow: 'hidden' }}>
                  <p style={{ margin: 0, fontWeight: '600', color: 'var(--color-text)', fontSize: '0.92rem' }}>{item.name}</p>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--color-text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.quote}</p>
                </div>
                <button style={deleteBtnStyle} onClick={() => handleDelete('testimonials', item.id, setTestimonials)}>🗑 Delete</button>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default Dashboard;
