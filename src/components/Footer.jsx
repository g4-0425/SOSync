import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useEmergency } from '../context/EmergencyContext';
import { Phone, Shield, HeartPulse, Send, Twitter, Linkedin, Github } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const { showToast } = useEmergency();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    showToast("Subscribed! Thank you for joining the SOSync security network.", "success");
    setEmail('');
  };

  return (
    <footer className="footer" style={{
      background: '#020617',
      color: '#F8FAFC',
      padding: '5rem 0 2.5rem 0',
      borderTop: '1px solid rgba(255, 255, 255, 0.05)'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '3rem',
          marginBottom: '3.5rem'
        }}>
          {/* Brand Col */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.25rem' }}>
              <svg viewBox="0 0 100 100" fill="none" style={{ width: 34, height: 34 }}>
                <circle cx="50" cy="50" r="45" stroke="#DC2626" strokeWidth="8" fill="none" />
                <path d="M50 20V80" stroke="#DC2626" strokeWidth="9" strokeLinecap="round" />
                <path d="M20 50H80" stroke="#DC2626" strokeWidth="9" strokeLinecap="round" />
              </svg>
              SO<span style={{ color: 'var(--color-primary)' }}>Sync</span>
            </div>
            <p style={{ color: '#94A3B8', fontSize: '0.95rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>
              Synchronizing citizens, hospital wards, ambulances, and police patrols across Chandigarh under a single real-time telemetry framework.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="theme-toggle-btn"><Twitter size={16} /></a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="theme-toggle-btn"><Linkedin size={16} /></a>
              <a href="https://github.com" target="_blank" rel="noreferrer" className="theme-toggle-btn"><Github size={16} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#FFF', marginBottom: '1.25rem', borderLeft: '3px solid var(--color-primary)', paddingLeft: '0.5rem' }}>
              Quick Navigation
            </h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem', color: '#94A3B8' }}>
              <li><NavLink to="/" style={{ color: '#94A3B8' }}>Home Operations</NavLink></li>
              <li><NavLink to="/command-center" style={{ color: '#94A3B8' }}>Chandigarh Command Center</NavLink></li>
              <li><NavLink to="/emergency" style={{ color: '#94A3B8' }}>Report Emergency</NavLink></li>
              <li><NavLink to="/dashboard" style={{ color: '#94A3B8' }}>Admin Console HUD</NavLink></li>
              <li><NavLink to="/hospitals" style={{ color: '#94A3B8' }}>Hospital Wards Registry</NavLink></li>
              <li><NavLink to="/history" style={{ color: '#94A3B8' }}>Incident History Logs</NavLink></li>
            </ul>
          </div>

          {/* Emergency Hotlines */}
          <div>
            <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#FFF', marginBottom: '1.25rem', borderLeft: '3px solid var(--color-primary)', paddingLeft: '0.5rem' }}>
              Emergency Hotlines
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'rgba(220,38,38,0.15)', color: '#DC2626', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <HeartPulse size={16} />
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#64748B' }}>Medical & Ambulance</div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#FFF' }}>102 / 108</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'rgba(37,99,235,0.15)', color: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Shield size={16} />
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#64748B' }}>Police Patrol HQ</div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#FFF' }}>100 / 112</div>
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#FFF', marginBottom: '1.25rem', borderLeft: '3px solid var(--color-primary)', paddingLeft: '0.5rem' }}>
              Telemetry Dispatch News
            </h4>
            <p style={{ color: '#94A3B8', fontSize: '0.85rem', marginBottom: '1rem' }}>
              Subscribe to receive weekly smart-city emergency patch reports and regional dispatch metrics.
            </p>
            <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '0.5rem' }}>
              <input 
                type="email" 
                placeholder="Agency email address..." 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  flexGrow: 1,
                  padding: '0.65rem 1rem',
                  background: '#0F172A',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 'var(--border-radius-sm)',
                  fontSize: '0.85rem',
                  color: '#FFF'
                }}
              />
              <button type="submit" className="btn btn-primary" style={{ padding: '0.65rem 1rem' }}>
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: '2rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.05)',
          fontSize: '0.85rem',
          color: '#64748B',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div>&copy; 2026 SOSync Smart Emergency Response Platform. B.Tech Semester 3 Project.</div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <NavLink to="/about" style={{ color: '#64748B' }}>Project Documentation</NavLink>
            <NavLink to="/contact" style={{ color: '#64748B' }}>Help Desk</NavLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
