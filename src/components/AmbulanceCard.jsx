import React from 'react';
import { useEmergency } from '../context/EmergencyContext';
import { Truck, User, MapPin, Clock, Phone, Navigation } from 'lucide-react';

export default function AmbulanceCard({ ambulance }) {
  const { drawRoute, showToast } = useEmergency();

  const handleRouteClick = () => {
    drawRoute(ambulance.coords, [30.7390, 76.7590], ambulance.id);
    showToast(`Tracking active GPS path for ${ambulance.id}`, 'info');
  };

  return (
    <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: 42,
            height: 42,
            borderRadius: '50%',
            background: 'rgba(220, 38, 38, 0.15)',
            color: 'var(--color-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Truck size={20} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800 }}>{ambulance.id}</h3>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>{ambulance.type}</div>
          </div>
        </div>
        <span style={{
          padding: '0.25rem 0.65rem',
          borderRadius: 20,
          fontSize: '0.75rem',
          fontWeight: 700,
          background: ambulance.status === 'Available' ? 'rgba(34, 197, 94, 0.15)' : 'rgba(245, 158, 11, 0.15)',
          color: ambulance.status === 'Available' ? '#22C55E' : '#F59E0B'
        }}>
          {ambulance.status}
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <User size={14} color="var(--color-accent)" />
          <span>Driver: <strong style={{ color: 'var(--text-main)' }}>{ambulance.driver}</strong></span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <MapPin size={14} color="var(--color-primary)" />
          <span>Location: <strong style={{ color: 'var(--text-main)' }}>{ambulance.sector}</strong></span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Clock size={14} color="var(--color-warning)" />
          <span>ETA to Target: <strong style={{ color: 'var(--text-main)' }}>{ambulance.eta}</strong></span>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
        <a href={`tel:${ambulance.phone}`} className="btn btn-secondary" style={{ flexGrow: 1, padding: '0.55rem', fontSize: '0.8rem' }}>
          <Phone size={14} />
          Contact
        </a>
        <button onClick={handleRouteClick} className="btn btn-primary" style={{ flexGrow: 1, padding: '0.55rem', fontSize: '0.8rem' }}>
          <Navigation size={14} />
          Track GPS
        </button>
      </div>
    </div>
  );
}
