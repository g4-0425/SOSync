import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEmergency } from '../context/EmergencyContext';
import { Shield, Lock } from 'lucide-react';

export default function LoginPage() {
  const { login } = useAuth();
  const { showToast } = useEmergency();
  const navigate = useNavigate();

  const [badgeId, setBadgeId] = useState('OFFICER-101');
  const [passcode, setPasscode] = useState('sosync2026');

  const handleSubmit = (e) => {
    e.preventDefault();
    login(badgeId, passcode);
    showToast(`Session authenticated for Badge ${badgeId}!`, 'success');
    navigate('/dashboard');
  };

  return (
    <div className="page-animate" style={{ paddingTop: '8rem', paddingBottom: '6rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="container" style={{ maxWidth: 440 }}>
        <div className="glass-panel" style={{ padding: '2.5rem', backgroundColor: 'var(--bg-surface-solid)' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ width: 54, height: 54, borderRadius: '50%', background: 'rgba(220,38,38,0.15)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto' }}>
              <Shield size={28} />
            </div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800 }}>Agency Officer Login</h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Enter your officer badge token to access the encrypted Admin Dashboard.</p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.35rem', display: 'block' }}>Badge ID</label>
              <input type="text" value={badgeId} onChange={(e) => setBadgeId(e.target.value)} required style={{ width: '100%', padding: '0.8rem 1rem', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', borderRadius: 'var(--border-radius-sm)' }} />
            </div>

            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.35rem', display: 'block' }}>Passcode</label>
              <input type="password" value={passcode} onChange={(e) => setPasscode(e.target.value)} required style={{ width: '100%', padding: '0.8rem 1rem', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', borderRadius: 'var(--border-radius-sm)' }} />
            </div>

            <button type="submit" className="btn btn-primary" style={{ padding: '0.9rem', marginTop: '0.5rem' }}>
              Login to Console
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
