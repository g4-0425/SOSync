import React from 'react';
import { useEmergency } from '../context/EmergencyContext';
import { FileText, TrendingUp, ShieldCheck, Zap, BarChart2 } from 'lucide-react';

export default function ReportsPage() {
  const { stats } = useEmergency();

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
            EXECUTIVE DISPATCH ANALYTICS
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
