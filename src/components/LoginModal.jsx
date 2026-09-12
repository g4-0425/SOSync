import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useEmergency } from '../context/EmergencyContext';
import { Shield, Lock, X } from 'lucide-react';

export default function LoginModal({ isOpen, onClose }) {
  const { login } = useAuth();
  const { showToast } = useEmergency();

  const [badgeId, setBadgeId] = useState('OFFICER-101');
  const [passcode, setPasscode] = useState('sosync2026');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    login(badgeId, passcode);
    showToast(`Authenticated as Officer ${badgeId}. Access granted to Dashboard Console.`, 'success');
    onClose();
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 2500,
      backgroundColor: 'rgba(2, 6, 23, 0.8)',
      backdropFilter: 'blur(12px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem'
    }}>
      <div className="glass-panel" style={{
        width: '100%',
        maxWidth: 420,
        padding: '2.5rem',
        position: 'relative',
        backgroundColor: 'var(--bg-surface-solid)',
        boxShadow: 'var(--shadow-lg)'
      }}>
        <button 
          onClick={onClose}
          style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', cursor: 'pointer' }}
          className="theme-toggle-btn"
        >
          <X size={20} />
        </button>

        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
          <div style={{
            width: 56,
            height: 56,
            borderRadius: '50%',
            background: 'rgba(220, 38, 38, 0.15)',
            color: 'var(--color-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1rem auto'
          }}>
            <Shield size={28} />
          </div>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Agency Officer Login</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Enter your emergency dispatch badge authorization ID to access the Admin Control Dashboard.
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.35rem', display: 'block' }}>
              Badge Authorization ID
            </label>
            <div style={{ position: 'relative' }}>
              <input 
                type="text" 
                value={badgeId}
                onChange={(e) => setBadgeId(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '0.8rem 1rem 0.8rem 2.5rem',
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--border-radius-sm)',
                  fontSize: '0.9rem'
                }}
              />
              <Shield size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
            </div>
          </div>

          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.35rem', display: 'block' }}>
              Security Passcode
            </label>
            <div style={{ position: 'relative' }}>
              <input 
                type="password" 
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '0.8rem 1rem 0.8rem 2.5rem',
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--border-radius-sm)',
                  fontSize: '0.9rem'
                }}
              />
              <Lock size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.9rem', marginTop: '0.5rem' }}>
            Authorize Access
          </button>
        </form>
      </div>
    </div>
  );
}
