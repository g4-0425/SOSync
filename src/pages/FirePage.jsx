import React, { useState } from 'react';
import { useEmergency } from '../context/EmergencyContext';
import { Flame, Search, MapPin, Navigation } from 'lucide-react';

export default function FirePage() {
  const { fireStations, drawRoute, showToast } = useEmergency();
  const [query, setQuery] = useState('');

  const filteredFire = fireStations.filter(f => 
    f.station.toLowerCase().includes(query.toLowerCase()) ||
    f.currentIncident.toLowerCase().includes(query.toLowerCase())
  );

  const handleRouteClick = (station) => {
    drawRoute(station.coords, [30.7140, 76.7230], station.station);
    showToast(`Dispatching fire tender route vector for ${station.station}`, 'info');
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
            background: 'rgba(249,115,22,0.12)',
            color: '#F97316',
            border: '1px solid rgba(249,115,22,0.25)',
            marginBottom: '0.75rem'
          }}>
            <Flame size={14} />
            CHANDIGARH FIRE & RESCUE SERVICE
          </div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 900 }}>Fire & Rescue Stations</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
            Fire tender availability, active hazardous incidents, and firefighter dispatch units.
          </p>
        </div>

        {/* Search Bar */}
        <div className="glass-panel" style={{ padding: '1.25rem', marginBottom: '2rem' }}>
          <div style={{ position: 'relative', width: '100%' }}>
            <input 
              type="text" 
              placeholder="Search fire station or active incident..." 
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
          {filteredFire.map(station => (
            <div key={station.id} className="glass-panel" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{
                    width: 44,
                    height: 44,
                    borderRadius: '50%',
                    background: 'rgba(249,115,22,0.15)',
                    color: '#F97316',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Flame size={22} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>{station.station}</h3>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>Code: {station.id}</div>
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
                  {station.status}
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                <div><strong>Fire Trucks Available:</strong> <span style={{ color: '#F97316', fontWeight: 700 }}>{station.trucksAvailable} Tenders</span></div>
                <div><strong>Firefighters On Duty:</strong> <span style={{ color: 'var(--text-main)' }}>{station.firefighters} Responders</span></div>
                <div><strong>Current Incident:</strong> <span style={{ color: 'var(--text-main)' }}>{station.currentIncident}</span></div>
              </div>

              <button onClick={() => handleRouteClick(station)} className="btn btn-primary" style={{ marginTop: '0.5rem', padding: '0.65rem', fontSize: '0.85rem' }}>
                <Navigation size={16} />
                View Tender Route
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
