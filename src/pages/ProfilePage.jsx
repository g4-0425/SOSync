import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { User, Shield, LogOut } from 'lucide-react';

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="container page-animate" style={{ paddingTop: '8rem', textAlign: 'center' }}>
        <h2>No Active Session</h2>
        <button onClick={() => navigate('/login')} className="btn btn-primary" style={{ marginTop: '1rem' }}>Officer Login</button>
      </div>
    );
  }

  return (
    <div className="page-animate" style={{ paddingTop: '6rem', paddingBottom: '5rem' }}>
      <div className="container" style={{ maxWidth: 600 }}>
        <div className="glass-panel" style={{ padding: '2.5rem', backgroundColor: 'var(--bg-surface-solid)', textAlign: 'center' }}>
          <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'rgba(220,38,38,0.15)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem auto' }}>
            <User size={36} />
          </div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800 }}>{user.name}</h2>
          <div style={{ fontSize: '0.9rem', color: 'var(--color-accent)', fontWeight: 700, margin: '0.25rem 0 1.5rem 0' }}>{user.role} ({user.id})</div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', textAlign: 'left', background: 'rgba(255,255,255,0.03)', padding: '1.25rem', borderRadius: 'var(--border-radius-sm)', marginBottom: '1.5rem' }}>
            <div><strong>Token:</strong> {user.token}</div>
            <div><strong>Session Login:</strong> {user.loginTime}</div>
          </div>

          <button onClick={() => { logout(); navigate('/'); }} className="btn btn-secondary" style={{ width: '100%', padding: '0.85rem' }}>
            <LogOut size={16} />
            Sign Out Session
          </button>
        </div>
      </div>
    </div>
  );
}
