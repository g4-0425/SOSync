import React from 'react';
import { useEmergency } from '../context/EmergencyContext';
import { AlertTriangle, CheckCircle, Info, PhoneCall, X } from 'lucide-react';

export default function NotificationToast() {
  const { toast } = useEmergency();

  if (!toast) return null;

  if (toast.type === 'call') {
    return (
      <div style={{
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        zIndex: 2000,
        minWidth: '340px',
        maxWidth: '450px',
        background: 'var(--bg-surface-solid)',
        backdropFilter: 'blur(20px)',
        borderLeft: '4px solid #2563EB',
        borderRadius: 'var(--border-radius-sm)',
        padding: '1rem 1.25rem',
        boxShadow: '0 10px 30px rgba(37, 99, 235, 0.2), var(--shadow-lg)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.85rem',
        animation: 'fadeIn 0.3s ease-out'
      }}>
        <div style={{
          width: 40,
          height: 40,
          borderRadius: '50%',
          background: 'rgba(37, 99, 235, 0.15)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }}>
          <PhoneCall size={20} color="#2563EB" />
        </div>
        <div style={{ flexGrow: 1 }}>
          <div style={{ 
            fontSize: '0.7rem', 
            fontWeight: 800, 
            color: '#2563EB', 
            textTransform: 'uppercase', 
            letterSpacing: '0.05em', 
            marginBottom: '0.2rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem'
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22C55E', display: 'inline-block' }}></span>
            SIMULATED EMERGENCY CALL
          </div>
          <div style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-main)', lineHeight: 1.3 }}>
            {toast.message}
          </div>
        </div>
      </div>
    );
  }

  const getIcon = () => {
    switch (toast.type) {
      case 'success': return <CheckCircle size={20} color="#22C55E" />;
      case 'error': return <AlertTriangle size={20} color="#DC2626" />;
      default: return <Info size={20} color="#2563EB" />;
    }
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: '30px',
      right: '30px',
      zIndex: 2000,
      minWidth: '320px',
      maxWidth: '420px',
      background: 'var(--bg-surface-solid)',
      backdropFilter: 'blur(20px)',
      borderLeft: `4px solid ${toast.type === 'error' ? '#DC2626' : toast.type === 'success' ? '#22C55E' : '#2563EB'}`,
      borderRadius: 'var(--border-radius-sm)',
      padding: '1rem 1.25rem',
      boxShadow: 'var(--shadow-lg)',
      display: 'flex',
      alignItems: 'center',
      gap: '0.85rem',
      animation: 'fadeIn 0.3s ease-out'
    }}>
      {getIcon()}
      <div style={{ flexGrow: 1, fontSize: '0.9rem', fontWeight: 500, color: 'var(--text-main)' }}>
        {toast.message}
      </div>
    </div>
  );
}
