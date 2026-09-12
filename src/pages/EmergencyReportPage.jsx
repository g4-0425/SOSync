import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEmergency } from '../context/EmergencyContext';
import { emergencyTypes } from '../data/mockDatabase';
import { ShieldAlert, Send, CheckCircle2, MapPin, Phone, User, AlertOctagon, PhoneCall } from 'lucide-react';

export default function EmergencyReportPage() {
  const navigate = useNavigate();
  const { addEmergencyReport, triggerSimulatedCall } = useEmergency();

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    emergencyType: 'Road Accident',
    priority: 'Critical',
    location: '',
    sector: 'Sector 22',
    description: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const newId = addEmergencyReport(formData);
      setIsSubmitting(false);
      navigate(`/emergency/${newId}`);
    }, 800);
  };

  return (
    <div className="page-animate" style={{ paddingTop: '6rem', paddingBottom: '5rem' }}>
      <div className="container" style={{ maxWidth: 850 }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.35rem 1rem',
              borderRadius: 30,
              fontSize: '0.85rem',
              fontWeight: 700,
              background: 'rgba(220, 38, 38, 0.12)',
              color: 'var(--color-primary)',
              border: '1px solid rgba(220, 38, 38, 0.25)'
            }}>
              <ShieldAlert size={16} />
              <span>Emergency Reporting Portal</span>
            </div>

            <button onClick={() => triggerSimulatedCall('Emergency Services', '112')} className="btn btn-sos" style={{ padding: '0.35rem 1rem', fontSize: '0.85rem', textDecoration: 'none' }}>
              <PhoneCall size={16} />
              CALL 112 DIRECT
            </button>
          </div>

          <h1 style={{ fontSize: '2.5rem', fontWeight: 900 }}>Dispatch Immediate Emergency Aid</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: 600, margin: '0.5rem auto 0 auto' }}>
            Fill in incident details below. SOSync rule-based algorithm mobilizes closest Chandigarh paramedics, fire tenders, and police patrols while recommending optimal ER wards.
          </p>
        </div>

        <div className="glass-panel" style={{ padding: '2.5rem', backgroundColor: 'var(--bg-surface-solid)' }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            {/* Contact Row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.4rem', display: 'block' }}>
                  Full Name of Reporter *
                </label>
                <div style={{ position: 'relative' }}>
                  <input 
                    type="text" 
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="e.g. Suraj Verma"
                    required
                    style={{
                      width: '100%',
                      padding: '0.85rem 1rem 0.85rem 2.6rem',
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid var(--border-color)',
                      borderRadius: 'var(--border-radius-sm)',
                      fontSize: '0.95rem'
                    }}
                  />
                  <User size={18} style={{ position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.4rem', display: 'block' }}>
                  Contact Phone Number *
                </label>
                <div style={{ position: 'relative' }}>
                  <input 
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98123 45678"
                    required
                    style={{
                      width: '100%',
                      padding: '0.85rem 1rem 0.85rem 2.6rem',
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid var(--border-color)',
                      borderRadius: 'var(--border-radius-sm)',
                      fontSize: '0.95rem'
                    }}
                  />
                  <Phone size={18} style={{ position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
                </div>
              </div>
            </div>

            {/* Type & Priority Row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.4rem', display: 'block' }}>
                  Emergency Type Category *
                </label>
                <select 
                  name="emergencyType"
                  value={formData.emergencyType}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '0.85rem 1rem',
                    background: 'var(--bg-surface-solid)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--border-radius-sm)',
                    fontSize: '0.95rem',
                    color: 'var(--text-main)'
                  }}
                >
                  {emergencyTypes.map(t => (
                    <option key={t.id} value={t.name}>{t.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.4rem', display: 'block' }}>
                  Incident Priority Scale *
                </label>
                <select 
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '0.85rem 1rem',
                    background: 'var(--bg-surface-solid)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--border-radius-sm)',
                    fontSize: '0.95rem',
                    color: 'var(--text-main)'
                  }}
                >
                  <option value="Low">Low Priority</option>
                  <option value="Medium">Medium Priority</option>
                  <option value="High">High Priority</option>
                  <option value="Critical">Critical Emergency</option>
                </select>
              </div>
            </div>

            {/* Location & Sector Row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 240px', gap: '1.5rem' }}>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.4rem', display: 'block' }}>
                  Specific Landmark / Street Address *
                </label>
                <div style={{ position: 'relative' }}>
                  <input 
                    type="text" 
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Near Light Point / Sector Market Plaza"
                    required
                    style={{
                      width: '100%',
                      padding: '0.85rem 1rem 0.85rem 2.6rem',
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid var(--border-color)',
                      borderRadius: 'var(--border-radius-sm)',
                      fontSize: '0.95rem'
                    }}
                  />
                  <MapPin size={18} style={{ position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.4rem', display: 'block' }}>
                  Chandigarh Sector *
                </label>
                <select 
                  name="sector"
                  value={formData.sector}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '0.85rem 1rem',
                    background: 'var(--bg-surface-solid)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--border-radius-sm)',
                    fontSize: '0.95rem',
                    color: 'var(--text-main)'
                  }}
                >
                  <option value="Sector 17">Sector 17</option>
                  <option value="Sector 22">Sector 22</option>
                  <option value="Sector 35">Sector 35</option>
                  <option value="Sector 43">Sector 43</option>
                  <option value="Sector 15">Sector 15</option>
                  <option value="Sector 26">Sector 26</option>
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.4rem', display: 'block' }}>
                Incident Description & Clinical Details
              </label>
              <textarea 
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                placeholder="Describe injuries, structural hazards, or road blockages..."
                style={{
                  width: '100%',
                  padding: '0.85rem 1rem',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--border-radius-sm)',
                  fontSize: '0.95rem'
                }}
              />
            </div>

            <button type="submit" disabled={isSubmitting} className="btn btn-primary" style={{ padding: '1rem', fontSize: '1rem', marginTop: '0.5rem' }}>
              {isSubmitting ? 'Mobilizing Nearest Responders...' : 'BROADCAST EMERGENCY ALERT'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
