import React, { useState } from 'react';
import { useEmergency } from '../context/EmergencyContext';
import { Shield, Search, MapPin, Phone, UserCheck, Navigation } from 'lucide-react';

export default function PolicePage() {
  const { policeUnits, drawRoute, showToast } = useEmergency();
  const [query, setQuery] = useState('');

  const filteredPolice = policeUnits.filter(p => 
    p.station.toLowerCase().includes(query.toLowerCase()) ||
    p.officer.toLowerCase().includes(query.toLowerCase()) ||
    p.activeCase.toLowerCase().includes(query.toLowerCase())
  );

  const handleRouteClick = (unit) => {
    drawRoute(unit.coords, [30.7390, 76.7590], unit.station);
    showToast(`Dispatching patrol telemetry vector for ${unit.station}`, 'info');
  };

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
            background: 'rgba(15,23,42,0.15)',
            color: 'var(--color-dark-navy)',
            border: '1px solid rgba(255,255,255,0.2)',
            marginBottom: '0.75rem'
          }}>
            <Shield size={14} />
            CHANDIGARH POLICE PATROL NETWORK
          </div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 900 }}>Police Stations & Patrol Units</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
            Active station readiness, commanding officers, and active case dispatches across Chandigarh.
          </p>
        </div>

        {/* Search Bar */}
        <div className="glass-panel" style={{ padding: '1.25rem', marginBottom: '2rem' }}>
          <div style={{ position: 'relative', width: '100%' }}>
            <input 
              type="text" 
              placeholder="Search police station, officer name, or active case..." 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem 1rem 0.75rem 2.6rem',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--border-radius-sm)',
                fontSize: '0.9rem'
              }}
            />
            <Search size={16} style={{ position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
          </div>
        </div>

        {/* Grid Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem'
        }}>
          {filteredPolice.map(unit => (
            <div key={unit.id} className="glass-panel" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{
                    width: 44,
                    height: 44,
                    borderRadius: '50%',
                    background: 'rgba(37,99,235,0.15)',
                    color: '#2563EB',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Shield size={22} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>{unit.station}</h3>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>Code: {unit.badge}</div>
                  </div>
                </div>
                <span style={{
                  padding: '0.25rem 0.65rem',
                  borderRadius: 20,
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  background: 'rgba(34,197,94,0.15)',
                  color: '#22C55E'
                }}>
                  {unit.status}
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                <div><strong>Commanding Officer:</strong> <span style={{ color: 'var(--text-main)' }}>{unit.officer}</span></div>
                <div><strong>Ready Patrol Units:</strong> <span style={{ color: 'var(--color-accent)', fontWeight: 700 }}>{unit.unitsAvailable} Vehicles</span></div>
                <div><strong>Active Case:</strong> <span style={{ color: 'var(--text-main)' }}>{unit.activeCase}</span></div>
              </div>

              <button onClick={() => handleRouteClick(unit)} className="btn btn-primary" style={{ marginTop: '0.5rem', padding: '0.65rem', fontSize: '0.85rem' }}>
                <Navigation size={16} />
                View Patrol Route
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
