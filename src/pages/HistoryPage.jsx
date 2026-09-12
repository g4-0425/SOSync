import React from 'react';
import { NavLink } from 'react-router-dom';
import { useEmergencyData } from '../hooks/useEmergencyData';
import { Search, Filter, ArrowUpDown, History, ExternalLink } from 'lucide-react';

export default function HistoryPage() {
  const {
    emergencies,
    searchQuery,
    setSearchQuery,
    priorityFilter,
    setPriorityFilter,
    statusFilter,
    setStatusFilter,
    sortBy,
    setSortBy
  } = useEmergencyData();

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
            <History size={14} />
            AUDITABLE INCIDENT REGISTRY
          </div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 900 }}>Emergency History Logs</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
            Filterable and sortable registry demonstrating ES6+ array manipulation (map, filter, sort).
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="glass-panel" style={{ padding: '1.25rem', marginBottom: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
          {/* Search */}
          <div style={{ position: 'relative', flexGrow: 1, minWidth: 240 }}>
            <input 
              type="text" 
              placeholder="Search ID, type, sector, or reporter..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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

          {/* Priority Filter */}
          <select 
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            style={{
              padding: '0.75rem 1rem',
              background: 'var(--bg-surface-solid)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--border-radius-sm)',
              fontSize: '0.9rem',
              color: 'var(--text-main)'
            }}
          >
            <option value="All">All Priorities</option>
            <option value="Critical">Critical</option>
            <option value="High">High Priority</option>
            <option value="Medium">Medium Priority</option>
          </select>

          {/* Status Filter */}
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{
              padding: '0.75rem 1rem',
              background: 'var(--bg-surface-solid)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--border-radius-sm)',
              fontSize: '0.9rem',
              color: 'var(--text-main)'
            }}
          >
            <option value="All">All Statuses</option>
            <option value="Responder On Route">Responder On Route</option>
            <option value="Responder Arrived">Responder Arrived</option>
            <option value="Resolved">Resolved</option>
          </select>

          {/* Sort By */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <ArrowUpDown size={16} color="var(--text-light)" />
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                padding: '0.75rem 1rem',
                background: 'var(--bg-surface-solid)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--border-radius-sm)',
                fontSize: '0.9rem',
                color: 'var(--text-main)'
              }}
            >
              <option value="reportedTime">Sort by Timestamp</option>
              <option value="priority">Sort by Priority Weight</option>
              <option value="sector">Sort by Sector Name</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="glass-panel" style={{ padding: '1.5rem', backgroundColor: 'var(--bg-surface-solid)' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-light)', fontSize: '0.8rem', textTransform: 'uppercase' }}>
                  <th style={{ padding: '0.75rem' }}>ID</th>
                  <th style={{ padding: '0.75rem' }}>Type</th>
                  <th style={{ padding: '0.75rem' }}>Sector</th>
                  <th style={{ padding: '0.75rem' }}>Priority</th>
                  <th style={{ padding: '0.75rem' }}>Assigned Unit</th>
                  <th style={{ padding: '0.75rem' }}>Response Time</th>
                  <th style={{ padding: '0.75rem' }}>Status</th>
                  <th style={{ padding: '0.75rem' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {emergencies.length > 0 ? emergencies.map(item => (
                  <tr key={item.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <td style={{ padding: '0.85rem 0.75rem', fontWeight: 700 }}>{item.id}</td>
                    <td style={{ padding: '0.85rem 0.75rem' }}>{item.type}</td>
                    <td style={{ padding: '0.85rem 0.75rem' }}>{item.sector}</td>
                    <td style={{ padding: '0.85rem 0.75rem' }}>
                      <span style={{
                        padding: '0.15rem 0.5rem',
                        borderRadius: 12,
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        background: item.priority === 'Critical' ? 'rgba(220,38,38,0.15)' : 'rgba(245,158,11,0.15)',
                        color: item.priority === 'Critical' ? '#DC2626' : '#F59E0B'
                      }}>
                        {item.priority}
                      </span>
                    </td>
                    <td style={{ padding: '0.85rem 0.75rem' }}>{item.assignedAmbulance || 'Pending'}</td>
                    <td style={{ padding: '0.85rem 0.75rem' }}>{item.responseTime}</td>
                    <td style={{ padding: '0.85rem 0.75rem', color: item.status === 'Resolved' ? '#22C55E' : 'var(--text-main)' }}>{item.status}</td>
                    <td style={{ padding: '0.85rem 0.75rem' }}>
                      <NavLink to={`/emergency/${item.id}`} className="btn btn-secondary" style={{ padding: '0.35rem 0.65rem', fontSize: '0.75rem' }}>
                        <ExternalLink size={12} />
                        View
                      </NavLink>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={8} style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                      No matching emergency incidents found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
