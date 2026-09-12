import React from 'react';
import { useEmergency } from '../context/EmergencyContext';
import { useAuth } from '../context/AuthContext';
import StatCard from '../components/StatCard';
import { 
  Activity, 
  HeartPulse, 
  Truck, 
  ShieldAlert, 
  Building2, 
  Shield, 
  Flame, 
  TrendingUp, 
  CheckCircle2, 
  BarChart3,
  PieChart,
  Lock,
  UserCheck
} from 'lucide-react';

export default function DashboardPage() {
  const { stats, emergencies, ambulances, hospitals } = useEmergency();
  const { isAuthenticated, user, login } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="page-animate" style={{ paddingTop: '8rem', paddingBottom: '5rem' }}>
        <div className="container" style={{ maxWidth: 650, textAlign: 'center' }}>
          <div className="glass-panel" style={{ padding: '3rem 2rem', backgroundColor: 'var(--bg-surface-solid)' }}>
            <div style={{
              width: 64,
              height: 64,
              borderRadius: '50%',
              background: 'rgba(220, 38, 38, 0.12)',
              color: 'var(--color-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem auto',
              border: '1px solid rgba(220, 38, 38, 0.25)'
            }}>
              <Lock size={32} />
            </div>
            <h2 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '0.75rem' }}>Officer Authentication Required</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.6, marginBottom: '2rem' }}>
              Public citizens cannot access internal emergency telemetry graphs, fleet utilization, or officer response registries. Please sign in with your officer credentials to view the Admin Operations HUD.
            </p>
            <button 
              onClick={() => login('officer@sosync.gov.in', 'officer123')}
              className="btn btn-primary"
              style={{ padding: '0.85rem 1.75rem', fontSize: '0.95rem' }}
            >
              <UserCheck size={18} />
              LOGIN AS DEMO DUTY OFFICER
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-animate" style={{ paddingTop: '6rem', paddingBottom: '5rem' }}>
      <div className="container">
        <div style={{ marginBottom: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--color-primary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Protected Officer Portal ({user?.role || 'Duty Commander'})
            </div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 900 }}>Admin Operations Console HUD</h1>
          </div>
          <div style={{ padding: '0.5rem 1rem', background: 'rgba(34, 197, 94, 0.15)', color: '#22C55E', borderRadius: 20, fontSize: '0.85rem', fontWeight: 700 }}>
            ● Officer Gateway Encrypted
          </div>
        </div>

        {/* 8 Stats Cards Grid (Officer Only) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.25rem',
          marginBottom: '2.5rem'
        }}>
          <StatCard title="Total Emergencies" value={stats.total} subtitle="Lifetime Registry" icon={Activity} color="var(--color-primary)" />
          <StatCard title="Active Incidents" value={stats.active} subtitle="Dispatch in progress" icon={ShieldAlert} color="var(--color-accent)" />
          <StatCard title="Resolved Cases" value={stats.resolved} subtitle="Triage completed" icon={CheckCircle2} color="var(--color-success)" />
          <StatCard title="Critical Level" value={stats.critical} subtitle="Immediate Priority" icon={Flame} color="#EF4444" />
          <StatCard title="Standby Ambulances" value={stats.activeAmbulances} subtitle="Ready for dispatch" icon={Truck} color="var(--color-warning)" />
          <StatCard title="ER Beds Available" value={stats.availableBeds} subtitle="4 City Hospitals" icon={HeartPulse} color="#06B6D4" />
          <StatCard title="Police Units" value={stats.totalPolice} subtitle="Sector Patrols" icon={Shield} color="#8B5CF6" />
          <StatCard title="Fire Stations" value={stats.totalFire} subtitle="Ready Vehicles" icon={Building2} color="#F97316" />
        </div>

        {/* 3 Useful Officer-Only Graphs */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2.5rem'
        }}>
          {/* Graph 1: Emergencies by Type */}
          <div className="glass-panel" style={{ padding: '1.75rem', backgroundColor: 'var(--bg-surface-solid)' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <BarChart3 size={18} color="var(--color-primary)" />
              1. Emergencies by Type
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
              {[
                { type: 'Road Accidents', pct: '40%', color: '#DC2626' },
                { type: 'Medical Crisis / Cardiac', pct: '30%', color: '#2563EB' },
                { type: 'Structure Fires', pct: '18%', color: '#F97316' },
                { type: 'Crime / Public Threat', pct: '12%', color: '#22C55E' }
              ].map(cat => (
                <div key={cat.type}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.3rem', fontWeight: 600 }}>
                    <span>{cat.type}</span>
                    <span>{cat.pct}</span>
                  </div>
                  <div style={{ width: '100%', height: 8, background: 'rgba(255,255,255,0.05)', borderRadius: 4, overflow: 'hidden' }}>
                    <div style={{ width: cat.pct, height: '100%', background: cat.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Graph 2: Emergency Severity Distribution */}
          <div className="glass-panel" style={{ padding: '1.75rem', backgroundColor: 'var(--bg-surface-solid)' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <PieChart size={18} color="var(--color-accent)" />
              2. Emergency Severity Distribution
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
              {[
                { level: 'Critical Priority', pct: '35%', color: '#EF4444' },
                { level: 'High Priority', pct: '45%', color: '#F59E0B' },
                { level: 'Medium Priority', pct: '15%', color: '#2563EB' },
                { level: 'Low Priority', pct: '5%', color: '#22C55E' }
              ].map(sev => (
                <div key={sev.level}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.3rem', fontWeight: 600 }}>
                    <span>{sev.level}</span>
                    <span>{sev.pct}</span>
                  </div>
                  <div style={{ width: '100%', height: 8, background: 'rgba(255,255,255,0.05)', borderRadius: 4, overflow: 'hidden' }}>
                    <div style={{ width: sev.pct, height: '100%', background: sev.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Graph 3: Response Time Trend */}
          <div className="glass-panel" style={{ padding: '1.75rem', backgroundColor: 'var(--bg-surface-solid)' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <TrendingUp size={18} color="var(--color-success)" />
              3. Dispatch Response Time Trend
            </h3>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.85rem', height: 140, borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
              {[
                { month: 'Jan', time: '4.2m', h: '85%' },
                { month: 'Feb', time: '4.0m', h: '75%' },
                { month: 'Mar', time: '3.8m', h: '65%' },
                { month: 'Apr', time: '3.6m', h: '55%' },
                { month: 'May', time: '3.5m', h: '50%' }
              ].map(bar => (
                <div key={bar.month} style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end' }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-light)', marginBottom: '0.25rem' }}>{bar.time}</div>
                  <div style={{
                    width: '100%',
                    height: bar.h,
                    background: 'linear-gradient(180deg, var(--color-success) 0%, var(--color-accent) 100%)',
                    borderRadius: '4px 4px 0 0'
                  }} />
                  <div style={{ fontSize: '0.75rem', fontWeight: 600, marginTop: '0.4rem' }}>{bar.month}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Live Incident Roster Table (Officer Only) */}
        <div className="glass-panel" style={{ padding: '1.75rem', backgroundColor: 'var(--bg-surface-solid)' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1.25rem' }}>
            Live Emergency Incident Registry
          </h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-light)', fontSize: '0.8rem', textTransform: 'uppercase' }}>
                  <th style={{ padding: '0.75rem' }}>ID</th>
                  <th style={{ padding: '0.75rem' }}>Type</th>
                  <th style={{ padding: '0.75rem' }}>Sector</th>
                  <th style={{ padding: '0.75rem' }}>Priority</th>
                  <th style={{ padding: '0.75rem' }}>Assigned Unit</th>
                  <th style={{ padding: '0.75rem' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {emergencies.map(e => (
                  <tr key={e.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <td style={{ padding: '0.85rem 0.75rem', fontWeight: 700 }}>{e.id}</td>
                    <td style={{ padding: '0.85rem 0.75rem' }}>{e.type}</td>
                    <td style={{ padding: '0.85rem 0.75rem' }}>{e.sector}</td>
                    <td style={{ padding: '0.85rem 0.75rem' }}>
                      <span style={{
                        padding: '0.15rem 0.5rem',
                        borderRadius: 12,
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        background: e.priority === 'Critical' ? 'rgba(220,38,38,0.15)' : 'rgba(245,158,11,0.15)',
                        color: e.priority === 'Critical' ? '#DC2626' : '#F59E0B'
                      }}>
                        {e.priority}
                      </span>
                    </td>
                    <td style={{ padding: '0.85rem 0.75rem' }}>{e.assignedAmbulance || 'Dispatching'}</td>
                    <td style={{ padding: '0.85rem 0.75rem', color: e.status === 'Resolved' ? '#22C55E' : 'var(--text-main)' }}>{e.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
