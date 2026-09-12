import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useEmergency } from '../context/EmergencyContext';
import StatCard from '../components/StatCard';
import HospitalCard from '../components/HospitalCard';
import { 
  ShieldAlert, 
  Activity, 
  MapPin, 
  Clock, 
  HeartPulse, 
  Truck, 
  Building2, 
  ShieldCheck, 
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Zap,
  PhoneCall,
  CheckCircle2
} from 'lucide-react';

export default function HomePage() {
  const navigate = useNavigate();
  const { stats, hospitals, showToast } = useEmergency();
  const [activeFaq, setActiveFaq] = useState(null);

  const faqs = [
    {
      q: "How fast does SOSync dispatch ambulances across Chandigarh?",
      a: "Our automated telemetry algorithm calculates real-time traffic density, nearest GPS-monitored vehicles, and hospital ER bed readiness to achieve an average dispatch time of 3.8 minutes."
    },
    {
      q: "Is SOSync integrated with Chandigarh Police & Fire Stations?",
      a: "Yes. SOSync aggregates dispatch feeds from Sector 17, Sector 34, Police HQ, and Industrial Area Fire Stations under a single unified dashboard."
    },
    {
      q: "Can citizens track assigned ambulance routes in real time?",
      a: "Absolutely. Once an emergency report is logged, citizens receive a dynamic URL (or navigate to /command-center) showing Leaflet GPS polylines and live vehicle ETAs."
    },
    {
      q: "Does SOSync work offline if mobile networks stall?",
      a: "Yes. SOSync caches regional hospital data and emergency numbers locally using LocalStorage and progressive caching so you can access critical hotlines anytime."
    }
  ];

  return (
    <div className="page-animate">
      {/* HERO SECTION */}
      <section className="section" style={{
        paddingTop: '8rem',
        paddingBottom: '5rem',
        background: 'radial-gradient(circle at 50% 20%, rgba(220,38,38,0.12) 0%, transparent 60%)'
      }}>
        <div className="container" style={{ textAlign: 'center' }}>
          {/* Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.4rem 1rem',
            borderRadius: 30,
            fontSize: '0.85rem',
            fontWeight: 700,
            background: 'rgba(220, 38, 38, 0.12)',
            color: 'var(--color-primary)',
            border: '1px solid rgba(220, 38, 38, 0.25)',
            marginBottom: '1.75rem'
          }}>
            <Zap size={14} />
            <span>Smart City Chandigarh Telemetry Grid v3.0</span>
          </div>

          <h1 style={{
            fontSize: 'clamp(2.5rem, 5vw, 4.25rem)',
            fontWeight: 900,
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            marginBottom: '1.25rem',
            maxWidth: 900,
            margin: '0 auto 1.25rem auto'
          }}>
            SOSync – Smart Emergency Response System
          </h1>

          <p style={{
            fontSize: '1.25rem',
            color: 'var(--text-muted)',
            maxWidth: 720,
            margin: '0 auto 2.5rem auto',
            lineHeight: 1.6
          }}>
            "Connecting Chandigarh's emergency services for faster, smarter and safer response."
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1.25rem', flexWrap: 'wrap', marginBottom: '4rem' }}>
            <NavLink to="/emergency" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1rem' }}>
              <ShieldAlert size={20} />
              REPORT EMERGENCY
            </NavLink>
            <NavLink to="/command-center" className="btn btn-accent" style={{ padding: '1rem 2rem', fontSize: '1rem' }}>
              <Activity size={20} />
              EXPLORE COMMAND CENTER
            </NavLink>
          </div>

          {/* Trust Indicators */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.5rem',
            maxWidth: 1000,
            margin: '0 auto'
          }}>
            <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <Clock size={24} color="var(--color-primary)" />
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontWeight: 800, fontSize: '1rem' }}>24/7 Monitoring</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Continuous Telemetry</div>
              </div>
            </div>

            <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <Building2 size={24} color="var(--color-accent)" />
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontWeight: 800, fontSize: '1rem' }}>Connected Hospitals</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>PGIMER, GMCH, Fortis</div>
              </div>
            </div>

            <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <Truck size={24} color="var(--color-success)" />
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontWeight: 800, fontSize: '1rem' }}>Rapid Response</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>3.8 Min Avg Dispatch</div>
              </div>
            </div>

            <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <ShieldCheck size={24} color="var(--color-warning)" />
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontWeight: 800, fontSize: '1rem' }}>Smart Dispatch</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>AI Route Optimizing</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* METRICS SECTION */}
      <section className="section" style={{ background: 'rgba(255,255,255,0.01)' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.5rem'
          }}>
            <StatCard title="Active Emergencies" value={stats.active} subtitle="Real-time incidents" icon={Activity} color="var(--color-primary)" />
            <StatCard title="Available ER Beds" value={stats.availableBeds} subtitle="Across 4 hospitals" icon={HeartPulse} color="var(--color-accent)" />
            <StatCard title="Ambulance Units" value={stats.activeAmbulances} subtitle="On standby in city" icon={Truck} color="var(--color-success)" />
            <StatCard title="Total Incidents" value={stats.total} subtitle="Logged in registry" icon={ShieldAlert} color="var(--color-warning)" />
          </div>
        </div>
      </section>

      {/* FEATURED HOSPITALS SECTION */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">
            Chandigarh <span className="highlight">Medical Wards</span>
          </h2>
          <p className="section-subtitle">
            Monitored emergency bed capacities and trauma availability across major regional hospitals.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem',
            marginBottom: '3rem'
          }}>
            {hospitals.slice(0, 3).map(h => (
              <HospitalCard key={h.id} hospital={h} />
            ))}
          </div>

          <div style={{ textAlign: 'center' }}>
            <NavLink to="/hospitals" className="btn btn-secondary">
              View All Hospital Wards
              <ArrowRight size={16} />
            </NavLink>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="section" style={{ background: 'rgba(255,255,255,0.01)' }}>
        <div className="container" style={{ maxWidth: 800 }}>
          <h2 className="section-title">
            Frequently Asked <span className="highlight">Questions</span>
          </h2>
          <p className="section-subtitle">
            Learn how SOSync coordinates emergency logistics across Chandigarh.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;

              return (
                <div 
                  key={idx} 
                  className="glass-panel" 
                  style={{ padding: '1.25rem 1.5rem', cursor: 'pointer' }}
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 700, fontSize: '1.05rem' }}>
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp size={20} color="var(--color-primary)" /> : <ChevronDown size={20} />}
                  </div>
                  {isOpen && (
                    <div style={{ marginTop: '0.85rem', color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6, borderTop: '1px solid var(--border-color)', paddingTop: '0.85rem' }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
