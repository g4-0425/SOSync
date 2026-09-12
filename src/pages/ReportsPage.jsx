import React from 'react';
import { useEmergency } from '../context/EmergencyContext';
import { useAuth } from '../context/AuthContext';
import { FileText, TrendingUp, ShieldCheck, Zap, BarChart2, Lock, UserCheck } from 'lucide-react';

export default function ReportsPage() {
  const { stats } = useEmergency();
  const { isAuthenticated, user, login } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="page-animate" style={{ paddingTop: '8rem', paddingBottom: '5rem' }}>
        <div className="container" style={{ maxWidth: 650, textAlign: 'center' }}>
          <div className="glass-panel" style={{ padding: '3rem 2rem', backgroundColor: 'var(--bg-surface-solid)' }}>
            <div style={{
              width: 64,
              height: 64,
              borderRadius: '50%',
              background: 'rgba(220, 38, 38, 0.12)',
              color: 'var(--color-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem auto',
              border: '1px solid rgba(220, 38, 38, 0.25)'
            }}>
              <Lock size={32} />
            </div>
            <h2 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '0.75rem' }}>Officer Authentication Required</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.6, marginBottom: '2rem' }}>
              Public citizens cannot view executive emergency analytics or response performance reports. Please sign in with your duty officer account.
            </p>
            <button 
              onClick={() => login('officer@sosync.gov.in', 'officer123')}
              className="btn btn-primary"
              style={{ padding: '0.85rem 1.75rem', fontSize: '0.95rem' }}
            >
              <UserCheck size={18} />
              LOGIN AS DEMO DUTY OFFICER
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-animate" style={{ paddingTop: '6rem', paddingBottom: '5rem' }}>
      <div className="container">
        <div style={{ marginBottom: '2.5rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.3rem 0.85rem',
            borderRadius: 20,
            fontSize: '0.8rem',
            fontWeight: 700,
            background: 'rgba(34,197,94,0.12)',
            color: 'var(--color-success)',
            border: '1px solid rgba(34,197,94,0.25)',
            marginBottom: '0.75rem'
          }}>
            <FileText size={14} />
            EXECUTIVE DISPATCH ANALYTICS ({user?.role || 'Officer'})
          </div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 900 }}>Performance Reports & Metrics</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
            Consolidated emergency response statistics and Chandigarh sector heatmaps.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
          <div className="glass-panel" style={{ padding: '1.5rem', textAlign: 'center' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-light)', textTransform: 'uppercase' }}>Resolution Rate</div>
            <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--color-success)', margin: '0.3rem 0' }}>94.8%</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Successful Triage Deliveries</div>
          </div>

          <div className="glass-panel" style={{ padding: '1.5rem', textAlign: 'center' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-light)', textTransform: 'uppercase' }}>Average Response Speed</div>
            <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--color-primary)', margin: '0.3rem 0' }}>3.8 Min</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>From Hotline to Scene Arrival</div>
          </div>

          <div className="glass-panel" style={{ padding: '1.5rem', textAlign: 'center' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-light)', textTransform: 'uppercase' }}>Most Active Corridor</div>
            <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--color-accent)', margin: '0.3rem 0' }}>Sector 22</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>High Density Transit Junction</div>
          </div>
        </div>
      </div>
    </div>
  );
}
