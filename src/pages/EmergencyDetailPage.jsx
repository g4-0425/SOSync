import React from 'react';
import { useParams, NavLink, useNavigate } from 'react-router-dom';
import { useEmergencyData } from '../hooks/useEmergencyData';
import { useEmergency } from '../context/EmergencyContext';
import Timeline from '../components/Timeline';
import { ShieldAlert, MapPin, User, Phone, Clock, ArrowLeft, Navigation, Building2, Truck, Shield } from 'lucide-react';

export default function EmergencyDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { findEmergencyById } = useEmergencyData();
  const { drawRoute } = useEmergency();

  const emergency = findEmergencyById(id);

  if (!emergency) {
    return (
      <div className="container page-animate" style={{ paddingTop: '8rem', textAlign: 'center' }}>
        <h2>Emergency Incident Not Found</h2>
        <p style={{ color: 'var(--text-muted)', margin: '1rem 0' }}>The requested incident log key standard could not be resolved.</p>
        <button onClick={() => navigate('/history')} className="btn btn-secondary">Back to History Log</button>
      </div>
    );
  }

  const handleTrackMap = () => {
    drawRoute(emergency.coords, [30.7624, 76.7723], emergency.id);
    navigate('/command-center');
  };

  return (
    <div className="page-animate" style={{ paddingTop: '6rem', paddingBottom: '5rem' }}>
      <div className="container" style={{ maxWidth: 900 }}>
        <button onClick={() => navigate(-1)} className="btn btn-secondary" style={{ marginBottom: '1.5rem', padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
          <ArrowLeft size={16} />
          Back to List
        </button>

        <div className="glass-panel" style={{ padding: '2.5rem', backgroundColor: 'var(--bg-surface-solid)' }}>
          {/* Header Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1.5rem', marginBottom: '1.5rem' }}>
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Emergency Incident Docket
              </div>
              <h1 style={{ fontSize: '2rem', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                {emergency.type}
                <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 600 }}>({emergency.id})</span>
              </h1>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <span style={{
                padding: '0.35rem 0.85rem',
                borderRadius: 20,
                fontSize: '0.8rem',
                fontWeight: 700,
                background: 'rgba(220,38,38,0.15)',
                color: '#DC2626'
              }}>
                Priority: {emergency.priority}
              </span>
              <span style={{
                padding: '0.35rem 0.85rem',
                borderRadius: 20,
                fontSize: '0.8rem',
                fontWeight: 700,
                background: 'rgba(37,99,235,0.15)',
                color: '#2563EB'
              }}>
                {emergency.status}
              </span>
            </div>
          </div>

          {/* Timeline Section */}
          <div style={{ marginBottom: '2rem', background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: 'var(--border-radius-sm)', border: '1px solid var(--border-color)' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '1rem' }}>Dispatch Progress Timeline</h3>
            <Timeline currentStatus={emergency.status} />
          </div>

          {/* Incident Details Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
            <div className="glass-panel" style={{ padding: '1.25rem' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-light)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Location & Sector</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MapPin size={18} color="var(--color-primary)" />
                {emergency.sector}
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>{emergency.description}</div>
            </div>

            <div className="glass-panel" style={{ padding: '1.25rem' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-light)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Assigned Responders</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.9rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Truck size={16} color="var(--color-primary)" />
                  <span>Ambulance: <strong>{emergency.assignedAmbulance}</strong></span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Shield size={16} color="var(--color-accent)" />
                  <span>Police: <strong>{emergency.assignedPolice}</strong></span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Building2 size={16} color="var(--color-success)" />
                  <span>Hospital: <strong>{emergency.nearestHospital}</strong></span>
                </div>
              </div>
            </div>

            <div className="glass-panel" style={{ padding: '1.25rem' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-light)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Reporter Contacts</div>
              <div style={{ fontSize: '0.95rem', fontWeight: 700 }}>{emergency.reporterName}</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>{emergency.reporterPhone}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-light)', marginTop: '0.5rem' }}>Reported: {emergency.reportedTime}</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button onClick={handleTrackMap} className="btn btn-primary" style={{ padding: '0.8rem 1.5rem' }}>
              <Navigation size={18} />
              TRACK ON COMMAND CENTER MAP
            </button>
            <a href={`tel:${emergency.reporterPhone}`} className="btn btn-secondary" style={{ padding: '0.8rem 1.5rem' }}>
              <Phone size={18} />
              CALL DISPATCH DESK
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
