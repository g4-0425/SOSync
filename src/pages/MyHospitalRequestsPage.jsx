import React, { useState } from 'react';
import { useEmergency } from '../context/EmergencyContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { XCircle, RefreshCw } from 'lucide-react';

/**
 * Page for citizens to view their own hospital assistance requests.
 */
export default function MyHospitalRequestsPage() {
  const { hospitalRequests, hospitals, emergencies, updateHospitalRequestStatus } = useEmergency();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [refreshKey, setRefreshKey] = useState(0); // triggers re‑render when needed

  // Guard – should never happen because route is protected, but keep safety.
  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  // Filter to requests made by the current citizen.
  const myRequests = hospitalRequests.filter(r => r.requesterId === user?.id);

  const statusLabel = status => {
    const map = {
      Pending: 'Requested',
      Confirmed: 'Confirmed',
      Declined: 'Declined',
      Cancelled: 'Cancelled',
    };
    return map[status] ?? status;
  };

  const handleCancel = id => {
    updateHospitalRequestStatus(id, 'Cancelled');
    // Force re‑render (store already updates, but extra trigger is cheap).
    setRefreshKey(k => k + 1);
  };

  const incidentLink = incidentId => {
    if (!incidentId) return '—';
    return (
      <button
        className="btn btn-link"
        onClick={() => navigate(`/emergency/${incidentId}`)}
        style={{ padding: 0, fontSize: '0.9rem' }}
      >
        {incidentId}
      </button>
    );
  };

  return (
    <div className="page-animate" style={{ paddingTop: '6rem', paddingBottom: '5rem' }} key={refreshKey}>
      <div className="container">
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1rem' }}>My Hospital Assistance Requests</h1>
        <button
          onClick={() => setRefreshKey(k => k + 1)}
          className="btn btn-secondary"
          style={{ marginBottom: '1rem' }}
        >
          <RefreshCw size={14} style={{ marginRight: '0.4rem' }} /> Refresh
        </button>

        {myRequests.length === 0 ? (
          <p>No hospital assistance requests found. Browse <a href="/hospitals">hospitals</a> and submit a request.</p>
        ) : (
          <table className="glass-panel" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <th style={{ padding: '0.5rem' }}>Request ID</th>
                <th style={{ padding: '0.5rem' }}>Hospital</th>
                <th style={{ padding: '0.5rem' }}>Linked Incident</th>
                <th style={{ padding: '0.5rem' }}>Created</th>
                <th style={{ padding: '0.5rem' }}>Status</th>
                <th style={{ padding: '0.5rem' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {myRequests.map(req => (
                <tr key={req.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '0.5rem' }}>{req.id}</td>
                  <td style={{ padding: '0.5rem' }}>
                    {hospitals.find(h => h.id === req.hospitalId)?.name ?? req.hospitalId}
                  </td>
                  <td style={{ padding: '0.5rem', textAlign: 'center' }}>{incidentLink(req.incidentId)}</td>
                  <td style={{ padding: '0.5rem' }}>{new Date(req.createdAt).toLocaleString()}</td>
                  <td style={{ padding: '0.5rem' }}>{statusLabel(req.status)}</td>
                  <td style={{ padding: '0.5rem' }}>
                    {req.status !== 'Cancelled' && (
                      <button
                        onClick={() => handleCancel(req.id)}
                        className="btn btn-danger btn-sm"
                        title="Cancel request"
                      >
                        <XCircle size={14} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
