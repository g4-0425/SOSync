import React, { useState } from 'react';
import { useEmergency } from '../context/EmergencyContext';
import HospitalCard from '../components/HospitalCard';
import { Search, Building2, Filter } from 'lucide-react';

export default function HospitalsPage() {
  const { hospitals } = useEmergency();
  const [query, setQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  const filteredHospitals = hospitals.filter(h => {
    const matchesQuery = h.name.toLowerCase().includes(query.toLowerCase()) || h.sector.toLowerCase().includes(query.toLowerCase());
    const matchesStatus = filterStatus === 'All' || h.status === filterStatus;
    return matchesQuery && matchesStatus;
  });

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
            background: 'rgba(37,99,235,0.12)',
            color: 'var(--color-accent)',
            border: '1px solid rgba(37,99,235,0.25)',
            marginBottom: '0.75rem'
          }}>
            <Building2 size={14} />
            HOSPITAL EMERGENCY WARDS REGISTRY
          </div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 900 }}>Chandigarh Regional Hospitals</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
            Real-time ER bed capacities, ICU readiness, and emergency contacts.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="glass-panel" style={{ padding: '1.25rem', marginBottom: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', flexGrow: 1, minWidth: 260 }}>
            <input 
              type="text" 
              placeholder="Search hospital name or sector..." 
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

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Filter size={16} color="var(--text-light)" />
            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              style={{
                padding: '0.75rem 1rem',
                background: 'var(--bg-surface-solid)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--border-radius-sm)',
                fontSize: '0.9rem',
                color: 'var(--text-main)'
              }}
            >
              <option value="All">All Availability</option>
              <option value="Available">Beds Available</option>
              <option value="Limited">Limited Capacity</option>
            </select>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem'
        }}>
          {filteredHospitals.map(h => (
            <HospitalCard key={h.id} hospital={h} />
          ))}
        </div>
      </div>
    </div>
  );
}
