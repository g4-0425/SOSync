import React from 'react';
import { useEmergency } from '../context/EmergencyContext';
import { AlertTriangle, CheckCircle, Info, X } from 'lucide-react';

export default function NotificationToast() {
  const { toast } = useEmergency();

  if (!toast) return null;

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
