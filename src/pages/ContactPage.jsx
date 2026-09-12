import React, { useState } from 'react';
import { useEmergency } from '../context/EmergencyContext';
import { Phone, Mail, MapPin, Send } from 'lucide-react';

export default function ContactPage() {
  const { showToast } = useEmergency();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    showToast("Message sent to Command Center Operations Desk!", "success");
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="page-animate" style={{ paddingTop: '6rem', paddingBottom: '5rem' }}>
      <div className="container" style={{ maxWidth: 900 }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 900, textAlign: 'center', marginBottom: '0.5rem' }}>Command Headquarters Contact</h1>
        <p style={{ color: 'var(--text-muted)', textAlign: 'center', marginBottom: '3rem' }}>
          Chandigarh Smart City Emergency Services Command Desk
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          <div className="glass-panel" style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1.25rem' }}>Direct Dispatch Desks</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', fontSize: '0.9rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                <MapPin size={20} color="var(--color-primary)" />
                <div>Sector 17 Command Center HQ, Chandigarh, 160017</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                <Phone size={20} color="var(--color-accent)" />
                <div>Helpline: 112 / 108 / 102</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                <Mail size={20} color="var(--color-success)" />
                <div>control@sosync.gov.in</div>
              </div>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '2rem', backgroundColor: 'var(--bg-surface-solid)' }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <input 
                type="text" 
                placeholder="Full Name" 
                value={form.name} 
                onChange={(e) => setForm({...form, name: e.target.value})} 
                required 
                style={{ padding: '0.75rem 1rem', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', borderRadius: 'var(--border-radius-sm)' }}
              />
              <input 
                type="email" 
                placeholder="Email Address" 
                value={form.email} 
                onChange={(e) => setForm({...form, email: e.target.value})} 
                required 
                style={{ padding: '0.75rem 1rem', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', borderRadius: 'var(--border-radius-sm)' }}
              />
              <textarea 
                placeholder="Message Details..." 
                value={form.message} 
                onChange={(e) => setForm({...form, message: e.target.value})} 
                rows={4} 
                required 
                style={{ padding: '0.75rem 1rem', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', borderRadius: 'var(--border-radius-sm)' }}
              />
              <button type="submit" className="btn btn-primary" style={{ padding: '0.85rem' }}>
                <Send size={16} />
                Send Inquiry
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
