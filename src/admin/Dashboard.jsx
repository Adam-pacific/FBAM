import React, { useState } from 'react';
import { db, collection, addDoc } from '../firebase';
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

  // --- TNBA Ranking States ---
  const [tnbaName, setTnbaName] = useState('');
  const [tnbaCategory, setTnbaCategory] = useState('');
  const [tnbaYear, setTnbaYear] = useState('');
  const [tnbaTournament, setTnbaTournament] = useState('TNBA State Ranking');
  const [tnbaPhoto, setTnbaPhoto] = useState(null);
  const [tnbaStatus, setTnbaStatus] = useState('');

  // --- University Achievers States ---
  const [uniName, setUniName] = useState('');
  const [uniCategory, setUniCategory] = useState('');
  const [uniYear, setUniYear] = useState('');
  const [uniNameOfUniversity, setUniNameOfUniversity] = useState('');
  const [uniPhoto, setUniPhoto] = useState(null);
  const [uniStatus, setUniStatus] = useState('');

  // --- Testimonial States ---
  const [testName, setTestName] = useState('');
  const [testRole, setTestRole] = useState('');
  const [testQuote, setTestQuote] = useState('');
  const [testStatus, setTestStatus] = useState('');

  const handleUpload = async (e) => {
    e.preventDefault();
    setAchievementStatus('Compressing & Processing...');
    try {
      let imageUrl = null;
      if (image) {
        // Compress first, then convert to Base64 string
        const compressed = await compressImage(image);
        imageUrl = await blobToBase64(compressed);
      }
      await addDoc(collection(db, 'achievements'), {
        studentName, tournamentName, description, imageUrl, createdAt: new Date()
      });
      setAchievementStatus('✅ Achievement added! (Stored safely as Base64/Firestore)');
      setStudentName(''); setTournamentName(''); setDescription(''); setImage(null);
    } catch (error) {
      console.error(error);
      setAchievementStatus('Error saving. Ensure Firebase is configured.');
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
      await addDoc(collection(db, 'tnbaRanking'), {
        name: tnbaName,
        category: tnbaCategory,
        year: tnbaYear,
        tournament: tnbaTournament,
        photoUrl,
        createdAt: new Date()
      });
      setTnbaStatus('✅ TNBA Ranking player added! (Stored safely as Base64/Firestore)');
      setTnbaName(''); setTnbaCategory(''); setTnbaYear('');
      setTnbaTournament('TNBA State Ranking'); setTnbaPhoto(null);
    } catch (error) {
      console.error(error);
      setTnbaStatus('Error saving. Ensure Firebase is configured.');
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
      await addDoc(collection(db, 'universityAchievers'), {
        name: uniName,
        category: uniCategory,
        year: uniYear,
        university: uniNameOfUniversity,
        photoUrl,
        createdAt: new Date()
      });
      setUniStatus('✅ University Achiever added! (Stored safely as Base64/Firestore)');
      setUniName(''); setUniCategory(''); setUniYear('');
      setUniNameOfUniversity(''); setUniPhoto(null);
    } catch (error) {
      console.error(error);
      setUniStatus('Error saving. Ensure Firebase is configured.');
    }
  };

  const handleTestUpload = async (e) => {
    e.preventDefault();
    setTestStatus('Uploading...');
    try {
      await addDoc(collection(db, 'testimonials'), {
        name: testName,
        role: testRole,
        quote: testQuote,
        createdAt: new Date()
      });
      setTestStatus('✅ Testimonial added successfully!');
      setTestName(''); setTestRole(''); setTestQuote('');
    } catch (error) {
      console.error(error);
      setTestStatus('Error uploading. Ensure Firebase is configured.');
    }
  };

  const sectionStyle = {
    background: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: '16px',
    padding: '2rem',
    marginBottom: '2.5rem',
    maxWidth: '680px'
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '0.4rem',
    fontWeight: '600',
    color: 'var(--color-primary)',
    fontSize: '0.9rem',
    letterSpacing: '0.5px'
  };

  const inputStyle = {
    width: '100%',
    padding: '0.75rem 1rem',
    background: 'var(--color-surface-light)',
    border: '1px solid var(--color-border)',
    borderRadius: '8px',
    color: 'var(--color-text)',
    fontFamily: 'inherit',
    fontSize: '1rem',
    marginBottom: '1.2rem',
    outline: 'none'
  };

  const statusStyle = (msg) => ({
    padding: '0.6rem 1rem',
    borderRadius: '8px',
    marginBottom: '1rem',
    fontSize: '0.9rem',
    background: msg.includes('Error') ? 'rgba(255,80,80,0.1)' : 'rgba(80,200,120,0.1)',
    color: msg.includes('Error') ? '#ff6b6b' : '#4caf7d',
    border: `1px solid ${msg.includes('Error') ? '#ff6b6b' : '#4caf7d'}`
  });

  return (
    <div className="admin-container container" style={{ paddingBottom: '4rem' }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
        <div>
          <h2 style={{ color: 'var(--color-primary)', marginBottom: '0.25rem' }}>Admin Dashboard</h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Manage achievements and TNBA ranking players</p>
        </div>
        <button className="btn-primary" onClick={() => navigate('/')}>← Back to Home</button>
      </div>

      {/* ── Section 1: Add Achievement ── */}
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
          <textarea
            rows="3"
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="e.g. Won Gold in U-17 Singles, defeating the top seed from Chennai."
            required
            style={{ ...inputStyle, resize: 'vertical' }}
          />

          <label style={labelStyle}>Upload Photo</label>
          <input type="file" accept="image/*" onChange={e => setImage(e.target.files[0])} style={{ ...inputStyle, padding: '0.5rem', cursor: 'pointer' }} />

          <button type="submit" className="btn-primary" style={{ marginTop: '0.5rem', width: '100%', padding: '0.9rem' }}>
            Upload Achievement
          </button>
        </form>
      </div>

      {/* ── Section 2: Add TNBA Ranking Player ── */}
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

          <button type="submit" className="btn-primary" style={{ marginTop: '0.5rem', width: '100%', padding: '0.9rem' }}>
            Add TNBA Ranking Player
          </button>
        </form>
      </div>

      {/* ── Section 3: Add University Achiever ── */}
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

          <button type="submit" className="btn-primary" style={{ marginTop: '0.5rem', width: '100%', padding: '0.9rem' }}>
            Add University Achiever
          </button>
        </form>
      </div>

      {/* ── Section 4: Add Testimonial ── */}
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
          <textarea
            rows="5"
            value={testQuote}
            onChange={e => setTestQuote(e.target.value)}
            placeholder="e.g. Coach Fazal has always motivated me..."
            required
            style={{ ...inputStyle, resize: 'vertical' }}
          />

          <button type="submit" className="btn-primary" style={{ marginTop: '0.5rem', width: '100%', padding: '0.9rem' }}>
            Add Testimonial
          </button>
        </form>
      </div>

    </div>
  );
};

export default Dashboard;
