import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Hero from './components/Hero';
import Legacy from './components/Legacy';
import TNBARanking from './components/TNBARanking';
import UniversityAchievers from './components/UniversityAchievers';
import Achievements from './components/Achievements';
import Testimonials from './components/Testimonials';
import Admissions from './components/Admissions';
import AdminLogin from './admin/Login';
import AdminDashboard from './admin/Dashboard';

// Theme Toggle Button
const ThemeToggle = ({ theme, toggleTheme }) => (
  <button
    onClick={toggleTheme}
    title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    style={{
      background: 'transparent',
      border: '2px solid var(--color-primary)',
      borderRadius: '50px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      padding: '0.35rem 0.75rem',
      transition: 'all 0.3s ease',
      color: 'var(--color-primary)',
      fontSize: '0.85rem',
      fontWeight: '600',
      fontFamily: 'inherit'
    }}
  >
    {theme === 'dark' ? '☀️ Light' : '🌑 Dark'}
  </button>
);

// Main Website Layout
const MainLayout = ({ theme, toggleTheme }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const close = useCallback(() => setDrawerOpen(false), []);

  return (
    <>
      <nav>
        <Link to="/" className="nav-logo" onClick={close}>Fazal's Badminton Academy of Mayiladuthurai</Link>

        {/* Desktop links */}
        <div className="nav-links">
          <a href="#legacy">Legacy</a>
          <a href="#tnba-ranking">TNBA Rankings</a>
          <a href="#university-achievers">University</a>
          <a href="#achievements">Achievements</a>
          <a href="#testimonials">Testimonials</a>
          <a href="#admissions" className="btn-primary" style={{ padding: '0.4rem 1rem' }}>Admissions</a>
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        </div>

        {/* Mobile hamburger */}
        <button
          className="nav-hamburger"
          aria-label="Open menu"
          onClick={() => setDrawerOpen(prev => !prev)}
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* Mobile drawer */}
      <div className={`nav-drawer${drawerOpen ? ' open' : ''}`}>
        <a href="#legacy" onClick={close}>Legacy</a>
        <a href="#tnba-ranking" onClick={close}>TNBA Rankings</a>
        <a href="#university-achievers" onClick={close}>University Achievers</a>
        <a href="#achievements" onClick={close}>Achievements</a>
        <a href="#testimonials" onClick={close}>Testimonials</a>
        <a href="#admissions" onClick={close} className="btn-primary" style={{ textAlign: 'center', padding: '0.6rem 1rem' }}>Admissions</a>
        <div style={{ paddingTop: '0.5rem' }}>
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        </div>
      </div>

      <main>
        <Hero />
        <Legacy />
        <TNBARanking />
        <UniversityAchievers />
        <Achievements />
        <Testimonials />
        <Admissions />
      </main>
      <footer style={{
        textAlign: 'center',
        padding: '2rem',
        borderTop: '1px solid var(--color-border)',
        marginTop: '4rem',
        color: 'var(--color-text-muted)',
        background: 'var(--color-surface)',
        transition: 'background 0.3s ease'
      }}>
        <p>© {new Date().getFullYear()} Fazal's Badminton Academy of Mayiladuthurai. All rights reserved.</p>
      </footer>
    </>
  );
};

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('fba-theme') || 'dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme === 'light' ? 'light' : '');
    localStorage.setItem('fba-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout theme={theme} toggleTheme={toggleTheme} />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
