import React from 'react';
import { useEmergency } from '../context/EmergencyContext';
import { MapPin, Phone, Bed, UserCheck, Star, Navigation } from 'lucide-react';

export default function HospitalCard({ hospital }) {
  const { drawRoute, showToast, triggerSimulatedCall } = useEmergency();

  const handleRouteClick = () => {
    // Standard Chandigarh coordinate center
    drawRoute(hospital.coords, [30.7390, 76.7590], hospital.name);
    showToast(`Navigating to ${hospital.name} in Sector ${hospital.sector}`, 'info');
  };

  return (
    <div className="glass-panel" style={{
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }}>
      <div style={{ height: 180, overflow: 'hidden', position: 'relative' }}>
        <img 
          src={`/src/assets/${hospital.image}`} 
          alt={hospital.name} 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{
          position: 'absolute',
          top: 12,
          right: 12,
          padding: '0.25rem 0.65rem',
          borderRadius: 20,
          fontSize: '0.75rem',
          fontWeight: 700,
          background: hospital.status === 'Available' ? 'rgba(34, 197, 94, 0.9)' : 'rgba(245, 158, 11, 0.9)',
          color: '#FFF'
        }}>
          {hospital.status}
        </div>
      </div>

      <div style={{ padding: '1.5rem', flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>{hospital.name}</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.85rem', color: '#EAB308', fontWeight: 700 }}>
              <Star size={14} fill="#EAB308" />
              {hospital.rating}
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            <MapPin size={14} color="var(--color-primary)" />
            {hospital.sector} ({hospital.distance})
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: '0.5rem',
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--border-radius-sm)',
          padding: '0.75rem',
          textAlign: 'center'
        }}>
          <div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-light)' }}>ER Beds</div>
            <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--color-primary)' }}>{hospital.bedsAvailable}</div>
          </div>
          <div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-light)' }}>ICU</div>
            <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--color-accent)' }}>{hospital.icuBeds}</div>
          </div>
          <div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-light)' }}>Doctors</div>
            <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--color-success)' }}>{hospital.doctors}</div>
          </div>
        </div>

        <div style={{ marginTop: 'auto', display: 'flex', gap: '0.75rem' }}>
          <button onClick={() => triggerSimulatedCall('Hospital', hospital.name)} className="btn btn-secondary" style={{ flexGrow: 1, padding: '0.6rem', fontSize: '0.8rem' }}>
            <Phone size={14} />
            Call ER
          </button>
          <button onClick={handleRouteClick} className="btn btn-primary" style={{ flexGrow: 1, padding: '0.6rem', fontSize: '0.8rem' }}>
            <Navigation size={14} />
            View Route
          </button>
        </div>
      </div>
    </div>
  );
}
