import React, { useState } from 'react';
import CommandCenterMap from '../components/Map/CommandCenterMap';
import { useEmergency } from '../context/EmergencyContext';
import { useAuth } from '../context/AuthContext';
import { 
  Activity, 
  Clock, 
  Truck, 
  Building2, 
  ShieldCheck, 
  Flame, 
  Radio, 
  Navigation,
  AlertTriangle,
  Shield,
  Focus
} from 'lucide-react';

export default function CommandCenterPage() {
  const { stats, ambulances, hospitals, policeUnits, fireStations, emergencies, notifications } = useEmergency();
  const { isAuthenticated, user } = useAuth();

  const [focusedCoords, setFocusedCoords] = useState(null);

  const handleFocusIncident = (coords) => {
    if (coords) {
      setFocusedCoords(coords);
    }
  };

  const getHospitalReadiness = (h) => {
    if (h.status === 'Full Capacity' || h.bedsAvailable < 10) {
      return { label: 'Critical', color: '#EF4444', bg: 'rgba(239, 68, 68, 0.15)' };
    }
    if (h.bedsAvailable < 30 || h.icuBeds < 5) {
      return { label: 'Limited', color: '#F59E0B', bg: 'rgba(245, 158, 11, 0.15)' };
    }
    return { label: 'Ready', color: '#22C55E', bg: 'rgba(34, 197, 94, 0.15)' };
  };

  return (
    <div className="page-animate" style={{ paddingTop: '6rem', paddingBottom: '4rem' }}>
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
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
              Real-time emergency tracking across Chandigarh sectors. Click any active incident to center the map.
            </p>
          </div>

          {/* Quick Available Unit Counters */}
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <div className="glass-panel" style={{ padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
              <Truck size={18} color="var(--color-primary)" />
              <span><strong>{ambulances.filter(a => a.status === 'Available').length}</strong> Ambulances Ready</span>
            </div>
            <div className="glass-panel" style={{ padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
              <Shield size={18} color="var(--color-accent)" />
              <span><strong>{policeUnits.reduce((acc, p) => acc + p.unitsAvailable, 0)}</strong> Police Units</span>
            </div>
            <div className="glass-panel" style={{ padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
              <Flame size={18} color="var(--color-warning)" />
              <span><strong>{fireStations.reduce((acc, f) => acc + f.trucksAvailable, 0)}</strong> Fire Tenders</span>
            </div>
          </div>
        </div>

        {/* Dashboard Grid Container */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 340px',
          gap: '1.5rem',
          minHeight: '620px',
          marginBottom: '2rem'
        }} className="command-center-grid">
          {/* Map Column */}
          <div className="glass-panel" style={{ padding: '0.5rem', height: '100%', overflow: 'hidden' }}>
            <CommandCenterMap focusedCoords={focusedCoords} />
          </div>

          {/* Sidebar Console */}
          <div className="glass-panel" style={{
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
            maxHeight: '620px',
            overflowY: 'auto'
          }}>
            <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700 }}>
                Operations Console {isAuthenticated ? `(${user?.role || 'Officer Desk'})` : '(Public Feed)'}
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Duty Control Room</h3>
            </div>

            {/* Active Incidents Click-to-Focus List */}
            <div>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.75rem', borderLeft: '3px solid var(--color-primary)', paddingLeft: '0.5rem' }}>
                Active Incidents ({emergencies.length}) — Click to Center
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: 220, overflowY: 'auto' }}>
                {emergencies.map(e => (
                  <div 
                    key={e.id}
                    onClick={() => handleFocusIncident(e.coords)}
                    style={{
                      padding: '0.6rem 0.75rem',
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid var(--border-color)',
                      borderRadius: 'var(--border-radius-sm)',
                      fontSize: '0.8rem',
                      cursor: 'pointer',
                      transition: 'border 0.2s, background 0.2s'
                    }}
                    className="incident-focus-item"
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <strong style={{ color: 'var(--color-primary)' }}>{e.type}</strong>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-light)', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                        <Focus size={12} /> {e.sector}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                      Priority: <strong>{e.priority}</strong> | Status: {e.status}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Live Ticker Feed */}
            <div>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.75rem', borderLeft: '3px solid var(--color-accent)', paddingLeft: '0.5rem' }}>
                Live Dispatch Log
              </div>
              <div style={{
                maxHeight: 180,
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem'
              }}>
                {notifications.slice(0, 8).map(n => (
                  <div key={n.id} style={{
                    padding: '0.45rem 0.65rem',
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--border-radius-sm)',
                    fontSize: '0.75rem'
                  }}>
                    <div style={{ fontSize: '0.65rem', color: 'var(--color-accent)', fontWeight: 600 }}>{n.time}</div>
                    <div style={{ color: 'var(--text-main)', lineHeight: 1.3 }}>{n.text}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* OFFICER ONLY: Hospital Readiness Section */}
        {isAuthenticated && (
          <div className="glass-panel" style={{ padding: '1.75rem', backgroundColor: 'var(--bg-surface-solid)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-accent)', textTransform: 'uppercase', fontWeight: 700 }}>Officer Command Console</div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Hospital Readiness & ER Capacity</h3>
              </div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Updated real-time via telemetry grid</span>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase' }}>
                    <th style={{ padding: '0.75rem 1rem' }}>Hospital Name</th>
                    <th style={{ padding: '0.75rem 1rem' }}>Sector</th>
                    <th style={{ padding: '0.75rem 1rem' }}>ICU Beds Available</th>
                    <th style={{ padding: '0.75rem 1rem' }}>ER Beds Occupancy</th>
                    <th style={{ padding: '0.75rem 1rem' }}>Readiness Status</th>
                  </tr>
                </thead>
                <tbody>
                  {hospitals.map(h => {
                    const readiness = getHospitalReadiness(h);
                    const occupancyPct = Math.round(((h.totalBeds - h.bedsAvailable) / h.totalBeds) * 100);

                    return (
                      <tr key={h.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                        <td style={{ padding: '0.85rem 1rem', fontWeight: 700 }}>{h.name}</td>
                        <td style={{ padding: '0.85rem 1rem', color: 'var(--text-muted)' }}>{h.sector}</td>
                        <td style={{ padding: '0.85rem 1rem', fontWeight: 700, color: h.icuBeds > 0 ? '#22C55E' : '#EF4444' }}>
                          {h.icuBeds} Beds Ready
                        </td>
                        <td style={{ padding: '0.85rem 1rem' }}>
                          <div>{h.bedsAvailable} available / {h.totalBeds} total</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{occupancyPct}% Occupied</div>
                        </td>
                        <td style={{ padding: '0.85rem 1rem' }}>
                          <span style={{
                            padding: '0.25rem 0.75rem',
                            borderRadius: 20,
                            fontSize: '0.75rem',
                            fontWeight: 800,
                            background: readiness.bg,
                            color: readiness.color
                          }}>
                            {readiness.label}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
