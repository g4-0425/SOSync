// src/pages/OfficerRequestsPage.jsx
import React from 'react';
import useStore from '../store';
import { useAuth } from '../context/AuthContext';
import { useEmergency } from '../context/EmergencyContext';
import { CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

/**
 * Officer view of all hospital assistance requests.
 * Allows status updates: Pending → Confirmed / Declined.
 * Uses the shared Zustand store so changes are reflected for citizens.
 */
export default function OfficerRequestsPage() {
  const { user } = useAuth();
  const { hospitalRequests, updateHospitalRequestStatus, emergencies, hospitals } = useStore();
  const { showToast } = useEmergency();

  // Helper to resolve related data
  const getEmergency = id => emergencies.find(e => e.id === id) || {};
  const getHospital = id => hospitals.find(h => h.id === id) || {};

  const handleStatusChange = (reqId, newStatus) => {
    updateHospitalRequestStatus(reqId, newStatus);
    showToast(`Request ${reqId} marked as ${newStatus}`, 'info');
  };

  return (
    <div className="container" style={{ padding: '2rem', marginTop: 'var(--header-height)' }}>
      <h2>Hospital Assistance Requests</h2>
      {hospitalRequests.length === 0 ? (
        <p>No requests at the moment.</p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table className="table" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'var(--bg-surface-solid)' }}>
                <th style={{ padding: '0.5rem', borderBottom: '1px solid var(--border-color)' }}>ID</th>
                <th style={{ padding: '0.5rem', borderBottom: '1px solid var(--border-color)' }}>Citizen</th>
                <th style={{ padding: '0.5rem', borderBottom: '1px solid var(--border-color)' }}>Incident</th>
                <th style={{ padding: '0.5rem', borderBottom: '1px solid var(--border-color)' }}>Hospital</th>
                <th style={{ padding: '0.5rem', borderBottom: '1px solid var(--border-color)' }}>Status</th>
                <th style={{ padding: '0.5rem', borderBottom: '1px solid var(--border-color)' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {hospitalRequests.map(req => {
                const emergency = getEmergency(req.incidentId);
                const hospital = getHospital(req.hospitalId);
                return (
                  <tr key={req.id} style={{ borderBottom: '1px solid var(--glass-border)' }}>
                    <td style={{ padding: '0.5rem' }}>{req.id}</td>
                    <td style={{ padding: '0.5rem' }}>{req.requesterId || 'Unknown'}</td>
                    <td style={{ padding: '0.5rem' }}>{req.incidentId ? emergency.id : 'N/A'}</td>
                    <td style={{ padding: '0.5rem' }}>{hospital.name || req.hospitalId}</td>
                    <td style={{ padding: '0.5rem' }}>{req.status}</td>
                    <td style={{ padding: '0.5rem' }}>
                      {req.status === 'Pending' && (
                        <>
                          <button
                            className="btn btn-success"
                            style={{ marginRight: '0.5rem' }}
                            onClick={() => handleStatusChange(req.id, 'Confirmed')}
                          >
                            <CheckCircle size={14} /> Confirm
                          </button>
                          <button
                            className="btn btn-danger"
                            onClick={() => handleStatusChange(req.id, 'Declined')}
                          >
                            <XCircle size={14} /> Decline
                          </button>
                        </>
                      )}
                      {req.status !== 'Pending' && (
                        <button className="btn btn-secondary" disabled>
                          <AlertTriangle size={14} /> {req.status}
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
