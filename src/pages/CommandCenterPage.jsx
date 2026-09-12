import React from 'react';
import CommandCenterMap from '../components/Map/CommandCenterMap';
import { useEmergency } from '../context/EmergencyContext';
import { 
  Activity, 
  Clock, 
  Truck, 
  Building2, 
  ShieldCheck, 
  Flame, 
  Radio, 
  Navigation,
  AlertTriangle
} from 'lucide-react';

export default function CommandCenterPage() {
  const { stats, ambulances, hospitals, policeUnits, fireStations, notifications } = useEmergency();

  return (
    <div className="page-animate" style={{ paddingTop: '6rem', paddingBottom: '4rem' }}>
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.3rem 0.85rem',
            borderRadius: 20,
            fontSize: '0.8rem',
            fontWeight: 700,
            background: 'rgba(220, 38, 38, 0.12)',
            color: 'var(--color-primary)',
            border: '1px solid rgba(220, 38, 38, 0.25)',
            marginBottom: '0.75rem'
          }}>
            <Radio size={14} className="sos-pulse" />
            LIVE TELEMETRY FEED ACTIVE
          </div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 900 }}>Chandigarh Emergency Command Center</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
            Monitor emergency response across Chandigarh in real time.
          </p>
        </div>

        {/* Dashboard Grid Container */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 340px',
          gap: '1.5rem',
          minHeight: '650px'
        }} className="command-center-grid">
          {/* Map Column */}
          <div className="glass-panel" style={{ padding: '0.5rem', height: '100%', overflow: 'hidden' }}>
            <CommandCenterMap />
          </div>

          {/* Glassmorphic Sidebar Console */}
          <div className="glass-panel" style={{
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
            maxHeight: '650px',
            overflowY: 'auto'
          }}>
            <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700 }}>
                Operations Console
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Duty Control Room</h3>
            </div>

            {/* Metrics Row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', borderRadius: 'var(--border-radius-sm)', padding: '0.75rem' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-light)', textTransform: 'uppercase' }}>Response Grid</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--color-primary)', marginTop: '0.2rem' }}>3.8 Min</div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', borderRadius: 'var(--border-radius-sm)', padding: '0.75rem' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-light)', textTransform: 'uppercase' }}>Active Cases</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--color-accent)', marginTop: '0.2rem' }}>{stats.active} Active</div>
              </div>
            </div>

            {/* Live Ticker Feed */}
            <div>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.75rem', borderLeft: '3px solid var(--color-primary)', paddingLeft: '0.5rem' }}>
                Live Dispatch Feed
              </div>
              <div style={{
                maxHeight: 180,
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
                paddingRight: '0.35rem'
              }}>
                {notifications.map(n => (
                  <div key={n.id} style={{
                    padding: '0.5rem 0.75rem',
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--border-radius-sm)',
                    fontSize: '0.8rem'
                  }}>
                    <div style={{ fontSize: '0.7rem', color: 'var(--color-accent)', fontWeight: 600 }}>{n.time}</div>
                    <div style={{ color: 'var(--text-main)', lineHeight: 1.3 }}>{n.text}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Roster Tab Summaries */}
            <div>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.75rem', borderLeft: '3px solid var(--color-accent)', paddingLeft: '0.5rem' }}>
                Active Ambulances
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', maxHeight: 120, overflowY: 'auto' }}>
                {ambulances.map(a => (
                  <div key={a.id} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: '0.8rem',
                    padding: '0.4rem 0.6rem',
                    background: 'rgba(255, 255, 255, 0.02)',
                    borderRadius: '4px'
                  }}>
                    <div><strong>{a.id}</strong> <small style={{ color: 'var(--text-light)' }}>({a.sector})</small></div>
                    <span style={{
                      padding: '0.1rem 0.4rem',
                      borderRadius: 3,
                      fontSize: '0.65rem',
                      fontWeight: 700,
                      background: a.status === 'Available' ? 'rgba(34,197,94,0.15)' : 'rgba(245,158,11,0.15)',
                      color: a.status === 'Available' ? '#22C55E' : '#F59E0B'
                    }}>
                      {a.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
