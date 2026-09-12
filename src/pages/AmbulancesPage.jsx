import React, { useState } from 'react';
import { useEmergency } from '../context/EmergencyContext';
import AmbulanceCard from '../components/AmbulanceCard';
import { Search, Truck, Filter } from 'lucide-react';

export default function AmbulancesPage() {
  const { ambulances } = useEmergency();
  const [query, setQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  const filteredAmbulances = ambulances.filter(a => {
    const matchesQuery = a.id.toLowerCase().includes(query.toLowerCase()) || 
                         a.driver.toLowerCase().includes(query.toLowerCase()) ||
                         a.sector.toLowerCase().includes(query.toLowerCase());
    const matchesStatus = filterStatus === 'All' || a.status === filterStatus;
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
            background: 'rgba(220,38,38,0.12)',
            color: 'var(--color-primary)',
            border: '1px solid rgba(220,38,38,0.25)',
            marginBottom: '0.75rem'
          }}>
            <Truck size={14} />
            MOBILE PARAMEDIC FLEET
          </div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 900 }}>Active Ambulance Fleet</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
            GPS location beacons and active status of all 5 deployed units across Chandigarh.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="glass-panel" style={{ padding: '1.25rem', marginBottom: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', flexGrow: 1, minWidth: 260 }}>
            <input 
              type="text" 
              placeholder="Search ambulance ID, driver, or sector..." 
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
              <option value="All">All Fleet Status</option>
              <option value="Available">Available Standby</option>
              <option value="On Route">On Route Active</option>
            </select>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem'
        }}>
          {filteredAmbulances.map(a => (
            <AmbulanceCard key={a.id} ambulance={a} />
          ))}
        </div>
      </div>
    </div>
  );
}
